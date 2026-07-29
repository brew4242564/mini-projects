import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
const CustomButton = ({ setRender }) => {
  return (
    <ButtonGroup size="small" sx={{"& .MuiButton-root": {border: "1px solid black", color: "#060709"}, '& .MuiButton-root:hover':{backgroundColor: "#060709", color:"#f5f7fa"}}}>
      <Button onClick={() => setRender("50/50")}>50/50</Button>
      <Button onClick={() => setRender("custom")}>custom</Button>
      <Button onClick={() => setRender("45/55")}>45/55</Button>
    </ButtonGroup>
  );
};

export default CustomButton;
