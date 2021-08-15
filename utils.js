function unatomic(value, decimals) {
  value = value.padStart(decimals + 1, "0");
  let temp =
    value.substr(0, value.length - decimals) +
    "." +
    value.substr(value.length - decimals);
  while (temp[0] === "0") {
    temp = temp.substr(1);
  }
  while (temp.endsWith("0")) {
    temp = temp.slice(0, -1);
  }
  if (temp.endsWith(".")) {
    temp = temp.slice(0, -1);
  }
  if (temp.startsWith(".")) {
    temp = "0" + temp;
  }

  if (temp == "") {
    return "0";
  }
  return temp;
}

module.exports = { unatomic };
