import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import images from 'images';
import imgToBase64 from './imgTobase64';

    const exportPDF = (rows,columns,filename) => {
        const doc = new jsPDF();
        const tableData = rows.map((row) => Object.values(row));
        const tableHeaders = columns.map((c) => c.header);
        const imageUrl =images.logo;
//         let idCardBase64 = '';
//         imgToBase64(imageUrl, (result) => {
//      idCardBase64 = result;
// });
        
//         doc.addImage(idCardBase64, 'JPEG', 10, 5, 40, 12);
        autoTable(doc, {
          head: [tableHeaders],
          body: tableData,
        });
    
        doc.save(filename+'.pdf');
      };

      export default exportPDF;