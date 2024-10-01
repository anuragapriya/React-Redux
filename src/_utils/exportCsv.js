import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here

const ExportToCsv = (rows,headers) => {
  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: false,
    showColumnHeaders:true,
    columnHeaders:headers
  });
 
  const rowData=rows.map((row) => row);
  const csv = generateCsv(csvConfig)(rowData);
  download(csvConfig)(csv);
};

export default ExportToCsv;