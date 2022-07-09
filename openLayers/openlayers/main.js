import "ol/ol.css";

import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { circular } from "ol/geom/Polygon";
import { Control, defaults as defaultControls } from "ol/control";
import { getPointResolution } from "ol/proj";
import { Fill, Icon, Stroke, Style } from "ol/style";
import Units, { METERS_PER_UNIT } from "ol/proj/Units";

import Circle from "ol/geom/Circle";

import Kompas from "kompas";
import { toSize } from "ol/size";
import LineString from "ol/geom/LineString";
let options = {};
navigator.geolocation.getCurrentPosition(succ, err, options);
function err(err) {
  alert("Не можливо  отримати ваше місце знаходження");
  console.log(err);
}
function succ(data) {
  let location = [data.coords.longitude || 0, data.coords.latitude || 0];

  let gamma;
  let beta;
  let source = new VectorSource();
  let layer = new VectorLayer({
    source: source,
  });

  window.addEventListener("deviceorientation", function (e) {
    gamma = e.gamma || 0;
    beta = e.beta || 0;

    drawMap();
  });
  drawMap();
  function drawMap(data) {
    let map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new XYZ({
            attributions:
              'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
              'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          }),
        }),
      ],
      view: new View({
        center: fromLonLat(location),
        zoom: 10,
      }),
    });
    // set location
    navigator.geolocation.watchPosition(
      function (pos) {
        const coords = [pos.coords.longitude, pos.coords.latitude];
        const accuracy = circular(coords, pos.coords.accuracy);
        source.clear(true);
        source.addFeatures([
          new Feature(
            accuracy.transform("EPSG:4326", map.getView().getProjection()),
          ),
          new Feature(new Point(fromLonLat(coords))),
        ]);
      },
      function (error) {
        alert(`ERROR: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
      },
    );
    const locate = document.createElement("div");
    locate.className = "ol-control ol-unselectable locate";
    locate.innerHTML = '<button title="Locate me">◎</button>';
    locate.addEventListener("click", function () {
      if (!source.isEmpty()) {
        map.getView().fit(source.getExtent(), {
          maxZoom: 18,
          duration: 500,
        });
      }
    });

    let setloc = document.createElement("div");
    setloc.className = "ol-control ol-unselectable set-locate";
    setloc.innerHTML = `<button title="Встановіть  ваше місце знаходження вручну">◎</button>`;
    setloc.addEventListener("click", function () {
      let cirSource = new VectorSource();
      let cirLayer = new VectorLayer({
        source: cirSource,
      });
      map.on("click", function (e) {
        
        var coordinate = e.coordinate; 
        // /console.log(getCoordinateAtM(1700,30))   
        cirSource.clear(true);
        console.log(coordinate);
        cirSource.addFeature(new Feature(new Circle(coordinate, 2300)));
        map.addLayer(cirLayer);
        let lineCoords=[coordinate, [-95.04286, 46.9235]];
        let lineSource=new VectorSource();
       let lineLayer=new VectorLayer({source: lineSource,
      style: new Style({
        fill:new Fill({
          color:"red",        
        }),
      
      })
      });
       let line=new LineString(lineCoords);
       lineSource.addFeature(new Feature(line));
       map.addLayer(lineLayer);
      });
    });
    map.addControl(
      new Control({
        element: locate,
      }),
    );
    map.addControl(
      new Control({
        element: setloc,
      }),
    );
    map.addLayer(layer);
    map.getView().setMaxZoom(17);

  }
}
