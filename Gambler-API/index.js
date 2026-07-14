const express = require("express");
const App = express();
const PORT = 3001;

// BASE VALUES
const BASE_MONEY = 100;
const BASE_NUMBER_TRY = 1000;
const BASE_BET_PRICE = 1;
const BASE_BET_COMISSION = 1;
const BET_FREQUENCY_COMISSION = 10;
// ESCENARIOS
const BASE_CHANCES = { win: 0.5, lose: 0.5 };

function betSimulation(money) {
  const random = Math.random();
  if (random < BASE_CHANCES.win) {
    const prize = money + 1;
    return { win:true, balance: prize };
  } else {
    const prize = money - 1;
    return { win:false, balance: prize };
  }
}

App.get("/gambling", (req, res) => {
  let money = BASE_MONEY;
  let numberOfTry = 1;
  const history = [];
  for (numberOfTry; numberOfTry <= BASE_NUMBER_TRY; numberOfTry++) {
    if (money <= 0) break;
    numberOfTry--; //no se pudo jugar esta ronda, no deberia contarla.
    money = betSimulation(money).balance;
    if (numberOfTry % BET_FREQUENCY_COMISSION === 0) {
      money = money - BASE_BET_COMISSION;
    }
  }

  res.json({
    INITIAL_MONEY: BASE_MONEY,
    BET_PRICE: BASE_BET_PRICE,
    TRY_SURVIVED: numberOfTry,
    FINAL_MONEY: money,
  });
});

App.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
