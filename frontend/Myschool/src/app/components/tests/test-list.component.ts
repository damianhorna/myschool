import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TestService} from "../../service/test/test.service";
import {TestAddDialog} from "./dialogs/add/test-add.component";

export interface PeriodicElement {
  type: string;
  href: string;
}

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['type', 'actions'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  tests: Array<any>;

  constructor(private testService: TestService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.testService.getAll().subscribe(data => {
      this.tests = data._embedded.tests;
      this.ELEMENT_DATA = [];
      for (let test of this.tests) {
        this.ELEMENT_DATA.push({type: test.type, href: test._links.self.href});
      }
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(href) {
    this.testService.remove(href).subscribe(result => {
      this.initialize()
    }, error => console.error(error));
  }

  openDialog(name, href): void {
    const dialogRef = this.dialog.open(TestAddDialog, {
      width: '250px',
      data: {name: name, href: href}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initialize()
    });
  }

}
