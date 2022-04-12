//CREATES A BARCHART FROM THE DATA
import * as d3 from "d3";
import { useEffect, useRef } from "react";

export const BarChart = ({ dimensions, data }) => {
    const svgRef = useRef(null);
    const { width, height, margin } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    useEffect(() => {
      //CREATES SVG IF IT DOESN'T EXIST
      const svgEl = d3
        .select(svgRef.current);
      //CLEANS SVG IF EXISTS
      svgEl.selectAll("*").remove();
      const svg = svgEl
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
      //SCALE RANGE X
      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.id))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.2);
      //SCALE RANGE Y
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.number)])
        .range([height, 0]);
      //AXIS X
      const xAxis = d3.axisBottom(x);
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);
      //AXIS Y
      const yAxis = d3.axisLeft(y).ticks(7);
      svg.append("g").call(yAxis);
      //RECTANGLES FROM THE DATA
      const rects = svg.selectAll("rect").data(data);
      rects
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.id))
        .attr("y", (d) => y(d.number))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.number))
        .attr("fill", "#881337");
    }, []);
    
  
    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />
  }

export default BarChart;