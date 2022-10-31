const svgns = 'http://www.w3.org/2000/svg';
const width = 600;
const height = 300;
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const yAxis = 5;

const section = document.getElementById('main-section');

const div = document.createElement('div');
  div.setAttribute('id', 'balance-sheet');
  
const svg = document.createElementNS(svgns, 'svg');
  svg.setAttribute('id', 'grid');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.style.border = '1px solid black';

//draw y axis for months
const gMonth = document.createElementNS(svgns, 'g');
  gMonth.setAttribute('id', 'group-grid-months');

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
  gMonth.appendChild(line);
  x += kY;
}

//draw x axis for amount
const gAmount = document.createElementNS(svgns, 'g');
  gAmount.setAttribute('id', 'group-grid-amount');

const kX = height / 4 ;
let y = kX;
for (let i = 0; i < yAxis - 1; i++) {
  let line = document.createElementNS(svgns, 'line');
    line.setAttribute('id', `amount${i}`);
    line.setAttribute('x1', 0);
    line.setAttribute('y1', y);
    line.setAttribute('x2', width);
    line.setAttribute('y2', y);
    line.setAttribute('stroke', 'black');
  gAmount.appendChild(line);
  y += kX;
}

//function to find Max  of debit and credit
const getMax = ({credit}) => {
  let creditAmount = [];
  credit.forEach(el => {
    creditAmount.push(el.amount);
  });

    return {maxCredit: Math.max(...creditAmount)};
}

//get debit line
async function getDebit() {
  const response = await fetch('./data/debit.json');
  const json = await response.json();
  return json;
}

const debit = await getDebit();
console.log('debit: ', debit);

//get crredit line
async function getCredit() {
  const response = await fetch('./data/credit.json');
  const json = await response.json();
  return json;
}

const credit = await getCredit();
console.log('credit: ', credit);

//get max values
const maxValues = getMax(credit);
console.log('Max values: ', maxValues);

//map credit amounts
const kMap = height / maxValues.maxCredit;
const map = credit.credit.map(period => [period.amount, period.amount * kMap]);
console.log(map);

const polyline = document.createElementNS(svgns, 'polyline');
const kYCredit = width / 12 ;
let xCredit = kYCredit;
let points = "";
for(let i = 0; i < 12; i++){
  points += `${xCredit}, ${map[i][1]} `;
  xCredit += kYCredit;
};

polyline.setAttribute('points', points);
polyline.setAttribute('fill', 'none');
polyline.setAttribute('stroke', 'black');


svg.appendChild(gMonth);
svg.appendChild(gAmount);
svg.appendChild(polyline);
div.appendChild(svg);
section.appendChild(div);