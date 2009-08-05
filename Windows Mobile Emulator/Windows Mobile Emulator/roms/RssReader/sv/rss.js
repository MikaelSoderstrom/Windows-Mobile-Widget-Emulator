window.onload = function() {
    SetupRssFeedList();
    SetupMenu();
    AddFeedList();
};

function SetupRssFeedList() {
    var feeds = document.getElementById('feeds').getElementsByTagName('a');
    
    for (var i = 0; i < feeds.length; i++) {
        feeds[i].onclick = function() {
            RenderFeed(event.srcElement.href);
            return false;
        }
    }
}

function RenderFeed(url) {
    var xmlhttp = null;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        return;

    xmlhttp.open('GET', url);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var xmldoc = xmlhttp.responseXML;
                if (!xmldoc) return;

                PrintResult(xmldoc);
            }

            delete xmlhttp;
        }
    };

    xmlhttp.send();
}

function PrintResult(xmldoc)
{
    var threads = xmldoc.getElementsByTagName('item');
    var itemContainer = document.getElementById('feeditems');

    if (itemContainer.childNodes)
        itemContainer.innerHTML = '';

    for (var i = 0; i < threads.length; i++) {
        var newLi = document.createElement('li');
        var currentItem = threads[i];
        
        var header = document.createElement('h2');
        header.innerHTML = currentItem.getElementsByTagName('title')[0].text;
        newLi.appendChild(header);
        
        var datespan = document.createElement('span');
        datespan.className = 'rss-date';
        datespan.innerHTML = currentItem.getElementsByTagName('pubDate')[0].text;
        newLi.appendChild(datespan);
        
        var description = document.createElement('span');
        description.className = 'rss-entry';
        description.innerHTML = currentItem.getElementsByTagName('description')[0].text.substring(0, 350) + '...';
        newLi.appendChild(description);
        
        var readmore = document.createElement('a');
        readmore.href = currentItem.getElementsByTagName('link')[0].text;
        readmore.innerHTML = 'Läs mer....';
        newLi.appendChild(readmore);
        itemContainer.appendChild(newLi);
    }
}

function SetupMenu() {
    var menu = widget.menu;
    
    var leftMenu = menu.createMenuItem(0);
    leftMenu.text = 'Lägg till';
    leftMenu.onSelect = function() { AddRssFeed(); };
    menu.setSoftKey(leftMenu, menu.leftSoftKeyIndex);

    var rightMenu = menu.createMenuItem(1);
    rightMenu.text = 'Om...';
    rightMenu.onSelect = function() { alert('Skapad av ' + widget.authorName + '.'); };
    menu.append(rightMenu);

    var rightMenu = menu.createMenuItem(3);
    rightMenu.text = 'Ta bort feeds';
    rightMenu.onSelect = function() { widget.setPreferenceForKey(null, 'feedlist'); };
    menu.append(rightMenu);
}

function AddRssFeed() {
    var url = prompt('URL till RSS-feed', 'http://');
    var name = prompt('Namn på RSS-feed', '');

    var oldList = null;

    if (widget.preferenceForKey('feedlist'))
        oldList = widget.preferenceForKey('feedlist') + '///url:' + url + ',name:' + name;
    else
        oldList = '///url:' + url + ',name:' + name;
    
    widget.setPreferenceForKey(oldList, 'feedlist');

    AddFeedHtml(name, url);
}

function AddFeedList()
{
    if (widget.preferenceForKey('feedlist'))
    {
        var list = widget.preferenceForKey('feedlist').split('///url:');

        for (var i = 0; i < list.length; i++) {
            var name = list[i].split(',name:')[1];
            var url = list[i].split(',name:')[0];

            AddFeedHtml(name, url);
        }
    }
}

function AddFeedHtml(name, url) {
    if (!(name && url)) return;

    var feedlist = document.getElementById('feeds');

    var newFeed = document.createElement('li');

    var feedurl = document.createElement('a');
    feedurl.href = url;
    feedurl.innerHTML = name;

    feedurl.onclick = function() {
        RenderFeed(event.srcElement.href);
        return false;
    }

    newFeed.appendChild(feedurl);
    feedlist.appendChild(newFeed);
}