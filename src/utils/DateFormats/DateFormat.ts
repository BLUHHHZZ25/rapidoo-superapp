
type PropsDate = {
    date: string,
}


export function DateFormatted({date}: PropsDate){
    // Make the date object
    const format = new Date(date) 
    const formatted_date = format.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: '2-digit'});

    return  formatted_date
}

export function TimeFormatted({date}: PropsDate){
    // Make the date object
    const format = new Date(date) 
    const formatted_time = format.toLocaleTimeString('en-US', {hour: 'numeric', minute:'numeric', hour12:true})

    return  formatted_time
}