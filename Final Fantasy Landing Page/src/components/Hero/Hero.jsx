import styles from "./Hero.module.css";
import Button from "../FollowButton/Button";

const Hero = () => {
  return (
    <>
      <section className={styles.container}>
        <p>¿Por que deberias jugar..?</p>
        <h1 className={styles.titulo}>
          <span className={styles.heroTitle}>FINAL</span>{" "}
          <span className={styles.heroTitle}>FANTASY</span>
        </h1>
        <p>El JRPG que enamoro occidente</p>
        <Button sectionName={"lorem"} className={styles.btn}></Button>
      </section>
    </>
  );
};

export default Hero;
