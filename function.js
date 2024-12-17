// Funzione per ottenere il valore di un parametro dalla query string
function getParametroUrl(nome) {
  const params = new URLSearchParams(window.location.search);
  return params.get(nome);
}

function vaiAlMenu() {
  salvaRisposte(); // Salva le risposte prima di tornare al menu
  window.location.href = "index.html"; // Reindirizza al menu
}

// Ottieni il nome del file attualmente caricato
function ottieniNomePagina() {
  const path = window.location.pathname;
  nome = path.substring(path.lastIndexOf("/") + 1);
  return nome === '' ? "index.html" : nome; // Restituisce il nome del file
}

// Funzione per formattare il tempo in minuti e secondi (opzionale)
function formattaTempo(tempo) {
  const minuti = Math.floor(tempo / 60);
  const secondi = tempo % 60;
  return `${minuti}:${secondi < 10 ? "0" + secondi : secondi}`;
}

// Carica i dati dal file JSON e popola la pagina
async function caricaCrocette(numeroDomanda = 0) {
  // Seleziona il testo e le domande corrispondenti
  const testo = domande.testi_crocette[numeroDomanda];
  document.getElementById("testo-contenuto").innerText = testo.testo;

  const domandeList = document.getElementById("domande-list");
  domandeList.innerHTML = ""; // Pulizia iniziale

  // Recupera le risposte salvate
  const risposteSalvate = JSON.parse(localStorage.getItem("risposte")) || {
    crocette: {},
  };
  // Popola le domande a crocetta
  testo.domande.forEach((domanda, index) => {
    const domandaContainer = document.createElement("div");
    domandaContainer.classList.add("domanda");

    const domandaTitle = document.createElement("h3");
    domandaTitle.innerText = `${index + 1}. ${domanda.domanda}`;
    domandaContainer.appendChild(domandaTitle);

    // Recupera la risposta salvata per questa domanda, se esiste
    const rispostaSalvata = risposteSalvate.crocette[numeroDomanda]?.[index];

    // Aggiungi le opzioni
    domanda.opzioni.forEach((opzione, i) => {
      const label = document.createElement("label");
      label.innerHTML = `
                    <input type="radio" name="domanda-${numeroDomanda}-${index}" value="${i}" ${rispostaSalvata == i ? "checked" : ""
        }>
                    ${opzione}
                `;
      domandaContainer.appendChild(label);
    });

    domandeList.appendChild(domandaContainer);
  });
}

// Carica le domande aperte dal file JSON e popola la pagina
async function caricaDomandeAperta(numeroDomanda = 0) {
  // Carica la domanda specifica
  const data = domande.domande_aperta[numeroDomanda];
  document.getElementById("domanda-testo").innerText = data.domanda;

  // Recupera la risposta salvata dal localStorage
  const risposteSalvate = JSON.parse(localStorage.getItem("risposte")) || {
    aperte: {},
  };
  const rispostaSalvata = risposteSalvate.aperte[numeroDomanda];

  // Precompila la risposta, se esiste
  if (rispostaSalvata) {
    document.getElementById("risposta").value = rispostaSalvata;
  }
}

// Funzione per caricare il file JSON e generare le carte
function caricaMenu() {
  // Ottieni il contenitore delle carte
  const cardContainer = document.getElementById("card-container");
  // Funzione per creare la carta
  function creaCarta(domanda, tipo) {
    const card = document.createElement("div");
    card.classList.add("card");

    const link = document.createElement("a");
    link.classList.add("card-link");
    link.href =
      tipo === "crocetta"
        ? `crocetta.html?domanda=${domanda.id}`
        : `domanda_aperta.html?domanda=${domanda.id}`;

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const title = document.createElement("h2");
    title.innerText =
      tipo === "crocetta"
        ? `Domanda ${String.fromCharCode(domanda.id + "A".charCodeAt(0))}`
        : `Domanda ${domanda.id + 1}`;
    const description = document.createElement("p");
    description.innerText =
      tipo === "crocetta" ? "Domanda a crocetta" : "Domanda aperta";

    cardContent.appendChild(title);
    cardContent.appendChild(description);
    link.appendChild(cardContent);
    card.appendChild(link);
    cardContainer.appendChild(card);
  }

  // Carica le carte per le domande aperte
  domande.domande_aperta.forEach((domanda) => {
    creaCarta(domanda, "aperta");
  });
  // Carica le carte per le domande a crocetta
  domande.testi_crocette.forEach((domanda) => {
    creaCarta(domanda, "crocetta");
  });
}

function salvaRisposte() {
  // Ottieni le risposte già salvate o inizializza un nuovo oggetto
  let risposteSalvate = JSON.parse(localStorage.getItem("risposte")) || {
    aperte: {},
    crocette: {},
  };

  // Controlla la pagina corrente
  if (nomePagina === "crocetta.html") {
    const form = document.getElementById("quiz-form");
    const risposte = new FormData(form);
    const numeroBlocco = parseInt(getParametroUrl("domanda")); // Es: domanda=1

    // Verifica se il blocco corrente di risposte esiste, altrimenti inizializzalo
    if (!risposteSalvate.crocette[numeroBlocco]) {
      risposteSalvate.crocette[numeroBlocco] = {};
    }

    // Aggiungi le risposte per il blocco corrente
    risposte.forEach((valore, chiave) => {
      // Chiave esempio: domanda-1-0, estrae l'indice della sotto-domanda
      const [_, numeroDomanda, index] = chiave.match(/domanda-(\d+)-(\d+)/);
      risposteSalvate.crocette[numeroBlocco][index] = valore;
    });

    // Salva nel localStorage
    localStorage.setItem("risposte", JSON.stringify(risposteSalvate));

    console.log("Risposte crocette salvate:", risposteSalvate);
  } else if (nomePagina === "domanda_aperta.html") {
    const numeroDomanda = parseInt(getParametroUrl("domanda")); // Es: domanda=1

    // Ottieni la risposta inserita dall'utente
    const risposta = document.getElementById("risposta").value.trim();

    // Controlla che la risposta non sia vuota
    if (!risposta) {
      return;
    }

    // Salva la risposta della domanda aperta
    risposteSalvate.aperte[numeroDomanda] = risposta;

    // Salva nel localStorage
    localStorage.setItem("risposte", JSON.stringify(risposteSalvate));

    console.log("Risposta aperta salvata:", risposteSalvate);
  }
}

// Funzione principale per gestire il caricamento dinamico
function caricaDomandaDinamica() {
  const numeroDomanda = parseInt(getParametroUrl("domanda")) || 0; // Numero della domanda

  // Controlla il nome del file e chiama la funzione appropriata
  if (nomePagina === "crocetta.html") {
    caricaCrocette(numeroDomanda); // Carica una domanda a crocette
  } else if (nomePagina === "domanda_aperta.html") {
    caricaDomandeAperta(numeroDomanda); // Carica una domanda aperta
  } else if (nomePagina === "index.html") {
    caricaMenu(); // Carica le carte delle domande
  } else {
    console.error("Tipo di domanda sconosciuto o pagina non valida.");
  }

  // Avvia il timer (10 minuti in questo caso)
  avviaTimer(10);
}

// Funzione per consegnare la verifica e scaricare un file .txt con domande, risposte, timer e valutazione
function consegnaVerifica() {
  // Recupera tutte le risposte dal localStorage
  let risposteSalvate = JSON.parse(localStorage.getItem("risposte")) || {
    aperte: {},
    crocette: {},
  };
  // Recupera il tempo rimanente dal localStorage
  let tempoRimanente = localStorage.getItem("tempoRimanente");

  // Recupera le domande dal file JSON per ottenere il testo e le risposte corrette
  // Creazione del contenuto per il file .txt
  let contenuto = "Verifica - Risposte e Timer\n\n";
  contenuto +=
    "Tempo rimanente: " +
    (tempoRimanente
      ? formattaTempo(tempoRimanente)
      : "Tempo non disponibile") +
    "\n\n";

  contenuto += "Domande e Risposte:\n\n";

  // Aggiungi domande aperte
  domande.domande_aperta.forEach((domanda, index) => {
    contenuto += `Domanda ${index + 1}: ${domanda.domanda}\n`;

    // Aggiungi la risposta dell'utente per le domande aperte
    if (risposteSalvate.aperte[index]) {
      contenuto += `Risposta data: ${risposteSalvate.aperte[index]}\n`;
      contenuto += `Risposta corretta: Non disponibile\n\n`;
    } else {
      contenuto += `Risposta data: Non fornita\n\n`;
    }
  });

  // Aggiungi domande a crocetta
  domande.testi_crocette.forEach((testo, indexBlocco) => {
    contenuto += `Testo ${String.fromCharCode(
      indexBlocco + "A".charCodeAt(0)
    )}: ${testo.testo}\n`;

    testo.domande.forEach((domanda, domandaIndex) => {
      // Trova la risposta dell'utente per la domanda corrente
      const rispostaUtenteIndex =
        risposteSalvate.crocette[indexBlocco]?.[domandaIndex];
      let rispostaUtente = "";
      let rispostaCorretta = "";

      if (rispostaUtenteIndex !== undefined) {
        rispostaUtente = domanda.opzioni[rispostaUtenteIndex];
        rispostaCorretta = domanda.opzioni[domanda.risposta_corretta];
      }

      // Numerazione A, B, C, D per le domande a scelta multipla
      contenuto += `Domanda ${domandaIndex + 1}: ${domanda.domanda}\n`;
      contenuto += `Risposta data: ${rispostaUtente || "Non fornita"}\n`;
      if (rispostaUtenteIndex !== undefined) {
        contenuto += `Risposta corretta: ${rispostaCorretta}\n`;
      }
      contenuto += "\n";
    });
  });

  // Crea un blob con il contenuto del file
  const blob = new Blob([contenuto], { type: "text/plain" });

  // Crea un link temporaneo per il download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "verifica_risposte.txt"; // Nome del file da scaricare
  link.click(); // Avvia il download
  window.localStorage.clear(); // Pulisci il localStorage
  clearInterval(timerInterval);
}

// Gestione del timer
function avviaTimer(durataInMinuti) {
  // Recupera il tempo rimanente dal localStorage, se esiste
  let tempoRimanente = localStorage.getItem("tempoRimanente");

  // Se non c'è un tempo salvato, usa la durata iniziale
  if (!tempoRimanente) {
    tempoRimanente = durataInMinuti * 60;
  } else {
    tempoRimanente = parseInt(tempoRimanente);
  }

  // Funzione per aggiornare il timer ogni secondo
  const timerElement = document.getElementById("timer");

  // Funzione per calcolare minuti e secondi
  function aggiornaTimer() {
    // Aggiorna il display del timer
    timerElement.innerText = formattaTempo(tempoRimanente);

    // Salva il tempo rimanente nel localStorage
    localStorage.setItem("tempoRimanente", tempoRimanente);

    // Se il tempo è finito, ferma il timer
    if (tempoRimanente <= 0) {
      clearInterval(timerInterval);
      if (nomePagina !== "index.html") {
        salvaRisposte(); // Salva le risposte prima di consegnare
        window.location.href = "index.html"; // Reindirizza al menu
      } else {
        alert("Tempo scaduto! La verifica è stata consegnata.");
        consegnaVerifica();
        window.localStorage.clear(); // Pulisci il localStorage
      }
    } else {
      tempoRimanente--;
    }
  }

  // Avvia l'aggiornamento del timer ogni secondo
  timerInterval = setInterval(aggiornaTimer, 1000);
  aggiornaTimer(); // Avvia il timer immediatamente
}

timerInterval = null; // Inizializza l'intervallo del timer
const nomePagina = ottieniNomePagina(); // Ottieni il nome della pagina HTML
caricaDomandaDinamica();