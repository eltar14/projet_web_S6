<?php

    function predict($data)
    {
        $pythonScript = '../python/scriptage.py'; // Chemin relatif vers le script Python
        $target_dir = "../python"; // Chemin relatif vers le dossier de stockage des fichiers JSON
        // Créer un fichier temporaire car le JSON pourrait être trop grand pour être directement passé en argument
        $tempFile = tempnam($target_dir, 'data_');
        file_put_contents($tempFile, $data);
        // Création et exécution de la commande avec le JSON
        $command = "python \"$pythonScript\" \"$tempFile\"";
        $output = shell_exec($command);
        echo $output;
        // Suppression du fichier temporaire
        unlink($tempFile);
        // Retourne le nom du fichier JSON généré par le script Python
        return trim($output);
    }



?>
