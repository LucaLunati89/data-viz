const svgns = 'http://www.w3.org/2000/svg';
const svg = document.getElementById('waffle-chart');
const l = 400;
const primaryColor = '#263fe0';
const secondaryColor = '#e83f5e';
const percentage = 67;

svg.setAttribute('width', l);
svg.setAttribute('height', l);

const matrix = document.createElementNS(svgns, 'rect');
  matrix.setAttribute('id', 'matrix-1');
  matrix.setAttribute('x', 0);
  matrix.setAttribute('y', 0);
  matrix.setAttribute('width', l);
  matrix.setAttribute('height', l);
  matrix.style.stroke = primaryColor;
  matrix.style.strokeWidth = 4;
  matrix.style.fill= 'none';

const AB = document.createElementNS(svgns, 'g');
  AB.setAttribute('id', 'AB');
const CD = document.createElementNS(svgns, 'g');
  CD.setAttribute('id', 'CD');
const delta = l / 10;
const start = 0;
const end = l;
let increment = delta;

for(let i = 0; i < 9; i++) {
  let ABi = document.createElementNS(svgns, 'line');
  let CDi = document.createElementNS(svgns, 'line');
    
    ABi.setAttribute('id', `AB-${i + 1}`)
    ABi.setAttribute('x1', start);
    ABi.setAttribute('y1', increment);
    ABi.setAttribute('x2', end);
    ABi.setAttribute('y2', increment);
    ABi.style.stroke = primaryColor;
    
    CDi.setAttribute('id', `CD-${i + 1}`)
    CDi.setAttribute('x1', increment);
    CDi.setAttribute('y1', start);
    CDi.setAttribute('x2', increment);
    CDi.setAttribute('y2', end);
    CDi.style.stroke = primaryColor;
  
  AB.appendChild(ABi);
  CD.appendChild(CDi);
  increment += delta;
}

const total = document.createElementNS(svgns, 'g');
  total.setAttribute('id', 'total');

let arr = [];

if (percentage > 10 && percentage < 100) {
  arr = percentage.toString().split('');
}else if (percentage < 10 && percentage > 0) {
  arr = [0, `${percentage}`];
}else if (percentage == 100){
  arr = [`${percentage}`, 0];
}else {
  null;
}

let yPos = l - delta;
let xPos = 0;
let counterUnit = 1;
let counterDecimal = 0;

for (let i = 0; i < parseInt(arr[0]); i++) {
  for (let i = 0; i < 10; i++) {
    const unit = document.createElementNS(svgns, 'rect');
      unit.setAttribute('id', `unit-${counterDecimal}${counterUnit}`);
      unit.setAttribute('x', xPos);
      unit.setAttribute('y', yPos);
      unit.setAttribute('width', delta);
      unit.setAttribute('height', delta);
      unit.style.fill = secondaryColor;
    total.appendChild(unit);
    xPos += delta;
    counterUnit++;
  }
  yPos -= delta;
  xPos = 0;
  counterDecimal++;
}

xPos = 0;

for (let i = 0; i < parseInt(arr[1]); i++) {
  const unit = document.createElementNS(svgns, 'rect');
      unit.setAttribute('id', `unit-${counterDecimal}${counterUnit}`);
      unit.setAttribute('x', xPos);
      unit.setAttribute('y', yPos);
      unit.setAttribute('width', delta);
      unit.setAttribute('height', delta);
      unit.style.fill = secondaryColor;
    total.appendChild(unit);
    xPos += delta;
    counterUnit++;
}

svg.appendChild(total);
svg.appendChild(matrix);
svg.appendChild(AB);
svg.appendChild(CD);