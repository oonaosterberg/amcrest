
const fetch = require('node-fetch');
const fs = require('fs');


let date = new Date();
let day = date.getDate() +1;
let month = date.getMonth() + 1;
let year = date.getFullYear();
let data = [];
console.log(day, month, year)

fetch('https://www.sodexo.fi/ruokalistat/output/daily_json/16365/'+year+'/'+month+'/'+day+'/fi')
.then(function(response){
  if(response.ok){
    return response.json();
  } else{
    throw new Error('Response not ok');
  }
})
.then(function(myJson) {
  console.log(myJson.courses.length);
  myJson.courses.forEach((t) => data.push({name: t.title_fi, price: t.price}));
  console.log(data);
  console.log(day, month, year);

  fs.writeFile('ruoka.json', JSON.stringify(data), (err) => {
    if(err) throw err;

  });
})
.catch(function(e) {
  console.log( e.message, data);

});

