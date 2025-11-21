export function calculardrywallDivisor(
  largura,
  comprimento,
  precosMaterial,
  mat,
  resultados,
  Total
) {
  //preços
  const oprecoguia = 11.0;
  const oprecomontante = 14.0;
  const oprecogn = 6.0;
  const oprecopacoteparafusopf = 12.0;
  const oprecobucha = 6.5;
  const precomassa5 = 24.9;
  const precomassa15 = 45.0;
  const precomassa25 = 59.0;
  const precofita45 = 14.0;
  const precofita90 = 24.0;

  //cálculos dos materiais
  const metroQuadrado = largura * comprimento;
  const guia = Math.ceil((largura * 2 + comprimento * 2) / 3);
  const quantidadePlacas = Math.ceil(metroQuadrado / 2.16) * 2;
  const Gn25 = Math.ceil(quantidadePlacas * 28);
  const pacotesGn25 = Math.ceil(Gn25 / 50);
  const quantidadeGn25 = pacotesGn25 * 50;
  const pacoteparafuso = Math.ceil(metroQuadrado / 20);
  const Quantidadeparafuso = pacoteparafuso * 50;

  const pacotebucha = Math.ceil(metroQuadrado / 20);
  const Quantidadebucha = pacotebucha * 50;
  const bucha = Quantidadebucha;
  const espacamento = 0.6;
  const tamanhoPeca = 3;

  // número de linhas de montante
  const linhas = Math.ceil(Math.max(largura, comprimento) / espacamento);

  // comprimento total de uma linha
  const linhaComprimento = Math.min(largura, comprimento);

  // peças inteiras usadas por linha
  const pecasInteirasPorLinha = Math.floor(linhaComprimento / tamanhoPeca);

  // sobra (em metros) de cada linha
  const sobraPorLinha = linhaComprimento % tamanhoPeca;

  // soma total de sobras de todas as linhas
  const sobraTotal = sobraPorLinha * linhas;

  // converte sobras em peças inteiras aproveitadas
  const pecasReaproveitadas = Math.floor(sobraTotal / tamanhoPeca);

  // total de peças necessárias
  const montante =
    linhas * pecasInteirasPorLinha +
    Math.ceil((sobraTotal % tamanhoPeca) / tamanhoPeca) +
    pecasReaproveitadas;
  const massa =
    metroQuadrado < 10
      ? "Massa 5Kg"
      : metroQuadrado < 30
      ? "Massa 15Kg"
      : metroQuadrado < 50
      ? "Massa 25Kg"
      : "Massa 25Kg";
  const fita = metroQuadrado < 45 ? "Fita 45" : "Fita 90";

  //cálculos preços individuais
  const precoMaterial = precosMaterial[mat] || 0;
  const quantidadefita = metroQuadrado < 45 ? 1 : Math.ceil(metroQuadrado / 90);
  const precofita =
    metroQuadrado < 45 ? precofita45 : precofita90 * quantidadefita;
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
  const precoplaca = precosMaterial[mat] * quantidadePlacas;
  const precoguia = guia * oprecoguia;
  const precomontante = montante * oprecomontante;
  const precogn25 = pacotesGn25 * oprecogn;
  const precoparafusopa = pacoteparafuso * oprecopacoteparafusopf;
  const precobucha = pacotebucha * oprecobucha;

  //cálculos preço final
  const precoTotal =
    precofita +
    precomassa +
    precoplaca +
    precoguia +
    precomontante +
    precogn25 +
    precoparafusopa +
    precobucha;

  //formatação
  const format = (v) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  //Visual HTML
  resultados.innerHTML = `
      <div class="caixa">
        <label>Quantidade de Placas</label></br>
        <input type="text" value="${quantidadePlacas}" readonly>
        <input type="text" value="${format(precoplaca)}" readonly>
      </div> 


      <div class="caixa">
        <label>Quantidade de Guias</label></br>
        <input type="text" value="${guia}" readonly>
        <input type="text" value="${format(precoguia)}" readonly>
      </div>


      <div class="caixa">
        <label>Montante</label></br>
        <input type="text" value="${montante}" readonly>
        <input type="text" value="${format(precomontante)}" readonly>
      </div>


      <div class="caixa">
        <label>GN25</label></br>
        <input type="text" value="${quantidadeGn25}" readonly>
        <input type="text" value="${format(precogn25)}" readonly>
      </div>


      <div class="caixa">
        <label>Parafuso PF</label></br>
        <input type="text" value="${Quantidadeparafuso}" readonly>
        <input type="text" value="${format(precoparafusopa)}" readonly>
      </div>


      <div class="caixa">
        <label>Bucha</label></br>
        <input type="text" value="${bucha}" readonly>
        <input type="text" value="${format(precobucha)}" readonly>
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
