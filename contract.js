const Web3 = require("web3");
const { abi, address, URLS } = require("./constants.js");

const chainId = 4;

const contract = () => {
  console.log("executing");
  const DogeDealer = new new Web3(
    new Web3.providers.WebsocketProvider(URLS[chainId])
  ).eth.Contract(abi, address[chainId]);

  // const timers = Promise.resolve(
  //   DogeDealer.methods.getReferralLeaderboardTimers().call()
  // ); //create a daily,weekly,monthly table using the timers returned

  //table structure:
  //User
  //ReferralList
  //ReferralEarnings

  //ReferralBy - insert 'by' under refferrer if present or create a new section or table for referrer and store 'by' under refferer

  //ReferalRewards - insert the amount under to(referrer) address and user.

  DogeDealer.events.ReferredBy({}, (err, res) => {
    if (!err) {
      console.log({
        user: res.returnValues[0], //new user
        referrer: res.returnValues[1], //add user under the referrer //refererlist returns the users stored under referrer
        Daily: res.returnValues[2], //set this value as dailyId and store the result under the DailyId
        Weekly: res.returnValues[3], //set this value as weeklyId and store the result under WeeklyID
        Monthly: res.returnValues[4], //set this value as monthlyId and store the result under MonthlyId
      });
    }
  });

  DogeDealer.events.ReferralRewards({}, (err, res) => {
    if (!err) {
      console.log({
        user: res.returnValues[0],
        sender: res.returnValues[1],
        amount: res.returnValues[2],
        Daily: res.returnValues[3],
        Weekly: res.returnValues[4],
        Monthly: res.returnValues[5],
      });
    }
  });

  DogeDealer.events.ReferralRewards().unsubscribe();
  DogeDealer.events.ReferredBy().unsubscribe();

  //console.log(DogeDealer.events);

  //DogeDealer.events.unsubscribe();
};

module.exports = { contract };
