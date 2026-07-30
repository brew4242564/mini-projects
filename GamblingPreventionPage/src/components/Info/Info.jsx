import styles from "./Info.module.css"
const Info = ({ chances, freq }) => {
  return (
    <div className={styles.container}>
      <p>Money: 100$</p>
      <p>Bet cost: 1$</p>
      <p>Comission: 1$</p>
      <p>Comission Frequency: Every {freq} games</p>
      <p>Try's: 100</p>
      <p>Win chances: {chances} %</p>
    </div>
  );
};

export default Info;
