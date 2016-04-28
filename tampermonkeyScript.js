// ==UserScript==
// @name         Loteria paragonowa, auto fill
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Loteria paragonowa: automatycznie zaznaczanie checkboxów oraz obliczanie wartości do sprawdzenia.
// @author       Szymczakk
// @match        loteriaparagonowa.gov.pl/
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

//setup
var fromDb = false;
var apiUrl = "https://loteriaapi.rakaz.pl/lottery/";

//nr kasy
$('#nr_kasy_1').on('blur', function(){
    var nrKasy = $('#nr_kasy_1').val();
    $.ajax({
        url:apiUrl+nrKasy,
        method: "GET"
    }).done(function(res){
        if(res.length===1){ 
            setNip(res[0].nip);
            fromDb = true;
            $('#dzien').focus();
        }
    });
});

$('#nip_10').on('blur', function(){
    if(!fromDb){
        var nrKasy = $('#nr_kasy_1').val();
        var nip = getNip();
        $.ajax({
            url:apiUrl,
            method:"POST",
            data:{
                "nrkasy":nrKasy,
                "nip":nip
            }
        });
    }
});

//checkboxes
$('#zgoda_dane_pokaz').find('input').click();
$('#sprawdzone').click();

//dropdown
$('#branza').val("")

//captcha
var captchaString = $('#captcha-operation').html();
var captchaArray = captchaString.split('+');
var captchaResult = +captchaArray[0] + +captchaArray[1];
$('#captcha-input').val(captchaResult)

$('#rok').val("2016");
var month = new Date().getMonth()+1;
$('#miesiac').val(month);

$('#nip_10').on('blur', function(){
    $('#dzien').focus();
});

$('#dzien').on('blur', function(){
    $('#nr_wydruku').focus();
});

//helpers
function getNip(){
    var result = "";
    result += $('#nip_1').val();
    result += $('#nip_2').val();
    result += $('#nip_3').val();
    result += $('#nip_4').val();
    result += $('#nip_5').val();
    result += $('#nip_6').val();
    result += $('#nip_7').val();
    result += $('#nip_8').val();
    result += $('#nip_9').val();
    result += $('#nip_10').val();
    return result;
};

function setNip(nip){
    var nip = nip.split('');
    $('#nip_1').val(nip[0]);
    $('#nip_2').val(nip[1]);
    $('#nip_3').val(nip[2]);
    $('#nip_4').val(nip[3]);
    $('#nip_5').val(nip[4]);
    $('#nip_6').val(nip[5]);
    $('#nip_7').val(nip[6]);
    $('#nip_8').val(nip[7]);
    $('#nip_9').val(nip[8]);
    $('#nip_10').val(nip[9]);
};