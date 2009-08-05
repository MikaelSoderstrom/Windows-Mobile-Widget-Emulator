Object.prototype.Copy = function() {
    var newObj = (this instanceof Array) ? [] : {};

    for (i in this) {
        if (i == 'Copy')
            continue;

//        if (this[i] && typeof this[i] == "object") {
//            newObj[i] = this[i].Copy();
//        }
//        else
            newObj[i] = this[i];
    }

    return newObj;
};

var widget = {
    menu: {
        createMenuItem: function(id) {
            this.id = id;
            this.text = '';
            this.onSelect = function() { };

            return this;
        },
        setSoftKey: function(menuItem, idx) {
            var menuItemCopy = menuItem.Copy();

            if (idx == 1) {
                var el = window.parent.document.getElementById('leftMenu');

                var newItem = window.parent.document.createElement('li');
                var newLink = window.parent.document.createElement('a');

                newLink.onclick = function() {
                    menuItemCopy.onSelect()
                };
                newLink.href = '#';
                newLink.innerHTML = menuItemCopy.text;

                newItem.appendChild(newLink);
                el.insertBefore(newItem, el.firstChild);

                return this;
            }
            else {
                var el = window.parent.document.getElementById('rightMenu');
                var arrlength = widget.menu.menuItems.length;

                var newItem = window.parent.document.createElement('li');
                var newLink = window.parent.document.createElement('a');

                newLink.onclick = function() {
                    menuItemCopy.onSelect()
                };

                newLink.setAttribute('id', 'widgetmenu-' + arrlength);
                newLink.href = '#';
                newLink.innerHTML = menuItemCopy.text;

                widget.menu.menuItems[arrlength] = menuItemCopy;

                newItem.appendChild(newLink);
                el.insertBefore(newItem, el.firstChild);

                return this;
            }
        },
        append: function(menuItem) {
            widget.menu.setSoftKey(menuItem);
        },
        clear: function() {
            var el = window.parent.document.getElementById('rightMenu');
            el.innerHTML = '';
        },
        leftSoftKeyIndex: 1,
        menuItems: []
    },
    preferenceForKey: function(key) {
        if (document.cookie.length > 0) {
            idx = document.cookie.indexOf(key + '=');
            if (idx != -1) {
                idx = idx + key.length + 1;
                idxlast = document.cookie.indexOf(';', idx);

                if (idxlast == -1) idxlast = document.cookie.length;

                return unescape(document.cookie.substring(idx, idxlast));
            }
        }
        return '';
    },
    setPreferenceForKey: function(value, key) {

        if (!key) return;

        if (!value && key) {
            var d = new Date();
            var c = document.cookie.split(";");
            
            for (var i = 0; i < c.length; i++) {
                document.cookie = c[i] + "; expires =" + d.toGMTString();
            }
            
            return;
        }

        var saveValue = value;

        if (value.text) saveValue = value.text;

        if (value.value) saveValue = value.value;

        if (saveValue.length == undefined || saveValue.length < 1) return;
        if (saveValue.length == undefined || saveValue < 1) return;

        var exdate = new Date();
        exdate.setFullYear(2020, 12, 31);

        document.cookie = key + '=' + escape(saveValue) + ';expires=' + exdate.toGMTString();
    },
    authorEmail: 'Placeholder: E-mail address of author.',
    authorName: 'Placeholder: Name of author.',
    authorURL: 'Placeholder: Web site URL for author.',
    currentIcon: {
        height: 100,
        src: 'icon.png',
        width: 100
    },
    description: 'Placeholder: Description of widget.',
    height: 'Placeholder: Height of widget.',
    identifier: 'Placeholder: A unique identifier for the widget.',
    locale: 'Placeholder: Locale of widget.',
    name: 'Placeholder: Name of widget.',
    version: 'Placeholder: Version of widget.',
    width: 'Placeholder: Width of widget.'
};

var systemState = {
    CradlePresent: true, //A Boolean value indicating whether the device is cradled.
    DisplayRotation: 0,  //An integer between 0 and 360 indicating the rotation of the display in degrees.
    PhoneHomeService: true, //A Boolean value indicating whether the device is presently registered on its home network.
    PhoneOperatorName: 'Operator', //A string indicating the name of the device’s mobile operator.
    PhoneRoaming: true, //A Boolean value indicating whether the device is currently roaming.
    PhoneSignalStrength: 90, //An integer indicating the phone signal strength, expressed as a percentage of full strength.
    PowerBatteryState: 0, //An integer indicating the current state of the battery, such as whether the battery level is critically low or if the battery is charging.
    PowerBatteryStrength: 100 //An integer indicating the current battery strength, expressed as a percentage of full strength.
}