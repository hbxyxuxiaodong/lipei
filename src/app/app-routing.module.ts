import {NgModule,CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterModule,Routes} from "@angular/router";
import {SelectivePreloadingStrategy} from "./selective-preloading-strategy"
import {AuthGuard} from "./services/auth-guard.service";
import {HomeModule} from "./home/home.module";
export const routes:Routes=[
  {path:'',canActivate:[AuthGuard],redirectTo:'index/claim',pathMatch:'full'},
  {path:'login',loadChildren:'app/login/login.module#LoginModule'}
];
@NgModule({
  imports:[HomeModule,RouterModule.forRoot(routes,{preloadingStrategy:SelectivePreloadingStrategy,enableTracing:true})],
  declarations:[],
  exports:[RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule{}
