import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {StudentService} from "../../../../service/student/student.service";
import {ClazzService} from "../../../../service/clazz/clazz.service";

export interface StudentData {
  href: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  clazz: string
}

@Component({
  selector: 'student-add-dialog',
  templateUrl: './student-add-dialog.html',
})
export class StudentAddDialog {

  errorMsg: string;
  error = false;
  clazzes: any[];

  constructor(
    public dialogRef: MatDialogRef<StudentAddDialog>,
    @Inject(MAT_DIALOG_DATA) public studentData: StudentData,
    private studentService: StudentService,
    private clazzService: ClazzService) {
    clazzService.getAll().subscribe(data => this.clazzes = data._embedded.clazzes)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  validationSuccessful() {
    if (this.studentData.name.match(/^\s*$/)) {
      this.error = true;
      this.errorMsg = 'student name may not be empty';
      return false;
    } else if (this.studentData.surname.match(/^\s*$/)) {
      this.error = true;
      this.errorMsg = 'student surname may not be empty';
      return false;
    } else if (this.studentData.dateOfBirth == null) {
      this.error = true;
      this.errorMsg = 'provide a date';
      return false;
    } else if (this.studentData.clazz == '') {
      this.error = true;
      this.errorMsg = 'choose a class';
      return false;
    } else return true;
  }


  saveStudent() {
    let date = this.studentData.dateOfBirth;
    this.studentService.save({
      href: this.studentData.href,
      name: this.studentData.name.trim(),
      surname: this.studentData.surname.trim(),
      dateOfBirth: (date.getMonth() + 1).toString() + '/' + (date.getDate() + 1).toString() + '/' + date.getFullYear(),
    }).subscribe(result => {
      this.studentService.putClazz(result._links.self.href, this.studentData.clazz).subscribe(res => this.dialogRef.close());
    }, error => {
      console.log(error);
      this.error = true;
      this.errorMsg = 'Error occurred';
    });
  }

  addTeacher() {
    this.error = false;
    if (this.validationSuccessful()) {
      this.saveStudent()
    }
  }
}
