document.addEventListener("DOMContentLoaded", function () {

    const mainContentEle = document.getElementById("main-content")
    const fixedNavBarEle = document.getElementById("fixed_nav_bar")
    const previewWrapperEle = document.getElementById("preview_wrapper")
    const wrapperShapeEle = document.getElementById("wrapper_shape")

    const productTypeEle = document.getElementById("product_type")
    const mapEle = document.getElementById("map")

    const largScreen = window.matchMedia("(min-width: 820px)")
    const smallScreen = window.matchMedia("(max-width: 819px)")

    function aspectRatioHandler(largScreen, smallScreen) {

        const classList = wrapperShapeEle.classList

        if (largScreen.matches) {
            // mainContentEle.style.setProperty("--myhpx", 10 + "px")
            // mainContentEle.style.setProperty("--mt-px", 5 + "px")

            if (classList.contains("vertical")) {
                if (previewWrapperEle.offsetWidth < previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.width = 67.1 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth * 1.3 + "px"
                }

                else if (previewWrapperEle.offsetWidth > previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.height = 90 + "%"
                    wrapperShapeEle.style.width = wrapperShapeEle.offsetHeight / 1.3 + "px"
                }

                else {
                    wrapperShapeEle.style.width = 75 + "%"
                    wrapperShapeEle.style.height = 90 + "%"
                }
            }

        }

        else if (smallScreen.matches) {

            // mainContentEle.style.setProperty("--myhpx", fixedNavBarEle.offsetHeight + "px")
            // mainContentEle.style.setProperty("--mt-px", fixedNavBarEle.offsetHeight + "px")

            if (classList.contains("vertical")) {
                if (previewWrapperEle.offsetWidth < previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.width = 90 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth * 1.3 + "px"
                }

                else if (previewWrapperEle.offsetWidth > previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.height = 90 + "%"
                    wrapperShapeEle.style.width = wrapperShapeEle.offsetHeight / 1.3 + "px"
                }

                else {
                    wrapperShapeEle.style.width = 75 + "%"
                    wrapperShapeEle.style.height = 90 + "%"
                }
            }

        }
    }

    aspectRatioHandler(largScreen, smallScreen)

    window.addEventListener('resize', function () {
        aspectRatioHandler(largScreen, smallScreen)
        MapFunction()
    }, true)

    function MapFunction() {
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
            adaptable: true,
    
            projection: "wiechel",
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
                    fill: "#ffff", align: "center", baseline: "middle", opacity: 1,
                    font: [`14px ${FONT}`, `8px ${FONT}`, `0px ${FONT}`]
                },
                lines: false,
                linestyle: { stroke: "#ffff", width: 1, opacity: 1 },
                bounds: false,
                boundstyle: { stroke: "#ffff", width: 0.5, opacity: 1, dash: [2, 4] }
            },
    
            mw: {
                show: true,
                // style: { fill: "#ffffff", opacity: 0.02 }
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
                    font: `8px ${FONT}`,
                    align: "right",
                    baseline: "center"
                },
                propernameLimit: 2.0,
            }
        };
    
    
    
        Celestial.display(config);
    
        Celestial.skyview({ date: DATE });
        mapEle.style.width = productTypeEle.offsetWidth + "px"
    }
    MapFunction()
})