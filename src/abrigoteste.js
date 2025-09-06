class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const ANIMAIS = {
      REX: { tipo: "cão", favoritos: ["RATO", "BOLA"] },
      MIMI: { tipo: "gato", favoritos: ["BOLA", "LASER"] },
      FOFO: { tipo: "gato", favoritos: ["BOLA", "RATO", "LASER"] },
      ZERO: { tipo: "gato", favoritos: ["RATO", "BOLA"] },
      BOLA: { tipo: "cão", favoritos: ["CAIXA", "NOVELO"] },
      BEBE: { tipo: "cão", favoritos: ["LASER", "RATO", "BOLA"] },
      LOCO: { tipo: "jabuti", favoritos: ["SKATE", "RATO"] },
    };

    const BRINQUEDOS_VALIDOS = ["RATO", "BOLA", "LASER", "NOVELO", "CAIXA", "SKATE"];

    function splitList(str) {
      return String(str || "")
        .split(",")
        .map(s => s.trim().toUpperCase())
        .filter(Boolean);
    }

    function isSubsequencia(lista, favoritos) {
      let i = 0;
      for (let item of lista) {
        if (item === favoritos[i]) i++;
        if (i === favoritos.length) break;
      }
      return i === favoritos.length;
    }

    function atende(animal, brinquedos) {
      const { tipo, favoritos } = animal;
      return tipo === "cão"
        ? isSubsequencia(brinquedos, favoritos)
        : favoritos.every(f => brinquedos.includes(f));
    }

    // Preparar listas
    const pessoa1 = splitList(brinquedosPessoa1);
    const pessoa2 = splitList(brinquedosPessoa2);
    const ordem = splitList(ordemAnimais);

    if (new Set(ordem).size !== ordem.length) return { erro: "Não pode repetir animais." };
    if (new Set(pessoa1).size !== pessoa1.length || new Set(pessoa2).size !== pessoa2.length) return { erro: "Brinquedo inválido" };
    if ([...pessoa1, ...pessoa2].some(b => !BRINQUEDOS_VALIDOS.includes(b))) return { erro: "Brinquedo inválido" };

    let adotados = [];
    let p1 = 0, p2 = 0;

    for (let nome of ordem) {
      const animal = ANIMAIS[nome];
      if (!animal) return { erro: "Animal inválido" };

      let atende1 = atende(animal, pessoa1);
      let atende2 = atende(animal, pessoa2);

      let destino = "abrigo";

      if (nome === "LOCO") {
        // Jabuti só pode ser adotado após pelo menos um animal
        if (atende1 && !atende2 && p1 >= 1 && p1 < 3) {
          destino = "pessoa 1";
          p1++;
        } else if (!atende1 && atende2 && p2 >= 1 && p2 < 3) {
          destino = "pessoa 2";
          p2++;
        }
      } else {
        if (atende1 && !atende2 && p1 < 3) {
          destino = "pessoa 1";
          p1++;
        } else if (!atende1 && atende2 && p2 < 3) {
          destino = "pessoa 2";
          p2++;
        }
      }

      const nomeFormatado = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
      adotados.push(`${nomeFormatado} - ${destino}`);
    }

    return { lista: adotados };
  }
}

const Abrigo = new AbrigoAnimais();

console.log(Abrigo.encontraPessoas(
  'RATO,BOLA,SKATE,LASER,NOVELO,CAIXA',
  '',
  'Rex,Bola,Bebe,Loco'
));

export { AbrigoAnimais as AbrigoAnimais };
