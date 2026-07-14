const express = require("express");
const App = express();
const PORT =  process.env.PORT || 3001;

// BASE VALUES
const BASE_MONEY = 100;
const BASE_NUMBER_TRY = 1000;
const BASE_BET_PRICE = 1;
const BASE_BET_COMISSION = 1;
const BET_FREQUENCY_COMISSION = 10;
// ESCENARIOS
const BASE_CHANCES = { win: 0.5, lose: 0.5 };

function betSimulation(money, bet_price) {
  const random = Math.random();
  if (random < BASE_CHANCES.win) {
    const prize = money + bet_price;
    return { win: true, balance: prize };
  } else {
    const prize = Math.max(money - bet_price);
    return { win: false, balance: prize };
  }
}

App.get("/gambling", (req, res) => {
  let money = BASE_MONEY;
  let numberOfTry = 1;
  const history = [];
  for (numberOfTry; numberOfTry <= BASE_NUMBER_TRY; numberOfTry++) {
    if (money < BASE_BET_PRICE) {
      numberOfTry--; //no se pudo jugar esta ronda, no deberia contarla.
      break;
    }

    const { win, balance } = betSimulation(money, BASE_BET_PRICE);
    money = balance;
    if (numberOfTry % BET_FREQUENCY_COMISSION === 0) {
      money = Math.max(0, money - BASE_BET_COMISSION);
    }
    history.push({
      round: numberOfTry,
      win: win,
      currentMoney: money,
    });
  }

  res.json({
    INITIAL_MONEY: BASE_MONEY,
    BET_PRICE: BASE_BET_PRICE,
    TRY_SURVIVED: numberOfTry,
    FINAL_MONEY: money,
    HISTORY: history,
  });
});

App.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
