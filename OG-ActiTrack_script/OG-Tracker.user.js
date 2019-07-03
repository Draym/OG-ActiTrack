// ==UserScript==
// @name        OG-Tracker
// @description [do not use under v2] Track ogame data : player activity & score & position
// @include     *.ogame*gameforge.com/game/index.php*
// @author      Draym
// @copyright   2019, Draym (draymlab.fr)
// @license     MIT
// @version     1.0.1.7
// @updateURL https://openuserjs.org/meta/Draym/OG-Tracker.meta.js
// @downloadURL https://openuserjs.org/install/Draym/OG-Tracker.user.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @connect        localhost
// ==/UserScript==

// ==OpenUserJS==
// @author Draym
// ==/OpenUserJS==

(function() {
    'use strict';
    var $ = unsafeWindow.$;
    var state = {
        log: true,
        api: 'http://localhost:9090/api'
    };
    function getState() {
        return state;
    }
    function setState(data) {
        for (var key in data) {
            state[key] = data[key];
        }
    }

    function tk_log(...values) {
        if (state.log) {
            console.log(...values);
        }
    }

    /* **************************************************************/
    /* ********************** RANKING *******************************/
    /* **************************************************************/
    function isPlayerRankPage() {
        var menuPlayer = $('div#categoryButtons').find('a#player');
        return menuPlayer.hasClass('active');
    }

    function tk_observeRanking() {
        console.log("update");
        if (!isPlayerRankPage()) {
            return;
        }
        var rankingRows = tk_parseRanking();
        if (rankingRows.length == 0) {
            return;
        }
        var jsonData = JSON.stringify(rankingRows);
        GM_xmlhttpRequest ( {
            method:     "POST",
            url:        getState().api + "/player/ranking/save",
            data:       jsonData,
            headers:    {
                "Origin":"tampermonkey_" + getState().server,
                "Authorization": GM_getValue('tk_token'),
                "Content-Type": "application/json"
            },
            onload:     function (response) {
                if (response.status == 200) {
                    var data = JSON.parse(response.responseText);
                }
                tk_log("observeRanking: ", rankingRows, response.responseText);
            }
        } );
    }

    function tk_parseRanking() {
        var rankingRows = [];
        var rows = $('tr[id^="position"]');

        let rankType = $('div#typeButtons').find('a.active');
        for (var i = 0; i < rows.length; i++) {
            if (rows.eq(i).hasClass('myrank')) {
                continue;
            }
            let rankPos = rows.eq(i).find('td.position').html().trim();
            let rankScore = rows.eq(i).find('td.score').html().trim().replace(/\./g,'');
            let playerName = rows.eq(i).find('td.name a span.playername').text().trim();
            let playerRef = rows.eq(i).find('td.sendmsg div.sendmsg_content a.sendMail').attr('data-playerid').trim();
            let honor = rows.eq(i).find('td.name a span.honorScore span').text().trim().replace(/\./g,'');

            rankingRows.push({
                playerName: playerName,
                playerRef: playerRef,
                playerHonor: parseInt(honor),
                rankPosition: parseInt(rankPos),
                rankScore: parseFloat(rankScore),
                rankTypeId: rankType.attr('rel'),
                rankTypeName: rankType.find('span.textlabel').text(),
                server: getState().server
            });
        }
        tk_log("rows", rankingRows);
        return rankingRows;
    }

    /* **************************************************************/
    /* ********************** GALAXY ********************************/
    /* **************************************************************/
    function tk_observePlayerTooltip() {
        let tooltip = $('div.t_Tooltip.t_Tooltip_cloud.t_visible');

        if (tooltip) {
            let tooltipContent = tooltip.find('div.t_Content div.t_ContentContainer.t_clearfix.t_Content_cloud div.htmlTooltip.galaxyTooltip');
            let playerRef = tooltipContent.attr('id');
            let playerName = tooltipContent.find('h1 span').text().trim();

            let parameters = {
                playerRef: playerRef,
                playerName: playerName,
                server: getState().server
            };

            GM_xmlhttpRequest ( {
            method:     "PUT",
            url:        getState().api + "/player/update",
            data:       JSON.stringify(parameters),
            headers:    {
                "Origin":"tampermonkey_" + getState().server,
                "Authorization": GM_getValue('tk_token'),
                "Content-Type": "application/json"
            },
            onload:     function (response) {
                if (response.status == 200) {
                    var data = JSON.parse(response.responseText);
                }
                tk_log("observePlayerTooltip: ", parameters, response.responseText);
            }
        } );
        }
    }

    function tk_observeCurrentGalaxy() {
        var galaxyRows = tk_parseGalaxy();
        var jsonData = JSON.stringify(galaxyRows);
        GM_xmlhttpRequest({
            method:     "POST",
            url:        getState().api + "/activity/save",
            data:       jsonData,
            headers:    {
                "Origin":"tampermonkey_" + getState().server,
                "Authorization": GM_getValue('tk_token'),
                "Content-Type": "application/json"
            },
            onload:     function (response) {
                if (response.status == 200) {
                    var data = JSON.parse(response.responseText);
                }
                tk_log("observeCurrentGalaxy: ", galaxyRows, response.responseText);
            }
        });
    }

    function tk_parseGalaxy()
    {
        var galaxyRows = [];
        var rows = $('tr.row');
        var galaxySystem = tk_getCurrentGalaxySystem();

        for (var i = 0; i < rows.length; i++) {
            var planetItem = new tkGalaxyRow();

            var objItem1 = rows.eq(i).find('td.position');
            if (objItem1.length == 1) {
                planetItem.position = galaxySystem.split(':')[0] + ':' + galaxySystem.split(':')[1] + ':' + objItem1.html();
            } else {
                tk_log("no planet");
                continue;
            }

            var objItem2 = rows.eq(i).find('td.playername');
            if (objItem2.find('a[rel*="player"]').length == 1) {
                objItem2 = objItem2.find('a[rel*="player"]');
                var playerId = objItem2.eq(0).attr('rel').replace('player', '');
                if (playerId != 0) {
                    planetItem.playerName = objItem2.find('span').text().trim();
                    planetItem.playerRef = objItem2.eq(0).attr('rel');
                }
            } else if(objItem2.find("span.status_abbr_active").length == 1) {
                //planetItem.playerName = objItem2.find("span.status_abbr_active").text().replace(/\s/g,'');
                continue;
            } else {
                planetItem.isEmpty = true;
                planetItem.playerName = "";
            }

            var objItem3 = rows.eq(i).find('td.allytag').find('span:first');
            if (objItem3.length == 1) {
                planetItem.allyTag = Trim(objItem3.clone().children().remove().end().text());
            }

            var objItem5 = rows.eq(i).find('td.microplanet.colonized').find('div.ListImage');
            if (objItem5.length == 1) {
                if (objItem5.find('div.minute15').length == 1) {
                    planetItem.activity = "0";
                } else {
                    planetItem.activity = objItem5.find('div.activity').text().trim();
                }
            }
            planetItem.server = getState().server;

            var objItem6 = rows.eq(i).find('td.moon');
            if (objItem6.length == 1 && objItem6.find("a").length != 0) {
                var moonItem = tk_copyGalaxyRow(planetItem);
                moonItem.isMoon = true;
                if (objItem6.find('div.minute15')) {
                    moonItem.activity = "0";
                } else if (objItem6.find('div.activity')) {
                    moonItem.activity = objItem6.find('div.activity').text().trim();
                }
                galaxyRows.push(moonItem);
            }
            galaxyRows.push(planetItem);
        }
        return galaxyRows;
    }

    function tk_getCurrentGalaxySystem()
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

    function tk_copyGalaxyRow(row) {
        let result = new tkGalaxyRow();
        result.position = row.position;
        result.isMoon = row.isMoon;
        result.isEmpty = row.isEmpty;
        result.playerName = row.playerName;
        result.playerRef = row.playerRef;
        result.allyTag = row.allyTag;
        result.activity = row.activity;
        result.server = row.server;
        return result;
    }

    function tkGalaxyRow()
    {
        this.position = '';
        this.isMoon = false;
        this.isEmpty = false;
        this.playerName = '';
        this.playerRef = '';
        this.allyTag = '';
        this.activity = '';
        this.server = '';

        this.ToString = function()
        {
            var str;

            if (this.playerRank == '-') this.playerRank = 0;

            str = this.position + '\t';
            str += this.isMoon + '\t';
            str += this.playerName + '\t';
            str += this.playerRef + '\t';
            str += this.allyTag + '\t';
            str += this.server + '\t';
            str += this.activity;
            str += '\n';

            return str;
        }

        this.GetHash = function()
        {
            var str;

            str = this.position + '\t';
            str += this.isMoon + '\t';
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
    function tk_showLoginError(error){
        $("#tkLoginError").text(error);
        $("#tkLoginError").show();
    }
    function tk_drawLogin(visible) {
        if (!visible) {
            $("#tkLogin").hide();
        }
        else {
            $("#tkLoginError").hide();
            $("#tkLogin").show();
        }
    }
    function tk_drawAccount(visible) {
        if (!visible) {
            $("#tkAccount").hide();
        }
        else {
            $("#tkAPseudo").text(GM_getValue('tk_pseudo'));
            $("#tkAEmail").text(GM_getValue('tk_email'));
            $("#tkAccount").show();
        }
    }

    $("body").append ( `
<div id="tkLogin" style="display: none;">
<form>
<h3 id="tkLoginTitle">Login form</h3>
<input type="text" id="tkEmail" value="" placeholder="email for OG-Tracker">
<input type="password" id="tkPassword" value="" placeholder="password for OG-tracker">
<br/>
<br/>
<span id="tkLoginError" class="tkError"></span>
<br/>
<button id="tkLoginBtn" type="button">Login</button>
<button id="tkCloseLoginBtn" type="button">Close</button>
</form>
</div>
<div id="tkAccount" style="display: none;">
<form>
<h3 id="tkAccountTitle">OG-Tracker Account</h3>
<span>Account email: </span>
<span id="tkAEmail" value=""></span>
<br/>
<span>Account pseudo: </span>
<span id="tkAPseudo" value=""></span>
<br/>
<button id="tkGoLoginBtn" type="button">Change Account</button>
<button id="tkCloseAccountBtn" type="button">Close</button>
</form>
</div>
` );
    $("#tkLoginBtn").click(function() {
        var email = $("#tkEmail").val();
        var password = $("#tkPassword").val();

        var jsonData = JSON.stringify({email:email, password:password, origin:"tampermonkey_" + getState().server});
        GM_xmlhttpRequest({
            method: "POST",
            url: getState().api + "/auth/login",
            data: jsonData,
            headers: {
                "Origin":"tampermonkey_" + getState().server,
                "Content-Type": "application/json"
            },
            onload: function(response) {
                if (response.status == 200) {
                    var data = JSON.parse(response.responseText);
                    GM_setValue('tk_token', data.token.token);
                    GM_setValue('tk_tokenBackup', data.token.tokenBackup);
                    GM_setValue('tk_email', data.user.email);
                    GM_setValue('tk_pseudo', data.user.pseudo);
                    tk_drawLogin(false);
                }
                else {
                    tk_showLoginError(response.responseText);
                }
            }
        } );
    } );

    $("#tkCloseLoginBtn").click(function() {
        tk_drawLogin(false);
    } );
    $("#tkGoLoginBtn").click(function() {
        tk_drawAccount(false);
        tk_drawLogin(true);
    } );
    $("#tkCloseAccountBtn").click(function() {
        tk_drawAccount(false);
    } );

    /* **************************************************************/
    /* *********************** GUI **********************************/
    /* **************************************************************/
    var imgConv = "data:image/png;base64,AAABAAEAPzsAAAEAIAAUPAAAFgAAACgAAAA/AAAAdgAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYFRYCGBUWBhgVFhYYFRa6GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFroYFRYbGBUWEBgVFgIYFRYJGBUWqBgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUWqBgVFgQYFRYWGBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFjwYFRbJGBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFuQYFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/cnKC/zk5T/8gHzf/BgYi/wAAHf8AAB3/AAAd/wAAHf8AAB3/Fxcx/zIySf9oaHn/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/Tk5i/w0NKf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wgIJP9RUWX/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/0REWf8AAB3/AAAd/wAAHf8lJT7/W1tu/52dqP/Hx83/1tbb/+Xl6P/09PX/+/v7/+vr7f/b29//y8vR/7Cwuf90dIT/ODhP/wAAHf8AAB3/AAAd/x4dJ/8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv9dXW//AAAd/wAAHf8aGjT/f3+N/9PT2P///////////////////////////////////////////////////////////////////////////+Xl6P+ZmaX/MzNK/wAAHf8AAB3/Hh44/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xoaNP8AAB3/Gho0/39/jf/m5un///////////////////////////////////////T09f/W1tv/x8fN/+Xl6P///////////////////////////////////////////5mZpf8zM0r/AAAd/wAAHf9KSl//GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/AAAd/wAAHf9OTmL/3Nzg///////////////////////j4+b/qqq0/2Rkdv8xMUj/ExMu/wAAHf8AAB3/AAAd/wAAHf8EBCH/IiI7/0BAVv8AAB3/AAAd/2xsff//////////////////////fHyL/wAAHf8AAB3/FBQv/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xoaNP8AAB3/AAAd/3h4h//////////////////19fb/lJSg/zk5UP8AAB3/Dw8q/y0tRf8YGDL/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/ygoQP9NTWH/s7O8/////////////////7a2vv8zM0r/AAAd/wAAHf8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/FRUw/wAAHf8AAB3/o6Ot////////////5+fq/4aGlP8mJj//AAAd/0tLX/+lpa//////////////////rq63/xgYMv8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf9xcYH/KytD/01NYf+zs7z////////////w8PL/VVVo/wAAHf8AAB3/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8vL0b/AAAd/wAAHf+qqrT///////////+urrf/IyM8/wAAHf8AAB3/OTlP//X19v/////////////////v7u7/9/f3/8rK0P8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/vb3E/5iYpP8UFC//YmJ0/////////////////1VVaP8AAB3/Cgom/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/0xMYP8AAB3/AAAd/6qqtP///////////5aWov8AAB3/AAAd/wAAHf8AAB3/zs7U///////////////////////8/Pz/xsTC//v7+/8uLkb/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/UVFl///////X19z/XFxv/ygoQP/k5Of///////////9VVWj/AAAd/x4dJ/8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/hoaU/wAAHf8AAB3/o6Ot////////////f3+N/wAAHf8AAB3/AAAd/wAAHf9kZHb////////////////////////////o5+f/xsTC//j39/8kJD3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/7e3v////////////4eHlf8AAB3/xsbN///////w8PL/MzNK/wAAHf9YWGv/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/DAwo/wAAHf94eIf///////////+qqrT/AAAd/wAAHf8AAB3/AAAd/wAAHf9/f43///////////////////////Tz8//IxsT/2NbV/9LS1/8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/3R0hP////////////////+WlqL/AAAd/9XV2v//////tra+/wAAHf8AAB3/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv9VVWj/AAAd/05OYv///////////6qqtP8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf9tbX7/+vn5/+rq6f/w8O//3dzb/8rJx//Qzs3/9vb1/3h4h/8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/zIySf//////////////////////o6Ou/wQEIf/V1dr//////3x8i/8AAB3/MDBG/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8AAB3/GBgy/9zc4P//////xsbM/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8kJD3//////9za2f/GxML/ysnH/97d3P/5+fj/qqq0/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf/x8fP//////////////////////4uLmP8yMkn/+Pj5//////8wMEj/AAAd/39/jf8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/0FBV/8AAB3/eXmI////////////VVVo/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/QEBW/8fHzf///////////9LS1/94eIf/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf+7u8P///////////////////////////9AQFb/gICO//////+RkZ7/AAAd/x4eOP8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/wAAHf8KCib/2dnd//////+qqrT/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8oKED/IiI7/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf+EhJL///////////////////////////+4uMD/Cwsn/9zc4P/x8fP/IiI7/wAAHf+MjJn/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/cXGB/wAAHf9ra3z///////////85OVD/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf9NTWH/////////////////////////////////X19x/2pqe///////g4OR/wAAHf8eHSf/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/Hh44/wAAHf/Gxsz//////62ttv8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf9LS1//////////////////////////////////sbG6/xISLf/7+/v/2dnd/wAAHf8AAB3/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/AAAd/xwcNv///////////1pabf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf9aWm3//////////////////////////////////////y0tRf+3t7///////0FBV/8AAB3/ZmZ3/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv97e4r/AAAd/1VVaP///////////wgIJP8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf9paXr//////////////////////////////////////4CAjv9zc4P//////4aGlP8AAB3/RERZ/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv9HR1z/AAAd/46Om///////t7e//wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf94eIf//////////////////////////////////////6qqtP84OE///////8vL0f8AAB3/Hx4y/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8ODin/UVFl/9zc4P/47cL/l5ej/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf+RkZ7//////////////////////////////////////9XV2v8YGDL///////nuxf+enqn/AAAd/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv+urrf///////Timv/689b/eHiH/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf+0tL3///////////////////////////////////////////8AAB3/9/f4//Tinf/04Zf/9vb3/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/8tyI/+O1AP/9+ev/WFhr/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf/W1tv///////////////////////////////////////////8AAB3/19fc//bnrv/luQz/8NZx/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv/szE3/47UA/+O1AP//////SEhd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf/5+fr///////////////////////////////////////////8AAB3/xsbM//jsv//jtQD/47UA/+3NU/8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/+W7Ff/jtQD/47UA/+O1AP/9+e3/amp7/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/x0dN/////////////////////////////////////////////////8AAB3/4eHk//Tglf/jtQD/47UA/+O1AP/w13T/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/7tRq/+O1AP/jtQD/47UA/+O1AP/79dz/jY2a/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/0BAVv////////////////////////////////////////////////8AAB3//Pz8/+/Ua//jtQD/47UA/+O1AP/jtQD/9eWm/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/47UA/+O1AP/jtQD/47UA/+O1AP/578r/srK7/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/4WFk////////////////////////////////////////////5CQnf8YGDL//////+vJR//jtQD/47UA/+O1AP/jtQD/68pJ/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv95bUD/47UA/+O1AP/jtQD/47UA/+O1AP/y3Ib//////1BQZP8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/8vL0f//////////////////////////////////////t7e//wAAHf88PFL//////+fAJP/jtQD/47UA/+O1AP/jtQD/0KYA/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv9/fXX/47UA/+O1AP/jtQD/47UA/+O1AP/jtQD/+/Xc/9fX3P83N07/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/Gho0//////////////////////////////////////+wsLn/HR03/0REWf/k5Of/9eWl/+O1AP/jtQD/47UA/+O1AP/jtQD/YFUp/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/d2o1/+O1AP/jtQD/47UA/+O1AP/jtQD/47UA//rxz//y8vT/Xl5w/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/Xl5w////////////////////////////oqKt/0FBV/8AAB3/YmJ0///////z4Zb/47UA/+O1AP/jtQD/47UA/+O1AP/jtQD/FxYT/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/AAAA/56KOf/jtQD/47UA/+O1AP/jtQD/47UA/+O1AP/z3oz//////5SUoP8iIjv/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAA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Fv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/wAAHf8AAB3/AAAd/2xjT//HpCD/47UA/+O1AP/jtQD/47UA/+O1AP/jtQD/47UA/+O1AP/jtQD/47UA/+O1AP/jtQD/47UA/+O1AP/jtQD/47UA/+O1AP/jtQD/47UA/7GXNv9CP0f/AAAd/wAAHf8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8fHjL/AAAd/wAAHf8DAyD/S0ZG/5SAPf/jtQD/47UA/+O1AP/jtQD/47UA/+O1AP/jtQD/47UA/+O1AP/jtQD/47UA/+O1AP/jtQD/47UA/76hMf+DdlL/REBJ/wAAHf8AAB3/AAAd/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/x4dJ/8AAB3/AAAd/wAAHf8ODij/YlpN/5B/Sf+tlDn/yqYg/+O1AP/jtQD/47UA/+O1AP/Rqxf/s5g2/5KBSP9oYFD/JCM5/wAAHf8AAB3/AAAd/wAAHf8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/Tk5i/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wMDIP8lJDn/NTNC/xAQKv8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8dHCr/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/R0dc/w4OKf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf8AAB3/AAAd/wAAHf9AQFb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRaTGBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFroYFRYdGBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFiAYFRYQGBUWuhgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUWuhgVFhMYFRYFGBUWAhgVFg8YFRaoGBUW6hgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFv8YFRb/GBUW/xgVFroYFRYbGBUWAhgVFgkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

    if (!/page=empire/.test(location.href))
    {
        var aff_option = `<span class="menu_icon">
<a id="iconeUpdateTK" href="" target="blank_" >
<img id="imgMenuTK" class="mouseSwitch" src="` + imgConv + `" rel="` + imgConv + `" height="26" width="26">
</a></span>
<a id="affOptionsTK" class="menubutton" href="#" accesskey="" target="_self">
<span  class="textlabel">OG-Tracker</span></a>`;

        var tableau = document.createElement("li");
        tableau.innerHTML = aff_option;
        tableau.className += "custom-option";
        tableau.id = 'option-Tracker';
        document.getElementById('menuTable').appendChild(tableau);

        document.getElementById('affOptionsTK').addEventListener("click", function (event)
        {
            var token = GM_getValue('tk_token');
            if (token) {
                tk_drawAccount(true);
            } else {
                tk_drawLogin(true);
            }
        }, true);
    }
    /* **************************************************************/
    /* ********************* STARTER ********************************/
    /* **************************************************************/

    function init(){
        console.log("window:", unsafeWindow);
        setState({
            pseudo: document.getElementsByName('ogame-player-name')[0].content,
            idPlayer : document.getElementsByName('ogame-player-id')[0].content,
            server : document.getElementsByName('ogame-universe')[0].content});
        var token = GM_getValue('tk_token');
        if (!token) {
            tk_drawLogin(true);
        }
    }

    init();

    // CHECK GALAXY
    if (/page=galaxy/.test(location.href))
    {
        var galaxyObserver = new MutationObserver(function(mutations, observer) {
            var token = GM_getValue('tk_token');
            if (token) {
                tk_observeCurrentGalaxy();
            }
        });
        galaxyObserver.observe(document.getElementById("galaxyContent"), { childList: true });

        var tooltipObserver = new MutationObserver(function(mutations, observer) {
            tk_observePlayerTooltip();
        });
        tooltipObserver.observe($('#galaxy').get(0), { childList: true });
    }
    // CHECK SPY
    else if (/page=messages/.test(location.href))
    {
    }
    // CHECK RANK
    else if (/page=highscore/.test(location.href))
    {
        tk_observeRanking();
        var rankingObserver = new MutationObserver(function(mutations, observer) {
            var token = GM_getValue('tk_token');
            if (token) {
                tk_observeRanking();
            }
        });
        rankingObserver.observe($("div#stat_list_content").get(0), { childList: true });
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

/*** CUSTOM ***/
.tkError {
color: red;
visibility: none;
}
#tkLogin, #tkAccount {
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
#tkLogin form{
margin-left: 10px !important;
margin-botton: 10px !important;
}
#tkLogin button, #tkAccount button{
cursor:                 pointer;
margin:                 1em 1em 0;
border:                 1px outset buttonface;
}
`);
})();