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
          <p className="text">
            Although the theoretical odds of winning are 50%, the small fixed
            commission (1 coin for every 10 games) acts as a constant drain. In
            the long run, this friction neutralizes luck and drastically reduces
            your chances of ending up with a profit.
          </p>
        </Render>
      );
    case "45/55":
      return (
        <Render setRender={setRender} chances={45} freq={10}>
          <p className="text">
            When you set the probability of winning at 45%, the math works
            against you in every round. When you factor in the recurring
            commission, the expected value becomes strongly negative: your
            initial bankroll is depleted very quickly, and a profit becomes
            practically unattainable.
          </p>
        </Render>
      );
    case "custom":
      return (
        <Render setRender={setRender} chances={chances} freq={freq}>
          <CustomSlider value={freq} setValue={setFreq} name={"Frequency"} />
          <CustomSlider
            value={chances}
            setValue={setChances}
            name={"Chances"}
          />
        </Render>
      );
  }
  return <></>;
}

export default App;
