import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimePipe'
})
export class DateTimePipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return (value.getMonth() + 1).toString() + '/' + (value.getDate() + 1).toString() + '/' + value.getFullYear() + ',' + value.getHours() + ':' + value.getMinutes();
  }

}
