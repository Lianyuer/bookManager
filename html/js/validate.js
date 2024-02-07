let trueCode = "";
function showCode() {
  trueCode = "";
  let codeArr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "A",
    "B",
    "C",
    "D",
    "E",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];
  let codeText = "";
  for (let i = 0; i < 4; i++) {
    let index = Math.floor(Math.random() * codeArr.length);
    codeText +=
      "<span style=color:" + getColor() + ">" + codeArr[index] + "</span>";
    trueCode += codeArr[index];
  }
  return codeText;
}

function getColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  return `rgb(${r},${g},${b})`;
}
