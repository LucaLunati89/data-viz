const svgns = 'http://www.w3.org/2000/svg';
const width = 600;
const height = 300;
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const yAxis = 5;
const translY = 50;
const section = document.getElementById('main-section');

const div = document.createElement('div');
  div.setAttribute('id', 'balance-sheet');
  
const svg = document.createElementNS(svgns, 'svg');
  svg.setAttribute('id', 'grid');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  //svg.style.border = '2px solid white';

//draw y axis for months
const gMonth = document.createElementNS(svgns, 'g');
  gMonth.setAttribute('id', 'group-grid-months');

const kY = width / 12 ;
let x = kY;

for (let i = 0; i < 13 ; i++) {
  let line = document.createElementNS(svgns, 'line');
    line.setAttribute('id', months[i]);
    line.setAttribute('x1', x);
    line.setAttribute('y1', translY);
    line.setAttribute('x2', x);
    line.setAttribute('y2', height + translY);
    line.setAttribute('stroke', 'white');
  gMonth.appendChild(line);
  x += kY;
}

//draw x axis for amount
const gAmount = document.createElementNS(svgns, 'g');
  gAmount.setAttribute('id', 'group-grid-amount');

const kX = height / 4 ;
let y = translY;
for (let i = 0; i < yAxis; i++) {
  let line = document.createElementNS(svgns, 'line');
    line.setAttribute('id', `amount${i}`);
    line.setAttribute('x1', kY);
    line.setAttribute('y1', y);
    line.setAttribute('x2', width);
    line.setAttribute('y2', y);
    line.setAttribute('stroke', 'white');
  gAmount.appendChild(line);
  y += kX;
}

/********************DRAW RECT BACKGROUND FOR GRID*********************/
const rect = document.createElementNS(svgns, 'rect');
  rect.setAttribute('id', 'background-grid');
  rect.setAttribute('x', kY);
  rect.setAttribute('y', translY);
  rect.setAttribute('width', width - kY);
  rect.setAttribute('height', height);
  rect.setAttribute('fill', 'rgb(255,255,255,0.2)');

/********************GET DEBIT AND CREDIT DATA*********************/

async function getDebit() {
  const response = await fetch('./data/debit.json');
  const json = await response.json();
  return json;
}


async function getCredit() {
  const response = await fetch('./data/credit.json');
  const json = await response.json();
  return json;
}

const debit = await getDebit();

const credit = await getCredit();

/********************GET MAX VALUE*********************/

const getMaxCredit = ({credit}) => {
  let creditAmount = [];
  credit.forEach(el => {
    creditAmount.push(el.amount);
  });

    return Math.max(...creditAmount);
}

const getMaxDebit = ({debit}) => {
  let debitAmount = [];
  debit.forEach(el => {
    debitAmount.push(el.amount);
  });

    return Math.max(...debitAmount);
}

const maxCredit = getMaxCredit(credit);

const maxDebit = getMaxDebit(debit);

const max = 700//Math.max(...[maxCredit, maxDebit]);

/********************MAP AND DRAW CREDIT*********************/

const kCreditMap = height / max;
const mapCredit = credit.credit.map(period => [period.amount, period.amount * kCreditMap]);
const creditPl = document.createElementNS(svgns, 'polyline');
const kYCredit = width / 12 ;
let xCredit = width / 12 ;
let pointsCredit = "";
for(let i = 0; i < 12; i++){
  pointsCredit += `${xCredit}, ${height - mapCredit[i][1] + translY} `;
  xCredit += kYCredit;
};

creditPl.setAttribute('points', pointsCredit);
creditPl.setAttribute('fill', 'none');
creditPl.setAttribute('stroke', '#F5072A');
//creditPl.style.strokeWidth = 2;

/********************MAP AND DRAW DEBIT*********************/

const kDebitMap = height / max;
const mapDebit = debit.debit.map(period => [period.amount, period.amount * kDebitMap]);
const debitPl = document.createElementNS(svgns, 'polyline');
const kYDebit = width / 12 ;

let xDebit = width / 12;
let pointsDebit = "";
for(let i = 0; i < 12; i++){
  pointsDebit += `${xDebit}, ${height - mapDebit[i][1] + translY} `;
  xDebit += kYDebit;
};

debitPl.setAttribute('points', pointsDebit);
debitPl.setAttribute('fill', 'none');
debitPl.setAttribute('stroke', '#21FF4E');
//debitPl.style.strokeWidth = 2;

/********************ADD LABEL FOR AMOUNT*********************/
const labelAmounts = document.createElementNS(svgns, 'g');
labelAmounts.setAttribute('id', 'amounts-label');
let yLabelPos =  translY;
const kYLabelPos =  kX;
const deltaAmount = max / 4;
let amount = max;
for (let i = 0; i < 5; i++){
  let text = document.createElementNS(svgns, 'text');
    text.setAttribute('x', 0)
    text.setAttribute('y', yLabelPos)
    text.setAttribute('dy', '.3em');
    text.setAttribute('fill', 'white');
    text.innerHTML = amount
    labelAmounts.appendChild(text);
    yLabelPos += kYLabelPos;
    amount -= deltaAmount;
}

/********************ADD LABELS*********************/
const labelMonths = document.createElementNS(svgns, 'g');
  labelMonths.setAttribute('id', 'months-label');
let xLabelPos =  width / 12 ;
let kLabelPos =  xLabelPos;
for (let i = 0; i <12; i++){
  let text = document.createElementNS(svgns, 'text');
    text.setAttribute('x', xLabelPos + translY + 5)
    text.setAttribute('y', height + 5)
    text.setAttribute('dy', '.3em');
    text.setAttribute('transform', `rotate(90, ${xLabelPos}, ${height + 5})`)
    text.setAttribute('fill', 'white');
    text.innerHTML = months[i];
  labelMonths.appendChild(text);
  xLabelPos += kLabelPos;
}
/********************APPEND CHART*********************/

svg.appendChild(rect);
svg.appendChild(gMonth);
svg.appendChild(gAmount);
svg.appendChild(creditPl);
svg.appendChild(debitPl);
svg.appendChild(labelMonths);
svg.appendChild(labelAmounts);

div.appendChild(svg);
section.appendChild(div);

const labels = document.getElementsByTagName('text');
const labelsArr =Array.prototype.slice.call(labels);
let clientWidthArr = [];
labelsArr.forEach( el => {
  clientWidthArr.push(el.clientWidth);
});

const a  = Math.max(...clientWidthArr);
const grid = document.getElementById('grid')
  grid.setAttribute('height', height + 200);
  grid.setAttribute('width', width + 20); 

const bgGrid = document.getElementById('background-grid');
const rectWidth = bgGrid.getAttribute('width');
const title = document.createElementNS(svgns, 'text');
  title.innerHTML = 'Credit - Debit 2022';
  title.setAttribute('x', (width  - rectWidth) + (rectWidth / 2));
  title.setAttribute('y', 20);
  title.setAttribute('text-anchor', 'middle');
  title.setAttribute('fill', 'white');
  title.style.fontSize = '20px';

grid.insertBefore(title, bgGrid.firstChild);