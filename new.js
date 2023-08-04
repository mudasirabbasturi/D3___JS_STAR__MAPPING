// Function Js

/* Global Variable */

var wrapperShapeEle = document.getElementById("wrapper_shape")

function functionPrintStyle() {

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

function functionPrintLayout() {

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

function PrintSizesClassic() {

    const printSizeSelectEle = document.getElementsByClassName("print_size_classic")

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

function PrintSizesPoet() {

    const printSizeSelectEle = document.getElementsByClassName("print_size_poet")

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

function PrintSizesAstronomer() {

    const printSizeSelectEle = document.getElementsByClassName("print_size_astronomer")

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

function PrintSizesAquarelles() {

    const printSizeSelectEle = document.getElementsByClassName("print_size_aquarelles")

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

function PrintSizesRomantic() {

    const printSizeSelectEle = document.getElementsByClassName("print_size_romantic")

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

function PrintSizesModern() {

    const printSizeSelectEle = document.getElementsByClassName("print_size_modern")

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

function PrintSizesPhotographer() {

    const printSizeSelectEle = document.getElementsByClassName("print_size_photographer")

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

function PrintSizesExplorer() {

    const printSizeSelectEle = document.getElementsByClassName("print_size_explorer")

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

function redirectToPrintSize(target) {
    $('.print_style_tab_content .tab-pane').removeClass('active');
    $(target).addClass('active');
}

functionPrintStyle()
functionPrintLayout()
PrintSizesClassic()
PrintSizesPoet()
PrintSizesAstronomer()
PrintSizesAquarelles()
PrintSizesRomantic()
PrintSizesModern()
PrintSizesPhotographer()
PrintSizesExplorer()