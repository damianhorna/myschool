import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TeacherService} from "../../service/teacher/teacher.service";
import {ClazzAddDialog} from "../classes/dialogs/add/clazz-add.component";
import {ClazzService} from "../../service/clazz/clazz.service";
import {HttpClient} from "@angular/common/http";

export interface PeriodicElement {
  href: string;
  name: string;
  teacher: any[];
}

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['name', 'class teacher', 'actions'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dropdownSettings = {
    singleSelection: true,
    idField: 'displayName',
    textField: 'displayName',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    enableCheckAll: false
  };

  allTeachers: any[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  clazzes: Array<any>;

  constructor(private clazzService: ClazzService,
              public dialog: MatDialog,
              private teacherService: TeacherService,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.initialize();
  }

  showStudents(clazz) {
    console.log(clazz)
  }

  initialize() {
    this.clazzService.getAll().subscribe(data => {
      this.clazzes = data._embedded.clazzes;
      this.ELEMENT_DATA = [];
      this.getTeachersForClasses();
    });

    this.teacherService.getAll().subscribe(data => {
      this.allTeachers = [];
      for (let teacher of data._embedded.teachers) {
        this.allTeachers.push({...teacher, displayName: teacher.name + ' ' + teacher.surname})
      }
    }, err => console.log(err));
  }

  editTeacher(clazz) {
    for (let teacher of this.allTeachers) {
      if (teacher.displayName === clazz.teacher[0]) {
        this.clazzService.putTeacher(clazz, teacher._links.self.href).subscribe();
      }
    }
  }

  deleteTeacher(clazz){
    this.clazzService.deleteTeacher(clazz).subscribe();
  }

  getTeachersForClasses() {
    for (let i in this.clazzes) {
      this.http.get(this.clazzes[i]._links.teacher.href).subscribe(resp => {
        let res : any;
        res = resp;
        this.ELEMENT_DATA.push({
          name: this.clazzes[i].name,
          href: this.clazzes[i]._links.self.href,
          teacher: [{...res, displayName: res.name + ' ' + res.surname}],
        });
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, err => {
        //teacher has not been set yet
        this.ELEMENT_DATA.push({
          name: this.clazzes[i].name,
          href: this.clazzes[i]._links.self.href,
          teacher: [],
        });
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  delete(href) {
    this.clazzService.remove(href).subscribe(res => this.initialize());
  }

  openDialog(href, name): void {
    const dialogRef = this.dialog.open(ClazzAddDialog, {
      data: {
        href: href,
        name: name,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.initialize()
    });
  }
}
