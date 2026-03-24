
import moment from 'moment-timezone';

export function GetCurrentDate() {
    const currentDate = new Date(); // Returns the current date and time

    const day = currentDate.getDate(); // Get the day (1-31)
    const month = currentDate.getMonth() + 1; // Get the month (0-11, so add 1)
    const year = currentDate.getFullYear(); // Get the year (e.g., 2024)

    const hours = currentDate.getHours(); // Get the hours (0-23)
    const minutes = currentDate.getMinutes(); // Get the minutes (0-59)
    const seconds = currentDate.getSeconds(); // Get the seconds (0-59)

    // Example: "May 6, 2024 14:30:45"
    const formattedDateTime = `${month}/${day}/${year}:${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}

export function GetCurrentMonth() {
    const currentDate = new Date(); // Returns the current date and time

    const day = currentDate.getDate(); // Get the day (1-31)
    const month = currentDate.getMonth() + 1; // Get the month (0-11, so add 1)
    const year = currentDate.getFullYear(); // Get the year (e.g., 2024)

    const hours = currentDate.getHours(); // Get the hours (0-23)
    const minutes = currentDate.getMinutes(); // Get the minutes (0-59)
    const seconds = currentDate.getSeconds(); // Get the seconds (0-59)

    // Example: "May 6, 2024 14:30:45"
    // const formattedDateTime = `${month}/${day}/${year}:${hours}:${minutes}:${seconds}`;
    const response = `${month}` 

    return response;
}

export function GetCurrentYear() {
    const currentDate = new Date(); // Returns the current date and time

    const day = currentDate.getDate(); // Get the day (1-31)
    const month = currentDate.getMonth() + 1; // Get the month (0-11, so add 1)
    const year = currentDate.getFullYear(); // Get the year (e.g., 2024)

    const hours = currentDate.getHours(); // Get the hours (0-23)
    const minutes = currentDate.getMinutes(); // Get the minutes (0-59)
    const seconds = currentDate.getSeconds(); // Get the seconds (0-59)

    // Example: "May 6, 2024 14:30:45"
    // const formattedDateTime = `${month}/${day}/${year}:${hours}:${minutes}:${seconds}`;
    const response = `${year}` 

    return response;
}

export function GetCurrentDay() {
    const currentDate = new Date(); // Returns the current date and time

    const day = currentDate.getDate(); // Get the day (1-31)
    const month = currentDate.getMonth() + 1; // Get the month (0-11, so add 1)
    const year = currentDate.getFullYear(); // Get the year (e.g., 2024)

    const hours = currentDate.getHours(); // Get the hours (0-23)
    const minutes = currentDate.getMinutes(); // Get the minutes (0-59)
    const seconds = currentDate.getSeconds(); // Get the seconds (0-59)

    // Example: "May 6, 2024 14:30:45"
    // const formattedDateTime = `${month}/${day}/${year}:${hours}:${minutes}:${seconds}`;
    const response = `${day}` 

    return response;
}

export function GetManilaTime(){
    const convertLocalTime = () => {
    // Get the current UTC time
    const utcNow = moment.utc();
      
    // Convert UTC time to Asia/Manila timezone
    const manilaTime = utcNow.tz('Asia/Manila');
      
    // Return datetime (year-month-day hours-minutes-seconds)
    return manilaTime.format('YYYY-MM-DD HH:mm:ss');
    };

    // Usage example
    const localTime = convertLocalTime();
    return localTime
}