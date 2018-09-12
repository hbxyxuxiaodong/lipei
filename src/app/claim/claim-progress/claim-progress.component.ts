import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import {ClaimService} from "../../services/claim.service";
import {UmService} from "../../services/um.service"
import {BasePage} from "../../base.page";
import {IntervalObservable} from "rxjs/observable/IntervalObservable"
import {AuthService} from "../../services/auth.service";
import {CommonService} from "../../services/common.service"
@Component({
  selector: 'app-claim-progress',
  templateUrl: './claim-progress.component.html',
  styleUrls: ['./claim-progress.component.css']
})
export class ClaimProgressComponent extends BasePage implements OnInit {
  areaInAdrr: any;
  intervalObser;
  status:any;
  contractInfo: any;
  acceptedData;
  informationInfo;
  registerInfo;
  settleDataInfo;
  idType;
  acceptedType;
  id;
  isSave = false;
  policyDetail;
  expressCompanys;
  postWay;
  onFileType;
  onFileTypevalue=1;
  closedCaseTypevalue='1';
  closedCaseType;
  mTab=0;
  constructor(public auth:AuthService,public router:Router,public claim:ClaimService,public route:ActivatedRoute,public commonservice:CommonService,public um:UmService) {
    super(router,auth)
  }
  ngOnInit() {
    if(this.auth.getprocessAdrr()){
      this.areaInAdrr=JSON.parse(this.auth.getprocessAdrr())
    }else{
      this.areaInAdrr = { "provinceName": "上海市", "provinceCode": "", "cityName": "", "cityCode": "", "townName": "", "townCode": "" };
    }
    this.status = ["报案中", "已报案", "已受理", "已提交资料", "已立案", "已结案"];//'0':报案中; '1':已报案; '2':已受理; '3':已提交资料; '4':已立案; '5':已结案;
    this.contractInfo = {
      "mainInfo": {
        "idType": "1",
        "applyAddr": {
          "province": "",
          "city": "",
          "area": "",
          "detail": ""
        }
      }
    }
    this.acceptedData = {
      "_id": "",
      "postData": {
        "applyDataList": [
        ],
        "postAddr": "",
        "remark": "",
        "operationDate": "",
        "telephone": "02123561002",
        "transfer": "1"
      }
    }
    this.informationInfo = {
      "_id": "",
      "submitData": {
        "postWay": "1",
        "postWayCode": "",
        "postWayName": "",
        "postDate": "",
        "expressCompany": "中国邮政",
        "expressCompanyCode": "中国邮政",
        "expressCompanyName": "中国邮政",
        "expressNo": "",
        "remark": "",
        "operationDate":""
      }
    }
    this.registerInfo = {
      "_id": "",
      "registerData": {
        "operationDate": "",
        "remark": "",
      }
    }
    this.settleDataInfo = {
      "_id": "",
      "settleData": {
        "operationDate": "",
        "remark": ""
      }
    }
    this.idType=[
      {
        "value": "身份证",
        "code": "1"
      }, {
        "value": "护照",
        "code": "2"
      }, {
        "value": "军人证",
        "code": "3"
      }, {
        "value": "出生证",
        "code": "4"
      }, {
        "value": "港澳证",
        "code": "5"
      }, {
        "value": "组织机构代码证",
        "code": "6"
      }, {
        "value": "台胞证",
        "code": "7"
      }, {
        "value": "外国人居留证",
        "code": "8"
      }, {
        "value": "社会统一信用代码",
        "code": "9"
      }, {
        "value": "税务登记号",
        "code": "10"
      },
      {
        "value": "其它",
        "code": "99"
      }
    ];
    this.acceptedType = [
      {
        "value": "已受理",
        "code": "1"
      }, {
        "value": "人工撤销",
        "code": "2"
      }
    ];
    this.mTab=this.auth.getmTab();
    this.closedCaseType = [
      {
        "value": "已赔付",
        "code": "1"
      }, {
        "value": "已拒赔",
        "code": "2"
      }
    ]

    this.expressCompanys = [
      {
        "value": "中国邮政",
        "code": "中国邮政"
      }, {
        "value": "EMS",
        "code": "EMS"
      }, {
        "value": "顺丰速运",
        "code": "顺丰速运"
      }, {
        "value": "申通",
        "code": "申通"
      }, {
        "value": "圆通",
        "code": "圆通"
      }, {
        "value": "中通",
        "code": "中通"
      }, {
        "value": "韵达",
        "code": "韵达"
      }, {
        "value": "百世汇通",
        "code": "百世汇通"
      }, {
        "value": "天天",
        "code": "天天"
      }, {
        "value": "全峰",
        "code": "全峰"
      }, {
        "value": "快捷快递",
        "code": "快捷快递"
      }, {
        "value": "优速",
        "code": "优速"
      }, {
        "value": "国通",
        "code": "国通"
      }, {
        "value": "宅急送",
        "code": "宅急送"
      }
    ];
    this.postWay = [
      {
        "value": "门店提交",
        "code": "1"
      }, {
        "value": "快递寄送",
        "code": "2"
      }
    ]
    this.onFileType = [
      {
        "value": "已立案",
        "code": "1"
      }, {
        "value": "人工撤销",
        "code": "2"
      }, {
        "value": "退回",
        "code": "3"
      }
    ];
    this.route.params.subscribe(params=>{
      this.id=params['id'];
      if(this.id){
        this.queryClaimDetail()
        this.isSave=false
      }else{
        var data=JSON.parse(this.auth.getpolicy());
        this.policyDetail={
          "contractInfo":{}
        }
        this.policyDetail.contractNo=data.contractNo;
        this.policyDetail.contractInfo.policy = data.policy;
        this.policyDetail.contractInfo.applicant = data.applicant;
        this.policyDetail.contractInfo.branch = data.branch;
        this.policyDetail.contractInfo.approveDate = data.approveDate;
        this.policyDetail.contractInfo.acceptDate = data.acceptDate;
        this.policyDetail.contractInfo.applyDate = data.applyDate;
        this.policyDetail.contractInfo.effectiveDate = data.effectiveDate;
        this.policyDetail.contractInfo.totalModalPrem = data.totalModalPrem;
        this.policyDetail.contractInfo.providerCode = data.providerCode;
        this.policyDetail.contractInfo.partiesName = data.partiesName;
        this.policyDetail.contractInfo.expiryDate = data.expiryDate;
        this.policyDetail.contractInfo.agentName = data.agentName;
        this.policyDetail.contractInfo.children = data.children;
        this.policyDetail.contractInfo.insuredList = data.insuredList;
        this.policyDetail.contractInfo.agentTelephone = data.agentTelephone;
        this.contractInfo.contractNo = data.contractNo;
        this.contractInfo.source = data.dataSource;
        this.isSave = true;
        this.commonservice.getClaimCalendar(0,this.contractInfo.mainInfo)
      }
    })
  }
  changeArea(area) {
    this.contractInfo.mainInfo.applyAddr.province = area.provinceName;
    this.contractInfo.mainInfo.applyAddr.city = area.cityName;
    this.contractInfo.mainInfo.applyAddr.area = area.townName;
  }
  submit(){
    if (!this.contractInfo.mainInfo.applyDate) {
      this.alert("请填写出险日期");
      return;
    }
    if (!this.contractInfo.mainInfo.name) {
      this.alert("请填写出险姓名");
      return;
    }
    if (!this.contractInfo.mainInfo.mobile) {
      this.alert("请填写联系电话");
      return;
    }
    if (!this.contractInfo.mainInfo.applyAddr.province) {
      this.alert("请选择出险省/市");
      return;
    }
    if (!this.contractInfo.mainInfo.applyAddr.detail) {
      this.alert("请填写出险街道");
      return;
    }
    if (!this.contractInfo.mainInfo.idNo) {
      this.alert("请填写出险证件号码");
      return;
    }
    if (!this.contractInfo.mainInfo.applySituation) {
      this.alert("请填写出险情况");
      return;
    }
    this.showLoading();
    this.claim.submitProcess(this.contractInfo).subscribe(data => {
      this.hideLoading();
      this.alert("提交成功", () => {
        this.auth.setsessionmTab("mTab", 1);
        this.auth.setsessioncaseStatus("caseStatus", 1);
        this.auth.setsessionstatusId("statusId", "status1");
        let redirect = this.um.redirectUrl ? this.um.redirectUrl : '/';
        this.router.navigate([redirect]);
      });
    }, (err: Error) => {
      this.hideLoading();
      if (JSON.parse(JSON.stringify(err)).status == 401) {
        this.handleError('401');
      } else {
        this.handleError(err);
      }
    });
  }
  temporary(){
    if (!this.contractInfo.mainInfo.applyDate) {
      this.alert("请填写出险日期");
      return;
    }
    if (!this.contractInfo.mainInfo.name) {
      this.alert("请填写出险姓名");
      return;
    }
    if (!this.contractInfo.mainInfo.mobile) {
      this.alert("请填写联系电话");
      return;
    }
    if (!this.contractInfo.mainInfo.applyAddr.province) {
      this.alert("请选择出险省/市");
      return;
    }
    if (!this.contractInfo.mainInfo.applyAddr.detail) {
      this.alert("请填写出险街道");
      return;
    }
    if (!this.contractInfo.mainInfo.idNo) {
      this.alert("请填写出险证件号码");
      return;
    }
    if (!this.contractInfo.mainInfo.applySituation) {
      this.alert("请填写出险情况");
      return;
    }
    this.showLoading();
    this.claim.temporary(this.contractInfo).subscribe(()=>{
      this.hideLoading()
      this.alert('暂存成功',()=>{
        this.auth.setsessionmTab('mTab',0);
        this.auth.setsessioncaseStatus('caseStatus',0)
        this.auth.setsessionstatusId('statusId','status0')
        let redirect=this.um.redirectUrl?this.um.redirectUrl:'/'
        this.router.navigate([redirect])
      })
    })
  }
  submitSettle(){
    if (!this.settleDataInfo.settleData.remark) {
      this.alert("请填写处理说明");
      return;
    }
    if (this.closedCaseTypevalue == '1') {
      this.settle();
    } else if (this.closedCaseTypevalue == '2') {
      this.reject();
    }
  }
  settle(){
    this.showLoading();
    this.claim.settle(this.settleDataInfo).subscribe(()=>{
      this.hideLoading();
      this.alert('提交成功',()=>{
        this.setTabSessionVaule(5,5,'status5')
      })
    },(err:Error)=>{
      this.hideLoading();
      if(JSON.parse(JSON.stringify(err)).status==401){
        this.handleError(401)
      }else{
         this.handleError(err)
      }
    })
  }
  reject(){
    var rejectDataInfo = {
      "_id": "",
      "rejectData": {
        "operationDate": "",
        "remark": ""
      }
    }
    rejectDataInfo._id = this.settleDataInfo._id;
    rejectDataInfo.rejectData.operationDate = this.settleDataInfo.settleData.operationDate;
    rejectDataInfo.rejectData.remark = this.settleDataInfo.settleData.remark;
    this.showLoading();
    this.claim.reject(rejectDataInfo).subscribe(data => {
      this.hideLoading();
      this.alert("提交成功", () => {
        this.setTabSessionVaule(5,5,"status5");
      });
    }, (err: Error) => {
      this.hideLoading();
      if (JSON.parse(JSON.stringify(err)).status == 401) {
        this.handleError('401');
      } else {
        this.handleError(err);
      }
    });
  }
  submitRegister(){
      if(!this.registerInfo.registerData.remark){
        this.alert("请填写处理说明")
        return
      }
      if(this.onFileTypevalue==1){
        this.register();
      }else if(this.onFileTypevalue==2){
        this.cancel(this.registerInfo.registerData.remark);
      }else if(this.onFileTypevalue == 3){
        this.returncase()
      }
  }
  register(){
    this.showLoading();
    this.claim.register(this.registerInfo).subscribe(()=>{
      this.hideLoading()
      this.alert('提交成功',()=>{
        this.setTabSessionVaule(4,4,'status4')
      })
    },(err:Error)=>{
      this.hideLoading();
      if(JSON.parse(JSON.stringify(err)).status==401){
        this.handleError('401')
      }else{
        this.handleError(err)
      }
    })
  }
  returncase(){
    var returnInfo={
      "_id":"",
      "returnData":{
        "operationDate":"",
        "remark":""
      }
    }
    returnInfo._id = this.registerInfo._id;
    returnInfo.returnData.operationDate = this.registerInfo.registerData.operationDate;
    returnInfo.returnData.remark = this.registerInfo.registerData.remark;
    this.showLoading();
    this.claim.returnCase(returnInfo).subscribe(()=>{
      this.hideLoading();
      this.alert("提交成功",()=>{
        this.setTabSessionVaule(2,2,"status2");
      })
    },(err:Error)=>{
      this.hideLoading();
      if(JSON.parse(JSON.stringify(err)).status==401){
        this.handleError('401');
      }else{
        this.handleError(err)
      }
    })
  }
  acceptedSubmit(){
    if (!this.acceptedData.postData.remark) {
      this.alert("请填写处理说明");
      return;
    }
    if (!this.acceptedData.postData.applyDataList || this.acceptedData.postData.applyDataList == 0) {
      this.alert("请填写理赔资料清单");
      return;
    }
    if (!this.acceptedData.postData.postAddr) {
      this.alert("请填写邮送地址");
      return;
    }
    if(this.acceptedData.postData.transfer == 1){
      this.showLoading();
      this.claim.accepted(this.acceptedData).subscribe(data=>{
        this.hideLoading();
        this.alert("提交成功", () => {
          this.setTabSessionVaule(2,2,"status2");
        });
      })
    }else {
      this.cancel(this.acceptedData.postData.remark);
    }
  }
  submitPostData(){
    this.informationInfo.submitData.postWayCode=this.informationInfo.submitData.postWay;
    this.informationInfo.submitData.postWayName=this.informationInfo.submitData.postWayCode=='1'?"门店提交":"快递寄送";
    if (!this.informationInfo.submitData.postDate) {
      this.alert("请填写日期");
      return;
    }
    if (this.informationInfo.submitData.postWayCode == 2 && !this.informationInfo.submitData.expressNo) {
      this.alert("请填写快递单号");
      return;
    }
    if (!this.informationInfo.submitData.remark) {
      this.alert("请填写处理说明");
      return;
    }
    if (this.informationInfo.submitData.postWayCode == 1)
      delete this.informationInfo.submitData.expressNo;
    this.informationInfo.submitData.expressCompany = this.informationInfo.submitData.expressCompanyCode;
    this.informationInfo.submitData.expressCompanyName = this.informationInfo.submitData.expressCompanyCode;
    this.showLoading();
    this.claim.submitPostData(this.informationInfo).subscribe(()=>{
      this.hideLoading();
      this.alert("提交成功",()=>{
        this.setTabSessionVaule(3,3,"status3");
      })
    },(err:Error)=>{
      if(JSON.parse(JSON.stringify(err)).status==401){
        this.handleError('401');
      }else{
        this.handleError(err)
      }
    })
  }
  setTabSessionVaule(mTab,status,statusId){
    this.auth.setsessionmTab('mTab',mTab)
    this.auth.setsessioncaseStatus('caseStatus',status)
    this.auth.setsessionstatusId('statusId',statusId)
    window.history.back()
  }
  cancel(remark){
    var cancelData = {
      "_id": this.policyDetail._id,
      "cancelData": {
        "remark": remark
      }
    }
    this.showLoading();
    this.claim.cancel(cancelData).subscribe(data=>{
        this.hideLoading();
        this.alert('提交成功',()=>{
          this.setTabSessionVaule(5,5,'status5')
        })
    },(err:Error)=>{
      this.hideLoading();
      if(JSON.parse(JSON.stringify(err)).status==401){
          this.auth.logout();
          setTimeout(()=>{
            this.router.navigateByUrl('/login')
          },1000)
      }else{
        this.alert(err)
      }
    })
  }
  applyChange(i,value){
    this.acceptedData.postData.applyDataList[i]=value
  }
  goBack(){
    window.history.back()
  }
  acceptedSave(){
    this.acceptedData.postData.applyDataList.push('')
  }
  acceptedDelete(i){
    this.acceptedData.postData.applyDataList.splice(i,1)
  }
  queryClaimDetail(){
    this.showLoading();
    this.claim.getClaimDetail(this.id).subscribe(data=>{
      this.hideLoading();
      console.log(data)
      this.policyDetail=data;
      this.contractInfo.contractNo = data.contractNo;
      this.contractInfo._id=data._id;
      this.contractInfo.source=data.source;
      this.contractInfo.mainInfo.idType=data.mainInfo.idType;
      this.contractInfo.mainInfo.idNo=data.mainInfo.idNo;
      this.contractInfo.mainInfo.name=data.mainInfo.name;
      this.contractInfo.mainInfo.mobile=data.mainInfo.mobile;
      this.contractInfo.mainInfo.applySituation=data.mainInfo.applySituation;
      this.contractInfo.mainInfo.applyDate=this.commonservice.getFormat(data.mainInfo.applyDate)
      this.contractInfo.mainInfo.applyAddr.province = data.mainInfo.applyAddr.province;
      this.contractInfo.mainInfo.applyAddr.city = data.mainInfo.applyAddr.city;
      this.contractInfo.mainInfo.applyAddr.area = data.mainInfo.applyAddr.area;
      this.contractInfo.mainInfo.applyAddr.detail = data.mainInfo.applyAddr.detail;
      this.acceptedData._id = data._id;
      if(data.postData&&data.postData.length>0) {
        this.acceptedData.postData = data.postData[data.postData.length - 1];
        this.acceptedData.postData.operationDate = this.commonservice.getFormat(this.acceptedData.postData.operationDate);
        if (!this.acceptedData.postData.operationDate) {
          this.acceptedData.postData.operationDate = this.commonservice.getFormat(new Date())
        }
      }else{
        this.acceptedData.postData.operationDate = this.commonservice.getFormat(new Date())
      }
        this.informationInfo._id=data._id;
        this.registerInfo._id=data._id;
        this.settleDataInfo._id=data._id;
        if(data.submitData&&data.submitData.length>0){
          this.informationInfo.submitData = data.submitData[data.submitData.length - 1];
          this.informationInfo.submitData.postDate = this.commonservice.getFormat(this.informationInfo.submitData.postDate);
          this.informationInfo.submitData.operationDate = this.commonservice.getFormat(this.informationInfo.submitData.operationDate);
          if (!this.informationInfo.submitData.operationDate) {
            this.informationInfo.submitData.operationDate = this.commonservice.getFormat(new Date());
            delete this.informationInfo.submitData._id;
          }
        }else {
          this.informationInfo.submitData.operationDate = this.commonservice.getFormat(new Date());
        }
          if (data.registerData) {
            this.registerInfo.registerData = data.registerData;
            this.registerInfo.registerData.operationDate = this.commonservice.getFormat(this.registerInfo.registerData.operationDate);
            if (!this.registerInfo.registerData.operationDate)
              this.registerInfo.registerData.operationDate = this.commonservice.getFormat(new Date());
          } else {
            this.registerInfo.registerData.operationDate = this.commonservice.getFormat(new Date());
          }
          if (data.settleData) {
            this.settleDataInfo.settleData = data.settleData;
            this.settleDataInfo.settleData.operationDate = this.commonservice.getFormat(data.settleData.operationDate);
            if (!this.settleDataInfo.settleData.operationDate)
              this.settleDataInfo.settleData.operationDate = this.commonservice.getFormat(new Date());
          } else {
            this.settleDataInfo.settleData.operationDate = this.commonservice.getFormat(new Date());
          }
          this.intervalObser=IntervalObservable.create(100).subscribe(()=>{
            this.startCountdown()
          })
    },(err:Error)=>{
      this.hideLoading();
      if(JSON.parse(JSON.stringify(err)).status == 401){
        this.auth.logout();
        setTimeout(() => this.router.navigateByUrl('/login'), 1000);
      }else{
        this.handleError(err)
      }
    })
  }
  startCountdown(){
    this.initDataCalendar()
    this.intervalObser.unsubscribe();
  }
  initDataCalendar(){
    switch(this.policyDetail.status){
      case 0:
            this.commonservice.getClaimCalendar(0,this.contractInfo.mainInfo);
            break;
      case 1:
            this.commonservice.getClaimCalendar(1,this.acceptedData.postData);
            break;
      case 2:
            this.commonservice.getClaimCalendar(2 ,this.informationInfo.submitData);
            break;
      case 3:
            this.commonservice.getClaimCalendar(3,this.registerInfo.registerData);
            break;
      case 4:
            this.commonservice.getClaimCalendar(4,this.settleDataInfo.settleData);
            break;

    }
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
}
