import Chart from "./components/Chart.js";

const group1 = {
  "group" : {
    "name": "Group_1",
    "totalValue": 600,
    "categories": [
      {
        "name": "Category_1",
        "value": 100,
        "color": "#769976"
      },
      {
        "name": "Category_2",
        "value": 200,
        "color": "#A5E6A6"
      },
      {
        "name": "Category_3",
        "value": 300,
        "color": "#E6E49A"
      }
    ]
  }
};

const group2 = {
  "group" : {
    "name": "Group_2",
    "totalValue": 800,
    "categories": [
      {
        "name": "Category_1",
        "value": 200,
        "color": "#A5E6A6"
      },
      {
        "name": "Category_2",
        "value": 300,
        "color": "#E6E49A"
      },
      {
        "name": "Category_3",
        "value": 300,
        "color": "#769976"
      }
    ]
  }
};

const group3 = {
  "group" : {
    "name": "Group_2",
    "totalValue": 970,
    "categories": [
      {
        "name": "Category_1",
        "value": 200,
        "color": "#A5E6A6"
      },
      {
        "name": "Category_2",
        "value": 350,
        "color": "#E6E49A"
      },
      {
        "name": "Category_3",
        "value": 200,
        "color": "#769976"
      },
      {
        "name": "Category_4",
        "value": 220,
        "color": "#A69A73"
      }
    ]
  }
};
const groups = [group1, group2, group3];
const chart = new Chart(groups);
let max = chart.getMax();
chart.getGroups(50, 4, true, 10, max);

const div = document.getElementById('stacked-bar-chart');
chart.stackedBar.forEach(s => {
  div.appendChild(s.svg);
}); 
