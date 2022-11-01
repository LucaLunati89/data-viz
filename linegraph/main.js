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

for (let i = 0; i < 12 ; i++) {
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
console.log('debit: ', debit);

const credit = await getCredit();
console.log('credit: ', credit);

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
console.log('Max credit: ', maxCredit);

const maxDebit = getMaxDebit(debit);
console.log('Max debit: ', maxDebit);


const max = Math.max(...[maxCredit, maxDebit]);
console.log('max: ',max);

/********************MAP AND DRAW CREDIT*********************/

const kCreditMap = height / max;
const mapCredit = credit.credit.map(period => [period.amount, period.amount * kCreditMap]);
console.log(mapCredit);

const creditPl = document.createElementNS(svgns, 'polyline');
const kYCredit = width / 12 ;
let xCredit = 0;
let pointsCredit = "";
for(let i = 0; i < 13; i++){
  pointsCredit += `${xCredit}, ${height - mapCredit[i][1]} `;
  xCredit += kYCredit;
};

creditPl.setAttribute('points', pointsCredit);
creditPl.setAttribute('fill', 'none');
creditPl.setAttribute('stroke', 'red');

/********************MAP AND DRAW DEBIT*********************/

const kDebitMap = height / max;
const mapDebit = debit.debit.map(period => [period.amount, period.amount * kDebitMap]);
console.log(kDebitMap);

const debitPl = document.createElementNS(svgns, 'polyline');
const kYDebit = width / 12 ;
let xDebit = 0;
let pointsDebit = "";
for(let i = 0; i < 13; i++){
  pointsDebit += `${xDebit}, ${height - mapDebit[i][1]} `;
  xDebit += kYDebit;
};

debitPl.setAttribute('points', pointsDebit);
debitPl.setAttribute('fill', 'none');
debitPl.setAttribute('stroke', 'green');

/********************APPEND CHART*********************/

svg.appendChild(gMonth);
svg.appendChild(gAmount);
svg.appendChild(creditPl);
svg.appendChild(debitPl);
div.appendChild(svg);
section.appendChild(div);