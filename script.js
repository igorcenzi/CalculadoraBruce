let numbers = document.querySelectorAll(".numero");
let valor1 = "";
let valor2 = "";
let numero = true;
let finalizou = false;
let display = document.querySelector("#current-operacoes");
let displayOperacao = document.querySelector("#previous-operacoes");
let funcoes_btn = document.querySelectorAll(".funcao");
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
  if (operacao) {
    textoDisplay.innerText = textoDisplay.innerText.replace(
      operacao,
      ev.target.innerText
    );
    operacao = ev.target.innerText;
    return;
  }
  operacao = ev.target.innerText;
  numero = false;

  textoDisplay.innerText = textoDisplay.innerText + operacao;
  display.appendChild(textoDisplay);
};

const zerarValores = () => {
  valor1 = "";
  valor2 = "";
  numero = true;
  resultado = "";
  operacao = "";
};

const handleFunction = (ev) => {
  switch (ev.target.innerText) {
    case "DEL":
      textoDisplay.innerText = textoDisplay.innerText.slice(0, -1);
      if (numero) valor1 = valor1.slice(0, -1);
      else if (!valor2) operacao = "";
      else valor2 = valor2.slice(0, -1);
      break;
    case "C":
      zerarValores();
      textoDisplay.innerText = "";
      displayOperacao.innerHTML = "";
      break;
    case "CE":
      if (valor2) {
        valor2 = "";
        textoDisplay.innerText = valor1 + operacao;
      } else {
        valor1 = "";
        textoDisplay.innerText = "";
        operacao = "";
        numero = true;
      }
      break;
  }
};

const calculaResultado = () => {
  if (!valor2) {
    valor2 = valor1;
    textoDisplay.innerText = `${valor1}${operacao}${valor2}`;
  }
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
funcoes_btn.forEach((funcao) =>
  funcao.addEventListener("click", handleFunction)
);
igual.addEventListener("click", calculaResultado);
