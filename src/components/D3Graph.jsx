import * as d3 from "d3";
import { useEffect } from "react";

export default function D3Graph2({ beatInterval }) {
  useEffect(() => {
    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 20, left: 40 };
    const n = 50;


    // Clear previous SVG if it exists
    d3.select("#beat-graph").select("svg").remove();


    // Create SVG container
    const svg = d3.select("#beat-graph")
      .append("svg")
      .attr("width", width)
      .attr("height", height);


    // Scales for x and y axes
    const x = d3.scaleLinear()
      .domain([0, n - 1])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([-1, 1])
      .range([height - margin.bottom, margin.top]);



    // Create axes
    const xAxis = d3.axisBottom(x)
      .ticks(5)
      .tickSize(5);

    const yAxis = d3.axisLeft(y)
      .ticks(5)
      .tickSize(5);

    svg.append("g")
      .attr("class", "d3-axis x-axis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    svg.append("g")
      .attr("class", "d3-axis y-axis")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis);


    // Line generator
    const line = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d))
      .curve(d3.curveBasis);

    let data = Array.from({ length: n }, (_, i) => Math.sin(i * 0.2));


    // Append initial path
    const path = svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);


    function animate() {


    // Adjust speed based on beat interval
      let speed = 1; 
      if (beatInterval === "1/2") speed = 3;
      if (beatInterval === "1/4") speed = 0.8;
      if (beatInterval === "1/8") speed = 1.8;

      // Push new value and remove oldest
      data.push(Math.sin(Date.now() / (200 / speed)));
      data.shift();

      // update path
      path.datum(data)
        .attr("d", line);

      requestAnimationFrame(animate);
    }

    animate();
  }, [beatInterval]);

  return <div id="beat-graph"></div>;
}