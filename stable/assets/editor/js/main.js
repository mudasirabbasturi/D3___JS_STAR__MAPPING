function toggleFunction(x) {
    x.classList.toggle("rotate")
}
document.addEventListener("DOMContentLoaded", function () {
    const bodyEle = document.getElementsByTagName('body')[0]
    const toggleEle = document.querySelector('.list_menu')
    const liEle = document.getElementsByClassName('nav-item')
    function addOffcanvasActiveClass() {
        bodyEle.classList.add('offcanvas-active');
        if (!toggleEle.classList.contains('rotate')) {
            toggleEle.classList.add('rotate');
        }
    }
    function removeOffcanvasActiveClass() {
        bodyEle.classList.remove('offcanvas-active');
        toggleEle.classList.remove('rotate');
    }
    function handleMediaQueryChange(mediaQuery) {
        if (mediaQuery.matches) {
            for (let i = 0; i < liEle.length; i++) {
                const clicked = liEle[i];
                if (i !== liEle.length - 1) {
                    clicked.addEventListener('click', addOffcanvasActiveClass);
                }
            }
        } else {
            for (let i = 0; i < liEle.length; i++) {
                const clicked = liEle[i];
                clicked.removeEventListener('click', addOffcanvasActiveClass);
                removeOffcanvasActiveClass();
            }
        }
    }

    const mediaQuery = window.matchMedia('(max-width: 819px)');
    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    const largScreen = window.matchMedia("(min-width: 820px)")
    const smallScreen = window.matchMedia("(max-width: 819px)")

    /** Globla variable */
    var cartPrintDesign = "classic"
    var cartPrintSize = "45x60 cm"
    var cartPriceValue = "£ 34.00"

    /** SIDEBAR. ====================================================== */
    const fixedNavBarEle = document.getElementById("fixed_nav_bar")

    /** STYLE. */
    const printStyleEle = document.getElementsByClassName("print_style_element")
    const layOutEle = document.getElementsByClassName("layout_style")
    const SizeVerticalEle = document.getElementsByClassName("size_vertical")
    const SizeHorizontalEle = document.getElementsByClassName("size_horizontal")
    const SizeSquarelEle = document.getElementsByClassName("size_square")
    /** STYLE END. */

    /** MOMENT. */
    const momentLocationEle = document.getElementById('moment_location')
    const momentDatePickerEle = document.getElementById("moment_date_picker")
    const MomentTimePickerEle = document.getElementById("moment_time_picker")
    const MomentCoordinateEle = document.getElementById("moment_coordinates")
    /** MOMENT END. */

    /** TEXT. */
    const txtMsgEle = document.getElementById("text_message")
    const txtDateEle = document.getElementById("text_date")
    const txtLocationEle = document.getElementById("text_location")
    const txtCoordinatesEle = document.getElementById("text_coordinates")
    /** TEXT END. */

    /** DESIGN. */
    const starMapEle = document.getElementsByClassName("star_map_element")
    const starColorSelectEle = document.getElementsByClassName("star_color_select")
    const starColorEle = document.getElementsByClassName("star_color")
    const frameColorSelectEle = document.getElementsByClassName("frame_color_select")
    const frameColorEle = document.getElementsByClassName("frame_color")
    const msgFontsEle = document.getElementsByClassName("msg_fonts")
    const detailFontsEle = document.getElementsByClassName("dtls_fonts")
    const borderSelectEle = document.getElementsByClassName("borderSelect")
    const starMapClrDNB = document.getElementById("star_map_color_dnb")
    const starMapClrBgDNB = document.getElementById("frame_color_bg_dnb")
    /** DESIGN END. */

    /** PRODUCT. */
    const productFinshSelectEle = document.getElementsByClassName("product_finish_select")
    const productFrameEle = document.getElementsByClassName("product_frame")
    /** PRODUCT END. */

    /** SIDEBAR END. ====================================================== */

    /** MAIN. ============================================================== */
    const mainContentEle = document.getElementById("main-content")
    const previewWrapperEle = document.getElementById("preview_wrapper")
    const wrapperShapeEle = document.getElementById("wrapper_shape")
    const productEle = document.getElementById("wrapper_product")
    const productTypeEle = document.getElementById("product_type")
    const mapEle = document.getElementById("map")
    const messageEle = document.getElementById('message')
    const detailsDateEle = document.getElementById("details_date")
    const detailsTimeEle = document.getElementById("details_time")
    const detailsLocationEle = document.getElementById("details_location")
    const detailsCoordinatesEle = document.getElementById("details_coordinates")
    /** MAIN END. ========================================================== */
    var DATE = new Date("2021-09-25T04:00:00+0000");
    var [LAT, LON] = [36.525321, -121.815916];
    var FONT = "Raleway";
    function functionMap() {
        config = {
            container: "map",
            width: 1200,

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

            stars: {
                show: true,
                colors: false,
                size: 6,
                limit: 6,
                exponent: -0.28,
                designation: false,
                propername: false,
                propername: false,
                propernameType: "name",
                propernameStyle: {
                    fill: "#ddddbb",
                    font: `8px ${FONT}`,
                    align: "right",
                    baseline: "center"
                },
                propernameLimit: 2.0
            },

            planets: {
                show: true,
                which: ["sol", "mer", "ven", "ter", "lun", "mar", "jup", "sat", "ura", "nep", "plu", "eri"],
                symbols: {
                    "sol": { fill: "#ffff", size: "0" },
                    "mer": { fill: "#ffff", size: "0" },
                    "ven": { fill: "#ffff", size: "0" },
                    "ter": { fill: "#ffff", size: "0" },
                    "lun": { fill: "#ffff", size: "0" },
                    "mar": { fill: "#ffff", size: "0" },
                    "cer": { fill: "#ffff", size: "0" },
                    "ves": { fill: "#ffff", size: "0" },
                    "jup": { fill: "#ffff", size: "0" },
                    "sat": { fill: "#ffff", size: "0" },
                    "ura": { fill: "#ffff", size: "0" },
                    "nep": { fill: "#ffff", size: "0" },
                    "plu": { fill: "#ffff", size: "0" },
                    "eri": { fill: "#ffff", size: "0" }
                },
                symbolType: "disk",
                names: false,
                nameStyle: {
                    fill: "#00ccff",
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
                    fill: "#ffffff", align: "center", baseline: "middle", opacity: 1,
                    font: [`14px ${FONT}`, `8px ${FONT}`, `0px ${FONT}`]
                },
                lines: false,
                linestyle: { stroke: "#ffff", width: 1, opacity: 0.9 },
                bounds: false,
                boundstyle: { stroke: "#cccc00", width: 0.5, opacity: 0.8, dash: [2, 4] }
            },

            mw: {
                show: false,
                style: { fill: "#ffffff", opacity: 0.1 }
            },

            lines: {
                graticule: {
                    show: false,
                    stroke: "#cccccc",
                    width: 0.6,
                    opacity: 0.8,
                    lon: {
                        pos: [""],
                        fill: "#eee",
                        font: "10px Helvetica, Arial, sans-serif"
                    },
                    lat: {
                        pos: [""],
                        fill: "#eee",
                        font: "10px Helvetica, Arial, sans-serif"
                    }
                },
                equatorial: { show: false, stroke: "#aaaaaa", width: 1.3, opacity: 0.7 },
                ecliptic: { show: false, stroke: "#66cc66", width: 1.3, opacity: 0.7 },
                galactic: { show: false, stroke: "#cc6666", width: 1.3, opacity: 0.7 },
                supergalactic: { show: false, stroke: "#cc66cc", width: 1.3, opacity: 0.7 }
            },
            background: {
                fill: "#ffffff00",
                stroke: "#ffff",
                opacity: 1,
                width: 6
            }
        }
        Celestial.display(config)

        function initMap() {
            var input = document.getElementById('location');
            var autocomplete = new google.maps.places.Autocomplete(
        /** @type {HTMLInputElement} */(momentLocationEle),
                {
                    types: ['(cities)'],
                });
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    return;
                }
                detailsLocationEle.innerText = momentLocationEle.value
                txtLocationEle.value = momentLocationEle.value
                LAT = place.geometry.location.lat();
                LON = place.geometry.location.lng();
                LAT = parseFloat(LAT.toFixed(4));
                LON = parseFloat(LON.toFixed(4));

                Celestial.skyview({ "location": [LAT, LON] });

                var latDirection = LAT >= 0 ? "N" : "S";
                var longDirection = LON >= 0 ? "E" : "W";
                var formattedCoordinates = Math.abs(LAT) + "° " + latDirection + ", " + Math.abs(LON) + "° " + longDirection;
                txtCoordinatesEle.value = formattedCoordinates;
                var inputEvent = new Event('input', { 'bubbles': true });
                txtCoordinatesEle.dispatchEvent(inputEvent);
            });
        }
        google.maps.event.addDomListener(window, 'load', initMap)

    }
    functionMap()

    function aspectRatioHandler(largScreen, smallScreen) {


        const classList = wrapperShapeEle.classList

        if (largScreen.matches) {

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
                    wrapperShapeEle.style.width = 67.1 + "%"
                    wrapperShapeEle.style.height = 90 + "%"
                }
            }
            else if (classList.contains("horizontal")) {

                if (previewWrapperEle.offsetWidth < previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.width = 81.731 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth / 1.333 + "px"
                }

                else if (previewWrapperEle.offsetWidth > previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.height = 81.731 + "%"
                    wrapperShapeEle.style.width = wrapperShapeEle.offsetHeight * 1.333 + "px"
                }

                else {
                    wrapperShapeEle.style.width = 81.731 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth / 1.333 + "px"
                }

            }

            else if (classList.contains("square")) {

                if (previewWrapperEle.offsetWidth < previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.width = 69.9833 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth + "px"
                }

                else if (previewWrapperEle.offsetWidth > previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.height = 69.9833 + "%"
                    wrapperShapeEle.style.width = wrapperShapeEle.offsetHeight + "px"
                }

                else {
                    wrapperShapeEle.style.width = 69.9833 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth + "px"
                }

            }
            functionStarMapWH()
            functionBorderBackground()
            functionCanvas()
        }

        else if (smallScreen.matches) {

            if (classList.contains("vertical")) {
                if (previewWrapperEle.offsetWidth < previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.width = 92 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth * 1.3 + "px"
                }

                else if (previewWrapperEle.offsetWidth > previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.height = 92 + "%"
                    wrapperShapeEle.style.width = wrapperShapeEle.offsetHeight / 1.3 + "px"
                }

                else {
                    wrapperShapeEle.style.width = 75 + "%"
                    wrapperShapeEle.style.height = 92 + "%"
                }
            }
            else if (classList.contains("horizontal")) {
                if (previewWrapperEle.offsetWidth < previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.width = 92 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth / 1.333 + "px"
                }

                else if (previewWrapperEle.offsetWidth > previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.height = 92 + "%"
                    wrapperShapeEle.style.width = wrapperShapeEle.offsetHeight * 1.333 + "px"
                }

                else {
                    wrapperShapeEle.style.width = 92 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth / 1.333 + "px"
                }
            }

            else if (classList.contains("square")) {

                if (previewWrapperEle.offsetWidth < previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.width = 92 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth + "px"
                }

                else if (previewWrapperEle.offsetWidth > previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.height = 92 + "%"
                    wrapperShapeEle.style.width = wrapperShapeEle.offsetHeight + "px"
                }

                else {
                    wrapperShapeEle.style.width = 92 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth + "px"
                }

            }
            functionStarMapWH()
            functionBorderBackground()
            functionCanvas()
        }

    }

    aspectRatioHandler(largScreen, smallScreen)
    window.addEventListener('resize', function () {
        aspectRatioHandler(largScreen, smallScreen)
    }, true)

    /**STYLE.  */
    function functionStyle() {

        function functionPrintStyle() {
            for (let i = 0; i < printStyleEle.length; i++) {
                const clicked = printStyleEle[i]
                clicked.addEventListener('click', function () {
                    for (let j = 0; j < printStyleEle.length; j++) {
                        printStyleEle[j].classList.remove('selected')
                        productTypeEle.classList.remove(printStyleEle[j].getAttribute("data-type"))
                    }
                    this.classList.add("selected")
                    const getAttribute = this.getAttribute("data-type")
                    cartPrintDesign = getAttribute
                    productTypeEle.classList.add(getAttribute)

                    if (productTypeEle.classList.contains("romantic")) {
                        mapEle.style.visibility = "hidden"
                        Celestial.reproject({ projection: "bonne" })
                        config.background.stroke = "#ffff"
                        config.background.width = 6
                        Celestial.apply(config)
                        setTimeout(() => {
                            mapEle.style.visibility = "visible"
                            functionStarMapWH()
                            functionBorderBackground()
                            functionCanvas()
                        }, 100);
                    }


                    if (productTypeEle.classList.contains("astronomer")) {
                        mapEle.style.visibility = "hidden"
                        Celestial.reproject({ projection: "airy" })
                        Celestial.setStyle({
                            background: {
                                fill: "#fa0000"
                            }
                        })
                        config.background.width = 0
                        Celestial.apply(config)

                        setTimeout(() => {
                            mapEle.style.visibility = "visible"
                            functionStarMapWH()
                            functionBorderBackground()
                            functionCanvas()
                        }, 100);
                    }

                    if (productTypeEle.classList.contains("aquarelles")) {
                        mapEle.style.visibility = "hidden"
                        Celestial.reproject({ projection: "airy" })
                        config.background.fill = "#ffffff00"
                        config.background.stroke = "#ffffff00"
                        config.background.width = 0

                        Celestial.apply(config)
                        setTimeout(() => {
                            mapEle.style.visibility = "visible"
                            functionStarMapWH()
                            functionBorderBackground()
                            functionCanvas()
                        }, 100);
                    }

                    if (productTypeEle.classList.contains("modern")) {
                        mapEle.style.visibility = "hidden"
                        Celestial.reproject({ projection: "airy" })
                        config.background.fill = "black"
                        config.background.stroke = "#ffffff00"
                        config.background.width = 0

                        Celestial.apply(config)
                        setTimeout(() => {
                            mapEle.style.visibility = "visible"
                            functionStarMapWH()
                            functionBorderBackground()
                            functionCanvas()
                        }, 100);

                    }

                    if (productTypeEle.classList.contains("photographer")) {
                        mapEle.style.visibility = "hidden"
                        Celestial.reproject({ projection: "cylindricalStereographic" })
                        config.background.fill = "#ffffff00"
                        config.background.stroke = "#ffffff00"
                        config.background.width = 0

                        Celestial.apply(config)
                        setTimeout(() => {
                            mapEle.style.visibility = "visible"
                            functionStarMapWH()
                            functionBorderBackground()
                            functionCanvas()
                        }, 100);
                    }

                    if (productTypeEle.classList.contains("explorer")) {
                        mapEle.style.visibility = "hidden"
                        Celestial.reproject({ projection: "cylindricalStereographic" })
                        config.background.fill = "#ffffff00"
                        config.background.stroke = "#ffffff00"
                        config.background.width = 0

                        Celestial.apply(config)
                        setTimeout(() => {
                            mapEle.style.visibility = "visible"
                            functionStarMapWH()
                            functionBorderBackground()
                            functionCanvas()
                        }, 100);
                    }

                    else {
                        mapEle.style.visibility = "hidden"
                        Celestial.reproject({ projection: "airy" })
                        config.background.stroke = "#ffff"
                        config.background.width = 6
                        Celestial.apply(config)
                        setTimeout(() => {
                            mapEle.style.visibility = "visible"
                            functionStarMapWH()
                            functionBorderBackground()
                            functionCanvas()
                        }, 100);
                    }

                })
            }
        }

        function functionPrintLayout() {
            const arrayClass = ['vertical', 'horizontal', 'square']
            for (let i = 0; i < layOutEle.length; i++) {
                const clicked = layOutEle[i]
                clicked.addEventListener('click', function () {
                    for (let j = 0; j < arrayClass.length; j++) {
                        layOutEle[j].classList.remove("selected")
                        wrapperShapeEle.classList.remove(layOutEle[j].getAttribute("data-type"))
                    }
                    this.classList.add("selected")
                    const getAttribute = this.getAttribute("data-type")
                    wrapperShapeEle.classList.add(getAttribute)
                    aspectRatioHandler(largScreen, smallScreen)
                    functionStarMapWH()
                    functionCanvas()
                })
            }

        }

        function functionPrintSizesVertical() {
            for (let i = 0; i < SizeVerticalEle.length; i++) {
                const clicked = SizeVerticalEle[i]
                clicked.addEventListener('click', function () {
                    for (let j = 0; j < SizeVerticalEle.length; j++) {
                        SizeVerticalEle[j].classList.remove("selected")
                    }
                    const getAttribute = this.getAttribute("data-size")
                    const getValue = parseFloat(getAttribute)
                    this.classList.add("selected")
                    const nameElement = this.querySelector(".name");
                    const priceElement = this.querySelector(".price small b");
                    cartPrintSize = nameElement.textContent;
                    cartPriceValue = priceElement.textContent;
                    if (largScreen.matches) {
                        wrapperShapeEle.style.transform = "scale(" + getValue + ")"
                    }
                })
            }
        }

        function functionPrintSizesHorizontal() {
            for (let i = 0; i < SizeHorizontalEle.length; i++) {
                const clicked = SizeHorizontalEle[i]
                clicked.addEventListener('click', function () {
                    for (let j = 0; j < SizeHorizontalEle.length; j++) {
                        SizeHorizontalEle[j].classList.remove("selected")
                    }
                    const getAttribute = this.getAttribute("data-size")
                    const getValue = parseFloat(getAttribute)
                    this.classList.add("selected")
                    const nameElement = this.querySelector(".name");
                    const priceElement = this.querySelector(".price small b");
                    cartPrintSize = nameElement.textContent;
                    cartPriceValue = priceElement.textContent;
                    if (largScreen.matches) {
                        wrapperShapeEle.style.transform = "scale(" + getValue + ")"
                    }
                })
            }
        }

        function functionPrintSizesSquare() {
            for (let i = 0; i < SizeSquarelEle.length; i++) {
                const clicked = SizeSquarelEle[i]
                clicked.addEventListener('click', function () {
                    for (let j = 0; j < SizeSquarelEle.length; j++) {
                        SizeSquarelEle[j].classList.remove("selected")
                    }
                    const getAttribute = this.getAttribute("data-size")
                    const getValue = parseFloat(getAttribute)
                    this.classList.add("selected")
                    const nameElement = this.querySelector(".name");
                    const priceElement = this.querySelector(".price small b");
                    cartPrintSize = nameElement.textContent;
                    cartPriceValue = priceElement.textContent;
                    if (largScreen.matches) {
                        wrapperShapeEle.style.transform = "scale(" + getValue + ")"
                    }
                })
            }
        }

        functionPrintStyle()
        functionPrintLayout()
        functionPrintSizesVertical()
        functionPrintSizesHorizontal()
        functionPrintSizesSquare()

    }
    functionStyle() // STYLE END.

    /** MOMENT. */
    function functionMoment() {
        function functionMomentLocation() {
            momentLocationEle.addEventListener('keyup', function () {
                detailsLocationEle.innerText = this.value
                txtLocationEle.value = this.value
            })
        }

        function functionMomentDate() {
            $('#moment_date_picker').datetimepicker({
                lang: 'ch',
                timepicker: false,
                format: 'd/m/Y',
            });
            $("#moment_date_picker").change(function () {
                var currentValue = $('#moment_date_picker').datetimepicker('getValue');
                DATE = currentValue
                Celestial.skyview({ date: DATE })
                var options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
                var formattedDate = currentValue.toLocaleDateString(undefined, options);
                detailsDateEle.innerText = formattedDate
                txtDateEle.value = formattedDate
            });
        }

        function functionMomentTime() {
            $('#moment_time_picker').datetimepicker({
                datepicker: false,
                format: 'H:i',
                step: 1
            });

            $("#moment_time_picker").change(function () {
                var currentValue = $('#moment_time_picker').datetimepicker('getValue');
                var options = { hour: 'numeric', minute: 'numeric', hour12: true };
                var formattedTime = currentValue.toLocaleTimeString(undefined, options);
                detailsTimeEle.innerText = formattedTime;
            });
        }

        functionMomentLocation()
        functionMomentDate()
        functionMomentTime()
    }
    functionMoment() // MOMENT END.

    /** TEXT. */
    function functionText() {

        function functionTextMessage() {
            txtMsgEle.addEventListener("keyup", function () {
                if (this.value == "") {
                    messageEle.innerText = "🤍 OUR LUCKY STARS 🤍"
                }
                else {
                    messageEle.innerText = this.value
                }
            })
        }

        function functionTextDate() {
            txtDateEle.addEventListener("keyup", function () {
                if (this.value == "") {
                    var currentValue = $('#moment_date_picker').datetimepicker('getValue');
                    var options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
                    var formattedDate = currentValue.toLocaleDateString(undefined, options);
                    detailsDateEle.innerText = formattedDate
                }
                else {
                    detailsDateEle.innerText = this.value
                }
            })
        }

        function functionTextLocation() {
            txtLocationEle.addEventListener('keyup', function () {
                if (this.value == "") {
                    detailsLocationEle.innerText = momentLocationEle.value
                }
                else {
                    detailsLocationEle.innerText = this.value
                }
            })
        }

        function functionTextCoordinates() {
            txtCoordinatesEle.addEventListener('input', function () {
                if (this.value === "") {
                    detailsCoordinatesEle.innerText = "51.5073° N, 0.1276° W";
                } else {
                    detailsCoordinatesEle.innerText = this.value;
                }
            });
        }

        functionTextMessage()
        functionTextDate()
        functionTextLocation()
        functionTextCoordinates()
    }
    functionText() // TEXT END.

    /** DESIGN. */
    function functionDesign() {

        function functionDesignStarMapElement() {
            for (let i = 0; i < starMapEle.length; i++) {
                const clicked = starMapEle[i];
                clicked.addEventListener('click', function () {
                    if (this.classList.contains("selected")) {
                        this.classList.remove("selected");
                    } else {
                        this.classList.add("selected");
                    }
                    if (this.classList.contains("constellations_line")) {
                        config.constellations.lines = !config.constellations.lines
                        Celestial.apply(config)
                    }
                    if (this.classList.contains("milky_way")) {
                        config.mw.show = !config.mw.show
                        Celestial.apply(config)
                    }

                    if (this.classList.contains("graticule")) {
                        config.lines.graticule.show = !config.lines.graticule.show
                        Celestial.apply(config)
                    }

                    if (this.classList.contains("constellation_name")) {
                        config.constellations.names = !config.constellations.names
                        Celestial.apply(config)
                    }

                    if (this.classList.contains("moon")) {
                        config.planets.symbols["lun"].size = (config.planets.symbols["lun"].size === "12") ? "0" : "12"
                        Celestial.apply(config)
                    }

                    if (this.classList.contains("planet_and_sun")) {
                        for (var planet in config.planets.symbols) {
                            if (planet !== "lun") {
                                config.planets.symbols[planet].size = (config.planets.symbols[planet].size === "6") ? "0" : "6"
                            }
                        }
                        config.planets.names = !config.planets.names
                        Celestial.apply(config)
                    }

                });
            }
        }

        function functionDesignStarColorSelect() {
            for (let i = 0; i < starColorSelectEle.length; i++) {
                const clicked = starColorSelectEle[i]
                clicked.addEventListener('click', function () {
                    for (let j = 0; j < starColorSelectEle.length; j++) {
                        starColorSelectEle[j].classList.remove('selected')
                    }
                    this.classList.add("selected")
                })
            }
        }

        function functionDesignStarColor() {
            for (let i = 0; i < starColorEle.length; i++) {
                const clicked = starColorEle[i]
                clicked.addEventListener('click', function () {
                    const computedStyle = getComputedStyle(this);
                    const bgColor = computedStyle.backgroundColor;
                    config.background.fill = bgColor
                    Celestial.apply(config)
                })
            }
        }

        function functionDesignFrameColorSelect() {
            for (let i = 0; i < frameColorSelectEle.length; i++) {
                const clicked = frameColorSelectEle[i]
                clicked.addEventListener('click', function () {
                    for (let j = 0; j < frameColorSelectEle.length; j++) {
                        frameColorSelectEle[j].classList.remove('selected')
                    }
                    this.classList.add("selected")
                })
            }
        }

        function functionDesignFrameColor() {
            for (let i = 0; i < frameColorEle.length; i++) {
                const clicked = frameColorEle[i]
                clicked.addEventListener("click", function () {
                    const computedStyle = getComputedStyle(this);
                    const bgColor = computedStyle.backgroundColor;
                    wrapperShapeEle.style.backgroundColor = bgColor
                })
            }
        }

        function functionDesignBorderSelect() {
            for (let i = 0; i < borderSelectEle.length; i++) {
                const clicked = borderSelectEle[i]
                clicked.addEventListener('click', function () {
                    for (let j = 0; j < borderSelectEle.length; j++) {
                        borderSelectEle[j].classList.remove('selected')
                    }
                    this.classList.add("selected")
                    const getAttribute = this.getAttribute("data-border")
                    productEle.style.border = getAttribute
                })
            }
        }

        function functionDesignMessageFonts() {
            for (let i = 0; i < msgFontsEle.length; i++) {
                const clicked = msgFontsEle[i]
                clicked.addEventListener('click', function () {
                    for (let j = 0; j < msgFontsEle.length; j++) {
                        msgFontsEle[j].classList.remove('selected')
                    }
                    this.classList.add("selected")

                    const computedStyle = getComputedStyle(this);
                    const fontFamilyValue = computedStyle.getPropertyValue('--font-style');
                    messageEle.style.fontFamily = fontFamilyValue
                })
            }
        }

        function functionDesignDetailsFonts() {
            for (let i = 0; i < detailFontsEle.length; i++) {
                const clicked = detailFontsEle[i]
                clicked.addEventListener('click', function () {
                    for (let j = 0; j < detailFontsEle.length; j++) {
                        detailFontsEle[j].classList.remove('selected')
                    }
                    this.classList.add("selected")
                    const computedStyle = getComputedStyle(this);
                    const fontFamilyValue = computedStyle.getPropertyValue('--font-style');
                    detailsDateEle.style.fontFamily = fontFamilyValue
                    detailsTimeEle.style.fontFamily = fontFamilyValue
                    detailsLocationEle.style.fontFamily = fontFamilyValue
                    detailsCoordinatesEle.style.fontFamily = fontFamilyValue
                })
            }
        }
        functionDesignStarMapElement()
        functionDesignStarColorSelect()
        functionDesignStarColor()
        functionDesignFrameColorSelect()
        functionDesignFrameColor()
        functionDesignBorderSelect()
        functionDesignMessageFonts()
        functionDesignDetailsFonts()
    }
    functionDesign() // DESIGN END.
    /** PRODUCT. */

    function functionProduct() {
        function functionProductFinishSelect() {
            for (let i = 0; i < productFinshSelectEle.length; i++) {
                const clicked = productFinshSelectEle[i]
                clicked.addEventListener('click', function () {
                    for (let j = 0; j < productFinshSelectEle.length; j++) {
                        productFinshSelectEle[j].classList.remove('selected')
                    }
                    this.classList.add("selected")
                })
            }
        }
        functionProductFinishSelect()
        function functionProductFrame() {
            let dynamicDiv = null;
            let dynamicCreated = false;
            for (let i = 0; i < productFrameEle.length; i++) {
                const clicked = productFrameEle[i];
                clicked.addEventListener('click', function () {
                    const imgURL = this.getAttribute("data-src");
                    if (imgURL === "none" && this === dynamicDiv) {
                        return;
                    }
                    for (let j = 0; j < productFrameEle.length; j++) {
                        productFrameEle[j].classList.remove('selected');
                    }
                    this.classList.add("selected");
                    if (dynamicDiv && dynamicCreated) {
                        wrapperShapeEle.removeChild(dynamicDiv);
                        dynamicDiv = null;
                        dynamicCreated = false;
                    }
                    if (imgURL === "none") {
                        return;
                    }
                    const newDiv = document.createElement('div')
                    newDiv.classList.add('bg_frame');
                    const newImg = document.createElement('img')
                    const domainName = "https://mudasirabbasturi.github.io/D3___JS_STAR__MAPPING/"
                    newImg.src = `${domainName}/assets/images/${imgURL}.png`
                    newImg.alt = ''
                    newDiv.appendChild(newImg)
                    wrapperShapeEle.appendChild(newDiv)
                    dynamicDiv = newDiv
                    dynamicCreated = true
                })
            }
        }
        functionProductFrame()
    }
    functionProduct() // PRODUCT END.

    function functionStarMapWH() {
        if (productTypeEle.classList.contains("classic")) {
            mapEle.style.height = mapEle.offsetWidth + "px"
            starMapClrDNB.style.display = "block"
            starMapClrBgDNB.style.display = "block"
        }
        else if (productTypeEle.classList.contains("poet")) {
            mapEle.style.height = mapEle.offsetWidth + "px"
            starMapClrDNB.style.display = "block"
            starMapClrBgDNB.style.display = "block"
        }
        else if (productTypeEle.classList.contains("astronomer")) {
            mapEle.style.height = mapEle.offsetWidth + "px"
            starMapClrDNB.style.display = "block"
            starMapClrBgDNB.style.display = "block"
        }
        else if (productTypeEle.classList.contains("aquarelles")) {
            mapEle.style.height = mapEle.offsetWidth + "px"
            starMapClrDNB.style.display = "none"
            starMapClrBgDNB.style.display = "none"
        }
        else if (productTypeEle.classList.contains("romantic")) {
            mapEle.style.height = mapEle.offsetWidth + "px"
            starMapClrDNB.style.display = "block"
            starMapClrBgDNB.style.display = "block"
        }
        else if (productTypeEle.classList.contains("modern")) {
            mapEle.style.height = mapEle.offsetWidth + "px"
            starMapClrDNB.style.display = "block"
            starMapClrBgDNB.style.display = "block"
        }
        else if (productTypeEle.classList.contains("photographer")) {
            mapEle.style.height = 85 + "%"
            starMapClrDNB.style.display = "block"
            starMapClrBgDNB.style.display = "block"
        }
        else if (productTypeEle.classList.contains("explorer")) {
            mapEle.style.height = 100 + "%"
            starMapClrDNB.style.display = "block"
            starMapClrBgDNB.style.display = "block"
        }
    }
    functionStarMapWH()

    function functionBorderBackground() {
        mapEle.style.backgroundColor = "unset";
        if (productTypeEle.classList.contains("classic")) {
            wrapperShapeEle.style.backgroundColor = "#000000";
        }
        else if (productTypeEle.classList.contains("poet")) {
            wrapperShapeEle.style.backgroundColor = "#000000";
        }
        else if (productTypeEle.classList.contains("astronomer")) {
            wrapperShapeEle.style.backgroundColor = "#000000";
        }
        else if (productTypeEle.classList.contains("aquarelles")) {
            wrapperShapeEle.style.backgroundColor = "white";
            mapEle.style.backgroundColor = "white";
        }
        else if (productTypeEle.classList.contains("romantic")) {
            wrapperShapeEle.style.backgroundColor = "#000000";
        }
        else if (productTypeEle.classList.contains("modern")) {
            wrapperShapeEle.style.backgroundColor = "#1D1D1D";
        }
        else if (productTypeEle.classList.contains("photographer")) {
            wrapperShapeEle.style.backgroundColor = "white";
            mapEle.style.backgroundColor = "black"
        }
        else if (productTypeEle.classList.contains("explorer")) {
            wrapperShapeEle.style.backgroundColor = "white";
            mapEle.style.backgroundColor = "black"
        }
    }
    functionBorderBackground()

    function functionCanvas() {
        const canvas = document.querySelector("canvas")
        canvas.style.width = mapEle.offsetWidth + "px"
        canvas.style.height = mapEle.offsetHeight + "px"
        canvas.style.position = "absolute"
        canvas.style.left = "0"
        canvas.style.right = "0"
        canvas.style.top = "0"
        canvas.style.bottom = "0"
        canvas.style.margin = "auto"
        canvas.style.zIndex = "1"
    }
    functionCanvas();

    function functionPreview() {
        document.getElementById("preview").onclick = () => {

            document.getElementById("cart_print_style").innerText = cartPrintDesign + " - " + cartPrintSize
            document.getElementById("cart_location").innerText = detailsLocationEle.innerText
            document.getElementById("cart_message").innerText = messageEle.innerText
            document.getElementById("cart_date").innerText = detailsDateEle.innerText + " - " + detailsTimeEle.innerText
            document.getElementById("cart_coordinates").innerText = detailsCoordinatesEle.innerText
            document.getElementById("cart_price").innerText = cartPriceValue

            const divToCapture = document.getElementById("wrapper_shape");
            html2canvas(divToCapture).then(function (canvas) {
                const img = new Image();
                img.src = canvas.toDataURL("image/png");
                img.onload = function () {
                    alert('image is ready')
                    document.getElementById("final_image").appendChild(img);
                };
            });


        }
    }
    functionPreview()

})
function redirectToPrintSize(target) {
    $('.print_size_content .tab-pane').removeClass('active')
    $(target).addClass('active')
}
function redirectTo(target) {
    $('.detail_tab_content .tab-pane').removeClass('active');
    $(target).addClass('active');
}
var toggleSwitches = $(".toggleSwitch");
toggleSwitches.on("click", function () {
    var targetId = $(this).data("target");
    var inputField = $("#" + targetId);
    if ($(this).prop("checked")) {
        inputField.removeClass('disabledEdit')
    } else {
        inputField.addClass('disabledEdit')
    }
});