<?php
require_once "../views/nav.php";
require_once "../views/footer.php";

require_once "../views/predictionsPage.php";


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json'); // Définir l'en-tête de contenu comme JSON

    if (isset($_GET['selectedRows']) && isset($_GET['nbcluster'])) {
        $data = urldecode($_GET['selectedRows']); // Extraire les données JSON directement
        $nbcluster = intval($_GET['nbcluster']); // Convertir le nombre de clusters en entier

        $clustering = new Clustering();
        $result = $clustering->cluster($data, $nbcluster); // Envoyer les données JSON directement

        echo $result; // Renvoyer le contenu JSON généré
    } else {
        echo json_encode(["error" => "No data or cluster number received"]);
    }
}
?>
