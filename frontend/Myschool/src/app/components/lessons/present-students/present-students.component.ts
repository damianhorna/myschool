import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {StudentService} from "../../../service/student/student.service";
import {ClazzService} from "../../../service/clazz/clazz.service";
import {HttpClient} from "@angular/common/http";
import {NavigationService} from "../../../service/navigation/navigation.service";
import {SelectionModel} from "@angular/cdk/collections";
import {LessonService} from "../../../service/lesson/lesson.service";

export interface PeriodicElement {
  href: string;
  name: string;
  surname: string;
  dateOfBirth: string;
  clazz: any;
}

@Component({
  selector: 'app-present-students',
  templateUrl: './present-students.component.html',
  styleUrls: ['./present-students.component.css']
})
export class PresentStudentsComponent implements OnInit {


  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['select', 'name', 'surname', 'dateOfBirth', 'clazz'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  students: any[];
  lesson: any;
  navService: any;
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<PeriodicElement>(this.allowMultiSelect, this.initialSelection);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private studentService: StudentService,
              private clazzService: ClazzService,
              public dialog: MatDialog,
              private http: HttpClient,
              private navigationService: NavigationService,
              private lessonService : LessonService) {
    this.lesson = navigationService.targetObject;
    this.navService = navigationService;
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
          if (i == (this.students.length - 1).toString()) {
            let EL_DATA_COPY = [];
            for (let student of this.ELEMENT_DATA) {
              if (student.clazz.name == this.lesson.clazz.name) {
                EL_DATA_COPY.push(student)
                this.http.get("//localhost:8080/lessons/search/was-present?sid=" + student.href.substring(student.href.lastIndexOf("/")+1) + "&" + "lid=" + this.lesson.href.substring(this.lesson.href.lastIndexOf("/")+1))
                  .subscribe(res => {
                    if(res){
                      this.initialSelection.push(student);
                      this.selection = new SelectionModel<PeriodicElement>(this.allowMultiSelect, this.initialSelection);
                    }
                  }, err => console.log(err));
              }
            }
            this.dataSource = new MatTableDataSource(EL_DATA_COPY);
          }
        });
      }
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'clazz':
            return item.clazz.name;
          default:
            return item[property];
        }
      };
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  savePresentStudents(){
    this.navService.activateScreen(6);
    let selectedHrefs = [];
    this.selection.selected.forEach(student => selectedHrefs.push(student.href));
    this.lessonService.putPresentStudents(this.lesson.href, selectedHrefs).subscribe(res => console.log(res), err => console.log(err));
  }
}
