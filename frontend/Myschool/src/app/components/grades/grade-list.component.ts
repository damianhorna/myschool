import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {StudentService} from "../../service/student/student.service";
import {ClazzService} from "../../service/clazz/clazz.service";
import {LessonService} from "../../service/lesson/lesson.service";
import {ClassroomService} from "../../service/classroom/classroom.service";
import {SubjectService} from "../../service/subject/subject.service";
import {TeacherService} from "../../service/teacher/teacher.service";
import {HttpClient} from "@angular/common/http";
import {NavigationService} from "../../service/navigation/navigation.service";
import {GradeService} from "../../service/grade/grade.service";
import {GradeAddDialog} from "./dialogs/add/grade-add.component";

export interface PeriodicElement {
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
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.css']
})
export class GradeListComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['description', 'value', 'lesson', 'student', 'teacher', 'test', 'actions'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  grades: any[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private studentService: StudentService,
              private clazzService: ClazzService,
              private lessonService: LessonService,
              private classroomService: ClassroomService,
              private subjectService: SubjectService,
              private teacherService: TeacherService,
              public dialog: MatDialog,
              private http: HttpClient,
              private navigationService: NavigationService,
              private gradeService: GradeService) {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.gradeService.getAll().subscribe(data => {
      this.grades = data._embedded.grades;
      this.ELEMENT_DATA = [];
      for (let i in this.grades) {
        this.ELEMENT_DATA.push({
          href: this.grades[i]._links.self.href,
          description: this.grades[i].description,
          value: this.grades[i].value.toString(),
          lesson: '',
          student: '',
          teacher: '',
          test: '',
          subject: '',
          classroom: ''
        });
        this.setProps(i)
      }


      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'lesson':
            return item.lesson.date;
          case 'student':
            return item.student.name + ' ' + item.student.surname;
          case 'teacher':
            return item.teacher.name + ' ' + item.teacher.surname;
          case 'test':
            return item.test.type;
          default:
            return item[property];
        }
      };
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  setProps(i) {
    this.http.get(this.grades[i]._links.lesson.href).subscribe(data => {
      let res: any;
      res = data;
      this.ELEMENT_DATA[i].lesson = res;
      this.setLessonUnit(res.lessonUnit, i);

      this.http.get(this.ELEMENT_DATA[i].lesson._links.subject.href).subscribe(data => {
        let res: any;
        res = data;
        this.ELEMENT_DATA[i].subject = res;
      }, err => {

      });

      this.http.get(this.ELEMENT_DATA[i].lesson._links.classroom.href).subscribe(data => {
        let res: any;
        res = data;
        this.ELEMENT_DATA[i].classroom = res;
      }, err => {

      });

    }, err => {

    });
    this.http.get(this.grades[i]._links.teacher.href).subscribe(data => {
      let res: any;
      res = data;
      this.ELEMENT_DATA[i].teacher = res;
    }, err => {

    });
    this.http.get(this.grades[i]._links.student.href).subscribe(data => {
      let res: any;
      res = data;
      this.ELEMENT_DATA[i].student = res;
    }, err => {

    });
    this.http.get(this.grades[i]._links.test.href).subscribe(data => {
      let res: any;
      res = data;
      this.ELEMENT_DATA[i].test = res;
    }, err => {

    });


  }

  setLessonUnit(lessonUnit, i) {
    switch (lessonUnit) {
      case 1:
        this.ELEMENT_DATA[i].lesson.lessonUnit = '8:00 - 9:45';
        break;
      case 2:
        this.ELEMENT_DATA[i].lesson.lessonUnit = '9:00 - 9:45';
        break;
      case 3:
        this.ELEMENT_DATA[i].lesson.lessonUnit = '10:00 - 10:45';
        break;
      case 4:
        this.ELEMENT_DATA[i].lesson.lessonUnit = '11:00 - 11:45';
        break;
      case 5:
        this.ELEMENT_DATA[i].lesson.lessonUnit = '12:00 - 12:45';
        break;
      case 6:
        this.ELEMENT_DATA[i].lesson.lessonUnit = '13:00 - 13:45';
        break;
      case 7:
        this.ELEMENT_DATA[i].lesson.lessonUnit = '14:00 - 14:45';
        break;
    }
  }

  delete(href) {
    this.gradeService.remove(href).subscribe(result => {
      this.initialize()
    }, err => {
      alert("Constraint violation exception. ")
    });
  }

  openDialog(gradeData): void {
    console.log(gradeData);
    const dialogRef = this.dialog.open(GradeAddDialog, {
      width: '300px',
      data: {
        ...gradeData,
        student: gradeData.student ? gradeData.student._links.self.href : '',
        lesson: gradeData.lesson ? gradeData.lesson._links.self.href : '',
        test: gradeData.test ? gradeData.test._links.self.href: ''
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.initialize()
    });
  }

  showPresentStudents(lesson) {
    this.navigationService.activateScreen(11, lesson);
  }

  showGivenGrades(lesson) {
    this.navigationService.activateScreen(12, lesson);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate =
      (data: PeriodicElement, filter: string) => data.description.toLowerCase().includes(filter)
        || (data.student.name + ' ' + data.student.surname).toLowerCase().includes(filter)
        || (data.teacher.name + ' ' + data.teacher.surname).toLowerCase().includes(filter)
        || data.test.type.toLowerCase().includes(filter)
        || data.value.includes(filter)
        || data.subject.name + ' (' + data.lesson.date + ', ' + data.lesson.lessonUnit + ', classroom ' + data.classroom.number + ')';
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
