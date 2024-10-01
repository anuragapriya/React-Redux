import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { CSVLink, CSVDownload } from "react-csv";
import ExportToPDF from '_utils/exportPdf';
import ExportToCsv from '_utils/exportCsv';
const Download=(props)=>{
const rows= props.rows;
const headers= props.headers;
const csvHeader= headers.map(x=>x.header);

const handleExportToPdf=()=>{
    ExportToPDF(rows,headers);
}

const handleExportToCsv=()=>{
    ExportToCsv(rows,csvHeader);
}
    return(<>
    <Button
          disabled={rows?.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={ handleExportToPdf}
          startIcon={<FileDownloadIcon />}
        >
          Export To PDF
        </Button>

        <Button
          disabled={rows?.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={ handleExportToCsv}
          startIcon={<FileDownloadIcon />}
        >
          Export To csv
        </Button>
    </>);
}

export default Download;