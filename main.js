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
  const total = obj.totalValue;
  const bar = new StackedBarChart(obj);
  bar.setWidth(250);
  //creare una feature che in base al totale ti scala automaticamente il grafico per valori alti
  bar.scaleValues(4, true);
  bar.getStackedBarChart(10);
  div.appendChild(bar.svg);
}

async function getMessage() {
  const response = await fetch('./data/description.json');
  const json = await response.json();
  const text = json.description;
  document.getElementById('descr-stacked').innerHTML = text;
}

//description
const width = document.getElementById('description').clientWidth;
console.log(document.getElementById('description'));
const svg = document.getElementById('decoration');
console.log(svg);
const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
rect.setAttribute('width', '100%');
console.log(width);
rect.setAttribute('height', svg.clientHeight);
rect.setAttribute('x', 0);
rect.setAttribute('y', 0);
svg.appendChild(rect);


getGroup();
getMessage();



