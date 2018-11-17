import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {SubjectListComponent} from './subject-list/subject-list.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatPaginatorModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {SidenavComponent} from './sidenav/sidenav.component';
import {SubjectAddDialog} from "./dialogs/subject/subject-add.component";
import { ClassroomListComponent } from './classroom-list/classroom-list/classroom-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SubjectListComponent,
    SidenavComponent,
    SubjectAddDialog,
    ClassroomListComponent
  ],
  entryComponents: [SubjectAddDialog],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
