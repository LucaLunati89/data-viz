import Category from "./Category.js";

export default class Group {

  constructor(name, data, svgns){
    this.name = name;
    this.data = data
    this.svgns = svgns;
  }

  evaluateTotal() {
    let height = 0;
    this.data.forEach(d => {
      height += d.value;
    });
    this.total = height;
    return this.total;
  }

  getContainer(width) {
    this.svg = document.createElementNS(this.svgns, 'svg');
      this.svg.setAttribute('width', width);
      this.svg.setAttribute('height', this.total);
    return this;
  }

  createCategories() {
    this.categories = [];
    let y = 0;
    this.data.forEach((d, i) => {
      //create group for category
      let group = document.createElementNS(this.svgns, 'g');
        group.setAttribute('id', `g-${i + 1}`)
      
      //create rect for category
      let rect = document.createElementNS(this.svgns, 'rect');
        rect.setAttribute('id', `r-${i + 1}`);
        rect.setAttribute('x', 0);
        rect.setAttribute('y', y);
        rect.setAttribute('width', this.svg.attributes.width.nodeValue);
        rect.setAttribute('height', d.value);
        rect.style.fill = d.color;

        group.appendChild(rect);
        this.svg.appendChild(group);
        let category = new Category(d.value, d.color, group, rect);
        this.categories.push(category);
        y += d.value;
    });
    return this;
  }

  addLabel(color, fontSize) {
    let text = document.createElementNS(this.svgns, 'text');
      text.innerHTML = this.name;
      text.setAttribute('x', 5);
      text.setAttribute('y', 5);
      text.setAttribute('fill', color);
      text.style.fontSize = fontSize;
      text.style.visibility = 'hidden';
    this.svg.appendChild(text);
    this.text = text;
    return this;
  }

  displayLabel() {
    console.log(this.text.clientHeight);
  }

}

/* group.data.forEach((d, i) => {
  
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
}); */