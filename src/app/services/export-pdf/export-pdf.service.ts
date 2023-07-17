import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class ExportPdfService {
  ocument: any;
  constructor() { }
  createPdfs(filename: string, element: string) {
    //var load = this.toast.loading('.Generando pdf...')
    let data = document.getElementById(element)
    //let data = document.getElementById('content');
    html2canvas(data!).then((canvas:any) => {
      let imgWidth = 190;
      let pageHeight = 300;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(filename);
      //load.close() // Generated PDF
    });
  }
}
