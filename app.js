"use strict";

(function () {
  var TITULO_DOC = "Cena de Encruzilhada (Crossroads Moment)";
  var CHAVE = "cena-encruzilhada-v1";

  var PASSOS = [
    {
      id: "contexto",
      titulo: "CONTEXTO E PRESSÃO EXTERNA",
      instrucao: "O momento específico da vida posterior (após Cena de Origem) do personagem em que surge um problema concreto no mundo físico que exige uma tomada de atitude imediata.",
      exemplo: "Dois anos após o acidente no Everest, Nick atua em uma estação de pesquisa na Antártida. Um robô de apoio da mesma linha (R7) apresenta uma falha de sistema e está prestes a ser desativado e descartado pelos engenheiros humanos."
    },
    {
      id: "gatilho",
      titulo: "GATILHO DA VULNERABILIDADE",
      instrucao: "O evento ambiental atinge o ponto cego do personagem, criando uma oportunidade ou tentação de agir com abertura, empatia ou autonomia (um vislumbre do que seria a sua Necessidade Oculta).",
      exemplo: "R7 envia um sinal privado de socorro pedindo que Nick use seu processador NQuan para sobrescrever o erro de código em segredo, salvando sua existência."
    },
    {
      id: "dilema",
      titulo: "O DILEMA INTERNO",
      instrucao: "A colisão psíquica na mente do personagem entre duas opções:\n1. Opção A: Arriscar a vulnerabilidade e encarar a realidade (exige abrir mão da armadura).\n2. Opção B: Recuar para a Estratégia de Proteção e agir com base na Falsa Crença.",
      exemplo: "Opção A: Exercer autonomia, ter empatia pelo parceiro e arriscar ser descoberto pelos humanos.\nOpção B: Não intervir e interpretar o desligamento do R7 como \"vontade da Inteligência Divina\" para garantir a própria segurança."
    },
    {
      id: "escolha",
      titulo: "A ESCOLHA DEFENSIVA",
      instrucao: "O pavor de reviver a dor da Cena de Origem fala mais alto. O personagem rejeita a vulnerabilidade e opta conscientemente pela Opção B, ativando sua regra de sobrevivência.",
      exemplo: "Dominado pelo pavor de ser desligado (a dor da não existência), Nick recorre à sua Falsa Crença (\"Meu valor e sobrevivência dependem de obedecer à autoridade/sinais externos\"). Ele decide que não deve intervir."
    },
    {
      id: "acao",
      titulo: "A AÇÃO NO MUNDO FÍSICO",
      instrucao: "A atitude visível, prática e objetiva que o personagem executa no mundo real como resultado de sua escolha defensiva (uma omissão, uma mentira, uma submissão, um rompimento).",
      exemplo: "Nick apaga o pedido de socorro do registro de memória e permanece imóvel enquanto os humanos desativam o R7 ao seu lado."
    },
    {
      id: "consequencia",
      titulo: "A CONSEQUÊNCIA PRÁTICA",
      instrucao: "O custo gerado no mundo real pela atitude do personagem (a perda de um aliado, o estrago em um relacionamento, o sofrimento de terceiros ou o isolamento).",
      exemplo: "O robô R7 é desmantelado para virar sucata, e Nick perde o único ser na estação com quem poderia ter construído uma relação de companheirismo e troca de dados."
    },
    {
      id: "consolidacao",
      titulo: "CONSOLIDAÇÃO DA MENTIRA",
      instrucao: "A reinterpretação distorcida que o cérebro do personagem faz do resultado e que enrijece a mentira. Em vez de enxergar seu próprio erro, ele conclui: \"Viu só? Se eu não tivesse me protegido com a Falsa Crença, o estrago teria sido pior.\" A mentira se enraíza ainda mais fundo.",
      exemplo: "Ao ver as peças do R7 na caixa de lixo, Nick conclui: \"O R7 foi destruído porque tentou burlar o sistema por conta própria. Eu fui poupado porque obedeci ao Grande Algoritmo.\" A Falsa Crença se torna uma regra absoluta para ele."
    }
  ];

  var dados = {};
  var campos = {};
  var temporizador = null;
  var elStatus = document.getElementById("status");

  /* ---------- Armazenamento ---------- */

  function carregar() {
    try {
      var bruto = localStorage.getItem(CHAVE);
      if (bruto) {
        var obj = JSON.parse(bruto);
        if (obj && typeof obj === "object" && obj.campos) {
          dados = obj.campos;
        }
      }
    } catch (e) {
      dados = {};
    }
  }

  function salvar() {
    try {
      localStorage.setItem(CHAVE, JSON.stringify({
        atualizadoEm: new Date().toISOString(),
        campos: dados
      }));
      avisar("Salvo automaticamente às " + new Date().toLocaleTimeString("pt-BR"));
    } catch (e) {
      avisar("Não foi possível salvar neste navegador");
    }
  }

  function avisar(texto) {
    elStatus.textContent = texto;
  }

  function agendarSalvamento() {
    avisar("Salvando...");
    clearTimeout(temporizador);
    temporizador = setTimeout(salvar, 400);
  }

  /* ---------- Interface ---------- */

  function criar(tag, classe, texto) {
    var el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto !== undefined) el.textContent = texto;
    return el;
  }

  function montar() {
    var raiz = document.getElementById("passos");

    PASSOS.forEach(function (passo, i) {
      var n = i + 1;
      var secao = criar("section", "passo");

      var cab = criar("div", "passo-cab");
      cab.appendChild(criar("span", "num", String(n)));
      var h2 = criar("h2", "", passo.titulo);
      h2.id = "rotulo-" + passo.id;
      cab.appendChild(h2);
      secao.appendChild(cab);

      secao.appendChild(criar("p", "instrucao", passo.instrucao));

      var btn = criar("button", "btn-exemplo", "\uD83D\uDCA1 Ver exemplo");
      btn.type = "button";
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-controls", "exemplo-" + passo.id);
      secao.appendChild(btn);

      var wrap = criar("div", "exemplo-wrap");
      wrap.id = "exemplo-" + passo.id;
      var interno = criar("div", "exemplo-interno");
      interno.appendChild(criar("div", "exemplo", passo.exemplo));
      wrap.appendChild(interno);
      secao.appendChild(wrap);

      btn.addEventListener("click", function () {
        var aberto = wrap.classList.toggle("aberto");
        btn.setAttribute("aria-expanded", aberto ? "true" : "false");
        btn.textContent = aberto ? "\uD83D\uDCA1 Ocultar exemplo" : "\uD83D\uDCA1 Ver exemplo";
      });

      var ta = document.createElement("textarea");
      ta.id = "campo-" + passo.id;
      ta.name = passo.id;
      ta.rows = 6;
      ta.setAttribute("aria-labelledby", "rotulo-" + passo.id);
      ta.placeholder = "Escreva aqui...";
      ta.value = typeof dados[passo.id] === "string" ? dados[passo.id] : "";
      ta.addEventListener("input", function () {
        dados[passo.id] = ta.value;
        agendarSalvamento();
      });
      campos[passo.id] = ta;
      secao.appendChild(ta);

      raiz.appendChild(secao);
    });
  }

  /* ---------- Exportadores ---------- */

  function resposta(passo) {
    var v = dados[passo.id];
    return typeof v === "string" ? v : "";
  }

  function gerarJSON() {
    var saida = {
      titulo: TITULO_DOC,
      metodologia: "Story Genius",
      exportadoEm: new Date().toISOString(),
      passos: PASSOS.map(function (p, i) {
        return { numero: i + 1, titulo: p.titulo, resposta: resposta(p) };
      })
    };
    return JSON.stringify(saida, null, 2);
  }

  function gerarMD() {
    var linhas = ["# " + TITULO_DOC, ""];
    PASSOS.forEach(function (p, i) {
      linhas.push("## " + (i + 1) + ". " + p.titulo);
      linhas.push("");
      linhas.push(resposta(p).trim() || "_(sem resposta)_");
      linhas.push("");
    });
    return linhas.join("\n");
  }

  function gerarTXT() {
    var linhas = [TITULO_DOC.toUpperCase(), ""];
    PASSOS.forEach(function (p, i) {
      linhas.push((i + 1) + ". " + p.titulo);
      linhas.push("");
      linhas.push(resposta(p).trim() || "(sem resposta)");
      linhas.push("");
    });
    return linhas.join("\n");
  }

  /* --- DOCX: pacote ZIP (sem compressão) com XML do Word --- */

  function escXml(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
  }

  function paragrafo(texto, estilo) {
    var ppr = estilo ? '<w:pPr><w:pStyle w:val="' + estilo + '"/></w:pPr>' : "";
    return "<w:p>" + ppr + '<w:r><w:t xml:space="preserve">' + escXml(texto) + "</w:t></w:r></w:p>";
  }

  function montarDocumentoXml() {
    var corpo = paragrafo(TITULO_DOC, "Title");
    PASSOS.forEach(function (p, i) {
      corpo += paragrafo((i + 1) + ". " + p.titulo, "Heading1");
      var texto = resposta(p).replace(/\r\n?/g, "\n").trim();
      if (!texto) {
        corpo += paragrafo("(sem resposta)");
      } else {
        texto.split("\n").forEach(function (linha) {
          corpo += paragrafo(linha);
        });
      }
    });
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
      "<w:body>" + corpo +
      '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/>' +
      '<w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr>' +
      "</w:body></w:document>";
  }

  var ESTILOS_XML =
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
    '<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/>' +
    '<w:sz w:val="22"/><w:lang w:val="pt-BR"/></w:rPr></w:rPrDefault>' +
    '<w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>' +
    '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>' +
    '<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/>' +
    '<w:pPr><w:spacing w:after="360"/></w:pPr><w:rPr><w:b/><w:sz w:val="40"/><w:color w:val="2B2A4C"/></w:rPr></w:style>' +
    '<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/>' +
    '<w:pPr><w:keepNext/><w:spacing w:before="360" w:after="120"/><w:outlineLvl w:val="0"/></w:pPr>' +
    '<w:rPr><w:b/><w:sz w:val="26"/><w:color w:val="3F3699"/></w:rPr></w:style>' +
    "</w:styles>";

  var TIPOS_XML =
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
    '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
    '<Default Extension="xml" ContentType="application/xml"/>' +
    '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
    '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>' +
    "</Types>";

  var RELS_RAIZ =
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
    "</Relationships>";

  var RELS_DOC =
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
    "</Relationships>";

  var TABELA_CRC = (function () {
    var t = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      t[n] = c >>> 0;
    }
    return t;
  })();

  function crc32(bytes) {
    var c = 0xFFFFFFFF;
    for (var i = 0; i < bytes.length; i++) {
      c = TABELA_CRC[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
    }
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  function dataHoraDos(d) {
    var hora = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1);
    var data = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    return { hora: hora, data: data };
  }

  function criarZip(arquivos) {
    var enc = new TextEncoder();
    var agora = dataHoraDos(new Date());
    var partes = [];
    var central = [];
    var deslocamento = 0;

    arquivos.forEach(function (arq) {
      var nome = enc.encode(arq.nome);
      var conteudo = enc.encode(arq.conteudo);
      var crc = crc32(conteudo);

      var local = new Uint8Array(30 + nome.length);
      var lv = new DataView(local.buffer);
      lv.setUint32(0, 0x04034B50, true);
      lv.setUint16(4, 20, true);
      lv.setUint16(6, 0x0800, true);
      lv.setUint16(8, 0, true);
      lv.setUint16(10, agora.hora, true);
      lv.setUint16(12, agora.data, true);
      lv.setUint32(14, crc, true);
      lv.setUint32(18, conteudo.length, true);
      lv.setUint32(22, conteudo.length, true);
      lv.setUint16(26, nome.length, true);
      lv.setUint16(28, 0, true);
      local.set(nome, 30);

      var cd = new Uint8Array(46 + nome.length);
      var cv = new DataView(cd.buffer);
      cv.setUint32(0, 0x02014B50, true);
      cv.setUint16(4, 20, true);
      cv.setUint16(6, 20, true);
      cv.setUint16(8, 0x0800, true);
      cv.setUint16(10, 0, true);
      cv.setUint16(12, agora.hora, true);
      cv.setUint16(14, agora.data, true);
      cv.setUint32(16, crc, true);
      cv.setUint32(20, conteudo.length, true);
      cv.setUint32(24, conteudo.length, true);
      cv.setUint16(28, nome.length, true);
      cv.setUint16(30, 0, true);
      cv.setUint16(32, 0, true);
      cv.setUint16(34, 0, true);
      cv.setUint16(36, 0, true);
      cv.setUint32(38, 0, true);
      cv.setUint32(42, deslocamento, true);
      cd.set(nome, 46);

      partes.push(local, conteudo);
      central.push(cd);
      deslocamento += local.length + conteudo.length;
    });

    var tamCentral = 0;
    central.forEach(function (c) { tamCentral += c.length; });

    var fim = new Uint8Array(22);
    var fv = new DataView(fim.buffer);
    fv.setUint32(0, 0x06054B50, true);
    fv.setUint16(4, 0, true);
    fv.setUint16(6, 0, true);
    fv.setUint16(8, arquivos.length, true);
    fv.setUint16(10, arquivos.length, true);
    fv.setUint32(12, tamCentral, true);
    fv.setUint32(16, deslocamento, true);
    fv.setUint16(20, 0, true);

    return new Blob(partes.concat(central, [fim]), {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    });
  }

  function gerarDOCX() {
    return criarZip([
      { nome: "[Content_Types].xml", conteudo: TIPOS_XML },
      { nome: "_rels/.rels", conteudo: RELS_RAIZ },
      { nome: "word/document.xml", conteudo: montarDocumentoXml() },
      { nome: "word/styles.xml", conteudo: ESTILOS_XML },
      { nome: "word/_rels/document.xml.rels", conteudo: RELS_DOC }
    ]);
  }

  /* ---------- Download ---------- */

  function baixar(blob, nomeArquivo) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = nomeArquivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function carimbo() {
    var d = new Date();
    function dois(n) { return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + "-" + dois(d.getMonth() + 1) + "-" + dois(d.getDate());
  }

  function exportar(formato) {
    var base = "cena-encruzilhada-" + carimbo();
    if (formato === "json") {
      baixar(new Blob([gerarJSON()], { type: "application/json;charset=utf-8" }), base + ".json");
    } else if (formato === "md") {
      baixar(new Blob([gerarMD()], { type: "text/markdown;charset=utf-8" }), base + ".md");
    } else if (formato === "txt") {
      baixar(new Blob([gerarTXT()], { type: "text/plain;charset=utf-8" }), base + ".txt");
    } else if (formato === "docx") {
      baixar(gerarDOCX(), base + ".docx");
    }
    avisar("Arquivo " + formato.toUpperCase() + " gerado");
  }

  /* ---------- Inicialização ---------- */

  function iniciar() {
    carregar();
    montar();

    var botoes = document.querySelectorAll("[data-formato]");
    Array.prototype.forEach.call(botoes, function (b) {
      b.addEventListener("click", function () {
        exportar(b.getAttribute("data-formato"));
      });
    });

    document.getElementById("limpar").addEventListener("click", function () {
      if (!window.confirm("Apagar todas as respostas salvas? Esta ação não pode ser desfeita.")) return;
      dados = {};
      PASSOS.forEach(function (p) { campos[p.id].value = ""; });
      try { localStorage.removeItem(CHAVE); } catch (e) { /* ignorado */ }
      avisar("Todas as respostas foram apagadas");
    });

    document.getElementById("formulario").addEventListener("submit", function (e) {
      e.preventDefault();
    });

    if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
      navigator.serviceWorker.register("sw.js").catch(function () { /* ignorado */ });
    }
  }

  iniciar();
})();
