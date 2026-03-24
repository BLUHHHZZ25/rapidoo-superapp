

const birthdayValidate = (date: string) => { //pass the email here 
    // const month = 3;
    // const day = 25;
    // const year = 2021;
  
    const cMonth = new Date().getMonth()+1;
    const cYear = new Date().getFullYear();
    const cDate = new Date().getDate();
    

    const dateImported = date;
    const year = parseInt(dateImported.slice(6,10));
    const month = parseInt(dateImported.slice(0,2));
    const day = parseInt(dateImported.slice(3,5))

    let age = cYear - year;

    const getAge = () => {
      month > cMonth ? age = age + 1
      : month == cMonth && day > cDate ? age = age + 1
      : age = age;
      
      console.log("year age:", age); 
      console.log("day today:", date); 
      console.log("day year:", year); 
      console.log("day day:", day); 
      return age > 18
    }
  
    // getAge()
    // console.log("date try", date);
    // console.log("year try", year);

    return getAge();
  
}

const BirthdayValidation = (input:string) => { // input the data here
    if (input == "") {
        return false; // if the field are empty
    }
    else if (!birthdayValidate(input)) {
        
        return true
    } else {
        return false
    }
}

export default BirthdayValidation