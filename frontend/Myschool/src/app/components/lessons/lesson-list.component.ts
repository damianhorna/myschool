import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {StudentService} from "../../service/student/student.service";
import {ClazzService} from "../../service/clazz/clazz.service";
import {HttpClient} from "@angular/common/http";
import {LessonService} from "../../service/lesson/lesson.service";
import {ClassroomService} from "../../service/classroom/classroom.service";
import {SubjectService} from "../../service/subject/subject.service";
import {TeacherService} from "../../service/teacher/teacher.service";
import {LessonAddDialog} from "./dialogs/add/lesson-add.component";

export interface PeriodicElement {
  href: string;
  date: Date;
  topic: string;
  classroom: any[];
  clazz: any[];
  subject: any[];
  teacher: any[]
}

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit {


  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['date', 'topic', 'classroom', 'clazz', 'subject', 'teacher', 'actions'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dropdownClazzSettings = {
    singleSelection: true,
    idField: 'name',
    textField: 'name',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    enableCheckAll: false
  };
  dropdownClassroomSettings = {
    singleSelection: true,
    idField: 'number',
    textField: 'number',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    enableCheckAll: false
  };
  dropdownSubjectSettings = {
    singleSelection: true,
    idField: 'name',
    textField: 'name',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    enableCheckAll: false
  };
  dropdownTeacherSettings = {
    singleSelection: true,
    idField: 'displayName',
    textField: 'displayName',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    enableCheckAll: false
  };

  allClazzes: any[];
  allClassrooms: any[];
  allTeachers: any[];
  allSubjects: any[];
  lessons: any[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private studentService: StudentService,
              private clazzService: ClazzService,
              private lessonService: LessonService,
              private classroomService: ClassroomService,
              private subjectService: SubjectService,
              private teacherService: TeacherService,
              public dialog: MatDialog,
              private http: HttpClient) {
  }

  editClazz(lesson) {
    for (let clazz of this.allClazzes) {
      if (clazz.name === lesson.clazz[0]) {
        this.lessonService.putClazz(lesson, clazz._links.self.href).subscribe(res => console.log(res), err => console.log(err));
      }
    }
  }

  deleteClazz(lesson) {
    this.lessonService.deleteClazz(lesson).subscribe();
  }

  editClassroom(lesson) {
    for (let classroom of this.allClassrooms) {
      if (classroom.number === lesson.classroom[0]) {
        this.lessonService.putClassroom(lesson, classroom._links.self.href).subscribe(res => console.log(res), err => console.log(err));
      }
    }
  }

  deleteClassroom(lesson) {
    this.lessonService.deleteClassroom(lesson).subscribe();
  }

  editSubject(lesson) {
    for (let subject of this.allSubjects) {
      if (subject.name === lesson.subject[0]) {
        this.lessonService.putSubject(lesson, subject._links.self.href).subscribe(res => console.log(res), err => console.log(err));
      }
    }
  }

  deleteSubject(lesson) {
    this.lessonService.deleteSubject(lesson).subscribe();
  }

  editTeacher(lesson) {
    for (let teacher of this.allTeachers) {
      if (teacher.displayName === lesson.teacher[0]) {
        this.lessonService.putTeacher(lesson, teacher._links.self.href).subscribe(res => console.log(res), err => console.log(err));
      }
    }
  }

  deleteTeacher(lesson) {
    this.lessonService.deleteTeacher(lesson).subscribe();
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.clazzService.getAll().subscribe(data => {
      this.allClazzes = data._embedded.clazzes;
    });

    this.teacherService.getAll().subscribe(data => {
      this.allTeachers = [];
      for (let t of data._embedded.teachers) {
        this.allTeachers.push({...t, displayName: t.name + ' ' + t.surname});
      }
    });

    this.subjectService.getAll().subscribe(data => {
      this.allSubjects = data._embedded.subjects;
    });

    this.classroomService.getAll().subscribe(data => {
      this.allClassrooms = data._embedded.classrooms;
    });

    this.lessonService.getAll().subscribe(data => {
      this.lessons = data._embedded.lessons;
      this.ELEMENT_DATA = [];
      for (let i in this.lessons) {
        this.ELEMENT_DATA.push({
          href: this.lessons[i]._links.self.href,
          date: new Date(this.lessons[i].date),
          topic: this.lessons[i].topic,
          clazz: [],
          classroom: [],
          subject: [],
          teacher: []
        });
        this.http.get(this.lessons[i]._links.clazz.href).subscribe(data => {
          let res: any;
          res = data;
          this.ELEMENT_DATA[i].clazz = [res];
        }, err => {

        });
        this.http.get(this.lessons[i]._links.classroom.href).subscribe(data => {
          let res: any;
          res = data;
          this.ELEMENT_DATA[i].classroom = [res];
        }, err => {

        });
        this.http.get(this.lessons[i]._links.subject.href).subscribe(data => {
          let res: any;
          res = data;
          this.ELEMENT_DATA[i].subject = [res];
        }, err => {

        });
        this.http.get(this.lessons[i]._links.teacher.href).subscribe(data => {
          let res: any;
          res = data;
          this.ELEMENT_DATA[i].teacher = [{...res, displayName: res.name + ' ' + res.surname}];
          console.log("ticzer", this.ELEMENT_DATA[i].teacher)
        }, err => {

        });
      }
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(href) {
    this.lessonService.remove(href).subscribe(result => {
      this.initialize()
    }, error => console.error(error));
  }

  openDialog(href, date, topic): void {
    const dialogRef = this.dialog.open(LessonAddDialog, {
      width: '250px',
      data: {
        href: href,
        topic: topic,
        date: date
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.initialize()
    });
  }

}
