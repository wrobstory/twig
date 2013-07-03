(function( global ) {
  var Twig = function() {

    var L = window.L;

    baseMap = function(lat, lng, zoomstart, id) {
        return L.map(id).setView([lat, lng], zoomstart);
    };

    tileLayer = function(map, tileref, maxzoom, attribution) {
        L.tileLayer(tileref, { maxZoom: maxzoom, attribution: attribution}).addTo(map);
    };

    markers = function(map, markers) {
        leafmarks = markers.map(function(marker) {
          var leafmark = L.marker([marker['lat'], marker['lng']]);
          if ('popup' in marker) {
            leafmark.bindPopup(marker['popup']['data']);
          }
          return leafmark;
        });

        leafmarks.map(function(mark){map.addLayer(mark);});

    };

    parse = function(data, id) {

        var map = baseMap(data['lat'], data['lng'], data['zoomstart'], id);
        tileLayer(map, data['tileref'], data['maxZoom'], data['attribution']);

        if ('markers' in data) {
          markers(map, data['markers']);
        }

    };

    this.sprout = function(data, id) {
        parse(data, id);
      };

    return this;

  };

  var twig = function() {
    return new Twig();
  };

  global.twig = twig();

})( this );
