<?php

class Prediction
{
    function predict($data)
    {
        $pythonScript = '../python/scriptage.py'; // Chemin vers le script

        // on créé un fichier temporaire car le json pourrait être trop grand pour être directementt passé en argument
        $tempFile = tempnam(sys_get_temp_dir(), 'data_');
        file_put_contents($tempFile, json_encode($data));

        // création et exécution de la commande avec le json et le nombre de clusters
        $command = escapeshellcmd("python \"$pythonScript\" \"$tempFile\"");
        $output = shell_exec($command);

        // supression du fichier temporaire
        unlink($tempFile);

        return $output; // renvoie le résultat du script Python
    }
}
?>
