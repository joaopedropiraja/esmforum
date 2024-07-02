const bd = require("../bd/bd_utils.js");
const modelo = require("../modelo.js");

beforeEach(() => {
  bd.reconfig("./bd/esmforum-teste.db");
  // limpa dados de todas as tabelas
  bd.exec("delete from perguntas", []);
  bd.exec("delete from respostas", []);
});

test("Testando banco de dados vazio", () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test("Testando cadastro de três perguntas", () => {
  modelo.cadastrar_pergunta("1 + 1 = ?");
  modelo.cadastrar_pergunta("2 + 2 = ?");
  modelo.cadastrar_pergunta("3 + 3 = ?");
  const perguntas = modelo.listar_perguntas();
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe("1 + 1 = ?");
  expect(perguntas[1].texto).toBe("2 + 2 = ?");
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta - 1);
});

test("Testando a listagem de três perguntas pelo id", () => {
  const pergunta1 = "1 + 1 = ?";
  const id_pergunta1 = modelo.cadastrar_pergunta(pergunta1);
  expect(modelo.get_pergunta(id_pergunta1).texto).toBe(pergunta1);

  const pergunta2 = "2 + 2 = ?";
  const id_pergunta2 = modelo.cadastrar_pergunta(pergunta2);
  expect(modelo.get_pergunta(id_pergunta2).texto).toBe(pergunta2);

  const pergunta3 = "3 + 3 = ?";
  const id_pergunta3 = modelo.cadastrar_pergunta(pergunta3);
  expect(modelo.get_pergunta(id_pergunta3).texto).toBe(pergunta3);
});

test("Testando cadastro de e listagem de três respostas", () => {
  const pergunta = "1 + 1 = ?";
  const id_pergunta = modelo.cadastrar_pergunta(pergunta);

  const resposta1 = "2";
  const resposta2 = "3?";
  const resposta3 = "Não sei";
  modelo.cadastrar_resposta(id_pergunta, resposta1);
  modelo.cadastrar_resposta(id_pergunta, resposta2);
  modelo.cadastrar_resposta(id_pergunta, resposta3);

  const respostas = modelo.get_respostas(id_pergunta);
  expect(respostas.length).toBe(3);
  expect(respostas[0].texto).toBe(resposta1);
  expect(respostas[1].texto).toBe(resposta2);
  expect(respostas[2].texto).toBe(resposta3);
});
