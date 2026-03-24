
const emailValidate = (email: string) => { //pass the email here 
    const multipleDotsRegex = /(\.\.)|(\.\@)/; // Prevents multiple dots or dot before @
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return !regex.test(email) || multipleDotsRegex.test(email);
}

const EmailValidation = (input:string) => { // input the data here
    if (input == "") {
        return false; // if the field are empty
    }
    else if (emailValidate(input)) {
        console.log("true");
        return true
    } else {
        console.log("false");
        console.log("_______--", emailValidate(input));
        return false
    }
}

export default EmailValidation