/* Variable that determines string param name. Default is "autoVer" if dedicated
textbox is left blank. Otherwise, it'll use the user's assigned substitute.
If you prefer to skip the legwork of having to input your string param name
everytime, feel free to change the variable's value.*/
let stringParamName = ""
// RegExp Variables
let inputAndClearRegExp = new RegExp()
let queryReplaceRegExp = new RegExp()

$(document).ready(function(){
    $("#submit").click(function(ev){
        ev.preventDefault()
        // 
        if(stringParamName == "" && document.getElementById('stringParamNameSelect').value.toString() !== "") {
            stringParamName = document.getElementById('stringParamNameSelect').value.toString()
            console.log("1")
        }
        else if (stringParamName == "" && document.getElementById('stringParamNameSelect').value.toString() == "") {
            stringParamName = "autoVer"
            console.log("2")
        }
        else {
            console.log("Preassigned name:", stringParamName)
            console.log("3")
        }

        console.log(stringParamName, "stringParamName")
        inputAndClearRegExp = new RegExp(`(?<=${stringParamName}=').*(?=')`, 'g')
        queryReplaceRegExp = new RegExp("\\?" + stringParamName + "=''")
    })
})