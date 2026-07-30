const express = require("express");
const App = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");

App.use(cors());
// BASE VALUES
const BASE_MONEY = 100;
const BASE_NUMBER_TRY = 100;
const BASE_BET_PRICE = 1;
const BASE_BET_COMISSION = 1;
const BET_FREQUENCY_COMISSION = 10;
// ESCENARIOS
const BASE_CHANCES = 0.5;

function betSimulation(money, bet_price, winChance) {
  const random = Math.random();
  if (random < winChance) {
    const prize = money + bet_price;
    return { win: true, balance: prize };
  } else {
    const prize = Math.max(0, money - bet_price);
    return { win: false, balance: prize };
  }
}

App.get("/gambling", (req, res) => {
  let money = BASE_MONEY;
  let roundSurvived = 0;
  const history = [];
  let winChance = parseInt(req.query.chances) / 100;
  if (isNaN(winChance)) {
    winChance = BASE_CHANCES;
  }
  winChance = Math.min(1, Math.max(0.01, winChance)); // if win % < 0.1, win = 0.01, if > 1, win = 1.
  let comissionFreq = parseInt(req.query.freq);
  if (isNaN(comissionFreq)) {
    comissionFreq = BET_FREQUENCY_COMISSION;
  }
  comissionFreq = Math.min(BASE_NUMBER_TRY, Math.max(0, comissionFreq)); 

  for (let i = 1; i <= BASE_NUMBER_TRY; i++) {
    if (money < BASE_BET_PRICE) {
      break;
    }

    const { win, balance } = betSimulation(money, BASE_BET_PRICE, winChance);
    money = balance;
    if ( comissionFreq > 0 && i % comissionFreq === 0) {
      money = Math.max(0, money - BASE_BET_COMISSION);
    }

    roundSurvived = i;
    history.push({
      round: roundSurvived,
      win: win,
      currentMoney: money,
    });
  }

  res.json({
    INITIAL_MONEY: BASE_MONEY,
    BET_PRICE: BASE_BET_PRICE,
    COMISSION_FREQUENCY: comissionFreq,
    TRY_SURVIVED: roundSurvived,
    FINAL_MONEY: money,
    WIN_CHANCE: winChance,
    HISTORY: history,
  });
});

App.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
