let myMap;
let canvas;
const mappa = new Mappa('Leaflet');

let options = {
  lat: 42,
  lng: -78,
  zoom: 6,
  style: "https://api.mapbox.com/styles/v1/jamiekyl/ckgi1lx8m0ou419lep0313xck/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamFtaWVreWwiLCJhIjoiY2tnZ3NlNm4yMG9kbTJxbWxvdGsxMWtuMiJ9.gpZC_H9jzt9chN0tk3SHHA"
}


function preload() {
  firstPath = loadTable('Co-ordinates 2.csv', 'csv', 'header');
}


function setup() {
  canvas = createCanvas(1200, 800);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  myMap.onChange(clear);

  myMap.onChange(drawPathJamie.bind(null, firstPath));
}


function draw() {
}


function drawPathJamie(path) {
  for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'latitude'));
    const longitude = Number(path.getString(i, 'longitude'));
    const altitude = Number(path.getString(i, 'altitude (ft)'));
    const latitude2 = Number(path.getString(i+1, 'latitude'));
    const longitude2 = Number(path.getString(i+1, 'longitude'));

    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      const pos = myMap.latLngToPixel(latitude, longitude);
      const pos2 = myMap.latLngToPixel(latitude2, longitude2);

      stroke( 40,altitude/8,170);
      strokeWeight(4);
      line(pos.x, pos.y, pos2.x, pos2.y);
    }
  }
}
