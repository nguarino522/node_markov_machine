const { MarkovMachine } = require("./markov");


describe("MarkovMachine Class Test", function () {
    let mm = new MarkovMachine("this is a test a test it is a test");
    let mm2 = new MarkovMachine("I do not like them with a mouse");
    
    /** took this out as in theory not needed since we have an object*/
    // beforeAll(function(){
    //     mm = new markov.MarkovMachine("this is a test a test it is a test");
    // });

    test("test word array creation", function () {
        expect(mm.words).toEqual([
            "this", "is", "a",
            "test", "a", "test",
            "it", "is", "a",
            "test"
        ]);

        expect(mm2.words).toEqual([
            "I", "do", "not","like", "them", "with", "a", "mouse"
        ]);
    });
    
    test("test if array map for the chains created", function () {
        expect(mm.chains instanceof Map).toEqual(true);
        expect(mm2.chains instanceof Map).toEqual(true);
        
        expect(mm.chains).toEqual(new Map([
            ["this", ["is"]],
            ["is", ["a", "a"]],
            ["a", ["test", "test", "test"]],
            ["test", ["a", "it", null]],
            ["it", ["is"]]
        ]));
        
        expect(mm2.chains).toEqual(new Map([
            ["I", ["do"]],
            ["do", ["not"]],
            ["not", ["like"]],
            ["like", ["them"]],
            ["them", ["with"]],
            ["with", ["a"]],
            ["a", ["mouse"]],
            ["mouse", [null]],
        ]));
    });

    test("test random ket picker", function(){
        let testArray = Array.from(mm.chains.keys());
        let key = MarkovMachine.pickRandom(testArray);
        expect(checkIfKeyValid(key, testArray)).toEqual(true);
    });

    test("test make text functionality", function(){
        expect(mm.makeText()).toContain("test");
        expect(mm2.makeText()).toContain("mouse");
    })  

});


// helper function to check range
function checkIfKeyValid(key, arr){
    if (arr.includes(key)) {
        return true;
    } else {
        return false;
    }
}