// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://elsa.komica.org/42/*
// @grant        none
// ==/UserScript==

function addFontSettingUI() {
    var toplink_bar = $('#toplink').html();
    toplink_bar += '[<a id="set-font" href="#">文字設定</a>]';
    $('#toplink').html(toplink_bar);
    $panel = $(`<div id="panel" style="display:none;position: absolute;top: 40px;right: 50px;background: #eeaa88;z-index: 1;padding: 8px;box-shadow: 2px 2px 10px #de906c;">
行距:<br>
  <input id="spacing_percent" size="3" value="120" maxlength="3">%
  <button class="spacing_btn" value="10" data-for="spacing_percent">+</button>
  <button class="spacing_btn" value="-10" data-for="spacing_percent">-</button>
  <button class="reset" data-for="spacing_percent" value="120">Reset</button>
  <br>

  字體大小:<br>
  <input id="size_percent" size="3" value="100" maxlength="3">%
  <button class="size_btn" value="10" data-for="size_percent">+</button>
  <button class="size_btn" value="-10" data-for="size_percent">-</button>
  <button class="reset" data-for="size_percent" value="100">Reset</button>
  <br>

</div>`);
    $('#toplink').append($panel);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function registerFontBotton() {
    $('#set-font').on('click', function(e) {
        e.preventDefault();
        $('#panel').toggle();
    });
    $('.spacing_btn,.size_btn').on('click', function(e) {
        $('#' + $(this).data('for')).val(parseInt($('#' + $(this).data('for')).val()) + parseInt(this.value)).trigger('change');

    });
    $('.reset').on('click', function() {
        $('#' + $(this).data('for')).val(this.value).trigger('change');
    })

    $('#size_percent').on('change', function() {
        $('#contents').css('font-size', this.value + '%');
        setCookie('custom-size', this.value, 90);
    });

    $('#spacing_percent').on('change', function() {
        $('#contents').css('line-height', this.value + '%');
        setCookie('custom-spacing', this.value, 90);
    });
}

function readCookie() {
    if (getCookie('custom-size') !== "") {
        $('#size_percent').val(getCookie('custom-size')).trigger('change');
    }

    if (getCookie('custom-spacing') !== "") {
        $('#spacing_percent').val(getCookie('custom-spacing')).trigger('change');
    }
}

(function() {
    'use strict';
    // Tested $ is jQuery here
    readCookie();
    addFontSettingUI();
    registerFontBotton();
    readCookie();
})();
