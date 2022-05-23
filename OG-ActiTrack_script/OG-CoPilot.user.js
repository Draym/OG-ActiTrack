// ==UserScript==
// @name        OG-CoPilot
// @description Your ogame co-pilot
// @include       *.ogame*gameforge.com/game/index.php*
// @author      Draym
// @copyright   2019, Draym (draymlab.fr)
// @license     MIT
// @version     1.0.0.1
// @updateURL https://openuserjs.org/meta/Draym/OG-CoPilot.meta.js
// @downloadURL https://openuserjs.org/install/Draym/OG-CoPilot.user.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// ==/UserScript==

// ==OpenUserJS==
// @author Draym
// ==/OpenUserJS==

(function () {
    'use strict';

    const currentUni = window.location.href.substring(
        window.location.href.indexOf("://") + 3,
        window.location.href.lastIndexOf(".ogame")
    )


    /* **************************************************************/
    /* ******************** PARAMETERS ******************************/
    /* **************************************************************/
    const alertSound = 'https://assets.mixkit.co/sfx/preview/mixkit-bell-notification-933.mp3';
    const configTime = 3; // something superior to 1. A random will be done between 0 and 'minutes', 5 will be added to it.

    const key_raidAlert = `${currentUni}_raidAlertActivated`
    const key_autoExpedition = `${currentUni}_autoExpeditionActivated`

    const menu_fleet = {
        transporterSmall : ".transporterSmall",
        transporterLarge: ".transporterLarge",
        explorer:".explorer",
        cruiser: ".cruiser",
        spy:".espionageProbe",
        battleship:".battleship"
    }

    const menu_btn = {
        home: 'a[href$="page=ingame&component=overview"]:first',
        fleet: 'a[href$="page=ingame&component=fleetdispatch"]:first',
        fleet_continue: '#continueToFleet2',
        fleet_send: '#sendFleet'
    }

    console.log(currentUni)

    let _refreshTimer = null
    let _nextRefresh = null
    const _wait = 2
    const _wait_long = 5
    const _refreshTime = Math.floor(Math.random() * configTime) + 1;

    const $ = unsafeWindow.$;
    const alertSoundAudio = document.createElement('audio');
    alertSoundAudio.src = alertSound;
    alertSoundAudio.preload = 'auto';
    const browserAudio = new AudioContext();
    const ui_notificationDetails = {
        title: 'Ogame Alert',
        text: 'You are under attack on Ogame',
        timeout: 15000,
        icon: 'https://is4-ssl.mzstatic.com/image/thumb/Purple91/v4/31/2d/98/312d98f7-b935-69b3-596e-2159d13c0865/mzl.kxpdlefq.png/246x0w.jpg',
        onclick: function () {
            window.focus();
        }
    };

    /* **************************************************************/
    /* ********************* BROWSER ********************************/
    /* **************************************************************/
    function log(data) {
        console.log(`[OG-CoPilot]> ${data}`)
    }

    function log_info(data) {
        console.log(`[OG-CoPilot]%c ${data}`, 'color: #1E90FF')
    }

    function log_success(data) {
        console.log(`[OG-CoPilot]%c ${data}`, 'color: #7CFC00')
    }

    function log_error(data) {
        console.log(`[OG-CoPilot]%c ${data}`, 'color: #B22222')
    }

    function clickOn(value) {
        const btn = $(value)
        if (btn.length != 0) {
            btn[0].click()
        } else {
            log_error(`btn not found for '${value}'`)
        }
    }

    function fillInput(search, value) {
        const input = $(search)
        if (input.length != 0) {
            input.click()
            input.focus()
            //input.attr('value', value)
            input.val(value).trigger('change')
        }
    }

    function notifyAlert() {
        browserAudio.resume().then(() => {
            GM_notification(ui_notificationDetails);
            alertSoundAudio.play();
            log('Playback resumed successfully');
        });
    }

    function browser_allow_notifications() {
        if (typeof GM_notification === "function") {
            log("notifications ON");
            return;
        }
        window.GM_notification = function (ntcOptions) {
            checkPermission();

            function askPermission() {
                Notification.requestPermission(function (permission) {
                    log("New permission: ", permission);
                    checkPermission();
                });
            }

            function checkPermission() {
                if (Notification.permission === "granted") {
                    fireNotice();
                }
                else if (Notification.permission === "denied") {
                    log("User has denied notifications for this page/site!");
                    askPermission();
                }
                else {
                    askPermission();
                }
            }

            function fireNotice() {
                if (!ntcOptions.title) {
                    log("Title is required for notification");
                    return;
                }
                if (ntcOptions.text && !ntcOptions.body) {
                    ntcOptions.body = ntcOptions.text;
                }
                var ntfctn = new Notification(ntcOptions.title, ntcOptions);

                if (ntcOptions.onclick) {
                    ntfctn.onclick = ntcOptions.onclick;
                }
                if (ntcOptions.timeout) {
                    setTimeout(function () {
                        ntfctn.close();
                    }, ntcOptions.timeout);
                }
            }
        }
    }

    /* **************************************************************/
    /* ********************** DATA **********************************/
    /* **************************************************************/

    function activateRaidAlert(status) {
        GM_setValue(key_raidAlert, status);
        launch()
    }

    function isRaidAlertActivated(){
        return GM_getValue(key_raidAlert);
    }

    function activateAutoExpedition(status) {
        GM_setValue(key_autoExpedition, status);
        launch()
    }

    function isAutoExpeditionActivated(){
        return GM_getValue(key_autoExpedition);
    }

    /* **************************************************************/
    /* ********************** SCRIPT ********************************/
    /* **************************************************************/

    function scheduleRefreshPage() {
        if (isAutoExpeditionActivated() || isRaidAlertActivated()) {
            log_info(`Refresh`)
            const wait = _refreshTime * 60 * 1000
            _refreshTimer = setInterval(() => {
                location.reload();
            }, wait)
            _nextRefresh = new Date(Date.now + wait)
        }
    }

    function destroyRefresh() {
        if (_refreshTimer != null) {
            clearInterval(_refreshTimer);
        }
    }

    function next(callbacks) {
        if (callbacks != null) {
            if (callbacks.length != 0) {
                callbacks[0](callbacks.slice(1))
            } else {
                callbacks(null)
            }
        }
    }

    function nextSlow(wait, callbacks) {
        if (callbacks != null) {
            if (callbacks.length != 0) {
                setTimeout(function () {
                    callbacks[0](callbacks.slice(1))
                }, wait * 1000);
            } else {
                callbacks(null)
            }
        }
    }

    function runRaidAlert(callbacks) {
        destroyRefresh();
        if (isRaidAlertActivated()){
            log_info(`Raid Alert`)
            if ($('#attack_alert').hasClass("soon")) {
                notifyAlert();
            }
        }
        next(callbacks);
    }

    function addFleet(fleet, value) {
        fillInput(`${fleet} > input`, value);
    }

    function setExpePosition() {
        let keyVal = 49
        $("#position").trigger ( {
            type: 'keypress', keyCode: keyVal, which: keyVal, charCode: keyVal
        } );
        keyVal = 54
        $("#position").trigger ( {
            type: 'keypress', keyCode: keyVal, which: keyVal, charCode: keyVal
        } );
        fillInput('#position', '16');
        const expeBtn = $("#button15")
        expeBtn.removeClass("off")
        expeBtn.addClass("on")
    }

    function runAutoExpeditions(callbacks) {
        destroyRefresh();
        if (isAutoExpeditionActivated()) {
            log_info(`Auto Expedition`)
            if (!/page=ingame&component=fleetdispatch/.test(location.href)) {
                clickOn(menu_btn.fleet)
            } else {
                const expeTotal = $("span:contains('Expéditions:')");
                if (expeTotal.length != 0) {
                    const data = expeTotal.text();
                    const current = parseInt(data.slice(data.indexOf('/') - 2, data.indexOf('/')));
                    const total = parseInt(data.slice(data.indexOf('/') + 1, data.indexOf('/') + 3));
                    const pt = parseInt($(menu_fleet.transporterSmall).text().replace(".", ""));
                    const gt = parseInt($(menu_fleet.transporterLarge).text().replace(".", ""));
                    log(`expeditions ${current}/${total}`)
                    log(`available fleet ${pt}pt and ${gt}gt`)
                    const available = total - current
                    if (available > 0 && (pt != 0 || gt != 0)) {
                        const sendPt = pt / available;
                        const sendGt = gt / available;

                        function _useOGInfinityExpe(cb) {
                            $(".ogl-prefab.ogl-gtexpe").click();
                            nextSlow(_wait, cb);
                        }

                        function _setupFleet(cb) {
                            addFleet(menu_fleet.transporterSmall, Math.round(sendPt));
                            addFleet(menu_fleet.transporterLarge, Math.round(sendGt));
                            addFleet(menu_fleet.explorer, 1);
                            addFleet(menu_fleet.battleship, 1);
                            addFleet(menu_fleet.spy, 1);
                            log(`expedition send ${sendPt}pt and ${sendGt}gt`)
                            nextSlow(_wait, cb);
                        }

                        function _nextFleet(cb) {
                            $(menu_btn.fleet_continue).click()
                            nextSlow(_wait_long, cb);
                        }

                        function _launchFleet(cb) {
                            $(menu_btn.fleet_send).click()
                            nextSlow(_wait_long, cb);
                        }

                        function _repeat(cb) {
                            clickOn(menu_btn.home)
                            nextSlow(_wait_long, cb);
                        }

                        const scripts = [_useOGInfinityExpe, _setupFleet, _nextFleet, _launchFleet, _repeat, ...callbacks];

                        return nextSlow(_wait_long, scripts);
                    }
                } else {
                    log_error("is lost");
                }
            }
        }
        return next(callbacks);
    }


    /* **************************************************************/
    /* ********************* STARTUP ********************************/
    /* **************************************************************/

    function launch() {
        destroyRefresh();
        log_success("ready");
        browser_allow_notifications();

        const scripts = [runRaidAlert, runAutoExpeditions, scheduleRefreshPage];

        next(scripts);
    }

    /* **************************************************************/
    /* *********************** GUI **********************************/
    /* **************************************************************/
    unsafeWindow.ui_quickActivate = function (cb) {
        activateRaidAlert(cb.checked);
        activateAutoExpedition(cb.checked);
    }

    if (!/page=empire/.test(location.href)) {
        var aff_option = `
<span class="menu_icon">
<label class="tooltipRight js_hideTipOnMobile ui-switch">
<input id="ui-quickAction" type="checkbox" onclick="ui_quickActivate(this);">
<span class="ui-slider round"></span>
</label>
</span>
<a id="ui-drawOption" class="menubutton" href="#" accesskey="" target="_self">
<span class="textlabel">OG-CoPilot</span>
</a>`;
        const menu = document.createElement("li");
        menu.innerHTML = aff_option;
        menu.className += "ui-menu";
        menu.id = 'ui-copilot-menu';
        document.getElementById('menuTable').appendChild(menu);
        $("#ui-quickAction").prop('checked', isRaidAlertActivated() || isAutoExpeditionActivated());

        document.getElementById('ui-drawOption').addEventListener("click", function (event) {
            ui_drawMenu($("#ui-menuOptions").is(":hidden"));
        }, true);

        launch();
    }

    /* **************************************************************/
    /* ******************* GUI - PANEL ******************************/
    /* **************************************************************/

    unsafeWindow.ui_activateRaidAlert = function (cb) {
        activateRaidAlert(cb.checked);
    }
    unsafeWindow.ui_activateAutoExpedition = function (cb) {
        activateAutoExpedition(cb.checked);
    }

    function ui_drawMenu(visible) {
        if (!visible) {
            $("#ui-menuOptions").hide();
        }
        else {
            $("#ui-menuOptions").show();
            $("#ui-raidAlertActive").prop('checked', isRaidAlertActivated());
            $("#ui-expeditionActive").prop('checked', isAutoExpeditionActivated());
        }
    }

    $("body").append(`
<div id="ui-menuOptions" style="display: none;">
<ul id="ui-scripts">
<li id="ui-raidAlert">
<span class="alert_icon"/>
<label class="tooltipRight js_hideTipOnMobile ui-switch">
<input id="ui-raidAlertActive" type="checkbox" onclick="ui_activateRaidAlert(this);">
<span class="ui-slider round"></span>
</label>
<a class="menubutton" href="#" accesskey="" target="_self">
<span  class="textlabel">Alert on Raids</span>
</a>
</li>
<li id="ui-runExpedition">
<span class="expedition_icon">
<label class="tooltipRight js_hideTipOnMobile ui-switch">
<input id="ui-expeditionActive" type="checkbox" onclick="ui_activateAutoExpedition(this);">
<span class="ui-slider round"></span>
</label>
<a class="menubutton" href="#" accesskey="" target="_self">
<span class="textlabel" onClick="">Auto Expeditions</span>
</a>
</li>
</ul>
<br/>
<button id="ui-closeMenuOptions" type="button">Close</button>
</div>
`);

    $("#ui-closeMenuOptions").click(function () {
        ui_drawMenu(false);
    });


    /* **************************************************************/
    /* ************************ CSS *********************************/
    /* **************************************************************/

    GM_addStyle(`
/*** THEME ***/
#menuTable > .ui-menu {
margin-top: 10px !important;
margin-bottom: 10px !important;
}
#menuTable > .ui-menu ~ #ui-menu {
margin-top: -10px !important;
margin-bottom: 10px !important;
}
#ui-copilot-menu a span {
color: #68a2ff !important;
}
/*** TOGGLE SWITCH ***/
.ui-switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
  margin-top: 5px;
}
.ui-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.ui-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ff4949;
  -webkit-transition: .4s;
  transition: .4s;
}
.ui-slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 13px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .ui-slider {
  background-color: #0664b0;
}
input:focus + .ui-slider {
  box-shadow: 0 0 1px #0664b0;
}
input:checked + .ui-slider:before {
  -webkit-transform: translateX(13px);
  -ms-transform: translateX(13px);
  transform: translateX(13px);
}
.ui-slider.round {
  border-radius: 17px;
}
.ui-slider.round:before {
  border-radius: 50%;
}
/*** MENU ***/
.inputError {
color: red;
visibility: none;
}
#ui-menuOptions {
position:               fixed;
top:                    70%;
left:                   0;
width:                  300px;
padding:                10px;
background:             rgba(51, 102, 153, 0.9);
border:                 2px black;
border-radius:          1ex;
z-index:                777;
}
#ui-menuOptions button{
cursor:                 pointer;
margin:                 1em 1em 0;
border:                 1px outset buttonface;
}
`);
})();