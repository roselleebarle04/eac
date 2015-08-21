	// //$(document).ready(function () {
			// 	//$('#artistName').keyup(function (e) {
			// 		function populate(){
			// 		//$('#div_tiles').empty();

			// 		//if ($.trim($('#artistName').val()) == '')
			// 		//	return;
			// 		$.ajax({
			// 			url : "/getEntries",
			// 			type : 'post',
			// 			dataType : 'json',
			// 			//data : {
			// 			//	artist : $(this).val()
			// 			//},
			// 			success : function (result) {
							
			// 				if (result.count != 0) {
			// 					var cnt = 0;
			// 					for (var i = 0; i < 50; i++) {
			// 						var item = result.data[i];
			// 						var div = $("<div class='row'>");
			// 						div.load("/galleryTiles", {
			// 							artist : item.firstname + ' ' + item.surname,
			// 							//username : item.email,
			// 							title : item.title,
			// 							firstname : item.firstname,
			// 							entryid :item.entryid,
			// 							pictureid : item.pictureid,
			// 							fileurl : item.fileurl,
			// 						}, function (res) {
			// 							if(cnt == 3){
			// 								$('#div_tiles').append("<div>&nbsp;</div>");
			// 								cnt = 0;
			// 							}
			// 							cnt++;
			// 							$('#div_tiles').append(res);
			// 						});
			// 					}
			// 				}
			// 			},
			// 			error : function (result) {
			// 				console.log('error');
			// 				console.log(result);
			// 			}
			// 		});
			// 	//})
			// 	}
			// //})
			//initial load of 12 images

			$(document).ready(function () {
					//function populate(){
					$('#div_tiles').empty();

					//if ($.trim($('#artistName').val()) == '')
					//	return;
					$.ajax({
						url : "/getEntries",
						type : 'post',
						//dataType : 'json',
						//data : {
						//	artist : $(this).val()
						//},
						success : function (result) {
							
							if (result.count != 0) {
								var cnt = 0;
								for (v ar i = 0; i < 51; i++) {
									var item = result.data[i];
									var div = $("<div class='row'>");
									div.load("/galleryTiles", {
										artist : item.firstname + ' ' + item.surname,
										firstname : item.firstname,
										surname : item.surname,
										//username : item.email,
										title : item.title,
										fileurl : item.fileurl,
										entryid :item.entryid,
										pictureid : item.pictureid,
									}, function (res) {
										if(cnt == 3){
											$('#div_tiles').append("<div>&nbsp;</div>");
											cnt = 0;
										}
										cnt++;
										$('#div_tiles').append(res);
									});
								}
							}
						},
						error : function (result) {
							console.log('error');
							console.log(result);
						}
					});

				//})
			})
			//initial load of 12 images
			
			$(document).ready(function () {
				$('#artistName').keyup(function (e) {
					$('#div_tiles').empty();
					if ($.trim($('#artistName').val()) == '')
						return;
					$.ajax({
						url : "/getEntries",
						type : 'post',
						dataType : 'json',
						data : {
							artist : $(this).val()
						},
						success : function (result) {
							
							if (result.count != 0) {
								var cnt = 0;
								for (var i = 0; i < result.data.length; i++) {
									var item = result.data[i];
									var div = $("<div class='row'>");
									div.load("/galleryTiles", {
										artist : item.firstname + ' ' + item.surname,
										username : item.email,
										title : item.title,
										fileurl : item.fileurl,
										firstname : item.firstname,
										surname : item.surname,
										entryid :item.entryid,
										pictureid : item.pictureid,
									}, function (res) {
										if(cnt == 3){
											$('#div_tiles').append("<div>&nbsp;</div>");
											cnt = 0;
										}
										cnt++;
										$('#div_tiles').append(res);
									});
								}
							}
						},
						error : function (result) {
							console.log('error');
							console.log(result);
						}
					});
				})
			})