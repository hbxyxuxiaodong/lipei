import {NgModule} from "@angular/core";
import {RouterModule,Routes} from "@angular/router";
import {ClaimHomeComponent} from "./claim-home/claim-home.component";
import {ClaimSaveComponent} from "./claim-save/claim-save.component";
import {ClaimQueryComponent} from "./claim-query/claim-query.component";
import {ClaimProgressComponent} from "./claim-progress/claim-progress.component"
const claimroute:Routes=[
  {path:'',component:ClaimHomeComponent},
  {path:'query',component:ClaimQueryComponent},
  {path:'save',component:ClaimSaveComponent},
  {path:'process/:id',component:ClaimProgressComponent},
  {path:'process',component:ClaimProgressComponent},
]
@NgModule({
  imports:[RouterModule.forChild(claimroute)],
  exports:[RouterModule]
})
export class  ClaimRoutingModule{}
