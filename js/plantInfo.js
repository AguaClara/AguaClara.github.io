/*********************************************************************
    This script stores statistics about each plant for dynamic access
*********************************************************************/

tamara = {
	"plantNumber":2,
	"constructionStart":"January 2008",
	"inauguration":"June 2008",
	"flowRate":12,
	"populationServed":3500,
	"implementationPartner":"Agua Para el Pueblo"
}

atima = {
	"plantNumber":8,
	"constructionStart":"December 2011",
	"inauguration":"June 2012",
	"flowRate":16,
	"populationServed":4000,
	"implementationPartner":"Agua Para el Pueblo"
}

moroceli = {
	"plantNumber":10,
	"constructionStart":"March 2014",
	"inauguration":"January 2016",
	"flowRate":16,
	"populationServed":4500,
	"implementationPartner":"Agua Para el Pueblo"
}

plantStats = {
	"Tamara":tamara,
	"Atima":atima,
	"Moroceli":moroceli
}

function getPlantStats(pname){
	return plantStats[pname];
}
