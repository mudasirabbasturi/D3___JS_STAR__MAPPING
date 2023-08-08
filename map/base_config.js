var baseConfig = {
    width: 0,
    projection: "airy",
    orientationfixed: true,
    geopos: null,
    zoomlevel: null,
    zoomextend: 1,
    interactive: false,
    advanced: true,
    daterange: [],
    controls: true,
    lang: "",
    culture: "",
    container: "map",
    datapath: "https://ofrohn.github.io/data/",

    stars: {
        show: true,
        limit: 6,
        colors: true,
        style: { fill: "#ffffff", opacity: 1 },
        designation: true,
        designationType: "desig",
        designationStyle: {
            fill: "#ddddbb",
            font: "11px 'Palatino Linotype', Georgia, Times, 'Times Roman', serif",
            align: "left",
            baseline: "top"
        },
        designationLimit: 2.5,
        propername: false,
        propernameType: "name",
        propernameStyle: {
            fill: "#ddddbb",
            font: "13px 'Palatino Linotype', Georgia, Times, 'Times Roman', serif",
            align: "right",
            baseline: "bottom"
        },
        propernameLimit: 1.5,
        size: 7,
        exponent: -0.28,
        data: "stars.6.json"
    },

    dsos: {
        show: true,
        limit: 6,
        colors: true,
        style: { fill: "#cccccc", stroke: "#cccccc", width: 2, opacity: 1 },
        names: true,
        namesType: "name",
        nameStyle: {
            fill: "#cccccc",
            font: "11px Helvetica, Arial, serif",
            align: "left",
            baseline: "top"
        },
        nameLimit: 6,
        size: null,
        exponent: 1.4,
        data: "dsos.bright.json",
        symbols: {
            gg: { shape: "circle", fill: "#ff0000" }, // Galaxy cluster
            g: { shape: "ellipse", fill: "#ff0000" }, // Generic galaxy
            s: { shape: "ellipse", fill: "#ff0000" }, // Spiral galaxy
            s0: { shape: "ellipse", fill: "#ff0000" }, // Lenticular galaxy
            sd: { shape: "ellipse", fill: "#ff0000" }, // Dwarf galaxy
            e: { shape: "ellipse", fill: "#ff0000" }, // Elliptical galaxy
            i: { shape: "ellipse", fill: "#ff0000" }, // Irregular galaxy
            oc: { shape: "circle", fill: "#ffcc00", stroke: "#ffcc00", width: 1.5 }, // Open cluster
            gc: { shape: "circle", fill: "#ff9900" }, // Globular cluster
            en: { shape: "square", fill: "#ff00cc" }, // Emission nebula
            bn: { shape: "square", fill: "#ff00cc", stroke: "#ff00cc", width: 2 }, // Generic bright nebula
            sfr: { shape: "square", fill: "#cc00ff", stroke: "#cc00ff", width: 2 }, // Star forming region
            rn: { shape: "square", fill: "#00ooff" }, // Reflection nebula
            pn: { shape: "diamond", fill: "#00cccc" }, // Planetary nebula
            snr: { shape: "diamond", fill: "#ff00cc" }, // Supernova remnant
            dn: { shape: "square", fill: "#999999", stroke: "#999999", width: 2 }, // Dark nebula grey
            pos: { shape: "marker", fill: "#cccccc", stroke: "#cccccc", width: 1.5 } // Generic marker
        }
    },
    planets: {
        show: false,
        which: [
            "sol",
            "mer",
            "ven",
            "ter",
            "lun",
            "mar",
            "jup",
            "sat",
            "ura",
            "nep"
        ],
        symbols: {
            sol: { symbol: "\u2609", letter: "Su", fill: "#ffff00", size: "" },
            mer: { symbol: "\u263f", letter: "Me", fill: "#cccccc" },
            ven: { symbol: "\u2640", letter: "V", fill: "#eeeecc" },
            ter: { symbol: "\u2295", letter: "T", fill: "#00ccff" },
            lun: { symbol: "\u25cf", letter: "L", fill: "#ffffff", size: "" },
            mar: { symbol: "\u2642", letter: "Ma", fill: "#ff6600" },
            cer: { symbol: "\u26b3", letter: "C", fill: "#cccccc" },
            ves: { symbol: "\u26b6", letter: "Ma", fill: "#cccccc" },
            jup: { symbol: "\u2643", letter: "J", fill: "#ffaa33" },
            sat: { symbol: "\u2644", letter: "Sa", fill: "#ffdd66" },
            ura: { symbol: "\u2645", letter: "U", fill: "#66ccff" },
            nep: { symbol: "\u2646", letter: "N", fill: "#6666ff" },
            plu: { symbol: "\u2647", letter: "P", fill: "#aaaaaa" },
            eri: { symbol: "\u26aa", letter: "E", fill: "#eeeeee" }
        },
        symbolStyle: {
            fill: "#00ccff",
            font: "bold 17px 'Lucida Sans Unicode', Consolas, sans-serif",
            align: "center",
            baseline: "middle"
        },
        symbolType: "symbol",
        names: false,
        nameStyle: {
            fill: "#00ccff",
            font: "14px 'Lucida Sans Unicode', Consolas, sans-serif",
            align: "right",
            baseline: "top"
        },
        namesType: "desig"
    },
    constellations: {
        names: true,
        namesType: "iau",
        nameStyle: {
            fill: "#cccc99",
            align: "center",
            baseline: "middle",
            font: [
                "14px Helvetica, Arial, sans-serif",
                "12px Helvetica, Arial, sans-serif",
                "11px Helvetica, Arial, sans-serif"
            ]
        },
        lines: true,
        lineStyle: { stroke: "#cccccc", width: 1, opacity: 0.6 },
        bounds: false,
        boundStyle: { stroke: "#cccc00", width: 0.5, opacity: 0.8, dash: [2, 4] }
    },
    mw: {
        show: true,
        style: { fill: "#ffffff", opacity: 0.15 }
    },
    lines: {
        graticule: {
            show: true,
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
        equatorial: { show: true, stroke: "#aaaaaa", width: 1.3, opacity: 0.7 },
        ecliptic: { show: true, stroke: "#66cc66", width: 1.3, opacity: 0.7 },
        galactic: { show: false, stroke: "#cc6666", width: 1.3, opacity: 0.7 },
        supergalactic: { show: false, stroke: "#cc66cc", width: 1.3, opacity: 0.7 }
    },
    background: {
        fill: "#000000",
        opacity: 1,
        stroke: "#000000",
        width: 1.5
    },
    horizon: {
        show: false,
        stroke: "#cccccc",
        width: 1.0,
        fill: "#000000",
        opacity: 0.5
    },
    daylight: {
        show: false
    }
}