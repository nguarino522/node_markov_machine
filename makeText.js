/** Command-line tool to generate Markov text. */

const { MarkovMachine } = require("./markov");
const axios = require("axios");
const fs = require("fs");

// make markov machine and generate text from it
function textGeneration(text) {
    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
}


// read a file and generate text from it
function textMake(path) {
    fs.readFile(path, "utf8", function (err, data) {
        if (err) {
            console.error(`Error reading file: ${path}: ${err}`);
            process.exit(1);
        } 
        textGeneration(data);
    });
}

// read from URL and generate text from it
async function textMakeFromURL(url) {
    try {
        resp = await axios.get(url);
    } catch (err) {
        console.error(`Cannot read URL: ${url}: ${err}`);
        process.exit(1);
    }
    textGeneration(resp.data);
}


// read method and perform correct functionality
let method = process.argv[2];
if (method === "file" || method === "url") {
    let path = process.argv[3];
    if (method === "file") {
        textMake(path);
    } else if (method === "url") {
        textMakeFromURL(path);
    } else {
        console.error(`Unknown method: ${method}`);
        process.exit(1);
    }
} else if (method === "text") {
    let text = "";
    for (let i=3; i < process.argv.length; i++) {
        text = text + " " + process.argv[i];
    }
    textGeneration(text);
} else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}
