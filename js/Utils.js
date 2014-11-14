
var Utils = {};

Utils.today = new Date();

Utils.getURLParams = function(){
	var match,
		pl     = /\+/g,  // Regex for replacing addition symbol with a space
		search = /([^&=]+)=?([^&]*)/g,
		decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
		query  = window.location.search.substring(1);

	var params = {};
	while (match = search.exec(query))
		params[decode(match[1])] = decode(match[2]);
	return params;
}

Utils.getReducedString = function(str, len){
	var newString = str;
	if( str.length>len ){
		newString = str.substr(0, len) + "...";
	}
	return newString;
}

Utils.isFutureDate = function(date){
	return (date.getTime() - Utils.today.getTime())>0;
}

Utils.getIntegerRand = function(){
	return parseInt(Math.random()*1000000000)%2147483647;
}