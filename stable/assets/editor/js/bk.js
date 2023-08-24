document.getElementById("location").change = () => {
    config.lines.graticule.show = !config.lines.graticule.show
    updateConfigAndRedraw();
};

const apiKey = "AIzaSyCOLf24aCsK0BZTv4xOeQwSruCFiOQGqsk"


document.addEventListener("DOMContentLoaded", function () {
    const bodyEle = document.getElementsByTagName('body')[0]
    const mainContentEle = document.getElementById("main-content")
    const fixedNavBarEle = document.getElementById("fixed_nav_bar")
    const sidebarEle = document.getElementById("left-sidebar")
    const previewWrapperEle = document.getElementById("preview_wrapper")
    const wrapperShapeEle = document.getElementById("wrapper_shape")
    const layOutEle = document.getElementsByClassName("layout_style")

    const productTypeEle = document.getElementById("product_type")
    const mapEle = document.getElementById("map")

    const largScreen = window.matchMedia("(min-width: 820px)")
    const smallScreen = window.matchMedia("(max-width: 819px)")

    const liEle = document.getElementsByClassName('nav-item')


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

            else if(classList.contains("square")) {

                if (previewWrapperEle.offsetWidth < previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.width = 66.9833 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth + "px"
                }

                else if (previewWrapperEle.offsetWidth > previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.height = 66.9833 + "%"
                    wrapperShapeEle.style.width = wrapperShapeEle.offsetHeight  + "px"
                }

                else {
                    wrapperShapeEle.style.width = 66.9833 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth + "px"
                }

            }

        }

        else if (smallScreen.matches) {


            for (let i = 0; i < liEle.length; i++) {
                const clicked = liEle[i];
                if (i !== liEle.length - 1) {
                    clicked.addEventListener('click', addOffcanvasActiveClass);
                }
            }

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
            else if (classList.contains("horizontal")){
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

            else if(classList.contains("square")) {

                if (previewWrapperEle.offsetWidth < previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.width = 90 + "%"
                    wrapperShapeEle.style.height = wrapperShapeEle.offsetWidth + "px"
                }

                else if (previewWrapperEle.offsetWidth > previewWrapperEle.offsetHeight) {
                    wrapperShapeEle.style.height = 90 + "%"
                    wrapperShapeEle.style.width = wrapperShapeEle.offsetHeight  + "px"
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

})

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

function toggleFunction(x) {
    x.classList.toggle("rotate")
}

function redirectToPrintSize(target) {
    $('.print_size_content .tab-pane').removeClass('active')
    $(target).addClass('active')
}

function redirectTo(target) {
    $('.detail_tab_content .tab-pane').removeClass('active')
    $(target).addClass('active')
}

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