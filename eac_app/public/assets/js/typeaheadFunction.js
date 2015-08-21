// //$(document).ready(function() { 
// 	$('input.typeahead').typeahead({
// 		name: 'firstname',
// 		prefetch:{url: "/assets/queryjson.json", ttl: '1'},
// 		limit : 10
// //engine: Hogan,
// //valuekey : "datum",

// //remote: '/typeahead.json',
// 	//local: ['timtrueman', 'JakeHarding', 'vskarich'],
// // {
// //     url: '/queryjson',
// //     filter: function(rows){
// //            // filter the returned data
// //            return [rows[0].firstname, rows[1].firstname];
// //     },
// //     valuekey : firstname,
// // }

// //minLength: 3,
// //limit: 10

// // }).on("typeahead:selected", function($e, datum){ //What to do on select
// //    window.location = "overview/" + datum['firstname'] + "/";
// // });
// //$('input.typeahead').typeahead('destroy');

// });
// // source: function (query, process) {
//        return $.get('/queryjson.json', { query: query }, function (rows) {
//            return process(.firstname);
//        });
//    }


//})

$('.example-countries .typeahead').typeahead({                                
  name: 'countries',                                                          
  prefetch: '/assets/countries.json',                                         
  limit: 10                                                                   
});