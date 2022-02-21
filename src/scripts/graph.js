// import {db} from './process';
// console.log(db);
const {
    ipcRenderer
} = require('electron');
import { db } from './process.js';
import {
    process
} from './process.js';

console.log("graph.js is working");

// var xyValues = [
//     {x:50, y:7},
//     {x:60, y:8},
//     {x:70, y:8},
//     {x:80, y:9},
//     {x:90, y:9},
//     {x:100, y:9},
//     {x:110, y:10},
//     {x:120, y:11},
//     {x:130, y:14},
//     {x:140, y:14},
//     {x:150, y:15}
//   ];
  

db.find({$not: { "x": 1 } }, function (err, docs) {
    // docs is an array containing documents Mars, Earth, Jupiter
    // If no document is found, docs is equal to []
    var graphData = [];

    docs.map((data) => {
        graphData.push({x:data.x/100000000000, y:data.y}); //remove 1000000
    })
    console.log(docs);

    new Chart("myChart", {
        type: "scatter",
        data: {
          datasets: [{
            pointRadius: 4,
            pointBackgroundColor: "#F27474",
            data: graphData
          }]
        },

        
        options: {
          legend: {display: false},
          scales: {
            xAxes: [{ 
                ticks: {min: 0, max:50}
                // type:'time'
                    // time:
                    // {
                    //     displayFormats: {
                    //         second:'h:mm:ss'
                    //     }
                    // },
                    // ticks: {min: '00:00:00', max:'23:59:59'}
                }],
            yAxes: [{ticks: {min: 0, max:100}}],
          }
        }
      });

    
});

    
  