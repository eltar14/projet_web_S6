<?php

class Prediction
{
    function prediction($data)
    {
        $pythonScript = 'scriptage.py';
        $command = escapeshellcmd("python $pythonScript '$data'");
        $output = shell_exec($command);
        return $output;
        // récupère le json des prédictions des âges des arbres
    }
}
?>
