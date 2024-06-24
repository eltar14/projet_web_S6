id_user = document.getElementById('id_user').innerText;


// script connexion
$('#login_submit_button').click(() =>
    {
        console.log("button pushed");
        console.log($('#login_email').val())
        console.log($('#login_password').val())
        // ajaxRequest('GET', 'php/request.php/tweets/', displayTweets);
    }
);