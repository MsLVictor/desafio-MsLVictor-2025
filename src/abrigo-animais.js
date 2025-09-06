/**
 * DESAFIO: ABRIGO DE ANIMAIS
 * FEITO POR: VICTOR LEITE (MsLVictor)
 * DESCRIÇÃO:
 * Dado um abrigo com animais que tem brinquedos favoritos,
 * e duas pessoas com listas de brinquedos, o sistema determina
 * para onde cada animai será encaminhado:
 *  - pessoa 1
 *  - pessoa 2
 *  - abrigo
 * Seguindo regras específicas para cães, gatos e jabuti :D
 */

class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const animais = {
      REX: { tipo: "cão", favoritos: ["RATO", "BOLA"] },
      MIMI: { tipo: "gato", favoritos: ["BOLA", "LASER"] },
      FOFO: { tipo: "gato", favoritos: ["BOLA", "RATO", "LASER"] },
      ZERO: { tipo: "gato", favoritos: ["RATO", "BOLA"] },
      BOLA: { tipo: "cão", favoritos: ["CAIXA", "NOVELO"] },
      BEBE: { tipo: "cão", favoritos: ["LASER", "RATO", "BOLA"] },
      LOCO: { tipo: "jabuti", favoritos: ["SKATE", "RATO"] },
    };

    
    
    let adotados = [];
    let p1 = 0, p2 = 0;
    
    //função utilitária para formatar a string
    function splitList(str) {
      return String(str || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean)
      .map(s => s.toUpperCase());
    }
    const pessoa1 = splitList(brinquedosPessoa1);
    const pessoa2 = splitList(brinquedosPessoa2);
    const ordem = ordemAnimais.toUpperCase().split(',').map(a => a.trim());
    
    //validaçoes de entradas
    if (new Set(ordem).size !== ordem.length){
      return {erro: 'Não pode repetir animais.'};
    }

    if (new Set(pessoa1).size !== pessoa1.length || new Set(pessoa2).size !== pessoa2.length) {
      return { erro: 'Brinquedo inválido' };
    }

    for (const brinquedo of [...pessoa1, ...pessoa2]){
      if (!['RATO', 'BOLA', 'LASER', 'NOVELO', 'CAIXA', 'SKATE'].includes(brinquedo)){
        return { erro: 'Brinquedo inválido' };
      }
    }

    //lógica de adoção
    for (let nome of ordem){
      const nomeUpper = nome.toUpperCase();
      const dados = animais[nomeUpper];

      if (!dados){
        return { erro: 'Animal inválido' };
      }

      const favoritos = dados.favoritos;
      const tipo = dados.tipo;

      let atende1 = atende(dados, pessoa1,p1);
      let atende2 = atende(dados, pessoa2, p2);
      
      function isSubsequencia(lista, favoritos){
        let i = 0
        for(let item of lista){
          if(item === favoritos[i]) i++;
          if(i === favoritos.length) break;
        }
        return i === favoritos.length;
      }
      
      function atende(animal, brinquedos, adotados) {
        const { tipo, favoritos } = animal;

        let possuiTodos;
        if (tipo === 'cão') {
          possuiTodos = isSubsequencia(brinquedos, favoritos);
        } else {
          possuiTodos = favoritos.every(f => brinquedos.includes(f));
        }

        if (animal.tipo === 'jabuti') {
          return possuiTodos && adotados > 0;
        }

        return possuiTodos;
}

       
      if (nomeUpper === 'LOCO'){
        atende1 = atende1 && p1 > 0;
        atende2 = atende2 && p2 > 0;
      }

      let destino = 'abrigo';
      if (atende1 && !atende2 && p1 < 3) {
        destino = 'pessoa 1';
        p1++;
      } else if (!atende1 && atende2 && p2 < 3){
        destino = 'pessoa 2';
        p2++;
      }

      const nomeFormatado = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
      adotados.push(`${nomeFormatado} - ${destino}`);
    
    }
    return { lista: adotados.sort() };
  }
}

const Abrigo = new AbrigoAnimais();

//exemplo de uso
const abrigo = new AbrigoAnimais();
console.log(Abrigo.encontraPessoas(
  'BOLA,LASER', 'LASER', 'Batatinha'
));
//animal inválido!
export { AbrigoAnimais as AbrigoAnimais };
