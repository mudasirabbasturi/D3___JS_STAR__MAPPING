document.addEventListener("DOMContentLoaded", function () {

    const largScreen = window.matchMedia("(min-width: 820px)")
    const smallScreen = window.matchMedia("(max-width: 819px)")

    const previewWrapperEle = document.getElementById("preview_wrapper")
    const wrapperShapeEle = document.getElementById("wrapper_shape")
    const layOutEle = document.getElementsByClassName("layout_style")
    const SizeVerticalEle = document.getElementsByClassName("size_vertical")
    const SizeHorizontalEle = document.getElementsByClassName("size_horizontal")
    const SizeSquarelEle = document.getElementsByClassName("size_square")

    const headingTxtEle = document.getElementById('heading_text')
    const textDateEle = document.getElementById("text_date")
    const textTimeEle = document.getElementById("text_time")
    const textLocationEle = document.getElementById("text_location")
    const nsEle = document.getElementById("n_s")
    const ewEle = document.getElementById("e_w")

    const locationEle = document.getElementById('location')
    const customLocationEle = document.getElementById("custom_location")
    const datePickerEle = document.getElementById("datePicker")


    
    const starColorSelectEle = document.getElementsByClassName("star_color_select")
    const frameColorSelectEle = document.getElementsByClassName("frame_color_select")
    const frameColorEle = document.getElementsByClassName("frame_color")
    const starColorEle = document.getElementsByClassName("star_color")
    const msgFontsEle = document.getElementsByClassName("msg_fonts")
    const detailFontsEle = document.getElementsByClassName("dtls_fonts")

    const borderSelectEle = document.getElementsByClassName("borderSelect")

    const productEle = document.getElementById("wrapper_product")

    const mapEle = document.getElementById("map")



    function aspectRatioHandler(largScreen, smallScreen) {

        const classList = wrapperShapeEle.classList

        if (largScreen.matches) {

            if (classList.contains("vertical")) {
                if (previewWrapperEle.offsetWidth < previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.width = 67.1 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth * 1.3 + "px"
                }

                else if (previewWrapperEle.offsetWidth > previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.height = 67.1 + "%"
                    wrapperShapeEle.style.width = wrapperShapeEle.offsetHeight / 1.3 + "px"
                }

                else {
                    wrapperShapeEle.style.width = 75 + "%"
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
                    wrapperShapeEle.style.width = 66.9833 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth + "px"
                }

                else if (previewWrapperEle.offsetWidth > previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.height = 66.9833 + "%"
                    wrapperShapeEle.style.width = wrapperShapeEle.offsetHeight + "px"
                }

                else {
                    wrapperShapeEle.style.width = 66.9833 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth + "px"
                }

            }

        }

        else if (smallScreen.matches) {

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
            else if (classList.contains("horizontal")) {
                if (previewWrapperEle.offsetWidth < previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.width = 90 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth / 1.333 + "px"
                }

                else if (previewWrapperEle.offsetWidth > previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.height = 90 + "%"
                    wrapperShapeEle.style.width = wrapperShapeEle.offsetHeight * 1.333 + "px"
                }

                else {
                    wrapperShapeEle.style.width = 90 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth / 1.333 + "px"
                }
            }

            else if (classList.contains("square")) {

                if (previewWrapperEle.offsetWidth < previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.width = 90 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth + "px"
                }

                else if (previewWrapperEle.offsetWidth > previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.height = 90 + "%"
                    wrapperShapeEle.style.width = wrapperShapeEle.offsetHeight + "px"
                }

                else {
                    wrapperShapeEle.style.width = 90 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth + "px"
                }

            }

        }
    }

    aspectRatioHandler(largScreen, smallScreen)

    window.addEventListener('resize', function () {
        aspectRatioHandler(largScreen, smallScreen)
    }, true)

    /**STYLE */
    function PrintLayout() {
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
    PrintLayout()

    function PrintSizesVertical() {

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
    PrintSizesVertical()

    function PrintSizesHorizontal() {


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

    } PrintSizesHorizontal()

    function PrintSizesSquare() {

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
    PrintSizesSquare()
    /**STYLE END */

    /**MOMENT */

    locationEle.addEventListener('keyup', function () {
        textLocationEle.innerText = this.value
        customLocationEle.value = this.value
    })

    customLocationEle.addEventListener("keyup", function () {
        if (this.value == "") {
            textLocationEle.innerText = locationEle.value
        }
        else {
            textLocationEle.innerText = this.value
        }
    })

    $('#datePicker').datetimepicker({
        lang: 'ch',
        timepicker: false,
        format: 'd/m/Y',
    });

    $('#timePicker').datetimepicker({
        datepicker: false,
        format: 'H:i',
        step: 1
    });

    $("#datePicker").change(function () {
        var currentValue = $('#datePicker').datetimepicker('getValue');
        var options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        var formattedDate = currentValue.toLocaleDateString(undefined, options);
        textDateEle.innerText = formattedDate;
    });

    $("#timePicker").change(function () {
        var currentValue = $('#timePicker').datetimepicker('getValue');
        var options = { hour: 'numeric', minute: 'numeric', hour12: true };
        var formattedTime = currentValue.toLocaleTimeString(undefined, options);
        textTimeEle.innerText = formattedTime;
    });

    /** MOMENT END. */

    /** Design. */

    /** Star Color. */
    function starColorSelect() {
        for (let i = 0; i < starColorSelectEle.length; i++) {
            const clicked = starColorSelectEle[i]
            clicked.addEventListener('click', function() {
                for(let j = 0; j < starColorSelectEle.length; j++) {
                    starColorSelectEle[j].classList.remove('selected')
                }
                this.classList.add("selected")
            })
        }
    }
    starColorSelect()

    function starColor() {
        for(let i = 0; i < starColorEle.length; i++) {
            const clicked = starColorEle[i]
            clicked.addEventListener('click', function() {
                const computedStyle = getComputedStyle(this);
                const bgColor = computedStyle.backgroundColor;
                mapEle.style.backgroundColor = bgColor
            })
        }
    }
    starColor()
    /** Star Color End. */

    /** Frame Color. */
    function frameColorSelect() {
        for (let i = 0; i < frameColorSelectEle.length; i++) {
            const clicked = frameColorSelectEle[i]
            clicked.addEventListener('click', function() {
                for(let j = 0; j < frameColorSelectEle.length; j++) {
                    frameColorSelectEle[j].classList.remove('selected')
                }
                this.classList.add("selected")
            })
        }
    }
    frameColorSelect()

    function frameColor() {
        for (let i = 0; i < frameColorEle.length; i++) {
            const clicked = frameColorEle[i]
            clicked.addEventListener("click", function () {
                const computedStyle = getComputedStyle(this);
                const bgColor = computedStyle.backgroundColor;
                wrapperShapeEle.style.backgroundColor = bgColor
            })
        }
    }
    frameColor()
    /** Frame Color End. */

    /** Design End. */

    /** Border. */
    function borderSelect() {
        for(let i = 0; i < borderSelectEle.length; i++) {
            const clicked = borderSelectEle[i]
            clicked.addEventListener('click', function() {
                for(let j = 0; j < borderSelectEle.length; j++) {
                    borderSelectEle[j].classList.remove('selected')
                }
                this.classList.add("selected")
                const getAttribute = this.getAttribute("data-border")
                productEle.style.border = getAttribute
            })
        }
    }
    borderSelect()
    /** Border End. */


    /** Message Fonts. */
    function messageFonts() {
        for(let i = 0; i < msgFontsEle.length; i++) {
            const clicked = msgFontsEle[i]
            clicked.addEventListener('click', function() {
                for(let j = 0; j < msgFontsEle.length; j++) {
                    msgFontsEle[j].classList.remove('selected')
                }
                this.classList.add("selected")

                const computedStyle = getComputedStyle(this);
                const fontFamilyValue = computedStyle.getPropertyValue('--font-style');
                headingTxtEle.style.fontFamily = fontFamilyValue
            })
        }
    }
    messageFonts()
    /** Message Fonts End. */

    /** Details Fonts. */
    function detailsFonts() {
        for(let i = 0; i < detailFontsEle.length; i++) {
            const clicked = detailFontsEle[i]
            clicked.addEventListener('click', function() {
                for(let j = 0; j < detailFontsEle.length; j++) {
                    detailFontsEle[j].classList.remove('selected')
                }
                this.classList.add("selected")
            })
        }
    }
    detailsFonts()
    /** Details Fonts End. */

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

