import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubjectListComponent} from "./subject-list/subject-list.component";
import {SubjectEditComponent} from "./subject-edit/subject-edit.component";
import {SidenavComponent} from "./sidenav/sidenav.component";

const routes: Routes = [
  { path: '', redirectTo: '/nav', pathMatch: 'full' },
  {
    path: 'subject-list',
    component: SubjectListComponent
  },
  {
    path: 'subject-add',
    component: SubjectEditComponent
  },
  {
    path: 'subject-edit',
    component: SubjectEditComponent
  },
  {
    path: 'nav',
    component: SidenavComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
