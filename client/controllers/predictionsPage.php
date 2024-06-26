<?php
require_once "../views/nav.php";
require_once "../views/footer.php";

require_once "../views/predictionsPage.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');

    if (!isset($_GET['selectedRows'])) {
        echo json_encode(["error" => "No data received"]);
        exit;
    }

    $data = urldecode($_GET['selectedRows']);
    $prediction = new Prediction();
    $result = $prediction->predict($data);

    if (empty($result)) {
        echo json_encode(["error" => "No result received from the Python script"]);
    } else {
        $filePath = realpath('../python/' . $result);
        echo json_encode(["result" => $filePath]);
    }
}
?>