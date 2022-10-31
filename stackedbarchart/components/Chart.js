import StackedBarChart from "./StackedBarChart.js";

export default class Chart {

  constructor(groups){
    this.groups = groups;
    this.svgns = 'http://www.w3.org/2000/svg';
  }

  getMax() {
    let values = [];
    this.groups.forEach((g) => {
      values.push(g.group.totalValue);
    })
    return Math.max(...values);
  }

  getGroups(width, scale, scaleDown, margin, max) {
    this.stackedBar = [];
    this.groups.forEach((g) => {
      let stackedBarChart = new StackedBarChart(g);
      stackedBarChart.setWidth(width);
      if (scale != null){
        scaleDown ? stackedBarChart.scaleValues(scale, true) : stackedBarChart.scaleValues(scale, false);
      }
      stackedBarChart.getStackedBarChart(margin, max)
      this.stackedBar.push(stackedBarChart);
    });
  }
}