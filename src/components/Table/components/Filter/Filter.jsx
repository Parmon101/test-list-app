import styles from "./filter.module.css";

const Filter = () => {
    return (
        <>
            <div>
                <div className={styles.filter}>
                    <input
                        type="Search"
                        placeholder="Поиск"
                        onChange={() => console.log(1)}
                        STYLE="color=#FFFFFF"
                    />
                </div>
            </div>
        </>
    );
};

export default Filter;
