// Function Js

function toggleFunction(x) {
    x.classList.toggle("rotate")
}

/* Global Variable */

var wrapperShapeEle = document.getElementById("wrapper_shape")

function PrintStyle() {

    const printStyEle = document.getElementsByClassName("type_style")
    const prdtTypEle = document.getElementById("product_type")

    for(let i = 0; i < printStyEle.length; i++) {

        const clicked = printStyEle[i]

        clicked.addEventListener('click', function() {

            for (let j = 0; j < printStyEle.length; j++) {

                printStyEle[j].classList.remove("selected")
                prdtTypEle.classList.remove(printStyEle[j].getAttribute("data-type"))

            }

            this.classList.add("selected")
            const getAttribute = this.getAttribute("data-type")
            prdtTypEle.classList.add(getAttribute)

        })

    }
} 

function PrintLayout() {

    const wrapperShapeEle = document.getElementById("wrapper_shape")
    const shapeImageEle = document.getElementById("shape_image")
    const layOutEle = document.getElementsByClassName("layout_style")
    const arrayClass = ['vertical','horizontal','square']

    for(let i = 0; i < layOutEle.length; i++) {

        const clicked = layOutEle[i]

        clicked.addEventListener('click', function() {

            for(let j = 0; j < arrayClass.length; j++) {

                layOutEle[j].classList.remove("selected")
                wrapperShapeEle.classList.remove(layOutEle[j].getAttribute("data-type"))

            }

            this.classList.add("selected")
            const getAttribute = this.getAttribute("data-type")
            wrapperShapeEle.classList.add(getAttribute)
            shapeImageEle.src = `assets/images/layout/${getAttribute}.png`

        })

    }

}

function PrintSizesVertical() {

    const printSizeSelectEle = document.getElementsByClassName("print_size_vertical")

    for(let i = 0; i < printSizeSelectEle.length; i++) {

        const clicked = printSizeSelectEle[i]

        clicked.addEventListener('click', function() {

            for(let j = 0; j < printSizeSelectEle.length; j++) {

                printSizeSelectEle[j].classList.remove("selected")
            }

            const getAttribute = this.getAttribute("data-size")
            const getValue = parseFloat(getAttribute)

            this.classList.add("selected")
            //wrapperShapeEle.style.transform = `scale(${getValue})`
            wrapperShapeEle.style.transform = "scale(" + getValue + ")"

        })

    }

}

function PrintSizesHorizontal() {

    const printSizeSelectEle = document.getElementsByClassName("print_size_horizontal")

    for(let i = 0; i < printSizeSelectEle.length; i++) {

        const clicked = printSizeSelectEle[i]

        clicked.addEventListener('click', function() {

            for(let j = 0; j < printSizeSelectEle.length; j++) {
                printSizeSelectEle[j].classList.remove("selected")
            }

            const getAttribute = this.getAttribute("data-size")
            const getValue = parseFloat(getAttribute)

            this.classList.add("selected")
            wrapperShapeEle.style.transform = "scale(" + getValue + ")"

        })

    }

}

function PrintSizesSquare() {

    const printSizeSelectEle = document.getElementsByClassName("print_size_square")

    for(let i = 0; i < printSizeSelectEle.length; i++) {

        const clicked = printSizeSelectEle[i]

        clicked.addEventListener('click', function() {

            for(let j = 0; j < printSizeSelectEle.length; j++) {
                printSizeSelectEle[j].classList.remove("selected")
            }

            const getAttribute = this.getAttribute("data-size")
            const getValue = parseFloat(getAttribute)

            this.classList.add("selected")
            wrapperShapeEle.style.transform = "scale(" + getValue + ")"

        })

    }

}

function StarMapElement() {
    const mapEle = document.getElementsByClassName("map_element")
    for(let i = 0; i < mapEle.length; i++) {
        const clicked = mapEle[i]
        clicked.addEventListener('click', function() {
            if(this.className.includes("selected")) {
                this.classList.remove('selected')
            }
            else {
                this.classList.add("selected")
            }
        })
    }
}

function StarMapColor() {
    const mapColorEle = document.getElementsByClassName("map_color")
    for(let i = 0; i < mapColorEle.length; i++) {
        const clicked = mapColorEle[i]
        clicked.addEventListener('click', function(){
            for(let j = 0; j < mapColorEle.length; j++) {
                mapColorEle[j].classList.remove('selected')
            }
            this.classList.add("selected")
        })
    }
}

function StarMapBgColor() {
    const mapBgColorEle = document.getElementsByClassName("map_bg_color")
    for(let i = 0; i < mapBgColorEle.length; i++) {
        const clicked = mapBgColorEle[i]
        clicked.addEventListener('click', function(){
            for(let j = 0; j < mapBgColorEle.length; j++) {
                mapBgColorEle[j].classList.remove('selected')
            }
            this.classList.add("selected")
        })
    }
}

function StarMapBorder() {
    const mapBorderEle = document.getElementsByClassName("map_border")
    for(let i = 0; i < mapBorderEle.length; i++) {
        const clicked = mapBorderEle[i]
        clicked.addEventListener('click', function(){
            for(let j = 0; j < mapBorderEle.length; j++) {
                mapBorderEle[j].classList.remove('selected')
            }
            this.classList.add("selected")
        })
    }
}

function StarMapMessageFonts() {
    const mapMsgFontsEle = document.getElementsByClassName("map_message_fonts")
    for(let i = 0; i < mapMsgFontsEle.length; i++) {
        const clicked = mapMsgFontsEle[i]
        clicked.addEventListener('click', function(){
            for(let j = 0; j < mapMsgFontsEle.length; j++) {
                mapMsgFontsEle[j].classList.remove('selected')
            }
            this.classList.add("selected")
        })
    }
}

function StarMapDetailsFonts() {
    const mapFontDetailEle = document.getElementsByClassName("font_details")
    for(let i = 0; i < mapFontDetailEle.length; i++) {
        const clicked = mapFontDetailEle[i]
        clicked.addEventListener('click', function(){
            for(let j = 0; j < mapFontDetailEle.length; j++) {
                mapFontDetailEle[j].classList.remove('selected')
            }
            this.classList.add("selected")
        })
    }
}

function ProductFinish() {
    const productFinishEle = document.getElementsByClassName("product_finish")
    for(let i = 0; i < productFinishEle.length; i++) {
        const clicked = productFinishEle[i]
        clicked.addEventListener('click', function(){
            for(let j = 0; j < productFinishEle.length; j++) {
                productFinishEle[j].classList.remove('selected')
            }
            this.classList.add("selected")
        })
    }
}

function ProductFrame() {
    const productFrameEle = document.getElementsByClassName("product_frame")
    for(let i = 0; i < productFrameEle.length; i++) {
        const clicked = productFrameEle[i]
        clicked.addEventListener('click', function(){
            for(let j = 0; j < productFrameEle.length; j++) {
                productFrameEle[j].classList.remove('selected')
            }
            this.classList.add("selected")
        })
    }
}



function redirectToPrintSize(target) {
    $('.print_style_tab_content .tab-pane').removeClass('active');
   var ok =  $(target).addClass('active');
    console.log(ok)
}

function redirectTo(target) {
    $('.detail_tab_content .tab-pane').removeClass('active');
   var ok =  $(target).addClass('active');
    console.log(ok)
}


PrintStyle()
PrintLayout()
PrintSizesVertical()
PrintSizesHorizontal()
PrintSizesSquare()
StarMapElement()
StarMapColor()
StarMapBgColor()
StarMapBorder()
StarMapMessageFonts()
StarMapDetailsFonts()
ProductFinish()
ProductFrame()

$('#datetimepicker1').datetimepicker({
    datepicker: false,
    format: 'H:i',
    step: 1
});

$('#datetimepicker2').datetimepicker({
    lang: 'ch',
    timepicker: false,
    format: 'd/m/Y',
});

$(document).ready(function () {
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
});

$(document).ready(function () {
    // Function to get the next tab
    function getNextTab() {
        let activeTab = $("#myTab").find(".nav-link.active");
        let nextLi = activeTab.parent().next();
        if (nextLi.length > 0) {
            return nextLi.find(".nav-link");
        }
        return null;
    }

    // Function to update the "Next" button text
    function updateNextButtonText() {
        let nextTab = getNextTab();
        if (nextTab) {
            $("#next").text("Next");
        } else {
            $("#next").text("Final Preview");
        }
    }

    // Click event for the "Next" button
    $("#next").click(function () {
        let nextTab = getNextTab();
        if (nextTab) {
            nextTab.tab("show");
            updateNextButtonText();
        } else {
            $("#exampleModalCenter").modal("show");
        }
    });

    $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
        $(e.target).addClass("active");
        let prevTab = getNextTab();
        if (prevTab) {
            prevTab.removeClass("active");
        }
        updateNextButtonText();
    });
    updateNextButtonText();
});




// function initialize() {
//     var input = document.getElementById('location');
//     var autocomplete = new google.maps.places.Autocomplete(
//             /** @type {HTMLInputElement} */(input),
//             {
//                 types: ['(cities)'],
//             });

//     google.maps.event.addListener(autocomplete, 'place_changed', function() {
//         var place = autocomplete.getPlace();
//         if (!place.geometry) {
//             return;
//         }
//         //document.getElementById('fLat').value = place.geometry.location.lat();
//         //document.getElementById('fLong').value = place.geometry.location.lng();

//         var address = '';
//         if (place.address_components)
//         {
//             address = [
//                 (place.address_components[0] && place.address_components[0].short_name || ''),
//                 (place.address_components[1] && place.address_components[1].short_name || ''),
//                 (place.address_components[2] && place.address_components[2].short_name || '')
//             ].join(' ');
//         }
//         LoadEventCategory();
//         LoadYelpData();
//     });
// }

// google.maps.event.addDomListener(window, 'load', initialize);