document.getElementById("location").change = () => {
    config.lines.graticule.show = !config.lines.graticule.show
    updateConfigAndRedraw();
};

const apiKey = "AIzaSyCOLf24aCsK0BZTv4xOeQwSruCFiOQGqsk"