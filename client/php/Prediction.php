<?php

class Prediction
{
    function predict($data)
    {
        $pythonScript = '../python/scriptage.py'; // Chemin relatif vers le script Python

        // Créer un fichier temporaire car le JSON pourrait être trop grand pour être directement passé en argument
        $tempFile = tempnam(sys_get_temp_dir(), 'data_');
        file_put_contents($tempFile, $data);

        // Création et exécution de la commande avec le JSON
        $command = "python \"$pythonScript\" \"$tempFile\"";
        $output = shell_exec($command);

        // Suppression du fichier temporaire
        unlink($tempFile);

        // Retourne le nom du fichier JSON généré par le script Python
        return trim($output);
    }
}


?>
