import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './users/list/list.component';
import { ManageComponent } from './users/manage/manage.component';

const routes: Routes = [
  { path: '' ,component: ListComponent},
  // { path: 'crud/details/:Id', component: DetailsComponent },
  { path: 'create', component: ManageComponent },
  { path: 'update/:Id', component: ManageComponent } 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
