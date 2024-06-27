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







function submit_add_tree_form(e){
    console.error("CLICK!")
    /**
     * ============ AJOUT ARBRE via formumaire, on submit ===================
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

}

