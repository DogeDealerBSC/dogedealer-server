const fetch = require("node-fetch");

const Web3 = require("web3");

const web3 = new Web3(
  new Web3.providers.WebsocketProvider("wss://bsc-ws-node.nariox.org:443")
);

const ApiKey = "JQSF8SQYBX7J4BZZUJXD2AE7ASJ3IHW8FY";

const address = "0xccCa79107205433e743B0FCdcA8206171E07f059";

async function TokenHolders() {
  const response = await fetch(
    "https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=" +
      address +
      "&page=1&offset=10000&apikey=" +
      ApiKey
  );

  const data = response.json();

  const holders = data;

  const holderAddress = new Array();

  for (let user of holders) {
    holders.push(user.TokenHolderAddress);
  }

  for (let holder of holderAddress) {
    const topic0 =
      "0x0d8dab0248928a6463de02d7b1b6172d19bca7c74413c43eb9b3197c7a164fd0";
    const topic1 = web3.eth.abi.encodeParameter("hex", holder);
    const response = await fetch(
      "https://api.bscscan.com/api?module=logs&action=getLogs&fromBlock=" +
        from +
        "&toBlock=" +
        to +
        "&address=" +
        address +
        "&topic0=" +
        topic0 +
        "&topic2+" +
        topic2 +
        "&apikey=" +
        ApiKey
    );
    const data = response.json();
    console.log(data);
  }
}

await TokenHolders();
