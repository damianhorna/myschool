import {Component, OnInit, ViewChild} from '@angular/core';
import {SubjectService} from "../service/subject/subject.service";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SubjectAddDialog} from "../dialogs/subject/subject-add.component";

export interface PeriodicElement {
  name: string;
  href: string;
}

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  subjects: Array<any>;

  constructor(private subjectService: SubjectService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.subjectService.getAll().subscribe(data => {
      this.subjects = data._embedded.subjects;
      this.ELEMENT_DATA = [];
      for (let i in this.subjects) {
        this.ELEMENT_DATA.push({name: this.subjects[i].name, href: this.subjects[i]._links.self.href});
      }
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(href) {
    this.subjectService.remove(href).subscribe(result => {
      this.initialize()
    }, error => console.error(error));
  }

  openDialog(name, href): void {
    const dialogRef = this.dialog.open(SubjectAddDialog, {
      width: '250px',
      data: {name: name, href: href}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initialize()
    });
  }

}
