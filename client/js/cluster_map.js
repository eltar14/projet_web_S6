// initialisation de la carte
var map = L.map('map').setView([49.846966079281266, 3.2874275441195704], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
function callback_map_clusters(data){
    tab = [];
    data = JSON.parse(data);
    //console.log(data);
    //console.error("AAHAHHAHAHHA");
    //console.warn(Object.keys(data['latitude']).length)

    let color_array = ['red', 'green', 'blue'];
    for (let i = 0; i < Object.keys(data['latitude']).length; i++) {
        //console.log(data["latitude"][i]);
        L.circle([data["latitude"][i], data["longitude"][i]], {
            color: color_array[data["cluster"][i]],
            fillColor: color_array[data["cluster"][i]],
            fillOpacity: 0.2,
            radius: (data["tronc_diam"][i]/62.8)
        }).addTo(map).bindPopup(
            'Hauteur totale : ' + data["haut_tot"][i] +'m<br>'+
            'Cluster : ' + data["cluster_name"][i] +'<br>'+
            'Hauteur tronc : ' + data["haut_tronc"][i] +'m<br>'+
            'Remarquable : ' + (parseInt(data["remarquable"][i])?'Oui':'Non') +'<br>'+
            'Feuillage : ' + data["feuillage"][i] +'<br>'+
            'Stade dev : ' + data["stadedev"][i] +'<br>'+
            'Secteur : ' + data["clc_secteur"][i] +'<br>'+
            'Id arbre : ' + data["id_arbre"][i] +'<br>'
        );
    }
}

function display_map_clusters(e){
    e.preventDefault();

    let nb_clusters = $('#nb_clusters').val()
    ajaxRequest('GET', '../php/requests.php/clustering/',callback_map_clusters, 'nbcluster='+nb_clusters);
}




