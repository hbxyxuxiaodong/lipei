import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {UmService} from "../services/um.service";
import {Router} from "@angular/router";
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  name:string;//用户名
  user;//用户信息
  state;//当前状态
  constructor(private auth:AuthService,private router:Router,private um:UmService) { }
  ngOnInit() {
    if(this.auth.isLoggedIn()){
      console.log('jinlai')
      this.user=this.auth.getUser()
      this.name=this.user.fullName&&this.user.fullName.trim()||this.user.name;
      console.log(this.name)
    }
  }
  getLogout(){
    this.logout()
  }
  logout(){
    this.auth.logout();
    this.state='loginout'
    setTimeout(()=>{this.router.navigateByUrl('/login')},1000)
  }
}
