import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TeacherAddDialog} from "./dialogs/add/teacher-add.component";
import {TeacherService} from "../../service/teacher/teacher.service";
import {TeachingService} from "../../service/teaching/teaching.service";
import {SubjectService} from "../../service/subject/subject.service";

export interface PeriodicElement {
  href: string;
  name: string;
  surname: string;
  dateOfEmployment: string;
  salary: number;
  subjects: any[];
}

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['name', 'surname', 'dateOfEmployment', 'salary', 'subjects', 'actions'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dropdownSettings = {};
  allSubjects: any[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  teachers: Array<any>;

  constructor(private teacherService: TeacherService,
              public dialog: MatDialog,
              private teachingService: TeachingService,
              private subjectService: SubjectService) {
  }

  editSubjects(teacher) {
    console.log('triggered');
    let hrefs = [];

    for (let s of teacher.subjects) {
      for (let s1 of this.allSubjects) {
        if (s1.name == s) {
          hrefs.push(s1._links.self.href);
        }
      }
    }

    this.teachingService.putSubjects(teacher, hrefs).subscribe(res=>console.log(res), err=>console.log(err));
  }

  ngOnInit() {
    this.initialize();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'name',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false
    };
  }

  initialize() {
    this.subjectService.getAll().subscribe(data => {
      this.allSubjects = data._embedded.subjects;
    });

    this.teacherService.getAll().subscribe(data => {
      this.teachers = data._embedded.teachers;
      this.ELEMENT_DATA = [];
      for (let i in this.teachers) {
        this.ELEMENT_DATA.push({
          name: this.teachers[i].name,
          href: this.teachers[i]._links.self.href,
          surname: this.teachers[i].surname,
          salary: this.teachers[i].salary,
          dateOfEmployment: this.teachers[i].dateOfEmployment,
          subjects: []
        });
        this.teachingService.getSubjectsForTeacher(this.teachers[i]).subscribe(data => {
          this.ELEMENT_DATA[i].subjects = data._embedded.subjects
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
      data: {
        href: href,
        name: name,
        surname: surname,
        dateOfEmployment: new Date(dateOfEmployment),
        salary: salary,
        subjects: []
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.initialize()
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate =
      (data: PeriodicElement, filter: string) => data.name.toLowerCase().includes(filter)
        || data.surname.toLowerCase().includes(filter)
        || (data.name.toLowerCase() + ' ' + data.surname.toLowerCase()).includes(filter)
        || data.salary.toString().includes(filter)
        || data.subjects.some(sub => sub.name.toLowerCase().includes(filter))
        || data.dateOfEmployment.includes(filter);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
