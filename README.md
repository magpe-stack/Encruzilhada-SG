# Manual do App Cena de Encruzilhada

Oct 28, 2026 · @Marinaldo

O app Cena de Encruzilhada guia você, em 7 passos, a escrever um Crossroads Moment segundo a metodologia Story Genius, de Lisa Cron, e funciona offline, sem conta e sem enviar nada para a internet.

## Instalação e primeiro uso

O app é uma pasta com seis arquivos; basta abrir o `index.html` no navegador para começar a escrever.

1. Guarde os seis arquivos (`index.html`, `styles.css`, `app.js`, `sw.js`, `manifest.json` e `icon.svg`) na mesma pasta.
2. Dê dois cliques em `index.html`. O app abre e já funciona, inclusive sem internet.
3. Para instalar como aplicativo e usar o modo offline completo, sirva a pasta por um endereço seguro: `localhost` no seu computador (por exemplo, `python -m http.server` dentro da pasta, e depois `http://localhost:8000`) ou um host HTTPS.
4. Com o endereço aberto, use a opção **Instalar** ou **Adicionar à tela inicial** do navegador. No Chrome e no Edge, o ícone aparece na barra de endereços.

O service worker (`sw.js`) só é registrado em `https` ou `localhost`. Abrindo o arquivo direto do disco (`file://`), tudo funciona, mas sem instalação e sem cache offline.

## Os 7 passos da cena

O formulário tem sempre 7 campos, nesta ordem, cada um com sua instrução e um espaço amplo para o seu texto. Preencha de cima para baixo: cada passo nasce do anterior.

| Nº | Campo | O que escrever (instrução do app) |
| --- | --- | --- |
| 1 | CONTEXTO E PRESSÃO EXTERNA | O momento específico da vida posterior (após Cena de Origem) do personagem em que surge um problema concreto no mundo físico que exige uma tomada de atitude imediata. |
| 2 | GATILHO DA VULNERABILIDADE | O evento ambiental atinge o ponto cego do personagem, criando uma oportunidade ou tentação de agir com abertura, empatia ou autonomia (um vislumbre do que seria a sua Necessidade Oculta). |
| 3 | O DILEMA INTERNO | A colisão psíquica na mente do personagem entre duas opções: 1. Opção A: Arriscar a vulnerabilidade e encarar a realidade (exige abrir mão da armadura). 2. Opção B: Recuar para a Estratégia de Proteção e agir com base na Falsa Crença. |
| 4 | A ESCOLHA DEFENSIVA | O pavor de reviver a dor da Cena de Origem fala mais alto. O personagem rejeita a vulnerabilidade e opta conscientemente pela Opção B, ativando sua regra de sobrevivência. |
| 5 | A AÇÃO NO MUNDO FÍSICO | A atitude visível, prática e objetiva que o personagem executa no mundo real como resultado de sua escolha defensiva (uma omissão, uma mentira, uma submissão, um rompimento). |
| 6 | A CONSEQUÊNCIA PRÁTICA | O custo gerado no mundo real pela atitude do personagem (a perda de um aliado, o estrago em um relacionamento, o sofrimento de terceiros ou o isolamento). |
| 7 | CONSOLIDAÇÃO DA MENTIRA | A reinterpretação distorcida que o cérebro do personagem faz do resultado e que enrijece a mentira. Em vez de enxergar seu próprio erro, ele conclui: "Viu só? Se eu não tivesse me protegido com a Falsa Crença, o estrago teria sido pior." A mentira se enraíza ainda mais fundo. |

Os textos da coluna "O que escrever" são exatamente os que aparecem no app. Não há campos extras, e nenhum é obrigatório: você pode preencher em qualquer ordem e voltar depois.

## Botão "Ver exemplo"

Cada passo tem um exemplo prático oculto, que você abre só quando precisar de referência.

- Clique em **💡 Ver exemplo**, logo abaixo da instrução. O exemplo daquele passo se expande suavemente.
- Clique em **💡 Ocultar exemplo** para recolhê-lo e deixar a tela limpa.
- Os exemplos seguem uma mesma história (Nick, o robô R7 e a estação na Antártida), de modo que você vê os 7 passos encadeados em um caso completo.
- O exemplo é só consulta: ele nunca é copiado para o seu texto nem entra nas exportações.

## Salvamento automático

Tudo o que você digita é salvo sozinho, cerca de meio segundo depois da última tecla.

- O aviso no painel Exportar mostra "Salvando..." e depois "Salvo automaticamente às" seguido da hora.
- Os dados ficam no `localStorage` do navegador, neste computador e neste navegador. Eles não vão para nenhum servidor.
- Fechar a aba, desligar o computador ou ficar offline não apaga nada.
- Trocar de navegador, de perfil ou de aparelho começa do zero. Para levar a cena junto, exporte em JSON ou DOCX.
- Limpar os dados do site no navegador apaga a cena. Exporte uma cópia antes de fazer essa limpeza.

O app guarda uma única cena por vez. Para começar outra, exporte a atual e use **Limpar tudo**.

## Exportação

O painel **Exportar**, ao final da página, gera quatro formatos. Cada clique baixa um arquivo chamado `cena-encruzilhada-AAAA-MM-DD` com a extensão correspondente.

| Botão | Arquivo | Quando usar | O que contém |
| --- | --- | --- | --- |
| JSON | `.json` | Backup completo e estruturado | Título, metodologia, data da exportação e os 7 passos numerados com suas respostas |
| Markdown | `.md` | Levar a cena para Obsidian ou Notion | Título com `#`, cada passo com `##` e a resposta logo abaixo |
| TXT | `.txt` | Texto simples para qualquer editor | Somente texto plano e quebras de linha, sem nenhuma marca de Markdown |
| DOCX | `.docx` | Abrir, editar e imprimir no Word | Título e os 7 passos com suas respostas, em formatação limpa |

Os quatro formatos trazem apenas o seu título e as suas respostas, e não as instruções nem os exemplos. Passos em branco saem como "(sem resposta)" no Markdown, no TXT e no DOCX, e como texto vazio no JSON.

Se o navegador bloquear o download, libere downloads para o site na barra de endereços e clique de novo.

## Privacidade e segurança

O app foi feito para ficar fora do caminho dos antivírus e dos seus dados.

- Funciona 100% no seu navegador, sem servidor, sem conta e sem rastreadores.
- Não carrega scripts, fontes ou imagens de domínios externos; usa apenas recursos nativos do navegador.
- Não usa iframes nem redirecionamentos.
- O manifesto e o HTML não têm Base64 nem blobs embutidos; o ícone é um arquivo `icon.svg` em texto puro.
- Os downloads são gerados no próprio navegador com as APIs padrão (`Blob` e `URL.createObjectURL`).
- O único armazenamento é o `localStorage`, que guarda as suas respostas e a hora do último salvamento.

## Solução de problemas

| Problema | Causa provável | O que fazer |
| --- | --- | --- |
| O botão de instalar não aparece | A página foi aberta por `file://` | Sirva a pasta por `localhost` ou HTTPS e abra por esse endereço |
| Minhas respostas sumiram | Dados do site foram limpos, ou você abriu outro navegador ou perfil | Restaure a partir de um backup exportado; o app não recupera dados apagados |
| O aviso mostra "Não foi possível salvar neste navegador" | Armazenamento bloqueado ou janela privada | Use uma janela normal e permita dados do site; exporte em seguida |
| O download não começa | O navegador bloqueou downloads do site | Libere downloads na barra de endereços e clique de novo |
| O DOCX abre com aviso no Word | Arquivo aberto em modo protegido | Clique em Habilitar edição; se o aviso persistir, exporte de novo e confira o arquivo |
| O app não atualiza depois que troquei os arquivos | O cache offline guarda a versão antiga | Recarregue com Ctrl+Shift+R, ou aumente a versão em `CACHE_NAME` no `sw.js` |
| O antivírus sinalizou o app | Falso positivo de heurística | O código não usa Base64, domínios externos nem iframes; confira os arquivos e adicione a pasta às exceções |

## Arquivos do projeto

Os seis arquivos precisam ficar juntos, na mesma pasta.

| Arquivo | Função |
| --- | --- |
| `index.html` | Estrutura da página: cabeçalho, área dos 7 passos e painel Exportar |
| `styles.css` | Visual responsivo, com tema claro e escuro automático |
| `app.js` | Textos dos 7 passos, exemplos, salvamento no `localStorage` e exportadores JSON, MD, TXT e DOCX |
| `sw.js` | Service worker que guarda os arquivos em cache para uso offline |
| `manifest.json` | Dados de instalação do PWA: nome, cores e ícone |
| `icon.svg` | Ícone do app, em texto puro |

Para alterar o título ou os textos dos passos, edite a lista `PASSOS` no início do `app.js`. Depois de mexer em qualquer arquivo, aumente a versão em `CACHE_NAME` no `sw.js` para que o cache offline seja renovado.
