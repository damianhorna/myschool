import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ClassroomAddDialog} from "./dialogs/add/classroom-add.component";
import {ClassroomService} from "../../service/classroom/classroom.service";

export interface PeriodicElement {
  number: string;
  href: string;
  numberOfSeats: string;
}

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css']
})
export class ClassroomListComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['number', 'numberOfSeats', 'actions'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  classrooms: Array<any>;

  constructor(private classroomService: ClassroomService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.classroomService.getAll().subscribe(data => {
      this.classrooms = data._embedded.classrooms;
      this.ELEMENT_DATA = [];
      for (let i in this.classrooms) {
        this.ELEMENT_DATA.push({
          number: this.classrooms[i].number,
          href: this.classrooms[i]._links.self.href,
          numberOfSeats: this.classrooms[i].numberOfSeats
        });
      }
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(href) {
    this.classroomService.remove(href).subscribe(result => {
      this.initialize()
    }, error => console.error(error));
  }

  openDialog(number, href, numberOfSeats): void {
    const dialogRef = this.dialog.open(ClassroomAddDialog, {
      width: '250px',
      data: {number: number, href: href, numberOfSeats: numberOfSeats}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initialize()
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
