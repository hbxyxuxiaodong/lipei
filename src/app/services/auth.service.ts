import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {StorageService} from "./storage.service"
@Injectable()
export class AuthService {
  redirectUrl: string;
  constructor(
    public http:Http,
    public storage:StorageService
  ) { }
  getUser(){
    return JSON.parse(this.storage.get('user'));
  }
  getJwtToken(){
    return this.storage.get('jwtToken');
  }
  getmTab(){
    return this.storage.getSession('mTab')
  }
  getmPage(){
    return this.storage.getSession('mPage')
  }
  getqryModel(){
    return this.storage.getSession('qryModel')
  }
  getcaseStatus(){
    return this.storage.getSession('caseStatus')
  }
  getstatusId(){
    return this.storage.getSession('statusId')
  }
  getbranches(){
    return this.storage.get('branches')
  }
  getproviders(){
    return this.storage.get('providers')
  }
  setprocessAdrr(key,val){
    this.storage.set(key,val)
  }
  getprocessAdrr(){
    return this.storage.get('processAdrr')
  }
  getpolicy(){
    return this.storage.get('policy')
  }
  setpolicy(key,val){
    this.storage.set(key,val)
  }
  setsessioncaseStatus(key,val){
    this.storage.setSession(key,val)
  }
  setsessionqryModel(key,val){
    this.storage.setSession(key,val)
  }
  setsessionmPage(key,val){
    this.storage.setSession(key,val)
  }
  setsessionstatusId(key,val){
    this.storage.setSession(key,val)
  }
  setbranches(key,val){
    this.storage.set(key,val)
  }
  setsessionproviders(key,val){
    this.storage.setSession(key,val)
  }
  setsessionmTab(key,val){
    this.storage.setSession(key,val)
  }
  logout():void{
    this.storage.remove('user');
    this.storage.remove('jwtToken')
  }
  isLoggedIn(): boolean {
    let user = this.storage.get('user');
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
