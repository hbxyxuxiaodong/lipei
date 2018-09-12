import { NgModule } from '@angular/core';
import { ShareModule} from "../share/share.module";
import {LoginComponent} from "./login.component";
import {LoginRoutingModule} from "./login-routing.module"
@NgModule({
  imports: [
    ShareModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent],
})
export class LoginModule { }
