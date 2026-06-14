// =====================================
// FREIGABEDATUM
// =====================================

const freigabeDatum =
    new Date("2026-06-21T00:00:00");


// =====================================
// COUNTDOWN
// =====================================

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

setInterval(
    updateCountdown,
    1000
);


// =====================================
// VIBRATION HILFSFUNKTION
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

        // Erfolgs-Vibration

        vibrate([
            150,
            100,
            150
        ]);

        const truhe =
            document.getElementById(
                "truhe"
            );

        truhe.style.display =
            "block";

        truhe.scrollIntoView({
            behavior: "smooth"
        });

    }

    else {

        // kurze Fehlervibration

        vibrate(200);

        alert(
            "Mindestens eine Antwort stimmt noch nicht 😊"
        );
    }
}



// =====================================
// SCHATZTRUHE ÖFFNEN
// =====================================

function oeffnen() {

    const truheBild =
        document.getElementById(
            "truheBild"
        );

    // längere Vibration

    vibrate([
        120,
        80,
        120,
        80,
        250
    ]);

    truheBild.src =
        "truhe-offen.png";

    truheBild.style.transform =
        "scale(1.08)";



    setTimeout(() => {

        document.getElementById(
            "geschenk"
        ).style.display =
            "block";

        document.getElementById(
            "geschenk"
        ).scrollIntoView({
            behavior: "smooth"
        });

    }, 1200);
}



// =====================================
// KLEINER EFFEKT FÜR EINGABEFELDER
// =====================================

const inputs =
    document.querySelectorAll(
        "input"
    );

inputs.forEach(input => {

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

document.addEventListener("DOMContentLoaded", () => {

    const titel =
        document.querySelector(
            ".countdown-box h1"
        );

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

                    document.getElementById(
                        "countdown-screen"
                    ).style.display = "none";

                    document.getElementById(
                        "main-content"
                    ).style.display = "block";

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

});