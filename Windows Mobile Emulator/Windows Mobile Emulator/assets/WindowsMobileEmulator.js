///<reference path="jquery-1.3.2-vsdoc2.js" />

$(document).ready(function() {
    InitializeEmulator();
});

function InitializeEmulator() {    
    $('#leftKey').click(function() { ToggleMenu($('#leftMenu')); });
    $('#rightKey').click(function() { ToggleMenu($('#rightMenu')); });
}

function ToggleMenu(el) {
    var emulator = $('#emulator');
    var element = $(el);
    
    if (element.is(':visible'))
    {
        element.fadeOut('fast');
        return element;
    }
    
    element.parent().children('ul').fadeOut('fast');
    element.css('left', emulator.offset().left).css('top', emulator.offset().top + emulator.height() - el.height()).fadeIn('fast');
}