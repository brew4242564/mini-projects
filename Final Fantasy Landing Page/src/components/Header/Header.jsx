import styles from "./Header.module.css";
const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <a href="https://github.com/brew4242564" target="_blank" className={styles.link}>
        <img src="./src/assets/github.svg" alt="github logo" width={32} />
        <span className="font">Brew4242564</span>
      </a>
    </header>
  );
};
export default Header;
