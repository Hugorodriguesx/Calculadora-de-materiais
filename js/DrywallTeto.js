export function calculardrywallTeto(
  largura,
  comprimento,
  precosMaterial,
  mat,
  resultados,
  Total
) {
  const metroQuadrado = largura * comprimento;
  const cantoneira = Math.ceil((largura * 2 + comprimento * 2) / 3);
  const quantidadePlacas = Math.ceil(metroQuadrado / 2.16);
  const Gn25 = Math.ceil(quantidadePlacas * 28);

  const precocnt = 6.7;
  const precorgl = 1.5;
  const precogn = 6.0;
  const unidadesgn25 = 50;
  const precotrt = 7.0;
  const preco530 = 9.9;
  const precogn35 = 7.5;
  const precomassa5 = 24.9;
  const precomassa15 = 45.0;
  const precomassa25 = 59.0;
  const precofita45 = 14.0;
  const precofita90 = 24.0;
  const bucha = 6.50;

  //cálculos dos materiais
  const espacamento = 0.6;
  const tamanhoPeca = 3;

  const linhas = Math.ceil(Math.max(largura, comprimento) / espacamento);
  const linhaComprimento = Math.min(largura, comprimento);
  const pecasInteirasPorLinha = Math.floor(linhaComprimento / tamanhoPeca);
  const sobraPorLinha = linhaComprimento % tamanhoPeca;
  const sobraTotal = sobraPorLinha * linhas;
  const pecasReaproveitadas = Math.floor(sobraTotal / tamanhoPeca);

  const F530 =
    linhas * pecasInteirasPorLinha +
    Math.ceil((sobraTotal % tamanhoPeca) / tamanhoPeca) +
    pecasReaproveitadas;

  const regulador = Math.ceil(F530 * 2.5);
  const tirante = Math.ceil((regulador * 0.3) / 3);

  // cálculo dos preços individuais
  const precoMaterial = precosMaterial[mat] || 0;

  const precoPlaca = precoMaterial * quantidadePlacas;
  const precocantoneira = precocnt * cantoneira;
  const pacotesGn25 = Math.ceil(Gn25 / unidadesgn25);
  const totalGn25 = pacotesGn25 * unidadesgn25;
  const precoGn25 = pacotesGn25 * precogn;
  const precoF530 = preco530 * F530;
  const precoregulador = precorgl * regulador;
  const precotirante = precotrt * tirante;
  const massa =
    metroQuadrado < 10
      ? "Massa 5Kg"
      : metroQuadrado < 30
      ? "Massa 15Kg"
      : metroQuadrado < 50
      ? "Massa 25Kg"
      : "Massa 25Kg";
  const quantidademassa =
    metroQuadrado < 50 ? 1 : Math.ceil(metroQuadrado / 50);
  const precomassa =
    metroQuadrado < 10
      ? precomassa5
      : metroQuadrado < 30
      ? precomassa15
      : metroQuadrado < 50
      ? precomassa25 
      : precomassa25 * quantidademassa;
  const qtdGn35 = totalGn25 / 2;
  const pacotesGn35 = Math.ceil(qtdGn35 / 50);
  const totalGn35 = pacotesGn35 * 50;
  const precoGn35 = pacotesGn35 * precogn35;
  const qtdbucha = totalGn25 / 2;
  const pacotesbucha = Math.ceil(qtdbucha / 50);
  const totalbucha = pacotesbucha * 50;
  const precobucha = pacotesbucha * bucha;
  const fita = metroQuadrado < 45 ? "Fita 45" : "Fita 90";
  const quantidadefita = metroQuadrado < 45 ? 1 : Math.ceil(metroQuadrado / 90);
  const precofita = metroQuadrado < 45 ? precofita45 : precofita90 * quantidadefita;

  // Cálculo do preço final
  const precoTotal =
    precoPlaca +
    precocantoneira +
    precoGn25 +
    precoGn35 +
    precoF530 +
    precoregulador +
    precotirante +
    precomassa +
    precobucha+
    precofita;

  // FORMATAÇÃO
  const format = (v) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // Visual no Html
  resultados.innerHTML = `
      <div class="caixa">
        <label>Quantidade de Placas</label></br>
        <input type="text" value="${quantidadePlacas}" readonly>
        <input type="text" value="${format(precoPlaca)}" readonly>
      </div> 
      

      <div class="caixa">
        <label>Quantidade de Cantoneira</label></br>
        <input type="text" value="${cantoneira}" readonly>
        <input type="text" value="${format(precocantoneira)}" readonly>
      </div>


      <div class="caixa">
        <label>F530</label></br>
        <input type="text" value="${F530}" readonly>
        <input type="text" value="${format(precoF530)}" readonly>
      </div>


      <div class="caixa">
        <label>Regulador</label></br>
        <input type="text" value="${regulador}" readonly>
        <input type="text" value="${format(precoregulador)}" readonly>
      </div>


      <div class="caixa">
        <label>Tirante</label></br>
        <input type="text" value="${tirante}" readonly>
        <input type="text" value="${format(precotirante)}" readonly>
      </div>


      <div class="caixa">
        <label>Bucha</label></br>
        <input type="text" value="${totalGn35}" readonly>
        <input type="text" value="${format(precobucha)}" readonly>
      </div>


      <div class="caixa">
        <label>GN25</label></br>
        <input type="text" value="${totalGn25}" readonly>
        <input type="text" value="${format(precoGn25)}" readonly>
      </div>


      <div class="caixa">
        <label>GN35</label></br>
        <input type="text" value="${totalGn35}" readonly>
        <input type="text" value="${format(precoGn35)}" readonly>
      </div>


      <div class="caixa">
        <label>Massa</label></br>
        <input type="text" value="${quantidademassa} ${massa}" readonly>
        <input type="text" value="${format(precomassa)}" readonly>
      </div>

      
      <div class="caixa">
        <label>Fita</label></br>
        <input type="text" value="${quantidadefita} ${fita}" readonly>
        <input type="text" value="${format(precofita)}" readonly>
      </div>
  `;

  Total.innerHTML = `
      <div>
        <label>Total</label></br>
        <input type="text" value="${format(precoTotal)}" readonly>
      </div>
  `;
}
