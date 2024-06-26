<?php
require_once "../views/nav.php";
require_once "../views/footer.php";

require_once "../views/predictionsPage.php";


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');

    if (isset($_GET['selectedRows']) && isset($_GET['nbcluster'])) {
        $data = urldecode($_GET['selectedRows']);
        $nbcluster = intval($_GET['nbcluster']);

        $clustering = new Clustering();
        $result = $clustering->cluster($data, $nbcluster);

        echo $result;
    } else {
        echo json_encode(["error" => "No data or cluster number received"]);
    }
}
?>
