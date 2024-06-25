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