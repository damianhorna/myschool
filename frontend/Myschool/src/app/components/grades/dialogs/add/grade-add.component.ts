import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {LessonService} from "../../../../service/lesson/lesson.service";
import {GradeService} from "../../../../service/grade/grade.service";
import {HttpClient} from "@angular/common/http";
import {StudentService} from "../../../../service/student/student.service";
import {TestService} from "../../../../service/test/test.service";

export interface GradeData {
  href: string;
  description: string;
  value: string;
  lesson: any;
  student: any;
  teacher: any;
  test: any;
  subject: any;
  classroom: any;
}

@Component({
  selector: 'grade-add-dialog',
  templateUrl: './grade-add-dialog.html',
})
export class GradeAddDialog {

  errorMsg: string;
  error = false;
  lessons: any[];
  grades = ["1", "2", "3", "4", "5"];
  students: any[];
  tests: any[];

  constructor(
    public dialogRef: MatDialogRef<GradeAddDialog>,
    @Inject(MAT_DIALOG_DATA) public gradeData: GradeData,
    private lessonService: LessonService,
    private gradeService: GradeService,
    private http: HttpClient,
    private studentService: StudentService,
    private testService: TestService) {
    console.log('gradedata', gradeData)
    lessonService.getAll().subscribe(data => {
      this.lessons = [];
      for (let lesson of data._embedded.lessons) {
        this.http.get(lesson._links.subject.href).subscribe(subject => {
          this.http.get(lesson._links.classroom.href).subscribe(classroom => {
            let anySubject: any = subject;
            let anyClassroom: any = classroom;

            this.lessons.push({
              ...lesson,
              displayValue: anySubject.name + ' (' + lesson.date + ', u. ' + lesson.lessonUnit + ', c. ' + anyClassroom.number.toString() + ')'
            })
          }, err => console.log(err));
        }, err => console.log(err));
      }
    });

    this.http.get(this.gradeData.lesson + '/clazz').subscribe(res => {
      let clazz: any = res;
      this.http.get(clazz._links.students.href).subscribe(res => {
        let st: any = res;
        this.students = st._embedded.students;
      }, err => console.log(err));
    }, err => console.log(err));

    testService.getAll().subscribe(res => {
      this.tests = res._embedded.tests;
    }, err => console.log(err));

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateStudents(event) {
    this.http.get(event.value + '/clazz').subscribe(res => {
      let clazz: any = res;
      this.http.get(clazz._links.students.href).subscribe(res => {
        let st: any = res;
        this.students = st._embedded.students;
      }, err => console.log(err));
    }, err => console.log(err));

    this.http.get(event.value + '/teacher').subscribe(res => {
      let teacher: any = res;
      this.gradeData.teacher = teacher;
    }, err => console.log(err));
  }

  validationSuccessful() {
    if (this.gradeData.description.match(/^\s*$/)) {
      this.error = true;
      this.errorMsg = 'topic may not be empty';
      return false;
    } else return true;
  }

  saveGrade() {
    console.log("SAVING:", this.gradeData);
    this.gradeService
      .save(this.gradeData)
      .subscribe(result => {
        this.gradeData.href = result._links.self.href;
          this.gradeService.putLesson(this.gradeData.href, this.gradeData.lesson).subscribe(res => {
            this.gradeService.putTeacher(this.gradeData.href, this.gradeData.teacher._links.self.href).subscribe(res => {
              this.gradeService.putStudent(this.gradeData.href, this.gradeData.student).subscribe(res => {
                this.gradeService.putTest(this.gradeData.href, this.gradeData.test).subscribe(res => this.dialogRef.close(),
                  err => console.log(err))
              }, err => console.log(err));
            }, err => console.log(err));
          }, err => console.log(err));
        },
        error => {
          this.error = true;
          this.errorMsg = 'error occurred'
        });
  }

  addTeacher() {
    this.error = false;
    if (this.validationSuccessful()) {
      this.saveGrade()
    }
  }
}
