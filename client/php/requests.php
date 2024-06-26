<?php
require_once('../../DB.php');

require_once ('User.php');
require_once ('Tree.php');
require_once ('Stadedev.php');


// Connection to the database
$db = DB::connexion();
if (!$db)
{
    header('HTTP/1.1 503 Service Unavailable');
    exit;
}

$requestMethod = $_SERVER['REQUEST_METHOD'];
$request = substr($_SERVER['PATH_INFO'], 1);
$request = explode('/', $request);
$requestRessource = array_shift($request);
//echo $requestRessource;

switch ($requestMethod){
    case "GET":
        get($db, $requestRessource);
    case "POST":
        post($db, $requestRessource);
    case "PUT":
        put($db, $requestRessource);
    case "DELETE":
        delete($db, $requestRessource, $request);
}



// ========= GET ==========

function get($db, $requestRessource)
{
    if($requestRessource == 'connect_user') {

        $user_email =  $_GET["user_email"];
        $user_password = $_GET["user_password"];
        $data = User::authenticate($user_email, $user_password);

    }else if($requestRessource == 'info_arbre'){
        $data = Tree::get_info_arbre();
        //var_dump($data);
    }elseif($requestRessource == 'get_lines_substr_in_stadedev') {
        $substring = $_GET["substring"];
        error_log($substring);
        $data = Stadedev::get_lines_substr_in_stadedev($substring);
    }

    // Envoi de la réponse au client.
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-control: no-store, no-cache, must-revalidate');
    header('Pragma: no-cache');
    header('HTTP/1.1 200 OK');
    echo json_encode($data);
    exit();
}


// ========= POST ==========

// ========= PUT ==========

// ========= DELETE ==========