import { Injectable } from '@angular/core';
import $ = require("jquery");

@Injectable()
export class DataService {

	tableID = "14iS92Ep_8pfzwih-Hw-mn2o38_Mp31HOJ2BnI6rQ";
	apiKey = "&key=AIzaSyAAWkBly-1cwH3rbyLIhoZtJAY3RUHrViM";
	numReqDataPoints = 100;

	numReturnedDataPoints = 0;

	nonDataStorageItems = ["plantName", "columnData"];

	encodeFusionTableSQL(sqlString : string) {
		var base = 'www.googleapis.com/fusiontables/v2/'
		var initQuery = "query?sql=";
		var url = base + initQuery + encodeURIComponent(sqlString) + this.apiKey;
		return url;
	}

	retrieveAllPlantData() {
		// explicit type annotation, JSON.parse does not have a determined type
		var plantData : any[] = [];
		if (localStorage.length == 0) {
			return plantData
		}
		// Loop through selected localstorage held json strings
		for ( var i = 0; i < this.numReturnedDataPoints; ++i ) {
			var key = localStorage.key( i );
			if (this.nonDataStorageItems.indexOf(key) == -1){//($.inArray(key, this.nonDataStorageItems) == -1) {
				var string = localStorage.getItem( localStorage.key( i ) );
				plantData[i] = JSON.parse(string);
			};
		};
		return plantData
	}


	// Load any string from local storage.
	load(key:string) {
		return localStorage.getItem(key);
	}

	// Save any string key, value pair to local storage
	save(key:string, value:string) {
		localStorage.setItem(key, value);
	}

	getColumnIndex(columnString:string) {
		var columnData = JSON.parse(localStorage.getItem('columnData'));
		return columnData.indexOf(columnString);
	}

	// TODO: Confirm rowArray and columnArray are all Strings
	makeDictionary(rowArray:string[], columnArray:string[]) {
		var plantDataDictArray = [];
		for ( var i = 0, rLen = rowArray.length; i < rLen; ++i ) {
			plantDataDictArray[i] = {};
			for ( var j = 0, cLen = columnArray.length; j < cLen; ++j ) {
				plantDataDictArray[i][columnArray[j]] = rowArray[i][j];
			}
		}
		return plantDataDictArray;
	}

	updatePlantData(onSuccess:any){ //:any
		var plantName = this.getPlantName();
		var query = "SELECT * FROM " + this.tableID + " WHERE plant=" + "'" +
					plantName + "'" +
					" AND rawWaterTurbidity > 0 ORDER BY timeFinished DESC LIMIT " +
					this.numReqDataPoints;
		var queryURL = this.encodeFusionTableSQL(query);
		console.log(queryURL);

		// Get the JSON corresponding to the encoded sql string
		$.getJSON(query, function(json:any) {	//:any
			this.deleteOldPlantData();
			this.save('columnData', JSON.stringify(json.columns));
			if (json.rows == null){
				json.rows = [];
				json.columns = [];
			}
			// Save plant data into the local storage
			var plantDataDictArray = this.makeDictionary(json.rows, json.columns);
			plantDataDictArray = this.filterExtremes(plantDataDictArray);
			this.numReturnedDataPoints = plantDataDictArray.length;
			this.insertManyPlantData(plantDataDictArray);
			// Call the callback and use the retrieve function to get plantdata
			onSuccess(this.retrieveAllPlantData(),plantName);
			$('#spinnerDestination').html("");
		})
		.fail(function() {
			alert("Could not sync data. Data sync"
					+ "was not successful and old data is preserved");
			//alert(```Could not sync data.
				//Data sync was not successful and old data is preserved.```)
			$('#spinnerDestination').html("");
		});
	}

	insertManyPlantData(plantData:any) {	//any
		for ( var i = 0, len = plantData.length; i < len; ++i ) {
			var timeStarted = plantData[i].timeStarted;
			localStorage.setItem(timeStarted, JSON.stringify(plantData[i]));
		}
		this.numReturnedDataPoints = localStorage.length - this.nonDataStorageItems.length;
	}

	deleteOldPlantData(){
		var plantName = this.load('plantName')
		localStorage.clear();
		this.save('plantName',plantName)
	}

	getPlantName(){
		if(this.load("plantName")==undefined){return null;}
		return this.load("plantName");
	}

	getAllPlantsDict(){
		return {
			"aga":"Agalteca",
			"ala":"Alauca",
			"ati":"Atima",
			"ccom":"CuatroComunidades",
			"doto":"Otoro",
			"mar1":"Marcala",
			"moro":"Moroceli",
			"smat":"Matias",
			"snic":"SanNicolas",
			"tam":"Tamara",
			"lasv":"LasVegas",
			"sjg":"SanJuanGuarita"
		}
	}
}
