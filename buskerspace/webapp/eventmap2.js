var map = undefined;
var events = undefined;
var filters = undefined;

var imgurl = 'https://raw.githubusercontent.com/buskerspace/buskerspace/master/buskerspace/webapp/image/';
var icons = undefined;

/* Initialise the map */
function initMap() {

    var initialCoords = {lat: -37.800089, lng: 144.964451};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: initialCoords,
        clickableIcons: false
    });

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            map.panTo(new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
            ));
            console.log("Lat: " + initialCoords.lat + ", Long: " + initialCoords.lng);
        }, function(error) {
            console.log("Error with geolocation (" + error.code + "): " + error.message + ".");
        });
    }

    icons = {
        musical: {
            url: imgurl + 'icon-musical.png',
            size: new google.maps.Size(32, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        },
        performance: {
            url: imgurl + 'icon-performance.png',
            size: new google.maps.Size(32, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        },
        other: {
            url: imgurl + 'icon-other.png',
            size: new google.maps.Size(32, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        },
        undef: ''
    };

    onLoad();
}

/* Initialise JavaScript */
function onLoad() {

    events = {
        musicalEvents: [
            { }
        ],
        performanceEvents: [
            { }
        ],
        otherEvents: [
            { }
        ],
    };

    filters = {
        musicalEvents: true,
        performanceEvents: true,
        otherEvents: true
    };

    var event = {
        lat: -37.800089,
        lng: 144.964451,
        eventid: 2016,
        title: 'UNIHACK2016',
        buskerid: 2016,
        buskername: 'Busker Space',
        type: 'musical',
        desc: 'The big event that\'s on today. There are lots of people there.'
    };

    addEvent(event);
}

/* Add the event event to the map */
function addEvent(event) {

    // Parse event

    var icon = '';

    switch (event.type) {
        case 'musical':
            icon = icons.musical;
            break;
        case 'performance':
            icon = icons.performance;
            break;
        case 'other':
            icon = icons.other;
            break;
        default:
            icon = icons.undef;
            break;
    }

    // Add marker

    var marker = new google.maps.Marker({
        map: map,
        position: {lat: event.lat, lng: event.lng},
        title: event.title,
        icon: icon
    });

    // Create InfoWindow

    var window = '<div onclick="location.href = \'/events/' + event.eventid + '/\'" style="cursor:pointer">' +
        '<p><span class="eventtitle">' + event.title + '</span></p>' +
        '<p><a href="/profile/' + event.buskerid + '/">' +
            '<span class="eventname">' + event.buskername + '</span>' + 
        '</a></p>' +
        '<p><span class="eventdesc">' + event.desc + '</span></a></p>' +
        '</div>';

    var infoWindow = new google.maps.InfoWindow({
        content: window
    });

    // Add callbacks

    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });

    google.maps.event.addListener(map, 'click', function() {
        infoWindow.close();
    });

    infoWindow.addListener('', function() {
        window.location.href = "/events/" + event.eventid + "/";
    });

    // Add event to list

    var eventObj = {
        marker:     marker,
        infoWindow: infoWindow,
        type:       event.type,
        lat:        event.lat,
        lng:        event.lng,
        title:      event.title,
        desc:       event.desc
    }

    switch (event.type) {
        case 'musical':
            events.musicalEvents.push(eventObj);
            break;
        case 'performance':
            events.performanceEvents.push(eventObj);
            break;
        case 'other':
            events.otherEvents.push(eventObj);
            break;
    }

}

/* Filter events */
function filterEvents() {

    var toggle;

    // Musical
    toggle = document.getElementById("checkbox-1").checked;

    if (toggle != filters.musicalEvents) {
        setVisibility(events.musicalEvents, toggle);
        filters.musicalEvents = toggle;
    }

    // Performance
    toggle = document.getElementById("checkbox-2").checked;
    if (toggle != filters.performanceEvents) {
        setVisibility(events.performanceEvents, toggle);
        filters.performanceEvents = toggle;
    }

    // Other
    toggle = document.getElementById("checkbox-3").checked;
    if (toggle != filters.otherEvents) {
        setVisibility(events.otherEvents, toggle);
        filters.otherEvents = toggle;
    }

    function setVisibility(eventList, toggle) {

        for (var i = 1, event; event = eventList[i]; i++) {
            if (toggle)
                event.marker.setMap(map);
            else
                event.marker.setMap(null);
        }
    }
}