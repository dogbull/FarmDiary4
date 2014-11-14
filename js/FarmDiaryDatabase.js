var FarmDiaryDatabase = {}

FarmDiaryDatabase.errorCB = function(error){
	console.log("invoked error callback!", error);
}

FarmDiaryDatabase.successCB = function(){
	console.log("invoked success callback!", arguments);
}

FarmDiaryDatabase.initialize = function(){
	FarmDiaryDatabase.db = openDatabase("diaries", "1.0", "farmdiary", 1024 * 1024 * 10);
	FarmDiaryDatabase.db.transaction(populateDB, FarmDiaryDatabase.errorCB, FarmDiaryDatabase.successCB);
	function populateDB(tx) {
		var query =
			"CREATE TABLE IF NOT EXISTS farmipm_diary ( " +
				"id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
				"cropIndex INTEGER," +
				"actionIndex INTEGER," +
				"date DATETIME, " +
				"title VARCHAR(100), " +
				"comment TEXT," +
				"img BLOB," +
				"nextDate1 DATETIME," +
				"nextDate2 DATETIME," +
				"notiId INTEGER," +
				"nextDate1NotiId INTEGER," +
				"nextDate2NotiId INTEGER" +
				" )";
		tx.executeSql(query);
	}
}

FarmDiaryDatabase.clearDatabase = function(callback){
	FarmDiaryDatabase.db = openDatabase("diaries", "1.0", "farmdiary", 1024 * 1024 * 10);
	FarmDiaryDatabase.db.transaction(populateDB, FarmDiaryDatabase.errorCB, FarmDiaryDatabase.successCB);
	function populateDB(tx) {
		var query = "DROP TABLE IF EXISTS farmipm_diary";
		tx.executeSql(
			query,
			[],
			function(tx, result){
				callback("success", result);
			},
			function(tx, error){
				callback("error",  error);
			}
		);
	}
}

FarmDiaryDatabase.getAfterDiary = function(y, m, d, callback){
	FarmDiaryDatabase.db.transaction(function(tx){
		var date = (new Date(y, m, d)).getTime();
		var query = "SELECT * FROM farmipm_diary where date>=? or nextDate1>=? or nextDate2>=?";
		tx.executeSql(
			query,
			[date, date, date],
			function(tx, result){
				callback("success", result);
			},
			function(tx, error){
				callback("error", error);
			}
		);
	}, FarmDiaryDatabase.errorCB, FarmDiaryDatabase.successCB);
}

FarmDiaryDatabase.addDiary = function(y, m, d, cropIndex, actionIndex, title, comment, img, nextDate1, nextDate2, notiId, nextDate1NotiId, nextDate2NotiId, callback){
	FarmDiaryDatabase.db.transaction(function(tx){
		var query = "INSERT INTO farmipm_diary (cropIndex, actionIndex, date, title, comment, img, nextDate1, nextDate2, notiId, nextDate1NotiId, nextDate2NotiId) values (?,?,?,?,?,?,?,?,?,?,?)";
		tx.executeSql(
			query,
			[cropIndex, actionIndex, ((new Date(y, m, d)).getTime()), title, comment, img, nextDate1, nextDate2, notiId, nextDate1NotiId, nextDate2NotiId],
			function(tx, result){
				callback("success", result);
			},
			function(tx, error){
				callback("error", error);
			}
		);
	}, FarmDiaryDatabase.errorCB, FarmDiaryDatabase.successCB);
}

FarmDiaryDatabase.getDiary = function(y, m, d, callback){
	FarmDiaryDatabase.db.transaction(function(tx){
		var date = (new Date(y, m, d)).getTime();
		var query = "SELECT * FROM farmipm_diary where date = ? or nextDate1 = ? or nextDate2 = ?";
		tx.executeSql(
			query,
			[date, date, date],
			function(tx, result){
				callback("success", result);
			},
			function(tx, error){
				callback("error", error);
			}
		);
	}, FarmDiaryDatabase.errorCB, FarmDiaryDatabase.successCB);
}

FarmDiaryDatabase.getBufferedDiaryByYearMonth = function(y, m, cropIndex, callback){
	FarmDiaryDatabase.db.transaction(function(tx){
		var query = null;
		var params = null;
		if( cropIndex<0 ){
			var s = (new Date(y, m, -5)).getTime();
			var e = (new Date(y, m, 37)).getTime();
			query = "SELECT date, nextDate1, nextDate2 FROM farmipm_diary where (date between ? and ?) or (nextDate1 between ? and ?) or (nextDate2 between ? and ?) group by date, nextDate1, nextDate2";
			params = [s, e, s, e, s, e];
		}else{
			query = "SELECT date FROM farmipm_diary where cropIndex=? and date between ? and ? group by date";
			params = [cropIndex, ((new Date(y, m, -5)).getTime()), ((new Date(y, m, 37)).getTime())];
		}
		tx.executeSql(
			query,
			params,
			function(tx, result){
				callback("success", result);
			},
			function(tx, error){
				callback("error", error);
			}
		);
	}, FarmDiaryDatabase.errorCB, FarmDiaryDatabase.successCB);
}

FarmDiaryDatabase.getCropIndicies = function(y, m, callback){
	FarmDiaryDatabase.db.transaction(function(tx){
		var query = null;
		var params = null;

		query = "SELECT cropIndex FROM farmipm_diary  group by cropIndex";
		params = [];

		tx.executeSql(
			query,
			params,
			function(tx, result){
				callback("success", result);
			},
			function(tx, error){
				callback("error", error);
			}
		);
	}, FarmDiaryDatabase.errorCB, FarmDiaryDatabase.successCB);
}

FarmDiaryDatabase.getDiaryByYearMonth = function(y, m, callback){
	FarmDiaryDatabase.db.transaction(function(tx){
		var s = (new Date(y, m, 1)).getTime();
		var e = (new Date(y, m, new Date(y, m+1, 0).getDate())).getTime();
		//var query = "SELECT * FROM farmipm_diary where (date between ? and ?) or (nextDate1 between ? and ?) or (nextDate2 between ? and ?) order by date asc";
		var query = "SELECT * FROM farmipm_diary where (date between ? and ?) order by date asc";
		tx.executeSql(
			query,
			[s, e],
			function(tx, result){
				callback("success", result);
			},
			function(tx, error){
				callback("error", error);
			}
		);
	}, FarmDiaryDatabase.errorCB, FarmDiaryDatabase.successCB);
}

FarmDiaryDatabase.deleteDiary = function(id, callback){
	FarmDiaryDatabase.db.transaction(function(tx){
		var query = "DELETE FROM farmipm_diary where id = ?";
		tx.executeSql(
			query,
			[id],
			function(tx, result){
				callback("success", result);
			},
			function(tx, error){
				callback("error", error);
			}
		);
	}, FarmDiaryDatabase.errorCB, FarmDiaryDatabase.successCB);
}

FarmDiaryDatabase.getDiaryById = function(id, callback){
	FarmDiaryDatabase.db.transaction(function(tx){
		var query = "SELECT * FROM farmipm_diary where id = ?";
		tx.executeSql(
			query,
			[id],
			function(tx, result){
				callback("success", result);
			},
			function(tx, error){
				callback("error", error);
			}
		);
	}, FarmDiaryDatabase.errorCB, FarmDiaryDatabase.successCB);
}

FarmDiaryDatabase.updateDiary = function(id, y, m, d, cropIndex, actionIndex, title, comment, img, callback){
	FarmDiaryDatabase.db.transaction(function(tx){
		var query = "UPDATE farmipm_diary SET cropIndex=?, actionIndex=?, date=?, title=?, comment=?, img=? WHERE id=?";
		tx.executeSql(
			query,
			[cropIndex, actionIndex, ((new Date(y, m, d)).getTime()), title, comment, img, id],
			function(tx, result){
				callback("success", result);
			},
			function(tx, error){
				callback("error", error);
			}
		);
	}, FarmDiaryDatabase.errorCB, FarmDiaryDatabase.successCB);
}
