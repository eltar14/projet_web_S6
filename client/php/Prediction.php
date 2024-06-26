<?php

class Prediction
{
    function predict($data)
    {
        $pythonScript = '../python/scriptage.py'; // Chemin vers le script

        // Écrire les données JSON dans un fichier temporaire
        $tempFile = tempnam(sys_get_temp_dir(), 'data_');
        file_put_contents($tempFile, json_encode($data));

        // Construire la commande avec le chemin du fichier temporaire
        $command = escapeshellcmd("python \"$pythonScript\" \"$tempFile\"");
        $output = shell_exec($command);

        // Supprimer le fichier temporaire après utilisation
        unlink($tempFile);

        return $output; // renvoie le résultat du script Python
    }
}
?>
