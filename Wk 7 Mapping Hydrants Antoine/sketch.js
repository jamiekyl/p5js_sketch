    let myMap;
    let canvas;
    const mappa = new Mappa('Leaflet');

    let options = {
    lat: 43,
    lng: -78.79,
    zoom: 14,
    style: "https://api.mapbox.com/styles/v1/jamiekyl/ckgkz0vri1t1y19o0fw2a4t80/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamFtaWVreWwiLCJhIjoiY2tnZ3NlNm4yMG9kbTJxbWxvdGsxMWtuMiJ9.gpZC_H9jzt9chN0tk3SHHA"
    }


    function preload() {
    firstPath = loadTable('Antoine.csv', 'csv', 'header');
    }


    function setup() {
    canvas = createCanvas(1200, 800);
    myMap = mappa.tileMap(options);
    myMap.overlay(canvas);
    myMap.onChange(clear);

    myMap.onChange(drawPathAntoine.bind(null, firstPath));
    }


    function draw() {
    }


    function drawPathAntoine(path) {
    for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'latitude'));
    const longitude = Number(path.getString(i, 'longitude'));
    const latitude2 = Number(path.getString(i+1, 'latitude'));
    const longitude2 = Number(path.getString(i+1, 'longitude'));

    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
    const pos = myMap.latLngToPixel(latitude, longitude);
    const pos2 = myMap.latLngToPixel(latitude2, longitude2);

    stroke(255,0,255);
    strokeWeight(4);
    line(pos.x, pos.y, pos2.x, pos2.y);
    }
    }
    }
