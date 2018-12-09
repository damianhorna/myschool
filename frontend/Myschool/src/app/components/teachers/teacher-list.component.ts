import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TeacherAddDialog} from "./dialogs/add/teacher-add.component";
import {TeacherService} from "../../service/teacher/teacher.service";

export interface PeriodicElement {
  href: string;
  name: string;
  surname: string;
  dateOfEmployment: string;
  salary: number;
}

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['name', 'surname', 'dateOfEmployment', 'salary', 'actions'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  teachers: Array<any>;

  constructor(private teacherService: TeacherService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.teacherService.getAll().subscribe(data => {
      this.teachers = data._embedded.teachers;
      this.ELEMENT_DATA = [];
      for (let i in this.teachers) {
        this.ELEMENT_DATA.push({
          name: this.teachers[i].name,
          href: this.teachers[i]._links.self.href,
          surname: this.teachers[i].surname,
          salary: this.teachers[i].salary,
          dateOfEmployment: this.teachers[i].dateOfEmployment
        });
      }
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(href) {
    this.teacherService.remove(href).subscribe(result => {
      this.initialize()
    }, error => console.error(error));
  }

  openDialog(href, name, surname, dateOfEmployment, salary): void {
    const dialogRef = this.dialog.open(TeacherAddDialog, {
      width: '250px',
      data: {href: href, name: name, surname: surname, dateOfEmployment: new Date(dateOfEmployment), salary: salary}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initialize()
    });
  }

}
