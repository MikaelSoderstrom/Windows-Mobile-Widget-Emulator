///<reference path="jquery-1.3.2-vsdoc2.js" />
///<reference path="Devices.js" />

$(document).ready(function() {
    InitializeEmulator();
    GetResolutions();
});

function InitializeEmulator() {
    $('#leftKey').click(function() { ToggleMenu($('#leftMenu')); });
    $('#rightKey').click(function() { ToggleMenu($('#rightMenu')); });
}

function ToggleMenu(el) {
    var emulator = $('#emulator');
    var element = $(el);

    if (element.is(':visible')) {
        element.fadeOut('fast');
        return element;
    }

    element.parent().children('ul').fadeOut('fast');
    element.css('left', emulator.offset().left).css('top', emulator.offset().top + emulator.height() - el.height()).fadeIn('fast');
}

function GetResolutions() {
    var ddl = $('#resolution');
    var pro = $('#resolution-professional');
    var std = $('#resolution-standard');

    for (i = 0; i < devices.Professional.length; i++) {
        pro.append('<option value="pro-' + i + '">' + devices.Professional[i].name + '</option>');
    }

    for (i = 0; i < devices.Standard.length; i++) {
        std.append('<option value="std-' + i + '">' + devices.Professional[i].name + '</option>');
    }

    ddl.change(function() {
        var val = $(this).attr('value');
        var name = $('#device-name');
        var width = $('#device-width');
        var height = $('#device-height');
        var dpi = $('#device-dpi');
        var square = $('#device-square');
        var portrait = $('#device-portrait');
        var landscape = $('#device-landscape');
        var smallIcon = $('#device-smallIcon');
        var largeIcon = $('#device-largeIcon');

        var device = devices.Professional[val.substring(4)];

        $(name).html(device.name);
        $(width).html(device.width);
        $(height).html(device.height);
        $(dpi).html(device.dpi);
        $(square).html(device.square ? 'True' : 'False');
        $(portrait).html(device.portrait ? 'True' : 'False');
        $(landscape).html(device.landscape ? 'True' : 'False');
        $(smallIcon).html(device.smallIcon.width + 'x' + device.smallIcon.height);
        $(largeIcon).html(device.largeIcon.width + 'x' + device.largeIcon.height);

        SetEmulatorResolution(device.width, device.height);

        if (device.portrait)
            $('#portrait').removeAttr('disabled');
        else
            $('#portrait').attr('disabled', 'disabled');

        if (device.landscape)
            $('#landscape').removeAttr('disabled');
        else
            $('#landscape').attr('disabled', 'disabled');

        var landscapeWidth = device.width < device.height ? device.width : device.height;
        var landscapeHeight = device.width < device.height ? device.height : device.width;

        $('#portrait').click(function() { SetEmulatorResolution(landscapeWidth, landscapeHeight) });
        $('#landscape').click(function() { SetEmulatorResolution(landscapeHeight, landscapeWidth) });
    });
}

function SetEmulatorResolution(width, height) {
    var emulator = $('#emulator');

    $('#menus ul').hide().width(width);

    emulator.animate({ width: width }, { queue: false, duration: 500 }).animate({ height: height }, { queue: false, duration: 500 });
    $('#menus').animate({ width: width }, { queue: false, duration: 500 });
}