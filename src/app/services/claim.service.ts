import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Http,Headers,Response,RequestOptions} from "@angular/http";
import {environment} from "../../environments/environment";
@Injectable()
export class ClaimService {

  constructor(public http:Http,public auth:AuthService) {

  }
  getOptions(){
    let headers=new Headers();
    headers.append('token',this.auth.getJwtToken());
    let options=new RequestOptions({headers:headers})
    return options
  }
  createReqObject(data) {
    var obj: any = {};
    obj.from = 'claim-ui';
    obj.to = 'claim';
    obj.data = data;
    return JSON.stringify(obj);
  }
  cancel(cancelData) {
    return this.http.post(environment.url.claim + '/claim/cancel', this.createReqObject(cancelData), this.getOptions()).map((res: Response) => {
      let body = res.json();
      console.log(JSON.stringify(body));
      if (body.code != '000') {
        if (body.code == '400') {
          throw '400';
        } else {
          throw body.msg;
        }
      }
      return body.data;
    });
  }
  submitPostData(informationInfo) {

    return this.http.post(environment.url.claim + '/claim/submitPostData', this.createReqObject(informationInfo), this.getOptions()).map((res: Response) => {
      let body = res.json();
      console.log(JSON.stringify(body));
      if (body.code != '000') {
        if (body.code == '400') {
          throw '400';
        } else {
          throw body.msg;
        }
      }
      return body.data;
    });
  }

  getProviders() {
    return this.http.get(environment.url.opr + '/api/provider/signProviders', this.getOptions()).map((res: Response) => {
      let body = res.json();
      if (body.code != '000') {
        if (body.code == '400') {
          throw new Error('400');
        } else {
          throw new Error(body.msg);
        }
      }
      return body;
    });
  }
  queryClaim(data) {
    return this.http.post(environment.url.claim + '/claim/pagingQuery', this.createReqObject(data), this.getOptions()).map((res: Response) => {
      let body = res.json();
      if (body.code != '000') {
        if (body.code == '400') {
          throw '400';
        } else {
          throw body.msg;
        }
      }
      return body.data;
    });
  }
  settle(settleDataInfo){
    return this.http.post(environment.url.claim+'/claim/settle',this.createReqObject(settleDataInfo),this.getOptions()).map((res:Response)=>{
      let body =res.json();
      if(body.code!=='000'){
        if(body.code==400){
          throw  new Error('400')
        }else{
          throw new Error(body.msg)
        }
      }
      return body.data;
    })
  }
  submitProcess(contractInfo) {
    return this.http.post(environment.url.claim + '/claim/saveClaim', this.createReqObject(contractInfo), this.getOptions()).map((res: Response) => {
      let body = res.json();
      console.log(JSON.stringify(body));
      if (body.code != '000') {
        if (body.code == '400') {
          throw '400';
        } else {
          throw body.msg;
        }
      }
      return body.data;
    });
  }

  temporary(contractInfo) {

    return this.http.post(environment.url.claim + '/claim/saveTemp', this.createReqObject(contractInfo), this.getOptions()).map((res: Response) => {
      let body = res.json();
      console.log(JSON.stringify(body));
      if (body.code != '000') {
        if (body.code == '400') {
          throw '400';
        } else {
          throw body.msg;
        }
      }
      return body.data;
    });
  }

  reject(rejectDataInfo) {
    return this.http.post(environment.url.claim + '/claim/reject', this.createReqObject(rejectDataInfo), this.getOptions()).map((res: Response) => {
      let body = res.json();
      console.log(JSON.stringify(body));
      if (body.code != '000') {
        if (body.code == '400') {
          throw '400';
        } else {
          throw body.msg;
        }
      }
      return body.data;
    });
  }
  returnCase(registerInfo) {
    return this.http.post(environment.url.claim + '/claim/return', this.createReqObject(registerInfo), this.getOptions()).map((res: Response) => {
      let body = res.json();
      console.log(JSON.stringify(body));
      if (body.code != '000') {
        if (body.code == '400') {
          throw '400';
        } else {
          throw body.msg;
        }
      }
      return body.data;
    });
  }
  getAreas(){
    return this.http.get(environment.url.static+'/city.json').map((res:Response)=>{
      let body=res.json();
      return body;
    })
  }
  register(registerInfo) {
    return this.http.post(environment.url.claim + '/claim/register', this.createReqObject(registerInfo), this.getOptions()).map((res: Response) => {
      let body = res.json();
      console.log(JSON.stringify(body));
      if (body.code != '000') {
        if (body.code == '400') {
          throw '400';
        } else {
          throw body.msg;
        }
      }
      return body.data;
    });
  }
  accepted(applyDataList) {
    return this.http.post(environment.url.claim + '/claim/applyHandle', this.createReqObject(applyDataList), this.getOptions()).map((res: Response) => {
      let body = res.json();
      console.log(JSON.stringify(body));
      if (body.code != '000') {
        if (body.code == '400') {
          throw '400';
        } else {
          throw body.msg;
        }
      }
      return body.data;
    });
  }
  getClaimDetail(id){
    return this.http.get(environment.url.claim+'/claim/id/'+id,this.getOptions()).map((res:Response)=>{
      let body=res.json();
      if (body.code != '000') {
        if (body.code == '400') {
          throw new Error('400');
        } else {
          throw new Error(body.msg);
        }
      }
      return body.data;
    })
  }

  getBranchNameAll(){
    return this.http.get(environment.url.opr+'/api/branch/branchLevel?isAll=ALL',this.getOptions()).map((res:Response)=>{
      let body=res.json()
      console.log(res,body)
      if(body.code!=='000'){
        if(body.code==='400'){
          throw new Error('400')
        }else{
          throw new Error(body.msg)
        }
      }
      return body;
    })
  }
  searchPolicyByIdNumber(query){
    return this.http.get(environment.url.panda+'/contracts?query='+query,this.getOptions()).map((res:Response)=>{
      let body=res.json();
      if(body.code!=='000'){
        if(body.code==='400'){
          throw new Error('400')
        }else{
          throw new Error(body.msg)
        }
      }
      return body.data
    })
  }
}
