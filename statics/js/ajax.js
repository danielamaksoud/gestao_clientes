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
				for (var i = 0; i < json.length; i++) {
					document.getElementById('result').appendChild(document.createTextNode(json[i].first_name + ' ' + json[i].last_name));
					document.getElementById("result").innerHTML += "<br>";
				}
				if (json.length == 0) {
					document.getElementById('result').appendChild(document.createTextNode("Cliente não encontrado."));
					document.getElementById("result").innerHTML += "<br>";
				}
			}
		})
	})
})