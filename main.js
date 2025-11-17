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
  const resetar = document.getElementById("resetar");

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
    RodaForro: 25.90,
    Sanca: 26.90,
  };

  const precossancaamadeirado = {
    RodaForro: 27.90,
    Sanca: 29.90,
  };

  // começa escondido
  inputExtra.style.display = "none";
  inputExtra2.style.display = "none";
  resetar.style.display = "none";

  const loading = document.getElementById("loading-screen");

  function mostrarLoading() {
    loading.style.display = "flex";
  }

  function esconderLoading() {
    loading.style.display = "none";
  }

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

  // BOTÃO CALCULAR
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

    if (!mat) {
      alert("Selecione o material.");
      return;
    }

    // --- LOADING AO CALCULAR ---
    mostrarLoading();

    setTimeout(() => {
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
        const detalheVal = parseFloat(document.getElementById("detalhe").value);
        const extra2Val = document.getElementById("inputExtra2").value;

        if (
          isNaN(detalheVal) ||
          detalheVal <= 0 ||
          !(detalheVal === largura || detalheVal === comprimento)
        ) {
          alert("Por favor, insira valores válidos para o tamanho da peça.");
          esconderLoading();
          return;
        }

        const AcabamentoSelect = document.getElementById("acabamento");
        const Acabamento = AcabamentoSelect.value;

        if (!Acabamento) {
          alert("Selecione o acabamento.");
          esconderLoading();
          return;
        }

        if (!extra2Val) {
          alert("Selecione uma das opções (Sanca ou Roda Forro).");
          esconderLoading();
          return;
        }

        calcularPvc(
          largura,
          comprimento,
          precosMaterial,
          mat,
          resultados,
          Total,
          detalheVal,
          extra2Val,
          precossanca,
          precosacabamentoselect,
          precossancaamadeirado,
          Acabamento
        );
      }

      esconderLoading();
      resetar.style.display = "block";

    }, 500); // pequeno delay para o loading aparecer
  });

  // BOTÃO RESET
  resetar.addEventListener("click", () => {
    mostrarLoading();

    setTimeout(() => {

      larguraInput.value = "";
      comprimentoInput.value = "";
      materialSelect.value = "";
      document.getElementById("acabamento").value = "";
      document.getElementById("inputExtra2").value = "";
      document.getElementById("detalhe").value = "";

      inputExtra.classList.remove("show");
      inputExtra.style.display = "none";
      inputExtra2.classList.remove("show");
      inputExtra2.style.display = "none";

      resultados.innerHTML = "";
      Total.innerHTML = "";

      resetar.style.display = "none";

      esconderLoading();

    }, 400);
  });

});
