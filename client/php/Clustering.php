<?php

class Clustering
{
    function cluster($data, $nbcluster)
    {
        $pythonScript = '../python/scriptcluster.py';

        // créer un fichier temporaire car le JSON pourrait être trop grand pour être directement passé en argument
        $tempFile = tempnam(sys_get_temp_dir(), 'data_');
        file_put_contents($tempFile, $data);

        // création et exécution de la commande avec le JSON et le nombre de clusters
        $command = "python \"$pythonScript\" \"$tempFile\" $nbcluster";
        $output = shell_exec($command);

        // suppression du fichier temporaire
        unlink($tempFile);

        // retourne le nom du fichier HTML généré par le script Python
        return trim($output);
    }
}

?>
