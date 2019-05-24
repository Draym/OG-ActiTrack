// ==UserScript==
// @name        OG-ActiTrack
// @namespace   wrslsfwarg5d6wa5sgr4c6e5
// @description Save players activity
// @include     *.ogame*gameforge.com/game/index.php*
// @author      Draym
// @version     2.6.1.0
// @updateURL   https://openuserjs.org/meta/vulca/topraider.meta.js
// @downloadURL https://openuserjs.org/install/vulca/topraider.user.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @connect        localhost
// ==/UserScript==

(function() {
    'use strict';
    var $ = unsafeWindow.$;
    var state = {};
    function getState() {
        return state;
    }
    function setState(data) {
        for (var key in data) {
            state[key] = data[key];
        }
    }

    function waitForElementToDisplay(selector, time, callback) {
        if(document.querySelector(selector)!=null) {
            callback();
            return;
        }
        else {
            setTimeout(function() {
                waitForElementToDisplay(selector, time, callback);
            }, time);
        }
    }

    /*
    function galaxyActivity() {
        waitForElementToDisplay("#mobileDiv", 500, function() {
        });
    };*/

    function ObserverCurrentGalaxy() {
        var galaxyRows = ParseGalaxy();
        for (var i = 0; i < galaxyRows.length; i++)
        {
            console.log(galaxyRows[i]);
        }
        var jsonData = JSON.stringify(galaxyRows);
        GM_xmlhttpRequest ( {
            method:     "POST",
            url:        "http://localhost:9090/api/activity",
            data:       jsonData,
            headers:    {
                "Authorization": GM_getValue('token'),
                "Content-Type": "application/json"
            },
            onload:     function (response) {
                console.log ("got response", response);
            }
        } );
    }

    function ParseGalaxy()
    {
        var galaxyRows = new Array();
        var rows = $('tr.row');

        console.log("init:", rows, rows.length);
        console.log(getState());
        for (var i = 0; i < rows.length; i++) {
            var galaxyRow = new GalaxyRow();
            var galaxySystem = GetCurrentGalaxySystem();

            var objItem = rows.eq(i).find('td.position');
            if (objItem.length == 1) {
                galaxyRow.planetPos = galaxySystem.split(':')[0]  + ':' + galaxySystem.split(':')[1]  + ':' + objItem.html();
            }
            else {
                continue;
            }

            var objItem = rows.eq(i).find('td.moon a');
            if (objItem.length == 1) {
                galaxyRow.moon = 1;
            }

            var objItem = rows.eq(i).find('td.playername').find('a[rel*="player"]');
            if (objItem.length == 0) // It is player himself
            {
                continue;/*
				galaxyRow.playerName = myName;
				galaxyRow.playerRank = $('#bar').find('a[href*="highscore"]').parent().text().split('(')[1].split(')')[0];*/
            }
            else
            {
                var playerId = objItem.eq(0).attr('rel').replace('player', '');
                if (playerId != 0) {
                    galaxyRow.playerName = objItem.find('span').text();

                    var link = $('a[href$="searchRelId=' + playerId + '"]');
                    galaxyRow.playerRank = link.length == 0 ? 0 : link.eq(0).text();
                }
            }

            var objItem = rows.eq(i).find('td.allytag').find('span:first');
            if (objItem.length == 1) {
                galaxyRow.allyTag = Trim(objItem.clone().children().remove().end().text());
            }

            var objItem = rows.eq(i).find('td.allytag').find('li.rank');
            if (objItem.length == 1) {
                galaxyRow.allyRank = objItem.find('a').text();
            }

            var objItem = rows.eq(i).find('td.microplanet.colonized').find('div.ListImage');
            if (objItem.length == 1) {
                galaxyRow.activity = objItem.find('div.activity').text().replace(/\D/g,'');
            }
            galaxyRow.server = getState().server;
            galaxyRows.push(galaxyRow);
        }
        return galaxyRows;
    }

    function GetCurrentGalaxySystem()
    {
        var key = 'span[id="pos-planet"]';

        if ($(key).length == 0)
        {
            var sLink = $('a.planetMoveIcons').eq(0).attr('onClick');

            if (!sLink) sLink = $('a.planetMoveIcons').eq(0).attr('href');

            var sGalaxy = parseInt(sLink.split('galaxy=')[1].split('&amp;')[0]);
            var sSystem = parseInt(sLink.split('system=')[1].split('&amp;')[0]);

            return sGalaxy + ':' + sSystem;
        }
        else
        {
            var coordinatess = $(key).eq(0).html().replace('[', '').replace(']', '');

            if (coordinatess == null) return;

            var coordinates = coordinatess.split(':');

            return coordinates[0] + ':' + coordinates[1];
        }
    }

    function Trim(string)
    {
        var sPattern = "\\S+.+\\S+";
        var objResult = (new RegExp(sPattern)).exec(string);

        return (objResult) ? objResult[0] : string;
    }

    /* **************************************************************/
    /* ******************** MODEL DATA ******************************/
    /* **************************************************************/

    function GalaxyRow()
    {
        this.planetPos = '';
        this.moon = '';
        this.playerName = '';
        this.playerRank = '';
        this.allyTag = '';
        this.allyRank = '';
        this.activity = '';
        this.server = '';

        this.ToString = function()
        {
            var str;

            if (this.playerRank == '-') this.playerRank = 0;

            str = this.planetPos + '\t';
            str += this.moon + '\t';
            str += this.playerName + '\t';
            str += this.playerRank + '\t';
            str += this.allyTag + '\t';
            str += this.allyRank + '\t';
            str += this.server + '\t';
            str += this.activity;
            str += '\n';

            return str;
        }

        this.GetHash = function()
        {
            var str;

            str = this.planetPos + '\t';
            str += this.moon + '\t';
            str += this.playerName + '\t';
            str += this.server + '\t';
            str += this.allyTag;
            str += '\n';

            return str;
        }
    }

    /* **************************************************************/
    /* ******************* LOGIN POPUP ******************************/
    /* **************************************************************/
    function showLoginError(error){
        $("#taLoginError").text(error);
        $("#taLoginError").show();
    }
    function drawLogin(visible) {
        if (!visible) {
            $("#taLogin").hide();
        }
        else {
            $("#taLoginError").hide();
            $("#taLogin").show();
        }
    }
    function drawAccount(visible) {
        if (!visible) {
            $("#taAccount").hide();
        }
        else {
            $("#taAPseudo").text(GM_getValue('pseudo'));
            $("#taAEmail").text(GM_getValue('email'));
            $("#taAccount").show();
        }
    }

    $("body").append ( `
<div id="taLogin" style="display: none;">
<form>
<h3 id="taLoginTitle">Login form</h3>
<input type="text" id="taEmail" value="" placeholder="email for TrackActi">
<input type="password" id="taPassword" value="" placeholder="password for TrackActi">
<br/>
<br/>
<span id="taLoginError" class="taError"></span>
<br/>
<button id="taLoginBtn" type="button">Login</button>
<button id="taCloseLoginBtn" type="button">Close</button>
</form>
</div>

<div id="taAccount" style="display: none;">
<form>
<h3 id="taAccountTitle">OG-TrackActi Account</h3>
<span>Account email: </span>
<span id="taAEmail" value=""></span>
<br/>
<span>Account pseudo: </span>
<span id="taAPseudo" value=""></span>
<br/>
<button id="taGoLoginBtn" type="button">Login</button>
<button id="taCloseAccountBtn" type="button">Close</button>
</form>
</div>
` );
    $("#taLoginBtn").click(function() {
        var email = $("#taEmail").val();
        var password = $("#taPassword").val();

        console.log(email, password);
        var jsonData = JSON.stringify({email:email, password:password, origin:'tampermonkey'});
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://localhost:9090/api/auth/login",
            data: jsonData,
            headers: {
                "Content-Type": "application/json"
            },
            onload: function(response) {
                var data = JSON.parse(response.responseText);
                if (data.hasError) {
                    showLoginError(data.error);
                }
                else {
                    var token = data.result.token.value;
                    var user = data.result.user;
                    GM_setValue('token', token);
                    GM_setValue('email', user.email);
                    GM_setValue('pseudo', user.pseudo);
                    drawLogin(false);
                }
            }
        } );
    } );

    $("#taCloseLoginBtn").click(function() {
        drawLogin(false);
    } );
    $("#taGoLoginBtn").click(function() {
        drawAccount(false);
        drawLogin(true);
    } );
    $("#taCloseAccountBtn").click(function() {
        drawAccount(false);
    } );

    //--- CSS styles make it work...
    GM_addStyle( `
.taError {
color: red;
visibility: none;
}
#taLogin, #taAccount {
position:               fixed;
top:                    80%;
left:                   0;
width:                  400px;
padding:                10px;
background:             rgba(51, 102, 153, 0.9);
border:                 2px black;
border-radius:          1ex;
z-index:                777;
}
#taLogin form{
margin-left: 10px !important;
margin-botton: 10px !important;
}
#taLogin button, #taAccount button{
cursor:                 pointer;
margin:                 1em 1em 0;
border:                 1px outset buttonface;
}
`);

    /* **************************************************************/
    /* ****************** DEBUT SCRIPT V6****************************/
    /* **************************************************************/
    var imgConv = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABGdBTUEAAK/INwWK6QAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAABUxJREFUSMetlk1vG8cZx38z+0bukiJFkSIlMpLVWC8xYhhoDMFFYOTQS5KiLXLJhwhQFDnknnsOQT9A8xkKNOi5ORS2CyetnchyKliyJVEvtEhRIrnc98mBFC2K9c3P4MHuzs48/33+859nVgBUFpbfA/4C3AE03ozFwH3gz0e7W9+LysLyHSHEvZnyApn8DJpuvBmUKKTbbtI83kUp9Rsd+LpQfgtnKk/ouwT95I0ACSlxpvIoFM2j3a91YD3tZPH7XeIoRKkLIAGAlJIkSQBFoXgThEGv18B364B6PZCQxFFI2skCrOuATOKIKPRR6tVEOzOHAMrlGkJIDNnHlyvs1o9JGwWEdUYuP0Wr1SII3AkgpWJUmCA1HUDqAEkcD7/6lVlODduyMOwSi5UcN1YXOdjf5vq1NX7c2MKTAbZtk0QmUzmb+sEertu+AqZI4njAzLBn5CqBQvE6MmzTb79gb+cRm5uP+dvf/8Hs/NsodBzTg9hlt5GQK63ROvXonPfH4ow5oAMoFEoppqYXKZRWCYMOrb17IEw8r8fZiUAzdP76zXNUFHDr9m+5fXud/23+wKONB4R+myRsI6U9SeFwHUVlYVnNVpcIPBeUBKVIhEAph+l0g34yTxieD7cFOE6RfL7Cwf4TgjCkNL9CHAV02vuk0xmCoE8cRyMgM2XTqO8MqFNKoVSCIkKJGEHETPUmh2cFzEwZzSyiFCwtXqNYsGkePkLTNdbvfMhMVqdYmkNqDp1OhygKBrFGPshIy+RmvnQyOaIwGKh16EpY1GpLCGcNzXC4vuhw9/11gqTE7t4RUdjDyUxTqcyD0LGcWdKWoHt+OhZH1w3c7tlFRsmEu6dPmau9SyUf8+nvP+SDP8zy0Sdv4fWPsOwicaLYfvYfpFUgk4Lra7+mPL/yf2ONVDcQhxpzgM1H31ItmUTeHjeq77NQusXSqqDX62BaDmHosbnxkONWQP24je1k0a38lVhcUt0l5MvWPavTbDaYsgN+euzw3f2v2HrmY6QLmPj4XsLJy+fkcwVO6w/xC2vkcnle9puX9lJyGUjxbOMhZipN4PWHaklTXXqHzY37ZO27HBz/l/v/egzSwtQDkkSh6Smi0KfZPqPT2qfZNUgl58RRjJBitGlH8s4X5/DcDgAHO0+ZX1oby8zQLSrla/QCjdmZFF6g83z7JwQe04VZMKbotfZI2Xkiv0237yPEIJOUnaV9cjhJXeD3J2gMwoB2z6dWW8CyZ1irZvj4d3/k2fY2B4d16vUX9HunWFqAMGapVm9ytPNP4tgbpw4FKhmWCsMa3V+Y1CCMoed6tBv3sNUKpZks791ap1Q+JeQHzhsbpJ0s3cjB7Z6QJGIQ53ViEFJMZKRJSeQ22Pl5CyElnhewf/iCfP573MhAM6cp5IscNlpoFphhhyTujQrBmBguFq1cexulFPvbT0ApDDPF3OIycewihEAlMS+bR7xsHmGa+9QWVtG9Y+K4TxK5JElA6CoQ42IYFlXGziIATdOpLCwDsLv1I9Vf3Rgbk81McePduzx58gARtYn8Pgj5aszwejFDHzsmLlkchaAU9Z1NqkvvTLzvds94cO9bAHKZFFY6S+wF+GF8pXy/yihRSSKvZmSYFvWdTeavrU1ke2k+AK4fkzINlBITY9XgQE0k8O8oCgf8XyodYeAzt7jKwfOnE+Xpqvu+T8/18IJgrF8IMWAGHkop5edh0Edq+kBxwzbgV1FZXOHwxc+j/te1MA7HnoUUSE0nCPpIKb8QAB/MVj+LpfbViZ2xvTf0X5eKQopu19VQf/ruaO+bXwCEJEi8cQlpAgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0wNi0yMlQwMjo1NjowMyswMjowMHhEreAAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMDYtMjJUMDI6NTY6MDMrMDI6MDAJGRVcAAAASnRFWHRzaWduYXR1cmUANTk3YWUwZjM0ZDI1MzQwN2NjZjEzNjM1NmE4MjcyNTAxYjAwYjBmYTA1MmI0NDVkYTBhYTViMjc2ZjRlOWVhMxHOMokAAAAASUVORK5CYII=";

    function init(){
        setState({
            pseudo: document.getElementsByName('ogame-player-name')[0].content,
            idPlayer : document.getElementsByName('ogame-player-id')[0].content,
            server : document.getElementsByName('ogame-universe')[0].content});
        var token = GM_getValue('token');
        if (!token) {
            drawLogin();
        }
    }

    init();

    // Draw MENU
    if (!/page=empire/.test(location.href))
    {
        var aff_option = `<span class="menu_icon">
<a id="iconeUpdateTA" href="" target="blank_" >
<img id="imgMenuTA" class="mouseSwitch" src="` + imgConv + `" rel="` + imgConv + `" height="26" width="26">
</a></span>
<a id="affOptionsTA" class="menubutton" href="#" accesskey="" target="_self">
<span  class="textlabel">TrackActi</span></a>`;

        var tableau = document.createElement("li");
        tableau.innerHTML = aff_option;
        tableau.id = 'optionTrackActi';
        document.getElementById('menuTableTools').appendChild(tableau);

        document.getElementById('affOptionsTA').addEventListener("click", function (event)
        {
            var token = GM_getValue('token');
            if (token) {
                drawAccount(true);
            } else {
                drawLogin(true);
            }
        }, true);
    }
    // CHECK GALAXY
    if (/page=galaxy/.test(location.href))
    {
        var galaxyObserver = new MutationObserver(function(mutations, observer) {
            var token = GM_getValue('token');
            if (token) {
                ObserverCurrentGalaxy();
            }
        });
        galaxyObserver.observe(document.getElementById("galaxyContent"), { childList: true });
    }
    // CHECK SPY
    else if (/page=messages/.test(location.href))
    {
    }
    // CHECK RANK
    else if (/page=highscore/.test(location.href))
    {
    }
})();