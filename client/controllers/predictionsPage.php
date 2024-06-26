<?php
require_once "../views/nav.php";
require_once "../views/footer.php";

require_once "../views/predictionsPage.php";


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');

    if (isset($_GET['selectedRows'])) {
        $data = urldecode($_GET['selectedRows']);

        $prediction = new Prediction();
        $result = $prediction->predict($data);

        echo $result;
    } else {
        echo json_encode(["error" => "No data received"]);
    }
}


?>