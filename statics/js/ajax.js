$(document).ready(function(){
	$("#search-person").submit(function(e){
		e.preventDefault();
		$.ajax({
			url: $(this).attr('action'),
			type: $(this).attr('method'),
			data: $(this).serialize(),
			success: function(json){
				console.log(json)
				document.getElementById('result').replaceChild(document.createTextNode("JSON criado."), document.getElementById('result').firstChild);
			}
		})
	})
})