import styles from "./table.module.scss";
import * as React from "react";
import arrow from "../../assets/sortUp.svg";
import ReactPaginate from "react-paginate";

const axios = require("axios").default;

const Table = () => {
    const [post, setPosts] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState(post);

    const [sort, setSort] = React.useState(false);

    React.useEffect(() => {
        const getPost = async () => {
            await axios
                // .get("https://jsonplaceholder.typicode.com/posts")
                .get(
                    "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10"
                )
                .then((data) => {
                    setPosts(data.data);
                    setFilteredData(data.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };

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
        result = post.filter((data) => {
            return data.title.search(value) != -1;
        });
        setFilteredData(result);
    };

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;

        const commentsFormServer = await currentPagePost(currentPage);

        setFilteredData(commentsFormServer);
    };

    React.useEffect(() => {}, [sort, post]);

    return (
        <>
            {/* <Filter></Filter> */}
            <div>
                <div className={styles.filter}>
                    <input
                        type="Search"
                        placeholder="Поиск"
                        onChange={(event) => handleSearch(event)}
                    />
                </div>
            </div>
            <table className={styles.table}>
                <tbody>
                    <tr className={styles.tablehead}>
                        <th className={styles.CollumnOne}>
                            ID
                            <img
                                className={styles.sortUp}
                                src={arrow}
                                onClick={sortId}
                            />
                        </th>
                        <th className={styles.CollumnTwo}>
                            Заголовок
                            <img
                                className={styles.sortUp}
                                src={arrow}
                                onClick={sortText}
                            />
                        </th>
                        <th className={styles.CollumnThree}>
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
                            <td className={styles.CollumnOne}>{res.id}</td>
                            <td className={styles.CollumnTwo}>{res.title}</td>
                            <td className={styles.CollumnThree}>{res.body}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={"Назад"}
                nextLabel={"Вперед"}
                breakLabel={"..."}
                pageCount={10}
                marginPagesDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={" page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </>
    );
};

export default Table;
