import { Injectable } from '@angular/core';
// import { Workbook, Row } from 'exceljs';
import * as Excel from "exceljs/dist/exceljs.min.js";
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  title = 'Firbid Report';
  data:any;

  constructor(
  ) { 
    
  }

  addWorksheet(dataRecieved,header,titleFile:String) {
    this.data = dataRecieved;

    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet(titleFile);

    //Add Header Row
    let headerRow = worksheet.addRow(header);

    headerRow.font = {color: { argb: '9768FF'} , size: 9 , bold : true };
    headerRow.height = 30;

    headerRow.eachCell((cell, number) => {
      cell.alignment = { vertical : 'middle', horizontal : 'center' , wrapText: true }
    });
    // Add Data and Conditional Formatting
    this.data.forEach(d => {
      let row = worksheet.addRow(d);
      row.font = {color: { argb: '4f81bd' }, size: 10 };
 
    });

    for (let i = 0; i < worksheet.columns.length; i += 1) { 
      let dataMax = 0;
      const column = worksheet.columns[i];
      for (let j = 1; j < column.values.length; j += 1) {
        const columnLength = column.values[j].length;
        if (columnLength > dataMax) {
          dataMax = columnLength;
        }
      }
      column.width = dataMax < 10 ? 10 : dataMax;
    }

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'IntAppReporte.xlsx');
    });
  }

}
