import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Spinner;
