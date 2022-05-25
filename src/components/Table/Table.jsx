import styles from "./table.module.css";
import * as React from "react";
import arrow from "../../assets/sortUp.svg";
import { Filter } from "./components/Filter/Filter";

const axios = require("axios").default;

const Table = () => {
    const [originData, setOriginData] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState([]);

    const [sort, setSort] = React.useState(false);

    React.useEffect(() => {
        const getOrigin = async () => {
            await axios
                .get(
                    "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10"
                )
                .then((data) => {
                    setOriginData(data.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        const getPost = async () => {
            await axios
                .get(
                    "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10"
                )
                .then((data) => {
                    setFilteredData(data.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };

        getOrigin();
        getPost();
    }, []);

    const currentPagePost = async (currentPage) => {
        const res = await axios.get(
            `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10`
        );
        return res.data;
    };

    const sortId = () => {
        setSort((current) => !current);
        sort === false
            ? setFilteredData(filteredData.sort((a, b) => b.id - a.id))
            : setFilteredData(filteredData.sort((a, b) => a.id - b.id));
    };

    const sortText = () => {
        setSort((current) => !current);
        sort === false
            ? setFilteredData(
                  filteredData.sort(function (a, b) {
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
            : setFilteredData(
                  filteredData.sort(function (a, b) {
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

    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
        result = originData.filter((data) => {
            return data.title.search(value) != -1;
        });
        setFilteredData(result);
    };

    return (
        <>
            <Filter onChange={(event) => handleSearch(event)} />
            <table className={styles.table}>
                <tbody>
                    <tr className={styles.tablehead}>
                        <th className={styles.CollumnId}>
                            ID
                            <img
                                className={styles.sortUp}
                                src={arrow}
                                onClick={sortId}
                            />
                        </th>
                        <th className={styles.CollumnTitle}>
                            Заголовок
                            <img
                                className={styles.sortUp}
                                src={arrow}
                                onClick={sortText}
                            />
                        </th>
                        <th className={styles.CollumnBody}>
                            Описание
                            <img
                                className={styles.sortUp}
                                src={arrow}
                                onClick={sortText}
                            />
                        </th>
                    </tr>
                    {filteredData.map((res) => (
                        <tr className={styles.tabletext} key={res.id}>
                            <td className={styles.CollumnId}>{res.id}</td>
                            <td className={styles.CollumnTitle}>{res.title}</td>
                            <td className={styles.CollumnBody}>{res.body}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Table;
