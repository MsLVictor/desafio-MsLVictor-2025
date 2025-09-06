import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });
 //OK
  test('Animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER', 'LASER', 'Batatinha'
    );
    expect(resultado.erro).toBe('Animal inválido');
  });
  //OK
  test('Erro ao repetir brinquedos na entrada', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO, BOLA, RATO', 'LASER, NOVELO', 'Rex'
    );
    expect(resultado.erro).toBe('Brinquedo inválido');
  });
  //OK
  test('erro ao colocar brinquedo inexistente', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BONECA, CARRO, BICICLETA', 'AVIAO, MONOCICLO, PIPA', 'Rex'
    );
    expect(resultado.erro).toBe('Brinquedo inválido');
  });
  //OK
  test('erro ao colocar animal repetido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO, BOLA', 'RATO, NOVELO', 'Rex, Fofo, Rex'
    );
    expect(resultado.erro).toBe('Não pode repetir animais.');
  });
  //OK
  test('ignorando lista de brinquedos vazia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA, RATO, LASER', '', 'Fofo'
    );
    expect(resultado.lista).toEqual(['Fofo - pessoa 1']);
  });

  //OK
  test('testando primeira lista de brinquedos vazia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      '','LASER, RATO, BOLA','Bebe'
    );
    expect(resultado.lista).toEqual(['Bebe - pessoa 2']);
  });

  test('Loco deve ser adotado pela pessoa 1 após ela adotar outro animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO, BOLA, SKATE', 'NOVELO,CAIXA', 'Rex, Loco'
    );
    expect(resultado.lista).toEqual(['Loco - pessoa 1', 'Rex - pessoa 1']);
  });

  test('Loco é adotado pela pessoa 2', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      '',
      'LASER,BOLA,SKATE,RATO',
      'Fofo, Loco'
    );
    expect(resultado.lista).toEqual(['Fofo - pessoa 2','Loco - pessoa 2']);
  });
});
