// ==UserScript==
// @name        OG-CoPilot
// @description Your ogame co-pilot
// @include       *.ogame*gameforge.com/game/index.php*
// @author      DraymIncognito
// @copyright   2019, DraymIncognito (draymlab.fr)
// @license     MIT
// @version     1.2.1.2
// @updateURL https://openuserjs.org/meta/Draym/OG-CoPilot.meta.js
// @downloadURL https://openuserjs.org/install/Draym/OG-CoPilot.user.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// ==/UserScript==
/* global fleetDispatcher, playerId, LocalizationStrings */
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
    const configTime = 10; // something superior to 1. A random will be done between 0 and 'minutes', 5 will be added to it.

    const gm_keys = {
        raidAlert: `${currentUni}_raidAlertActivated`,
        autoExpedition: `${currentUni}_autoExpeditionActivated`,
        rescue: `${currentUni}_rescueActivated`,
        expeditionOnlyGT: `${currentUni}_expeditionOnlyGT`,
        expeditionOnlyPT: `${currentUni}_expeditionOnlyPT`,
        expeditionSwitchSystem: `${currentUni}_expeditionSwitchSystem`,
        expeditionSystem: `${currentUni}_expeditionSystem`
    }

    const menu_btn = {
        home: 'a[href$="page=ingame&component=overview"]:first',
        fleet: 'a[href$="page=ingame&component=fleetdispatch"]:first',
        fleet_continue: '#continueToFleet2',
        fleet_send: '#sendFleet',
        mission_exploration: "#missionButton15"
    }

    const ogame_class = {
        PLAYER_CLASS_EXPLORER : 3,
        PLAYER_CLASS_WARRIOR : 2,
        PLAYER_CLASS_MINER :1,
        PLAYER_CLASS_NONE : 0
    }

    console.log(currentUni)

    let _refreshTimer = null
    let _nextRefresh = null
    const _wait = 3
    const _wait_long = 6
    const _refreshTime = Math.floor(Math.random() * 5) + configTime;

    const $ = unsafeWindow.$;
    const alertSoundAudio = document.createElement('audio');
    alertSoundAudio.src = alertSound;
    alertSoundAudio.preload = 'auto';
    const browserAudio = new AudioContext();
    const ui_notificationDetails = {
        title: 'Ogame Alert',
        text: 'You are under attack on Ogame',
        timeout: 15000,
        image: 'https://is4-ssl.mzstatic.com/image/thumb/Purple91/v4/31/2d/98/312d98f7-b935-69b3-596e-2159d13c0865/mzl.kxpdlefq.png/246x0w.jpg',
        onclick: function () {
            window.focus();
        }
    };


    let player = {}

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
            alertSoundAudio.play();
            GM_notification(ui_notificationDetails);
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

    function removeNumSeparator(str) {
        return str.replace(new RegExp(`\\${LocalizationStrings["thousandSeperator"]}`, "g"), "")
    }

    /* **************************************************************/
    /* ********************** OGAME *********************************/
    /* **************************************************************/

    const ogameHelper = function () {
        var requestId = 0;

        function expedition(message) {
            let rid = requestId++;
            return new Promise((function (resolve, reject) {
                var listener = function (evt) {
                    if (evt.detail.requestId == rid) {
                        window.removeEventListener("ogi-expedition-rep", listener);
                        resolve(evt.detail.type)
                    }
                };
                window.addEventListener("ogi-expedition-rep", listener);
                var payload = {requestId: rid, message: message};
                window.dispatchEvent(new CustomEvent("ogi-expedition", {detail: payload}))
            }))
        }

        function Get(id) {
            let rid = requestId++;
            return new Promise((function (resolve, reject) {
                var listener = function (evt) {
                    if (evt.detail.requestId == rid) {
                        window.removeEventListener("ogi-players-rep", listener);
                        resolve(evt.detail.player)
                    }
                };
                window.addEventListener("ogi-players-rep", listener);
                var payload = {requestId: rid, id: id};
                window.dispatchEvent(new CustomEvent("ogi-players", {detail: payload}))
            }))
        }

        function filter(name, alliance) {
            let rid = requestId++;
            return new Promise((function (resolve, reject) {
                var listener = function (evt) {
                    if (evt.detail.requestId == rid) {
                        window.removeEventListener("ogi-filter-rep", listener);
                        resolve(evt.detail.players)
                    }
                };
                window.addEventListener("ogi-filter-rep", listener);
                var payload = {requestId: rid, name: name, alliance: alliance};
                window.dispatchEvent(new CustomEvent("ogi-filter", {detail: payload}))
            }))
        }

        return {getExpeditionType: expedition, getPlayer: Get, filter: filter}
    }();


    /* **************************************************************/
    /* ********************** DATA **********************************/
    /* **************************************************************/

    function activateRaidAlert(status) {
        GM_setValue(gm_keys.raidAlert, status);
        launch()
    }

    function isRaidAlertActivated(){
        return GM_getValue(gm_keys.raidAlert) === true;
    }

    function activateAutoExpedition(status) {
        GM_setValue(gm_keys.autoExpedition, status);
        launch()
    }

    function isAutoExpeditionActivated(){
        return GM_getValue(gm_keys.autoExpedition) === true;
    }

    function activateRescue(status) {
        GM_setValue(gm_keys.rescue, status);
        launch()
    }

    function isRescueActivated(){
        return GM_getValue(gm_keys.rescue) === true;
    }

    function setExpeditionOnlyGT(status) {
        GM_setValue(gm_keys.expeditionOnlyPT, false);
        GM_setValue(gm_keys.expeditionOnlyGT, status);
    }

    function isExpeditionOnlyGT(){
        return GM_getValue(gm_keys.expeditionOnlyGT) === true;
    }

    function setExpeditionOnlyPT(status) {
        GM_setValue(gm_keys.expeditionOnlyGT, false);
        GM_setValue(gm_keys.expeditionOnlyPT, status);
    }

    function isExpeditionOnlyPT(){
        return GM_getValue(gm_keys.expeditionOnlyPT) === true;
    }

    function setExpeditionSwitchSystem(status) {
        GM_setValue(gm_keys.expeditionSwitchSystem, status);
    }

    function isExpeditionSwitchSystem(){
        return GM_getValue(gm_keys.expeditionSwitchSystem) === true;
    }

    function setExpeditionSystem(system) {
        if (isNaN(system)) {
            GM_setValue(gm_keys.expeditionSystem, null);
        } else {
            GM_setValue(gm_keys.expeditionSystem, system);
        }
    }

    function getExpeditionSystem(){
        const value = GM_getValue(gm_keys.expeditionSystem);
        if (value === undefined || value === null) {
            return 0;
        }
        return value;
    }

    /* **************************************************************/
    /* ********************** FLEET *********************************/
    /* **************************************************************/
    const menu_fleet = {
        pt : ".transporterSmall",
        gt: ".transporterLarge",
        explorer:".explorer",
        cruiser: ".cruiser",
        spy:".espionageProbe",
        battleship:".battleship"
    }

    const fleet_id = {
        pt : 202,
        gt: 203,
        cle: 204,
        clo: 205,
        cruiser: 206,
        battleship:207,
        colon: 208,
        recycler: 209,
        spy:210,
        bomber: 211,
        sat: 212,
        destroyer: 213,
        rip: 214,
        interceptor:215,
        reaper: 218,
        explorer: 219,
    }

    const fleet = {
        pickShip: (shipID, amount) => {
            fleetDispatcher.shipsOnPlanet.forEach((ship => {
                if (ship.id == shipID) {
                    if (amount > ship.number) amount = ship.number;
                    fleetDispatcher.selectShip(shipID, amount);
                    fleetDispatcher.refresh()
                }
            }))
            return amount
        },
        setTargetPos: (x, y, z) => {
            fleetDispatcher.targetPlanet.type = 1;
            if (x != null) {
                fleetDispatcher.targetPlanet.galaxy = x;
            }
            if (y != null) {
                fleetDispatcher.targetPlanet.system = y;
            }
            if (z != null) {
                fleetDispatcher.targetPlanet.position = z;
            }
            fleetDispatcher.refreshTarget();
            fleetDispatcher.updateTarget();
            fleetDispatcher.refresh();
        }
    }


    function calcNeededShips(options) {
        options = options || {};
        let resources = [removeNumSeparator(document.querySelector("#resources_metal").textContent), removeNumSeparator(document.querySelector("#resources_crystal").textContent), removeNumSeparator(document.querySelector("#resources_deuterium").textContent)];
        resources = resources.reduce(((a, b) => parseInt(a) + parseInt(b)));
        if (options.resources || options.resources == 0) resources = options.resources;
        let type = options.fret;
        let fret;
        if (type == 202) {
            fret = fleetDispatcher.fleetHelper.shipsData[202].baseCargoCapacity
        } else if (type == 203) {
            fret = fleetDispatcher.fleetHelper.shipsData[203].baseCargoCapacity
        } else if (type == 219) {
            fret = fleetDispatcher.fleetHelper.shipsData[219].baseCargoCapacity
        } else if (type == 210) {
            fret = fleetDispatcher.fleetHelper.shipsData[210].baseCargoCapacity
        } else if (type == 209) {
            fret = 0
        }
        let total = resources / fret;
        if (options.moreFret) total *= 107 / 100;
        return Math.ceil(total)
    }

    function calcOptiExpedition() {
        let maxTotal = 0
        let minPT = 0
        let minGT = 0
        if (player.topScore < 1e4) {
            maxTotal = 4e4;
            minPT = 273;
            minGT = 91
        } else if (player.topScore < 1e5) {
            maxTotal = 5e5;
            minPT = 423;
            minGT = 141
        } else if (player.topScore < 1e6) {
            maxTotal = 12e5;
            minPT = 423;
            minGT = 191
        } else if (player.topScore < 5e6) {
            maxTotal = 18e5;
            minPT = 423;
            minGT = 191
        } else if (player.topScore < 25e6) {
            maxTotal = 24e5;
            minPT = 573;
            minGT = 191
        } else if (player.topScore < 5e7) {
            maxTotal = 3e6;
            minPT = 723;
            minGT = 241
        } else if (player.topScore < 75e6) {
            maxTotal = 36e5;
            minPT = 873;
            minGT = 291
        } else if (player.topScore < 1e8) {
            maxTotal = 42e5;
            minPT = 1023;
            minGT = 341
        } else {
            maxTotal = 5e6;
            minPT = 1223;
            minGT = 417
        }
        return {maxTotal: player.class == ogame_class.PLAYER_CLASS_EXPLORER ? maxTotal * 3 * 5 : maxTotal * 2, minPT:minPT, minGT:minGT}
    }

    /* **************************************************************/
    /* ******************* SCRIPT UTILS *****************************/
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

    /* **************************************************************/
    /* ********************** SCRIPT ********************************/
    /* **************************************************************/

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

    function rescue(callbacks) {
        next(callbacks)
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
                    const availableSlot = total - current
                    log(`expeditions ${current}/${total}`)
                    setExpeditionSystem(getExpeditionSystem() == 0 ? 1 : 0);
                    if (availableSlot >0) {
                        const availablePT = parseInt($(menu_fleet.pt).text().replace(".", ""));
                        const availableGT = parseInt($(menu_fleet.gt).text().replace(".", ""));

                        let {maxTotal, minPT, minGT } = calcOptiExpedition();

                        let maxPT = Math.max(minPT, calcNeededShips({fret: 202, resources: maxTotal}));
                        let maxGT = Math.max(minGT, calcNeededShips({fret: 203, resources: maxTotal}));

                        log(`available fleet ${availablePT}pt[${maxPT}] and ${availableGT}gt[${maxGT}]`)
                        if (availablePT != 0 || availableGT != 0) {
                            const possiblePT = availablePT / availableSlot;
                            const possibleGT = availableGT / availableSlot;
                            let sendGT = 0;
                            let sendPT = 0;

                            if (isExpeditionOnlyPT()) {
                                sendPT = Math.min(possiblePT, maxPT);
                            } else if (isExpeditionOnlyGT()) {
                                sendGT = Math.min(possibleGT, maxGT);
                            } else {
                                sendPT = Math.min(possiblePT, maxPT)
                                if (sendPT < maxPT) {
                                    sendGT = Math.min(possibleGT, maxGT - (sendPT / 5))
                                }
                            }

                            function _setupFleet(cb) {
                                fleet.pickShip(fleet_id.pt, Math.round(sendPT));
                                fleet.pickShip(fleet_id.gt, Math.round(sendGT));
                                fleet.pickShip(fleet_id.explorer, 1);
                                fleet.pickShip(fleet_id.spy, 1);
                                fleet.pickShip(fleet_id.reaper, 1);
                                log(`expedition send ${sendPT}pt and ${sendGT}gt`)
                                nextSlow(_wait, cb);
                            }

                            function _nextFleet(cb) {
                                $(menu_btn.fleet_continue).click()
                                nextSlow(_wait_long, cb);
                            }

                            function _setPosition(cb){
                                if (isExpeditionSwitchSystem()) {
                                    const current = Number.parseInt($("#system").val());
                                    console.log(`system: ${current} - ${getExpeditionSystem()} = ${current - getExpeditionSystem()}`)
                                    fleet.setTargetPos(null, current - getExpeditionSystem(), 16);
                                } else {
                                    fleet.setTargetPos(null, null, 16);
                                }
                                nextSlow(_wait_long, cb)
                            }

                            function _selectMission(cb){
                                $(menu_btn.mission_exploration).click()
                                nextSlow(_wait, cb)
                            }

                            function _launchFleet(cb) {
                                $(menu_btn.fleet_send).click()
                                nextSlow(_wait_long, cb);
                            }

                            function _repeat(cb) {
                                clickOn(menu_btn.home)
                                nextSlow(_wait_long, cb);
                            }
                            const scripts = [_setupFleet, _nextFleet, _setPosition, _selectMission, _launchFleet, _repeat, ...callbacks];

                            return nextSlow(_wait_long, scripts);
                        }
                    } else {
                        setExpeditionSystem(getExpeditionSystem() == 0 ? 1 : 0);
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
        setExpeditionSwitchSystem(false);
        setExpeditionOnlyGT(true);
        console.log(`pt[${isExpeditionOnlyPT()}], gt[${isExpeditionOnlyGT()}], [${isExpeditionSwitchSystem()}]system(${getExpeditionSystem()})`)
        ogameHelper.getPlayer(playerId).then((data => {
            player = data
            if (document.querySelector("#characterclass .explorer")) {
                player.class = ogame_class.PLAYER_CLASS_EXPLORER
            } else if (document.querySelector("#characterclass .warrior")) {
                player.class = ogame_class.PLAYER_CLASS_WARRIOR
            } else if (document.querySelector("#characterclass .miner")) {
                player.class = ogame_class.PLAYER_CLASS_MINER
            } else {
                player.class = ogame_class.PLAYER_CLASS_NONE
            }
            destroyRefresh();
            log_success("ready");
            browser_allow_notifications();

            const scripts = [runRaidAlert, rescue, runAutoExpeditions, scheduleRefreshPage];

            try {
                next(scripts);
            } catch (e) {
                scheduleRefreshPage()
            }
        }))
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
    unsafeWindow.ui_activateRescue = function (cb) {
        activateRescue(cb.checked);
    }


    function ui_drawMenu(visible) {
        if (!visible) {
            $("#ui-menuOptions").hide();
        }
        else {
            $("#ui-menuOptions").show();
            $("#ui-raidAlertActive").prop('checked', isRaidAlertActivated());
            $("#ui-expeditionActive").prop('checked', isAutoExpeditionActivated());
            $("#ui-RescueActive").prop('checked', isRescueActivated());
        }
    }

    function ui_drawMenuDetails(visible, target) {
        switch (target) {
            case "raidAlert" :
                $("#ui-menuDetails-expedition").hide();
                $("#ui-menuDetails-rescue").hide();
                break;
            case "expedition" :
                $("#ui-menuDetails-raidAlert").hide();
                $("#ui-menuDetails-rescue").hide();
                break;
            case "rescue" :
                $("#ui-menuDetails-raidAlert").hide();
                $("#ui-menuDetails-expedition").hide();
                break;
        }
        if (!visible) {
            $("#ui-menuDetails").hide();
        }
        else {
            $("#ui-menuDetails").show();
            $("#ui-menuDetails-" + target).show();
        }
    }

    $("body").append(`
<div id="ui-menuDetails" style="display: none;">
<div id="ui-menuDetails-raidAlert" style="display: none;">
<h3>RaidAlert Options</h3>
</div>
<div id="ui-menuDetails-expedition" style="display: none;">
<h3>Expedition Options</h3>
</div>
<div id="ui-menuDetails-rescue" style="display: none;">
<h3>Rescue Options</h3>
</div>
<br/>
<button id="ui-closeMenuDetailExpe" type="button">Close</button>
</div>
<div id="ui-menuOptions" style="display: none;">
<ul id="ui-scripts">
<li id="ui-raidAlert">
<span class="alert_icon"/>
<label class="tooltipRight js_hideTipOnMobile ui-switch">
<input id="ui-raidAlertActive" type="checkbox" onclick="ui_activateRaidAlert(this);">
<span class="ui-slider round"></span>
</label>
<a class="menubutton" id="ui-raidAlert-menu" href="#" accesskey="" target="_self">
<span class="textlabel">Alert on Raids</span>
</a>
</li>
<li id="ui-runExpedition">
<span class="expedition_icon">
<label class="tooltipRight js_hideTipOnMobile ui-switch">
<input id="ui-expeditionActive" type="checkbox" onclick="ui_activateAutoExpedition(this);">
<span class="ui-slider round"></span>
</label>
<a class="menubutton" id="ui-runExpedition-menu" href="#" accesskey="" target="_self">
<span class="textlabel" onClick="">Auto Expeditions</span>
</a>
</li>
<li id="ui-rescue">
<span class="attack_icon">
<label class="tooltipRight js_hideTipOnMobile ui-switch">
<input id="ui-rescueActive" type="checkbox" onclick="ui_activateRescue(this);">
<span class="ui-slider round"></span>
</label>
<a class="menubutton" id="ui-rescue-menu" href="#" accesskey="" target="_self">
<span class="textlabel" onClick="">Save my Ass</span>
</a>
</li>
</ul>
<br/>
<button id="ui-closeMenuOptions" type="button">Close</button>
</div>
`);

    document.getElementById('ui-raidAlert-menu').addEventListener("click", function (event) {
        ui_drawMenuDetails($("#ui-menuDetails-raidAlert").is(":hidden"), "raidAlert");
    }, true);
    document.getElementById('ui-runExpedition-menu').addEventListener("click", function (event) {
        ui_drawMenuDetails($("#ui-menuDetails-expedition").is(":hidden"), "expedition");
    }, true);

    document.getElementById('ui-rescue-menu').addEventListener("click", function (event) {
        ui_drawMenuDetails($("#ui-menuDetails-rescue").is(":hidden"), "rescue");
    }, true);

    $("#ui-closeMenuOptions").click(function () {
        ui_drawMenu(false);
    });

    $("#ui-closeMenuDetails").click(function () {
        ui_drawMenuDetails(false);
    });

    /* **************************************************************/
    /* *********************** GUI **********************************/
    /* **************************************************************/
    unsafeWindow.ui_quickActivate = function (cb) {
        activateRaidAlert(cb.checked);
        activateRescue(cb.checked);
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
        $("#ui-quickAction").prop('checked', isRaidAlertActivated() || isRescueActivated() || isAutoExpeditionActivated());

        document.getElementById('ui-drawOption').addEventListener("click", function (event) {
            ui_drawMenu($("#ui-menuOptions").is(":hidden"));
        }, true);

        launch();
    }


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
#ui-menuDetails {
position:               fixed;
top:                    50%;
left:                   0;
width:                  200px;
height:                 100px;
padding:                10px;
background:             rgba(51, 102, 153, 0.9);
border:                 2px black;
border-radius:          1ex;
z-index:                777;
}
#ui-menuDetails button{
cursor:                 pointer;
margin:                 1em 1em 0;
border:                 1px outset buttonface;
}
`);
})();