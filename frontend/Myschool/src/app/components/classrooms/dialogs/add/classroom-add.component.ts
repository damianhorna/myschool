import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ClassroomService} from "../../../../service/classroom/classroom.service";

export interface ClassroomData {
  number: number;
  href: string;
  numberOfSeats: number
}

@Component({
  selector: 'classroom-add-dialog',
  templateUrl: './classroom-add-dialog.html',
})
export class ClassroomAddDialog {

  errorMsg: string;
  error = false;

  constructor(
    public dialogRef: MatDialogRef<ClassroomAddDialog>,
    @Inject(MAT_DIALOG_DATA) public classroomData: ClassroomData,
    private classroomService: ClassroomService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addClassroom() {
    this.error = false;
    this.classroomService.save({
      number: this.classroomData.number,
      href: this.classroomData.href,
      numberOfSeats: this.classroomData.numberOfSeats
    }).subscribe(result => {
      this.dialogRef.close();
    }, error => {
      this.error = true;
      this.errorMsg = 'classroom with given number already exists';
      console.log(error)
    });
  }

}
