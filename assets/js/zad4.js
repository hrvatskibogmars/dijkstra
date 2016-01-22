
var width = 1355,
    height = 520;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(70)
    .size([width, height]);

var svg = d3.select("#graph").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.tsv("/data/city.tsv", function(error, data) {

  var nodes = [], nodesByName = {}, links = [];
  function addNodeByName(fullname) {
    var name = fullname.split(',')[0];
    if (!nodesByName[name]) {
      var node = {"name":name, "links":[]}
      nodesByName[name] = node;
      nodes.push(node);
      return node;
    }
    else
      return nodesByName[name];
  }

  data.forEach(function(d) {
    for (k in d) {
      if (d.hasOwnProperty(k) && k != "Gradovi" && d[k] < 1110) {
        links.push({"source": addNodeByName(d["Gradovi"]), "target": addNodeByName(k), "value": parseInt(d[k])})
      }
    }
  });
  force
      .nodes(nodes)
      .links(links)
      .start();

  var link = svg.selectAll(".link")
      .data(links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", 1);

  var node = svg.selectAll(".node")
      .data(nodes)
      .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", "grey")
      .call(force.drag);


  link.each(function(d) {
      d.source.links.push(d);
      d.selection = d3.select(this);
  });

  node.each(function(d) {
      d.selection = d3.select(this);
  });


  node.append("title")
      .text(function(d) { return d.name; });

  link.append("title")
      .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + d.value + " mi" });


  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });



  node.on("mouseover", function(d) {
      d3.select(this)
        .attr("r", 10)

      d.links.forEach(function(l) {
        l.selection
          .style("stroke-width", 10)
        l.target.selection
          .attr("r", 7);
      });
  });

  node.on("mouseout", function(d) {
      node.attr("r", 5)
      link.style("stroke-width", 1);
  });

  link.on("mouseover", function() {
      d3.select(this)
        .style("stroke-width", 10);
  });

  link.on("mouseout", function() {
      d3.select(this)
        .style("stroke-width", 1);
  });

  var dijkstra = d3.dijkstra()
    .nodes(nodes)
    .edges(links);

  var color = d3.scale.linear()
    .domain([0, 1000, 2500])
    .range(["green", "yellow", "red"]);

  dijkstra.on("tick", function() {
      node.style("fill", function(d) { return color(d.distance); });
  });

  dijkstra.on("end", function() {
    var name = dijkstra.source().name;
    node.select("title")
        .text(function(d) { return d.name + "\n(" + d.distance + " miles from " + name + ")" });
  });

  node.on("click", dijkstra.start);


 });

