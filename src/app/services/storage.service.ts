import { Injectable } from '@angular/core';
@Injectable()
export class StorageService {
  constructor() { }
  get(key):any{
    let value=window.localStorage.getItem(key);
    return value
  }
  set(key,val){
    if(typeof (val)=='object'){
      val = JSON.stringify(val)
    }
    window.localStorage.setItem(key,val);
  }
  remove(key){
    window.localStorage.removeItem(key)
  }
  getSession(key):any{
    let value=window.sessionStorage.getItem(key);
    return value
  }
  setSession(key,val){
    if(typeof val=='object'){
      val=JSON.stringify(val)
    }
    window.sessionStorage.setItem(key,val)
  }
  removeSession(key){
    window.sessionStorage.removeItem(key)
  }
}
