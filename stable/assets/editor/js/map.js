document.addEventListener("DOMContentLoaded", function () {
    const DATE = new Date("2021-09-25T04:00:00+0000");
    const [LAT, LON] = [36.525321, -121.815916];
    const FONT = "Raleway";

    const config = {
        container: "map",
        width: 0,
        form: false,
        advanced: false,
        interactive: false,
        disableAnimations: true,

        zoomlevel: null,
        zoomextend: 1,

        projection: "airy",
        transform: "equatorial",

        follow: "zenith",
        geopos: [LAT, LON],
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
                font: `14px ${FONT}`,
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
                fill: "#ffff", align: "center", baseline: "middle", opacity: 0.8,
                font: [`14px ${FONT}`, `8px ${FONT}`, `0px ${FONT}`]
            },
            lines: false,
            linestyle: { stroke: "#ffff", width: 1, opacity: 0.4 },
            bounds: false,
            boundstyle: { stroke: "#ffff", width: 0.5, opacity: 0.8, dash: [2, 4] }
        },

        mw: {
            show: false,
            // style: { fill: "#ffffff", opacity: 0.02 }
            style: { fill: "#ffff", opacity: 1 }
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
            fill: "#ffffff00",
            stroke: "#fff",
            opacity: 1,
            width: 2
        },

        stars: {
            colors: true,
            size: 4,
            limit: 6,
            exponent: -0.28,
            designation: false,

            propername: false,
            propernameType: "name",
            propernameStyle: {
                fill: "#ffff",
                font: `8px ${FONT}`,
                align: "right",
                baseline: "center"
            },
            propernameLimit: 2.0
        }
    };



    Celestial.display(config);

    Celestial.skyview({ date: DATE });

    const productTypeEle = document.getElementById("product_type")
    const mapEle = document.getElementById("map")
    mapEle.style.width = productTypeEle.offsetWidth + "px"
})