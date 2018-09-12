import { Component, OnInit } from '@angular/core';
import {BasePage} from "../../base.page";
import {UmService} from "../../services/um.service"
import {ClaimService} from "../../services/claim.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-claim-save',
  templateUrl: './claim-save.component.html',
  styleUrls: ['./claim-save.component.css']
})
export class ClaimSaveComponent extends BasePage implements OnInit {
  query:string;
  policyList: any;
  constructor(
    public router:Router,
    public auth:AuthService,
    public claim:ClaimService,
    public um:UmService
  )
  {
    super(router,auth)
  }
  ngOnInit() {
  }
  search(){
    if(!this.query){
      this.alert('请输入查询条件');
      return
    }
    this.showLoading();
    this.claim.searchPolicyByIdNumber(this.query).subscribe(data=>{
      this.hideLoading();
      this.policyList=data.list;
      console.log(data)
    })
  }
  getBranchName(branchCode) {
    var branchs: any = JSON.parse(this.auth.getbranches());
    for (var item in branchs) {
      if (branchCode == branchs[item].code) {
        branchCode = branchs[item].name;
        break;
      }
    }
    return branchCode;
  }
  claims(policy){
    this.auth.setpolicy('policy',policy)
    let id =  null;
    let redirect = this.um.redirectUrl ? this.um.redirectUrl : 'index/claim/process';
    this.router.navigate([redirect]);
  }
  goBack(){
    window.history.back()
  }
}
