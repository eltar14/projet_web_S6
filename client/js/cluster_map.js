var map = L.map('map').setView([49.846966079281266, 3.2874275441195704], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function callback_map_clusters(data){
    data = JSON.parse(data);
    console.log(data);
    console.error("AAHAHHAHAHHA");
    //console.log(data);
    let j = 0;
    for (let i in data) {
        if (j<5){
            console.log(data[i]);
            j++;
        }

    }
}



window.onload = function () {
    ajaxRequest('GET', '../php/requests.php/clustering/',callback_map_clusters, 'nbcluster=3');
}