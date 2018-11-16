import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubjectListComponent} from "./subject-list/subject-list.component";
import {SubjectEditComponent} from "./subject-edit/subject-edit.component";

const routes: Routes = [
  { path: '', redirectTo: '/subject-list', pathMatch: 'full' },
  {
    path: 'subject-list',
    component: SubjectListComponent
  },
  {
    path: 'subject-add',
    component: SubjectEditComponent
  },
  {
    path: 'subject-edit/:id',
    component: SubjectEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
