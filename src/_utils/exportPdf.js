import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import images from 'images';


const exportPDF = (rows, columns, filename) => {
  const doc = new jsPDF();
  const tableData = rows.map((row) => Object.values(row));
  const tableHeaders = columns.map((c) => c.header);
  doc.addImage(images.pdfIcon, 'PNG', 10, 10, 50, 20);
  autoTable(doc, {
    startY: 50,
    pageBreak: 2,
    head: [tableHeaders],
    body: tableData,
  });

  doc.save(filename + '.pdf');
};

export default exportPDF;