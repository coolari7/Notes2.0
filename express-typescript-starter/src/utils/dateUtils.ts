// eslint-disable-next-line import/prefer-default-export
export class ModDate {
  private monthsWith30Days: number[] = [3, 5, 8, 10];
  private monthsWith31Days: number[] = [0, 2, 4, 6, 7, 9, 11];
  private dateObj: Date;
  private year: number;
  private month: number;

  constructor(date = new Date()) {
    this.dateObj = date;
    this.year = this.dateObj.getFullYear();
    this.month = this.dateObj.getMonth();
  }

  public getDate(): Date {
    return this.dateObj;
  }

  public getFirstDateOfTheMonth(): Date {
    return new Date(this.year, this.month, 1);
  }

  public getLastDateOfTheMonth(): Date {
    return new Date(this.year, this.month, this.getDaysInThisMonth());
  }

  public getFirstDateOfNextMonth(): Date {
    return new Date(this.year, this.month + 1, 1);
  }

  public getDaysInThisMonth(): number {
    let output: number = 0;
    if (this.monthsWith30Days.includes(this.month)) {
      output = 30;
    } else if (this.monthsWith31Days.includes(this.month)) {
      output = 31;
    } else if (this.isLeapYear()) {
      output = 29;
    } else {
      output = 28;
    }
    return output;
  }

  public isLeapYear(): boolean {
    return this.year % 400 === 0 || this.year % 4 === 0;
  }
}
