document.addEventListener("DOMContentLoaded", function () {
    const bodyEle = document.getElementsByTagName('body')[0]
    const mainContentEle = document.getElementById("main-content")
    const fixedNavBarEle = document.getElementById("fixed_nav_bar")
    const sidebarEle = document.getElementById("left-sidebar")
    const layOutEle = document.getElementsByClassName("layout_style")

    const productTypeEle = document.getElementById("product_type")
    const mapEle = document.getElementById("map")

    const largScreen = window.matchMedia("(min-width: 820px)")
    const smallScreen = window.matchMedia("(max-width: 819px)")

    const liEle = document.getElementsByClassName('nav-item')
})