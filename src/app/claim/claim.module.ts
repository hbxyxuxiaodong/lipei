import { NgModule} from '@angular/core';
import {ShareModule} from "../share/share.module";
import {CommonService} from "../services/common.service";
import {NgZorroAntdModule} from "ng-zorro-antd/src/release/ng-zorro-antd.module"
import {Ng2PaginationModule} from "ng2-pagination";
import {ClaimRoutingModule} from "./claim-routing.module";
import { ClaimHomeComponent } from './claim-home/claim-home.component';
import { ClaimProgressComponent } from './claim-progress/claim-progress.component';
import { ClaimQueryComponent } from './claim-query/claim-query.component';
import { ClaimSaveComponent } from './claim-save/claim-save.component';
import { ThreeLinkComponent } from './three-link/three-link.component';
@NgModule({
  imports: [ShareModule,Ng2PaginationModule,NgZorroAntdModule,ClaimRoutingModule],
  declarations: [ClaimHomeComponent, ClaimProgressComponent, ClaimQueryComponent, ClaimSaveComponent, ThreeLinkComponent],
  providers:[CommonService]
})
export class ClaimModule { }
