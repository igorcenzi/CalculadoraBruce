let numbers = document.querySelectorAll(".numero");
let valor1 = "";
let valor2 = "";
let numero = true;
let finalizou = false;
let display = document.querySelector("#current-operacoes");
let displayOperacao = document.querySelector("#previous-operacoes");
let operacoes = document.querySelectorAll(".operacao");
let igual = document.querySelector("#igual-btn");
let operacao;
let resultado;
let textoDisplay = document.createElement("p");
let textoDisplayOperacoes = document.createElement("p");

const addNumber = (ev) => {
  if (finalizou) {
    display.innerHTML = "";
    displayOperacao.innerHTML = "";
  }
  if (numero) {
    if (valor1.includes(".") && ev.target.innerText === ".") return;
    valor1 += ev.target.innerText;
  } else {
    if (valor2.includes(".") && ev.target.innerText === ".") return;
    valor2 += ev.target.innerText;
  }
  if (finalizou) textoDisplay.innerText = ev.target.innerText;
  else textoDisplay.innerText = textoDisplay.innerText + ev.target.innerText;
  finalizou = false;
  display.appendChild(textoDisplay);
};

const switchOperacao = (ev) => {
  operacao = ev.target.innerText;
  numero = false;

  textoDisplay.innerText = textoDisplay.innerText + ev.target.innerText;
  display.appendChild(textoDisplay);
};

const zerarValores = () => {
  valor1 = "";
  valor2 = "";
  numero = true;
  resultado = "";
};

const calculaResultado = () => {
  switch (operacao) {
    case "+":
      resultado = parseFloat(valor1) + parseFloat(valor2);
      break;
    case "-":
      resultado = parseFloat(valor1) - parseFloat(valor2);
      break;
    case "*":
      resultado = parseFloat(valor1) * parseFloat(valor2);
      break;
    case "/":
      resultado = parseFloat(valor1) / parseFloat(valor2);
      break;
  }
  finalizou = true;
  textoDisplayOperacoes.innerText = textoDisplay.innerText;
  textoDisplay.innerText = resultado;
  display.appendChild(textoDisplay);
  displayOperacao.appendChild(textoDisplayOperacoes);
  zerarValores();
};

operacoes.forEach((op) => op.addEventListener("click", switchOperacao));
numbers.forEach((number) => number.addEventListener("click", addNumber));
igual.addEventListener("click", calculaResultado);
console.log(numbers);
