import axios from "axios";
import { BASE_URL } from "../../Config";


export default async function ReportIssues(){
    try {
        const data = await axios.get(BASE_URL + "/admin/v1/user/report_issues")
        return data;
    } catch (error) {
        console.error(error);
    }
}