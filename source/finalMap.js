let mapSpec = {
    $schema: "https://vega.github.io/schema/vega/v5.json",
    description: "A map showing largest exports in the United States",
    width: 960,
    height: 500,
    autosize: "none",
    data:[
        {
            name: "exports",
            url: "https://raw.githubusercontent.com/niklauswetter/CSC444_Assignment12/main/source/stateresources.csv",
            format: {type: "csv"}
        },
        {
            name: "states",
            url: "https://raw.githubusercontent.com/vega/vega/main/docs/data/us-10m.json",
            format: {"type": "topojson", "feature": "states"},
            transform: [
                {
                    type: "lookup",
                    from: "exports",
                    key: "id",
                    fields: ["id"],
                    values: ["resource"]
                },
                {
                    type: "lookup",
                    from: "exports",
                    key: "id",
                    fields: ["id"],
                    values: ["state"]
                }
            ]
        }
    ],
    scales: [
        {
            name: "fillScale",
            type: "ordinal",
            domain: {data: "exports", field: "resource"},
            range: {scheme: "category20"}
        }
    ],
    projections: [
        {
            name: "projection",
            type: "albersUSA"
        }
    ],
    marks: [
        {
            type: "shape",
            from: {data: "states"},
            encode: {
                enter: {
                    //Tooltip shows which state you are mousing over
                    //Also displays the largest export
                    //Both fields are labeled
                    tooltip: {signal: "{'State': datum.state," +
                            "'Largest Export:': datum.resource}"}
                },
                update: {
                    fill: {field: "resource", scale: "fillScale"}
                }
            },
            transform: [
                {
                    type: "geoshape",
                    projection: "projection"
                }
            ]
        }
    ],
    legends: [
        {
            fill: "fillScale",
            orient: "right-bottom"
        }
    ]
};

let mapRuntime = vega.parse(mapSpec);

let mapView = new vega.View(mapRuntime).logLevel(vega.Error).renderer("svg").initialize("#mapView").hover();

mapView.run();

console.log("Vega datasets:", mapView._runtime.data, "\nVega signals:", mapView._signals);