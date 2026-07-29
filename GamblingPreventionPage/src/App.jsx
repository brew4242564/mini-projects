import { useState } from "react";
import Render from "./components/Render/Render";
import Info from "./components/Info/Info";
import "./App.css";
import CustomSlider from "./components/Slider/Slider";

function App() {
  const [render, setRender] = useState("50/50");
  const [chances, setChances] = useState(50);
  const [freq, setFreq] = useState(10);
  switch (render) {
    case "50/50":
      return (
        <Render setRender={setRender} chances={50} freq={10}>
          <span>
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsum lorem ipsum lorem ipsum lorem ipsum
          </span>
        </Render>
      );
    case "45/55":
      return (
        <Render setRender={setRender} chances={45} freq={10}>
          <span>
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsum lorem ipsum lorem ipsum lorem ipsum
          </span>
        </Render>
      );
    case "custom":
      return <Render setRender={setRender} chances={chances} freq={freq}>
        <CustomSlider value={freq} setValue={setFreq} name={"Frequency"} />
        <CustomSlider value={chances} setValue={setChances} name={"Chances"}/>
      </Render>;
  }
  return <></>;
}

export default App;
