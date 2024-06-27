<?php
require_once('../../DB.php');

require_once ('User.php');
require_once ('Tree.php');
require_once ('Stadedev.php');
require_once ('Etat.php');
require_once ('Port.php');
require_once ('Pied.php');
require_once ('Situation.php');
require_once ('Nomtech.php');
require_once ('Ville.php');
require_once ('Secteur.php');
require_once ('Feuillage.php');
require_once ('Prediction.php');
require_once ('Clustering.php');



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
        //error_log($substring);
        $data = Stadedev::get_lines_substr_in_stadedev($substring);
    }elseif($requestRessource == 'get_lines_substr_in_etat'){
        $substring = $_GET["substring"];
        $data = Etat::get_lines_substr_in_etat($substring);
    }elseif($requestRessource == 'get_lines_substr_in_port'){
        $substring = $_GET["substring"];
        $data = Port::get_lines_substr_in_port($substring);
    }elseif($requestRessource == 'get_lines_substr_in_pied'){
        $substring = $_GET["substring"];
        $data = Pied::get_lines_substr_in_pied($substring);
    }elseif($requestRessource == 'get_lines_substr_in_situation'){
        $substring = $_GET["substring"];
        $data = Situation::get_lines_substr_in_situation($substring);
    }elseif($requestRessource == 'get_lines_substr_in_nomtech'){
        $substring = $_GET["substring"];
        $data = Nomtech::get_lines_substr_in_nomtech($substring);
    }elseif($requestRessource == 'get_lines_substr_in_ville'){
        $substring = $_GET["substring"];
        $data = Ville::get_lines_substr_in_ville($substring);
    }elseif($requestRessource == 'get_lines_substr_in_secteur'){
        $substring = $_GET["substring"];
        $data = Secteur::get_lines_substr_in_secteur($substring);
    }elseif($requestRessource == 'get_lines_substr_in_feuillage'){
        $substring = $_GET["substring"];
        $data = Feuillage::get_lines_substr_in_feuillage($substring);
    }elseif($requestRessource == 'get_id_x_add_etat'){
        $name = $_GET["name"]; // temp pour tests
        $data = Etat::get_id_x_add_etat($name);
    }elseif($requestRessource == 'prediction'){

        $d = $_GET['selectedRows'];
        $selectedRows = array_map('intval', explode(',', $d));
        $result = Tree::get_all_arbre_by_id($selectedRows);
        $result = array_map(function($arbre){
            $arbre['fk_stadedev'] = $arbre['stadedev'];
            $arbre['fk_nomtech'] = $arbre['nomtech'];
            unset($arbre['stadedev']);
            unset($arbre['nomtech']);
            return $arbre;
        }, $result);
        $result = json_encode($result);
        $result = predict($result);
        if (empty($result)) {
            $data = "error : No result received from the Python script";
        } else {
            $data = $result;
        }
    }elseif($requestRessource == 'clustering'){
        $nbcluster = intval($_GET['nbcluster']);
        $d = urldecode($_GET['selectedRows']);

        $clustering = new Clustering();
        $result = $clustering->cluster($d, $nbcluster);


        if (empty($result)) {
            $data = ["error" => "No result received from the Python script"];
        } else {
            $filePath = realpath('../python/' . $result);

            // vérifie si le fichier existe et est lisible
            if ($filePath && is_readable($filePath)) {
                $data = ["result" => $filePath];
            } else {
                $data = ["error" => "File not found or not readable"];
            }
        }
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
function post($db, $requestRessource){
    if($requestRessource == 'add_tree'){
        // ajout d'un arbre dans la base de donnees
        if (isset($_POST["latitude"], $_POST["longitude"], $_POST["haut_tot"], $_POST["haut_tronc"], $_POST["diam_tronc"], $_POST["revetement"], $_POST["nbr_diag"], $_POST["remarquable"], $_POST["etat"], $_POST["stadedev"], $_POST["port"], $_POST["pied"], $_POST["situation"], $_POST["nomtech"], $_POST["ville"], $_POST["secteur"], $_POST["feuillage"], $_POST["id_user"])){
            Tree::add($_POST["longitude"], $_POST["latitude"], $_POST["haut_tot"], $_POST["haut_tronc"], $_POST["diam_tronc"], $_POST["revetement"], $_POST["nbr_diag"], $_POST["remarquable"], $_POST["etat"], $_POST["stadedev"], $_POST["port"], $_POST["pied"], $_POST["situation"], $_POST["nomtech"], $_POST["ville"], $_POST["secteur"], $_POST["feuillage"], $_POST["id_user"]);
            header('HTTP/1.1 201 Created');
            exit();
        }else {
            header('HTTP/1.1 xxx error');
            exit();
        }
    }

    else{
        header('HTTP/1.1 xxx error');
        exit();
    }
}

// ========= PUT ==========

// ========= DELETE ==========