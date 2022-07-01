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
import { Fill, Icon, Style } from "ol/style";
import Units, { METERS_PER_UNIT } from "ol/proj/Units";

import Circle from "ol/geom/Circle";

import Kompas from "kompas";

// navigator.geolocation.getCurrentPosition(succ, err);
// function succ(data) {
//   let locationData = [data.coords.longitude, data.coords.latitude];

//   const source = new VectorSource();
//   const layer = new VectorLayer({
//     source: source,
//   });

//   // add custom controls
//   class SetLocation extends Control {
//     constructor(opt_options) {
//       let options = opt_options || {};
//       let setLoc = document.createElement("div");
//       setLoc.className = "ol-control ol-unselectable set-locate";
//       setLoc.innerHTML = `<buuton title="Встановіть вашу локацію вручну">

// <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
// 	 viewBox="0 0 297 297" style="enable-background:new 0 0 297 297; fill: #fff; height: 24px; width: 24px;" xml:space="preserve">
// <path d="M234.067,85.715C234.067,38.451,195.682,0,148.5,0S62.933,38.451,62.933,85.715c0,34.744,20.755,64.703,50.486,78.15
// 	l24.91,124.794c0.968,4.851,5.225,8.342,10.171,8.342c4.944,0,9.203-3.492,10.171-8.341l24.911-124.795
// 	C213.313,150.417,234.067,120.459,234.067,85.715z M148.5,233.643l-12.605-63.149c4.115,0.611,8.323,0.938,12.605,0.938
// 	s8.49-0.326,12.605-0.938L148.5,233.643z M148.5,150.686c-35.744,0-64.823-29.146-64.823-64.972s29.079-64.972,64.823-64.972
// 	s64.823,29.146,64.823,64.972S184.244,150.686,148.5,150.686z"/>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// </svg>

//       </buuton>`;
//       super({ element: setLoc, target: options.target });
//       setLoc.addEventListener("click", this.mkCircle.bind(this), false);
//     }
//     mkCircle(e) {
//       map.on("click", function (e) {
//         let coordinate = e.coordinate;

//         let circle = circular(coordinate, 1700);
//         source.clear(true);
//         source.addFeatures([
//           new Feature(
//             circle.transform("EPSG:4326", map.getView().getProjection()),
//           ),
//           new Feature(new Point(fromLonLat(coordinate))),
//         ]);
//       });
//     }
//   }

//   const map = new Map({
//     controls: defaultControls().extend([new SetLocation()]),
//     target: "mapC",
//     layers: [
//       new TileLayer({
//         source: new XYZ({
//           attributions:
//             'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
//             'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
//           url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
//         }),
//       }),
//     ],
//     view: new View({
//       center: fromLonLat(locationData),
//       zoom: 10,
//     }),
//   });

//   map.getView().setMaxZoom(17);
//   map.addLayer(layer);
//   navigator.geolocation.watchPosition(
//     function (pos) {
//       const coords = [pos.coords.longitude, pos.coords.latitude];
//       const accuracy = circular(coords, pos.coords.accuracy);
//       source.clear(true);
//       source.addFeatures([
//         new Feature(
//           accuracy.transform("EPSG:4326", map.getView().getProjection()),
//         ),
//         new Feature(new Point(fromLonLat(coords))),
//       ]);
//     },
//     function (error) {
//       alert(`ERROR: ${error.message}`);
//     },
//     {
//       enableHighAccuracy: true,
//     },
//   );
//   const locate = document.createElement("div");
//   locate.className = "ol-control ol-unselectable locate";
//   locate.innerHTML = `<button title="Locate me"><svg
//   version="1.1"
//   xmlns="http://www.w3.org/2000/svg"
//   xmlns:xlink="http://www.w3.org/1999/xlink"
//   x="0px"
//   y="0px"
//   viewBox="0 0 297 297"
//   style="enable-background: new 0 0 297 297; height: 24px; width: 24px; fill:#fff;"
//   xml:space="preserve"
// >
//   <g>
//     <path
//       d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645
//     c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645
//     C259.253,49.703,209.57,0,148.5,0z M148.5,272.689c-22.049-21.366-90.243-93.029-90.243-161.892
//     c0-49.784,40.483-90.287,90.243-90.287s90.243,40.503,90.243,90.287C238.743,179.659,170.549,251.322,148.5,272.689z"
//     />
//     <path
//       d="M148.5,59.183c-28.273,0-51.274,23.154-51.274,51.614c0,28.461,23.001,51.614,51.274,51.614
//     c28.273,0,51.274-23.153,51.274-51.614C199.774,82.337,176.773,59.183,148.5,59.183z M148.5,141.901
//     c-16.964,0-30.765-13.953-30.765-31.104c0-17.15,13.801-31.104,30.765-31.104c16.964,0,30.765,13.953,30.765,31.104
//     C179.265,127.948,165.464,141.901,148.5,141.901z"
//     />
//   </g>
//   <g></g>
//   <g></g>
//   <g></g>
//   <g></g>
//   <g></g>
//   <g></g>
//   <g></g>
//   <g></g>
//   <g></g>
//   <g></g>
//   <g></g>
//   <g></g>
//   <g></g>
//   <g></g>
//   <g></g></svg
// ></button>`;
//   locate.addEventListener("click", function () {
//     if (!source.isEmpty()) {
//       map.getView().fit(source.getExtent(), {
//         maxZoom: 17,
//         duration: 500,
//       });
//     }
//   });
//   map.addControl(
//     new Control({
//       element: locate,
//     }),
//   );
//   const style = new Style({
//     fill: new Fill({
//       color: "rgba(255, 255, 255, 0.5)",
//     }),
//     image: new Icon({
//       src: "./data/location-heading.svg",
//       imgSize: [27, 55],
//       rotateWithView: true,
//     }),
//   });
//   layer.setStyle(style);
//   if (
//     window.DeviceOrientationEvent &&
//     typeof DeviceOrientationEvent.requestPermission === "function"
//   ) {
//     locate.addEventListener("click", function () {
//       DeviceOrientationEvent.requestPermission()
//         .then(function () {
//           const compass = new Kompas();
//           compass.watch();
//           compass.on("heading", function (heading) {
//             style.getImage().setRotation((Math.PI / 180) * heading);
//           });
//         })
//         .catch(function (error) {
//           alert(`ERROR: ${error.message}`);
//         });
//     });
//   }
// }
// function err(err) {
//   console.log(err);
// }
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
        cirSource.clear(true);
        console.log(coordinate);
        cirSource.addFeature(new Feature(new Circle(coordinate, 2300)));
        map.addLayer(cirLayer);
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
