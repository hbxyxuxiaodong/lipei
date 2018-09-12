import {Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import {ClaimService} from "../../services/claim.service";
@Component({
  selector: 'app-three-link',
  templateUrl: './three-link.component.html',
  styleUrls: ['./three-link.component.css']
})
export class ThreeLinkComponent implements OnInit {
  @Input() area:any;
  @Output() areaOut= new EventEmitter()
  provinceData:any;
  cityData:any;
  coutryData:any;
  areas:any;
  constructor(public claim:ClaimService) {
    this.provinceData=[];
    this.cityData=[];
    this.coutryData=[];
  }
  ngOnInit() {
    this.claim.getAreas().subscribe(data=>{
      console.log(data)
      console.log(JSON.stringify(data))
        this.areas=data;
        this.provinceData=this.areas.province;
        this.provinceChange()
    },(err:Error)=>{

    })
  }
  provinceChange(){
       for(var i=0;i<this.provinceData.length;i++){
         if(this.area.provinceName==this.provinceData[i].name){
           this.cityData=this.provinceData[i].city;
           break
         }
       }
       this.cityChange()
  }
  cityChange(){
    var exist=false;
    for(let i=0;i<this.cityData.length;i++){
      if(this.area.cityName==this.cityData[i].name){
        this.coutryData=this.cityData[i].county
        exist=true;
      }
    }
    if(!exist){
      if (this.cityData.length > 0) {
        this.area.cityCode = this.cityData[0].code;
        this.area.cityName = this.cityData[0].name;
        this.coutryData = this.cityData[0].county;
      }
    }
    this.countryChange()
  }
  countryChange(){
    var exist=false;
    for(var i=0;i<this.coutryData.length;i++){
      if(this.area.townCode==this.coutryData[i].code){
        this.area.townName=this.coutryData[i].name;
        exist=true;
      }
    }
    if (!exist) {
      console.log("");
      if (this.coutryData.length) {
        this.area.townCode = this.coutryData[0].code;
        this.area.townName = this.coutryData[0].name;
      }
    }
    this.areaOut.emit(this.area);
  }
}
