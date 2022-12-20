/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // set new map to populate chains with
    let chains = new Map();
    
    // iterate through words array and populate key value pairs to map
    for (let i=0; i < this.words.length; i ++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) {
        chains.get(word).push(nextWord);
      } else {
        chains.set(word, [nextWord]);
      }
    }

    this.chains = chains;
    //return chains;
  }

  // generate a random number to randomly pick a key
  static pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // set new keys arrays from map
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.pickRandom(keys);
    let output = [];
    
    while (output.length < numWords && key !== null) {
      output.push(key);
      key = MarkovMachine.pickRandom(this.chains.get(key));
    };
    
    let textOutput = output.join(" ");
    return textOutput;
  }
}


module.exports = {
  MarkovMachine,
};