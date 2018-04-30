// ==UserScript==
// @name         LDJAM 41 Game Platform Filter
// @version      1.0
// @description  Filter Games
// @author       Crs38c28@github / Crsrc@LDJAM
// @icon         data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAsSAAALEgHS3X78AAAAHXpUWHRBdXRob3IAAHja883MTlXwTiwuKKpKzAYAINEE7jW+oeQAAAKdSURBVGje7Zo7bNNQFIbjR2yr4EAfICXOxtCSKQi1U0WlVt2QaMVKh06MjCBgo0jMSLAisaM2HRgIMSskU4X6ACmZ4haEwsMmIk784IS4aVNZqW+aFB/p/lI8JJbu+XzueTmXiccTEcxiI8hFASgABaAAFIACUAAKcALx8Nmcjge8e/ljJf+rHuTOzTtSD9bkyw5cNd1Vi7ZacoIChEdTSW9HLKY4w3TfFp31bbtFhW8LySIDGC9uCivzUVnEHAOAkV0WF1Ms4iAGb6zMC74MmLIQMCylOdxp9N5MdO4Si7sOPO6MaXwAEA9Prwu4KzGUi3bFwNpK3LjM4QZYSHFKjMHdzLWcgBhgKsmEopl79t6Ca0xqhub4GMEDnUyCBxr/H+D5B+tQ28NCuSVKR+HaQqtbztqWjXsiy2wTACix8AF0H1+OKC6zoQPoMrv0YQspEndqU2UQ7RkOGcD4mYFnrVtpgiU0ndADCxeHJgbJcPcaT+QB3XSb1uzWrIQUyCyZZ19duZD/GeTNSjWgETC297B5QIYZ2fn2D0Az7YAA3krnhT4CkNrdVkGzcfdChbLrAagVEyNArrjvgVylhs566Dg0fd8DEAOfqg1cAO2Ow4uBta9/EFmvlg5emHoAL3erWJwA2fP+m4ZPK/GkpKMAeJCtG4eSDifLsleWTXvPtGdHpf6skxhIYniYrb/+3NGuHgCAdqqWIvITZ6PhBADrYeI58mUHQDM+vtd+W+70sBgqANgzj975WO8DANowGmqllo4JYwIXBgBI+bcz9Y0vru+vTJcDT3Mj0pIyNHmuJ29c/XHypw61NnPcX0zMsSe2FJGD7m12RJJ5hgCmJ4BC2W51+ZDpc8VAsyVDj5xRAApAASgABaAAFIAC4NVf/rzXcnQlK5oAAAAASUVORK5CYII=
// @match        https://ldjam.com/events/ludum-dare/41/games
// @include      https://api.ldjam.com/vx/node/get/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @run-at       document-start
// @grant        GM_webRequest
// @webRequest   [{"selector":{"match":"https://api.ldjam.com/vx/node/get/*"},"action":{"redirect":{"from":"([^:]+)://api.ldjam.com/vx/node/get/(.*)","to":"$1://api.ldjam.com/vx/node/get/$2"}}}]
// ==/UserScript==

var templist = [];
var tagurl =['link-01','link-02','link-03','link-04','link-05'];
var currently_active_webrequest_rule = JSON.stringify(GM_info.script.webRequest); // == @webRequst header from above

GM_webRequest([
    { selector: { match: 'https://api.ldjam.com/vx/node/get/*' }, action: { redirect: { from: '([^:]+)://api.ldjam.com/vx/node/get/(.*)',  to: '$1://api.ldjam.com/vx/node/get/$2' } } }
], function(info, message, details) {
    // Hook Web Fetch Request
    // Prevent request call loop
    if(templist.includes(details.url)){
        return;
    }
    // if it is the Game List Request (a+b+c...)
    if(!details.url.includes('+')){
        return;
    }
    templist.push(details.url);
    // Send Request and add tag to each block
    $.get( details.url, function( data ) {
        data.node.forEach((key)=>{
            let AddClassName = "FilterBox";
            tagurl.forEach((tag)=>{
                if((key.meta[tag+"-tag"])&&(key.meta[tag]!="")){
                    switch(key.meta[tag+"-tag"]) {
                        case "42332":
                            AddClassName+=" FilterSourceCode";
                            break;
                        case "42336":
                            AddClassName+=" FilterHTML5";
                            break;
                        case "42337":
                            AddClassName+=" Filterwindows";
                            break;
                        case "42339":
                            AddClassName+=" FiltermacOS";
                            break;
                        case "42341":
                            AddClassName+=" FilterLinux";
                            break;
                        case "42342":
                            AddClassName+=" FilterAndroid";
                            break;
                        case "42346":
                            AddClassName+=" FilteriOS";
                            break;
                        case "42438":
                            AddClassName+=" FilterFlashWeb";
                            break;
                        case "42439":
                            AddClassName+=" FilterJavaWeb";
                            break;
                        case "42440":
                            AddClassName+=" FilterOtherWeb";
                            break;
                        case "42512":
                            AddClassName+=" FilterOtherPlatform";
                            break;
                    }
                }
            });
            $('a[href="'+key.path+'"]').addClass(AddClassName);
            if($('.FilterPlatform').length!=0){
                filter_show();
            }
        });
    });
});

function Insert_block(){
    $('.content-event').after('<div class="content-base content-common filter-platform"><div class="content-common-body FilterPlatform"><h3 style="width:100%">Platfrom</h3><div class="FilterItem"><input type="checkbox" id="Check_sourcecode" checked><span>Source Code</span></div><div class="FilterItem"><input type="checkbox" id="Check_HTML5" checked><span>HTML5 (web)</span></div><div class="FilterItem"><input type="checkbox" id="Check_Windows" checked><span>Windows</span></div><div class="FilterItem"><input type="checkbox" id="Check_macOS" checked><span>macOS</span></div><div class="FilterItem"><input type="checkbox" id="Check_Linux" checked><span>Linux</span></div><div class="FilterItem"><input type="checkbox" id="Check_Android" checked><span>Android</span></div><div class="FilterItem"><input type="checkbox" id="Check_iOS" checked><span>iOS</span></div><div class="FilterItem"><input type="checkbox" id="Check_Flash" checked><span>Flash (web)</span></div><div class="FilterItem"><input type="checkbox" id="Check_Java" checked><span>Java (web)</span></div><div class="FilterItem"><input type="checkbox" id="Check_OtherWeb" checked><span>Other (web)</span></div><div class="FilterItem"><input type="checkbox" id="Check_OtherPlatform" checked><span>Other (platform)</span></div><div style="width: 100%;padding-top: 0.5rem;"><div id="FilterBtn" class="button-link content-common-nav-button" style="cursor:pointer;">Update</div></div></div></div>');
    $('#FilterBtn').bind( 'click', function() {
        filter_show();
    });
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function filter_show(){
    $('.FilterBox').parent().hide();
    if ($('#Check_sourcecode').is(':checked')) {
        $('.FilterSourceCode').parent().show();
    }
    if ($('#Check_HTML5').is(':checked')) {
        $('.FilterHTML5').parent().show();
    }
    if ($('#Check_Windows').is(':checked')) {
        $('.Filterwindows').parent().show();
    }
    if ($('#Check_macOS').is(':checked')) {
        $('.FiltermacOS').parent().show();
    }
    if ($('#Check_Linux').is(':checked')) {
        $('.FilterLinux').parent().show();
    }
    if ($('#Check_Android').is(':checked')) {
        $('.FilterAndroid').parent().show();
    }
    if ($('#Check_iOS').is(':checked')) {
        $('.FilteriOS').parent().show();
    }
    if ($('#Check_Flash').is(':checked')) {
        $('.FilterFlashWeb').parent().show();
    }
    if ($('#Check_Java').is(':checked')) {
        $('.FilterJavaWeb').parent().show();
    }
    if ($('#Check_OtherWeb').is(':checked')) {
        $('.FilterOtherWeb').parent().show();
    }
    if ($('#Check_OtherPlatform').is(':checked')) {
        $('.FilterOtherPlatform').parent().show();
    }
}

(function () {
    addGlobalStyle('.FilterPlatform {display:flex;flex-wrap:wrap;padding:0 0 1rem 0;}');
    addGlobalStyle('.FilterItem {width:50%;}');

    setTimeout(Insert_block, 2000);
})();

