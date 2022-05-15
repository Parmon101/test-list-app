import styles from "./table.module.css";
import * as React from "react";
import plus from "../../assets/sortUp.svg";

// type Props = {
//     title?: string,
// };

const axios = require("axios").default;

// const Table: React.FC<Props> = () => {
const Table = () => {
    const [post, setPosts] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState(post);

    const [sort, setSort] = React.useState(false);

    React.useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then((data) => {
                setPosts(data.data);
                setFilteredData(data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const sortId = () => {
        setSort((current) => !current);
        sort === false
            ? setPosts(post.sort((a, b) => b.id - a.id))
            : setPosts(post.sort((a, b) => a.id - b.id));
    };

    const sortTitle = () => {
        setSort((current) => !current);
        sort === false
            ? setPosts(
                  post.sort(function (a, b) {
                      const firstValue = a.title;
                      const secondValue = b.title;
                      if (firstValue < secondValue) {
                          return -1;
                      }
                      if (firstValue > secondValue) {
                          return 1;
                      }
                      return 0;
                  })
              )
            : setPosts(
                  post.sort(function (a, b) {
                      const firstValue = a.title;
                      const secondValue = b.title;
                      if (firstValue > secondValue) {
                          return -1;
                      }
                      if (firstValue < secondValue) {
                          return 1;
                      }
                      return 0;
                  })
              );
    };
    React.useEffect(() => {}, [sort, post]);

    return (
        <>
            <table className={styles.table}>
                <tbody>
                    <tr className={styles.tablehead}>
                        <th className={styles.CollumnOne}>
                            ID
                            <img
                                className={styles.sortUp}
                                src={plus}
                                onClick={sortId}
                            />
                        </th>
                        <th className={styles.CollumnTwo}>
                            Заголовок
                            <img
                                className={styles.sortUp}
                                src={plus}
                                onClick={sortTitle}
                            />
                        </th>
                        <th className={styles.CollumnThree}>
                            Описание
                            <img
                                className={styles.sortUp}
                                src={plus}
                                onClick={sortTitle}
                            />
                        </th>
                    </tr>
                    {post.map((res) => (
                        <tr className={styles.tabletext} key={res.id}>
                            <td className={styles.CollumnOne}>{res.id}</td>
                            <td className={styles.CollumnTwo}>{res.title}</td>
                            <td className={styles.CollumnThree}>{res.body}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Table;
