document.addEventListener("DOMContentLoaded", function () {

    function MapFunction() {
        const DATE = new Date("2021-09-25T04:00:00+0000");
        const [LAT, LON] = [36.525321, -121.815916];
        // const FONT = "Raleway";

        const config = {
            container: "map",
            width: 0,
            form: false,
            advanced: false,
            interactive: false,
            disableAnimations: true,

            zoomlevel: null,
            zoomextend: 1,
            adaptable: true,

            projection: "airy",
            transform: "equatorial",

            follow: "zenith",
            geopos: [LAT, LON],
            geopos: null,
            datapath: "https://ofrohn.github.io/data/",

            lines: {
                graticule: { show: false },
                equatorial: { show: false },
                ecliptic: { show: false },
                galactic: { show: false },
                supergalactic: { show: false }
            },

            planets: {
                show: true,
                which: ["mer", "ven", "ter", "lun", "mar", "jup", "sat"],
                symbolType: "disk",
                names: false,
                nameStyle: {
                    fill: "#ffff",
                    // font: `14px ${FONT}`,
                    font: `14px`,
                    align: "center",
                    baseline: "top"
                },
                namesType: "en"
            },

            dsos: {
                show: false,
                names: false,
            },
            constellations: {
                show: false,
                names: false,
                desig: false,
                namestyle: {
                    fill: "#ffff", align: "center", baseline: "middle", opacity: 1,
                    // font: [`14px ${FONT}`, `8px ${FONT}`, `0px ${FONT}`]
                    font: [`14px`, `8px`, `0px`]
                },
                lines: false,
                linestyle: { stroke: "#ffff", width: .5, opacity: 1 },
                bounds: false,
                boundstyle: { stroke: "#ffff", width: 0.5, opacity: 1, dash: [2, 4] }
            },

            mw: {
                show: false,
                style: { fill: "#ffff", opacity: 0.1 }
            },

            lines: {
                graticule: {
                    show: false,
                    stroke: "#ffff",
                    width: 0.6,
                    opacity: 0.8,
                    lon: {
                        pos: [""],
                        fill: "#ffff",
                        font: "10px Helvetica, Arial, sans-serif"
                    },
                    lat: {
                        pos: [""],
                        fill: "#ffff",
                        font: "10px Helvetica, Arial, sans-serif"
                    }
                },
                equatorial: { show: false, stroke: "#ffff", width: 1.3, opacity: 0.7 },
                ecliptic: { show: false, stroke: "#fffff", width: 1.3, opacity: 0.7 },
                galactic: { show: false, stroke: "#ffff", width: 1.3, opacity: 0.7 },
                supergalactic: { show: false, stroke: "#ffff", width: 1.3, opacity: 0.7 }
            },

            background: {
                fill: "#ddddd",
                stroke: "#fff",
                opacity: 0,
                width: 2
            },

            stars: {
                colors: false,
                size: 4,
                limit: 6,
                exponent: -0.28,
                designation: false,
                style: { fill: "#ffff", opacity: 1 },
                propername: false,
                propernameType: "name",
                propernameStyle: {
                    fill: "#ffff",
                    // font: `8px ${FONT}`,
                    font: `8px`,
                    align: "right",
                    baseline: "center"
                },
                propernameLimit: 2.0,
            }
        };



        Celestial.display(config);


        document.getElementById("constellation_name").onclick = () => {
            config.constellations.names = !config.constellations.names
            updateConfigAndRedraw()
        };

        document.getElementById("constellations_line").onclick = () => {
            config.constellations.lines = !config.constellations.lines
            updateConfigAndRedraw();
        };

        document.getElementById("milky_way").onclick = () => {
            config.mw.show = !config.mw.show;
            updateConfigAndRedraw();
        };

        document.getElementById("graticule").onclick = () => {
            config.lines.graticule.show = !config.lines.graticule.show
            updateConfigAndRedraw();
        };

        function updateConfigAndRedraw() {
            Celestial.apply(config)
        }

        function initMap() {
            var input = document.getElementById('location');
            var autocomplete = new google.maps.places.Autocomplete(
        /** @type {HTMLInputElement} */(input),
                {
                    types: ['(cities)'],
                });

            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    return;
                }

                var latitude = place.geometry.location.lat();
                var longitude = place.geometry.location.lng();

                const longEle = document.getElementById("longitude")
                const latiEle = document.getElementById("latitude")

                latiEle.value = latitude;
                longEle.value = longitude;

                var address = '';
                if (place.address_components) {
                    address = [
                        (place.address_components[0] && place.address_components[0].short_name || ''),
                        (place.address_components[1] && place.address_components[1].short_name || ''),
                        (place.address_components[2] && place.address_components[2].short_name || '')
                    ].join(' ');
                }
            });

            input.addEventListener("change", function () {
                var geocoder = new google.maps.Geocoder();
                var address = this.value;

                geocoder.geocode({ 'address': address }, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        var latitude = results[0].geometry.location.lat();
                        var longitude = results[0].geometry.location.lng();

                        config.location.latitude = latitude;
                        config.location.longitude = longitude;

                        updateConfigAndRedraw()

                        const longEle = document.getElementById("longitude")
                        const latiEle = document.getElementById("latitude")

                        latiEle.value = latitude;
                        longEle.value = longitude;

                        var changeEvent = new Event('change', { bubbles: true });
                        latiEle.dispatchEvent(changeEvent);
                        longEle.dispatchEvent(changeEvent);


                    } else {
                        console.log('Geocode was not successful for the following reason: ' + status);
                    }
                });
            });
        }


        google.maps.event.addDomListener(window, 'load', initMap)

    }

    MapFunction()
})