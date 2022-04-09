import functionPlot from 'function-plot'

function mxShapeFunctionPlot(bounds, fill, stroke, strokewidth) {
  mxShape.call(this);
  this.bounds = bounds;
  this.fill = fill;
  this.stroke = stroke;
  this.strokewidth = (strokewidth != null) ? strokewidth : 1;
  this.shadow = false;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeFunctionPlot, mxImageShape);

mxShapeFunctionPlot.prototype.cst = {
  SHAPE_FUNCTION_PLOT: 'mxgraph.function_plot.abstract.function_plot'
};

mxShapeFunctionPlot.prototype.customProperties = [
];


/**
* Function: paintVertexShape
* Untitled Diagram.drawio
* Paints the vertex shape.
*/
mxShapeFunctionPlot.prototype.paintVertexShape = function (c, x, y, w, h) {
  try {
    var container = document.querySelector("#cfuncionplot")
    if (!container) {
      container = document.createElement("div");
      container.setAttribute("id", "cfuncionplot");
      document.body.appendChild(container);
    }
    // create element
    var element = document.createElement("svg");
    element.setAttribute("style", "display:none;");
    element.setAttribute("id", "funcionplot");
    container.appendChild(element);
    var graphData;
    eval(`graphData = ((${this.state.cell.value}));`);
    graphData.target = "#funcionplot";
    graphData.width = w;
    graphData.height = h;
    functionPlot(graphData);
    // get raw svg content
    this.content = element.innerHTML;
    // delete element
    container.removeChild(element);
  } catch (err) {
    this.content = err.message;
    var container = document.querySelector("#cfuncionplot")
    var element = document.querySelector("#funcionplot")
    container.removeChild(element);
  }
  this.preserveImageAspect = false;
  c.text(x + w / 2, y + h / 2, 0, 0, this.content, mxConstants.ALIGN_MIDDLE, mxConstants.ALIGN_MIDDLE, false, 'html', 0, 0, 0);
  this.state.cell.valueChanged = (value) => {
    var lastValue = mxCell.prototype.valueChanged.call(this.state.cell, value);
    this.redraw();
    return lastValue;
  }
}

mxCellRenderer.registerShape(mxShapeFunctionPlot.prototype.cst.SHAPE_FUNCTION_PLOT, mxShapeFunctionPlot);

mxShapeFunctionPlot.prototype.getConstraints = function (style, w, h) {
  var constr = [];
  return constr;
}


// export ui for debugging
Draw.loadPlugin(function (ui) { window.ui = ui; });

Sidebar.prototype.addFunctionPlotPalette = function () {
  var style = 'shadow=0;dashed=0;align=left;strokeWidth=1;shape=mxgraph.function_plot.abstract.function_plot;labelBackgroundColor=#ffffff;noLabel=1;';
  var example = `{
    yAxis: { domain: [-4, 4] },
    xAxis: { domain: [-8, 8] },
    data: [
      { fn: 'sin(x)' },
      { fn: 'cos(x)' },
      { fn: 'x', closed: true },
    ],
  }`;
  var butterfly = `{
    yAxis: { domain: [-4.428571429, 4.428571429] },
    xAxis: { domain: [-7, 7] },
    data: [{
      x: 'sin(t) * (exp(cos(t)) - 2 cos(4t) - sin(t/12)^5)',
      y: 'cos(t) * (exp(cos(t)) - 2 cos(4t) - sin(t/12)^5)',
      range: [-10 * Math.PI, 10 * Math.PI],
      fnType: 'parametric',
      graphType: 'polyline',
    }],
  }`;
  this.addPaletteFunctions('function_plot', 'Function Plot', true, [
    this.createVertexTemplateEntry(style, 800, 400, example, 'Example', null, null, this.getTagsForStencil('mxgraph.function_plot.abstract', 'function_plot', 'example ').join(' ')),
    this.createVertexTemplateEntry(style, 700, 440, butterfly, 'Butterfly', null, null, this.getTagsForStencil('mxgraph.function_plot.abstract', 'function_plot', 'butterfly ').join(' ')),
  ]);
}

Draw.loadPlugin(function (ui) {
  // Adds custom sidebar entry
  ui.sidebar.addFunctionPlotPalette();
});