import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TeacherService} from "../../service/teacher/teacher.service";
import {ClazzAddDialog} from "../classes/dialogs/add/clazz-add.component";
import {ClazzService} from "../../service/clazz/clazz.service";
import {HttpClient} from "@angular/common/http";
import {NavigationService} from "../../service/navigation/navigation.service";

export interface PeriodicElement {
  href: string;
  name: string;
  teacher: any;
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

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  clazzes: Array<any>;

  constructor(private clazzService: ClazzService,
              public dialog: MatDialog,
              private teacherService: TeacherService,
              private http: HttpClient,
              private navigationService : NavigationService) {
  }

  ngOnInit() {
    this.initialize();
  }

  showStudents(clazz) {
    this.navigationService.activateScreen(9, clazz);
  }

  initialize() {
    this.clazzService.getAll().subscribe(data => {
      this.clazzes = data._embedded.clazzes;
      this.ELEMENT_DATA = [];
      for (let i in this.clazzes) {
        this.http.get(this.clazzes[i]._links.teacher.href).subscribe(resp => {
          let res: any;
          res = resp;
          this.ELEMENT_DATA.push({
            name: this.clazzes[i].name,
            href: this.clazzes[i]._links.self.href,
            teacher: res,
          });
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
      }
    });
  }

  delete(href) {
    this.clazzService.remove(href).subscribe(res => this.initialize());
  }

  openDialog(href, name, teacher): void {
    const dialogRef = this.dialog.open(ClazzAddDialog, {
      width: '250px',
      data: {
        href: href,
        name: name,
        teacher: teacher
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.initialize()
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate =
      (data: PeriodicElement, filter: string) => data.name.toLowerCase().includes(filter)
        || data.teacher.name.toLowerCase().includes(filter)
        || data.teacher.surname.toLowerCase().includes(filter)
        || (data.teacher.name.toLowerCase() + ' ' + data.teacher.surname.toLowerCase()).includes(filter);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
