import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TeacherService} from "../../../../service/teacher/teacher.service";
import {ValidationService} from "../../../../service/validation/validation.service";

export interface TeacherData {
  href: string;
  name: string;
  surname: string;
  dateOfEmployment: Date;
  salary: number;
}

@Component({
  selector: 'teacher-add-dialog',
  templateUrl: './teacher-add-dialog.html',
})
export class TeacherAddDialog {

  errorMsg: string;
  error = false;

  constructor(
    public dialogRef: MatDialogRef<TeacherAddDialog>,
    @Inject(MAT_DIALOG_DATA) public teacherData: TeacherData,
    private teacherService: TeacherService,
    private validationService: ValidationService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  validationSuccessful() {
    if (this.teacherData.name.match(/^\s*$/)) {
      this.error = true;
      this.errorMsg = 'teacher name may not be empty';
      return false;
    } else if (this.teacherData.surname.match(/^\s*$/)) {
      this.error = true;
      this.errorMsg = 'teacher surname may not be empty';
      return false;
    } else if (!this.validationService.isNumber(this.teacherData.salary)) {
      this.error = true;
      this.errorMsg = 'salary must be a positive number';
    } else if(this.teacherData.dateOfEmployment == null){
      this.error = true;
      this.errorMsg = 'provide a date';
      return false;
    } else return true;
  }


  saveTeacher() {
    let date = this.teacherData.dateOfEmployment;
    this.teacherService.save({
      href: this.teacherData.href,
      name: this.teacherData.name.trim(),
      surname: this.teacherData.surname.trim(),
      dateOfEmployment: (date.getMonth() + 1).toString() + '/' + (date.getDate() + 1).toString() + '/' + date.getFullYear(),
      salary: this.teacherData.salary
    }).subscribe(result => {
      this.dialogRef.close();
    }, error => {
      this.error = true;
      this.errorMsg = 'Error occurred';
    });
  }

  addTeacher() {
    this.error = false;
    if (this.validationSuccessful()) {
      this.saveTeacher()
    }
  }
}
