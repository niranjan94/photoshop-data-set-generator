if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
        return this.slice(0, str.length) == str;
    };
}
if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (str){
        return this.slice(-str.length) == str;
    };
}
if (typeof String.prototype.includes != 'function') {
    String.prototype.includes = function (str){
        return this.toLowerCase().indexOf(str.toLowerCase()) > -1;
    };
}

String.prototype.capitalize = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

function generateRandomString(length) {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function toIndianCurrencyFormat(x) {
    return "Rs. "+x.toLocaleString('en-IN');
}

function isUndefinedOrNull(variable){
    return !!(typeof variable === 'undefined' || variable == null);
}

function onElementHeightChange(elm, callback){
    var lastHeight = elm.clientHeight, newHeight;
    (function run(){
        newHeight = elm.clientHeight;
        if( lastHeight != newHeight )
            callback();
        lastHeight = newHeight;

        if( elm.onElementHeightChangeTimer )
            clearTimeout(elm.onElementHeightChangeTimer);

        elm.onElementHeightChangeTimer = setTimeout(run, 200);
    })();
}

function ref(obj, str) {
    str = str.split(".");
    for (var i = 0; i < str.length; i++)
        obj = obj[str[i]];
    return obj;
}



jQuery.fn.extend({
    check: function() {
        return this.each(function() {
            this.checked = true;
        });
    },
    uncheck: function() {
        return this.each(function() {
            this.checked = false;
        });
    },
    disable: function() {
        return this.each(function() {
            if(!$(this).hasClass("nt")){
                $(this).addClass("disabled").addClass("processing");
                $(this).attr('disabled','disabled');
            }
        });
    },
    enable: function() {
        return this.each(function() {
            if(!$(this).hasClass("nt")){
                $(this).removeClass("disabled").removeClass("processing");
                $(this).removeAttr('disabled');
            }
        });
    },
    lockForm: function(){
        return this.each(function() {
            $(this).find("select,input,textarea,button").disable();
        });
    },
    unlockForm: function(){
        return this.each(function() {
            $(this).find("select,input,textarea,button").enable();
        });
    },

    unlockAndResetForm: function(){
        return this.each(function() {
            $(this).find("button").enable();
            $(this).find("input:not([type=radio]):not([type=checkbox]):not(.nt)").enable().val("");
            $(this).find("textarea").enable().text("");
        });
    }
});

function scrollUp(duration){
    if(typeof duration == 'undefined'){
        duration = 600;
    }
    $("html, body").animate({
        scrollTop: 0
    }, duration);
}

String.prototype.toRegex = function (){
    var regex = this;
    regex = regex.replace(".","\\.");
    regex = regex.replace("[:id]","([0-9]+)");
    regex = regex.replace("*","(.+)");
    return "^"+regex+"$";
};