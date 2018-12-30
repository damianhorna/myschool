import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from "../../../service/navigation/navigation.service";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {StudentService} from "../../../service/student/student.service";
import {ClazzService} from "../../../service/clazz/clazz.service";
import {HttpClient} from "@angular/common/http";

export interface PeriodicElement {
  name: string;
  surname: string;
  dateOfBirth: string;
}

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  clazz: any;
  navService : any;
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['name', 'surname', 'dateOfBirth'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  students: any[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private studentService: StudentService,
              private clazzService: ClazzService,
              public dialog: MatDialog,
              private http: HttpClient,
              private navigationService: NavigationService) {
    this.clazz = navigationService.targetObject;
    console.log(this.clazz);
    this.navService = navigationService;
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.http.get(this.clazz.href + '/students').subscribe(res => {
      let data : any;
      data = res;
      this.students = data._embedded.students;
      this.ELEMENT_DATA = [];
      for (let i in this.students) {
        this.ELEMENT_DATA.push({
          name: this.students[i].name,
          surname: this.students[i].surname,
          dateOfBirth: this.students[i].dateOfBirth,
        });
      }
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
