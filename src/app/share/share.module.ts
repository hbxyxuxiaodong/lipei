import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import {InsurenameFormat} from'./filter.pipe'
import {PidnoFormat} from "./filter.pipe"
@NgModule({
  imports: [
  ],
  declarations: [InsurenameFormat,PidnoFormat],
  exports:[CommonModule,FormsModule,InsurenameFormat,PidnoFormat]
})
export class ShareModule { }
