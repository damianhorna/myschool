import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'concatenateSubjects'})
export class SubjectsPipe implements PipeTransform {
  transform(subjects: any[]): string {
    let res = '';
    for (let s of subjects) {
      if (subjects.indexOf(s) == subjects.length - 1) {
        res += s.name;
      } else {
        res += s.name + ', '
      }
    }
    return res
  }
}
