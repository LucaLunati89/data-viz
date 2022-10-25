import Group from "./components/Group.js";

const palette = ['#769976', '#A5E6A6', '#E6E49A', '#998157', '#E8CC99'];

const data = [
    {value: 100, color: palette[0]},
    {value: 150, color:palette[2]},
  ];

const svgns = 'http://www.w3.org/2000/svg';

const group = new Group('nome gruppo',data, svgns);
const width = 200;
group.evaluateTotal();

const svg = group
  .getContainer(width)
  .createCategories()
  .addLabel('black', 20).svg;



const heightTitleSvg = 60;

const div = document.getElementById('stacked-bar-chart');
  
const title = document.createElementNS(svgns, 'svg');
  title.setAttribute('width', width);
  title.setAttribute('height', heightTitleSvg);
  title.style.border = '1px solid black';

const innerTitle = document.createElementNS(svgns, 'text');
  innerTitle.innerHTML = 'TITOLO';
  innerTitle.setAttribute('y', 30);
  innerTitle.style.fontSize = 30;

  title.appendChild(innerTitle);

const line = document.createElementNS(svgns, 'svg');
  line.setAttribute('width', width);
  line.setAttribute('height', 60);
  line.style.border = '1px solid black';


let y = 0;
let j = y + 26;
const fontSize = 16;

div.appendChild(svg);
group.displayLabel();
div.appendChild(title);
