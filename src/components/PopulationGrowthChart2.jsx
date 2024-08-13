import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import regionColor from '../region-color.json'
import { formatAmount } from '../utils/format'

const TestBarChart = ({ data=[] }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 360;
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'white')
      .style('margin-top', '50')
      .style('overflow', 'visible')

    // Create xScales
    const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, data => data.population)])
    .range([0, width]);
    // Create yScales
    const yScale = d3.scaleBand()
    .domain(data.map((data) => data.name))
    .range([0, height])
    .padding(0.1);

    const tickValues = d3.range(0, d3.max(data, data => data.population), 200000000); // d3.range(start, stop, step)
    const xAxis = d3.axisBottom(xScale).tickValues(tickValues).tickFormat(d => formatAmount(d))
    const xAxisGroup = svg.selectAll('g.x-axis').data([null]);

    xAxisGroup
    .enter()
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, 0)`) // Position the xAxis
    .call(xAxis)
    .merge(xAxisGroup)
    .transition()
    .duration(500)
    .call(xAxis)

    xAxisGroup.selectAll('.tick text').attr('transform', 'translate(0, -25)'); // Position text of the xAxis

    const yAxisGroup = svg.selectAll('g.y-axis').data([null]);
    const yAxis = d3.axisLeft(yScale)
    //svg.selectAll('.y-axis').remove();
    
    yAxisGroup
    .enter()
    .append('g')
    .attr('class', 'y-axis')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yAxis)
    .merge(yAxisGroup)
    .transition()
    .duration(500)
    .call(yAxis)
    
    // x-Grid lines
    svg
    .selectAll('.grid-lines')
    .data(tickValues, (data) => data)
    .join(enter => 
      enter.append('line')
      .attr('class', 'grid-lines')
      .attr('x1', data => xScale(data))
      .attr('x2', data => xScale(data))
      .attr('y1', 0)
      .attr('y2', height)
      .style('stroke', 'lightgray')
      .style('stroke-width', 0.5)
    , update => {
      update
      .transition()
      .duration(500)
      .attr('x1', data => xScale(data))
      .attr('x2', data => xScale(data))
      .attr('y1', 0)
      .attr('y2', height)
      
      update.lower()
    }
    , exit => exit.remove())
    // svg.selectAll('g.xGrid').remove();
    // svg.append('g').attr('class', 'xGrid').call(xGrid)
    
    // draw bars
    // old - bars
      /* svg.selectAll('.bar')
      .data(data, (data, index) => data.flag)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('height', yScale.bandwidth())
      .attr('fill', data => regionColor[data.region])
      .attr('width', data => xScale(data.population))
      .transition()
      .attr('y', (data) => yScale(data.name))

      svg.selectAll('.label')
      .data(data, (data, index) => index)
      .join('text')
      .text((data) => formatAmount(data.population))
      .attr('class', 'label')
      .attr('x', data => xScale(data.population) + yScale.bandwidth()/2)
      .attr('y', (data) => yScale(data.name) + yScale.bandwidth()/2)
      .transition()
      .attr('y', (data) => yScale(data.name) + yScale.bandwidth()/2)
    
      svg.selectAll('.image')
      .data(data, (data) => data.population)
      .join('image')
      .attr('class', 'image')
      .attr('xlink:href', data => data.flag)  // URL of the image
      .attr('x', data => xScale(data.population) - yScale.bandwidth())
      .attr('y', (data) => yScale(data.name))
      .attr('width', yScale.bandwidth())  
      .attr('height', yScale.bandwidth())
      .transition()
      .attr('y', (data) => yScale(data.name))*/
    
    /* Chat GPT */
    /* svg.selectAll('.bar')
    .data(data, (data) => data.name)
    .join(
      enter => enter.append('rect')
        .attr('class', 'bar')
        .attr('x', 0)
        .attr('y', d => yScale(d.name)) // Set initial y position
        .attr('height', yScale.bandwidth())
        .attr('fill', d => regionColor[d.region])
        .attr('width', 0) // Start width at 0 for entering bars
        .call(enter => enter.transition().duration(750)
          .attr('width', d => xScale(d.population))),
      update => update
        .call(update => update.transition().duration(750)
          .attr('y', d => yScale(d.name))
          .attr('width', d => xScale(d.population))),
      exit => exit
        .call(exit => exit.transition().duration(750)
          .attr('width', 0)
          .remove())
    );*/

    /* add transition but not clean */
   /* svg.selectAll('.bar')
    .data(data, (data, index) => data.name)
    .join(
      enter => {
        enter.append('rect')
        .attr('class', 'bar')
        .attr('x', 0)
        .attr('height', yScale.bandwidth())
        .attr('fill', data => regionColor[data.region])
        .attr('width', data => xScale(data.population))
        .attr('y', (data) => yScale(data.name))
      },
      update => 
        update
        .attr('height', yScale.bandwidth())
        .attr('fill', data => regionColor[data.region])
        .attr('width', data => xScale(data.population))
        .transition()
        .attr('y', (data) => yScale(data.name))
      ,
      exit => {
        exit.remove()
      }
    )

    svg.selectAll('.label')
    .data(data, (data) => data.name)
    .join(
      enter => {
        enter.append('text')
        .text((data) => formatAmount(data.population))
        .attr('class', 'label')
        .attr('x', data => xScale(data.population) + yScale.bandwidth()/2)
        .attr('y', (data) => yScale(data.name) + yScale.bandwidth()/2)
      },
      update => 
        update
        .text((data) => formatAmount(data.population))
        .attr('x', data => xScale(data.population) + yScale.bandwidth()/2)
        .transition()
        .attr('y', (data) => yScale(data.name) + yScale.bandwidth()/2)
      ,
      exit => {
        exit.remove()
      }
    )

    svg.selectAll('.image')
    .data(data, (data) => data.name)
    .join(
      enter => {
        enter.append('image')
        .attr('class', 'image')
        .attr('xlink:href', data => 
          ( data.region === 'Oceania' && data.population < 300000 ||
            data.region === 'Americas' && data.population < 6500000 ) ?
          null : data.flag )
        .attr('x', data => xScale(data.population) - yScale.bandwidth())
        .attr('y', (data) => yScale(data.name))
        .attr('width', yScale.bandwidth())  
        .attr('height', yScale.bandwidth())
      },
      update => 
        update
        .attr('xlink:href', data => 
          ( data.region === 'Oceania' && data.population < 300000 ||
            data.region === 'Americas' && data.population < 6500000 ) ?
          null : data.flag )
        .attr('x', data => xScale(data.population) - yScale.bandwidth())
        .transition()
        .attr('y', (data) => yScale(data.name))
      ,
      exit => {
        exit.remove()
      }
    ) */

    svg.selectAll('g.mark')
      .data(data, (data) => data.name)
      .join(
        enter => 
          enter.append('g')
          .attr('class', 'mark')
          .data(data, (data) => data.name)
          .call((selection) => {
            selection.append('rect')
            .attr('class', 'bar')
            .attr('height', yScale.bandwidth())
            .attr('fill', data => regionColor[data.region])
            .attr('width', data => xScale(data.population))
            .attr('x', 0)
            .attr('y', d => yScale(d.name))

            selection.append('text')
            .attr('class', 'label')
            .text((data) => formatAmount(data.population))
            .attr('x', data => xScale(data.population) + yScale.bandwidth()/2)
            .attr('y', (data) => yScale(data.name) + yScale.bandwidth()/2)

            selection.append('image')
            .attr('xlink:href', data => 
              ( data.region === 'Oceania' && data.population < 930000 ||
                data.region === 'Americas' && data.population < 6500000 ) ?
              null : data.flag )
            .attr('class', 'img')
            .attr('width', yScale.bandwidth())  
            .attr('height', yScale.bandwidth())
            .attr('x', data => xScale(data.population) - yScale.bandwidth())
            .attr('y', (data) => yScale(data.name))
          }),
        update => {
          update.select('rect.bar')
          .attr('x', 0)
          .transition()
          .duration(500)
          .attr('width', data => xScale(data.population))
          .attr('y', (data) => yScale(data.name))

          update.select('text.label')
          .text((data) => formatAmount(data.population))
          .transition()
          .duration(500)
          .attr('x', data => xScale(data.population) + yScale.bandwidth()/2)
          .attr('y', (data) => yScale(data.name) + yScale.bandwidth()/2)

          update.select('image.img')
          .transition()
          .duration(500)
          .attr('xlink:href', data => 
            ( data.region === 'Oceania' && data.population < 900000 ||
              data.region === 'Americas' && data.population < 6500000 ) ?
            null : data.flag )
          .attr('x', data => xScale(data.population) - yScale.bandwidth())
          .attr('y', (data) => yScale(data.name))
        },
        exit => {
          exit.remove()
        }
      )
      
      /*.call((selection) => {
        selection.select('.bar')
        .attr('height', yScale.bandwidth())
        .attr('fill', data => regionColor[data.region])
        .attr('width', data => xScale(data.population))

        selection.select('.img')
        .attr('width', yScale.bandwidth())  
        .attr('height', yScale.bandwidth())

      })*/

  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default TestBarChart;