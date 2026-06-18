// =====================================
// FREIGABEDATUM
// =====================================

const freigabeDatum =
    new Date("2026-06-21T00:00:00");


// =====================================
// COUNTDOWN
// =====================================

let countdownInterval;

function updateCountdown() {

    const jetzt =
        new Date();

    const differenz =
        freigabeDatum - jetzt;

    if (differenz <= 0) {

        document.getElementById(
            "countdown-screen"
        ).style.display = "none";

        document.getElementById(
            "main-content"
        ).style.display = "block";

        clearInterval(
            countdownInterval
        );

        return;
    }

    const tage =
        Math.floor(
            differenz /
            (1000 * 60 * 60 * 24)
        );

    const stunden =
        Math.floor(
            (
                differenz %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );

    const minuten =
        Math.floor(
            (
                differenz %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );

    const sekunden =
        Math.floor(
            (
                differenz %
                (1000 * 60)
            ) /
            1000
        );

    document.getElementById(
        "tage"
    ).textContent = tage;

    document.getElementById(
        "stunden"
    ).textContent = stunden;

    document.getElementById(
        "minuten"
    ).textContent = minuten;

    document.getElementById(
        "sekunden"
    ).textContent = sekunden;
}

updateCountdown();

countdownInterval =
    setInterval(
        updateCountdown,
        1000
    );


// =====================================
// VIBRATION
// =====================================

function vibrate(pattern) {

    if (
        navigator.vibrate
    ) {

        navigator.vibrate(
            pattern
        );
    }
}


// =====================================
// RÄTSEL PRÜFEN
// =====================================

function pruefen() {

    const a1 =
        document
            .getElementById("antwort1")
            .value
            .trim()
            .toUpperCase();

    const a2 =
        document
            .getElementById("antwort2")
            .value
            .trim()
            .toUpperCase();

    const a3 =
        document
            .getElementById("antwort3")
            .value
            .trim()
            .toUpperCase();

    const a4 =
        document
            .getElementById("antwort4")
            .value
            .trim()
            .toUpperCase();

    const a5 =
        document
            .getElementById("antwort5")
            .value
            .trim()
            .toUpperCase();

    const a6 =
        document
            .getElementById("antwort6")
            .value
            .trim()
            .toUpperCase();

    const richtig =

        a1 === "GERBERA" &&

        (
            a2 === "MÜNSTER" ||
            a2 === "MUENSTER"
        ) &&

        a3 === "HONIGMELONE" &&

        a4 === "MARMELADE" &&

        a5 === "HASE" &&

        a6 === "HERZ";

    if (richtig) {

        vibrate([
            150,
            100,
            150
        ]);

        const erfolg =
            document.getElementById(
                "erfolg"
            );

        erfolg.style.display =
            "block";

        erfolg.scrollIntoView({
            behavior: "smooth"
        });

        setTimeout(() => {

            erfolg.style.display =
                "none";

            const puzzle =
                document.getElementById(
                    "puzzle"
                );

            puzzle.style.display =
                "block";

            puzzle.scrollIntoView({
                behavior: "smooth"
            });

            puzzleStarten();

        }, 2200);

    } else {

        vibrate(200);

        alert(
            "Mindestens eine Antwort stimmt noch nicht 😊"
        );
    }
}

// =====================================
// PUZZLE
// =====================================

let puzzleReihenfolge = [];

let ausgewaehlt = null;

const puzzleLoesung = [
    0,1,2,
    3,4,5,
    6,7,8
];

function puzzleStarten() {

    const puzzle =
        document.getElementById(
            "puzzle-grid"
        );

    puzzle.innerHTML = "";

    puzzleReihenfolge = [
        0,1,2,
        3,4,5,
        6,7,8
    ];

    puzzleReihenfolge.sort(
        () => Math.random() - 0.5
    );

    puzzleReihenfolge.forEach(
        (teil, index) => {

            const feld =
                document.createElement(
                    "div"
                );

            feld.className =
                "puzzle-tile";

            feld.dataset.index =
                index;

            feld.dataset.teil =
                teil;

            feld.style.backgroundImage =
                'url("wir.jpeg")';

            feld.style.backgroundSize =
                "300% 300%";

            const x =
                teil % 3;

            const y =
                Math.floor(
                    teil / 3
                );

            feld.style.backgroundPosition =
                `${x * 50}% ${y * 50}%`;

            feld.addEventListener(
                "click",
                puzzleKlick
            );

            puzzle.appendChild(
                feld
            );
        }
    );
}

function puzzleKlick(event) {

    const feld =
        event.target;

    if (
        ausgewaehlt === null
    ) {

        ausgewaehlt =
            feld;

        feld.classList.add(
            "puzzle-selected"
        );

        return;
    }

    if (
        ausgewaehlt === feld
    ) {

        feld.classList.remove(
            "puzzle-selected"
        );

        ausgewaehlt = null;

        return;
    }

    const teil1 =
        ausgewaehlt.dataset.teil;

    const teil2 =
        feld.dataset.teil;

    ausgewaehlt.dataset.teil =
        teil2;

    feld.dataset.teil =
        teil1;

    puzzleBildAktualisieren(
        ausgewaehlt
    );

    puzzleBildAktualisieren(
        feld
    );

    ausgewaehlt.classList.remove(
        "puzzle-selected"
    );

    ausgewaehlt = null;

    puzzlePruefen();
}

function puzzleBildAktualisieren(
    feld
) {

    const teil =
        Number(
            feld.dataset.teil
        );

    const x =
        teil % 3;

    const y =
        Math.floor(
            teil / 3
        );

    feld.style.backgroundPosition =
        `${x * 50}% ${y * 50}%`;
}

function puzzlePruefen() {

    const felder =
        document.querySelectorAll(
            ".puzzle-tile"
        );

    let geloest = true;

    felder.forEach(
        (feld, index) => {

            if (
                Number(
                    feld.dataset.teil
                ) !== index
            ) {

                geloest = false;
            }
        }
    );

    if (!geloest) {
        return;
    }

    vibrate([
        200,
        100,
        200
    ]);

    const puzzle =
        document.getElementById(
            "puzzle"
        );

    puzzle.innerHTML = `

        <h2>

            ✨ Perfekt! ✨

        </h2>

        <p>

            Du hast unser Bild wieder zusammengesetzt.

        </p>

        <p>

            Doch die Schatztruhe ist noch verschlossen.

        </p>

        <p>

            Ein neugieriger Strandkrebs hat den Schlüssel zur Schatztruhe stibitzt... 🦀

        </p>

    `;

    setTimeout(() => {

        puzzle.style.display =
            "none";

        const krebs =
            document.getElementById(
                "krebs"
            );

        krebs.style.display =
            "block";

        krebs.scrollIntoView({
            behavior: "smooth"
        });

        krebsStarten();

    }, 2500);
}
// =====================================
// KREBS-SPIEL
// =====================================

let richtigerKrebs = 7;

let krebsBlinken = null;

function krebsStarten() {

    const grid =
        document.getElementById(
            "krebs-grid"
        );

    grid.innerHTML = "";

    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const krebs =
            document.createElement(
                "div"
            );

        krebs.className =
            "krebs-tile";

        krebs.dataset.index =
            i;

        krebs.textContent =
            "🦀";

        krebs.addEventListener(
            "click",
            krebsKlick
        );

        grid.appendChild(
            krebs
        );
    }

    clearInterval(
        krebsBlinken
    );

    krebsBlinken =
        setInterval(() => {

            const felder =
                document.querySelectorAll(
                    ".krebs-tile"
                );

            const krebs =
                felder[
                    richtigerKrebs
                ];

            if (!krebs) {
                return;
            }

            krebs.textContent =
                "✨";

            setTimeout(() => {

                if (krebs) {

                    krebs.textContent =
                        "🦀";
                }

            }, 250);

        }, 2000);
}

function krebsKlick(event) {

    const feld =
        event.target;

    const index =
        Number(
            feld.dataset.index
        );

    if (
        index !==
        richtigerKrebs
    ) {

        vibrate(150);

        alert(
            "Dieser Krebs hat den Schlüssel nicht 🦀"
        );

        return;
    }

   clearInterval(
    krebsBlinken
);

vibrate([
    200,
    100,
    200
]);

const krebsBereich =
    document.getElementById(
        "krebs"
    );

krebsBereich.innerHTML = `

    <h2>

        ✨ Schlüssel gefunden! ✨

    </h2>

    <p>

        Du hast den kleinen Dieb entlarvt.

    </p>

    <p>

        Der Schlüssel zur Schatztruhe ist wieder da.

    </p>

    <p>

        Nun kann der Schatz endlich geöffnet werden. ❤️

    </p>

`;

setTimeout(() => {

    krebsBereich.style.display =
        "none";

    const truhe =
        document.getElementById(
            "truhe"
        );

    truhe.style.display =
        "block";

    truhe.scrollIntoView({
        behavior: "smooth"
    });

}, 2500);

}

// =====================================
// SCHATZTRUHE ÖFFNEN
// =====================================

function oeffnen() {

    const truheBild =
        document.getElementById(
            "truheBild"
        );

    vibrate([
    120,
    80,
    120,
    80,
    250
]);

if (typeof confetti === "function") {

    confetti({

        particleCount: 120,

        spread: 90,

        origin: {
            y: 0.6
        }

    });
}

truheBild.src =
    "truhe-offen.png";

    truheBild.style.transform =
        "scale(1.08)";

    setTimeout(() => {

const geschenk =
    document.getElementById(
        "geschenk"
    );

geschenk.style.display =
    "block";

geschenk.classList.add(
    "geschenk-animation"
);

        document.getElementById(
            "geschenk"
        ).scrollIntoView({
            behavior: "smooth"
        });

    }, 1200);
}


// =====================================
// INPUT EFFEKT
// =====================================

document
    .querySelectorAll("input")
    .forEach(input => {

        input.addEventListener(
            "focus",
            () => {

                input.style.transform =
                    "scale(1.01)";
            }
        );

        input.addEventListener(
            "blur",
            () => {

                input.style.transform =
                    "scale(1)";
            }
        );

    });


// =====================================
// GEHEIMER ADMIN-ZUGANG
// =====================================

let taps = 0;

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const titel =
            document.querySelector(
                ".countdown-box h1"
            );

        if (!titel) {
            return;
        }

        titel.addEventListener(
            "click",
            () => {

                taps++;

                if (taps >= 5) {

                    const code =
                        prompt(
                            "Admin-Code eingeben"
                        );

                    if (
                        code ===
                        "ilina2026admin"
                    ) {

                        clearInterval(
                            countdownInterval
                        );

                        document.getElementById(
                            "countdown-screen"
                        ).style.display =
                            "none";

                        document.getElementById(
                            "main-content"
                        ).style.display =
                            "block";

                        window.scrollTo(
                            0,
                            0
                        );

                    } else {

                        alert(
                            "Falscher Code"
                        );
                    }

                    taps = 0;
                }

                setTimeout(() => {

                    taps = 0;

                }, 3000);

            }
        );

    }
);