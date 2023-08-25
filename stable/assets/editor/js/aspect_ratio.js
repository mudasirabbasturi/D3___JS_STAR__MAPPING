document.addEventListener("DOMContentLoaded", function () {

    const largScreen = window.matchMedia("(min-width: 820px)")
    const smallScreen = window.matchMedia("(max-width: 819px)")

    /** SIDEBAR. ====================================================== */

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
    /** DESIGN END. */

    /** SIDEBAR END. ====================================================== */

    /** MAIN. ============================================================== */

    const previewWrapperEle = document.getElementById("preview_wrapper")
    const wrapperShapeEle = document.getElementById("wrapper_shape")
    const productEle = document.getElementById("wrapper_product")
    const mapEle = document.getElementById("map")
    const messageEle = document.getElementById('message')
    const detailsDateEle = document.getElementById("details_date")
    const detailsTimeEle = document.getElementById("details_time")
    const detailsLocationEle = document.getElementById("details_location")
    const detailsCoordinatesEle = document.getElementById("details_coordinates")

    /** MAIN END. ========================================================== */


    function aspectRatioHandler(largScreen, smallScreen) {

        const classList = wrapperShapeEle.classList

        if (largScreen.matches) {

            if (classList.contains("vertical")) {
                if (previewWrapperEle.offsetWidth < previewWrapperEle.offsetHeight) {
                    console.log(previewWrapperEle.offsetWidth + ": " + previewWrapperEle.offsetHeight)
                    wrapperShapeEle.style.width = 67.1 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth * 1.3 + "px"
                }

                else if (previewWrapperEle.offsetWidth > previewWrapperEle.offsetHeight) {
                    console.log(previewWrapperEle.offsetWidth + ": " + previewWrapperEle.offsetHeight)
                    wrapperShapeEle.style.height = 90 + "%"
                    wrapperShapeEle.style.width = wrapperShapeEle.offsetHeight / 1.3 + "px"
                }

                else {
                    console.log(previewWrapperEle.offsetWidth + ": " + previewWrapperEle.offsetHeight)
                    wrapperShapeEle.style.width = 67.1 + "%"
                    wrapperShapeEle.style.height = 90 + "%"
                }
            }
            else if (classList.contains("horizontal")) {

                if (previewWrapperEle.offsetWidth < previewWrapperEle.offsetHeight) {
                    console.log(previewWrapperEle.offsetWidth + ": " + previewWrapperEle.offsetHeight)
                    wrapperShapeEle.style.width = 81.731 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth / 1.333 + "px"
                }

                else if (previewWrapperEle.offsetWidth > previewWrapperEle.offsetHeight) {
                    console.log(previewWrapperEle.offsetWidth + ": " + previewWrapperEle.offsetHeight)
                    wrapperShapeEle.style.height = 81.731 + "%"
                    wrapperShapeEle.style.width = wrapperShapeEle.offsetHeight * 1.333 + "px"
                }

                else {
                    console.log(previewWrapperEle.offsetWidth + ": " + previewWrapperEle.offsetHeight)
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

        }

        else if (smallScreen.matches) {

            if (classList.contains("vertical")) {
                if (previewWrapperEle.offsetWidth < previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.width = 98 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth * 1.3 + "px"
                }

                else if (previewWrapperEle.offsetWidth > previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.height = 98 + "%"
                    wrapperShapeEle.style.width = wrapperShapeEle.offsetHeight / 1.3 + "px"
                }

                else {
                    wrapperShapeEle.style.width = 75 + "%"
                    wrapperShapeEle.style.height = 98 + "%"
                }
            }
            else if (classList.contains("horizontal")) {
                if (previewWrapperEle.offsetWidth < previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.width = 98 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth / 1.333 + "px"
                }

                else if (previewWrapperEle.offsetWidth > previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.height = 98 + "%"
                    wrapperShapeEle.style.width = wrapperShapeEle.offsetHeight * 1.333 + "px"
                }

                else {
                    wrapperShapeEle.style.width = 98 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth / 1.333 + "px"
                }
            }

            else if (classList.contains("square")) {

                if (previewWrapperEle.offsetWidth < previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.width = 98 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth + "px"
                }

                else if (previewWrapperEle.offsetWidth > previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.height = 98 + "%"
                    wrapperShapeEle.style.width = wrapperShapeEle.offsetHeight + "px"
                }

                else {
                    wrapperShapeEle.style.width = 98 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth + "px"
                }

            }

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
                    }
                    this.classList.add("selected")
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
                    wrapperShapeEle.style.transform = "scale(" + getValue + ")"

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
                    wrapperShapeEle.style.transform = "scale(" + getValue + ")"

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
                    wrapperShapeEle.style.transform = "scale(" + getValue + ")"

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
            txtCoordinatesEle.addEventListener('keyup', function () {
                if (this.value == "") {
                    detailsCoordinatesEle.innerText = "51.5073° N, 0.1276° W"
                }
                else {
                    detailsCoordinatesEle.innerText = this.value
                }
            })
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
                const clicked = starMapEle[i]
                clicked.addEventListener('click', function () {
                    for (let j = 0; j < starMapEle.length; j++) {
                        starMapEle[j].classList.remove('selected')
                    }
                    this.classList.add("selected")
                })
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
                    mapEle.style.backgroundColor = bgColor
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
        // all functions go here.
    }
    functionProduct() // PRODUCT END.

})

function redirectToPrintSize(target) {
    $('.print_size_content .tab-pane').removeClass('active')
    $(target).addClass('active')
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

