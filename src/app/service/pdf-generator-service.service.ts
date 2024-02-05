import { Injectable } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
 
@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  constructor() {}
 
  downloadPdf(elementId: string, filename: string): void {
    const element: HTMLElement = document.getElementById(elementId)!;
 
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
 
      const height = pdf.internal.pageSize.getHeight();
      const width = pdf.internal.pageSize.getWidth();

      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
 
      pdf.save(filename + '.pdf');
    });
  }
}