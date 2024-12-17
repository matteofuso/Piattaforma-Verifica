domande = {
    "domande_aperta": [
        {
            "id": 0,
            "domanda": "Descrivi il funzionamento di una socket nel modello client-server."
        },
        {
            "id": 1,
            "domanda": "Qual è la differenza tra una socket TCP e una socket UDP?"
        },
        {
            "id": 2,
            "domanda": "Elenca i principali passaggi per creare una connessione socket lato client e lato server."
        }
    ],
    "testi_crocette": [
        {
            "id": 0,
            "testo": "Le socket sono fondamentali per la comunicazione in rete. Possono essere utilizzate per creare connessioni affidabili (TCP) o veloci ma non garantite (UDP).",
            "domande": [
                {
                    "id": 0,
                    "domanda": "Quale protocollo garantisce una connessione affidabile?",
                    "opzioni": [
                        "HTTP",
                        "UDP",
                        "TCP",
                        "FTP"
                    ],
                    "risposta_corretta": 2
                },
                {
                    "id": 1,
                    "domanda": "Qual è una caratteristica principale di UDP?",
                    "opzioni": [
                        "Connessione sicura",
                        "Affidabilità",
                        "Basso overhead",
                        "Trasferimento crittografato"
                    ],
                    "risposta_corretta": 2
                },
                {
                    "id": 2,
                    "domanda": "Quale delle seguenti affermazioni è vera?",
                    "opzioni": [
                        "TCP è più veloce di UDP",
                        "UDP non garantisce l'ordine dei pacchetti",
                        "Le socket non supportano TCP",
                        "UDP richiede l'handshake"
                    ],
                    "risposta_corretta": 1
                },
                {
                    "id": 3,
                    "domanda": "Le socket possono essere utilizzate solo con TCP e UDP?",
                    "opzioni": [
                        "Sì, sono limitate a questi protocolli",
                        "No, possono essere usate anche con altri protocolli",
                        "Solo con protocolli HTTP e FTP",
                        "Solo con UDP"
                    ],
                    "risposta_corretta": 1
                },
                {
                    "id": 4,
                    "domanda": "Quale livello del modello OSI utilizza principalmente le socket?",
                    "opzioni": [
                        "Livello di rete",
                        "Livello di trasporto",
                        "Livello fisico",
                        "Livello applicativo"
                    ],
                    "risposta_corretta": 1
                }
            ]
        },
        {
            "id": 1,
            "testo": "Quando si utilizza una socket, è fondamentale gestire correttamente gli errori di connessione e i timeout per evitare problemi durante la comunicazione.",
            "domande": [
                {
                    "id": 0,
                    "domanda": "Qual è una causa comune di errore in una socket?",
                    "opzioni": [
                        "Indirizzo IP inesistente",
                        "Basso livello di memoria",
                        "Velocità di CPU insufficiente",
                        "Porta seriale mancante"
                    ],
                    "risposta_corretta": 0
                },
                {
                    "id": 1,
                    "domanda": "Quale funzione è usata per attendere connessioni in arrivo su una socket server?",
                    "opzioni": [
                        "connect()",
                        "listen()",
                        "send()",
                        "accept()"
                    ],
                    "risposta_corretta": 1
                },
                {
                    "id": 2,
                    "domanda": "Quale valore viene generalmente utilizzato per il timeout di una socket?",
                    "opzioni": [
                        "Zero secondi",
                        "Cinque minuti",
                        "Un valore configurabile",
                        "Un valore fisso non modificabile"
                    ],
                    "risposta_corretta": 2
                },
                {
                    "id": 3,
                    "domanda": "Qual è il metodo per chiudere una socket?",
                    "opzioni": [
                        "close()",
                        "stop()",
                        "end()",
                        "shutdown()"
                    ],
                    "risposta_corretta": 0
                },
                {
                    "id": 4,
                    "domanda": "Cosa accade se un client tenta di connettersi a una porta non in ascolto?",
                    "opzioni": [
                        "La connessione viene stabilita comunque",
                        "Il client riceve un errore",
                        "La porta viene aperta automaticamente",
                        "Il client attende indefinitamente"
                    ],
                    "risposta_corretta": 1
                }
            ]
        }
    ]
}