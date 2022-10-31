//asyn function that return a group object
async function getGroup() {
  const response = await fetch('./data/group.json');
  const json = await response.json();
  //const div = document.getElementById('stacked-bar-chart');
  const {name, totalValue, categories} = json.group;

  return {
    name : name,
    totalValue: totalValue,
    categories: categories,
  }
}

async function getMessage() {
  const response = await fetch('./data/description.json');
  const json = await response.json();
  const text = json.description;
  document.getElementById('descr-stacked').innerHTML = text;
}
getMessage();
const group = await getGroup();
console.log(group);

//define the height and width you want for your svg chart
const svg = {
  width: 100,
  height: 200
}

const mapCategories = (svg, group) => {
  //find the constant to map the value of the categories
const K = svg.height / group.totalValue;
//map values
return group.categories
.map(category => [category, {mappedValue : category.value * K}]);
}

const mappedCategories = mapCategories(svg, group);
console.log('mappedCategories: ', mappedCategories);

//create svg element for group
const getSvgGroup = (group, width, height) => {
  const svgns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgns, 'svg');
    svg.setAttribute('id', group.name);
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.style.border = '1px solid black';

    return svg;
};

const svgElement = getSvgGroup(group, svg.width, svg.height); 
console.log('svgElement: ', svgElement);
const div =  document.getElementById('stacked-bar-chart');
div.appendChild(svgElement);

//create rects element for the svg group
const getRectCategories = (group, svg, mappedCategories) => {
  const svgns = 'http://www.w3.org/2000/svg';
  let y = 0;
  mappedCategories.forEach( category => {
    let rect = document.createElementNS(svgns, 'rect');
        //draw rect
        rect.setAttribute('id', category[0].name)
        rect.setAttribute('class', "category")
        rect.setAttribute('x', 0);
        rect.setAttribute('y', y);
        rect.setAttribute('width', svg.getAttribute('width'));
        rect.setAttribute('height', category[1].mappedValue);
        rect.style.boxSizing = 'border-box';
        rect.style.border= '1px solid black';
        rect.style.fill = '#01DB4E';
    let line = document.createElementNS(svgns,'line');
        line.setAttribute('x1', 0);
        line.setAttribute('y1', y);
        line.setAttribute('x2', svg.getAttribute('width'));
        line.setAttribute('y2', y);
        line.setAttribute('stroke', 'black');
        //add listener
        rect.addEventListener('mouseover', (e)=>{
          e.target.style.transitionProperty= 'fill';
          e.target.style.transitionDuration='2s';
          e.target.style.fill = '#A2FAC1';
          
          const descr = document.getElementById('descr-stacked');
          descr.style.display = 'none';
          const percentage = (category[0].value * 100) / group.totalValue - Math.floor((category[0].value * 100) / group.totalValue);
          const percFloor = parseFloat(percentage.toPrecision(1));
          const numb = Math.floor((category[0].value * 100) / group.totalValue) + percFloor;
          const p = document.createElement('p');
          p.setAttribute('id', 'value')
          p.innerHTML= `${category[0].name}<br/>${category[0].value}<br/>${numb}%`;
          const des = document.getElementById('description');
          des.insertBefore(p, des.firstChild)
        });
        rect.addEventListener('mouseout', (e)=>{
          e.target.style.fill = '#01DB4E';
          e.target.style.borderBottom= '1px solid black';
          e.target.style.transitionDuration='1s';
          document.getElementById('value').remove();
          document.getElementById('descr-stacked').style.display = '';
        });

    svgElement.appendChild(rect);
    svgElement.appendChild(line);
    y += category[1].mappedValue;
  });
};

const rectElements = getRectCategories(group, svgElement, mappedCategories);




