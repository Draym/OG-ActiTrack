// ==UserScript==
// @name        OG-GalaxyCheck
// @description [do not use under v2] Bot to be used with OG-Tracker. Navigate to each position in the galaxy.
// @include     *.ogame*gameforge.com/game/index.php*
// @author      Draym
// @copyright   2019, Draym (draymlab.fr)
// @license     MIT
// @version     1.0.3.0
// @updateURL https://openuserjs.org/meta/Draym/OG-GalaxyCheck.meta.js
// @downloadURL https://openuserjs.org/install/Draym/OG-GalaxyCheck.user.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// ==/UserScript==

// ==OpenUserJS==
// @author Draym
// ==/OpenUserJS==

(function () {
  'use strict';
  let gc_pos = function (galaxy, system) {
    return ({
      galaxy: galaxy,
      system: system
    });
  }
  /* **************************************************************/
  /* ******************** PARAMETERS ******************************/
  /* **************************************************************/
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
  /* ********************** ICONS *********************************/
  /* **************************************************************/
  let trashIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAA81BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9YqtblAAAAUHRSTlMAAQIDBAUGBwgJCwwNDxARFBYYHCAiJSYoLTA1Nzg5Ozw/QUtPWFxhZG11e3x+f4iLkZKUlZieqKuvtb7DxcrO09nc4ubo6evt8fP19/n7/baRV4cAAAFLSURBVDjL3ZTJVsJAEEUrARURQXFGcZ4QnBIUFUURQhAR7v9/jQuSkA6dA2tqVzm3K/VeVbfI3MZqVhMZc4I7QxuDmwi6R1zUFTI/iAW5CnErXWgvaxo3StAZpwtN6K9pJS4BCT8x68CO3oskkPSTZ+BUpoNl4FqmgxfAvf/9oF0xRioqzqEKFoEXwwcdsEVEjCo4Crg5hEYgS8qAJSI2UAmDuR60UiHfqoBlWoBthMBUC35zisM24Hp1AzDRALYiOi0Ycx5YAu6ihpgu4JoKmPgAtrUVH1UfF7+hvz69R5FMF9x0hLNMO6paJP8HzUXFR9vjFR9FdoH3YIkdr9LkZEROgJo/w6ITzLpzFN2eS+Bhhu0ZNVaaBZQn4HwW0HgD9rVgGgjd1+QnDAualyJfg6/wwVQr/l4fK7/I/sRxt5FmNrRvRe+1IHMW/wzugelBDRgVAAAAAElFTkSuQmCC";
  let plusIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAvVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Ke75sAAAAPnRSTlMAAQMEBQcICQoZGiEoKi0uLzM2NzxPUVJWWFldX2dpbG1zd4CCiIuSlLe5ury+wMHMztfZ3ODi5u3v8/X7/QehlGwAAADUSURBVDjL7ZRXD4IwGEWvC9wiat1bcW/FSf//zxKpMVJSqSa+cd56c5q0Tb8L2KSH2xsVcJrXVTBiE/oZq+x4ikl96T7EBZUgD2RlPHoARlIiTWDPRwYhpLbh0yIsLuk4N4xcubgEfqvG3mzJxcQj5pi4CMR3saXlGAoTU89lYe4WBxARdYsVoYh/i33ZM9Km4Nb6NPgUP4nCKeTnuu144Ytnrj1NMbSborr2NsVYrnuS0KQ8MwSsZETdPrd69Pd6rJtnfh3++tYZY2eJrPOyEcc33AEfCR2wsoznKgAAAABJRU5ErkJggg==";

  /* **************************************************************/
  /* ********************** SCRIPT ********************************/
  /* **************************************************************/
  var $ = unsafeWindow.$;

  function gc_getPositions() {
    return JSON.parse(GM_getValue('gc_PositionList'));
  }

  function gc_checkEachPositionJob(i) {
    let gc_positions = gc_getPositions();
    if (gc_positions.length == 0 || i >= gc_positions.length || GM_getValue("gc_toggleOn") != true) {
      return;
    }
    gc_goToGalaxyPosition(gc_positions[i].galaxy, gc_positions[i].system);
    setTimeout(function () {
      gc_checkEachPositionJob(i + 1);
    }, gc_secondes * 1000);
  }

  function gc_checkPositionInGalaxy() {
    console.log("do:", gc_getPositions());
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
  /* ******************** GUI - PANEL *****************************/
  /* **************************************************************/

  unsafeWindow.gc_clickPanelLi = function (row) {
    let value = $(row).find('span.tab').text();
    console.log("delete value:", value);
    let galaxy = value.split(" : ")[0];
    let system = value.split(" : ")[1];
    gc_deletePositionFromPanel(galaxy, system);
  }

  function gc_addPositionInPanelListView(position) {
    $('#gcPanelList').append(
      $("<li>").attr('class', 'clickable').attr('onclick', 'gc_clickPanelLi(this)').append(
        $('<span>').attr('class', 'tab').append(position.galaxy + " : " + position.system)
      ).append(
        $('<a>').attr('class', 'tab').append(
          `<img src="` + trashIcon + `" rel="` + trashIcon + `" height="15" width="15" style="margin-left:10px">`
        )
      )
    );
  }

  function gc_updatePanelListView() {
    if (GM_getValue('gc_PositionList')) {
      let data = JSON.parse(GM_getValue('gc_PositionList'));
      console.log("update:", data);
      $('#gcPanelList').empty();
      for (var i in data) {
        gc_addPositionInPanelListView(data[i]);
      }
    }
  }

  function gc_savePositionFromPanel(galaxy, system) {
    let positions = [];

    if (!galaxy || galaxy == "" || !system || system == "") {
      return;
    }
    if (GM_getValue('gc_PositionList')) {
      positions = JSON.parse(GM_getValue('gc_PositionList'));
    }
    for (let i in positions) {
      if (positions[i].galaxy == galaxy && positions[i].system == system) {
        return;
      }
    }
    positions.push({
      galaxy: galaxy,
      system: system
    });
    GM_setValue('gc_PositionList', JSON.stringify(positions));
    console.log(GM_getValue('gc_PositionList'));
    gc_updatePanelListView();
  }

  function gc_deletePositionFromPanel(galaxy, system) {
    if (GM_getValue('gc_PositionList')) {
      let positions = JSON.parse(GM_getValue('gc_PositionList'));
      console.log("delete:", galaxy, system);
      for (let i = 0; i < positions.length; ++i) {
        console.log("->", positions[i]);
        if (positions[i].galaxy == galaxy && positions[i].system == system) {
          positions.splice(i, 1);
          console.log("=delete");
          --i;
        }
      }
      GM_setValue('gc_PositionList', JSON.stringify(positions));
      gc_updatePanelListView();
    }
  }

  function gc_drawPanel(visible) {
    if (!visible) {
      $("#gcPanel").hide();
    }
    else {
      gc_updatePanelListView();
      $("#gcPanel").show();
    }
  }
  $("body").append(`
<div id="gcPanel" style="display: none;">
<form>
<h3 id="gcPanelTitle">OG-GalaxyCheck Panel</h3>
<p>Add a position: </p>
<div class="form-group">
<input id="gc_panelGalaxyValue" class="form-control" type="number" min="1" max="9" placeholder="galaxy"/>
<input id="gc_panelSystemValue" class="form-control" type="number" min="1" max="499" placeholder="system"/>
<a id="gc_panelValueSubmit" class="form-control">
<img class="clickable" src="` + plusIcon + `" rel="` + plusIcon + `" height="15" width="15">
</a>
</div>
<p>Position to check: </p>
<ul id="gcPanelList">
</ul>
<button id="gcClosePanelBtn" type="button">Close</button>
</form>
</div>
`);
  $("#gc_panelValueSubmit").click(function () {
    gc_savePositionFromPanel($("#gc_panelGalaxyValue").val(), $("#gc_panelSystemValue").val());
  });
  $("#gcClosePanelBtn").click(function () {
    gc_drawPanel(false);
  });
  /* **************************************************************/
  /* ******************** GUI - MENU ******************************/
  /* **************************************************************/

  unsafeWindow.gc_handleClick = function (cb) {
    GM_setValue('gc_toggleOn', cb.checked);
    if (cb.checked == true) {
      gc_launch();
    }
  }

  if (/page=galaxy/.test(location.href)) {
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
    $("#cbActiveGC").prop('checked', isToggle ? isToggle : false);
    document.getElementById('drawOptionGC').addEventListener("click", function (event) {
      gc_drawPanel($("#gcPanel").is(":hidden"));
    }, true);

    if (isToggle) {
      gc_launch();
    }
  }
  /* **************************************************************/
  /* ************************ CSS *********************************/
  /* **************************************************************/

  GM_addStyle(`
/*** CUSTOM ***/
#gcPanel {
position:               fixed;
top:                    50%;
left:                   0;
width:                  300px;
padding:                10px;
background:             rgba(51, 102, 153, 0.9);
border:                 2px black;
border-radius:          1ex;
z-index:                777;
}

#gcPanelList{
overflow-y: scroll;
height: 150px;
margin-bottom: 10px;
}

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
.clickable {
cursor: pointer;
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
