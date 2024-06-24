function connect_user(id_user){
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
// script connexion
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

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

$('#login_submit_button').click(() =>
    {
        ajaxRequest('GET', '../php/requests.php/connect_user/', connect_user, `user_email=${$('#login_email').val()}&user_password=${$('#login_password').val()}`);
    }
);