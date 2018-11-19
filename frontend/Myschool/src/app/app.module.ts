import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {SubjectListComponent} from './components/subjects/subject-list.component';
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
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {SubjectAddDialog} from "./components/subjects/dialogs/add/subject-add.component";
import { ClassroomListComponent } from './components/classrooms/classroom-list.component';
import {ClassroomAddDialog} from "./components/classrooms/dialogs/add/classroom-add.component";

@NgModule({
  declarations: [
    AppComponent,
    SubjectListComponent,
    SidenavComponent,
    SubjectAddDialog,
    ClassroomListComponent,
    ClassroomAddDialog
  ],
  entryComponents: [SubjectAddDialog, ClassroomAddDialog],
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
