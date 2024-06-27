<?php

function deracinement_script($model_pkl_path, $dataset_json_path, $date, $out_html_path) {
    $pythonScript = '../python/map_script.py';
    $pythonScript = realpath($pythonScript);
    $command = escapeshellcmd("python3 $pythonScript $model_pkl_path $dataset_json_path $date $out_html_path");
    $output = shell_exec($command);
    return $output;
}

?>
