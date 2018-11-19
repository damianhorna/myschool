import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SidenavComponent} from "./components/sidenav/sidenav.component";

const routes: Routes = [
  {path: '', component: SidenavComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
