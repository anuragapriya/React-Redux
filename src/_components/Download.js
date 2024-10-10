import {  Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import exportPDF from '_utils/exportPdf';
import exportCSV from '_utils/exportCsv';
import exportExcel from '_utils/exportExcel';
import FileUpload from './FileUpload';
const Download = (props) => {
  const rows = props.rows;
  const headers = props.headers;
  const filename = props.filename;

  const handleExportToPdf = () => {
    exportPDF(rows, headers, filename);
  }

  const handleExportToCsv = () => {
    exportCSV(rows, headers, filename);
  }
  const handleExportToExcel = () => {
    exportExcel(rows, headers, filename);
  }

  return (<>
    <Button
      onClick={handleExportToPdf}
      startIcon={<FileDownloadIcon />}
    >
      Export To PDF
    </Button>

    <Button
      onClick={handleExportToCsv}
      startIcon={<FileDownloadIcon />}
    >
      Export To CSV
    </Button>
    <Button
      onClick={handleExportToExcel}
      startIcon={<FileDownloadIcon />}
    >
      Export To Excel
    </Button>
    <FileUpload></FileUpload>
  </>);
}

export default Download;