/**
 * 2C = Two of Clubs (Treboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [];
const tipos = ["C", "D", "H", "S"],
  especiales = ["A", "J", "Q", "K"];


//Esta funcion crea una nueva baraja Mixeada
const crearDeck = () => {
    //Creando las cartas
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }
  //Creando las Cartas especiales
  for (let tipo of tipos) {
    for (let especial of especiales) {
      deck.push(especial + tipo);
    }
  }
  //Revolviendo el mazo
  deck = _.shuffle(deck);
  return deck;
};

crearDeck();


//Pidiendo carta
const pedirCarta = () => {
    //Valida si hay cartas en el deck
    if(deck.length === 0){
        throw 'No hay Cartas en el Deck'
    }
    const carta = deck.pop();
    return carta;
}

pedirCarta();


//Dandonle valor a la carta
const valorCarta = ( carta ) => {
    const valor = carta.substring(0,carta.length-1);
    return (isNaN(valor)) ? 
    (valor === 'A') ? 11 : 10
    : valor * 1;
}

const valor = valorCarta(pedirCarta());
console.log(valor);
