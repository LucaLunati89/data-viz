const palette = ['#769976', '#A5E6A6', '#E6E49A', '#998157', '#E8CC99'];

const data = [
    {value: 100, color: palette[0]},
    {value: 150, color:palette[2]},
    {value: 180, color:palette[3]}
  ]

const svgns = 'http://www.w3.org/2000/svg';
const width = 300;
let height = 0;

data.forEach((d, i) => {
  height += d.value;
})


const div = document.getElementById('stacked-bar-chart');

const widthTitle = 100;
const title = document.createElementNS(svgns, 'svg');
  title.setAttribute('width', width);
  title.setAttribute('height', 60);
  title.style.border = '1px solid black';

const innerTitle = document.createElementNS(svgns, 'text');
  innerTitle.innerHTML = 'TITOLO';
  innerTitle.setAttribute('y', 30);
  innerTitle.style.fontSize = 30;

  title.appendChild(innerTitle);

const svg = document.createElementNS(svgns, 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);

let y = 0;
let j = y + 26;
const fontSize = 16;

data.forEach((d, i) => {
  let group = document.createElementNS(svgns, 'g');
    group.setAttribute('id', `g-${i + 1}`)
  let rect = document.createElementNS(svgns, 'rect');
    rect.setAttribute('id', `r-${i + 1}`);
    rect.setAttribute('x', 0);
    rect.setAttribute('y', y);
    rect.setAttribute('width', width);
    rect.setAttribute('height', d.value);
    rect.style.fill = d.color;
    
    rect.addEventListener('mouseover', (e)=>{
      console.log(e.target.style);
      e.target.style.fill = 'red';
      e.target.style.outline= '1px solid black';
      e.target.style.outlineOffset= '-1px';
    });
    rect.addEventListener('mouseout', (e)=>{
      e.target.style.fill = d.color;
      e.target.style.outline= 'initial';
      e.target.style.outlineOffset= 'initial';
    });

  let text = document.createElementNS(svgns, 'text');
    text.innerHTML = d.value;
    text.setAttribute('x', 5);
    text.setAttribute('y', j);
    text.setAttribute('fill', 'black');
    text.style.fontSize = fontSize;
  group.appendChild(rect);
  group.appendChild(text);
  svg.appendChild(group);
  y += d.value;
  j += d.value;
});

div.appendChild(svg);
div.appendChild(title);
