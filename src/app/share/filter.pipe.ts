import{Pipe,PipeTransform} from "@angular/core";
@Pipe(
     { name: 'insurenameFormat' }
)
export class InsurenameFormat implements PipeTransform{
  transform(insureName:string,insureList:any){
     let name='';
     if(insureName){
       name=insureName
     }else if(insureList){
       insureList.forEach((val,idx,arr)=>{
         if(idx==arr.length-1){
           name+=val.insurename
         }else{
           name+=val.insurename+','
         }
       })
     }
     return name
  }
}
@Pipe({ name: 'pidnoFormat' })
export class PidnoFormat implements PipeTransform {
  transform(pidno: string, insuredList: any) {
    var number = '';
    if (pidno) {
      number = pidno;
    } else if(insuredList){
      for (var i = 0; i < insuredList.length; i++) {
        if (i == insuredList.length - 1) {
          number = number + insuredList[i].pidno
        } else {
          number = number + insuredList[i].pidno + ',';
        }
      }
    }
    return number;
  }
}
