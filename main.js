import StackedBarChart from "./components/StackedBarChart.js";

async function getGroup() {
  const response = await fetch('./data/group.json');
  const json = await response.json();
  console.log(json);
  const div = document.getElementById('stacked-bar-chart');
  const {name, totalValue, categories} = json.group;
  
  const obj = {
    name : name,
    totalValue: totalValue,
    categories: categories,
  }
  const bar = new StackedBarChart(obj);
  bar.setWidth(250);
  //creare una feature che in base al totale ti scala automaticamente il grafico per valori alti
  bar.scaleValues(4, true);
  bar.getStackedBarChart(10);
  div.appendChild(bar.svg);
}

getGroup();



