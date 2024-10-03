import { mkConfig, generateCsv, download } from 'export-to-csv';

const exportCSV = (rows,columns, filename ) => {
    const options = mkConfig({
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        useKeysAsHeaders: false,
        showColumnHeaders:true,
        columnHeaders: columns.map(col => col.header), // Use display headers,
        filename:filename
    });

    const formattedData = rows.map(row => {
        const formattedRow = {};
        columns.forEach(col => {
            formattedRow[col.header] = row[col.accessorKey];
        });
        return formattedRow;
    });

    const csv = generateCsv(options)(formattedData);
    download(options)(csv);
};

export default exportCSV;




