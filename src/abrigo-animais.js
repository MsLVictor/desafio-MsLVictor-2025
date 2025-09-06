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

    const pessoa1 = brinquedosPessoa1.toUpperCase().split(',').map(b => b.trim());
    const pessoa2 = brinquedosPessoa2.toUpperCase().split(',').map(b => b.trim());
    const ordem = ordemAnimais.toUpperCase().split(',').map(a => a.trim());

    let adotados = [];
    let p1 = 0, p2 = 0;

    if (new Set(pessoa1).size !== pessoa1.length || new Set(pessoa2).size !== pessoa2.length) {
      return { erro: 'Brinquedo inválido' };
    }

    for (const brinquedo of [...pessoa1, ...pessoa2]){
      if (!['RATO', 'BOLA', 'LASER', 'NOVELO', 'CAIXA', 'SKATE'].includes(brinquedo)){
        return { erro: 'Brinquedo inválido' };
      }
    }

    for (let nome of ordem){
      const nomeUpper = nome.toUpperCase();
      const dados = animais[nomeUpper];

      if (!dados){
        return { erro: 'Animal inválido' };
      }

      const favoritos = dados.favoritos;
      const tipo = dados.tipo;

      let atende1 = false
      let atende2 = false;
      
      if( tipo === 'cão'){
        let i = 0
        for (let b of pessoa1) if (b === favoritos[i]) i++;
        atende1 = (i === favoritos.length);
        i = 0;
        for (let b of pessoa2) if (b === favoritos[i]) i++;
        atende2 = (i === favoritos.length);
      } else {
        atende1 = favoritos.every(f => pessoa1.includes(f));
        atende2 = favoritos.every(f => pessoa2.includes(f));
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

console.log(Abrigo.encontraPessoas(
  'CAIXA, PULO',
  'POMBA, BOLA',
  'Rex'
));

export { AbrigoAnimais as AbrigoAnimais };
