import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TeacherAddDialog} from "../teachers/dialogs/add/teacher-add.component";
import {ClazzService} from "../../service/clazz/clazz.service";
import {StudentService} from "../../service/student/student.service";
import {HttpClient} from "@angular/common/http";
import {StudentAddDialog} from "./dialogs/add/student-add.component";

export interface PeriodicElement {
  href: string;
  name: string;
  surname: string;
  dateOfBirth: string;
  clazz: any[];
}


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {


  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['name', 'surname', 'dateOfBirth', 'clazz', 'actions'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dropdownSettings = {
    singleSelection: true,
    idField: 'name',
    textField: 'name',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    enableCheckAll: false
  };
  allClazzes: any[];
  students: any[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private studentService: StudentService,
              private clazzService: ClazzService,
              public dialog: MatDialog,
              private http: HttpClient) {
  }

  editClazz(student) {
    for (let clazz of this.allClazzes) {
      if (clazz.name === student.clazz[0]) {
        this.studentService.putClazz(student, clazz._links.self.href).subscribe(res => console.log(res), err => console.log(err));
      }
    }
  }

  deleteClazz(student) {
    this.studentService.deleteClazz(student).subscribe();
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.clazzService.getAll().subscribe(data => {
      this.allClazzes = data._embedded.clazzes;
    });

    this.studentService.getAll().subscribe(data => {
      this.students = data._embedded.students;
      this.ELEMENT_DATA = [];
      for (let i in this.students) {
        this.ELEMENT_DATA.push({
          href: this.students[i]._links.self.href,
          name: this.students[i].name,
          surname: this.students[i].surname,
          dateOfBirth: this.students[i].dateOfBirth,
          clazz: []
        });
        this.http.get(this.students[i]._links.clazz.href).subscribe(data => {
          let res : any;
          res = data;
          this.ELEMENT_DATA[i].clazz = [res];
        }, err => {

        });
      }
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(href) {
    this.studentService.remove(href).subscribe(result => {
      this.initialize()
    }, error => console.error(error));
  }

  openDialog(href, name, surname, dateOfBirth): void {
    const dialogRef = this.dialog.open(StudentAddDialog, {
      width: '250px',
      data: {
        href: href,
        name: name,
        surname: surname,
        dateOfBirth: new Date(dateOfBirth),
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.initialize()
    });
  }

}
