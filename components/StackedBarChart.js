export default class StackedBarChart{

  constructor(group) {
    this.data = group;
    this.svgns = 'http://www.w3.org/2000/svg';
  }

  setWidth(width) {
    this.width = width;
  }

  //moltiplica o divide per una costante il valore totale del gruppo e i parziali delle categorie
  scaleValues(k, down) {
    this.mappedValues = new Map();
    this.mappedValues.set(this.data.totalValue, 
      down ? this.data.totalValue / k : this.data.totalValue * k);
    this.data.categories.forEach((d) => {
      this.mappedValues.set(d.value, 
        down ? d.value / k : d.value * k);
    });
  }

  //disegna il grafico
  getStackedBarChart(margin, max) {
    const isNotMappedValues = this.mappedValues === 'undefined';

    const svg = document.createElementNS(this.svgns, 'svg');
      svg.setAttribute('id', this.data.name);
      svg.setAttribute('width', this.width);
      svg.setAttribute('height', isNotMappedValues ? this.data.totalValue : this.mappedValues.get(this.data.totalValue));
      svg.style.margin = margin;
      svg.style.marginBottom = 0;
    
    let y = 0;
    this.data.categories.forEach((d) => {
      let rect = document.createElementNS(this.svgns, 'rect');
        rect.setAttribute('id', d.name)
        rect.setAttribute('class', "data")
        rect.setAttribute('x', 0);
        rect.setAttribute('y', y);
        rect.setAttribute('width', this.width);
        rect.setAttribute('height', isNotMappedValues ? d.value : this.mappedValues.get(d.value));
        rect.style.fill = d.color;

        rect.addEventListener('mouseover', (e)=>{
          e.target.style.transitionProperty= 'fill';
          e.target.style.transitionDuration='2s';
          e.target.style.fill = 'red';
          e.target.style.outline= '1px solid black';
          e.target.style.outlineOffset= '-1px';
          const descr = document.getElementById('descr-stacked');
          descr.style.display = 'none';
          const p = document.createElement('p');
          p.setAttribute('id', 'value')
          p.innerHTML= `${d.name}<br/>${d.value}`;
          const des = document.getElementById('description');
          des.insertBefore(p, des.firstChild)
        });
        rect.addEventListener('mouseout', (e)=>{
          e.target.style.fill = d.color;
          e.target.style.transitionDuration='1s';
          e.target.style.outline= 'initial';
          e.target.style.outlineOffset= 'initial';
          document.getElementById('value').style.display = 'none';
          document.getElementById('descr-stacked').style.display = '';
        });

      svg.appendChild(rect);
      y += isNotMappedValues ? d.value : this.mappedValues.get(d.value);
    });

    this.svg = svg;
    return this;
  }


}