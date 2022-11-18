const svgns = 'http://www.w3.org/2000/svg';
const width = 600;
const height = 250;
const columns = 7;
const rows = 6;
const colors = ['#A9EFEC', '#86E9E4','#53DFD8', '#26CFC6', '#20ACA5'];

const div = document.getElementById('heat-map');
const svg = document.createElementNS(svgns, 'svg');
  svg.setAttribute('id', 'chart');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.style.border = '1px solid black';

// draw vertical lines
const deltaX = width / columns;
let incrementX = deltaX;
const gVertical = document.createElementNS(svgns, 'g');
  gVertical.setAttribute('id', 'g-vertical-lines')
for (let i = 0; i < columns - 1; i++) {
  const verticalLine = document.createElementNS(svgns, 'line');
    verticalLine.setAttribute('id', `v-line-${i + 1}`)
    verticalLine.setAttribute('x1', incrementX);
    verticalLine.setAttribute('y1', 0);
    verticalLine.setAttribute('x2', incrementX);
    verticalLine.setAttribute('y2', height);
    verticalLine.style.stroke = 'black';
  gVertical.appendChild(verticalLine);
  incrementX += deltaX;
}
incrementX = 0;

// draw horizontal lines
const deltaY = height / rows;
let incrementY = deltaY;
const gHorizontal = document.createElementNS(svgns, 'g');
  gHorizontal.setAttribute('id', 'g-horizontal-lines');
for (let i = 0; i < rows - 1; i++) {
  const horizontalLine = document.createElementNS(svgns, 'line');
    horizontalLine.setAttribute('id', `h-line-${i + 1}`);
    horizontalLine.setAttribute('x1', 0);
    horizontalLine.setAttribute('y1', incrementY);
    horizontalLine.setAttribute('x2', width);
    horizontalLine.setAttribute('y2', incrementY);
    horizontalLine.style.stroke = 'black';
  gHorizontal.appendChild(horizontalLine);
  incrementY += deltaY;
}
incrementY = 0;

//draw elements
const gElements = document.createElementNS(svgns, 'g');
let id = 1;
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    const element = document.createElementNS(svgns, 'rect');
      element.setAttribute('id', `el-${id}`);
      element.setAttribute('x', incrementX);
      element.setAttribute('y', incrementY);
      element.setAttribute('width', deltaX);
      element.setAttribute('height',deltaY);
      element.setAttribute('fill', `${colors[Math.floor(Math.random() * colors.length)]}`);
    gElements.appendChild(element);
    incrementX += deltaX;
    id++;
  }
  incrementX = 0;
  incrementY += deltaY;
}

svg.appendChild(gElements);
svg.appendChild(gVertical);
svg.appendChild(gHorizontal);
div.appendChild(svg);