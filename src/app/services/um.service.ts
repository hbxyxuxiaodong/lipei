import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable"
import {environment} from "../../environments/environment"
import {Http,Response} from "@angular/http";
import {StorageService} from "./storage.service";
import { Subject } from 'rxjs/Rx';
@Injectable()
export class UmService {
  nameChangeSubject=new Subject<string>();
  constructor(
    public http:Http,
    public storage:StorageService
  ) { }
  redirectUrl: string;
  login(data):Observable<any>{
        return this.http.post(
          environment.url.um+'login',
          {mobile:data.username.trim(),
                password:data.password.trim(),
                userType:'3'})
          .map((res:Response)=>{
          let body=res.json();
          if(body.code!=='000'){
            throw new Error(body.msg);
          }
          console.log(body.data.user)
          console.log(body.data.token)
          this.storage.set('user',body.data.user);
          this.storage.set('jwtToken',body.data.token);
    })
  }
  isloggedIn():Boolean{
    let user=this.storage.get('user');
    if(user){
      return true
    }else{
      return false
    }
  }
  getNameChangeSubject() {
    return this.nameChangeSubject;
  }
}
