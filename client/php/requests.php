<?php
require_once('../../DB.php');

require_once ('User.php');
require_once ('Tree.php')

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