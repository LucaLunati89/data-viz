

const svgns = 'http://www.w3.org/2000/svg';
const width = 600;
const height = 300;
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const section = document.getElementById('main-section');

const div = document.createElement('div');
  div.setAttribute('id', 'balance-sheet');
  
const svg = document.createElementNS(svgns, 'svg');
  svg.setAttribute('id', 'grid');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.style.border = '1px solid black';

//draw y axis for months
const g = document.createElementNS(svgns, 'g');
  g.setAttribute('id', 'group-grid');

const kY = width / 12 ;
let x = 0;

for (let i = 0; i < 12; i++) {
  let line = document.createElementNS(svgns, 'line');
    line.setAttribute('id', months[i]);
    line.setAttribute('x1', x);
    line.setAttribute('y1', 0);
    line.setAttribute('x2', x);
    line.setAttribute('y2', height);
    line.setAttribute('stroke', 'black');
  g.appendChild(line);
  x += kY;
}

svg.appendChild(g);
div.appendChild(svg);
section.appendChild(div);