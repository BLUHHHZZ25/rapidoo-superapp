
const confirmValidate = (input:string, inputTwo:string) => { //pass the email here 
    if(input == inputTwo){
        return true
    }
}

const ConfirmValidation = (input:string,inputTwo:string) => { // input the data here
    if ((input == "")||inputTwo == "") {
        return false; // if the field are empty
    }
    else if (!confirmValidate(input,inputTwo)) {
        console.log("true");
        return true
    } else {
        console.log("false");
        console.log("_______--", confirmValidate(input,inputTwo));
        return false
    }
}

export default ConfirmValidation