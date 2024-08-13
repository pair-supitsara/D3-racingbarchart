import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import regionColor from '../region-color.json'
import { formatAmount } from '../utils/format'

const PopulationGrowthChart = ({ data=[] }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Define dimensions and margins
    const width = 800;
    const height = 360;
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'white')
      .style('margin-top', '50')
      .style('overflow', 'visible')

    // Create scales
    const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, data => data.population)])
    .range([0, width]);
  
    const yScale = d3.scaleBand()
      .domain(data.map((data) => data.name))
      .range([0, height])
      .padding(0.1);  // Add padding between bars
    // Create axes

    svg.selectAll('.x-axis').remove();
    svg.selectAll('.y-axis').remove();

    const tickValues = d3.range(0, d3.max(data, data => data.population), 200000000);
    const xAxis = svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, 0)`)
      .call(d3.axisBottom(xScale).tickValues(tickValues).tickFormat(d => formatAmount(d)));
      
    xAxis.selectAll('.tick text')
      .attr('transform', 'translate(0, -25)');
    
    // yAxis
    const yAxis = d3.axisLeft(yScale)
    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis);
  

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
    
      svg.selectAll('.image')
      .data(data, (data) => data.population)
      .join('image')
      .attr('class', 'image')
      .attr('xlink:href', data => data.flag)  // URL of the image
      .attr('x', data => xScale(data.population) - yScale.bandwidth())
      .attr('y', (data) => yScale(data.name))
      .attr('width', yScale.bandwidth())  
      .attr('height', yScale.bandwidth()) */
    
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
        .attr('class', 'label')
        .text((data) => formatAmount(data.population))
        .attr('x', data => xScale(data.population) + yScale.bandwidth()/2)
        .attr('y', (data) => yScale(data.name) + yScale.bandwidth()/2)
      },
      update => 
        update
        //.text((data) => formatAmount(data.population))
        .attr('x', data => xScale(data.population) + yScale.bandwidth()/2)
        .transition()
        .attr('y', (data) => yScale(data.name) + yScale.bandwidth()/2)
        .textTween((data) => { 
          const i = d3.interpolateNumber((data.population-5000), data.population); // Interpolate between 0 and 1,000,000
          return (t) => formatAmount(i(t))
        })
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
            data.region === 'Americas' && data.population < 5000000 ) ?
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
            data.region === 'Americas' && data.population < 5000000 ) ?
          null : data.flag )
        .attr('x', data => xScale(data.population) - yScale.bandwidth())
        .transition()
        .attr('y', (data) => yScale(data.name))
      ,
      exit => {
        exit.remove()
      }
    ) */
      svg.selectAll('.mark')
      .data(data, (data) => data.name)
      .join(
        enter => {
          enter.append('g')
          .data(data, (data) => data.name)
          .attr('class', 'mark')
          .attr('x', 0)
          .attr('y', (data) => yScale(data.name))
          .call((selection) => {
            selection.append('rect')
            .attr('class', 'bar')
            .attr('x', 0)
            .attr('height', yScale.bandwidth())
            .attr('fill', data => regionColor[data.region])
            .attr('width', data => xScale(data.population))
            .attr('y', (data) => yScale(data.name))
            
            selection
            .append('text')
            .attr('class', 'label')
            .text((data) => formatAmount(data.population))
            .attr('x', data => xScale(data.population) + yScale.bandwidth()/2)
            .attr('y', (data) => yScale(data.name) + yScale.bandwidth()/2)

            selection
            .append('image')
            .data(data, (data) => data.name)
            .attr('class', 'image')
            .attr('xlink:href', data => 
              ( (data.region === 'Oceania' && data.population < 300000) ||
                (data.region === 'Americas' && data.population < 6500000) ) ?
              null : data.flag )  // URL of the image
            .attr('x', data => xScale(data.population) - yScale.bandwidth())
            .attr('y', (data) => yScale(data.name))
            .attr('width', yScale.bandwidth())  
            .attr('height', yScale.bandwidth())
          })
        },
        update => {
              update.select('.bar')
              .transition()
              .attr('fill', data => regionColor[data.region])
              .attr('width', data => xScale(data.population))
              .attr('y', (data) => yScale(data.name))

              update.select('.label')
              .transition()
              .text((data) => formatAmount(data.population))
              .attr('x', data => xScale(data.population) + yScale.bandwidth()/2)
              .attr('y', (data) => yScale(data.name) + yScale.bandwidth()/2)

              update
              .select('.image')
              .attr('xlink:href', data => 
                ( data.region === 'Oceania' && data.population < 300000 ||
                  data.region === 'Americas' && data.population < 6500000 ) ?
                null : data.flag )  // URL of the image
              .transition()
              .attr('x', data => xScale(data.population) - yScale.bandwidth())
              .attr('y', (data) => yScale(data.name))        
        },
        exit => {
          exit.remove()
        }
      )
  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default PopulationGrowthChart;