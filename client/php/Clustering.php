<?php
require_once 'Tree.php';
    function cluster($nbcluster)

    {
        $pythonScript = '../python/scriptcluster.py';
        $pythonScript = realpath($pythonScript);

        // créer un fichier temporaire car le JSON pourrait être trop grand pour être directement passé en argument
        $target_dir = '../python';
        $tempFile = tempnam($target_dir, 'data_');

        $data = json_encode(Tree::get_info_arbre()) ;
        file_put_contents($tempFile, $data);

        // création et exécution de la commande avec le JSON et le nombre de clusters
        //$command = "python \"$pythonScript\" \"$tempFile\" $nbcluster";
        $command = "python {$pythonScript} {$tempFile} {$nbcluster}";
        //echo $command;
        $output = shell_exec($command);

        // suppression du fichier temporaire
        unlink($tempFile);
        //echo $output;

        //$output = stripslashes($output);
        // retourne le nom du fichier HTML généré par le script Python
        return trim($output);
    }

?>
