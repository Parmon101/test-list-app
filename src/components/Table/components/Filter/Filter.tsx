import * as React from "react";
import styles from "./filter.module.css";

type Props = {
    onChange?: () => void;
};

export const Filter: React.FC<Props> = ({ onChange }) => {
    return (
        <div className={styles.filter}>
            <input type="Search" placeholder="Поиск" onChange={onChange} />
        </div>
    );
};
