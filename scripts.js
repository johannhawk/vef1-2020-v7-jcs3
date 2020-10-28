/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;

/**
 * Byrja forrit.
 */
function start() {
  //alert('Halló!')

  do {
  // input verður strengur eða null
  let input = prompt('Hvort viltu kóða eða afkóða streng? Skrifaðu „kóða“ eða „afkóða“')

  if (input !== 'kóða' && input !== 'afkóða'){
    alert('Villa! Veit ekki hvaða aðgerð "' + input + '" er.')
    continue;
  }

  // shift verður (vonandi) tala sem er strengur
  const shift = prompt('Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]');

  // köstum yfir í alvöru tölu
  const shiftNum = parseInt(shift, 10);

  //   er ekki heiltala              er minni en 1     er stærri en stafróf
  if (!Number.isInteger(shiftNum) || shiftNum < 1 || shiftNum > LETTERS.length -1) {
    alert('Villa! Númer er ekki heiltala eða er ekki í bilinu [1, 31].');
    continue;
  }

  //ná streng
  const str = prompt('Strengur:');

  
  if (str == " "){
    alert('Þú gafst ekki upp streng. Reyndu aftur')
    
    continue;
  }

  str.toUpperCase();

  //kíkja ef það er í íslenskan stafróf
  /*if (str.includes(LETTERS)){  //TODO, verður að neita "blåhaj" og "/*)/=&" intak
    alert('Þú gafst upp stafi sem ekki er hægt að nota. Reyndu aftur.')
    continue;
  }*/


  //kikja fyrir tolur
  if (!isNaN(parseFloat(str)) && isFinite(str)){
    alert('Villa! Strengur hefur tölu');
    continue;
  }

  if (input === 'afkóða') {
    alert('Niðurstaða: ' + decode(str, shiftNum))
    continue;
  } else {
    alert('Niðurstaða: ' + encode(str, shiftNum))
  }

  } while (confirm('Viltu byrja upp á nýtt?'))
}

// Hér er gott að commenta út til að vinna í encode/decode föllum fyrst og síðan „viðmóti“ forrits
start();

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) { //n er shift
  //str = str.toLowerCase();
  let letters = LETTERS.split('');//splitta LETTERS til að gera það nothæft
  let output = '';

  for(var i = 0; i < str.length; i++){
    let stafur = str[i];
    
    if(stafur === ' '){//ef það eru einhvervegin bil
      output += stafur;
      continue;
    }

    let staf_index = letters.indexOf(stafur)

    let nytt_index = staf_index + n;

    if(nytt_index > letters.length -1)
      nytt_index = nytt_index - letters.length;

    if(nytt_index < 0)
      nytt_index = nytt_index + letters.length;

    output += letters[nytt_index];
  }
  //debugger;
  return output;
}
//console.log(encode('HALLO', 2))

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  //str = str.toLowerCase();
  let letters = LETTERS.split('');//splitta LETTERS til að gera það nothæft
  let output = '';

  for(var i = 0; i < str.length; i++){
    let stafur = str[i];

    if(stafur === ' '){//ef það eru einhvervegin bil
      output += stafur;
      continue;
    }

    let staf_index = letters.indexOf(stafur)

    let nytt_index = staf_index - n;

    if(nytt_index > letters.length -1)
      nytt_index = nytt_index + letters.length;

    if(nytt_index < 0)
      nytt_index = nytt_index - letters.length;

      output += letters[nytt_index];
  }

  return output;
}

console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
