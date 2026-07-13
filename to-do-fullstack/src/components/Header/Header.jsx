import styles from "./Header.module.css"
const Header = ( {profilePic, handleLogout} ) => {
  return (
    <header className={styles.container}>
      <img src={profilePic} alt="avatar" className={styles.avatar}/>
      <h1 className={styles.title}>TO-DO</h1>
      <button onClick={handleLogout} className={styles.buttonLog}>Log Out</button>
    </header>
  );
};


export default Header;