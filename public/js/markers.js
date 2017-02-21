// markers.js
(function(window, document, $, undefined) {
    'use strict';
    var Markers = function Markers(cockpit) {
        console.log("Loading markers plugin.");
        this.cockpit = cockpit;

        $('.main-container .wrapper').append("<div id='markers'>...</div>");

        $('#markers').append('<button id="markerson">Markers On</button>');
        $('#markers').append('<div>counter: <span id="counter">0</span></div>');

        this.listen();

        var self = this;

        this.cockpit.socket.on('navdata', function(data) {
            //$("#status").text(data.sequenceNumber);
            $("#counter").text(data.sequenceNumber + JSON.stringify(data.visionDetect, null, 4));
            //console.log(data.sequenceNumber);
        });
        this.listen();
    };

    Markers.prototype.listen = function listen() {
    	console.log("markers listen")
        var markers = this;

        $('#markerson').click(function(ev) {
            console.log('marker clicked')
            ev.preventDefault();
            markers.detect(12);
        });


    };
    Markers.prototype.detect = function detect(deviceNum) {
        console.log('detect')
        this.cockpit.socket.emit("/markers/detect", {
            device_num: deviceNum
        });
    };

    window.Cockpit.plugins.push(Markers);

}(window, document, jQuery));
