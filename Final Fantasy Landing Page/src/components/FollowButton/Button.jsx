import { ChevronDown } from "lucide-react";

const Button = ({ sectionName }) => {
  return (
    <div className="btn-container">
      <button>{sectionName}</button>
      <ChevronDown/>
    </div>
  );
};

export default Button;
