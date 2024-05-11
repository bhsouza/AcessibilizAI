import { GoogleGenerativeAI, HarmCategory,HarmBlockThreshold } from '@google/generative-ai'

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyDJY6XM3rSLCXbSkpUZ5LjKK2E6BoIrvbs";

export async function run(acessibilidade) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [
    {text: 'input: Verifique a acessibilidade:\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Formulário de Contato</title>\n</head>\n<body>\n  <form>\n    Nome: <input type="text"><br>\n    Email: <input type="text"><br>\n    Mensagem: <input type="text"><br>\n    <button>Enviar</button>\n  </form>\n</body>\n</html>'},
    {text: 'output: <h2>Pontos observados:</h2>\n<ul>\n  <li>Sem rótulos associados aos campos: Impossível para leitores de tela associarem os campos aos seus significados.</li>\n  <li>Tipos de input incorretos: Usar type="text" para email e mensagem compromete a usabilidade e validação.</li>\n  <li>Botão sem contexto: Usuários não sabem o que acontecerá ao clicar no botão.</li>\n</ul>\n<p>Segue melhoria abaixo:</p>\n|||<!DOCTYPE html>\n<html lang="pt BR">\n<head>\n  <title>Formulário de Contato</title>\n</head>\n<body>\n  <form method="post" action="/contato">\n    <label for="nome">Nome:</label>\n    <input type="text" id="nome" name="nome" required><br>\n    <label for="email">Email:</label>\n    <input type="email" id="email" name="email" required><br>\n    <label for="mensagem">Mensagem:</label>\n    <textarea id="mensagem" name="mensagem" required></textarea><br>\n    <button type="submit">Enviar Mensagem</button>\n  </form>\n</body>\n</html>'},
    {text: 'input: Avalie a estrutura da página:\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Blog de Viagens</title>\n</head>\n<body>\n  <header>\n    <h1>Blog de Viagens</h1>\n    <nav>\n      <ul>\n        <li><a href="#home">Home</a></li>\n        <li><a href="#destinos">Destinos</a></li>\n        <li><a href="#sobre">Sobre</a></li>\n        <li><a href="#contato">Contato</a></li>\n      </ul>\n    </nav>\n  </header>\n  <main>\n    <article>\n      <h2>Destino: Paris</h2>\n      <p>Paris, a cidade do amor, é uma das mais visitadas do mundo...</p>\n    </article>\n    <article>\n      <h2>Destino: Tóquio</h2>\n      <p>Tóquio, a capital do Japão, é uma cidade vibrante e cheia de vida...</p>\n    </article>\n  </main>\n  <footer>\n    <p>&copy; 2024 Blog de Viagens. Todos os direitos reservados.</p>\n  </footer>\n</body>\n</html>'},
    {text: 'output: <h2>Pontos observados:</h2>\n<ul>\n  <li>Elementos de navegação sem âncoras: Os links na barra de navegação não têm âncoras associadas, o que pode confundir os usuários e dificultar a navegação.</li>\n  <li>Ausência de metadados: Falta de metadados como descrição e palavras-chave pode prejudicar o SEO do site.</li>\n</ul>\n<p>Segue melhoria abaixo:</p>\n|||<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <meta name="description" content="Um blog de viagens com informações sobre destinos ao redor do mundo.">\n  <meta name="keywords" content="viagens, destinos, turismo, Paris, Tóquio, blog">\n  <title>Blog de Viagens</title>\n</head>\n<body>\n  <header>\n    <h1>Blog de Viagens</h1>\n    <nav>\n      <ul>\n        <li><a href="#home">Home</a></li>\n        <li><a href="#destinos">Destinos</a></li>\n        <li><a href="#sobre">Sobre</a></li>\n        <li><a href="#contato">Contato</a></li>\n      </ul>\n    </nav>\n  </header>\n  <main>\n    <article id="destinos">\n      <h2>Destino: Paris</h2>\n      <p>Paris, a cidade do amor, é uma das mais visitadas do mundo...</p>\n    </article>\n    <article>\n      <h2>Destino: Tóquio</h2>\n      <p>Tóquio, a capital do Japão, é uma cidade vibrante e cheia de vida...</p>\n    </article>\n  </main>\n  <footer>\n    <p>&copy; 2024 Blog de Viagens. Todos os direitos reservados.</p>\n  </footer>\n</body>\n</html>}'},    
    {text: `input: ${acessibilidade}`},
    {text: "output: "},
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  console.log(response.text())
  let array = response.text().split("|||");
  return array;
}