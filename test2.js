const Web3 = require('web3')
const { abi } = require("./constants.js");
const { referrals } = require('./getLogs.js')
const address = "0x8d7B69D0c7f2304b1532AE06783B3Da7697e6C95";

const web3 = new Web3(
  new Web3.providers.WebsocketProvider("wss://bsc-ws-node.nariox.org:443")
);

const DogeDealer = new web3.eth.Contract(abi, address);



Promise.resolve(referrals('0x986c49c864Ef542a8575E69Fe918fDe0d9b5BB0d')).then((res) => console.log(res));


// const { daily, weekly, monthly } = await DogeDealer.methods
//   .getReferralLeaderboardTimers()
//   .call()
//   .then((res) => {
//     return { daily: res[0], weekly: res[1], monthly: res[2] };
//   });

// console.log(daily, weekly, monthly);

//console.log(DogeDealer.events);



