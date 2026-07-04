import styles from "./Hero.module.css";
import Button from "../ScrollButton/ScrollButton";

const Hero = () => {
  return (
    <>
      <section className={styles.container}>
        <p className={styles.text}>¿Por que deberias jugar..?</p>
        <h1 className={styles.heroTitle}>
          FINAL FANTASY
        </h1>
        <p className={styles.text}>El JRPG que enamoro occidente</p>
        <Button sectionName={"Origenes"} className={styles.btn}></Button>
      </section>
    </>
  );
};

export default Hero;
