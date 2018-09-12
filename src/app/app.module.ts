import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {NgZorroAntdModule} from "ng-zorro-antd/src/release/ng-zorro-antd.module"
import { AppComponent } from './app.component';
import {LocationStrategy,HashLocationStrategy} from "@angular/common"
import {SelectivePreloadingStrategy} from "./selective-preloading-strategy";
import {ShareServiceModule} from "./share/share-service.module"
import {AppRoutingModule} from "./app-routing.module";
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ShareServiceModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [SelectivePreloadingStrategy,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
