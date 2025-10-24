 // --- pegando medidas  ---
  document.addEventListener("DOMContentLoaded", () => {
  const larguraInput = document.getElementById("largura");
  const comprimentoInput = document.getElementById("comprimento");
  const botao = document.getElementById("calcular");
  const resultados = document.getElementById("resultados");

  // --- lista de preços ---
  const precosMaterial = {
    Drywall: 2,
    Pvc: 2,
    Gesso: 2
  };

  const precosEstilo = {
    branco: 2,
    vermelho: 2,
    azul: 2
  };

  const precocnt = 2
  const precorgl = 2
  const precogn = 2
  const precotrt = 2
  const preco530 = 2

  // Pegando os elementos do HTML
  botao.addEventListener("click", () => {
    const largura = parseFloat(larguraInput.value);
    const comprimento = parseFloat(comprimentoInput.value);

    if (isNaN(largura) || isNaN(comprimento) || largura <= 0 || comprimento <= 0) {
      alert("Por favor, insira valores válidos para largura e comprimento.");
      return;
    }

    const materialSelect = document.getElementById("material");
    const estiloSelect = document.getElementById("estilo");

    const mat = materialSelect.value
    const est = estiloSelect.value

    // se nada for selecionado, retorna
    if (!mat || !est) {
      alert("Selecione o material e o estilo.");
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
  
    // --- cálculos preços ---
    const qtd = quantidadePlacas; // pode ser ajustado se quiser outro input
    const precoMaterial = precosMaterial[mat] || 0;
    const precoEstilo = precosEstilo[est] || 0;

    const precoPlaca = (precoMaterial + precoEstilo) * qtd;
    const precocantoneira = precocnt * cantoneira;
    const precoGn25 = precogn * Gn25;
    const precoF530 = preco530 * F530;
    const precoregulador = precorgl * regulador;
    const precotirante = precotrt * tirante;

    const precoTotal = precoPlaca + precocantoneira + precoGn25 + precoF530 + precoregulador + precotirante;

    // --- exibe resultado na página ---
      resultados.innerHTML = `
      <div class="caixa">
        <label>Quantidade de Placas</label></br>
        <input type="text" value="${quantidadePlacas}" readonly>
        <input type="text" value="R$ ${precoPlaca}" readonly>
      </div> 
      <div class="caixa">
        <label>Quantidade de Cantoneira</label></br>
        <input type="text" value="${cantoneira}" readonly>
        <input type="text" value="R$ ${precocantoneira}" readonly>
      </div>
      <div class="caixa">
        <label>F530</label></br>
        <input type="text" value="${F530}" readonly>
        <input type="text" value="R$ ${precoF530}" readonly>
      </div>
      <div class="caixa">
        <label>Regulador</label></br>
        <input type="text" value="${regulador}" readonly>
        <input type="text" value="R$ ${precoregulador}" readonly>
      </div>
      <div class="caixa">
        <label>Tirante</label></br>
        <input type="text" value="${tirante}" readonly>
        <input type="text" value="R$ ${precotirante}" readonly>
      </div>
      <div class="caixa">
        <label>GN25</label></br>
        <input type="text" value="${Gn25}" readonly>
        <input type="text" value="R$ ${precoGn25}" readonly>
      </div>
       `;
      Total.innerHTML= `
      <div>
        <label>Total</label></br>
        <input type="text" value="R$ ${precoTotal}" readonly
      </div> 
         
     `;
  });
});