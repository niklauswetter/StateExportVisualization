// create spec
var spec = {
    $schema: "https://vega.github.io/schema/vega/v5.json",
    description: "A map depicting U.S. states.",
    width: 960,
    height: 500,
    autosize: "none",

    data: [
        {
            name: "states",
            url: "https://raw.githubusercontent.com/vega/vega/main/docs/data/us-10m.json",
            format: {"type": "topojson", "feature": "states"}
        }
    ],
    projections: [
        {
            name: "projection",
            type: "albersUsa"
        }
    ],
    marks: [
        {
            type: "shape",
            from: { data: "states"},
            encode: {
                update: { fill: { value: "#aaa"} },
                hover: { tooltip: { signal: "datum.id"}}
            },
            transform: [
                {
                    type: "geoshape",
                    projection: "projection" }
            ]
        }
    ]
};

// create runtime
var runtime = vega.parse(spec);

// create view
var view = new vega.View(runtime)
    .logLevel(vega.Error)
    .renderer("svg")
    .initialize("#view")
    .hover();

// run it
view.run();