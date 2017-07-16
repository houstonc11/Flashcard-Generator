// var BasicCard = require("./basicCard.js");
var inquirer = require("inquirer");
var ClozeCard = function(fulltext, cloze) {
    this.cloze = cloze;
    this.partial = fulltext.replace(cloze, "...");
    this.fulltext = fulltext;
}

module.exports = ClozeCard;