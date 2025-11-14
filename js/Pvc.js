export function calcularPvc(
  largura,
  comprimento,
  precosMaterial,
  mat,
  resultados,
  Total,
  inputExtra,
  inputExtra2, // "Sanca" ou "RodaForro"
  precosanca,
  precosacabamentoselect,
  Acabamento
) {

  // preços fixos
  const oprecometalon = 19.00;
  const oprecosubestrutura = 19.00;
  const oprecopacoteparafusopa = 7.50;
  const oprecopacoteparafuso35 = 6.50;
  const oprecobucha = 4.50;
  const oprecoacabamentodecanto = 4.00;

  // cálculos base
  const metroQuadrado = largura * comprimento;

  let folha;
  if (inputExtra === largura) {
    folha = Math.ceil(comprimento / 0.2);
  } else if (inputExtra === comprimento) {
    folha = Math.ceil(largura / 0.2);
  } else {
    alert("O tamanho informado não corresponde à largura nem ao comprimento.");
    folha = 0;
  }

  const acabamento = Math.ceil((largura * 2 + comprimento * 2) / 6);
  const metalon = Math.ceil(metroQuadrado / 0.6 / 6);
  const subestrutura = Math.ceil(metroQuadrado / 2.5 / 6);
  const pacoteparafusopa = Math.ceil(metroQuadrado / 10);
  const Quantidadeparafusopa = pacoteparafusopa * 50;
  const pacoteparafuso35 = Math.ceil(metroQuadrado / 20);
  const Quantidadeparafuso35 = pacoteparafuso35 * 50;
  const pacotebucha = Math.ceil(metroQuadrado / 20);
  const QuantidadeBucha = pacotebucha * 50;
  const acabamentodecanto = 4;

  // --- preços de acabamento e sanca ---
  const precoAcabamentoEscolhido = precosacabamentoselect[Acabamento] || 0;
  const precoFolha = precoAcabamentoEscolhido * folha;

  // preço do item escolhido (Sanca ou Roda Forro)
  const precoSancaOuForro = (precosanca[inputExtra2] || 0) * acabamento;

  // preços dos demais itens
  const precoMetalon = metalon * oprecometalon;
  const precoSubestrutura = subestrutura * oprecosubestrutura;
  const precoParafusoPA = pacoteparafusopa * oprecopacoteparafusopa;
  const precoParafuso35 = pacoteparafuso35 * oprecopacoteparafuso35;
  const precoBucha = pacotebucha * oprecobucha;
  const precoAcabamentoDeCanto = acabamentodecanto * oprecoacabamentodecanto;

  // total geral
  const precoTotal =
    precoFolha +
    precoSancaOuForro +
    precoMetalon +
    precoSubestrutura +
    precoParafusoPA +
    precoParafuso35 +
    precoBucha +
    precoAcabamentoDeCanto;

  // formatação BRL
  const format = (v) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // saída HTML
  resultados.innerHTML = `
      <div class="caixa">
        <label>Placas de PVC</label></br>
        <input type="text" value="${folha}" readonly>
        <input type="text" value="${format(precoFolha)}" readonly>
      </div> 

      <div class="caixa">
        <label>${inputExtra2 === "Sanca" ? "Sanca" : "Roda Forro"}</label></br>
        <input type="text" value="${acabamento}" readonly>
        <input type="text" value="${format(precoSancaOuForro)}" readonly>
      </div>      
      
      <div class="caixa">
        <label>Metalon</label></br>
        <input type="text" value="${metalon}" readonly>
        <input type="text" value="${format(precoMetalon)}" readonly>
      </div> 

      <div class="caixa">
        <label>Subestrutura</label></br>
        <input type="text" value="${subestrutura}" readonly>
        <input type="text" value="${format(precoSubestrutura)}" readonly>
      </div> 

      <div class="caixa">
        <label>Parafuso PA</label></br>
        <input type="text" value="${Quantidadeparafusopa}" readonly>
        <input type="text" value="${format(precoParafusoPA)}" readonly>
      </div> 

      <div class="caixa">
        <label>Parafuso 35</label></br>
        <input type="text" value="${Quantidadeparafuso35}" readonly>
        <input type="text" value="${format(precoParafuso35)}" readonly>
      </div> 

      <div class="caixa">
        <label>Bucha</label></br>
        <input type="text" value="${QuantidadeBucha}" readonly>
        <input type="text" value="${format(precoBucha)}" readonly>
      </div> 

      <div class="caixa">
        <label>Acabamento de Canto</label></br>
        <input type="text" value="${acabamentodecanto}" readonly>
        <input type="text" value="${format(precoAcabamentoDeCanto)}" readonly>
      </div> 
  `;

  Total.innerHTML = `
      <div>
        <label>Total</label></br>
        <input type="text" value="${format(precoTotal)}" readonly>
      </div>
  `;
}
