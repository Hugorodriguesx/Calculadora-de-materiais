document.addEventListener("DOMContentLoaded", () => {
  const larguraInput = document.getElementById("largura");
  const comprimentoInput = document.getElementById("comprimento");
  const botao = document.getElementById("calcular");
  const resultados = document.getElementById("resultados");

  botao.addEventListener("click", () => {
    const largura = parseFloat(larguraInput.value);
    const comprimento = parseFloat(comprimentoInput.value);

    if (isNaN(largura) || isNaN(comprimento) || largura <= 0 || comprimento <= 0) {
      alert("Por favor, insira valores válidos para largura e comprimento.");
      return;
    }

    // --- cálculos ---
    const metroQuadrado = largura * comprimento;
    const cantoneira = Math.ceil(((largura * 2) + (comprimento * 2)) / 3);
    const quantidadePlacas = Math.ceil(metroQuadrado / 2.16);
    const Gn25 = Math.ceil(quantidadePlacas * 28);
    const F530 = Math.ceil(Math.max(largura, comprimento) / 0.6);
    const regulador = Math.ceil(F530 * 2.5);
    const tirante = Math.ceil(regulador * 0.3 / 3);

    // --- exibe resultado na página ---
      resultados.innerHTML = `
      <div class="caixa">
        <label>Quantidade de Placas</label></br>
        <input type="text" value="${quantidadePlacas}" readonly>
      </div> 
      <div class="caixa">
        <label>Quantidade de Cantoneira</label></br>
        <input type="text" value="${cantoneira}" readonly>
      </div>
      <div class="caixa">
        <label>F530</label></br>
        <input type="text" value="${F530}" readonly>
      </div>
      <div class="caixa">
        <label>Regulador</label></br>
        <input type="text" value="${regulador}" readonly>
      </div>
      <div class="caixa">
        <label>Tirante</label></br>
        <input type="text" value="${tirante}" readonly>
      </div>
      <div class="caixa">
        <label>GN25</label></br>
        <input type="text" value="${Gn25}" readonly>
      </div>
    `;
  });
});