var map = L.map('map').setView([49.846966079281266, 3.2874275441195704], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function main_map_callback(data){
    for (i in data){
        L.circle([data[i]["latitude"], data[i]["longitude"]], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.2,
            radius: (data[i]["tronc_diam"]/62.8)
        }).addTo(map);
}
}


window.onload = function(){
    ajaxRequest('GET', '../php/requests.php/info_arbre/',main_map_callback);
}