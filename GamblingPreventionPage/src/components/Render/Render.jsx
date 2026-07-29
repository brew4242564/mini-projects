import Graph from "../Graph/Graph";
import CustomButton from "../CustomButton/CustomButton";
import styles from "./Render.module.css";
import Info from "../Info/Info";
const Render = ({ chances, freq, setRender, children}) => {
  return (
    <div className={styles.container}>
      <h1>Anti-bet Simulator</h1>
      <CustomButton setRender={setRender} />
      <div className={styles.graphScreen}>
        <Graph chances={chances} freq={freq} />
        <Info chances={chances} freq={freq} />
      </div>
      {children}
    </div>
  );
};

export default Render;
