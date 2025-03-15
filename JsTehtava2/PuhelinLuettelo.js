class Henkilo {
  constructor(nimi, puhelinnumero) {
    this.nimi = nimi;
    this.puhelinnumero = puhelinnumero;
  }
}

let puhelinluettelo = [
  new Henkilo("Abdi Mohammad", "0401234567"),
  new Henkilo("Top G", "0509876543"),
  new Henkilo("Jones Angel", "05048394389"),
  new Henkilo("Triple Ice", "0505748578"),
];

const readlineSync = require("readline-sync");

function LisaaUusiHenkilo() {
  let nimi = readlineSync.question("Syötä nimi: ");
  let puhelinnumero = readlineSync.question("Syötä puhelinnumero: ");

  let uusihenkilo = new Henkilo(nimi, puhelinnumero);

  puhelinluettelo.push(uusihenkilo);

  console.log("Uusi henkilö lisätty puhelinluetteloon!");

  // Näytetään päivitetty puhelinluettelo
  console.log(puhelinluettelo);
}

function HaeHenkiloa(puhelinluettelo, nimi) {
  let henkilo = puhelinluettelo.find(
    (h) => h.nimi.toLowerCase() === nimi.toLowerCase()
  );
  if (henkilo) {
    return henkilo.puhelinnumero; // Palautetaan puhelinnumero
  } else {
    return "Henkilöä ei löytynyt puhelinluettelosta."; // Jos henkilö ei löydy
  }
}
function NaytaKaikki() {
  console.log(puhelinluettelo);
}

console.log("Tervetuloa puhelinluetteloon!");
console.log("Jos haluat Nähdä puheliluettelon, Paina yksi.");
console.log("Jos haluat lisätä henkilön puheliluettelon, Paina kaksi.");
console.log("Hae puhelinnumeroa nimen kautta, Paina kolme.");
console.log("Quit, Paina q.");

do {
  // Kysytään käyttäjältä valinta joka kierroksella
  Valinta = readlineSync.question(
    "Valitse toiminto (1: Näytä kaikki, 2: Lisää henkilö, 3: Hae henkilö, q: Lopeta): "
  );

  switch (Valinta) {
    case "1":
      NaytaKaikki();
      break;
    case "2":
      LisaaUusiHenkilo();
      break;
    case "3":
      let nimi = readlineSync.question("Syötä haettavan henkilön nimi: ");
      let puhelinnumero = HaeHenkiloa(puhelinluettelo, nimi); // Kutsutaan HaeHenkiloa-funktiota
      console.log(`Henkilön puhelinnumero on: ${puhelinnumero}`); // Näytetään puhelinnumero
      break;
    case "q":
      console.log("Ohjelma lopetetaan.");
      break;
    default:
      console.log("Väärä näppäin! Yritä uudelleen.");
      break;
  }
} while (Valinta !== "q");
