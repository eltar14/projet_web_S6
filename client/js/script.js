// Connexion de l'utilisateur
function connect_user(id_user) {
    //$('#id_user').text(id_user);
    if (id_user !== null){
        $('#incorrect_login').hide();
        closeForm()
        localStorage.setItem('id_user', id_user);
        update_connect_button()
    }else{
        $('#incorrect_login').show();
    }

}
// verification si user connecté au chargement de la page
window.onload = function update_connect_button() {
    if (localStorage.getItem('id_user') !== null){
        $('#open-button').text('Disconnect');

    }else{
        $('#open-button').text('Connexion');
    }
}
//TODO refactor
function update_connect_button() {
    if (localStorage.getItem('id_user') !== null){
        $('#open-button').text('Disconnect');

    }else{
        $('#open-button').text('Connexion');
    }
}
// gestion formulaire auth
function openForm() {
    if (localStorage.getItem('id_user') === null){
        if (document.getElementById("myForm").style.display === "block"){
            document.getElementById("myForm").style.display = "none";
        }else{
            document.getElementById("myForm").style.display = "block";
        }

    }else{
        localStorage.removeItem('id_user');
        update_connect_button();
    }


}
// fermeture formulaire auth button close
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

// AJAX request connexion (check user pwd match), returns id_user if OK. else null/ str vide.
$('#login_submit_button').click(() =>
    {
        ajaxRequest('GET', '../php/requests.php/connect_user/', connect_user, `user_email=${$('#login_email').val()}&user_password=${$('#login_password').val()}`);
    }
);

function to_log(str){
    console.log(str)
}
// AJAX request
$('#testAjaxBtn').click(() =>
    {
        ajaxRequest('GET', '../php/requests.php/get_lines_substr_in_stadedev/', to_log, `substring=${$('#testAjaxTxtInput').val()}`);
    }
);

// SCRIPT AUTOCOMPLETION
/* https://www.w3schools.com/howto/howto_js_autocomplete.asp*/
/*execute a function when someone clicks in the document:*/
function autocomplete(inp, arr) {
    console.warn(arr)
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