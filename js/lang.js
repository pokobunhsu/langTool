var server = "http://localhost:5555/";
$("#remember").sisyphus({
    timeout: 1
});
var version = "0518a-01afb4f";
var taskclick = 0;
var devid = Math.random().toString(36).substr(2, 678) + Date.now().toString(36).substr(4, 585);
function taskcenter() {
    var actsum = 0;
    var token = $("#langToken").val();
    var uid = $("#langUid").val();
    if (taskclick == 0) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', server + 'https://langapi.lv-show.com/v3/task_center/list');
        xhr.setRequestHeader('PLATFORM', 'WEB');
        xhr.setRequestHeader('LOCALE', 'TW');
        xhr.setRequestHeader('USER-TOKEN', token);
        xhr.setRequestHeader('VERSION', '5.0.0.7');
        xhr.setRequestHeader('API-VERSION', '2.0');
        xhr.setRequestHeader('USER-UID', uid);
        xhr.setRequestHeader('DEVICE-ID', devid);
        xhr.setRequestHeader('USER-MPHONE-OS-VER', '9');
        xhr.setRequestHeader('VERSION-CODE', '1280');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
        xhr.addEventListener("load", transferComplete);
        var tcdiv = document.getElementById("tc");
        function transferComplete(evt) {
            taskclick = 1;
            var JDATA = JSON.parse(xhr.responseText);
            for (i = 0; i < JDATA.data.general[0].t_list.length; i++) {
                var d = JDATA.data.general[0].t_list[i];
                if (d.t_state == 1) {
                    tcdiv.innerHTML +='<div class="list-group"><a class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">'
                    +d.t_title+'</h5><small></small>'+'獲得內容'+'</small></div><p style="margin-top: 10px;width:70%">'
                    +d.t_des+'</p><button type="button" class="btn btn-warning float-right" style="margin-top:-30px" onclick="receive('
                    +d.t_id + ',' + d.t_type + ');">領取</button></a></div>';
                } else {
                    if (d.t_state == 2) {
                        tcdiv.innerHTML +='<div class="list-group"><a class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">'
                        +d.t_title+'</h5><small></small>'+'獲得內容'+'</small></div><p style="margin-top: 10px;width:70%">'
                        +d.t_des+'</p><button type="button" class="btn btn-success float-right" style="margin-top:-30px" disabled="disabled">已完成</button></a></div>';
                     } else {
                        tcdiv.innerHTML +='<div class="list-group"><a class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">'
                        +d.t_title+'</h5><small></small>'+'獲得內容'+'</small></div><p style="margin-top: 10px;width:70%">'
                        +d.t_des+'</p><button type="button" class="btn btn-danger float-right" style="margin-top:-30px" disabled="disabled">尚未完成</button></a></div>';
                     }
                };
            }
            for (i = 0; i < JDATA.data.active.length; i++) {
                actsum += JDATA.data.active[i].t_current;
                if (JDATA.data.active[i].t_state == 2) {
                    document.getElementById("act" + i).innerHTML = "<font color='blue'>已領取</font>";
                }
            }
            d = JDATA.data.clock;
            if (d.t_state == 1) {
                tcdiv.innerHTML +='<div class="list-group"><a class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">'
                +"每小時領取"+'</h5><small></small>'+'20金幣'+'</small></div><p style="margin-top: 10px;width:70%">'
                +'整點領取+20金幣(' + d.t_id + '點場)</p><button type="button" class="btn btn-warning float-right" style="margin-top:-30px" onclick="receive('
                +d.t_id + ',' + d.t_type + ');">領取</button></a></div>';
            } else {
                if (d.t_state == 2) {
                } else {
                    tcdiv.innerHTML +='<div class="list-group"><a class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">'
                    +"每小時領取"+'</h5><small></small>'+'20金幣'+'</small></div><p style="margin-top: 10px;width:70%">'
                    +'整點領取+20金幣(' + d.t_id + '點場)</p><button type="button" class="btn btn-success float-right" style="margin-top:-30px" disabled="disabled">尚未開始</button></a></div>';
                }
            }
            if (actsum >= 100) {
                imgSwitchFin("#yes25", "#no25");
                imgSwitchFin("#yes50", "#no50");
                imgSwitchFin("#yes75", "#no75");
                imgSwitchFin("#yes100", "#no100");
            } else if (actsum >= 75) {
                imgSwitchFin("#yes25", "#no25");
                imgSwitchFin("#yes50", "#no50");
                imgSwitchFin("#yes75", "#no75");
            } else if (actsum >= 50) {
                imgSwitchFin("#yes25", "#no25");
                imgSwitchFin("#yes50", "#no50");
            } else if (actsum >= 25) {
                imgSwitchFin("#yes25", "#no25");
            }
            document.getElementById("act").style.width = actsum + "%";
            document.getElementById("act").innerText = actsum + "%";
            document.getElementById("coin").innerText = JDATA.data.tt_gold;
            document.getElementById("money").innerText = "NT$ " + JDATA.data.tt_money;
            document.getElementById("time").innerText = Math.floor(JDATA.data.tt_watch / 60);

        }
    } else {
        document.getElementById("tc").innerHTML = "";
        taskclick = 0;
        taskcenter();
    }

}
function personal() {
    var token = $("#langToken").val();
    var uid = $("#langUid").val();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', server + 'https://langapi.lv-show.com/v2/passport/refresh_token');
    xhr.setRequestHeader('PLATFORM', 'WEB');
    xhr.setRequestHeader('LOCALE', 'TW');
    xhr.setRequestHeader('USER-TOKEN', token);
    xhr.setRequestHeader('VERSION', '5.0.0.7');
    xhr.setRequestHeader('API-VERSION', '2.0');
    xhr.setRequestHeader('USER-UID', uid);
    xhr.setRequestHeader('DEVICE-ID', devid);
    xhr.setRequestHeader('USER-MPHONE-OS-VER', '9');
    xhr.setRequestHeader('VERSION-CODE', '1280');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
    xhr.addEventListener("load", transferComplete);
    function transferComplete(evt) {
        var JDATA = JSON.parse(xhr.responseText);
        if(JDATA.ret_code==600){
            alert("會話過期，請重新登入");
        }
        //document.getElementById("pd").innerHTML += JDATA.data.access_token + "<br>";
        document.getElementById("pd").innerHTML += "<img src='" + JDATA.data.headimg + "' style='border-radius:200px' width=100px><br>";
        document.getElementById("pd").innerHTML += JDATA.data.nickname + "<br>";
        document.getElementById("pd").innerHTML += JDATA.data.sign + "<br>";
    }
}
function receive(id, type) {
    var token = $("#langToken").val();
    var uid = $("#langUid").val();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', server + 'https://langapi.lv-show.com/v3/task_center/receive');
    xhr.setRequestHeader('PLATFORM', 'WEB');
    xhr.setRequestHeader('LOCALE', 'TW');
    xhr.setRequestHeader('USER-TOKEN', token);
    xhr.setRequestHeader('VERSION', '5.0.0.7');
    xhr.setRequestHeader('API-VERSION', '2.0');
    xhr.setRequestHeader('USER-UID', uid);
    xhr.setRequestHeader('DEVICE-ID', devid);
    xhr.setRequestHeader('USER-MPHONE-OS-VER', '9');
    xhr.setRequestHeader('VERSION-CODE', '1280');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("t_id=" + id + "&t_type=" + type);
    xhr.addEventListener("load", transferComplete);
    function transferComplete(evt) {
        var JDATA = JSON.parse(xhr.responseText);
        alert(JDATA.ret_msg);
        if(JDATA.ret_msg != "您還沒有完成該任務"){
            taskcenter();
        }
        
    }
}
function sendsms() {
    var id = $("#phone").val();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', server + 'https://langapi.lv-show.com/v2/system/sms_code');
    xhr.setRequestHeader('PLATFORM', 'WEB');
    xhr.setRequestHeader('LOCALE', 'TW');
    xhr.setRequestHeader('USER-TOKEN', '');
    xhr.setRequestHeader('VERSION', '5.0.0.7');
    xhr.setRequestHeader('API-VERSION', '2.0');
    xhr.setRequestHeader('USER-UID', '');
    xhr.setRequestHeader('DEVICE-ID', devid);
    xhr.setRequestHeader('USER-MPHONE-OS-VER', '9');
    xhr.setRequestHeader('VERSION-CODE', '1280');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("cell=886" + id + "&type=1");
    xhr.addEventListener("load", transferComplete);
    function transferComplete(evt) {
        var JDATA = JSON.parse(xhr.responseText);
        if (JDATA.ret_msg == "ok") {
            alert("簡訊發送成功");
        } else {
            alert("請不要玩我，先去收簡訊，如果還是收不到請5分鐘後再試一次!");
        }
    }
}
function getpassport() {
    var id = $("#phone").val();
    var code = $("#passport").val();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', server + 'https://langapi.lv-show.com/v2/passport/mobile');
    xhr.setRequestHeader('PLATFORM', 'WEB');
    xhr.setRequestHeader('LOCALE', 'TW');
    xhr.setRequestHeader('USER-TOKEN', '');
    xhr.setRequestHeader('VERSION', '5.0.0.7');
    xhr.setRequestHeader('API-VERSION', '2.0');
    xhr.setRequestHeader('USER-UID', '');
    xhr.setRequestHeader('DEVICE-ID', devid);
    xhr.setRequestHeader('USER-MPHONE-OS-VER', '9');
    xhr.setRequestHeader('VERSION-CODE', '1280');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("cell=886" + id + "&token=" + code);
    xhr.addEventListener("load", transferComplete);
    function transferComplete(evt) {
        var JDATA = JSON.parse(xhr.responseText);
        if (JDATA.ret_code == -1) {
            alert("驗證碼錯誤!請重新輸入或是重新取得簡訊~");
        } else {
            document.getElementById("langToken").value = JDATA.data.access_token;
            document.getElementById("langUid").value = JDATA.data.pfid;
            alert("成功取得 token&uid");
        }
    }
}
function oldreceive(id, type) {
    var token = $("#langToken").val();
    var uid = $("#langUid").val();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', server + 'https://langapi.lv-show.com/v2/task/receive_sun_task_reward');
    xhr.setRequestHeader('PLATFORM', 'WEB');
    xhr.setRequestHeader('LOCALE', 'TW');
    xhr.setRequestHeader('USER-TOKEN', token);
    xhr.setRequestHeader('VERSION', '3.5.1.7');
    xhr.setRequestHeader('API-VERSION', '2.0');
    xhr.setRequestHeader('USER-UID', uid);
    xhr.setRequestHeader('DEVICE-ID', devid);
    xhr.setRequestHeader('USER-MPHONE-OS-VER', '9');
    xhr.setRequestHeader('VERSION-CODE', '764');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("task_id=" + id + "&task_type=" + type);
    xhr.addEventListener("load", transferComplete);
    function transferComplete(evt) {
        var JDATA = JSON.parse(xhr.responseText);
        alert(JDATA.ret_msg);
        oldtaskcenter();
    }
}
function oldtaskcenter() {
    var token = $("#langToken").val();
    var uid = $("#langUid").val();
    if (taskclick == 0) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', server + 'https://langapi.lv-show.com/v2/task/sun_task_list');
        xhr.setRequestHeader('PLATFORM', 'WEB');
        xhr.setRequestHeader('LOCALE', 'TW');
        xhr.setRequestHeader('USER-TOKEN', token);
        xhr.setRequestHeader('VERSION', '3.5.1.7');
        xhr.setRequestHeader('API-VERSION', '2.0');
        xhr.setRequestHeader('USER-UID', uid);
        xhr.setRequestHeader('DEVICE-ID', devid);
        xhr.setRequestHeader('USER-MPHONE-OS-VER', '9');
        xhr.setRequestHeader('VERSION-CODE', '764');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
        xhr.addEventListener("load", transferComplete);
        function transferComplete(evt) {
            taskclick = 1;
            var JDATA = JSON.parse(xhr.responseText);
            var tcdiv = document.getElementById("tc");
            for (i = 0; i < JDATA.data.look_live.length; i++) {
                if (JDATA.data.look_live[i].status == 2) {
                    tcdiv.innerHTML +='<div class="list-group"><a class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">練習生任務'
                    +'</h5><small></small>'+JDATA.data.look_live[i].award+'</small></div><p style="margin-top: 10px;width:70%">'
                    +JDATA.data.look_live[i].describe+'</p><button type="button" class="btn btn-warning float-right" style="margin-top:-30px" onclick="oldreceive('
                    +JDATA.data.look_live[i].task_id + ',' + JDATA.data.look_live[i].task_type + ');">領取</button></a></div>';
                } else {
                    if (JDATA.data.look_live[i].status == 1) {
                        tcdiv.innerHTML +='<div class="list-group"><a class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">練習生任務'
                        +'</h5><small></small>'+JDATA.data.look_live[i].award+'</small></div><p style="margin-top: 10px;width:70%">'
                        +JDATA.data.look_live[i].describe+'</p><button type="button" class="btn btn-success float-right" style="margin-top:-30px" disabled="disabled">已領取</button></a></div>';
                    } else {
                        tcdiv.innerHTML +='<div class="list-group"><a class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">練習生任務'
                        +'</h5><small></small>'+JDATA.data.look_live[i].award+'</small></div><p style="margin-top: 10px;width:70%">'
                        +JDATA.data.look_live[i].describe+'</p><button type="button" class="btn btn-danger float-right" style="margin-top:-30px">尚未完成</button></a></div>';
                    }
                };
            }
            for (i = 0; i < JDATA.data.look_new_anchor_live.length; i++) {
                if (JDATA.data.look_new_anchor_live[i].status == 2) {
                    tcdiv.innerHTML +='<div class="list-group"><a class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">練習生任務'
                    +'</h5><small></small>'+JDATA.data.look_new_anchor_live[i].award+'</small></div><p style="margin-top: 10px;width:70%">'
                    +JDATA.data.look_new_anchor_live[i].describe+'</p><button type="button" class="btn btn-warning float-right" style="margin-top:-30px" onclick="oldreceive('
                    +JDATA.data.look_new_anchor_live[i].task_id + ',' + JDATA.data.look_new_anchor_live[i].task_type + ');">領取</button></a></div>';
                } else {
                    if (JDATA.data.look_new_anchor_live[i].status == 1) {
                        tcdiv.innerHTML +='<div class="list-group"><a class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">練習生任務'
                        +'</h5><small></small>'+JDATA.data.look_new_anchor_live[i].award+'</small></div><p style="margin-top: 10px;width:70%">'
                        +JDATA.data.look_new_anchor_live[i].describe+'</p><button type="button" class="btn btn-success float-right" style="margin-top:10px" disabled="disabled">已領取</button></a></div>';
                    } else {
                        tcdiv.innerHTML +='<div class="list-group"><a class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">練習生任務'
                        +'</h5><small></small>'+JDATA.data.look_new_anchor_live[i].award+'</small></div><p style="margin-top: 10px;width:70%">'
                        +JDATA.data.look_new_anchor_live[i].describe+'</p><button type="button" class="btn btn-danger float-right" style="margin-top:10px">尚未完成</button></a></div>';
                    }
                };
            }
            if (JDATA.data.share_live.status == 2) {
                tcdiv.innerHTML +='<div class="list-group"><a class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">分享任務'
                    +'</h5><small></small>'+JDATA.data.share_live.award+'</small></div><p style="margin-top: 10px;width:70%">'
                    +JDATA.data.share_live.describe+ "(" + JDATA.data.share_live.current + "/" + JDATA.data.share_live.length + ")" +'</p><button type="button" class="btn btn-warning float-right" style="margin-top:-30px" onclick="oldreceive('
                    +JDATA.data.share_live.task_id + ',' + JDATA.data.share_live.task_type + ');">領取</button></a></div>';
            } else {
                if (JDATA.data.share_live.status == 1) {
                    tcdiv.innerHTML +='<div class="list-group"><a class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">分享任務'
                    +'</h5><small></small>'+JDATA.data.share_live.award+'</small></div><p style="margin-top: 10px;width:70%">'
                    +JDATA.data.share_live.describe+ JDATA.data.share_live.describe + "(" + JDATA.data.share_live.current + "/" + JDATA.data.share_live.length + ")" +'</p><button type="button" class="btn btn-success float-right" style="margin-top:-30px" disabled="disabled">三次都已領取</button></a></div>';
                } else {
                    tcdiv.innerHTML +='<div class="list-group"><a class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">分享任務'
                    +'</h5><small></small>'+JDATA.data.share_live.award+'</small></div><p style="margin-top: 10px;width:70%">'
                    +JDATA.data.share_live.describe+ JDATA.data.share_live.describe + "(" + JDATA.data.share_live.current + "/" + JDATA.data.share_live.length + ")" +'</p><button type="button" class="btn btn-danger float-right" style="margin-top:-30px" disabled="disabled">尚未完成</button></a></div>';
                }
            }
            document.getElementById("sun").innerText = JDATA.data.user_info.sun;

        }
    } else {
        document.getElementById("tc").innerHTML = "";
        taskclick = 0;
        oldtaskcenter();
    }
}
function imgSwitchFin(showid, hideid) {
    $(showid).show();
    $(hideid).hide();
}
function oldDailySign() {
    var token = $("#langToken").val();
    var uid = $("#langUid").val();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', server + 'https://langapi.lv-show.com/v3/gift/receiveSign');
    xhr.setRequestHeader('PLATFORM', 'WEB');
    xhr.setRequestHeader('LOCALE', 'TW');
    xhr.setRequestHeader('USER-TOKEN', token);
    xhr.setRequestHeader('VERSION', '3.5.1.7');
    xhr.setRequestHeader('API-VERSION', '2.0');
    xhr.setRequestHeader('USER-UID', uid);
    xhr.setRequestHeader('DEVICE-ID', devid);
    xhr.setRequestHeader('USER-MPHONE-OS-VER', '9');
    xhr.setRequestHeader('VERSION-CODE', '764');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
    xhr.addEventListener("load", transferComplete);
    function transferComplete(evt) {
        var JDATA = JSON.parse(xhr.responseText);
        if (JDATA.data.rewardList == null) {
            alert("簽到過了還想簽啊?下個時段再來吧孩子!");
        } else {
            var checkinGift = "";
            for (i = 0; i < JDATA.data.rewardList.length; i++) {
                checkinGift += JDATA.data.rewardList[i].name + "*" + JDATA.data.rewardList[i].num;
                if (i != (JDATA.data.rewardList.length - 1)) {
                    checkinGift += ",";
                }
            }
            var checkDAY = "你已連續簽到" + JDATA.data.signTimes + "天囉!";
            alert("今天成功簽到你領取的禮物為:" + checkinGift + checkDAY);
        }
    }
}
function checkinfo() {
    var token = $("#langToken").val();
    var uid = $("#langUid").val();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', server + 'https://langapi.lv-show.com/v3/gift/sign');
    xhr.setRequestHeader('PLATFORM', 'WEB');
    xhr.setRequestHeader('LOCALE', 'TW');
    xhr.setRequestHeader('USER-TOKEN', token);
    xhr.setRequestHeader('VERSION', '3.5.1.7');
    xhr.setRequestHeader('API-VERSION', '2.0');
    xhr.setRequestHeader('USER-UID', uid);
    xhr.setRequestHeader('DEVICE-ID', devid);
    xhr.setRequestHeader('USER-MPHONE-OS-VER', '9');
    xhr.setRequestHeader('VERSION-CODE', '764');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
    xhr.addEventListener("load", transferComplete);
    function transferComplete(evt) {
        var JDATA = JSON.parse(xhr.responseText);
        if (JDATA.data.rewardList == null) {
            document.getElementById("info").innerHTML = "今天簽到過嘞喔!請於下個時段簽到吧!";
        } else {
            document.getElementById("info").innerHTML="";
            for (i = 0; i < JDATA.data.rewardList.length; i++) {
                document.getElementById("info").innerHTML += JDATA.data.rewardList[i].name + "*" + JDATA.data.rewardList[i].num + "<br>";
            }
        }
    }
}
function golangWeb(id,uid){
    var url_string = $("#langLiveid").val(); 
    var url = new URL(url_string);
    id = url.searchParams.get("live_id");
    url = "../langWeb/index.html?token="+$("#langToken").val()+"&userid="+$("#langUid").val()+"&live_id="+id+"&live_uid="+uid;
    window.open(url);
}
window.onload=function(){
    this.personal();
    document.getElementById("ver").innerText=this.version;
}