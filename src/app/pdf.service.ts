import { Injectable } from '@angular/core';
import { Customer } from './customer.model';
import { Invoice } from './invoice.model';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  pdfMake: any;

  constructor() { }

  private currencyFormat(x: number): string {
    return x.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

  async generatePdf(customerData: Customer, invoiceData: Invoice) {

    await this.loadPdfMaker();
    const subTotal = invoiceData.numberOfHours * invoiceData.hourlyRate;
    const totalRate = subTotal + invoiceData.tax;
    const def = {
      content: [
        {
          alignment: "center",
          table: {
            widths: ["*", "auto", "*", "*", "auto"],
            body: [
              ["", { text: "Incorporation Name:", style: "sectionHeader" }, "", "", ""],
              ["", { text: "Consultant's Name:", style: "sectionHeader" }, "", "", ""],
              ["", { text: "Inc. Address:", style: "sectionHeader" }, "", "", ""],
              ["", { text: "Ph:", style: "sectionHeader" }, "", "", ""],
              ["", { text: "E-mail:", style: "tableSubHeader", decoration: 'underline' }, "", "", { text: 'INVOICE', fontSize: 14, bold: true }]
            ]
          },
          layout: "noBorders"
        },
        {
          table: {
            widths: ['100%'],
            body: [[{ text: '', border: [false, true, false, false] },]]
          }
        },
        {
          margin: [0, 10, 0, 10],
          table: {
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', '*', 'auto', 'auto'],
            body: [
              [{ text: "Bill To", fontSize: 10, bold: true }, "", "", "", "", "", "", "", ""],
              [{ text: "Name ", style: "tableSubHeader" }, { text: invoiceData.customerName, colSpan: 5, style: "tableBody" }, "", "", "", "", "", { text: 'Date', style: "tableSubHeader" }, { text: `${new Date().toLocaleDateString()}`, style: 'tableBody' }],
              [{ text: "Address ", style: "tableSubHeader" }, { text: customerData.address.street, colSpan: 5, style: "tableBody" }, "", "", "", "", "", { text: 'Invoice No', style: "tableSubHeader" }, { text: `INV${String(customerData.projectNo).padStart(5, '0')}`, style: 'tableBody' }],
              [{ text: "City ", style: ["tableSubHeader", "alignRight"] }, { text: customerData.address.city, style: "tableBody" }, { text: "State", style: "tableSubHeader" }, { text: customerData.address.state, style: "tableBody" }, { text: "ZIP", style: "tableSubHeader" }, { text: customerData.address.zip, style: "tableBody" }, "", { text: "Pmt term", style: "tableSubHeader" }, ""],
            ]
          },
          layout: "noBorders"
        },
        {
          margin: [0, 10, 0, 10],
          table: {
            widths: ['auto', '*', 'auto', 'auto'],
            body: [
              [{ text: "Qty/Hours", style: "tableHeader" }, { text: "Description/Work Done", style: "tableHeader" }, { text: "Unit Price/Per Hour Rate", style: "tableHeader" }, { text: "TOTAL", style: "tableHeader" }],
              [{ text: invoiceData.numberOfHours, style: ["tableBody", "alignCenter"] }, { text: "Work Period", style: "tableBody" }, { columns: [[{ text: "$", style: "tableBody" }], [{ text: this.currencyFormat(invoiceData.hourlyRate), style: ["tableBody", "alignRight"] }]] }, { columns: [[{ text: "$", style: "tableBody" }], [{ text: this.currencyFormat(invoiceData.numberOfHours * invoiceData.hourlyRate), style: ["tableBody", "alignRight"] }]] }],
              ["", { text: `Efforts for ${new Date(invoiceData.startDate).toLocaleDateString()} to ${new Date(invoiceData.endDate).toLocaleDateString()}`, style: "tableBody" }, "", ""],
              [{ text: "", border: [false, false, false, false] }, { text: "", border: [false, false, false, false] }, { text: "SubTotal", style: ["tableSubHeader", "alignRight"], border: [false, false, false, false] }, { columns: [[{ text: "$", style: "tableBody" }], [{ text: this.currencyFormat(subTotal), style: ["tableBody", "alignRight"] }]] }],
              [{ text: "", border: [false, false, false, false] }, { text: "Tax Rate(s)", style: ["tableBody", "alignRight"], border: [false, false, false, false] }, { text: "GST/HST %", style: ["tableBody", "alignCenter"] }, { columns: [[{ text: "$", style: "tableBody" }], [{ text: this.currencyFormat(invoiceData.tax), style: ["tableBody", "alignRight"] }]] }],
              [{ text: "", border: [false, false, false, false] }, { text: "IDC Deductions", style: ["tableBody", "alignRight"], border: [false, false, false, false] }, { text: "Deduction %", style: ["tableBody", "alignCenter"] }, { columns: [[{ text: "", style: "tableBody" }], [{ text: "", style: ["tableBody", "alignRight"] }]] }],
              [{ text: "", border: [false, false, false, false] }, { text: "", border: [false, false, false, false] }, { text: "TOTAL", style: ["tableSubHeader", "alignRight"], border: [false, false, false, false] }, { columns: [[{ text: "$", style: "tableBody" }], [{ text: this.currencyFormat(totalRate), style: ["tableBody", "alignRight"] }]] }]
            ]
          },
        },
        {
          margin: [0, 10, 0, 10],
          table: {
            widths: ['auto', "auto", '*'],
            body: [
              [{ text: "Comments", style: "tableSubHeader" }, { text: "Business Number (GST/HST) #", style: "tableBody" }, ""],
            ]
          },
          layout: "noBorders"
        },
        {
          margin: [0, 10, 0, 10],
          fillColor: '#fde9d9',
          table: {
            heights: 60,
            widths: ["auto", "*"],
            body: [
              [{ text: "For Office Use Only", style: "tableSubHeader", border: [true, true, false, false] }, { text: "", border: [false, true, true, false] }],
              [{ text: "", border: [true, false, false, true] }, { text: "", border: [false, false, true, true] }],
            ]
          }
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          fontSize: 12
        },
        tableHeader: {
          fontSize: 10,
          bold: true,
          alignment: "center"
        },
        tableSubHeader: {
          fontSize: 10,
          bold: true,
          // decoration: "underline",
        },
        tableBody: {
          fontSize: 10
        },
        alignRight: {
          alignment: "right"
        },
        alignCenter: {
          alignment: "center"
        }
      }
    }

    this.pdfMake.createPdf(def).open();
  }
}
