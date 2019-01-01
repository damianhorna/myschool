import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {SubjectListComponent} from './components/subjects/subject-list.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatCheckboxModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {SubjectAddDialog} from "./components/subjects/dialogs/add/subject-add.component";
import {ClassroomListComponent} from './components/classrooms/classroom-list.component';
import {ClassroomAddDialog} from "./components/classrooms/dialogs/add/classroom-add.component";
import {TeacherListComponent} from './components/teachers/teacher-list.component';
import {TeacherAddDialog} from "./components/teachers/dialogs/add/teacher-add.component";
import {ClazzAddDialog} from "./components/classes/dialogs/add/clazz-add.component"
import {SubjectsPipe} from "./pipes/SubjectsPipe";
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {ClassListComponent} from './components/classes/class-list.component';
import {StudentListComponent} from './components/students/student-list.component';
import {StudentAddDialog} from "./components/students/dialogs/add/student-add.component";
import {LessonListComponent} from './components/lessons/lesson-list.component';
import {LessonAddDialog} from "./components/lessons/dialogs/add/lesson-add.component";
import {GradeListComponent} from './components/grades/grade-list.component';
import {TestListComponent} from './components/tests/test-list.component';
import {TestAddDialog} from "./components/tests/dialogs/add/test-add.component";
import {LessonUnitPipe} from './pipes/LessonUnitPipe';
import {MembersListComponent} from './components/classes/members-list/members-list.component';
import { AbsencesComponent } from './components/students/absences/absences.component';
import { PresentStudentsComponent } from './components/lessons/present-students/present-students.component';
import { GivenGradesComponent } from './components/lessons/given-grades/given-grades.component';


@NgModule({
  declarations: [
    AppComponent,
    SubjectListComponent,
    SidenavComponent,
    SubjectAddDialog,
    ClassroomListComponent,
    ClassroomAddDialog,
    TeacherListComponent,
    TeacherAddDialog,
    SubjectsPipe,
    ClassListComponent,
    ClazzAddDialog,
    StudentListComponent,
    StudentAddDialog,
    LessonListComponent,
    LessonAddDialog,
    GradeListComponent,
    TestListComponent,
    TestAddDialog,
    LessonUnitPipe,
    MembersListComponent,
    AbsencesComponent,
    PresentStudentsComponent,
    GivenGradesComponent
  ],
  entryComponents: [SubjectAddDialog, ClassroomAddDialog, TeacherAddDialog, ClazzAddDialog, StudentAddDialog, LessonAddDialog, TestAddDialog],
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
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
