let barSpec = {
    $schema: "https://vega.github.io/schema/vega/v5.json",
    description: "A bar graph showing for how many US states a given category is their greatest export.",
    width: 900,
    height: 650,
    autosize: "none",
    padding: 200,
    signals: [
        {
            name: "tooltip",
            value: {},
            on: [
                {events: "rect:mouseover", update: "datum"},
                {events: "rect:mouseover", update: "{}"}
            ]
        }
    ],
    data: [
        {
            name: "exports",
            url: "https://raw.githubusercontent.com/niklauswetter/CSC444_Assignment12/main/source/stateresources.csv",
            format: {type: "csv"},
            transform: [
                {
                    type: "aggregate",
                    groupby: ["resource"]
                },
                {
                    type: "collect",
                    sort: {field: ["count"], order: ["descending"]}
                }
            ]
        }
    ],
    scales: [
        {
            name: "xScale",
            type: "linear",
            domain: {data: "exports", field: "count"},
            range: "width"
        },
        {
            name: "yScale",
            type: "band",
            domain: {data: "exports", field: "resource"},
            range: "height"
        }
    ],
    axes: [
        {
            scale: "xScale",
            orient: "bottom",
            title: "Count"
        },
        {
            scale: "yScale",
            orient: "left",
            title: "Resource"
        }
    ],
    marks: [
        {
            type: "rect",
            from: {data: "exports"},
            encode: {
                enter: {
                    x: {scale: "xScale", field: "count", offset: 1},
                    x2: {value: 0, offset: 1},
                    y: {scale: "yScale", field: "resource", offset: 5},
                    height: {value: 50},
                    fill: {value: "lightBlue"}
                }
            }
        }
        //Removed text because this plot should be as minimal as possible
        //Axis is quite small as well so this is reasonable
    ]
};

let barRuntime = vega.parse(barSpec);

let barView = new vega.View(barRuntime).logLevel(vega.Error).renderer("svg").initialize("#barView").hover();

barView.run();

console.log("Vega datasets:", barView._runtime.data, "\nVega signals:", barView._signals);