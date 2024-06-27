<?php

    function predict($data)
    {
        $pythonScript = '../python/scriptage.py';
        $pythonScript = realpath($pythonScript);
        $target_dir = "../python";
        $tempFile = tempnam($target_dir, 'data_');
        file_put_contents($tempFile, $data);
        // Création et exécution de la commande avec le JSON
        //$command = 'python {} ' . $pythonScript . ' ' . $tempFile;
        $command = "python {$pythonScript} {$tempFile}";
        $result = shell_exec($command);
        unlink($tempFile);
        return $result;
    }

?>
