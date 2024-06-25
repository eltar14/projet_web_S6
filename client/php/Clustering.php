<?php

class Clustering
{
    function cluster($data, $nbcluster)
    {
        $pythonScript = 'scriptcluster.py';
        $command = escapeshellcmd("python $pythonScript '$data' $nbcluster");
        $output = shell_exec($command);
        return $output;
        // renvoie le html de la map des clusters avec les anomalies
    }
}
?>
