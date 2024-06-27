function connect_user(id_user) {
    //$('#id_user').text(id_user);
    if (id_user !== null) {
        $('#incorrect_login').hide();
        closeForm()
        localStorage.setItem('id_user', id_user);
        update_connect_state()
    } else {
        $('#incorrect_login').show();
    }

}
// script connexion

//TODO refactor
function update_connect_state() {
    if (localStorage.getItem('id_user') !== null) { // si la personne est connectee
        $('#open-button').text('Disconnect');
        $('#add_tree_form').removeClass("need_login")
        $('#add_tree_form_auth_advice').hide()



    } else {
        $('#open-button').text('Connexion');
        $('#add_tree_form').addClass("need_login")
        $('#add_tree_form_auth_advice').show()

    }
}

function openForm() {
    if (localStorage.getItem('id_user') === null) {
        if (document.getElementById("myForm").style.display === "block") {
            document.getElementById("myForm").style.display = "none";
        } else {
            document.getElementById("myForm").style.display = "block";
        }

    } else {
        localStorage.removeItem('id_user');
        update_connect_state();
    }


}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

$('#login_submit_button').click(() => {
    ajaxRequest('GET', '../php/requests.php/connect_user/', connect_user, `user_email=${$('#login_email').val()}&user_password=${$('#login_password').val()}`);
});

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
        console.log('Sélection:', selectedRows);
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
            console.log(selectedRows);
            ajaxRequest('GET', '../php/requests.php/prediction/', display_tab_age,'selectedRows='+JSON.stringify(selectedRows));
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

function display_tab_age(tab){
    tab = JSON.parse(tab)
    document.getElementById('result_age_tab').innerHTML = ''
    console.log(tab)
    let table = document.getElementById('result_age_tab')
    let tr = document.createElement('tr')
    let th = document.createElement('th')
    th.textContent = 'Age prédit'
    tr.appendChild(th)
    table.appendChild(tr)
    console.warn(typeof(tab))
    for(i in tab){
        let tr = document.createElement('tr')
        let td = document.createElement('td')
        td.textContent = Math.round(tab[i]['age_estim'])
        tr.appendChild(td)
        table.appendChild(tr)
    }
}


function to_log(str) {
    console.log(str)
}
window.onload = function () {
    ajaxRequest('GET', '../php/requests.php/info_arbre/',info_arbre);
}
// AJAX request
$('#testAjaxBtn').click(() =>
    {
        ajaxRequest('GET', '../php/requests.php/get_id_x_add_etat/', to_log, `name=ABATTUXXE`);
    }
);



// SCRIPT AUTOCOMPLETION
/* https://www.w3schools.com/howto/howto_js_autocomplete.asp*/
/*execute a function when someone clicks in the document:*/
function autocomplete(inp, arr) {
    //console.warn(arr)
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/


    var a, b, i, val = inp.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false;}
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", inp.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    inp.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        /*b.innerHTML = "<strong>" + arr[i].substring(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substring(val.length);*/
        b.innerHTML += arr[i]
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
        });
        a.appendChild(b);
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}



// autocomplete etat
function autocomplete_aux_etat(data){
    autocomplete(document.getElementById("etat"), data)
}
$('#etat').on('input',
    () => {
        ajaxRequest('GET', '../php/requests.php/get_lines_substr_in_etat/', autocomplete_aux_etat, `substring=${$('#stadedev').val()}`);
    })
;

// autocomplete stadedev
function autocomplete_aux_stadedev(data){
    autocomplete(document.getElementById("stadedev"), data)
}
$('#stadedev').on('input',
    () => {
        ajaxRequest('GET', '../php/requests.php/get_lines_substr_in_stadedev/', autocomplete_aux_stadedev, `substring=${$('#stadedev').val()}`);
    })
;

// autocomplete port
function autocomplete_aux_port(data){
    autocomplete(document.getElementById("port"), data)
}
$('#port').on('input',
    () => {
        ajaxRequest('GET', '../php/requests.php/get_lines_substr_in_port/', autocomplete_aux_port, `substring=${$('#port').val()}`);
    })
;


// autocomplete pied
function autocomplete_aux_pied(data){
    autocomplete(document.getElementById("pied"), data)
}
$('#pied').on('input',
    () => {
        ajaxRequest('GET', '../php/requests.php/get_lines_substr_in_pied/', autocomplete_aux_pied, `substring=${$('#pied').val()}`);
    })
;

// autocomplete pied
function autocomplete_aux_situation(data){
    autocomplete(document.getElementById("situation"), data)
}
$('#situation').on('input',
    () => {
        ajaxRequest('GET', '../php/requests.php/get_lines_substr_in_situation/', autocomplete_aux_situation, `substring=${$('#situation').val()}`);
    })
;

// autocomplete nomtech
function autocomplete_aux_nomtech(data){
    autocomplete(document.getElementById("nomtech"), data)
}
$('#nomtech').on('input',
    () => {
        ajaxRequest('GET', '../php/requests.php/get_lines_substr_in_nomtech/', autocomplete_aux_nomtech, `substring=${$('#nomtech').val()}`);
    })
;

// autocomplete ville
function autocomplete_aux_ville(data){
    autocomplete(document.getElementById("villeca"), data)
}
$('#villeca').on('input',
    () => {
        ajaxRequest('GET', '../php/requests.php/get_lines_substr_in_ville/', autocomplete_aux_ville, `substring=${$('#villeca').val()}`);
    })
;

// autocomplete secteur
function autocomplete_aux_secteur(data){
    autocomplete(document.getElementById("secteur"), data)
}
$('#secteur').on('input',
    () => {
        ajaxRequest('GET', '../php/requests.php/get_lines_substr_in_secteur/', autocomplete_aux_secteur, `substring=${$('#secteur').val()}`);
    })
;

// autocomplete feuilage
function autocomplete_aux_feuillage(data){
    autocomplete(document.getElementById("feuillage"), data)
}
$('#feuillage').on('input',
    () => {
        ajaxRequest('GET', '../php/requests.php/get_lines_substr_in_feuillage/', autocomplete_aux_feuillage, `substring=${$('#feuillage').val()}`);
    })
;




// ======================







$('#add_tree_button').on('click', function (e){
    console.error("CLICK!")
    /**
     * ============ AJOUT ARBRE via formumaire, onclick btn ===================
     *
     * //https://stackoverflow.com/questions/42779823/how-to-submit-a-form-only-if-all-the-required-attr-fields-are-filled-using-boots#:~:text=%24(%27form%27,).submit()%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D)
     */
    e.preventDefault();
    var check = true;
    $('.required').each(function(){
        console.log("ch"); // ehhh marche pas
        // run other filter functions here
        if($(this).val().trim().length < 1){
            check = false;
        }
    });
    if(!check){
        //alert('something is missing');
        console.warn('something is missing')
        $('#add_tree_form_div_missing_values').show()
        $('#add_tree_form_div_success').hide()
    } else {
        console.warn("all fine")
        $('#add_tree_form_div_missing_values').hide()

        // all is fine
        //$(this).submit();

        let longitude =$('#longitude').val();
        let latitude = $('#latitude').val();
        let haut_tot = $('#haut_tot').val();
        let haut_tronc = $('#haut_tronc').val();
        let diam_tronc = $('#tronc_diam').val();
        let revetement = document.getElementById('revetement').checked; // marche pas en jquery ??!?
        let nbr_diag = $('#clc_nbr_diag').val();
        let remarquable = document.getElementById('remarquable').checked;
        let etat = $('#etat').val();
        let stadedev = $('#stadedev').val();
        let port = $('#port').val();
        let pied = $('#pied').val();
        let situation = $('#situation').val();
        let nomtech = $('#nomtech').val();
        let ville = $('#villeca').val();
        let secteur = $('#secteur').val();
        let feuillage = $('#feuillage').val();
        let id_user = localStorage.getItem('id_user');


        console.log(longitude, latitude, haut_tot, haut_tronc, diam_tronc, revetement, nbr_diag, remarquable,
            etat, stadedev, port, pied, situation, nomtech, ville, secteur, feuillage, id_user);



        ajaxRequest('POST', '../php/requests.php/add_tree/', ()=>{},   'latitude='+ latitude +
                                                                                            '&longitude=' +  longitude +
                                                                                            '&haut_tot=' + haut_tot +
                                                                                            '&haut_tronc=' + haut_tronc +
                                                                                            '&diam_tronc=' + diam_tronc +
                                                                                            '&revetement=' + revetement +
                                                                                            '&nbr_diag=' + nbr_diag +
                                                                                            '&remarquable=' + remarquable +
                                                                                            '&etat=' + etat +
                                                                                            '&stadedev=' + stadedev +
                                                                                            '&port=' + port +
                                                                                            '&pied=' + pied +
                                                                                            '&situation=' + situation +
                                                                                            '&nomtech=' + nomtech +
                                                                                            '&ville=' + ville +
                                                                                            '&secteur=' + secteur +
                                                                                            '&feuillage=' + feuillage +
                                                                                            '&id_user=' + id_user
        );
        $('#add_tree_form_div_success').show()

    }

});


// gestion bouton connexion
document.onload = function update_connect_state() {
    if (localStorage.getItem('id_user') !== null) { // si la personne est connectee
        $('#open-button').text('Disconnect');
        $('#add_tree_form').removeClass("need_login")
        $('#add_tree_form_auth_advice').hide()

    } else {
        $('#open-button').text('Connexion');
        $('#add_tree_form').addClass("need_login")
        $('#add_tree_form_auth_advice').show()

    }
}