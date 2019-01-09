import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {ClazzService} from "../../service/clazz/clazz.service";
import {StudentService} from "../../service/student/student.service";
import {HttpClient} from "@angular/common/http";
import {StudentAddDialog} from "./dialogs/add/student-add.component";
import {NavigationService} from "../../service/navigation/navigation.service";

export interface PeriodicElement {
  href: string;
  name: string;
  surname: string;
  dateOfBirth: string;
  clazz: any;
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
  students: any[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private studentService: StudentService,
              private clazzService: ClazzService,
              public dialog: MatDialog,
              private http: HttpClient,
              private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.studentService.getAll().subscribe(data => {
      this.students = data._embedded.students;
      this.ELEMENT_DATA = [];
      for (let i in this.students) {
        this.ELEMENT_DATA.push({
          href: this.students[i]._links.self.href,
          name: this.students[i].name,
          surname: this.students[i].surname,
          dateOfBirth: this.students[i].dateOfBirth,
          clazz: {}
        });
        this.http.get(this.students[i]._links.clazz.href).subscribe(data => {
          let res: any;
          res = data;
          this.ELEMENT_DATA[i].clazz = res;
        });
      }
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'clazz': return item.clazz.name;
          default: return item[property];
        }
      };
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(href) {
    this.studentService.remove(href).subscribe(result => {
      this.initialize()
    }, err => {
      alert("Constraint violation exception. This student has been referenced in different table, eg. absences list.")
    });}

  openDialog(href, name, surname, dateOfBirth, clazz): void {
    const dialogRef = this.dialog.open(StudentAddDialog, {
      width: '250px',
      data: {
        href: href,
        name: name,
        surname: surname,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        clazz: clazz
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.initialize()
    });
  }

  showAbsences(student){
    this.navigationService.activateScreen(10, student);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate =
      (data: PeriodicElement, filter: string) => data.clazz.name.toLowerCase().includes(filter)
        || data.dateOfBirth.toLowerCase().includes(filter)
        || (data.name.toLowerCase() + ' ' + data.surname.toLowerCase()).includes(filter);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
