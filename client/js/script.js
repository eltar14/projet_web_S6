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




function to_log(str) {
    console.log(str)
}

// AJAX request
$('#testAjaxBtn').click(() =>
    {
        ajaxRequest('GET', '../php/requests.php/get_id_x_add_etat/', to_log, `name=ABATTUXXE`);
    }
);
// gestion bouton connexion
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





