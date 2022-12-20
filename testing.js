// random test file to run to test the output 

const markov = require("./markov");

let mm = new markov.MarkovMachine("this is a test a test it is a test");
let mm2 = new markov.MarkovMachine("I do not like them with a mouse");
console.log(mm.makeText());
console.log(mm2.makeText());