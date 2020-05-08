$("#remember").sisyphus({
    timeout: 1
});
var server = "http://localhost:8080/";
var taskclick = 0;
var devid = Math.random().toString(36).substr(2, 678) + Date.now().toString(36).substr(4, 585);
function taskcenter() {
    var actsum = 0;
    var token = $("#langToken").val();
    var uid = $("#langUid").val();
    if (taskclick == 0) {
        let xml1 = new XMLHttpRequest();
        xml1.open('POST', server + 'https://langapi.lv-show.com/v3/task_center/list');
        xml1.setRequestHeader('PLATFORM', 'WEB');
        xml1.setRequestHeader('LOCALE', 'TW');
        xml1.setRequestHeader('USER-TOKEN', token);
        xml1.setRequestHeader('VERSION', '5.0.0.7');
        xml1.setRequestHeader('API-VERSION', '2.0');
        xml1.setRequestHeader('USER-UID', uid);
        xml1.setRequestHeader('DEVICE-ID', devid);
        xml1.setRequestHeader('USER-MPHONE-OS-VER', '9');
        xml1.setRequestHeader('VERSION-CODE', '1280');
        xml1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xml1.send();
        xml1.addEventListener("load", transferComplete);
        function transferComplete(evt) {
            taskclick = 1;
            var JDATA = JSON.parse(xml1.responseText);
            for (i = 0; i < JDATA.data.general[0].t_list.length; i++) {
                if (JDATA.data.general[0].t_list[i].t_state == 1) {
                    document.getElementById("tc").innerHTML +=
                        '<div class="input-group mb-3"><input type="text" class="form-control" disabled="disabled" aria-describedby="basic-addon2" value="' +
                        JDATA.data.general[0].t_list[i].t_title + '-' + JDATA.data.general[0].t_list[i].t_des + '"><div class="input-group-append"><button class="btn btn-warning" type="button" onclick="receive(' +
                        JDATA.data.general[0].t_list[i].t_id + ',' + JDATA.data.general[0].t_list[i].t_type + ');">領取</button></div></div>';
                } else {
                    if (JDATA.data.general[0].t_list[i].t_state == 2) {
                        document.getElementById("tc").innerHTML += '<div class="input-group mb-3"><textarea type="text" class="form-control" disabled="disabled" aria-describedby="basic-addon2">' + JDATA.data.general[0].t_list[i].t_title + '-\n' + JDATA.data.general[0].t_list[i].t_des + '</textarea><div class="input-group-append"><button class="btn btn-outline-secondary" type="button">已完成</button></div></div>';
                    } else {
                        document.getElementById("tc").innerHTML += '<div class="input-group mb-3"><textarea type="text" class="form-control" disabled="disabled" aria-describedby="basic-addon2">' + JDATA.data.general[0].t_list[i].t_title + '-\n' + JDATA.data.general[0].t_list[i].t_des + '</textarea><div class="input-group-append"><button class="btn btn-outline-secondary" type="button">尚未完成</button></div></div>';
                    }
                };
            }
            for (i = 0; i < JDATA.data.active.length; i++) {
                actsum += JDATA.data.active[i].t_current;
            }
            if (JDATA.data.clock.t_state == 1) {
                document.getElementById("tc").innerHTML += '<div class="input-group mb-3"><input type="text" class="form-control" disabled="disabled" aria-describedby="basic-addon2" value="整點領取+20金幣(' + JDATA.data.clock.t_id + '點場)"><div class="input-group-append"><button class="btn btn-warning" type="button" onclick="receive(' +
                    JDATA.data.clock.t_id + ',' + JDATA.data.clock.t_type + ');">領取</button></div></div>';
            } else {
                if (JDATA.data.clock.t_state == 2) {
                    document.getElementById("tc").innerHTML += '<div class="input-group mb-3"><textarea type="text" class="form-control" disabled="disabled" aria-describedby="basic-addon2">整點領取+20金幣(' + JDATA.data.clock.t_id + '點場)</textarea><div class="input-group-append"><button class="btn btn-outline-secondary" type="button">已完成</button></div></div>';
                } else {
                    document.getElementById("tc").innerHTML += '<div class="input-group mb-3"><textarea type="text" class="form-control" disabled="disabled" aria-describedby="basic-addon2">整點領取+20金幣(' + JDATA.data.clock.t_id + '點場)</textarea><div class="input-group-append"><button class="btn btn-outline-secondary" type="button">尚未完成</button></div></div>';
                }
            }
            document.getElementById("act").style.width = actsum + "%";
            document.getElementById("act").innerText = actsum + "%";
            document.getElementById("coin").innerText = JDATA.data.tt_gold;
            document.getElementById("money").innerText = "NT$ " + JDATA.data.tt_money;
            document.getElementById("time").innerText = Math.floor((JDATA.data.tt_watch / 60));

        }
    } else {
        document.getElementById("tc").innerHTML = "";
        taskclick = 0;
        taskcenter();
    }

}
function personal() {
    $("#remember").sisyphus();
    var token = $("#langToken").val();
    var uid = $("#langUid").val();
    let xml1 = new XMLHttpRequest();
    xml1.open('POST', server + 'https://langapi.lv-show.com/v2/passport/refresh_token');
    xml1.setRequestHeader('PLATFORM', 'WEB');
    xml1.setRequestHeader('LOCALE', 'TW');
    xml1.setRequestHeader('USER-TOKEN', token);
    xml1.setRequestHeader('VERSION', '5.0.0.7');
    xml1.setRequestHeader('API-VERSION', '2.0');
    xml1.setRequestHeader('USER-UID', uid);
    xml1.setRequestHeader('DEVICE-ID', devid);
    xml1.setRequestHeader('USER-MPHONE-OS-VER', '9');
    xml1.setRequestHeader('VERSION-CODE', '1280');
    xml1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xml1.send();
    xml1.addEventListener("load", transferComplete);
    function transferComplete(evt) {
        var JDATA = JSON.parse(xml1.responseText);
        //document.getElementById("pd").innerHTML += JDATA.data.access_token + "<br>";
        document.getElementById("pd").innerHTML += "<img src='" + JDATA.data.headimg_web + "' style='border-radius:200px' width=100px><br>";
        document.getElementById("pd").innerHTML += JDATA.data.nickname + "<br>";
        document.getElementById("pd").innerHTML += JDATA.data.sign + "<br>";
    }
}
function receive(id, type) {
    var token = $("#langToken").val();
    var uid = $("#langUid").val();
    let xml1 = new XMLHttpRequest();
    xml1.open('POST', server + 'https://langapi.lv-show.com/v3/task_center/receive');
    xml1.setRequestHeader('PLATFORM', 'WEB');
    xml1.setRequestHeader('LOCALE', 'TW');
    xml1.setRequestHeader('USER-TOKEN', token);
    xml1.setRequestHeader('VERSION', '5.0.0.7');
    xml1.setRequestHeader('API-VERSION', '2.0');
    xml1.setRequestHeader('USER-UID', uid);
    xml1.setRequestHeader('DEVICE-ID', devid);
    xml1.setRequestHeader('USER-MPHONE-OS-VER', '9');
    xml1.setRequestHeader('VERSION-CODE', '1280');
    xml1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xml1.send("t_id=" + id + "&t_type=" + type);
    xml1.addEventListener("load", transferComplete);
    function transferComplete(evt) {
        var JDATA = JSON.parse(xml1.responseText);
        alert(JDATA.ret_msg);
        taskcenter();
    }
}
function sendsms() {
    var id = $("#phone").val();
    let xml1 = new XMLHttpRequest();
    xml1.open('POST', server + 'https://langapi.lv-show.com/v2/system/sms_code');
    xml1.setRequestHeader('PLATFORM', 'WEB');
    xml1.setRequestHeader('LOCALE', 'TW');
    xml1.setRequestHeader('USER-TOKEN', '');
    xml1.setRequestHeader('VERSION', '5.0.0.7');
    xml1.setRequestHeader('API-VERSION', '2.0');
    xml1.setRequestHeader('USER-UID', '');
    xml1.setRequestHeader('DEVICE-ID', devid);
    xml1.setRequestHeader('USER-MPHONE-OS-VER', '9');
    xml1.setRequestHeader('VERSION-CODE', '1280');
    xml1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xml1.send("cell=886" + id + "&type=1");
    xml1.addEventListener("load", transferComplete);
    function transferComplete(evt) {
        var JDATA = JSON.parse(xml1.responseText);
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
    let xml1 = new XMLHttpRequest();
    xml1.open('POST', server + 'https://langapi.lv-show.com/v2/passport/mobile');
    xml1.setRequestHeader('PLATFORM', 'WEB');
    xml1.setRequestHeader('LOCALE', 'TW');
    xml1.setRequestHeader('USER-TOKEN', '');
    xml1.setRequestHeader('VERSION', '5.0.0.7');
    xml1.setRequestHeader('API-VERSION', '2.0');
    xml1.setRequestHeader('USER-UID', '');
    xml1.setRequestHeader('DEVICE-ID', devid);
    xml1.setRequestHeader('USER-MPHONE-OS-VER', '9');
    xml1.setRequestHeader('VERSION-CODE', '1280');
    xml1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xml1.send("cell=886" + id + "&token=" + code);
    xml1.addEventListener("load", transferComplete);
    function transferComplete(evt) {
        var JDATA = JSON.parse(xml1.responseText);
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
    let xml1 = new XMLHttpRequest();
    xml1.open('POST', server + 'https://langapi.lv-show.com/v2/task/receive_sun_task_reward');
    xml1.setRequestHeader('PLATFORM', 'WEB');
    xml1.setRequestHeader('LOCALE', 'TW');
    xml1.setRequestHeader('USER-TOKEN', token);
    xml1.setRequestHeader('VERSION', '3.5.1.7');
    xml1.setRequestHeader('API-VERSION', '2.0');
    xml1.setRequestHeader('USER-UID', uid);
    xml1.setRequestHeader('DEVICE-ID', devid);
    xml1.setRequestHeader('USER-MPHONE-OS-VER', '9');
    xml1.setRequestHeader('VERSION-CODE', '764');
    xml1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xml1.send("task_id=" + id + "&task_type=" + type);
    xml1.addEventListener("load", transferComplete);
    function transferComplete(evt) {
        var JDATA = JSON.parse(xml1.responseText);
        alert(JDATA.ret_msg);
        oldtaskcenter();
    }
}
function oldtaskcenter() {
    var token = $("#langToken").val();
    var uid = $("#langUid").val();
    if (taskclick == 0) {
        let xml1 = new XMLHttpRequest();
        xml1.open('POST', server + 'https://langapi.lv-show.com/v2/task/sun_task_list');
        xml1.setRequestHeader('PLATFORM', 'WEB');
        xml1.setRequestHeader('LOCALE', 'TW');
        xml1.setRequestHeader('USER-TOKEN', token);
        xml1.setRequestHeader('VERSION', '3.5.1.7');
        xml1.setRequestHeader('API-VERSION', '2.0');
        xml1.setRequestHeader('USER-UID', uid);
        xml1.setRequestHeader('DEVICE-ID', devid);
        xml1.setRequestHeader('USER-MPHONE-OS-VER', '9');
        xml1.setRequestHeader('VERSION-CODE', '764');
        xml1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xml1.send();
        xml1.addEventListener("load", transferComplete);
        function transferComplete(evt) {
            taskclick = 1;
            var JDATA = JSON.parse(xml1.responseText);
            for (i = 0; i < JDATA.data.look_live.length; i++) {
                if (JDATA.data.look_live[i].status == 2) {
                    document.getElementById("tc").innerHTML +=
                        '<div class="input-group mb-3"><input type="text" class="form-control" disabled="disabled" aria-describedby="basic-addon2" value="' +
                        JDATA.data.look_live[i].describe + '"><div class="input-group-append"><button class="btn btn-warning" type="button" onclick="oldreceive(' +
                        JDATA.data.look_live[i].task_id + ',' + JDATA.data.look_live[i].task_type + ');">領取</button></div></div>';
                } else {
                    if (JDATA.data.look_live[i].status == 1) {
                        document.getElementById("tc").innerHTML += '<div class="input-group mb-3"><textarea type="text" class="form-control" disabled="disabled" aria-describedby="basic-addon2">' + JDATA.data.look_live[i].describe + '</textarea><div class="input-group-append"><button class="btn btn-outline-secondary" type="button">已領取</button></div></div>';
                    } else {
                        document.getElementById("tc").innerHTML += '<div class="input-group mb-3"><textarea type="text" class="form-control" disabled="disabled" aria-describedby="basic-addon2">' + JDATA.data.look_live[i].describe + '</textarea><div class="input-group-append"><button class="btn btn-outline-secondary" type="button">尚未完成</button></div></div>';
                    }
                };
            }
            for (i = 0; i < JDATA.data.look_new_anchor_live.length; i++) {
                if (JDATA.data.look_new_anchor_live[i].status == 2) {
                    document.getElementById("tc").innerHTML +=
                        '<div class="input-group mb-3"><input type="text" class="form-control" disabled="disabled" aria-describedby="basic-addon2" value="練習生觀看-' +
                        JDATA.data.look_new_anchor_live[i].describe + '"><div class="input-group-append"><button class="btn btn-warning" type="button" onclick="oldreceive(' +
                        JDATA.data.look_new_anchor_live[i].task_id + ',' + JDATA.data.look_new_anchor_live[i].task_type + ');">領取</button></div></div>';
                } else {
                    if (JDATA.data.look_live[i].status == 1) {
                        document.getElementById("tc").innerHTML += '<div class="input-group mb-3"><textarea type="text" class="form-control" disabled="disabled" aria-describedby="basic-addon2">練習生觀看-' + JDATA.data.look_new_anchor_live[i].describe + '</textarea><div class="input-group-append"><button class="btn btn-outline-secondary" type="button">已領取</button></div></div>';
                    } else {
                        document.getElementById("tc").innerHTML += '<div class="input-group mb-3"><textarea type="text" class="form-control" disabled="disabled" aria-describedby="basic-addon2">練習生觀看-' + JDATA.data.look_new_anchor_live[i].describe + '</textarea><div class="input-group-append"><button class="btn btn-outline-secondary" type="button">尚未完成</button></div></div>';
                    }
                };
            }
            if (JDATA.data.share_live.status == 2) {
                document.getElementById("tc").innerHTML +=
                    '<div class="input-group mb-3"><input type="text" class="form-control" disabled="disabled" aria-describedby="basic-addon2" value="' +
                    JDATA.data.share_live.describe + "(" + JDATA.data.share_live.current + "/" + JDATA.data.share_live.length + ")" + '"><div class="input-group-append"><button class="btn btn-warning" type="button" onclick="oldreceive(' +
                    JDATA.data.share_live.task_id + ',' + JDATA.data.share_live.task_type + ');">領取</button></div></div>';
            } else {
                if (JDATA.data.share_live.status == 1) {
                    document.getElementById("tc").innerHTML += '<div class="input-group mb-3"><textarea type="text" class="form-control" disabled="disabled" aria-describedby="basic-addon2">' + JDATA.data.share_live.describe + "(" + JDATA.data.share_live.current + "/" + JDATA.data.share_live.length + ")" + '</textarea><div class="input-group-append"><button class="btn btn-outline-secondary" type="button">三次都已領取</button></div></div>';
                } else {
                    document.getElementById("tc").innerHTML += '<div class="input-group mb-3"><textarea type="text" class="form-control" disabled="disabled" aria-describedby="basic-addon2">' + JDATA.data.share_live.describe + "(" + JDATA.data.share_live.current + "/" + JDATA.data.share_live.length + ")" + '</textarea><div class="input-group-append"><button class="btn btn-outline-secondary" type="button">尚未完成</button></div></div>';
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