const readlineSync = require("readline-sync");

class Henkilo {
  constructor(etunimi, sukunimi, kutsumanimi, syntymävuosi) {
    this.etunimi = etunimi;
    this.sukunimi = sukunimi;
    this.kutsumanimi = kutsumanimi;
    this.syntymävuosi = new Date(syntymävuosi);
  }
}

class Urheilija extends Henkilo {
  constructor(
    etunimi,
    sukunimi,
    kutsumanimi,
    syntymävuosi,
    omapaino,
    laji,
    saavutukset,
    linkki
  ) {
    super(etunimi, sukunimi, kutsumanimi, syntymävuosi);
    this.omapaino = omapaino;
    this.laji = laji;
    this.saavutukset = saavutukset;
    this.linkki = linkki;
  }

  get omapaino() {
    return this._omapaino;
  }

  set omapaino(omapaino) {
    this._omapaino = omapaino + " kg";
  }

  get laji() {
    return this._laji;
  }
  set laji(laji) {
    this._laji = laji;
  }

  get saavutukset() {
    return this._saavutukset;
  }
  set saavutukset(saavutukset) {
    this._saavutukset = saavutukset;
  }

  get linkki() {
    return this._linkki; // Getter palauttaa _linkki-attribuutin
  }

  set linkki(linkki) {
    if (!/^https?:\/\//.test(linkki)) {
      linkki = "https://" + linkki; // Lisää "https://", jos puuttuu
    }
    this._linkki = linkki;
  }
}

// Luodaan Urheilija-olio
const urheilija = new Urheilija();
urheilija.etunimi = "Perttu";
urheilija.sukunimi = "Hyttinen";
urheilija.kutsumanimi = "Pertsa";
urheilija.syntymävuosi = "1981-09-01";
urheilija.omapaino = 127;
urheilija.laji = "Kaljakellunta";
urheilija.saavutukset = "Kolmen kertainen kultamitalisti";
urheilija.linkki = "fi.wikipedia.org/wiki/Kaljakellunta";

const urheilija2 = new Urheilija();
urheilija2.etunimi = "Timo";
urheilija2.sukunimi = "Kaukonen";
urheilija2.kutsumanimi = "'Sauna Timo'";
urheilija2.syntymävuosi = "1965-09-07";
urheilija2.omapaino = 111;
urheilija2.laji = "Saunominen";
urheilija2.saavutukset = "Voittanut maailman mestaruuden viidesti";
urheilija2.linkki =
  "https://www.mtvuutiset.fi/artikkeli/missa-he-ovat-nyt-timo-meinasi-palaa-hengilta-saunassa-rujo-keho-muistuttaa-yha-kauhun-hetkista/6083514";

const urheilija3 = new Urheilija();
urheilija3.etunimi = "Kim";
urheilija3.sukunimi = "Jong un";
urheilija3.kutsumanimi = "";
urheilija3.syntymävuosi = "1984-01-08";
urheilija3.omapaino = 140;
urheilija3.laji = "Golf";
urheilija3.saavutukset = "11 hole in one";
urheilija3.linkki =
  "https://www.espn.com/blog/playbook/fandom/post/_/id/308/kim-jong-un-a-boss-at-sports-too";

// Testataan luodun olion tietoja
console.log(
  `Urheilija: ${urheilija.etunimi} ${urheilija.kutsumanimi} ${urheilija.sukunimi}`
);
console.log(`Syntymävuosi:  ${urheilija.syntymävuosi}`);
console.log(`Laji: ${urheilija.laji}`);
console.log(`Omapaino: ${urheilija.omapaino}`);
console.log(`Saavutukset: ${urheilija.saavutukset}`);
console.log(`Linkki: ${urheilija.linkki}`);

console.log();

console.log(
  `Urheilija: ${urheilija2.etunimi} ${urheilija2.kutsumanimi} ${urheilija2.sukunimi}`
);
console.log(`Syntymävuosi: ${urheilija2.syntymävuosi}`);
console.log(`Laji: ${urheilija2.laji}`);
console.log(`Omapaino: ${urheilija2.omapaino}`);
console.log(`Saavutukset: ${urheilija2.saavutukset}`);
console.log(`Linkki: ${urheilija2.linkki}`);

console.log();

console.table([
  {
    Etunimi: urheilija3.etunimi,
    Kutsumanimi: urheilija3.kutsumanimi,
    Sukunimi: urheilija3.sukunimi,
    Syntymävuosi: urheilija3.syntymävuosi,
    Laji: urheilija3.laji,
    Omapaino: urheilija3.omapaino,
    Saavutukset: urheilija3.saavutukset,
    Linkki: urheilija3.linkki,
  },
]);
