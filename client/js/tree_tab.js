/***
 * Function to display the information of the trees in the table
 * @param tab_arbre
 */
function info_arbre(tab_arbre) {
    // Change keys in the data
    const updatedTabArbre = tab_arbre.map(arbre => {
        return {
            ...arbre,
            'fk_stadedev': arbre['stadedev'],
            'fk_nomtech': arbre['nomtech']
        };
    });
    //remove the keys that are not needed
    updatedTabArbre.forEach(arbre => {
        delete arbre['stadedev'];
        delete arbre['nomtech'];
    });

    const table = document.querySelector('#arbre_table'); // table element
    const tableBody = document.querySelector('#arbre_info');
    const itemsPerPage = 10; // number of items per page
    let currentPage = 1; // current page
    let selectedRows = []; // selected rows
    let sortedTabArbre = [...updatedTabArbre]; // copy of the tabArbre with spread operator
    const originalTabArbre = [...updatedTabArbre]; // Save the original data will be used to reset the sort

    // https://geeklecode.com/loperateur-spread-en-javascript-va-vous-simplifier-la-vie/

    /***
     * Function to clear the table body
     */
    function clearTableBody() {
        tableBody.innerHTML = '';
    }

    /***
     * Function to handle the click on the checkbox
     * @param arbre  // table
     * @param isChecked // boolean
     */
    function handleCheckboxClick(arbre, isChecked) {
        const arbreId = arbre['id_arbre'];
        const existingIndex = selectedRows.findIndex(row => row['id_arbre'] === arbreId); // find the index of the selected row

        // if the checkbox is checked and the row is not already selected, add the row to the selected rows
        // exisitingIndex === -1 means that the row is not already selected no existing row in selectedRows
        if (isChecked) {
            if (existingIndex === -1) {
                selectedRows.push(arbre);
                console.log('Ajouté:', arbre);
            }
        } else {
            // if the checkbox is unchecked and the row is already selected, remove the row from the selected rows
            if (existingIndex !== -1) {
                console.log('Retiré:', selectedRows[existingIndex]);
                selectedRows.splice(existingIndex, 1);
            }
        }
        console.log('Sélection mais que id_arbre:', selectedRows.map(row => row['id_arbre']));
    }

    /***
     * Function to display the page create table headers and rows with pagination
     * @param page
     */
    function displayPage(page) {
        clearTableBody();

        const start = (page - 1) * itemsPerPage; // start index
        const end = start + itemsPerPage; // end index
        const paginatedItems = sortedTabArbre.slice(start, end); // get the items for the current page

        const tableHeaders = document.createElement('tr');
        // create the table headers
        for (const key in paginatedItems[0]) {
            const th = document.createElement('th');
            th.textContent = key;
            tableHeaders.appendChild(th);
        }
        // create the checkbox header
        const thCheckbox = document.createElement('th');
        thCheckbox.textContent = 'Prédire l\'âge';
        tableHeaders.appendChild(thCheckbox);
        tableBody.appendChild(tableHeaders);

        // create the table rows
        paginatedItems.forEach((arbre) => {
            const tr = document.createElement('tr');
            for (const key in arbre) {
                if ((key === 'remarquable' || key === 'revetement') && arbre[key] === '1') {
                    arbre[key] = 'Oui';
                } else if ((key === 'remarquable' || key === 'revetement') && arbre[key] === '0') {
                    arbre[key] = 'Non';
                }
                // create the table data
                const td = document.createElement('td');
                td.textContent = arbre[key];
                tr.appendChild(td);
            }
            // create the checkbox
            const tdCheckbox = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            // check if the row is already selected
            checkbox.checked = selectedRows.some(row => row['id_arbre'] === arbre['id_arbre']);
            // handle the click on the checkbox
            checkbox.onchange = (event) => handleCheckboxClick(arbre, event.target.checked);
            tdCheckbox.appendChild(checkbox);
            tr.appendChild(tdCheckbox);
            tableBody.appendChild(tr);
        });
    }

    /***
     * Function to create the prediction button and do the get request to the predictions page
     *
     */
    function createPredictionButton() {
        // create the prediction button
        const predictionBtn = document.createElement('button');
        predictionBtn.textContent = 'Prédire l\'âge';
        predictionBtn.className = 'btn';
        // handle the click on the prediction button
        predictionBtn.onclick = () => {
            ajaxRequest('GET', '../php/requests.php/prediction/', display_tab_age,'selectedRows='+selectedRows.map(row => row['id_arbre']));
        };
        document.querySelector('#pagination').appendChild(predictionBtn);
    }

    /***
     * Function to create the pagination controls
     */
    function createPaginationControls() {
        const paginationContainer = document.querySelector('#pagination');
        paginationContainer.innerHTML = '';
        // create the previous button
        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Précédent';
        prevBtn.className = 'btn';
        // handle the click on the previous button
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                displayPage(currentPage);
            }
        };
        paginationContainer.appendChild(prevBtn);
        // create the next button
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Suivant';
        nextBtn.className = 'btn';
        // handle the click on the next button
        nextBtn.onclick = () => {
            // check if the current page is less than the total number of pages
            if (currentPage < Math.ceil(sortedTabArbre.length / itemsPerPage)) {
                currentPage++;
                displayPage(currentPage);
            }
        };

        paginationContainer.appendChild(nextBtn);
        createPredictionButton();
    }

    /***
     * Function to sort the table based on the selected criteria and order
     */
    function sortTable() {
        const criteria = document.getElementById("criteria").value;
        const order = document.getElementById("order").value;

        // create an index for the columns for each criteria
        const columnIndex = {
            "id_arbre": "id_arbre",
            "haut_tot": "haut_tot",
            "haut_tronc": "haut_tronc",
            "tronc_diam": "tronc_diam",
            "age_estim": "age_estim",
            "clc_nbr_diag": "clc_nbr_diag",
            "remarquable": "remarquable",
            "arb_etat": "arb_etat",
            "fk_stadedev": "fk_stadedev",  // updated key
            "fk_nomtech": "fk_nomtech",    // updated key
            "clc_secteur": "clc_secteur",
            "feuillage": "feuillage"
        };

        // sort the table based on the selected criteria and order, arguments are the two rows to compare
        sortedTabArbre.sort((a, b) => {
            // get the text of the two rows for the selected criteria
            let aText = a[columnIndex[criteria]];
            let bText = b[columnIndex[criteria]];

            // check if the text is a number
            if (!isNaN(parseFloat(aText)) && !isNaN(parseFloat(bText))) {
                // convert the text to a number
                aText = parseFloat(aText);
                bText = parseFloat(bText);
            }
            // check the order
            if (order === "croissant") {
                return aText > bText ? 1 : -1; // sort in ascending order
            } else {
                return aText < bText ? 1 : -1; // sort in descending order
            }
        });

        displayPage(currentPage); // display the current page
    }

    /***
     * Function to reset the table to the original state
     */
    function resetTable() {
        sortedTabArbre = [...originalTabArbre];
        currentPage = 1;
        displayPage(currentPage);
        createPaginationControls();
    }

    // handle the click on the sort button
    document.getElementById('sortButton').onclick = sortTable;
    document.getElementById('resetButton').onclick = resetTable;
    //
    displayPage(currentPage);
    createPaginationControls();
}

function display_tab_age(tab) {
    tab = JSON.parse(tab);
    console.log(tab);
    const tableBody = document.querySelector('#result_age_tab');
    tableBody.innerHTML = '';

    // Create table header row
    const headerRow = document.createElement('tr');
    for (const key in tab[0]) {
        const th = document.createElement('th');
        if (key.startsWith('age_estim')) {
            // Add model name to header
            th.textContent = key.replace('age_estim_', '');
        } else {
            th.textContent = key;
        }
        headerRow.appendChild(th);
    }
    tableBody.appendChild(headerRow);

    // Create table body rows
    tab.forEach(arbre => {
        const tr = document.createElement('tr');
        for (const key in arbre) {
            const td = document.createElement('td');
            if (key.startsWith('age_estim')) {
                // Round age_estim values
                td.textContent = Math.round(arbre[key]);
            } else {
                td.textContent = arbre[key];
            }
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    });
}


window.onload = function () {
    update_connect_state();
    ajaxRequest('GET', '../php/requests.php/info_arbre/',info_arbre);
}