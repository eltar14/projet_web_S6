<?php
require_once "../views/nav.php";
require_once "../views/footer.php";

require_once "../views/predictionsPage.php";



if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json'); // Définir l'en-tête de contenu comme JSON

    if (isset($_GET['selectedRows'])) {
        $data = urldecode($_GET['selectedRows']); // Extraire les données JSON directement

        $prediction = new Prediction();
        $result = $prediction->predict($data); // Envoyer les données JSON directement

        echo $result; // Renvoyer le contenu JSON généré
    } else {
        echo json_encode(["error" => "No data received"]);
    }
}


?>