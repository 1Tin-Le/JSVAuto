// array that holds all current text inside of version script tags
let currentInput = [];

let inputManipulator = {
    queryCollect: function(input) {
        // Match for any instances of a script version tag, then bag it into the array
        currentInput = input.match(inputAndClearRegExp)
        console.log("Data collected: ", currentInput)
        return currentInput;
    },
    queryClear: function(input) {
        // clear out version script tags
        input = input.replace(inputAndClearRegExp, "")
        return input
    },
    queryFormatAndUpdateQueryInput: function() {
        currentInput.forEach(function(currentVersionInput, i) {
             // below code tests for if the current script tag version input has followed the pattern n.nnnnn, where the n's can represent any number.
        if(/^\d\.\d{5}$/.test(currentVersionInput)) {
            newValueToBig = new Big(currentVersionInput).plus(0.00001)
            // jam the new version in and replace the old one
            currentInput[i] = newValueToBig.toString()
            console.log(currentInput[i] + " hi")
        }
        // ... if not, implement versioning format and set it to the value
        else {
            currentInput[i] = "0.00000"
            console.log(currentInput[i])
        }
        })
        return currentInput
    },
    queryReplace: function(input) {
        currentInput.forEach(function(updatedTag) {
            // get the whole thing (?autoVer='') and replace it
            input = input.replace(queryReplaceRegExp, `?${stringParamName}='${updatedTag}'`)
            console.log(queryReplaceRegExp, "queryReplaceRegExp")
        })
        console.log(input, "Final Version Printed to page")
        return input;
        }
    }

$(document).ready(function () {
    $("#submit").click(function(ev) {
        ev.preventDefault();
        let userInput = document.getElementById('input').value.toString();
        console.log(userInput)
        console.log(inputManipulator.queryCollect(userInput))
        userInput = inputManipulator.queryClear(userInput)
        console.log(userInput, "Input Cleared")
        currentInput = inputManipulator.queryFormatAndUpdateQueryInput()
        console.log(currentInput)
        userInput = inputManipulator.queryReplace(userInput)
        // wrap the input in a <pre> tag to preserve newlines
        $("#result").html("<pre>" + $("<div>").text(userInput).html() + "</pre>");
    })
})