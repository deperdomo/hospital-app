import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MesesService {

  months: { monthName: string, monthNumber: number }[] = [
    { monthName: 'Enero', monthNumber: 0 },
    { monthName: 'Febrero', monthNumber: 1 },
    { monthName: 'Marzo', monthNumber: 2 },
    { monthName: 'Abril', monthNumber: 3 },
    { monthName: 'Mayo', monthNumber: 4 },
    { monthName: 'Junio', monthNumber: 5 },
    { monthName: 'Julio', monthNumber: 6 },
    { monthName: 'Agosto', monthNumber: 7 },
    { monthName: 'Septiembre', monthNumber: 8 },
    { monthName: 'Octubre', monthNumber: 9 },
    { monthName: 'Noviembre', monthNumber: 10 },
    { monthName: 'Diciembre', monthNumber: 11 }
  ];

  constructor() { }

  getMonths() {
    return this.months;
  }

  getMonthByIndex(index: number) {
    return this.months.find(month => month.monthNumber === index);
  }
}
