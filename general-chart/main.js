
const svgns = 'http://www.w3.org/2000/svg';
const w = 600;
const h = 300;

const wChart = w / 2;
const hChart = h / 2;
const xChart = 50;
const yChart = 50;

const svg = document.getElementById('svg-chart');
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  svg.style.border = '1px solid black';

const  gChart = document.createElementNS(svgns, 'g');

const chart = document.createElementNS(svgns, 'rect');
  chart.setAttribute('id', 'chart');
  chart.setAttribute('x', xChart);
  chart.setAttribute('y', yChart);
  chart.setAttribute('width', wChart);
  chart.setAttribute('height', hChart);
  chart.style.stroke = '#9999ff';
  chart.style.strokeDasharray = `${0} ${hChart + wChart} ${hChart + wChart}`
  chart.style.fill = 'none';

const wOrigin = 20;
const hOrigin = 20;

const origin = document.createElementNS(svgns, 'rect');
  origin.setAttribute('id', 'origin');
  origin.setAttribute('x', `${xChart - wOrigin}`);
  origin.setAttribute('y', `${yChart + hChart}`);
  origin.setAttribute('width', wOrigin);
  origin.setAttribute('height', hOrigin);

const wXArrow = wOrigin;
const hXArrow = hOrigin;

const xArrow = document.createElementNS(svgns, 'rect');
  xArrow.setAttribute('id', 'x-arrow');
  xArrow.setAttribute('x', `${xChart + wChart}`);
  xArrow.setAttribute('y', `${yChart + hChart - (hXArrow/2)}`);
  xArrow.setAttribute('width', wXArrow);
  xArrow.setAttribute('height', hXArrow);

const wYArrow = wOrigin;
const hYArrow = hOrigin;

const yArrow = document.createElementNS(svgns, 'rect');
  yArrow.setAttribute('id', 'y-arrow');
  yArrow.setAttribute('x', `${xChart - (wYArrow/2)}`);
  yArrow.setAttribute('y', `${yChart - hYArrow}`);
  yArrow.setAttribute('width', wYArrow);
  yArrow.setAttribute('height', hYArrow);

const nCol = 5;
const deltaXChart = wChart / nCol;
const  gXDecoration = document.createElementNS(svgns, 'g');

// for (let i = 0; i < nCol - 1; i++) {
//   let  line = document.createElementNS(svgns, 'line');
//     line.setAttribute('id', `decX-${i + 1}`);
//     line.setAttribute('x1', `decX-${i + 1}`);
//     line.setAttribute('y1', `decX-${i + 1}`);
//     line.setAttribute('x2', `decX-${i + 1}`);
//     line.setAttribute('y2', `decX-${i + 1}`);
// }

gChart.appendChild(chart);
gChart.appendChild(origin);
gChart.appendChild(xArrow);
gChart.appendChild(yArrow);
svg.appendChild(gChart);
