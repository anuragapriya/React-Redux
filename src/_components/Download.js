import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import exportPDF from '_utils/exportPdf';
import exportCSV from '_utils/exportCsv';
const Download=(props)=>{
const rows= props.rows;
const headers= props.headers;
const filename=props.filename;

const handleExportToPdf=()=>{
  exportPDF(rows,headers,filename);
}

const handleExportToCsv=()=>{
  exportCSV(rows,headers,filename);
}
    return(<>
    <Button
          
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={ handleExportToPdf}
          startIcon={<FileDownloadIcon />}
        >
          Export To PDF
        </Button>

        <Button
         
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={ handleExportToCsv}
          startIcon={<FileDownloadIcon />}
        >
          Export To Exel
        </Button>
    </>);
}

export default Download;