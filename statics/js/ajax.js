$(document).ready(function(){
	$("#search-person").submit(function(e){
		e.preventDefault();
		$.ajax({
			url: $(this).attr('action'),
			type: $(this).attr('method'),
			data: $(this).serialize(),
			success: function(json){
				console.log(json)
				var data = JSON.stringify(json);
				var arr = Array();
				
				for (var i = 0; i < json.length; i++) {
					arr[i] = json[i].first_name + ' ' + json[i].last_name;
					/* document.getElementById('result').appendChild(document.createTextNode(json[i].first_name + ' ' + json[i].last_name));
					document.getElementById("result").innerHTML += "<br>"; */
				}
				
				//console.log(arr)
				
				complete_names = arr.join(", ");
				
				document.getElementById("result").replaceChild(document.createTextNode(complete_names), document.getElementById("result").firstChild);
				//document.getElementById("result").innerHTML += "<br>";
				
				if (json.length == 0) {
					/* document.getElementById('result').appendChild(document.createTextNode("Cliente não encontrado."));
					document.getElementById("result").innerHTML += "<br>"; */
					document.getElementById('result').replaceChild(document.createTextNode("Cliente não encontrado."), document.getElementById("result").firstChild);
				}
			}
		})
	})
})