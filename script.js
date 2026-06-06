// ==========================
// Countdown
// ==========================

const freigabeDatum =
    new Date("2026-06-21T00:00:00");

function updateCountdown() {

    const jetzt = new Date();

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
            differenz / (1000 * 60 * 60 * 24)
        );

    const stunden =
        Math.floor(
            (differenz % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

    const minuten =
        Math.floor(
            (differenz % (1000 * 60 * 60))
            / (1000 * 60)
        );

    const sekunden =
        Math.floor(
            (differenz % (1000 * 60))
            / 1000
        );

    document.getElementById(
        "countdown"
    ).innerHTML =
        `${tage} Tage<br>
         ${stunden} Stunden<br>
         ${minuten} Minuten<br>
         ${sekunden} Sekunden`;
}

updateCountdown();

setInterval(
    updateCountdown,
    1000
);


// ==========================
// Rätsel prüfen
// ==========================

function pruefen() {

    let a1 =
        document.getElementById("antwort1")
        .value
        .trim()
        .toUpperCase();

    let a2 =
        document.getElementById("antwort2")
        .value
        .trim()
        .toUpperCase();

    let a3 =
        document.getElementById("antwort3")
        .value
        .trim()
        .toUpperCase();

    let a4 =
        document.getElementById("antwort4")
        .value
        .trim()
        .toUpperCase();

    let a5 =
        document.getElementById("antwort5")
        .value
        .trim()
        .toUpperCase();

    let a6 =
        document.getElementById("antwort6")
        .value
        .trim()
        .toUpperCase();

    let richtig =

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

        document.getElementById(
            "truhe"
        ).style.display = "block";

        document.getElementById(
            "truhe"
        ).scrollIntoView({
            behavior: "smooth"
        });

    } else {

        alert(
            "Mindestens eine Antwort stimmt noch nicht 😊"
        );
    }
}


// ==========================
// Schatztruhe öffnen
// ==========================

function oeffnen() {

    let truhe =
        document.getElementById(
            "truheBild"
        );

    truhe.src =
        "truhe-offen.png";

    truhe.classList.add(
        "geoeffnet"
    );

    setTimeout(function () {

        document.getElementById(
            "geschenk"
        ).style.display = "block";

        document.getElementById(
            "geschenk"
        ).scrollIntoView({
            behavior: "smooth"
        });

    }, 1500);
}