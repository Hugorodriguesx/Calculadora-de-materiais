// --- pegando medidas  ---
document.addEventListener("DOMContentLoaded", () => {
  const larguraInput = document.getElementById("largura");
  const comprimentoInput = document.getElementById("comprimento");
  const botao = document.getElementById("calcular");
  const resultados = document.getElementById("resultados");
  const materialSelect = document.getElementById("material");
  const inputExtra = document.getElementById("inputExtra");

  // --- lista de preços ---
  const precosMaterial = {
    DrywallTeto: 36.0,
    DrywalDivisor: 36.0,
    BrancoLiso: 29.9,
    brancofrisado: 16.9,
    amadeirado: 33.9,
  };

  //  começa escondido
  inputExtra.classList.remove("show");

  //  MOSTRAR/ESCONDER input conforme seleção
  materialSelect.addEventListener("change", () => {
    const matee = materialSelect.value;

    if (matee !== "DrywallTeto" && matee !== "DrywallDivisor" && matee !== "") {
      inputExtra.style.display = "block";
      // pequeno delay pra permitir que o browser reconheça o display antes da animação
      setTimeout(() => inputExtra.classList.add("show"), 10);
    } else {
      inputExtra.classList.remove("show");
      // espera o fade-out terminar pra esconder de vez
      setTimeout(() => (inputExtra.style.display = "none"), 400);
    }
  });

  // --- lista de preços Drywall Teto---

  const precocnt = 6.7;
  const precorgl = 1.5;
  const precogn = 6.0;
  const unidadesgn25 = 50;
  const precotrt = 7.0;
  const preco530 = 9.9;

  // --- lista de preços Drywall Divisor ---

  // --- lista de preços Pvc ---

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

    const materialSelect = document.getElementById("material");

    const mat = materialSelect.value;

    // se nada for selecionado, retorna
    if (!mat) {
      alert("Selecione o material.");
      return;
    }

    // --- cálculos Drywall Teto---
    if (mat === "DrywallTeto") {
      const metroQuadrado = largura * comprimento;
      const cantoneira = Math.ceil((largura * 2 + comprimento * 2) / 3);
      const quantidadePlacas = Math.ceil(metroQuadrado / 2.16);
      const Gn25 = Math.ceil(quantidadePlacas * 28);
      const F530 = Math.ceil(Math.max(largura, comprimento) / 0.6);
      const regulador = Math.ceil(F530 * 2.5);
      const tirante = Math.ceil((regulador * 0.3) / 3);

      // --- cálculos preços ---
      const qtd = quantidadePlacas; // pode ser ajustado se quiser outro input
      const precoMaterial = precosMaterial[mat] || 0;

      const precoPlaca = precoMaterial * qtd;
      const precocantoneira = precocnt * cantoneira;
      const pacotesGn25 = Math.ceil(Gn25 / unidadesgn25); // arredonda para o próximo pacote de 50
      const totalGn25 = pacotesGn25 * unidadesgn25; // total real de unidades
      const precoGn25 = pacotesGn25 * precogn; // preço total conforme pacotes
      const precoF530 = preco530 * F530;
      const precoregulador = precorgl * regulador;
      const precotirante = precotrt * tirante;

      const precoTotal = parseFloat(
        precoPlaca +
          precocantoneira +
          precoGn25 +
          precoF530 +
          precoregulador +
          precotirante
      );

      // --- formatação do preço ---
      const precoGn25Formatado = precoGn25.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const precoplacaFormatado = precoPlaca.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const precotiranteFormatado = precotirante.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const precoreguladorFormatado = precoregulador.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const precof530Formatado = precoF530.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const precocantoneiraFormatado = precocantoneira.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const precoTotalFormatado = precoTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      // --- exibe resultado na página ---
      resultados.innerHTML = `
      <div class="caixa">
        <label>Quantidade de Placas</label></br>
        <input type="text" value="${quantidadePlacas}" readonly>
        <input type="text" value="R$ ${precoplacaFormatado}" readonly>
      </div> 
      <div class="caixa">
        <label>Quantidade de Cantoneira</label></br>
        <input type="text" value="${cantoneira}" readonly>
        <input type="text" value="R$ ${precocantoneiraFormatado}" readonly>
      </div>
      <div class="caixa">
        <label>F530</label></br>
        <input type="text" value="${F530}" readonly>
        <input type="text" value="R$ ${precof530Formatado}" readonly>
      </div>
      <div class="caixa">
        <label>Regulador</label></br>
        <input type="text" value="${regulador}" readonly>
        <input type="text" value="R$ ${precoreguladorFormatado}" readonly>
      </div>
      <div class="caixa">
        <label>Tirante</label></br>
        <input type="text" value="${tirante}" readonly>
        <input type="text" value="R$ ${precotiranteFormatado}" readonly>
      </div>
      <div class="caixa">
        <label>GN25</label></br>
        <input type="text" value="${totalGn25}" readonly>
        <input type="text" value="R$ ${precoGn25Formatado}" readonly>
      </div>
       `;
      Total.innerHTML = `
      <div>
        <label>Total</label></br>
        <input type="text" value="${precoTotalFormatado}" readonly
      </div> 
         
     `;
    }

    // --- cáculos Drywall Divisor ---
    else if (mat === "DrywallDivisor") {
      const metroQuadrado = largura * comprimento;
      const guia = Math.ceil((largura * 2 + comprimento * 2) / 3);
      const quantidadePlacas = Math.ceil(metroQuadrado / 2.16) * 2;
      const Gn25 = Math.ceil((quantidadePlacas * 28) / 50);
      const pacotesGn25 = Math.ceil(Gn25 * 50);
      const montante = Math.ceil(Math.max(largura, comprimento) / 0.6);
      const pacoteparafuso = Math.ceil(metroQuadrado / 20);
      const Quantidadeparafuso = pacoteparafuso * 50;
      const bucha = Quantidadeparafuso;

      // --- cálculos preços ---

      // --- formatação do preço ---

      // --- exibe resultado na página ---
      resultados.innerHTML = `
      <div class="caixa">
        <label>Quantidade de Placas</label></br>
        <input type="text" value="${quantidadePlacas}" readonly>
        <input type="text" value="" readonly>
      </div> 
      <div class="caixa">
        <label>Quantidade de Guias</label></br>
        <input type="text" value="${guia}" readonly>
        <input type="text" value="" readonly>
      </div>
      <div class="caixa">
        <label>Montante</label></br>
        <input type="text" value="${montante}" readonly>
        <input type="text" value="" readonly>
      </div>
      <div class="caixa">
        <label>Parafusos</label></br>
        <input type="text" value="${Quantidadeparafuso}" readonly>
        <input type="text" value="" readonly>
      </div>
      <div class="caixa">
        <label>Bucha</label></br>
        <input type="text" value="${bucha}" readonly>
        <input type="text" value="" readonly>
      </div>
      <div class="caixa">
        <label>GN25</label></br>
        <input type="text" value="${pacotesGn25}" readonly>
        <input type="text" value="" readonly>
      </div>
       `;
      Total.innerHTML = `
      <div>
        <label>Total</label></br>
        <input type="text" value="" readonly
      </div> 
         
     `;
    } else if ("BrancoLiso" || "brancoFrisado" || "amadeirado") {
      // se nada for selecionado, retorna
      const inputExtra = parseFloat(document.getElementById("detalhe").value);

      if (isNaN(inputExtra) || inputExtra <= 0) {
        alert("Por favor, insira valores válidos para o tamanho da peça.");
        return;
      }

      const AcabamentoSelect = document.getElementById("acabamento");
      const Acabamento = AcabamentoSelect.value;

      // se nada for selecionado, retorna
      if (!Acabamento) {
        alert("Selecione o acabamento.");
        return;
      }

      // --- cáculos Pvc ---
      const metroQuadrado = largura * comprimento;
      let folha;

      if (inputExtra === largura) {
        folha = comprimento / 0.2;
      } else if (inputExtra === comprimento) {
        folha = largura / 0.2;
      } else {
        alert(
          "O tamanho informado não corresponde à largura nem ao comprimento."
        );
        folha = 0;
      }
      const acabamento = Math.ceil((largura * 2 + comprimento * 2) / 6);
      const metalon = Math.ceil(metroQuadrado / 0.6 / 6);
      const subestrutura = Math.ceil(metroQuadrado / 2.5 / 6);
      const pacoteparafusopfpvc = Math.ceil(metroQuadrado / 10);
      const parafusopfpvc = pacoteparafusopfpvc * 50;
      const parafuso35pvc = Math.ceil(
        parafusopfpvc > 50 ? Math.ceil(metroQuadrado / 20) * 50 : parafusopfpvc
      );
      const buchapvc = Math.ceil(
        parafusopfpvc > 50 ? Math.ceil(metroQuadrado / 20) * 50 : parafusopfpvc
      );

      // --- cálculos preços ---

      resultados.innerHTML = `
      <div class="caixa">
        <label>Folhas</label></br>
        <input type="text" value="${folha}" readonly>
        <input type="text" value="" readonly>
      </div> 
      <div class="caixa">
        <label>Acabamento</label></br>
        <input type="text" value="${acabamento}" readonly>
        <input type="text" value="" readonly>
      </div>
      <div class="caixa">
        <label>Metalon</label></br>
        <input type="text" value="${metalon}" readonly>
        <input type="text" value="" readonly>
      </div>
      <div class="caixa">
        <label>Subestrutura</label></br>
        <input type="text" value="${subestrutura}" readonly>
        <input type="text" value="" readonly>
      </div>
      <div class="caixa">
        <label>Parafuso Pf</label></br>
        <input type="text" value="${parafusopfpvc}" readonly>
        <input type="text" value="" readonly>
      </div>
      <div class="caixa">
        <label>Parafuso 35</label></br>
        <input type="text" value="${parafuso35pvc}" readonly>
        <input type="text" value="" readonly>
      </div>
      <div class="caixa">
        <label>Bucha</label></br>
        <input type="text" value="${buchapvc}" readonly>
        <input type="text" value="" readonly>
      </div>
       `;
      Total.innerHTML = `
      <div>
        <label>Total</label></br>
        <input type="text" value="" readonly
      </div> 
         
     `;
    }
  });
});
