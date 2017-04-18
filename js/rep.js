var plantName = {
  "aga":"Agalteca",
  "ala":"Alauca",
  "ati":"Atima",
  "ccom":"CuatroComunidades" ,
  "doto":"Otoro",
  "mar1":"Marcala",
  "moro":"Moroceli",
  "smat":"Matias",
  "snic":"SanNicolas",
  "tam":"Tamara"
}

var plantValues = {
  "Agalteca":1,
  "Alauca":1,
  "Atima":10,
  "CuatroComunidades":11 ,
  "Otoro":13,
  "LasVegas":1,
  "Marcala":1,
  "Moroceli":8,
  "Matias":12,
  "SanNicolas":15,
  "SanJuanGuarita":14,
  "Tamara":16
}

var monthName = ["enero", "enero", "feb", "mar", "abr", "mayo", "junio", "julio", "ago", "sep", "oct", "nov", "dic"]
var monthFullName = {"enero":"Enero", 
  "feb":"Febrero", 
  "mar":"Marzo", 
  "abr":"Abril", 
  "mayo":"Mayo", 
  "junio":"Junio", 
  "julio":"Julio", 
  "ago":"Agosto", 
  "sep":"Septiembre", 
  "oct":"Octubre", 
  "nov":"Noviembre", 
  "dic":"Diciembre"
}

function handleAuthClick(event) {
  var url = "https://script.google.com/macros/s/AKfycbwlZ52dywp9z84YESSuV8AMTFL1QhLXg8-F9--ZjGaYKA7c5T2W/exec?callback=ctrlq&plant=";
  var plant = getPlantName();
  console.log(plant);
  console.log(url + encodeURIComponent(plant));
  var request = jQuery.ajax({
    crossDomain: true,
    url: url + encodeURIComponent(plant),
    method: "GET",
    dataType: "jsonp"
  });
}

function goToFusionTables(){
  var url = "https://fusiontables.google.com/DataSource?docid=1Sk13vckXZIuOaokQ6tbOkHjRAthBFF7FkgsGaSjD#rows:id=";
  var plant = getPlantName();
  url += plantValues[plant];
  window.location.replace(url);
}

function ctrlq(e) {
  var file = {name:e.name, description:e.description, link:e.link};
  var authorizeDiv = document.getElementById('authorize-div');
  authorizeDiv.style.display = 'none';
  appendFile(file);
  console.log(file);
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('container');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

function appendFile(file){
  var pre = document.getElementById("reportList");
  var aTag = document.createElement('a');
  aTag.setAttribute('href', file.link);
  aTag.innerHTML = ("Informes de " + file.name + "\n");
  pre.appendChild(aTag);
}

function getLinkTitle(a){
  a = a.name.split(' ');
  var date = new Date(a[1] + ' 1 ' + a[2])
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  return plantName[a[0]] + ' ' + monthFullName[monthName[monthIndex]] + '-' + year;
}  

function nameToDate(a){
  a = a.name.split(' ');
  return new Date(a[1] + ' 1 ' + a[2]);
} 