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
    const itemsPerPage = 100;
    let currentPage = 1;

    function clearTableBody() {
        tableBody.innerHTML = '';
    }

    function displayPage(page) {
        clearTableBody();
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = tab_arbre.slice(start, end);

        if (page === 1) {
            const tableHead = document.createElement('thead');
            const trHead = document.createElement('tr');
            for (const key in tab_arbre[0]) {
                const th = document.createElement('th');
                th.textContent = key;
                trHead.appendChild(th);
            }
            tableHead.appendChild(trHead);
            tableBody.appendChild(tableHead);
        }

        // Créer les lignes pour les éléments de la page actuelle
        paginatedItems.forEach(arbre => {
            const tr = document.createElement('tr');
            for (const key in arbre) {
                const td = document.createElement('td');
                td.textContent = arbre[key];
                tr.appendChild(td);
            }
            tableBody.appendChild(tr);
        });
    }

    function createPaginationControls() {
        const paginationContainer = document.querySelector('#pagination');
        paginationContainer.append('');


        // Bouton précédent
        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Précédent';
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                displayPage(currentPage);
            }
        };
        paginationContainer.appendChild(prevBtn);

        // Bouton suivant
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Suivant';
        nextBtn.onclick = () => {
            if (currentPage < Math.ceil(tab_arbre.length / itemsPerPage)) {
                currentPage++;
                displayPage(currentPage);
            }
        };
        paginationContainer.appendChild(nextBtn);
    }

    displayPage(currentPage); // Afficher la première page au chargement
    createPaginationControls(); // Créer les contrôles de pagination
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