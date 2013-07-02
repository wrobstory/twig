(function( global ) {
  var twig = (function() {

    var L = window.L;

    baseMap = function(lat, lng, zoomstart) {
        return L.map('map').setView([lat, lng], zoomstart);
    };

    tileLayer = function(map, tileref, maxzoom, attribution) {
        L.tileLayer(tileref, { maxZoom: maxzoom, attribution: attribution}).addTo(map);
    };

    parse = function(data) {

        var map = baseMap(data['lat'], data['lng'], data['zoomstart']);
        tileLayer(map, data['tileref'], data['maxZoom'], data['attribution']);

    };

    return {
      sprout: function(data) {
        parse(data);
      }
     };

  })();

  global.twig = twig;

})( this );
