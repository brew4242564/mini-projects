import { ChevronDown } from "lucide-react";
import styles from "./ScrollButton.module.css"
const Button = ({ sectionName, className}) => {
  return (
    <div className={className}>
      <button className={styles.btn}>{sectionName}</button>
      <ChevronDown className={styles.followArrow}/>
    </div>
  );
};

export default Button;
