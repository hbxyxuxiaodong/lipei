import {NgModule,ModuleWithProviders, Optional, SkipSelf} from "@angular/core";
import {HttpModule} from "@angular/http";
import {UmService} from "../services/um.service";
import {AuthService} from "../services/auth.service";
import {AuthGuard} from "../services/auth-guard.service";
import {StorageService} from "../services/storage.service";
import {ClaimService} from "../services/claim.service"
@NgModule({
  providers:[UmService,AuthService,AuthGuard,StorageService,ClaimService],
  exports:[HttpModule]
})
export class ShareServiceModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ShareServiceModule,
      providers: []
    };
  }
  constructor( @Optional() @SkipSelf() parentModule: ShareServiceModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
