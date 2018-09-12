import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component"
import {RouterModule,Routes} from "@angular/router";
import {AuthGuard} from "../services/auth-guard.service"
const route:Routes=[{
  path:'index',canActivate:[AuthGuard],component:HomeComponent,
  canActivateChild:[AuthGuard],
  children:[
    {path:'claim',loadChildren:'app/claim/claim.module#ClaimModule',data:{ preload: true }}
  ]
}]
@NgModule({
  imports:[RouterModule.forChild(route)],
  exports:[RouterModule]
})
export class HomeRoutingModule{}
