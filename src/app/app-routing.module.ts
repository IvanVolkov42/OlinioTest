import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {GridComponent} from "./grid/grid.component";
import {GridUserEditComponent} from "./grid/grid-user-edit/grid-user-edit.component";

const AppRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'grid',
    component: GridComponent,
    children: [
      {
        path: ':name', component: GridUserEditComponent
      }
    ]
  }
]

@NgModule({
  imports:[RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
