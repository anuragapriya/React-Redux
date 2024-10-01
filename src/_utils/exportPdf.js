import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
    const ExportToPDF = (rows,columns) => {
        const doc = new jsPDF();
        const tableData = rows.map((row) => Object.values(row));
        const tableHeaders = columns.map((c) => c.header);
    
        autoTable(doc, {
          head: [tableHeaders],
          body: tableData,
        });
    
        doc.save('data.pdf');
      };

      export default ExportToPDF;