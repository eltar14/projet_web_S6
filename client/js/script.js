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
/**
 * verifie si l'utilisateur est connecte et change les comportements en fonction
 */
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

/**
 * ouvrir le form de connexion
 */
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

/**
 * fermer le form de connexion
 */
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

/**
 * appel bdd pour verif couple login mdp
 */
$('#login_submit_button').click(() => {
    ajaxRequest('GET', '../php/requests.php/connect_user/', connect_user, `user_email=${$('#login_email').val()}&user_password=${$('#login_password').val()}`);
});




function to_log(str) {
    console.log(str)
}


// gestion bouton connexion
/**
 * gestion de l'etat de connexion au chargement de la page.
 * Si l'user est deja connecté, inutile de le faire a nouveau.
 */
window.onload = function update_connect_state() {
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





