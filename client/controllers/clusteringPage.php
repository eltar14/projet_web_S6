<?php
require_once "../views/nav.php";
require_once "../views/footer.php";
require_once "../views/predictionsPage.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');

    if (!isset($_GET['nbcluster']) || !isset($_GET['selectedRows'])) {
        echo json_encode(["error" => "Missing parameters"]);
        exit;
    }

    $nbcluster = intval($_GET['nbcluster']);
    $data = urldecode($_GET['selectedRows']);
    $clustering = new Clustering();
    $result = $clustering->cluster($data, $nbcluster);

    if (empty($result)) {
        echo json_encode(["error" => "No result received from the Python script"]);
    } else {
        $filePath = realpath('../python/' . $result);

        // vérifie si le fichier existe et est lisible
        if ($filePath && is_readable($filePath)) {
            echo json_encode(["result" => $filePath]);
        } else {
            echo json_encode(["error" => "File not found or not readable"]);
        }
    }
}
?>
