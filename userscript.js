// ==UserScript==
// @name         LDJam Local Favorite List
// @version      1.0
// @description  Add games into a list, so I can play it later. (Local Storage)
// @author       Crs38c28@github / Crsrc@LDJAM
// @icon         data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAsSAAALEgHS3X78AAAAHXpUWHRBdXRob3IAAHja883MTlXwTiwuKKpKzAYAINEE7jW+oeQAAAKdSURBVGje7Zo7bNNQFIbjR2yr4EAfICXOxtCSKQi1U0WlVt2QaMVKh06MjCBgo0jMSLAisaM2HRgIMSskU4X6ACmZ4haEwsMmIk784IS4aVNZqW+aFB/p/lI8JJbu+XzueTmXiccTEcxiI8hFASgABaAAFIACUAAKcALx8Nmcjge8e/ljJf+rHuTOzTtSD9bkyw5cNd1Vi7ZacoIChEdTSW9HLKY4w3TfFp31bbtFhW8LySIDGC9uCivzUVnEHAOAkV0WF1Ms4iAGb6zMC74MmLIQMCylOdxp9N5MdO4Si7sOPO6MaXwAEA9Prwu4KzGUi3bFwNpK3LjM4QZYSHFKjMHdzLWcgBhgKsmEopl79t6Ca0xqhub4GMEDnUyCBxr/H+D5B+tQ28NCuSVKR+HaQqtbztqWjXsiy2wTACix8AF0H1+OKC6zoQPoMrv0YQspEndqU2UQ7RkOGcD4mYFnrVtpgiU0ndADCxeHJgbJcPcaT+QB3XSb1uzWrIQUyCyZZ19duZD/GeTNSjWgETC297B5QIYZ2fn2D0Az7YAA3krnhT4CkNrdVkGzcfdChbLrAagVEyNArrjvgVylhs566Dg0fd8DEAOfqg1cAO2Ow4uBta9/EFmvlg5emHoAL3erWJwA2fP+m4ZPK/GkpKMAeJCtG4eSDifLsleWTXvPtGdHpf6skxhIYniYrb/+3NGuHgCAdqqWIvITZ6PhBADrYeI58mUHQDM+vtd+W+70sBgqANgzj975WO8DANowGmqllo4JYwIXBgBI+bcz9Y0vru+vTJcDT3Mj0pIyNHmuJ29c/XHypw61NnPcX0zMsSe2FJGD7m12RJJ5hgCmJ4BC2W51+ZDpc8VAsyVDj5xRAApAASgABaAAFIAC4NVf/rzXcnQlK5oAAAAASUVORK5CYII=
// @match        https://ldjam.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @run-at       document-start
// ==/UserScript==
/**
    Icons SVG are from FontAwesome
    https://fontawesome.com/license
**/
var icon_star1 = '<svg class="ui-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>';
var icon_star2 = '<svg class="ui-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"/></svg>';
var icon_up = '<svg class="ui-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"/></svg>';
var icon_cross = '<svg class="ui-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/></svg>';
var Fav_List_Btn_HTML = '<div id="LDfavListBtn" class="favBtn" title="Favorite List">'+icon_up+'</div>';
var Fav_List_HTML = '<div id="LDfavList"></div>';
var not_Fav_HTML = '<div id="LDfavBtn" class="favBtn" title="Add to List">'+icon_star2+'</div>';
var is_Fav_HTML = '<div id="LDfavBtn" class="favBtn" title="Remove from List">'+icon_star1+'</div>';

function Insert_button(){
    // Check if the page has rating system (Game Page)
    if($('#content .content-item .-rating').length === 0){
      return;
    }
    // Check if we can Get Data frome Title...
    if($('#content .content-common-body.-title a').length === 0){
      return;
    }
    var LD_list = JSON.parse(localStorage.getItem("LD_list"));
    var game_title = $('#content .content-common-body.-title a')['0'].innerText;
    var game_link = $('#content .content-common-body.-title a')['0'].href;
    var LD_item = LD_list.find(key => key.name === game_title);
    if(!LD_item){
        $('body').append(not_Fav_HTML);
    }else{
        $('body').append(is_Fav_HTML);
    }
    $('#LDfavBtn').bind( 'click', function() {
        $('#LDfavBtn').toggleClass('LDisfav');
        if($('#LDfavBtn').hasClass('LDisfav')){
            $('#LDfavBtn').html(icon_star1);
            addfav(game_title,game_link);
        }else{
            $('#LDfavBtn').html(icon_star2);
            removefav(game_title,game_link);
        }
    });
}

function updatefavlist(){
    var LD_list = JSON.parse(localStorage.getItem("LD_list"));
    $('#LDfavList').html('');
    LD_list.forEach(function(element,index) {
        $('#LDfavList').append('<div class="LDfavListItem"><a href="'+element.url+'" class="button-base button-link">'+element.name+'</a><div class="LDCrossBtn" id="LDfavListItem'+index+'">'+icon_cross+'</div></div>');
        $('#LDfavListItem'+index).bind( 'click', function() {
            removefav(element.name,element.url);
        });
    });
}

function addfav(game_title,game_link){
    var LD_list = JSON.parse(localStorage.getItem("LD_list"));
    LD_list.unshift({'name':game_title,'url':game_link});
    localStorage.setItem("LD_list",JSON.stringify(LD_list));
    updatefavlist();
}

function removefav(game_title,game_link){
    var LD_list = JSON.parse(localStorage.getItem("LD_list"));
    LD_list = LD_list.filter(item => (item.name != game_title)&&(item.url != game_link));
    localStorage.setItem("LD_list",JSON.stringify(LD_list));
    updatefavlist();
}

function Insert_List(){
    $('body').append(Fav_List_Btn_HTML);
    $('#LDfavListBtn').bind( 'click', function() {
        $('#LDfavList').toggle(0);
    });
    var LD_list = JSON.parse(localStorage.getItem("LD_list"));
    $('body').append(Fav_List_HTML);
    LD_list.forEach(function(element,index) {
        $('#LDfavList').append('<div class="LDfavListItem"><a href="'+element.url+'" class="button-base button-link">'+element.name+'</a><div class="LDCrossBtn" id="LDfavListItem'+index+'">'+icon_cross+'</div></div>');
        $('#LDfavListItem'+index).bind( 'click', function() {
            removefav(element.name,element.url);
        });
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

(function () {
    //Init if there's no game list
    if(!localStorage.getItem("LD_list")){
        localStorage.setItem("LD_list","[]");
    }
    //Insert CSS
    addGlobalStyle('#LDfavListBtn {position:fixed !important; right:4.5rem; bottom:1rem; z-index:31;}');
    addGlobalStyle('#LDfavList {position:fixed; right:1rem; bottom:4rem; width: 480px; background-color:#FFFFFF;display:none;z-index:30;height: 11rem;overflow-y: auto;}');
    addGlobalStyle('#LDfavBtn {position:fixed !important; right:1rem; bottom:1rem; z-index:20;}');
    addGlobalStyle('.LDfavListItem {position:relative;padding: 0.5em 1em;}');
    addGlobalStyle('.LDfavListItem:hover {padding: 0.5em 1em; background-color:#EE5533; color:#FFFFFF;}');
    addGlobalStyle('.favBtn{background: #eef2f7;color: #2f373f;border: 1px solid transparent;padding: .125em 1em;line-height: 2em;height: 2em;cursor: pointer;}');
    addGlobalStyle('.favBtn:hover{background: #e53; color: #eef2f7;border: 1px solid transparent;}');
    addGlobalStyle('.LDCrossBtn{position:absolute;right:0;top:0;padding:0.5rem;cursor: pointer;}');
    //Insert HTML
    Insert_List();
    // Wait for page loading (fetch game data)
    setTimeout(Insert_button, 5000);
    // Check if the URL changed(PushState / PopState)
    var _wr = function(type) {
        var orig = history[type];
        return function() {
            var rv = orig.apply(this, arguments);
            var e = new Event(type);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return rv;
        };
    };
    history.pushState = _wr('pushState');
    window.addEventListener('pushState', function(e) {
        $('#LDfavBtn').remove();
        setTimeout(Insert_button, 5000);
    });
    window.onpopstate = function(event) {
        $('#LDfavBtn').remove();
        setTimeout(Insert_button, 5000);
    };
})();
