<?php
require_once '../../DB.php';

class Nomtech
{
    static function get_lines_substr_in_nomtech($substring)
        /**
         * Pour autocompletion var categorielle ajout arbre
         * retourne les nomtech qui contiennent la substring
         */
    {
        $db = DB::connexion();

        $request = "
            SELECT nomtech FROM nomtech
        WHERE LOWER(nomtech) LIKE LOWER(concat('%', :substring, '%'))
            ";

        $statement = $db->prepare($request);
        $statement->bindParam(':substring', $substring);

        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_COLUMN);
    }


}