import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DateTimeUtilityService {

  constructor(private _datePipe : DatePipe) { }

  public buildDateString(pDateStruct : NgbDateStruct, pTimeStruct : any) : string {
      let year : string = `0${pDateStruct.year}`.slice(-4);
      let month : string = `0${pDateStruct.month}`.slice(-2);
      let day : string = `0${pDateStruct.day}`.slice(-2);
      let hour : string = `0${pTimeStruct.hour}`.slice(-2);
      let minute : string = `0${pTimeStruct.minute}`.slice(-2);
      return `${ year }-${ month }-${day}T${hour}:${minute}:00` + 'Z';
  }

  public getDateStruct(pDateObject) {
      let dateString = this._datePipe.transform(pDateObject, 'yyyy-MM-dd');
      let dateStruct = this.buildDateStruct(dateString);
      return dateStruct;
  }

  public getTimeStruct(pTimeObject) {
      let timeString = this._datePipe.transform(pTimeObject, 'HH:mm');
      let timeStruct = this.buildTimeStruct(timeString);
      return timeStruct;
  }

  public buildDateStruct(pDateString : string) : NgbDateStruct {
      let dateArray : string[] = pDateString.split('-');
      let dateStruct : NgbDateStruct =
      { year:  Number(dateArray[0]), month: Number(dateArray[1]), day: Number(dateArray[2])};
      return dateStruct;
  }

  public buildTimeStruct(pTimeString : string) {
      let timeArray : string[] = pTimeString.split(':');
      let timeStruct =
      { hour:  Number(timeArray[0]), minute: Number(timeArray[1])};
      return timeStruct;
  }
}
