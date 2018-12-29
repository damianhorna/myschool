import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lessonUnitPipe'
})
export class LessonUnitPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    switch(value){
      case 1:
        return '8:00 - 8:45';
      case 2:
        return '9:00 - 9:45';
      case 3:
        return '10:00 - 10:45';
      case 4:
        return '11:00 - 11:45';
      case 5:
        return '12:00 - 12:45';
      case 6:
        return '13:00 - 13:45';
    }
  }

}
