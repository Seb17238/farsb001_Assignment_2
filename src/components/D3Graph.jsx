import * as d3 from "d3";
import { useEffect } from "react";

export default function D3Graph2({ beatInterval }) {
  useEffect(() => {
    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 20, left: 40 };
    const n = 50;

    d3.select("#beat-graph").select("svg").remove();

    const svg = d3.select("#beat-graph")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const x = d3.scaleLinear()
      .domain([0, n - 1])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([-1, 1])
      .range([height - margin.bottom, margin.top]);

    const line = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d))
      .curve(d3.curveBasis);

    let data = Array.from({ length: n }, (_, i) => Math.sin(i * 0.2));

    const path = svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);


    function animate() {

      let speed = 1; 
      if (beatInterval === "1/2") speed = 0.5;
      if (beatInterval === "1/4") speed = 1;
      if (beatInterval === "1/8") speed = 2;

      data.push(Math.sin(Date.now() / (200 / speed)));
      data.shift();

      path.datum(data)
        .attr("d", line);

      requestAnimationFrame(animate);
    }

    animate();
  }, [beatInterval]);

  return <div id="beat-graph"></div>;
}