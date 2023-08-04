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
functionPrintStyle()

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
functionPrintLayout()

