// markers.js
(function(window, document, $, undefined) {
    'use strict';
    var Markers = function Markers(cockpit) {
        console.log("Loading markers plugin.");
        this.cockpit = cockpit;

        $('.main-container .wrapper').append("<div id='markers'></div>");

        $('#markers').append('<button id="markerson">Markers On</button>');
        $('#markers').append('<div>counter: <span id="counter">0</span></div>');
        $('#markers').append('<div>nbDetected: <span id="nbDetected">0</span></div>');
        $('#markers').append('<div>type: <span id="type">0</span></div>');
        $('#markers').append('<div>xc: <span id="xc">0</span></div>');
        $('#markers').append('<div>yc: <span id="yc">0</span></div>');
        $('#markers').append('<div>width: <span id="width">0</span></div>');
        $('#markers').append('<div>height: <span id="height">0</span></div>');
        $('#markers').append('<div>dist: <span id="dist">0</span></div>');
        $('#markers').append('<div>orientationAngle: <span id="orientationAngle">0</span></div>');
        $('#markers').append('<div>vision: <span id="vision">0</span></div>');

        this.listen();

        var self = this;

        this.cockpit.socket.on('navdata', function(data) {
            //$("#status").text(data.sequenceNumber);
            $("#counter").text(data.sequenceNumber);
            $("#nbDetected").text(data.visionDetect.nbDetected);
            $("#type").text(data.visionDetect.type);
            $("#xc").text(data.visionDetect.xc);
            $("#yc").text(data.visionDetect.yc);
            $("#width").text(data.visionDetect.width);
            $("#height").text(data.visionDetect.height);
            $("#dist").text(data.visionDetect.dist);
            $("#orientationAngle").text(data.visionDetect.orientationAngle[0].toFixed(1));
            //$("#vision").text(JSON.stringify(data.visionDetect, null, 4));
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
