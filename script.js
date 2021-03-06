var p = document.getElementById("position");   
var d = document.getElementById("distance");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, {enableHighAccuracy:true, timeout:9000});
  } else {
    p.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function geoSuccess(position) {
	var distance;
  p.innerHTML = "Votre position est {" + position.coords.latitude.toFixed(2) + 
  ", " + position.coords.longitude.toFixed(2) + "} (avec une précision de 20m)";  //Affiche la latitude et de la longitude de l'utilisateur sur la page 
  distance = calculDistance(position.coords);   //Calcul de la distance entre notre position et celle de l'ESIREM
  d.innerHTML = "Vous êtes à " + distance.toFixed(2) + " km de l'ESIREM";  //Affichage de la distance sur la page
}

function geoError(error){
	if(p.hasAttribute('id',"position")){  //si l'ID est "position" alors change l'ID en "erreur"
		p.removeAttribute('id',"position");
		p.setAttribute('id',"erreur");
	}
	else{								  //si l'ID est "erreur" alors change l'ID en "position"
		p.removeAttribute('id',"erreur");
		p.setAttribute('id',"position");
	}
	if(d.hasAttribute('id',"distance")){  //si l'ID est "distance" alors change l'ID en "erreur"
		d.removeAttribute('id',"distance");
		d.setAttribute('id',"erreur");
	}
	else{								  //si l'ID est "erreur" alors change l'ID en "distance"
		d.removeAttribute('id',"erreur");
		d.setAttribute('id',"distance");
	}
	
	switch(error.code) {
	    case error.PERMISSION_DENIED: 		//si l'utilisateur n'a pas autorisé la géolocalisation
	      	p.innerHTML = "User denied the request for Geolocation."
	      	break;
	    case error.POSITION_UNAVAILABLE:  	//si la position est introuvable
	      	p.innerHTML = "Location information is unavailable."
	      	break;
	    case error.TIMEOUT:  				//si le temps d'attente est trop long (>9000ms)
	      	p.innerHTML = "The request to get user location timed out."
	      	break;
	    case error.UNKNOWN_ERROR: 			//si l'erreur est inconnue
	     	p.innerHTML = "An unknown error occurred."
	      	break;
  }
}

function calculDistance(startCoords) {
	var startLatRads = degreesEnRadians(startCoords.latitude);    //Conversion en radians de la latitude de l'utilisateur
	var startLongRads = degreesEnRadians(startCoords.longitude);  //Conversion en radians de la longitude de l'utilisateur
	var destLatRads = degreesEnRadians(47.3121843);     //Conversion en radians de la latitude de l'ESIREM
	var destLongRads = degreesEnRadians(5.0736829);     //Conversion en radians de la longitude de l'ESIREM
	var Radius = 6371; // rayon de la Terre en km
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
		Math.cos(startLatRads) * Math.cos(destLatRads) *
		Math.cos(startLongRads - destLongRads)) * Radius;
	return distance;
}	

function degreesEnRadians(degrees) {
	radians = (degrees * Math.PI)/180;
	return radians;
}

window.onload = getLocation;