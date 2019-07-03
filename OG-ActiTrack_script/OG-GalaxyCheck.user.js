// ==UserScript==
// @name        OG-GalaxyCheck
// @description [do not use under v2] Bot to be used with OG-Tracker. Navigate to each position in the galaxy.
// @include     *.ogame*gameforge.com/game/index.php*
// @author      Draym
// @copyright   2019, Draym (draymlab.fr)
// @license     MIT
// @version     1.0.1.4
// @updateURL https://openuserjs.org/meta/Draym/OG-GalaxyCheck.meta.js
// @downloadURL https://openuserjs.org/install/Draym/OG-GalaxyCheck.user.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// ==/UserScript==

// ==OpenUserJS==
// @author Draym
// ==/OpenUserJS==

(function() {
    'use strict';
    let gc_pos = function(galaxy, system) {
        return ({g: galaxy, sys: system});
    }
    /* **************************************************************/
    /* ******************** PARAMETERS ******************************/
    /* **************************************************************/
    var gc_positions = [gc_pos(3,313), gc_pos(3,340), gc_pos(3,350), gc_pos(3,360)];
    var gc_minutes = 15;
    var gc_secondes = 5;

    /* **************************************************************/
    /* ********************** TOOLS *********************************/
    /* **************************************************************/

    function gc_goToGalaxyPosition(g, pos) {
        console.log("go:", g, pos);
        $("#galaxy_input").val(g);
        $("#system_input").val(pos);
        unsafeWindow.submitForm();
//        $(".btn-blue:not(#expeditionbutton)").trigger('click');
    }

    /* **************************************************************/
    /* ********************** SCRIPT ********************************/
    /* **************************************************************/
    var $ = unsafeWindow.$;

    function gc_checkEachPositionJob(i) {
        if (gc_positions.length == 0 || i >= gc_positions.length || GM_getValue("gc_toggleOn") != true) {
            return;
        }
        gc_goToGalaxyPosition(gc_positions[i].g, gc_positions[i].sys);
        setTimeout(function () {
            gc_checkEachPositionJob(i+1);
        }, gc_secondes * 1000);
    }

    function gc_checkPositionInGalaxy() {
        console.log("do:", gc_positions);
        gc_checkEachPositionJob(0);
    }

    /* **************************************************************/
    /* ********************* STARTUP ********************************/
    /* **************************************************************/

    function gc_launch() {
        console.log("launch");
        if (GM_getValue("gc_toggleOn") == true) {
            gc_checkPositionInGalaxy();
            gc_reload();
        }
    }

    function gc_reload() {
        setTimeout(function () {
            gc_launch();
        }, gc_minutes * 60 * 1000);
    }

    /* **************************************************************/
    /* *********************** GUI **********************************/
    /* **************************************************************/

    function gc_drawMenu(){
    }

    unsafeWindow.gc_handleClick = function(cb) {
        GM_setValue('gc_toggleOn', cb.checked);
        if (cb.checked == true) {
            gc_launch();
        }
    }

    if (/page=galaxy/.test(location.href))
    {
        var aff_option = `
<span class="menu_icon">
<label class="tooltipRight js_hideTipOnMobile sa-switch">
  <input id="cbActiveGC" type="checkbox" onclick="gc_handleClick(this);">
  <span class="sa-slider round"></span>
</label>
</span>
<a id="drawOptionGC" class="menubutton" href="#" accesskey="" target="_self">
<span  class="textlabel">OG-GalaxyCheck
</span></a>`;
//$('#check_id').val();
        var tableau = document.createElement("li");
        tableau.innerHTML = aff_option;
        tableau.className += "custom-option";
        tableau.id = 'option-GalaxyCheck';
        document.getElementById('menuTable').appendChild(tableau);

        let isToggle = GM_getValue("gc_roggleOn");
        $("#cbActiveGC").prop('checked', isToggle? isToggle : false);
        document.getElementById('drawOptionGC').addEventListener("click", function (event)
        {
            gc_drawMenu();
        }, true);

        if (isToggle) {
            gc_launch();
        }
    }
    /* **************************************************************/
    /* ************************ CSS *********************************/
    /* **************************************************************/

    GM_addStyle( `
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