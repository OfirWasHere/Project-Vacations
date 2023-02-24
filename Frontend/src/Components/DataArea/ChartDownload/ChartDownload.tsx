import VacationModel from "../../../Models/VacationModel";
import "./ChartDownload.css";
import { CSVLink } from "react-csv";
import { useState } from "react";
import { Button } from "@mui/material";



interface ChartDownloadProps {
    vacationData: VacationModel[];
}

function ChartDownload(props: ChartDownloadProps): JSX.Element {
    const [csvData, setCSVData] = useState([]);
    const tempData = new Array;
    // Adding titles to the csv file:
    tempData.push(["Destination", "follower Count"])
    // Adding all the vacations data to the csv file
    function downloadCSV(): void{
        props.vacationData.map((v)=>{
            tempData.push([v.destination, v.followersCount])
        })
        // saving the data
        setCSVData(tempData);
    }
    

    return (
        <div className="ChartDownload">
            <CSVLink onClick={downloadCSV} data={csvData} className="removeLinkHref">{<Button variant="contained">Download</Button>}</CSVLink>
        </div>
    );
}

export default ChartDownload;


// function downloadCSV(): void{
//     props.vacationData.map((v)=>{
//         csvData.push(v.destination)
//     })x
//     console.log(csvData);
// }




            // csvData = [
            //     ["Destination", "follower Count"],
            //     [v.destination, v.followersCount],
            // ]



// import { Button } from "@mui/material";
// import VacationModel from "../../../Models/VacationModel";
// import "./ChartDownload.css";

// interface ChartDownloadProps {
// 	vacationData:VacationModel;
// }

// const ChartDownload: React.FC<ChartDownloadProps> = ({ vacationData }) => {
//     const downloadCSV = () => {
//       const csvContent = "data:text/csv;charset=utf-8," + convertToCSV(vacationData);
//       const encodedUri = encodeURI(csvContent);
//       const link = document.createElement("a");
//       link.setAttribute("href", encodedUri);
//       link.setAttribute("download", "my_data.csv");
//       document.body.appendChild(link);
//       link.click();
//     };
  
//     const convertToCSV = (data: VacationModel) => {
//       const rows = data.map((v:any) => `${v.destination},${v.followerCount}`);
//       return rows.join("\n");
//     };


//     return (
//         <div className="ChartDownload">
// 		<Button variant="contained" onClick={downloadCSV}>
//             Download
//         </Button>
//         </div>
//     );
// }

// export default ChartDownload;
