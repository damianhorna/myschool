import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ClassroomService} from "../../../../service/classroom/classroom.service";
import {ValidationService} from "../../../../service/validation/validation.service";

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
  negativeNumberOfSeatsError = false;

  constructor(
    public dialogRef: MatDialogRef<ClassroomAddDialog>,
    @Inject(MAT_DIALOG_DATA) public classroomData: ClassroomData,
    private classroomService: ClassroomService,
    private validationService: ValidationService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  validationSuccessful() {
    if (!this.validationService.isNumber(this.classroomData.number)) {
      this.error = true;
      this.errorMsg = "Not a valid number";
      return false;
    }
    if (this.classroomData.numberOfSeats < 0 ||
      !this.validationService.isNumber(this.classroomData.numberOfSeats)) {
      this.negativeNumberOfSeatsError = true;
      this.errorMsg = "Number of seats must be a positive number!";
      return false;
    }
    return true;
  }

  addClassroom() {
    this.error = false;
    if (this.validationSuccessful()) {
      this.saveClassroom();
    }
  }

  saveClassroom() {
    this.classroomService
      .save(this.classroomData)
      .subscribe(result => this.dialogRef.close(),
        error => this.handleError(error));
  }

  handleError(error) {
    this.error = true;
    this.errorMsg = 'classroom with given number already exists';
  }
}
