import { Component, OnInit } from '@angular/core';
import {BasePage} from "../../base.page";
import {Router} from "@angular/router";
import {UmService} from "../../services/um.service";
import {AuthService} from "../../services/auth.service";
import {ClaimService} from "../../services/claim.service";
declare var $:any;
@Component({
  selector: 'app-claim-query',
  templateUrl: './claim-query.component.html',
  styleUrls: ['./claim-query.component.css']
})
export class ClaimQueryComponent extends BasePage implements OnInit {
  status:any;
  queryModel:any;
  caseConditionStatusDefault: any;
  caseConditionStatusAll: any;
  caseConditionStatus:any;
  mTab: number = 0;
  mPage;
  caseStatus: string = "0";
  mBranches: any;
  brancheValue;
  providerCode;
  partiesName;
  total;
  p;
  pages;
  mProviders:any;
  policyInfoList: any;
  constructor(public router:Router,public auth:AuthService,public claim:ClaimService,public um:UmService) {
    super(router,auth)
  }
  ngOnInit() {
    this.status= ["报案中", "已报案", "已受理", "已提交资料", "已立案", "已结案"];//'0':报案中; '1':已报案; '2':已受理; '3':已提交资料; '4':已立案; '5':已结案;]
    this.caseConditionStatusDefault=[
      {
        "value":"",
        "code": "all"
      }, {
        "value": "报案中",
        "code": "0"
      }, {
        "value": "已报案",
        "code": "1"
      }
    ];
    this.caseConditionStatusAll=[
      {
        "value": "",
        "code": "all"
      }, {
        "value": "报案中",
        "code": "0"
      }, {
        "value": "已报案",
        "code": "1"
      }, {
        "value": "已受理",
        "code": "2"
      }, {
        "value": "提交资料",
        "code": "3"
      }, {
        "value": "已立案",
        "code": "4"
      }, {
        "value": "已结案",
        "code": "5"
      }
    ];
    this.caseConditionStatus=this.caseConditionStatusDefault;
    this.queryModel={
      "policyNo": "",
      "appliName": "",
      "beniName": "",
      "busiName": "",
      "busiMobile":"",
      "branch": ""
    }
    if(this.auth.getmTab()){
      this.mTab=this.auth.getmTab()
    }
    if(this.auth.getmPage()){
      this.mPage=this.auth.getmPage()
    }else{
      this.mPage=1
    }
    if(this.auth.getqryModel()){
      this.queryModel=this.auth.getqryModel()
    }
    if(this.auth.getcaseStatus()){
      this.caseStatus=this.auth.getcaseStatus()
    }
    if(this.auth.getstatusId()){
      this.changeTabStyle(this.auth.getstatusId())
    }
    this.queryPolicy()
    this.getProviders()
  }
  save(){
    this.setvalue();
    let redirect = this.um.redirectUrl ? this.um.redirectUrl : 'index/claim/save';
    this.router.navigate([redirect]);
  }
  getButtonName() {
    if (this.mTab == 5 || this.mTab == 6) {
      return "查看";
    } else {
      return "处理";
    }
  }
  operating(policy){
    this.setvalue();
    var addr = { "provinceName": policy.mainInfo.applyAddr.province, "provinceCode": "", "cityName": policy.mainInfo.applyAddr.city, "cityCode": "", "townName": policy.mainInfo.applyAddr.area, "townCode": "" }
    this.auth.setprocessAdrr('processAdrr',addr);
    let redirect=this.um.redirectUrl?this.um.redirectUrl:'index/claim/process/'+policy._id;
    this.router.navigate([redirect]);
  }
  setvalue(){
    this.auth.setsessioncaseStatus('caseStatus',this.caseStatus)
    this.auth.setsessionqryModel('qryModel',this.queryModel);
    this.auth.setsessionmPage('mPage',this.mPage);
  }
  getProviders(){
    if(this.auth.getproviders()){
      let newProvider = { "_id": "", "key": "", "value": "" };
      this.mProviders=JSON.parse(this.auth.getproviders());
      this.mProviders.unshift(newProvider)
    }else{
      this.claim.getProviders().subscribe(data=>{
          console.log(data)
        this.auth.setsessionproviders('providers',data.data)
        this.mProviders=data.data;
        let newProvider = { "_id": "", "key": "", "value": "" };
        this.mProviders.unshift(newProvider)
      },(err:Error)=>{
        this.hideLoading();
        this.handleError(err)
      })
    }
  }
  changeTab(status, id, tab){
    this.brancheValue = "";
    this.providerCode = "";
    this.partiesName = "";
    this.mTab=tab;
    this.auth.setsessionmTab('mTab',this.mTab);
    if (tab == 0) {
      this.caseConditionStatus = this.caseConditionStatusDefault;
    } else if (tab == 5) {
      this.caseConditionStatus = this.caseConditionStatusAll;
    }
    this.auth.setsessionstatusId('statusId',id);
    this.caseStatus=status
    this.queryPolicy();
    $('a.item').removeClass('active');
    $('#' + id).addClass('active');
  }
  changeTabStyle(id){
    $('a.item').removeClass('active');
    $('#' + id).addClass('active');
  }
  queryPolicy(){
    if(this.auth.getbranches()){
      this.mBranches = JSON.parse(this.auth.getbranches());
      let newBranch = { "_id": "", "name": "", "abbrName": "", "code": "" };
      this.mBranches.unshift(newBranch);
      this.query()
    }else{
      this.claim.getBranchNameAll().subscribe(data=>{
        console.log(data)
        this.auth.setbranches('branches',data.branches);
        this.mBranches=data.branches;
        let tets={ "_id": "", "name": "", "abbrName": "", "code": "" };
        this.mBranches.unshift(tets);
        this.query()
      },(err:Error)=>{
        this.hideLoading();
        this.handleError(err);
      })
    }
  }
  query(){
    if(this.caseStatus==='all'){
      if(this.mTab==0){
        this.caseStatus='0'
      }else{
        this.caseStatus= "0, 1, 2, 3, 4, 5"
      }
    }
    let data={
      "limit":10,
      "page":this.mPage,
      "condition":{
        "contractNo": this.queryModel.policyNo,
        "applicantname": this.queryModel.appliName,
        "insurename": this.queryModel.beniName,
        "agentName": this.queryModel.busiName,
        "agentTelephone": this.queryModel.busiMobile,
        "status": this.caseStatus,
        "branch": this.brancheValue,
        "providerCode": this.providerCode,
        "partiesName": this.partiesName,
      }
    }
    if (!this.queryModel.policyNo)
      delete data.condition.contractNo
    if (!this.queryModel.appliName)
      delete data.condition.applicantname
    if (!this.queryModel.beniName)
      delete data.condition.insurename
    if (!this.queryModel.busiName)
      delete data.condition.agentName
    if (!this.queryModel.busiMobile)
      delete data.condition.agentTelephone
    if (!this.brancheValue)
      delete data.condition.branch
    if (!this.providerCode)
      delete data.condition.providerCode
    if (!this.partiesName)
      delete data.condition.partiesName
    this.showLoading()
    this.claim.queryClaim(data).subscribe(data=>{
      this.hideLoading();
      console.log(data)
      this.policyInfoList=data.docs;
      this.total=data.total;
      this.p = this.mPage
      this.pages=data.pages;
    },(err:Error)=>{
      this.hideLoading();
      if(JSON.parse(JSON.stringify(err)).status == 401){
        this.auth.logout();
        setTimeout(()=>{this.router.navigateByUrl('/login')},1000)
      }else{
        this.handleError(err);
      }
    })
  }
  statusChange(){
    this.queryPolicy()
  }
  public getBranchName(branchCode) {
    var branchs: any = JSON.parse(this.auth.getbranches());
    for (var item in branchs) {
      if (branchCode == branchs[item].code) {
        branchCode = branchs[item].name;
        break;
      }
    }
    return branchCode;
  }
  public pageChanged(page: any): void {
    this.mPage = page.page;
    this.queryPolicy();
  }
}
