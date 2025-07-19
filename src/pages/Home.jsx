import styles from "./Home.module.css";

const Home = () => {
    return (
        <div className={styles.home}>
            <h1 className={styles.homeTitle}>Welcome to Space Travel</h1>
            <p className={styles.homeDescription}>This is the center control for all space missions.</p>
        </div>
    );
};

export default Home;