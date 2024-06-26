<?php
require_once '../../DB.php';

class Feuillage
{
    static function get_lines_substr_in_feuillage($substring)
        /**
         * Pour autocompletion var categorielle ajout arbre
         * retourne les feuillage qui contiennent la substring
         */
    {
        $db = DB::connexion();

        $request = "
            SELECT feuillage FROM feuillage
        WHERE LOWER(feuillage) LIKE LOWER(concat('%', :substring, '%'))
            ";

        $statement = $db->prepare($request);
        $statement->bindParam(':substring', $substring);

        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_COLUMN);
    }


}