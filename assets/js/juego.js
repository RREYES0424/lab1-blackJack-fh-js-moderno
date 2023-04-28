const juego = (() => {
  "use strict"; //Le dice a JS que sea estricto a la hora de evaluar el codigo

  /**
 * 2C = Two of Clubs (Treboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

  let deck = [],
  puntosJugadores = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"],
    btnPedir = document.querySelector("#btnPedir"),
    btnNuevo = document.querySelector("#btnNuevo"),
    btnDetener = document.querySelector("#btnDetener"),
    marcadores = document.querySelectorAll("small"),
    divCartasJugadores = document.querySelectorAll('.divCartas');

    const inicializarJuego = (numJugadores = 2) => {
      deck = crearDeck();
      puntosJugadores = [];
      for(let i = 0; i < numJugadores; i++){
        puntosJugadores.push(0);
      }
      marcadores.forEach(elem => elem.innerText = 0);
      divCartasJugadores.forEach(elem => elem.innerHTML = '');
      btnPedir.disabled = false;
      btnDetener.disabled = false;
    }
  //Esta funcion crea una nueva baraja Mixeada
  const crearDeck = () => {
    deck = [];
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
    return _.shuffle(deck);;
  }

  //Pidiendo carta
  const pedirCarta = () => {
    //Valida si hay cartas en el deck
    if (deck.length === 0) {
      throw "No hay Cartas en el Deck";
    }
    return deck.pop();
  }

  //Dandonle valor a la carta
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  }

  
  const acumularPuntos = (carta,turno) => {
    puntosJugadores[turno] += valorCarta(carta);
    marcadores[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno]
  }

  const crearCarta = (carta,turno) =>{
    const imgCarta = document.createElement("img");
      imgCarta.src = `./assets/cartas/${carta}.png`;
      imgCarta.classList.add("carta");
      divCartasJugadores[turno].append(imgCarta);
  }

  const determinarGanador = () => {
    const [puntosMinimos,puntosComputadora] = puntosJugadores;
    setTimeout(() => {
      if( puntosComputadora === puntosMinimos ) {
          alert('Nadie gana :(');
      } else if ( puntosMinimos > 21 ) {
          alert('Computadora gana')
      } else if( puntosComputadora > 21 ) {
          alert('Jugador Gana');
      } else {
          alert('Computadora Gana')
      }
  }, 100 );
  }
  
  //Turno de la computadora, se activa cuando el jugador pierde/llega a 21 o le pica en detener
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta,puntosJugadores.length - 1);
      crearCarta(carta,puntosJugadores.length-1);
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
    determinarGanador();
  }

  //Eventos del boton

  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador =  acumularPuntos(carta,0);
    crearCarta(carta,0);

    if (puntosJugador > 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  })

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores);
  })

  // btnNuevo.addEventListener("click", () => {
  //   inicializarJuego();
  // })

  return {
    nuevoJuego: inicializarJuego
  };

})();


