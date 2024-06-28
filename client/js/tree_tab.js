/**
 * Fonction qui affiche les informations des arbres (callback de la requête AJAX)
 * Il y a aussi les fonctions de pagination et de filtres de trie des arbres et de prédiction de l'âge
 *
 * @param tab_arbre
 */
function info_arbre(tab_arbre) {
    // On remplace les clés 'stadedev' et 'nomtech' par 'fk_stadedev' et 'fk_nomtech' respectivement
    // On fait cela pour adapter les clés aux noms des colonnes de la table 'arbre' pour le script de prédiction
    const updatedTabArbre = tab_arbre.map(arbre => {
        return {
            ...arbre, // spread operator pour copier les autres clés et valeurs https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            'fk_stadedev': arbre['stadedev'],
            'fk_nomtech': arbre['nomtech']
        };
    });

    // On supprime les clés 'stadedev' et 'nomtech' pour ne pas les afficher dans le tableau
    updatedTabArbre.forEach(arbre => {
        delete arbre['stadedev'];
        delete arbre['nomtech'];
    });

    // On récupère les éléments du DOM
    // et on initialise les variables pour la pagination et le tri des arbres
    const tableBody = document.querySelector('#arbre_info');
    const itemsPerPage = 10;
    let currentPage = 1;
    let selectedRows = [];
    let sortedTabArbre = [...updatedTabArbre]; // une copie du tableau des arbres pour le tri
    const originalTabArbre = [...updatedTabArbre]; // une copie du tableau des arbres pour la réinitialisation

    /**
     * Fonction qui vide le corps du tableau
     */
    function clearTableBody() {
        tableBody.innerHTML = '';
    }

    /**
     * Fonction qui selectionne ou déselectionne un arbre et l'ajoute ou le retire du tableau des arbres sélectionnés
     * @param arbre
     * @param isChecked // true si l'arbre est sélectionné, false sinon
     */
    function handleCheckboxClick(arbre, isChecked) {
        const arbreId = arbre['id_arbre']; // l'id de l'arbre
        const existingIndex = selectedRows.findIndex(row => row['id_arbre'] === arbreId); // l'index de l'arbre dans le tableau des arbres sélectionnés

        // Si l'arbre est sélectionné et n'existe pas dans le tableau des arbres sélectionnés, on l'ajoute
        if (isChecked) {
            // Si l'arbre n'existe pas dans le tableau des arbres sélectionnés, on l'ajoute
            if (existingIndex === -1) {
                selectedRows.push(arbre); // on ajoute l'arbre au tableau des arbres sélectionnés
                console.log('Ajouté:', arbre);
            }
        } else {
            // Si l'arbre existe dans le tableau des arbres sélectionnés, on le retire
            if (existingIndex !== -1) {
                console.log('Retiré:', selectedRows[existingIndex]);
                selectedRows.splice(existingIndex, 1);
            }
        }
        console.log('Sélection mais que id_arbre:', selectedRows.map(row => row['id_arbre']));
    }

    /**
     * Fonction qui affiche la page demandée
     * @param page
     */
    function displayPage(page) {
        clearTableBody();

        // On initialise les variables pour la pagination
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = sortedTabArbre.slice(start, end);

        // Création des entêtes du tableau
        const tableHeaders = document.createElement('tr');
        for (const key in paginatedItems[0]) {
            const th = document.createElement('th');
            th.textContent = key;
            tableHeaders.appendChild(th);
        }
        // Ajout de l'entête pour la case à cocher
        const thCheckbox = document.createElement('th');
        thCheckbox.textContent = 'Prédire l\'âge';
        tableHeaders.appendChild(thCheckbox);
        tableBody.appendChild(tableHeaders);

        // Création des lignes du tableau
        paginatedItems.forEach((arbre) => {
            const tr = document.createElement('tr');
            for (const key in arbre) {
                if ((key === 'remarquable' || key === 'revetement') && arbre[key] === '1') {
                    arbre[key] = 'Oui';
                } else if ((key === 'remarquable' || key === 'revetement') && arbre[key] === '0') {
                    arbre[key] = 'Non';
                }
                const td = document.createElement('td');
                td.textContent = arbre[key];
                tr.appendChild(td);
            }
            // Ajout de la case à cocher
            const tdCheckbox = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = selectedRows.some(row => row['id_arbre'] === arbre['id_arbre']); // on coche la case si l'arbre est déjà sélectionné
            checkbox.onchange = (event) => handleCheckboxClick(arbre, event.target.checked); // on gère le changement d'état de la case à cocher
            tdCheckbox.appendChild(checkbox); // on ajoute la case à cocher à la cellule
            tr.appendChild(tdCheckbox);
            tableBody.appendChild(tr);
        });
    }

    /**
     * Fonction de filtrage des arbres
     */
    function applyFilters() {

        // On récupère les valeurs des filtres
        const revetementFilter = document.getElementById("filter_revetement").value;
        const remarquableFilter = document.getElementById("filter_remarquable").value;
        const arbEtatFilter = document.getElementById("filter_arb_etat").value;
        const portFilter = document.getElementById("filter_port").value;
        const situationFilter = document.getElementById("filter_situation").value;
        const clcSecteurFilter = document.getElementById("filter_clc_secteur").value;
        const feuillageFilter = document.getElementById("filter_feuillage").value;
        const stadedevFilter = document.getElementById("filter_stadedev").value;
        const nomtechFilter = document.getElementById("filter_nomtech").value;

        // On filtre les arbres en fonction des valeurs des filtres
        sortedTabArbre = originalTabArbre.filter(arbre => {
            return (
                (!revetementFilter || arbre.revetement === revetementFilter) &&
                (!remarquableFilter || arbre.remarquable === remarquableFilter) &&
                (!arbEtatFilter || arbre.arb_etat === arbEtatFilter) &&
                (!portFilter || arbre.port === portFilter) &&
                (!situationFilter || arbre.situaton === situationFilter) &&
                (!clcSecteurFilter || arbre.clc_secteur === clcSecteurFilter) &&
                (!feuillageFilter || arbre.feuillage === feuillageFilter) &&
                (!stadedevFilter || arbre.fk_stadedev === stadedevFilter) &&
                (!nomtechFilter || arbre.fk_nomtech === nomtechFilter)
            );
        });

        // On affiche et on pagine les arbres filtrés
        displayPage(currentPage);
        createPaginationControls();
    }

    /**
     * Fonction pour créer le bouton de prédiction
     */
    function createPredictionButton() {
        const predictionBtn = document.createElement('button');
        predictionBtn.textContent = 'Prédire l\'âge';
        predictionBtn.className = 'btn';
        // On envoie les id_arbre des arbres sélectionnés pour la prédiction
        predictionBtn.onclick = () => {
            ajaxRequest('GET', '../php/requests.php/prediction/', display_tab_age, 'selectedRows=' + selectedRows.map(row => row['id_arbre']));
            $('#tab_age').show();

        };
        document.querySelector('#pagination').appendChild(predictionBtn);
    }

    /**
     * Fonction pour créer les contrôles de pagination
     */
    function createPaginationControls() {
        const paginationContainer = document.querySelector('#pagination');
        paginationContainer.innerHTML = '';
        const paginationInfo = document.querySelector('#pagination-info');
        const totalPages = Math.ceil(sortedTabArbre.length / itemsPerPage);

        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Précédent';
        prevBtn.className = 'btn';
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                displayPage(currentPage);
                updatePaginationInfo();
            }
        };
        paginationContainer.appendChild(prevBtn);

        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Suivant';
        nextBtn.className = 'btn';
        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayPage(currentPage);
                updatePaginationInfo();
            }
        };
        paginationContainer.appendChild(nextBtn);

        createPredictionButton();
        updatePaginationInfo();
    }

    /**
     * Fonction pour mettre à jour les informations de pagination
     */
    function updatePaginationInfo() {
        const paginationInfo = document.querySelector('#pagination-info');
        const totalPages = Math.ceil(sortedTabArbre.length / itemsPerPage);
        paginationInfo.textContent = `Page ${currentPage} sur ${totalPages}`;
    }

    /**
     * Fonction de trie des arbres
     */
    function sortTable() {
        const criteria = document.getElementById("criteria").value;
        const order = document.getElementById("order").value;


        const columnIndex = {
            "id_arbre": "id_arbre",
            "haut_tot": "haut_tot",
            "haut_tronc": "haut_tronc",
            "tronc_diam": "tronc_diam",
            "age_estim": "age_estim",
            "clc_nbr_diag": "clc_nbr_diag",
            "remarquable": "remarquable",
            "arb_etat": "arb_etat",
            "fk_stadedev": "fk_stadedev",
            "fk_nomtech": "fk_nomtech",
            "clc_secteur": "clc_secteur",
            "feuillage": "feuillage"
        };

        // On trie le tableau des arbres en fonction du critère et de l'ordre choisis
        // a ici est un objet de type arbre
        // b ici est un objet de type arbre
        sortedTabArbre.sort((a, b) => {
            let aText = a[columnIndex[criteria]];
            let bText = b[columnIndex[criteria]];

            // On convertit les valeurs en nombre si ce sont des nombres
            if (!isNaN(parseFloat(aText)) && !isNaN(parseFloat(bText))) {
                aText = parseFloat(aText);
                bText = parseFloat(bText);
            }
            // On trie en fonction de l'ordre choisi
            if (order === "croissant") {
                return aText > bText ? 1 : -1; // Si aText est plus grand que bText, on retourne 1, sinon -1
            } else {
                return aText < bText ? 1 : -1; // Si aText est plus petit que bText, on retourne 1, sinon -1
            }
        });

        displayPage(currentPage);
    }

    // Fonction pour réinitialiser le tableau
    function resetTable() {
        sortedTabArbre = [...originalTabArbre]; // On réinitialise le tableau des arbres
        currentPage = 1;
        displayPage(currentPage);
        createPaginationControls();
    }

    // Fonction pour afficher les options de filtre
    function populateFilterOptions() {
        const revetementFilter = document.getElementById("filter_revetement");
        const remarquableFilter = document.getElementById("filter_remarquable");
        const arbEtatFilter = document.getElementById("filter_arb_etat");
        const portFilter = document.getElementById("filter_port");
        const situationFilter = document.getElementById("filter_situation");
        const clcSecteurFilter = document.getElementById("filter_clc_secteur");
        const feuillageFilter = document.getElementById("filter_feuillage");
        const stadedevFilter = document.getElementById("filter_stadedev");
        const nomtechFilter = document.getElementById("filter_nomtech");

        // Fonction pour récupérer les valeurs uniques d'une colonne
        //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Set
        const uniqueValues = (array, key) => [...new Set(array.map(item => item[key]))];

        // Fonction pour créer une option
        const createOption = (value) => {

            const option = document.createElement("option");
            option.value = value;
            // On remplace les valeurs 1 et 0 par Oui et Non
            if (value === "1") {
                value = "Oui";
            } else if (value === "0") {
                value = "Non";
            }
            option.text = value;
            return option;
        };

        // Fonction pour ajouter les options à un select
        const addOptionsToSelect = (select, values) => {
            const emptyOption = document.createElement("option");
            emptyOption.value = "";
            emptyOption.text = "Tous";
            select.appendChild(emptyOption);

            values.forEach(value => select.appendChild(createOption(value)));
        };

        // On récupère les valeurs uniques de chaque colonne et on les ajoute aux options de filtre
        addOptionsToSelect(revetementFilter, uniqueValues(originalTabArbre, "revetement"));
        addOptionsToSelect(remarquableFilter, uniqueValues(originalTabArbre, "remarquable"));
        addOptionsToSelect(arbEtatFilter, uniqueValues(originalTabArbre, "arb_etat"));
        addOptionsToSelect(portFilter, uniqueValues(originalTabArbre, "port"));
        addOptionsToSelect(situationFilter, uniqueValues(originalTabArbre, "situaton"));
        addOptionsToSelect(clcSecteurFilter, uniqueValues(originalTabArbre, "clc_secteur"));
        addOptionsToSelect(feuillageFilter, uniqueValues(originalTabArbre, "feuillage"));
        addOptionsToSelect(stadedevFilter, uniqueValues(originalTabArbre, "fk_stadedev"));
        addOptionsToSelect(nomtechFilter, uniqueValues(originalTabArbre, "fk_nomtech"));
    }

    // Applique les tris ou reset sur appui du bouton
    document.getElementById('sortButton').onclick = sortTable;
    document.getElementById('resetButton').onclick = resetTable;

    populateFilterOptions();
    displayPage(currentPage);
    createPaginationControls();

    // Ajout des événements onchange pour les filtres après le chargement de la page
    document.querySelectorAll('#filters select').forEach(select => {
        select.onchange = applyFilters;
    });
}

/**
 * Fonction pour afficher les arbres en fonction de l'âge
 * @param tab
 */
function display_tab_age(tab) {
    tab = JSON.parse(tab);
    console.log(tab);
    const tableBody = document.querySelector('#result_age_tab');
    tableBody.innerHTML = '';

    const headerRow = document.createElement('tr');
    for (const key in tab[0]) {
        const th = document.createElement('th');
        if (key.startsWith('age_estim')) {
            th.textContent = key.replace('age_estim_', '');
        } else {
            th.textContent = key;
        }
        headerRow.appendChild(th);
    }
    tableBody.appendChild(headerRow);

    tab.forEach(arbre => {
        const tr = document.createElement('tr');
        for (const key in arbre) {
            const td = document.createElement('td');
            if (key.startsWith('age_estim')) {
                td.textContent = Math.round(arbre[key]); // On arrondit l'âge estimé au supérieur
            } else {
                td.textContent = arbre[key];
            }
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    });

    create_age_map(tab)
}

function create_age_map(data){
    //TODO a appeler dans la callback du dessus

    var map = L.map('map').setView([49.846966079281266, 3.2874275441195704], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

// requête ajax pour récupérer les arbres en fonction de l'âge au chargement de la page
    for (let i = 0; i < Object.keys(data[0]).length; i++) {
        //console.log(data["latitude"][i]);
        L.circle([data[i]["latitude"], data[i]["longitude"]], {
            color: 'red',
            fillColor: 'red',
            fillOpacity: 0.2,
            radius: (data[i]["tronc_diam"]/62.8)
        }).addTo(map).bindPopup(
            'Hauteur totale : ' + data[i]["haut_tot"] +'m<br>'+
            'Hauteur tronc : ' + data[i]["haut_tronc"] +'m<br>'+
            'Remarquable : ' + (parseInt(data[i]["remarquable"])?'Oui':'Non') +'<br>'+
            'Feuillage : ' + data[i]["feuillage"] +'<br>'+
            'Stade dev : ' + data[i]["fk_stadedev"] +'<br>'+
            'Secteur : ' + data[i]["clc_secteur"] +'<br>'+
            'Id arbre : ' + data[i]["id_arbre"] +'<br>'
        );
    }


}
window.onload = function () {
    update_connect_state();
    ajaxRequest('GET', '../php/requests.php/info_arbre/', info_arbre);
}
