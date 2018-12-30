import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  render: boolean[] = [
    true, //welcome
    false, //subjects
    false, //classrooms
    false, //classes
    false, //teachers
    false, //students
    false, //lessons
    false, //grades
    false, //tests
    false, //class members
    false, //absences
    false, //present students
    false  //grades
  ];

  constructor() {
  }

  activateScreen(screenNumber, theObject? : any) {
    for (let i = 0; i < this.render.length; i++) {
      this.render[i] = false;
    }
    this.render[screenNumber] = true;
  }
}
