/**
 * 2C = Two of Clubs (Treboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [],
puntosJugador = 0,
puntosComputadora = 0
;
const tipos = ["C", "D", "H", "S"],
  especiales = ["A", "J", "Q", "K"],
  btnPedir = document.querySelector('#btnPedir'),
  btnNuevo = document.querySelector('#btnNuevo'),
  btnDetener = document.querySelector('#btnDetener'),
  marcadores = document.querySelectorAll('small'),
  divCartasJugador = document.querySelector('#jugador-cartas');
  ;


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

//Eventos del boton

btnPedir.addEventListener('click',()=> {
  
  const carta = pedirCarta();
  puntosJugador += valorCarta(carta);
  marcadores[0].innerText = puntosJugador;
  const imgCarta = document.createElement('img');
  imgCarta.src = `./assets/cartas/${carta}.png`;
  imgCarta.classList.add ('carta')
  divCartasJugador.append(imgCarta);

  if(puntosJugador > 21){
    alert('Lo siento, perdiste');
    btnPedir.disabled = true;
  }else if(puntosJugador === 21){
    alert('¡21, Genial!')
  }
});