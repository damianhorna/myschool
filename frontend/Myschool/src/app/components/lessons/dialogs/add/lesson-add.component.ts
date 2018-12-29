import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {LessonService} from "../../../../service/lesson/lesson.service";

export interface LessonData {
  href: string;
  topic: string;
  date: Date;
}

@Component({
  selector: 'lesson-add-dialog',
  templateUrl: './lesson-add-dialog.html',
})
export class LessonAddDialog {

  errorMsg: string;
  error = false;

  constructor(
    public dialogRef: MatDialogRef<LessonAddDialog>,
    @Inject(MAT_DIALOG_DATA) public lessonData: LessonData,
    private lessonService: LessonService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  validationSuccessful() {
    if (this.lessonData.topic.match(/^\s*$/)) {
      this.error = true;
      this.errorMsg = 'topic may not be empty';
      return false;
    } else if (this.lessonData.date == null) {
      this.error = true;
      this.errorMsg = 'provide a date';
      return false;
    } else return true;
  }


  saveLesson() {
    let date = this.lessonData.date;
    this.lessonService.save({
      href: this.lessonData.href,
      topic: this.lessonData.topic.trim(),
      date: (date.getMonth() + 1).toString() + '/' + (date.getDate() + 1).toString() + '/' + date.getFullYear(),
    }).subscribe(result => {
      this.dialogRef.close();
    }, error => {
      console.log(error);
      this.error = true;
      this.errorMsg = 'Error occurred';
    });
  }

  addTeacher() {
    this.error = false;
    if (this.validationSuccessful()) {
      this.saveLesson()
    }
  }
}
