<?php
require_once '../../DB.php';

class Secteur
{
    static function get_lines_substr_in_secteur($substring)
        /**
         * Pour autocompletion var categorielle ajout arbre
         * retourne les secteur qui contiennent la substring
         */
    {
        $db = DB::connexion();

        $request = "
            SELECT clc_secteur FROM secteur
        WHERE LOWER(clc_secteur) LIKE LOWER(concat('%', :substring, '%'))
            ";

        $statement = $db->prepare($request);
        $statement->bindParam(':substring', $substring);

        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_COLUMN);
    }


}