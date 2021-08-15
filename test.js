const fetch = require("node-fetch");
const Web3 = require('web3')
const { abi, address } = require('./constants')
const {unatomic} = require('./utils')
const ApiKey = "JQSF8SQYBX7J4BZZUJXD2AE7ASJ3IHW8FY";


const web3 = new Web3(
  new Web3.providers.WebsocketProvider("wss://bsc-ws-node.nariox.org:443")
);

// async function blockbytimestamp(timestamp) {
//   const response = await fetch(
//     "https://api.bscscan.com/api?module=block&action=getblocknobytime&timestamp=" +
//       timestamp +
//       "&closest=before&apikey=" +
//       ApiKey
//   );

//   const data = await response.json();

//   return data.result;
// }

// const counts = await blockbytimestamp();

// console.log(counts);

const DogeDealer = new web3.eth.Contract(abi, address);

const topic0 = DogeDealer.events.ReferralRewards().arguments[0].topics[0];

async function rewardLogging(_from, _to) {
  console.log(address)
  const from = _from;
  const to = _to;
  const response = await fetch(
    "https://api.bscscan.com/api?module=logs&action=getLogs&fromBlock=" +
      from +
      "&toBlock=" +
      to +
      "&address=" +
      address +
      "&topic0=" +
      topic0 +
      "&apikey=" +
      ApiKey
  );

  const data = await response.json();

  const log = data.result;

  const rewardLog = new Array();

  for (let reward of log) {
    const log = {
      user: 'null',
      leader: web3.eth.abi.decodeParameter("address", reward.topics[1]),
      earn: Number(
        unatomic(web3.eth.abi.decodeParameter("uint256", reward.topics[2]), 9)
      ),
    };

    rewardLog.push(log);
  }

  return rewardLog;
}

console.log("https://api.bscscan.com/api?module=logs&action=getLogs&fromBlock=" +
      'earliest' +
      "&toBlock=" +
      'latest' +
      "&address=" +
      address +
      "&topic0=" +
      topic0 +
      "&apikey=" +
      ApiKey)
console.log(Promise.resolve(rewardLogging('earliest','latest')).then((res)=>console.log(res)))