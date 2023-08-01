var wrapPrewEle = document.getElementById('preview_wrapper')
var wrapShapeEle = document.getElementById('wrapper_shape')
var layoutStyleEle = document.getElementsByClassName('layout_style')
var classNamesArray = wrapShapeEle.className.split(' ');


//function ResizeEvent() {

    // if (classNamesArray.includes('vertical')) {
    //     if (wrapPrewEle.offsetWidth > wrapPrewEle.offsetHeight) {
    //         wrapShapeEle.style.height = 84.0132 + "%"
    //         wrapShapeEle.style.width = wrapShapeEle.offsetHeight / 1.237 + "px"
    //     }
    //     else if (wrapPrewEle.offsetHeight > wrapPrewEle.offsetWidth) {
    //         wrapShapeEle.style.width = 67.933 + "%"
    //         wrapShapeEle.style.height = wrapShapeEle.offsetWidth * 1.237 + "px"
    //     }
    //     else {
    //         wrapShapeEle.style.width = 67.933 + "%"
    //         wrapShapeEle.style.height = 84.0132 + "%"
    //     }

    // }

    // if (classNamesArray.includes('horizontal')) {
    //     if (wrapPrewEle.offsetWidth > wrapPrewEle.offsetHeight) {
    //         wrapShapeEle.style.height = 57.001 + "%"
    //         wrapShapeEle.style.width = wrapShapeEle.offsetHeight * 1.438 + "px";
    //     }
    //     else if (wrapPrewEle.offsetHeight > wrapPrewEle.offsetWidth) {
    //         wrapShapeEle.style.width = 81.948 + "%"
    //         wrapShapeEle.style.height = wrapShapeEle.offsetWidth / 1.438 + "px"
    //     }
    //     else {
    //         wrapShapeEle.style.width = 81.948 + "%"
    //         wrapShapeEle.style.height = 57.001 + "%"
    //     }
    // }

    // if (classNamesArray.includes('square')) {

    //     if (wrapPrewEle.offsetWidth > wrapPrewEle.offsetHeight) {
    //         wrapShapeEle.style.height = 67.221 + "%"
    //         wrapShapeEle.style.width = wrapShapeEle.offsetHeight + "px"
    //     }
    //     else if (wrapPrewEle.offsetHeight > wrapPrewEle.offsetWidth) {
    //         wrapShapeEle.style.width = 67.221 + "%"
    //         wrapShapeEle.style.height = wrapShapeEle.offsetWidth + "px"
    //     }
    //     else {
    //         wrapShapeEle.style.width = 67.221 + "%"
    //         wrapShapeEle.style.height = 67.221 + "%"
    //     }
    // }
//}

// function LoadEvent() {
//     if (classNamesArray.includes('vertical')) {

//         if (wrapPrewEle.offsetWidth > wrapPrewEle.offsetHeight) {
//             wrapShapeEle.style.height = 84.0132 + "%"
//             wrapShapeEle.style.width = wrapShapeEle.offsetHeight / 1.237 + "px"
//         }
//         else if (wrapPrewEle.offsetHeight > wrapPrewEle.offsetWidth) {
//             wrapShapeEle.style.width = 67.933 + "%"
//             wrapShapeEle.style.height = wrapShapeEle.offsetWidth * 1.237 + "px"
//         }
//         else {
//             wrapShapeEle.style.width = 67.933 + "%"
//             wrapShapeEle.style.height = 84.0132 + "%"
//         }
//     }

//     if (classNamesArray.includes('horizontal')) {
//         if (wrapPrewEle.offsetWidth > wrapPrewEle.offsetHeight) {
//             wrapShapeEle.style.height = 57.001 + "%"
//             wrapShapeEle.style.width = wrapShapeEle.offsetHeight * 1.438 + "px";
//         }
//         else if (wrapPrewEle.offsetHeight > wrapPrewEle.offsetWidth) {
//             wrapShapeEle.style.width = 81.948 + "%"
//             wrapShapeEle.style.height = wrapShapeEle.offsetWidth / 1.438 + "px"
//         }
//         else {
//             wrapShapeEle.style.width = 81.948 + "%"
//             wrapShapeEle.style.height = 57.001 + "%"
//         }
//     }

//     if (classNamesArray.includes('square')) {
//         if (wrapPrewEle.offsetWidth > wrapPrewEle.offsetHeight) {
//             wrapShapeEle.style.height = 67.221 + "%"
//             wrapShapeEle.style.width = wrapShapeEle.offsetHeight + "px"
//         }
//         else if (wrapPrewEle.offsetHeight > wrapPrewEle.offsetWidth) {
//             wrapShapeEle.style.width = 67.221 + "%"
//             wrapShapeEle.style.height = wrapShapeEle.offsetWidth + "px"
//         }
//         else {
//             wrapShapeEle.style.width = 67.221 + "%"
//             wrapShapeEle.style.height = 67.221 + "%"
//         }

//     }

// }


// function ClickEvent() {
//     const classNamesArray = wrapShapeEle.className.split(' ');
//     const imageSelectOptions = document.querySelectorAll(".type_radio_layout");
//     imageSelectOptions.forEach(option => {
//         option.addEventListener("click", function () {
//             imageSelectOptions.forEach(opt => opt.classList.remove("selected"));
//             this.classList.add("selected");
//             var newClassName = this.classList[2];
//             wrapShapeEle.className = `wrapper_shape ${newClassName}`;
//             ResizeEvent(classNamesArray);
//         });
//     });
// }

window.addEventListener("resize", ResizeEvent);
//window.addEventListener("load", LoadEvent);

// for(i=0; i< layoutStyleEle.length; i++) {
//     const clicked = layoutStyleEle[i]
//     clicked.addEventListener("click", function() {
//         const newClass = this.classList[2]
//         wrapShapeEle.className = `wrapper_shape ${newClass}`
//         const classNamesArray = wrapShapeEle.className.split(' ')
//         ResizeEvent(classNamesArray)
//     });
// }


function redirectTo(target) {
    $('.new_tab_content .tab-pane').removeClass('active');
    $(target).addClass('active');
}

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
