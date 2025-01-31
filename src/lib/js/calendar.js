/*global define, d3*/
define( [
	'./../external/d3/d3.min'
], function () {
	'use strict';
	
	function sundayIsLastDayOfWeek(d) {
		var day = d.getDay(); 		
		return day > 0 ? day - 1 : 6;
	}
	
	function defaultDay(d){
		return d.getDay();
	}

	var calendar = {

		format: d3.time.format( "%Y-%m-%d" ),

		dates: function ( year, isSundayLastDayOfWeek ) {
			var dates = [],
				date = new Date( year, 0, 1 ),
				week = 0,
				day,
				getDayOfWeek = isSundayLastDayOfWeek ? sundayIsLastDayOfWeek : defaultDay;  
								
			do {
				dates.push( {
					day: day = getDayOfWeek(date), //date.getDay(),
					week: week,
					month: date.getMonth(),
					Date: calendar.format( date )
				} );
				date.setDate( date.getDate() + 1 );
				if ( day === 6 ) {
					week++;
				}
			} while ( date.getFullYear() === year );
			return dates;
		},

		months: function ( year, isSundayLastDayOfWeek ) {
			var months = [],
				date = new Date( year, 0, 1 ),
				month,
				firstDay,
				firstWeek,
				day,
				week = 0,
				getDayOfWeek = isSundayLastDayOfWeek ? sundayIsLastDayOfWeek : defaultDay;
							
			do {
				firstDay = getDayOfWeek(date); //date.getDay();
				firstWeek = week;
				month = date.getMonth();
				do {
					day = getDayOfWeek(date); //date.getDay();
					if ( day === 6 ) {
						week++;
					}
					date.setDate( date.getDate() + 1 );
				} while ( date.getMonth() === month );
				months.push( {
					firstDay: firstDay,
					firstWeek: firstWeek,
					lastDay: day,
					lastWeek: day === 6 ? week - 1 : week
				} );
			} while ( date.getFullYear() === year );
			return months;
		}

	};

	return calendar;

} );

