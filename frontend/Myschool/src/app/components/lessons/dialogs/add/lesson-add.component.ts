import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {LessonService} from "../../../../service/lesson/lesson.service";
import {TeacherService} from "../../../../service/teacher/teacher.service";
import {ClassroomService} from "../../../../service/classroom/classroom.service";
import {ClazzService} from "../../../../service/clazz/clazz.service";
import {SubjectService} from "../../../../service/subject/subject.service";

export interface LessonData {
  href: string;
  topic: string;
  date: Date;
  lessonUnit: string
  classroom: any,
  clazz: any,
  subject: any,
  teacher: any
}

export interface LessonUnit {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'lesson-add-dialog',
  templateUrl: './lesson-add-dialog.html',
})
export class LessonAddDialog {

  errorMsg: string;
  error = false;
  teachers: any[];
  classrooms: any[];
  clazzes: any[];
  subjects: any[];

  constructor(
    public dialogRef: MatDialogRef<LessonAddDialog>,
    @Inject(MAT_DIALOG_DATA) public lessonData: LessonData,
    private lessonService: LessonService,
    private teacherService: TeacherService,
    private classroomService: ClassroomService,
    private clazzService: ClazzService,
    private subjectService: SubjectService) {

    teacherService.getAll().subscribe(data => {
      this.teachers = data._embedded.teachers;
    });

    classroomService.getAll().subscribe(data => {
      this.classrooms = data._embedded.classrooms;
    });

    clazzService.getAll().subscribe(data => {
      this.clazzes = data._embedded.clazzes;
    });

    subjectService.getAll().subscribe(data => {
      this.subjects = data._embedded.subjects;
    });

  }

  lessonUnits: LessonUnit[] = [
    {value: '1', viewValue: '8:00 - 8:45'},
    {value: '2', viewValue: '9:00 - 9:45'},
    {value: '3', viewValue: '10:00 - 10:45'},
    {value: '4', viewValue: '11:00 - 11:45'},
    {value: '5', viewValue: '12:00 - 12:45'},
    {value: '6', viewValue: '13:00 - 13:45'},
  ];

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
    } else if (this.lessonData.teacher == '') {
      this.error = true;
      this.errorMsg = 'provide a teacher';
      return false;
    } else if (this.lessonData.classroom == '') {
      this.error = true;
      this.errorMsg = 'provide a classroom';
      return false;
    } else if (this.lessonData.clazz == '') {
      this.error = true;
      this.errorMsg = 'provide a class';
      return false;
    } else if (this.lessonData.subject == '') {
      this.error = true;
      this.errorMsg = 'provide a subject';
      return false;
    } else return true;
  }


  saveLesson() {
    console.log("SAVING: ", this.lessonData)
    let date = this.lessonData.date;
    this.lessonService.save({
      href: this.lessonData.href,
      topic: this.lessonData.topic.trim(),
      date: (date.getMonth() + 1).toString() + '/' + (date.getDate() + 1).toString() + '/' + date.getFullYear(),
      lessonUnit: this.lessonData.lessonUnit
    }).subscribe(result => {
      this.lessonService.putTeacher(result._links.self.href, this.lessonData.teacher).subscribe(res => {
        this.lessonService.putClassroom(result._links.self.href, this.lessonData.classroom).subscribe(res => {
          this.lessonService.putClazz(result._links.self.href, this.lessonData.clazz).subscribe(res => {
            this.lessonService.putSubject(result._links.self.href, this.lessonData.subject).subscribe(res => this.dialogRef.close(), err => console.log(err));
          }, err => console.log(err));
        }, err => console.log(err));
      }, err => console.log(err));
    }, error => {
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
