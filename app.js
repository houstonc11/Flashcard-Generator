var inquirer = require("inquirer");
var fs = require("fs")
var BasicCard = require("./basicCard.js");
var ClozeCard = require("./clozeCard.js");
var input = process.argv[2];


var basicQuestionsArray = [];
var clozeQuestionsArray = [];

var startCards = function() {
    if (input == "basic") {
        createBasicCard();
    } else if (input == "cloze") {
        createClozeCard();
    }
}

var createBasicCard = function() {
    console.log("\nNEW CARD\n");
    inquirer.prompt([{
            name: "question",
            message: "Enter a question:"
        }, {
            name: "answer",
            message: "Enter an answer to the question:"
        }, {
            name: "continue",
            message: "Add another card? (yes/no)"
        }
    ]).then(function(basicCardData) {
        var basicQuestion = new BasicCard(basicCardData.question, basicCardData.answer);
        basicQuestionsArray.push(basicQuestion);

        var log = "\nFRONT: " + basicQuestion.front + " BACK: " + basicQuestion.back + " ";
        fs.appendFile("log.txt", log);

        if (basicCardData.continue === "yes") {
            createBasicCard();
        } else if (basicCardData.continue === "no") {
            console.log(basicQuestionsArray)
            console.log("ALL QUESTIONS ADDED TO LOG.TXT")
        }
    });
}

var createClozeCard = function() {
    console.log("\nNEW CARD\n");
    inquirer.prompt([{
        name: "fulltext",
        message: "Enter the fulltext of your statement:"
    }, {
        name: "cloze",
        message: "Enter the cloze (the part of the statement you want hidden):"
    }, {
        name: "continue",
        message: "Add another card? (yes/no)"
    }]).then(function(clozeCardData) {
        var clozeQuestion = new ClozeCard(clozeCardData.fulltext, clozeCardData.cloze);
        var fulltext = clozeCardData.fulltext;
        var cloze = clozeCardData.cloze;

        if (fulltext.indexOf(cloze) != -1) {
            clozeQuestionsArray.push(clozeQuestion);

            var log = "\nFRONT: " + clozeQuestion.partial + " BACK: " + clozeQuestion.cloze + " ";
            fs.appendFile("log.txt", log);

            console.log("YOUR FLASHCARDS WERE ADDED IN LOG.TXT");

        } else {
            console.log("That cloze is not in your statement. Please restart.")
        }

        if (clozeCardData.continue === "yes") {
            createClozeCard();
        } else if (clozeCardData.continue === "no") {
            console.log(clozeQuestionsArray);
        }
    });
}

startCards();