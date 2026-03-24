
const numberValidate = (email: string) => { //pass the email here 
    if (email.length > 9 && email !== "" && email[0] == "9") {
        return true
    }
    return false
}

const NumberValidation = (input:string) => { // input the data here
    if (input == "") {
        return false; // if the field are empty
    }
    else if (!numberValidate(input)) {
        console.log("true");
        return true
    } else {
        console.log("false");
        console.log("_______--", numberValidate(input));
        return false
    }
}

export default NumberValidation