// ==UserScript==
// @name        OG-SoundAlert
// @description Create sound alert
// @include     *.ogame*gameforge.com/game/index.php*
// @author      Draym
// @copyright   2019, Draym (draymlab.fr)
// @license     MIT
// @version     2.0.0.2
// @updateURL https://openuserjs.org/meta/Draym/OG-SoundAlert.meta.js
// @downloadURL https://openuserjs.org/install/Draym/OG-SoundAlert.meta.js/
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// ==/UserScript==

// ==OpenUserJS==
// @author Draym
// ==/OpenUserJS==

(function () {
  'use strict';

  /* **************************************************************/
  /* ******************** PARAMETERS ******************************/
  /* **************************************************************/
  var sa_sound = 'https://s0.vocaroo.com/media/download_temp/Vocaroo_s06IHDV7gAU4.mp3';
  var sa_minutes = 10; // something superior to 1. A random will be done between 0 and 'minutes', 5 will be added to it.

  /* **************************************************************/
  /* ********************** SCRIPT ********************************/
  /* **************************************************************/
  var $ = unsafeWindow.$;
  var sa_eventAlert = document.createElement('audio');
  sa_eventAlert.src = sa_sound;
  sa_eventAlert.preload = 'auto';
  var sa_time = Math.floor(Math.random() * sa_minutes) + 5;
  var sa_context = new AudioContext();
  var sa_notificationDetails = {
    title: 'Ogame Alert',
    text: 'You are under attack on Ogame',
    timeout: 15000,
    icon: 'https://is4-ssl.mzstatic.com/image/thumb/Purple91/v4/31/2d/98/312d98f7-b935-69b3-596e-2159d13c0865/mzl.kxpdlefq.png/246x0w.jpg',
    onclick: function () {
      window.focus();
    }
  };

  function sa_playAlert() {
    sa_context.resume().then(() => {
      GM_notification(sa_notificationDetails);
      sa_eventAlert.play();
      console.log('Playback resumed successfully');
    });
  }

  function sa_reload() {
    setTimeout(function () {
      if (GM_getValue('sa_toggleOn') == true) {
        location.reload();
      }
    }, sa_minutes * 60 * 1000);
  }

  function sa_checkAlerts() {
    if ($('#attack_alert').hasClass("soon")) {
      sa_playAlert();
    }
  }

  /*--- Cross-browser Shim code follows:*/
  function sa_shim_GM_notification() {
    if (typeof GM_notification === "function") {
      return;
    }
    window.GM_notification = function (ntcOptions) {
      checkPermission();

      function askPermission() {
        Notification.requestPermission(function (permission) {
          console.log("New permission: ", permission);
          checkPermission();
        });
      }

      function checkPermission() {
        if (Notification.permission === "granted") {
          fireNotice();
        }
        else if (Notification.permission === "denied") {
          console.log("User has denied notifications for this page/site!");
          askPermission();
        }
        else {
          askPermission();
        }
      }

      function fireNotice() {
        if (!ntcOptions.title) {
          console.log("Title is required for notification");
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
  /* ********************* STARTUP ********************************/
  /* **************************************************************/
  function launch() {
    sa_shim_GM_notification();
    sa_checkAlerts();
    sa_reload();
  }

  /* **************************************************************/
  /* *********************** GUI **********************************/
  /* **************************************************************/
  function sa_drawMenu() {}

  unsafeWindow.sa_handleClick = function (cb) {
    GM_setValue('sa_toggleOn', cb.checked);
  }

  if (!/page=empire/.test(location.href)) {
    var aff_option = `
<span class="menu_icon">
<label class="tooltipRight js_hideTipOnMobile sa-switch">
<input id="cbActiveSA" type="checkbox" onclick="sa_handleClick(this);">
<span class="sa-slider round"></span>
</label>
</span>
<a id="drawOptionSA" class="menubutton" href="#" accesskey="" target="_self">
<span  class="textlabel">OG-SoundAlert
</span></a>`;
    var tableau = document.createElement("li");
    tableau.innerHTML = aff_option;
    tableau.className += "custom-option";
    tableau.id = 'option-SoundAlert';
    document.getElementById('menuTable').appendChild(tableau);

    let isToggle = GM_getValue("sa_toggleOn");
    $("#cbActiveSA").prop('checked', isToggle ? isToggle : false);
    document.getElementById('drawOptionSA').addEventListener("click", function (event) {
      sa_drawMenu();
    }, true);

    if (isToggle) {
      launch();
    }
  }
  /* **************************************************************/
  /* ************************ CSS *********************************/
  /* **************************************************************/

  GM_addStyle(`
/*** THEME ***/
#menuTable > .custom-option {
margin-top: 10px !important;
margin-bottom: 10px !important;
}
#menuTable > .custom-option ~ .custom-option {
margin-top: -10px !important;
margin-bottom: 10px !important;
}
.custom-option a span {
color: #68a2ff !important;
}

/*** TOGGLE SWITCH ***/
.sa-switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
  margin-top: 5px;
}
.sa-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.sa-slider {
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
.sa-slider:before {
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
input:checked + .sa-slider {
  background-color: #0664b0;
}
input:focus + .sa-slider {
  box-shadow: 0 0 1px #0664b0;
}
input:checked + .sa-slider:before {
  -webkit-transform: translateX(13px);
  -ms-transform: translateX(13px);
  transform: translateX(13px);
}
.sa-slider.round {
  border-radius: 17px;
}
.sa-slider.round:before {
  border-radius: 50%;
}
`);
})();
