require([
  "esri/Map",
  "esri/layers/CSVLayer",
  "esri/views/MapView",
  "esri/widgets/Home",
  "esri/widgets/Locate",
  "esri/intl",
], (Map, CSVLayer, MapView, Home, Locate, intl) => {
  // Sets the locale to Thai //
  intl.setLocale("th");

  const renderer = {
    type: "unique-value",
    legendOptions: {
      title: "6 โหม้งโหล่งพญ๋า"
    },
    field: "ID",
    uniqueValueInfos: [{
      value: "1",
      label: "1",
      symbol: {
        type: "picture-marker",
        url: "assets/icon/1.png",
        width: "50px",
        height: "50px"
      }
    }, {
      value: "2",
      label: "2",
      symbol: {
        type: "picture-marker",
        url: "assets/icon/2.png",
        width: "50px",
        height: "50px"
      }
    },{
      value: "3",
      label: "3",
      symbol: {
        type: "picture-marker",
        url: "assets/icon/3.png",
        width: "50px",
        height: "50px"
      }
    },{
      value: "4",
      label: "4",
      symbol: {
        type: "picture-marker",
        url: "assets/icon/4.png",
        width: "50px",
        height: "50px"
      }
    },{
      value: "5",
      label: "5",
      symbol: {
        type: "picture-marker",
        url: "assets/icon/5.png",
        width: "60px",
        height: "50px"
      }
    },{
      value: "6",
      label: "6",
      symbol: {
        type: "picture-marker",
        url: "https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
        width: "50px",
        height: "50px"
      }
    },{
      value: "7",
      label: "7",
      symbol: {
        type: "picture-marker",
        url: "assets/icon/7.png",
        width: "50px",
        height: "50px"
      }
    }]
  };

  const csvURL = "./data/InterestPlace.csv";
  const csvLayer = new CSVLayer({
    url: csvURL,
    //copyright: "แผนที่นี้จัดทำโดย",
    popupTemplate: { // https://developers.arcgis.com/javascript/latest/sample-code/popup-multipleelements/
      title: "{Name}",
      content: [
        {
          type: "text",
          text: `
          {Description}<br><br>
          {Activity}<br>
          {OpeningHours}<br>
          ช่องทางการติดต่อ: <a href={Contact} target='_blank'>{Contact}</a>
          `
        },
        {
          type: "media",
          mediaInfos: [
            {
              //title: "<b>{Name}</b>",
              type: "image",
              //caption: "{Name}",
              value: {
                sourceURL: "{Image}",
              },
            },
          ],
        },
      ],
    },
    labelingInfo: [{
      symbol: {
        type: "text",
        color: "#2C5524",
        backgroundColor: [190, 220, 220, 0.75],
        borderLineColor: "#2C5524",
        borderLineSize: 1,
        //yoffset: 5,
        font: {
          family: "Avenir Next LT Pro", // https://developers.arcgis.com/javascript/latest/labeling/          
          style: "normal",
          weight: "normal",
          size: 10,
        }
      },
      labelPlacement: "above-center",
      labelExpressionInfo: {
        expression: "$feature.Name"
      }
    }],
    renderer: renderer,
  });

  const map = new Map({
    basemap: "gray-vector", // "satellite", "hybrid", "terrain", "oceans", "osm", "dark-gray-vector", "gray-vector", "streets-vector", "topo-vector", "streets-night-vector", "streets-relief-vector", "streets-navigation-vector"
    layers: [csvLayer],
  });

  const view = new MapView({
    container: "viewDiv",
    center: [99.13333, 18.7435], // longitude, latitude
    zoom: 12,
    map: map,
    constraints : { // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#constraints
      geometry: { // https://arcgis-js-api-extent-helper.gavinr.com/
        type: "extent",
        xmin: 98.79214411944083,
        ymin: 18.593480604588137,
        xmax: 99.45132380693995,
        ymax: 18.89551039339253
      },
      minZoom: 10,
      maxZoom: 18
    },
    popup: { // https://community.esri.com/thread/245768-popup-functionality-in-mobile-view //
      dockEnabled: true,
      collapseEnabled: false,
      dockOptions: {
        // Disables the dock button from the popup //
        buttonEnabled: true,
        // Ignore the default sizes that trigger responsive docking //
        breakpoint: false,
      },
    },
  });

  // Remove default zoom widget //
  //view.ui.remove("zoom");

  // Home button //
  const homeBtn = new Home({ view: view });
  view.ui.add(homeBtn, "top-left");

  // Locate button //
  const locateBtn = new Locate({ view: view });
  view.ui.add(locateBtn, "top-left");
});
