import {Injectable} from "@angular/core";
declare var $:any;
@Injectable()
export class CommonService{
  constructor(){

  }
  getFormat(date) {
    if (!date) return '';
    date = new Date(date);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    second = second < 10 ? "0" + second : second;
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + second;
  }
  today: any = new Date();
  text: any = {
    days: ['日', '一', '二', '三', '四', '五', '六'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    today: '今天',
    now: '现在',
    am: '上午',
    pm: '下午'
  }
  format: any = {
    date: function (date) {
      if (!date) return '';
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      let second = date.getSeconds();
      day = day < 10 ? "0" + day : day;
      month = month < 10 ? "0" + month : month;
      hour = hour < 10 ? "0" + hour : hour;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      second = second < 10 ? "0" + second : second;
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + second;
    }
  }

  getClaimCalendar(status,mode){
      switch (status){
        case 0:
          $('#startDateCal').calendar({
            type:'date',
            formatter:this.format,
            onChange:(date,text)=>{
                mode.applyDate=text
            },
            text:this.text,
          })
          break;
        case 1:
          $("#acceptData").calendar({
            type: 'date',
            formatter: this.format,
            onChange: (date, text) => {
              mode.operationDate = text;
            },
            text: this.text,
          });
          break;
        case 2:
          $("#materialDateCal").calendar({
            type: 'date',
            formatter: this.format,
            onChange: (date, text) => {
              mode.postDate = text;
            },
            text: this.text,
          });
          break;
        case 3:
          $("#informationDateCal").calendar({
            type: 'date',
            formatter: this.format,
            onChange: (date, text) => {
              mode.operationDate = text;
            },
            text: this.text,
          });
          break;
        case 4:
          $("#closedInformationnDateCal").calendar({
            type: 'date',
            formatter: this.format,
            onChange: (date, text) => {
              mode.operationDate = text;
            },
            text: this.text,
          });
          break;
        case 5:
          $("#operatingMaterialDateCal").calendar({
            type: 'date',
            formatter: this.format,
            onChange: (date, text) => {
              mode.operationDate = text;
            },
            text: this.text,
          });
          break;
      }
  }
}
