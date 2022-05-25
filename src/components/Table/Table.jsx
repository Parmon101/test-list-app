import styles from "./table.module.css";
import * as React from "react";
import arrow from "../../assets/sortUp.svg";
import { Filter } from "./components/Filter/Filter";

const axios = require("axios").default;

const Table = () => {
    const [originData, setOriginData] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState([]);

    // ------------------- start pagination ---------------------------

    const [number, setNumber] = React.useState(1);
    const [postPerPage] = React.useState(10);

    const lastPost = number * postPerPage;
    const firstPost = lastPost - postPerPage;
    const currentPost = filteredData.slice(firstPost, lastPost);
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(filteredData.length / postPerPage); i++) {
        pageNumber.push(i);
    }
    const ChangePage = (pageNumber) => {
        setNumber(pageNumber);
    };

    // ------------------- finish pagination ---------------------------

    const [sort, setSort] = React.useState(false);

    React.useEffect(() => {
        const getOrigin = async () => {
            await axios
                .get("https://jsonplaceholder.typicode.com/posts")
                .then((data) => {
                    setOriginData(data.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        const getPost = async () => {
            await axios
                .get("https://jsonplaceholder.typicode.com/posts")
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
                    {currentPost.map((res) => (
                        <tr className={styles.tabletext} key={res.id}>
                            <td className={styles.CollumnId}>{res.id}</td>
                            <td className={styles.CollumnTitle}>{res.title}</td>
                            <td className={styles.CollumnBody}>{res.body}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.blogButtons}>
                <button
                    className={styles.numberPage}
                    onClick={() => setNumber(number - 1)}
                >
                    Назад
                </button>

                {pageNumber.map((Elem) => {
                    return (
                        <>
                            <button
                                key={Elem}
                                className={
                                    Elem !== number
                                        ? styles.numberPage
                                        : styles.numberPageCurrect
                                }
                                onClick={() => ChangePage(Elem)}
                            >
                                {Elem}
                            </button>
                        </>
                    );
                })}
                <button
                    className={styles.numberPage}
                    onClick={() => setNumber(number + 1)}
                >
                    Далее
                </button>
            </div>
        </>
    );
};

export default Table;
