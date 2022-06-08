import React, {useRef, useState} from 'react'
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import {useEffect} from "react";
import * as turf from "@turf/turf";

function Map() {

    const websocket_url = "wss://websocket.busradar.conterra.de";
    const restapi_url = "https://rest.busradar.conterra.de/prod/";
    mapboxgl.accessToken = API_KEY;

    let markers = {};
    let stopmarker = {};
    let webSocket;
    let animations = {};
    let steps = 500;

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(13);



    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [7.626816, 51.961436],
            zoom: zoom
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));

            webSocket = new WebSocket(websocket_url);
            // window.setTimeout(praeambel);
            // getStops();
            getCurrentVehicles();
            setupWebsocket();
            requestAnimationFrame(animation);
        });
    });

    function setupWebsocket() {
        webSocket.onmessage = function (event) {
            //message.textContent = event.data;
            //document.getElementById("timestamp").innerHTML = "Letztes Update: "+(new Date()).toLocaleTimeString();
            updateVehicles(event.data);
        };
        webSocket.onerror = function (event) {
            alert("Websocket Error, bitte Seite neu laden.");
        };
        webSocket.onclose = function (event) {
            alert("Websocket Close, bitte Seite neu laden.");
        };
    };

    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    }


    function addStops(e) {
        var json = JSON.parse(e);
        for (var key in json.features) {
            // create a HTML element for each feature
            var el = document.createElement('div');
            var marker = json.features[key]
            el.className = 'stop';

            // make a marker for each feature and add to the map
            var st = new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({
                    offset: 25
                }) // add popups
                    .setHTML('<h3>' + marker.properties.lbez + ' (' + marker.properties.richtung + ')</h3>'))
                .addTo(map.current);
            st.properties = marker.properties;
            stopmarker[marker.properties.nr] = st;
        }
    }
    function updateVehicles(e) {
        // document.getElementById("timestamp").innerHTML = "Letztes Update: "+(new Date()).toLocaleTimeString();
        var vehicles = JSON.parse(e);
        for (var key in vehicles.features) {

            //Delete vehicle from map on REMOVE operation
            if ((vehicles.features[key].properties.operation === "REMOVE")) {
                updateVehicle_Remove(vehicles, key);
            }
            //Update vehicle if it is already on map
            else if (vehicles.features[key].properties["fahrzeugid"] in markers) {
                updateVehicles_Update(vehicles, key);
            }
            // Else insert new markers
            else {
                updateVehicles_Insert(vehicles, key);
            }
        }
        //console.log(Object.keys(markers).length);
        /*        document.getElementById("fzcount").innerHTML = "Fahrzeuge: " + Object.keys(markers).length;
                document.getElementById("timestamp").innerHTML = "Letztes Update: " + new Date().toLocaleTimeString();*/
    }

    function updateVehicle_Remove(vehicles, key) {
        if (vehicles.features[key].properties["fahrzeugid"] in markers) {
            // mymap.removeLayer(markers[vehicles.features[key].properties["fahrzeugid"]]);
            markers[vehicles.features[key].properties["fahrzeugid"]].remove();
            delete(markers[vehicles.features[key].properties["fahrzeugid"]]);
            delete(animations[vehicles.features[key].properties["fahrzeugid"]]);
        }
    }
    function updateVehicles_Update(vehicles, key) {
        var marker = markers[vehicles.features[key].properties["fahrzeugid"]];
        if (marker.delay !== vehicles.features[key].properties.delay) {
            let classNameRegex = /vehicle_(green|red|blue|yellow)/
            let vehicleClass = getMarkerClass(vehicles.features[key]);
            let el = marker.getElement();
            el.className = el.className.replace(classNameRegex, vehicleClass);
            marker.delay = vehicles.features[key].properties.delay;
        }
        updateAnimation(marker, vehicles, key);
        //marker.setLngLat(vehicles.features[key].geometry.coordinates);
        marker.setPopup(createPopup(vehicles.features[key]));

    }

    function updateAnimation(marker, vehicles, key) {
        let fahrzeugid = vehicles.features[key].properties["fahrzeugid"];
        let originalLatLng =  marker.getLngLat()
        originalLatLng = [originalLatLng.lng, originalLatLng.lat]
        // A simple line from origin to destination.
        var route = {
            'type': 'FeatureCollection',
            'features': [{
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [originalLatLng, vehicles.features[key].geometry.coordinates]
                }
            }]
        };

        // Calculate the distance in kilometers between route start/end point.
        var lineDistance = turf.lineDistance(route.features[0], 'kilometers');

        var arc = [];
        // calculate intermediate positions between two points
        for (var i = 0; i < lineDistance; i += lineDistance / steps) {
            var segment = turf.along(route.features[0], i, 'kilometers');
            arc.push(segment.geometry.coordinates);
        }
        var d = new Date();
        var n = d.getTime();
        animations[fahrzeugid] = {
            "arc": arc,
            "counter": 0,
            "timestamp": n
        };

    }

    function animation() {
        for (var key in animations){

            var d = new Date();
            var n = d.getTime();

            if(n - animations[key]["timestamp"] < 10000){
                let marker = markers[key];
                let counter = animations[key]["counter"]
                let newPosition = animations[key]["arc"][counter];
                counter++;
                animations[key]["counter"] = counter;

                if(newPosition) marker.setLngLat(newPosition);

                // remove from animations if all animaiton steps are processed
                if(counter >= steps - 1){
                    delete animations[key];
                }
            }else{
                let marker = markers[key];
                let newPosition = animations[key]["arc"][steps-1];
                if(newPosition) marker.setLngLat(newPosition);
                delete animations[key];
            }



        }
        requestAnimationFrame(animation);
    }


    function updateVehicles_Insert(vehicles, key) {
        var marker = vehicles.features[key];
        var el = createMarkerDiv(marker);

        // make a marker for each feature and add to the map
        var busmarker = new mapboxgl.Marker(el)
            .setLngLat(vehicles.features[key].geometry.coordinates)
            .setPopup(createPopup(vehicles.features[key]))
            .addTo(map.current);
        busmarker.delay = marker.properties.delay;
        markers[vehicles.features[key].properties.fahrzeugid] = busmarker;
    }

    function createMarkerDiv(marker) {
        var el = document.createElement('div');
        el.className = getMarkerClass(marker);
        return el;
    }

    function getMarkerClass(marker) {
        if (marker.properties.delay && marker.properties.delay > 240) {
            return 'vehicle_red';
        } else if (marker.properties.delay && marker.properties.delay > 120) {
            return 'vehicle_yellow';
        } else if (marker.properties.delay && marker.properties.delay > 60) {
            return 'vehicle_blue';
        } else {
            return 'vehicle_green';
        }
    }


    function createPopup(feature) {
        // var nachhst;
        // if (feature.properties.nachhst in stopmarker) {
        //     nachhst = stopmarker[feature.properties.nachhst].properties.lbez;
        // } else {
        //     nachhst = feature.properties.nachhst;
        // }
        var popup = new mapboxgl.Popup({
            offset: 25
        }) // add popups
            .setHTML('<h3>Linie ' + feature.properties.linientext + '</h3><h4>' + feature.properties.richtungstext + '</h4>' +
                '<p>Verspätung ' + feature.properties.delay + ' Sekunden</p>' +
                '<p id="' + feature.properties.fahrzeugid + '">Nächster Halt</p>' +
                '<p>Fahrzeug ' + feature.properties.fahrzeugid + '</p>' +
                '<p>VIS Zeit ' + new Date(feature.properties.visfahrplanlagezst * 1000).toLocaleTimeString() + '</p>');
        popup.on('open', function (e) {
            getStop(feature.properties.nachhst, feature.properties.fahrzeugid);
        })
        return popup;
    }

    function getCurrentVehicles() {
        httpGetAsync(restapi_url + "fahrzeuge", updateVehicles);
    }

    function getStops() {
        httpGetAsync(restapi_url + "haltestellen", addStops);
    }

    function returnStop(e) {
        // document.getElementById("timestamp").innerHTML
        alert(e);
    }

    function getStop(id, cid) {
        // callWithMagic(magic => processMagic(magic, 42));
        if (id in stopmarker) {
            document.getElementById(cid).innerHTML = "Nächster Halt: " + stopmarker[id].properties.lbez;
        } else {
            httpGetAsync(restapi_url + "haltestellen/" + id,
                function (e) {
                    var f = JSON.parse(e);
                    document.getElementById(cid).innerHTML = "Nächster Halt: " + f.properties.lbez;
                    var el = document.createElement('div');
                    el.className = 'stop';

                    // make a marker for each feature and add to the map
                    var popup = new mapboxgl.Popup({
                        offset: 25
                    }) // add popups
                        .setHTML('<h3>' + f.properties.lbez + ' (' + f.properties.richtung + ')</h3><div id="abfahrten' + id + '">Abfahrten</div>');
                    popup.on('open', function (e) {
                        getAbfahrten(f.properties.nr, id);
                    })
                    var st = new mapboxgl.Marker(el)
                        .setLngLat(f.geometry.coordinates)
                        .setPopup(popup)
                        .addTo(map.current);
                    st.properties = f.properties;
                    stopmarker[f.properties.nr] = st;
                }
            );
        }
    }

    function getAbfahrten(hsid, cid) {
        httpGetAsync(restapi_url + "haltestellen/" + hsid + "/abfahrten",
            function (e) {
                var features = JSON.parse(e);
                var tab = "<h4>Abfahrten die n&auml;chsten 20 Minuten</h4><ul>";
                for (var f in features) {
                    tab += "<li>" + features[f].linienid + " " + features[f].richtungstext + " " + new Date(features[f].abfahrtszeit * 1000 + features[f].delay * 1000).toLocaleTimeString() + "</li>";
                }
                /*document.getElementById("abfahrten" + cid).innerHTML = tab + "</ul>";*/
            }
        );
    }


    return (
        <div>
            <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
        </div>
    )
}

export default Map