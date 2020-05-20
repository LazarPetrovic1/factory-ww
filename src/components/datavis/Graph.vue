<template lang="html">
  <div class="container mt-5">
    <h2 class="text-center">
      Every random value (interval 2000ms) of home page points
    </h2>
    <div class="mt-5 d-flex justify-content-around">
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 1, 'btn btn-secondary btn-sm': index !== 1}"
        @click="setIndex(1)"
      >
        Item 1
      </button>
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 2, 'btn btn-secondary btn-sm': index !== 2}"
        @click="setIndex(2)"
      >
        Item 2
      </button>
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 3, 'btn btn-secondary btn-sm': index !== 3}"
        @click="setIndex(3)"
      >
        Item 3
      </button>
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 4, 'btn btn-secondary btn-sm': index !== 4}"
        @click="setIndex(4)"
      >
        Item 4
      </button>
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 5, 'btn btn-secondary btn-sm': index !== 5}"
        @click="setIndex(5)"
      >
        Item 5
      </button>
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 6, 'btn btn-secondary btn-sm': index !== 6}"
        @click="setIndex(6)"
      >
        Item 6
      </button>
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 7, 'btn btn-secondary btn-sm': index !== 7}"
        @click="setIndex(7)"
      >
        Item 7
      </button>
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 8, 'btn btn-secondary btn-sm': index !== 8}"
        @click="setIndex(8)"
      >
        Item 8
      </button>
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 9, 'btn btn-secondary btn-sm': index !== 9}"
        @click="setIndex(9)"
      >
        Item 9
      </button>
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 10, 'btn btn-secondary btn-sm': index !== 10}"
        @click="setIndex(10)"
      >
        Item 10
      </button>
    </div>
    <div ref="canvas" class="mt-4 canvas"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { v4 as uuid } from 'uuid';

export default {
  name: "Graph",
  data() {
    return {
      index: 1,
      info: []
    };
  },
  mounted() {
    const margin = {
      top: 40,
      right: 20,
      bottom: 50,
      left: 100
    }

    this.graphWidth = this.info.length > 100 ? 2000 - margin.left - margin.right : 1080 - margin.left - margin.right
    this.graphHeight = 450 - margin.top - margin.bottom

    this.info = localStorage[`Item#${this.index}`] ? JSON.parse(localStorage[`Item#${this.index}`]).map(x => parseInt(x)) : []

    this.svg = d3.select(this.$refs.canvas)
      .append("svg")
      .attr('width', this.graphWidth + margin.left + margin.right)
      .attr('height', this.graphHeight + margin.top + margin.bottom)

    this.graph = this.svg.append('g')
      .attr('width', this.graphWidth)
      .attr('height', this.graphHeight)
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    this.x = d3.scaleLinear().range([0, this.graphWidth])
    this.y = d3.scaleLinear().range([this.graphHeight, 0])

    this.xAxisGroup = this.graph.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${this.graphHeight})`)

    this.yAxisGroup = this.graph.append('g')
      .attr('class', 'y-axis')

    this.line = d3.line()
      .x((d, i, n) => this.x(i))
      .y(d => this.y(d))

    this.path = this.graph.append('path')

    this.dottedLines = this.graph.append('g')
      .attr('class', 'dotted-lines')
      .style('opacity', 0)

    this.xDottedLine = this.dottedLines.append('line')
      .attr('stroke', '#444')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', 4)

    this.yDottedLine = this.dottedLines.append('line')
      .attr('stroke', '#444')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', 4)

    this.update(this.info)
  },
  methods: {
    update(data) {
      this.x.domain(d3.extent(data, (d, i, n) => i))
      this.y.domain(d3.extent(data, d => d))

      this.path.data([data])
        .attr('fill', 'none')
        .attr('stroke', '#00bfa5')
        .attr('stroke-width', 2)
        .attr('d', this.line)

      const circles = this.graph.selectAll('circle')
        .data(data)

      circles.exit().remove()

      circles.attr('cy', d => this.y(d))
        .attr('cx', (d, i, n) => this.x(i))

      circles.enter()
        .append('circle')
          .attr('r', 4)
          .attr('cx', (d, i, n) => this.x(i))
          .attr('cy', d => this.y(d))
          .attr('fill', 'darkgray')

      this.graph.selectAll('circle')
        .on('mouseover', (d, i, n) => {
          d3.select(n[i])
            .transition()
            .duration(100)
              .attr('r', 8)
              .attr('fill', 'blue')

          this.xDottedLine
            .attr('x1', this.x(i))
            .attr('x2', this.x(i))
            .attr('y1', this.graphHeight)
            .attr('y2', this.y(d))

          this.yDottedLine
            .attr('x1', 0)
            .attr('x2', this.x(i))
            .attr('y1', this.y(d))
            .attr('y2', this.y(d))

          this.dottedLines.style('opacity', 1)
        })
        .on('mouseleave', (d, i, n) => {
          d3.select(n[i])
            .transition()
            .duration(100)
              .attr('r', 4)
              .attr('fill', 'darkgray')

          this.dottedLines.style('opacity', 0)
        })

      this.xAxis = d3.axisBottom(this.x)
        .ticks(data.length / 5)

      this.yAxis = d3.axisLeft(this.y)
        .ticks(4)

      this.xAxisGroup.call(this.xAxis)
      this.yAxisGroup.call(this.yAxis)

      this.xAxisGroup.selectAll('text')
        .attr('transform', "rotate(-40)")
        .attr('text-anchor', 'end')

      this.svg.append('text')
        .attr('y', this.graphHeight + 80 /* margin top + bottom */)
        .attr('x', this.graphWidth / 2)
        .style('text-anchor', 'middle')
        .text('X-Axis => Quantity')

      this.svg.append('text')
        .attr('x', 0)
        .attr('y', this.graphHeight - 120 /* margin left + right */)
        .attr('transform', 'rotate(-90 50 220)') /* "works" */
        .text('Y-Axis => Value')
    },
    setIndex(val) {
      this.index = val
      this.info = JSON.parse(localStorage[`Item#${this.index}`]).map(x => parseInt(x))

      this.update(this.info)
    }
  }
}
</script>

<style lang="css" scoped>
  .canvas {
    overflow: auto;
  }

  .x-axis path,
  .y-axis path,
  .x-axis line,
  .y-axis line {
    stroke: navy;
  }

  .x-axis text,
  .y-axis text {
    fill: navy;
    font-size: 14px;
  }
</style>
