import { calculardrywallTeto } from "./js/DrywallTeto.js";
import { calculardrywallDivisor } from "./js/DrywallDivisor.js";
import { calcularPvc } from "./js/Pvc.js";

// --- pegando medidas  ---
document.addEventListener("DOMContentLoaded", () => {
  const larguraInput = document.getElementById("largura");
  const comprimentoInput = document.getElementById("comprimento");
  const botao = document.getElementById("calcular");
  const resultados = document.getElementById("resultados");
  const Total = document.getElementById("Total");
  const materialSelect = document.getElementById("material");
  const inputExtra = document.getElementById("inputExtra");
  const inputExtra2 = document.getElementById("inputExtra2");
  // --- lista de preços ---
  const precosMaterial = {
    DrywallTeto: 36.0,
    DrywallDivisor: 36.0,
    ForroPvc: 0,
  };

  const precosacabamentoselect = {
    BrancoLiso: 29.9,
    BrancoFrisado: 16.9,
    Amadeirado: 33.9,
  };

  const precossanca = {
    RodaForro: 2,
    Sanca: 1,
  }

  // começa escondido
  inputExtra.classList.remove("show");
  inputExtra2.classList.remove("show");

  // MOSTRAR/ESCONDER input conforme seleção
  materialSelect.addEventListener("change", () => {
    const matee = materialSelect.value;

    if (matee !== "DrywallTeto" && matee !== "DrywallDivisor" && matee !== "") {
      inputExtra.style.display = "block";
      inputExtra2.style.display = "block";
      setTimeout(() => inputExtra.classList.add("show"), 10);
      setTimeout(() => inputExtra2.classList.add("show"), 10);
    } else {
      inputExtra.classList.remove("show");
      inputExtra2.classList.remove("show");
      setTimeout(() => (inputExtra.style.display = "none"), 400);
      setTimeout(() => (inputExtra2.style.display = "none"), 400);
    }
  });

  // Pegando os elementos do HTML
  botao.addEventListener("click", () => {
    const largura = parseFloat(larguraInput.value);
    const comprimento = parseFloat(comprimentoInput.value);

    if (
      isNaN(largura) ||
      isNaN(comprimento) ||
      largura <= 0 ||
      comprimento <= 0
    ) {
      alert("Por favor, insira valores válidos para largura e comprimento.");
      return;
    }

    const mat = materialSelect.value;

    // se nada for selecionado, retorna
    if (!mat) {
      alert("Selecione o material.");
      return;
    }

    // --- cálculos Drywall Teto ---
    if (mat === "DrywallTeto") {
      calculardrywallTeto(
        largura,
        comprimento,
        precosMaterial,
        mat,
        resultados,
        Total
      );
    } else if (mat === "DrywallDivisor") {
      calculardrywallDivisor(
        largura,
        comprimento,
        precosMaterial,
        mat,
        resultados,
        Total
      );
    } else if (mat === "ForroPvc") {
const inputExtra = parseFloat(document.getElementById("detalhe").value);
  const inputExtra2 = document.getElementById("inputExtra2").value;

  if (
    isNaN(inputExtra) ||
    inputExtra <= 0 ||
    !(inputExtra === largura || inputExtra === comprimento)
  ) {
    alert("Por favor, insira valores válidos para o tamanho da peça.");
    return;
  }

  const AcabamentoSelect = document.getElementById("acabamento");
  const Acabamento = AcabamentoSelect.value;

  if (!Acabamento) {
    alert("Selecione o acabamento.");
    return;
  }

  if (!inputExtra2) {
    alert("Selecione uma das opções (Sanca ou Roda Forro).");
    return;
  }

  calcularPvc(
    largura,
    comprimento,
    precosMaterial,
    mat,
    resultados,
    Total,
    inputExtra,
    inputExtra2,
    precossanca,
    precosacabamentoselect,
    Acabamento
  );
    }
  });
});
