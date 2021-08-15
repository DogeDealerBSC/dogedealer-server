const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const {
  getAllTimeRewards,
  getDailyrewards,
  getMonthlyrewards,
  getWeeklyrewards,
  referrals,
} = require("./getLogs.js");

const app = express();

app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/getAll", async (req, res) => {
  const allTime = await getAllTimeRewards();
  const monthly = await getMonthlyrewards();
  const weekly = await getWeeklyrewards();
  const daily = await getDailyrewards();

  const allTimeRewards = Array.from(
    allTime.reduce(
      (m, { leader, earn }) => m.set(leader, (m.get(leader) || 0) + earn),
      new Map()
    ),
    ([leader, earn]) => ({ leader, earn })
  );

  const dailyRewards = Array.from(
    daily.reduce(
      (m, { leader, earn }) => m.set(leader, (m.get(leader) || 0) + earn),
      new Map()
    ),
    ([leader, earn]) => ({ leader, earn })
  );

  const monthlyRewards = Array.from(
    monthly.reduce(
      (m, { leader, earn }) => m.set(leader, (m.get(leader) || 0) + earn),
      new Map()
    ),
    ([leader, earn]) => ({ leader, earn })
  );

  const weeklyRewards = Array.from(
    weekly.reduce(
      (m, { leader, earn, user }) => m.set(leader, (m.get(leader) || 0) + earn),
      new Map()
    ),
    ([leader, earn]) => ({ leader, earn })
  );

  console.log(allTimeRewards, monthlyRewards, weeklyRewards, dailyRewards);
  res
    .status(201)
    .json({ allTimeRewards, monthlyRewards, weeklyRewards, dailyRewards });
});

app.get("/getReferrals/:id", async (req, res) => {
  const { id } = req.params;
  const result = await referrals(id);
  console.log(result);
  res.status(201).json({ result });
});

app.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`);
});
