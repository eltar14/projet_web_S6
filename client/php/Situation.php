<?php
require_once '../../DB.php';

class Situation
{
    static function get_lines_substr_in_situation($substring)
        /**
         * Pour autocompletion var categorielle ajout arbre
         * retourne les situation qui contiennent la substring
         */
    {
        $db = DB::connexion();

        $request = "
            SELECT situaton FROM situation
        WHERE LOWER(situaton) LIKE LOWER(concat('%', :substring, '%'))
            ";

        $statement = $db->prepare($request);
        $statement->bindParam(':substring', $substring);

        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_COLUMN);
    }


}