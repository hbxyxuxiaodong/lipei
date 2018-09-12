import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
declare var $: any;
export class BasePage{
  tipMsg:string;
  loadFlag:Boolean = true;
  constructor(
    public router:Router,
    public auth:AuthService
  ){}
  showLoading(){
    let loader=`
   <div id="loadingCover" class="ui page dimmer">
                        <div class="content">
                            <div class="center">
                                <div class="ui  text loader">加载中...</div>
                            </div>
                        </div>
                    </div>
               `
    if($('#loadingCover').length==0){
      $('body').append(loader)
    }
    this.loadFlag=true;
    setTimeout(()=>{
      if(this.loadFlag==true){
        $('#loadingCover').dimmer('show');
      }
    },1000)
  }
  hideLoading(){
    $('#loadingCover').dimmer('hide');
    $('.dimmer').remove();
    this.loadFlag = false;
  }
  handleError(err) {
    console.log(err);
    if (this.relogin(err)) {
      this.hideLoading();
      return;
    }
    if (err['ok'] == false) {
      this.hideLoading();
      this.alert('似乎出现了点问题，请稍后重试或联系管理员');
      return;
    }
    this.alert(err);
  }
  relogin(err) {
    if (err == 400) {
      this.auth.logout();
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }
  alert(errMsg, cb?) {
    this.tipMsg = errMsg;
    var model = `<div id="tipModal" class="ui tip modal" >
                        <div class="header">
                            信息提示
                        </div>
                        <div class="content" style="text-align: center;">
                            
                        </div>
                        <div class="actions">
                            <div class="ui button primary" onclick=" $('#tipModal').modal('hide');">确定</div>
                        </div>
                    </div>`;

    if ($('#tipModal').length == 0) {
      console.log("tipModal不存在");
      $('body').append(model);
    }
    console.log("typeof cb:"+typeof cb);
    $('#tipModal').modal({
      'onHidden': () => {
        if (cb && typeof cb == 'function') {
          cb();
        }
        $("#tipModal").parent(".dimmer").remove();
      }
    });
    $('#tipModal').find('.content').html(errMsg);
    $('#tipModal').modal('show');
  }
}
