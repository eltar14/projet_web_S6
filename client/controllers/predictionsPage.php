<?php
require_once "../views/nav.php";
require_once "../views/footer.php";
require_once ('../php/Prediction.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');

    if (!isset($_GET['selectedRows'])) {
        echo json_encode(["error" => "No data received"]);
        exit;
    }

    $data = urldecode($_GET['selectedRows']);
    error_log($data);
    error_log("aaaaaaa pourquoiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    $result = predict($data);


}
?>
