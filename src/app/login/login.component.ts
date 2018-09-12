import { Component,OnInit } from '@angular/core';
import {BasePage} from "../base.page"
import {Router,NavigationExtras} from "@angular/router";
import {UmService} from "../services/um.service"
import {AuthService} from "../services/auth.service"
import {StorageService} from "../services/storage.service"
declare var $:any;
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers:[UmService,AuthService,StorageService]
})
export class LoginComponent extends BasePage implements OnInit {
  title:string;
  loginModel:object;
  constructor(
    public router:Router,
    private umservice:UmService,
    public auth:AuthService,
  )
  {
    super(router,auth);
    this.title = '乐游保,欢迎您的访问';
    console.log('constructor')
  }
  ngOnInit() {
    console.log('ngOnInit')
    this.loginModel={
      username:'',
      password:''
    }
  }
  login(){
      this.showLoading();
      this.umservice.login(this.loginModel).subscribe(()=>{
        this.hideLoading();
          if(this.umservice.isloggedIn()){
             let redirect=this.umservice.redirectUrl?this.umservice.redirectUrl:'/';
             let navigationExtras:NavigationExtras ={
               preserveQueryParams:true,
               preserveFragment:true
             };
             this.router.navigate([redirect],navigationExtras);
          }
        },(err:Error)=>{
            this.hideLoading();
            this.handleError(err);
          }
      )
  }
}
