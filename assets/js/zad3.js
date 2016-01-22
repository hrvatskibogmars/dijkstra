var width = 960,
    height = 500;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

var svg = d3.select("#graph").append("svg")
    .attr("width", width)
    .attr("height", height);


d3.json("/data/data.json", function(error, graph) {
  if (error) throw error;

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();


  var link = svg.selectAll(".link")
      .data(graph.links)
      .enter().append("line")
      .attr("class",function(d){
      if(d.weight == 855 || d.weight == 470 || d.weight == 454 || d.weight == 447 || d.weight == 562 || d.weight == 716
      || d.weight == 1340 || d.weight == 450 || d.weight == 200 || d.weight == 379 || d.weight == 886 || d.weight == 569){
      return "red"
      }
      else
      return "link"
      })
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll(".node")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("class", function(d){
      if(d.id =="Moskva"){
      return "red"
      }
      else
      return "node"
      })
      .attr("r", 5)
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);


  node.append("title")
    .text(function(d) { return d.id; });


  link.append("title")
    .text(function(d) {return d.weight;});

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


});
