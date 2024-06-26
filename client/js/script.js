function connect_user(id_user) {
    //$('#id_user').text(id_user);
    if (id_user !== null) {
        $('#incorrect_login').hide();
        closeForm()
        localStorage.setItem('id_user', id_user);
        update_connect_button()
    } else {
        $('#incorrect_login').show();
    }

}
// script connexion
window.onload = function update_connect_button() {
    if (localStorage.getItem('id_user') !== null) {
        $('#open-button').text('Disconnect');

    } else {
        $('#open-button').text('Connexion');
    }
}
//TODO refactor
function update_connect_button() {
    if (localStorage.getItem('id_user') !== null) {
        $('#open-button').text('Disconnect');

    } else {
        $('#open-button').text('Connexion');
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
        update_connect_button();
    }


}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

$('#login_submit_button').click(() => {
    ajaxRequest('GET', '../php/requests.php/connect_user/', connect_user, `user_email=${$('#login_email').val()}&user_password=${$('#login_password').val()}`);
});


function info_arbre(tab_arbre) {
    const tableBody = document.querySelector('#arbre_info');
    const itemsPerPage = 10;
    let currentPage = 1;
    let selectedRows = []; // Stocke les IDs des lignes sélectionnées

    function clearTableBody() {
        tableBody.innerHTML = '';
    }

    function handleCheckboxClick(arbre, isChecked) {
        const arbreId = arbre['id_arbre'];
        const existingIndex = selectedRows.findIndex(row => row['id_arbre'] === arbreId);
        if (isChecked) {
            if (existingIndex === -1) {
                selectedRows.push(arbre);
                console.log('Ajouté:', arbre); // Imprime les informations de l'arbre ajouté
            }
        } else {
            if (existingIndex !== -1) {
                console.log('Retiré:', selectedRows[existingIndex]); // Imprime les informations de l'arbre retiré
                selectedRows.splice(existingIndex, 1);
            }
        }
        console.log('Sélection:', selectedRows); // Imprime les informations de tous les arbres sélectionnés
    }
    function displayPage(page) {
        clearTableBody();
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = tab_arbre.slice(start, end);

        paginatedItems.forEach((arbre) => {
            const tr = document.createElement('tr');
            for (const key in arbre) {
                const td = document.createElement('td');
                td.textContent = arbre[key];
                tr.appendChild(td);
            }
            const tdCheckbox = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            // Coche la checkbox si l'ID de l'arbre est présent dans selectedRows
            checkbox.checked = selectedRows.some(row => row['id_arbre'] === arbre['id_arbre']);
            checkbox.onchange = (event) => handleCheckboxClick(arbre, event.target.checked);
            tdCheckbox.appendChild(checkbox);
            tr.appendChild(tdCheckbox);
            tableBody.appendChild(tr);
        });
    }
    function createPredictionButton() {
        const predictionBtn = document.createElement('button');
        predictionBtn.textContent = 'Prédire l\'âge';
        predictionBtn.className = 'btn';
        predictionBtn.onclick = () => {
            const selectedRowsData = encodeURIComponent(JSON.stringify(selectedRows));
            const predictionPageUrl = `predictionsPage.php?selectedRows=${selectedRowsData}`;
            window.open(predictionPageUrl, '_blank');
        };
        document.querySelector('#pagination').appendChild(predictionBtn);
    }

    function createPaginationControls() {
        const paginationContainer = document.querySelector('#pagination');
        paginationContainer.innerHTML = '';

        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Précédent';
        prevBtn.className = 'btn';
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                displayPage(currentPage);
            }
        };
        paginationContainer.appendChild(prevBtn);

        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Suivant';
        nextBtn.className = 'btn';
        nextBtn.onclick = () => {
            if (currentPage < Math.ceil(tab_arbre.length / itemsPerPage)) {
                currentPage++;
                displayPage(currentPage);
            }
        };
        paginationContainer.appendChild(nextBtn);

        // Ajouter le bouton de prédiction après les boutons de pagination
        createPredictionButton();
    }

    displayPage(currentPage);
    createPaginationControls();
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
        ajaxRequest('GET', '../php/requests.php/get_lines_substr_in_stadedev/', to_log, `substring=${$('#testAjaxTxtInput').val()}`);
    }
);

