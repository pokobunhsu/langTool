var server = "http://localhost:5555/";
$("#remember").sisyphus({
    timeout: 1
});
var version = "0614b-610e6da";
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
        document.getElementById("pd").innerHTML += "<img src='" + JDATA.data.headimg_web + "' style='border-radius:200px' width=100px><br>";
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
        //alert(JDATA.ret_msg);
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
        //alert(JDATA.ret_msg);
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
// function golangWeb(id,uid){
//     try {
//         var url_string = $("#langLiveid").val(); 
//         var url = new URL(url_string);
//         id = url.searchParams.get("live_id");
//         url = "../langWeb/index.html?token="+$("#langToken").val()+"&userid="+$("#langUid").val()+"&live_id="+id;
//         window.open(url);
//     } catch (error) {
//         alert("輸入的資訊有誤，請重新輸入");
//     }
// }
function getliveid() {
    let liver_uid = $("#langLiveuid").val(); 
    var token = $("#langToken").val();
    var uid = $("#langUid").val();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', server + 'https://langapi.lv-show.com/v2/user/user_live_info');
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
    xhr.send(`pfid=${liver_uid}`);
    xhr.addEventListener("load", transferComplete);
    function transferComplete(evt) {
        var JDATA = JSON.parse(xhr.responseText);
        if(JDATA.ret_code==600){
            alert('會話過期，請回到登入頁面重新登入');
        }else{
            if(JDATA.data.live_id != ""){
                url = "../langWeb/index.html?token="+$("#langToken").val()+"&userid="+$("#langUid").val()+"&live_id="+JDATA.data.live_id;
                window.open(url);
            }else{
                alert('你輸入的主播還沒有開播喔!');
            } 
        }
    }
}
function hourrank(option){
    $('#refresh_rank').text('更新中...');
    let liver_uid = $("#langLiveuid").val(); 
    var token = $("#langToken").val();
    var uid = $("#langUid").val();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', server + 'https://langapi.lv-show.com/v3/home/hour_rank?type=2&group=3&longitude=&latitude=');
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
        $('#refresh_rank').text('點我重新整理');
        var JDATA = JSON.parse(xhr.responseText);
        var top = 0 ;
        if(option == "r"){
            $('#rank').html('');
        }
        for(i=0;i<JDATA.data.length;i++){
            for(j=0;j<JDATA.data[i].list.length;j++){
                try {
                    if(JDATA.data[i].list[j].jump.li == ""){
                        var state = "已關播";
                        top++; 
                    }else{
                        var state = "前往直播";
                        top++;
                    }
                    //console.log(JDATA.data[i].list[j]);
                    $('#rank').html(`${$('#rank').html()}<div style="border-radius: 30px;padding: 10px;margin: 10px;background-color: white;">
                    <img src='${JDATA.data[i].list[j].img}'
                        width="100px" style="border-radius:30px;padding: 10px;">
                    [Top${top}]--${JDATA.data[i].list[j].jump.name}
                    <div class="text-right">
                        <button type="button" class="btn btn-info" style="border-radius: 30px;" onclick="goLangWeb('${JDATA.data[i].list[j].jump.li}');">${state}</button>
                    </div>
                    </div>`);
                    // $('#rank').html(`${$('#rank').html()}<div style="border: solid 0.5px; border-radius: 30px;padding: 10px;margin: 2px;height:60px;">
                    // [Top${top}]--${JDATA.data[i].list[j].jump.name}
                    // <button type="button" class="btn btn-info float-right" onclick="goLangWeb('${JDATA.data[i].list[j].jump.li}');">${state}</button></div>`);
                    //console.log(JDATA.data[i].list[j].jump.name);
                } catch (error) {}
            }
        }
    }
}
function goLangWeb(id){
    if(id != ""){
        url = "../langWeb/index.html?token="+$("#langToken").val()+"&userid="+$("#langUid").val()+"&live_id="+id;
        window.open(url);
    }else{
        alert("我關播了還按我OAO");
    }
}
function whoslive(){
    $('#ttp_online').html('');
    let liver_uid = $("#langLiveuid").val(); 
    var token = $("#langToken").val();
    var uid = $("#langUid").val();
    let onlineNum = 0;
    let times = 0;
    let xhr = new XMLHttpRequest();
    let xhr2 = new XMLHttpRequest();
    let xhr3 = new XMLHttpRequest();
    xhr.open('POST', server + 'https://langapi.lv-show.com/v2/friend/follow_list');
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
    xhr.send('pfid=4373343&latitude=&page=1&longitude=');
    xhr.addEventListener("load", transferComplete);
    function transferComplete(evt) {
        JDATA = JSON.parse(xhr.responseText);
        for(i=0;i<JDATA.data.list.length;i++){
                try {
                    if(JDATA.data.list[i].live_status == 0){
                        var state = "已關播";
                        var btn_color = "light";
                    }else{
                        onlineNum++;
                        var state = "手刀當DD吧";
                        var btn_color = "warning";
                        $('#ttp_online').html(`${$('#ttp_online').html()}<div style="border-radius: 30px;padding: 10px;margin: 10px;background-color: white;">
                        <img src='${JDATA.data.list[i].headimg}'
                            width="100px" style="border-radius:30px;padding: 10px;">
                        ${JDATA.data.list[i].nickname}
                        <div class="text-right">
                            <button type="button" class="btn btn-${btn_color}" style="border-radius: 30px;" onclick="goLangWeb('${JDATA.data.list[i].live_id}');">${state}</button>
                        </div>
                        </div>`);
                    }
                } catch (error) {}
        }loadok();
    }
    xhr2.open('POST', server + 'https://langapi.lv-show.com/v2/friend/follow_list');
    xhr2.setRequestHeader('PLATFORM', 'WEB');
    xhr2.setRequestHeader('LOCALE', 'TW');
    xhr2.setRequestHeader('USER-TOKEN', token);
    xhr2.setRequestHeader('VERSION', '5.0.0.7');
    xhr2.setRequestHeader('API-VERSION', '2.0');
    xhr2.setRequestHeader('USER-UID', uid);
    xhr2.setRequestHeader('DEVICE-ID', devid);
    xhr2.setRequestHeader('USER-MPHONE-OS-VER', '9');
    xhr2.setRequestHeader('VERSION-CODE', '1280');
    xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr2.send('pfid=4373343&latitude=&page=2&longitude=');
    xhr2.addEventListener("load", transferComplete2);
    function transferComplete2(evt) {
        JDATA = JSON.parse(xhr2.responseText);
        for(i=0;i<JDATA.data.list.length;i++){
                try {
                    if(JDATA.data.list[i].live_status == 0){
                        var state = "已關播";
                        var btn_color = "light";
                    }else{
                        onlineNum++;
                        var state = "手刀當DD吧";
                        var btn_color = "warning";
                        $('#ttp_online').html(`${$('#ttp_online').html()}<div style="border-radius: 30px;padding: 10px;margin: 10px;background-color: white;">
                        <img src='${JDATA.data.list[i].headimg}'
                            width="100px" style="border-radius:30px;padding: 10px;">
                        ${JDATA.data.list[i].nickname}
                        <div class="text-right">
                            <button type="button" class="btn btn-${btn_color}" style="border-radius: 30px;" onclick="goLangWeb('${JDATA.data.list[i].live_id}');">${state}</button>
                        </div>
                        </div>`);
                    }
                } catch (error) {}
        }loadok();
    }
    xhr3.open('POST', server + 'https://langapi.lv-show.com/v2/friend/follow_list');
    xhr3.setRequestHeader('PLATFORM', 'WEB');
    xhr3.setRequestHeader('LOCALE', 'TW');
    xhr3.setRequestHeader('USER-TOKEN', token);
    xhr3.setRequestHeader('VERSION', '5.0.0.7');
    xhr3.setRequestHeader('API-VERSION', '2.0');
    xhr3.setRequestHeader('USER-UID', uid);
    xhr3.setRequestHeader('DEVICE-ID', devid);
    xhr3.setRequestHeader('USER-MPHONE-OS-VER', '9');
    xhr3.setRequestHeader('VERSION-CODE', '1280');
    xhr3.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr3.send('pfid=4373343&latitude=&page=3&longitude=');
    xhr3.addEventListener("load", transferComplete3);
    function transferComplete3(evt) {
        JDATA = JSON.parse(xhr3.responseText);
        for(i=0;i<JDATA.data.list.length;i++){
                try {
                    if(JDATA.data.list[i].live_status == 0){
                        var state = "已關播";
                        var btn_color = "light";
                    }else{
                        onlineNum++;
                        var state = "手刀當DD吧";
                        var btn_color = "warning";
                        $('#ttp_online').html(`${$('#ttp_online').html()}<div style="border-radius: 30px;padding: 10px;margin: 10px;background-color: white;">
                        <img src='${JDATA.data.list[i].headimg}'
                            width="100px" style="border-radius:30px;padding: 10px;">
                        ${JDATA.data.list[i].nickname}
                        <div class="text-right">
                            <button type="button" class="btn btn-${btn_color}" style="border-radius: 30px;" onclick="goLangWeb('${JDATA.data.list[i].live_id}');">${state}</button>
                        </div>
                        </div>`);
                    }
                } catch (error) {}
        }loadok();
    }
    function loadok(){
        times++;
        if(times == 3){
            if(onlineNum == 0){
                $('#ttp_online').html(`都還在休息，晚點再進來看吧!`);
            }
        }
    }
}


function qrLogin(){
    let serverTime;
    let token;
    let uuid;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', server + 'https://api.kingkongapp.com/webapi/v1/login/create');
    xhr.setRequestHeader('PLATFORM', 'WEB');
    xhr.setRequestHeader('CHANNEL', 'KINGKONG');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
    xhr.addEventListener("load", transferComplete);
    function transferComplete(evt) {
        JDATA = JSON.parse(xhr.responseText);
        console.log(JDATA);
        uuid = JDATA.data.uuid;
        token = JDATA.data.token;
        serverTime = JDATA.data.server_time;
        $('#qrcode').qrcode(JDATA.data.qrcode_data);
        times = 0;
        qrVerify(uuid,serverTime,token);
    }
}
var times = 0;
function qrVerify(uuid,time,token){
    if(times >= 5){
        document.getElementById("qrcode").innerHTML = "";
        alert("閒置過久，請重新取得QRCODE(動作請於15秒內完成)");
    }else{
        let xhr = new XMLHttpRequest();
        xhr.open('POST', server + 'https://api.kingkongapp.com/webapi/v1/login/qrcode/verify');
        xhr.setRequestHeader('PLATFORM', 'WEB');
        xhr.setRequestHeader('CHANNEL', 'KINGKONG');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`uuid=${uuid}&_=${time}&token=${token}`);
        xhr.addEventListener("load", transferComplete);
        function transferComplete(evt) {
            JDATA = JSON.parse(xhr.responseText);
            console.log(JDATA);
            if(JDATA.data.access_token != undefined){
                document.getElementById("qrcode").innerHTML = "";
                document.getElementById("langToken").value = JDATA.data.access_token;
                document.getElementById("langUid").value = JDATA.data.uid;
                alert("成功透過[QRCODE]取得 token&uid");
            }else{
                setTimeout(`qrVerify("${uuid}",${time},"${token}")`,3000);
                times++;
            }
        }
    }
}



window.onload=function(){
    this.personal();
    hourrank();
    whoslive();
    document.getElementById("ver").innerText=this.version;
}