var cross = {
  'unita': {
    '1': 'uno',
    '2': 'due',
    '3': 'tre',
    '4': 'quattro',
    '5': 'cinque',
    '6': 'sei',
    '7': 'sette',
    '8': 'otto',
    '9': 'nove'
  },
  'decunita': {
    '10': 'dieci',
    '11': 'undici',
    '12': 'dodici',
    '13': 'tredici',
    '14': 'quattordici',
    '15': 'quindici',
    '16': 'sedici',
    '17': 'diciassette',
    '18': 'diciotto',
    '19': 'diciannove'
  },
  'decine': {
    '2': 'venti',
    '3': 'trenta',
    '4': 'quaranta',
    '5': 'cinquanta',
    '6': 'sessanta',
    '7': 'settanta',
    '8': 'ottanta',
    '9': 'novanta'
  },
  'suffissi': {
    '0': '',
    '3': 'mila',
    '6': 'milioni',
    '9': 'miliardi'
  }
};

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function sottomille(n) {
  var r = '';
  var nC = parseInt((n/100), 10);
  var nDU = n%100;
  var nD = parseInt((nDU/10), 10);
  var nU = n%10;
  var rC = '';
  if (nC>1) {
    rC = cross.unita[nC] + 'cento';
  } else if (nC==1) {
    rC = 'cento';
  }
  var rDU = '';
  if (nDU>=1 && nDU<10) {
    rDU = cross.unita[nU];
  } else if (nDU>=10 && nDU<20) {
    rDU = cross.decunita[nDU];
  } else if (nDU>20) {
    rDU = cross.decine[nD] + cross.unita[nU];
  }
  r = rC + rDU;
  return r;
}

function rendicarino(brutto) {
  var trova = [/([ae])nt([ai])(uno|otto)/, /^unomila/, /^unomilioni/, /^unomiliardi/];
  var cambia = ['$1nt$3', 'mille', 'unmilione', 'unmiliardo'];
  for (var i in trova) {
    brutto = brutto.replace(trova[i], cambia[i]);
  }
  brutto = brutto.replace('unomili', 'unmili');
  return brutto;
}

module.exports = function() {
  var separatore = (typeof arguments[1] === 'undefined') ? '/' : arguments[1];
  var unita = (typeof arguments[0] === 'undefined') ? '0' : arguments[0];
  if (!isNumeric(unita)) {
    var err = new Error('Richiesto un parametro numerico per unità, nella forma più elementare. Esempio: per 1,23 EUR utilizzare 123 classificando le unità in centesimi');
    throw err;
  }
  var cents = ('00'+unita.substr(-2)).slice(-2);
  var unita_inesame = '0';
  var letterale = 'zero';
  if (unita.length>2) {
    unita_inesame = unita.substr(0, unita.length-2);
    letterale = '';
    var esponente = 0;
    var migliaio_inesame = (unita_inesame.length>3) ? unita_inesame.substr(unita_inesame.length-3) : unita_inesame;
    do {
      letterale = rendicarino( sottomille(migliaio_inesame) + cross.suffissi[esponente] ) + letterale;
      unita_inesame = unita_inesame.substr(0, unita_inesame.length-3);
      esponente += 3;
      migliaio_inesame = (unita_inesame.length>3) ? unita_inesame.substr(unita_inesame.length-3) : unita_inesame;
    } while (migliaio_inesame != '');
  }
  return(letterale + separatore + cents);
};
