<?php
require_once '../../DB.php';

class Pied
{
    static function get_lines_substr_in_pied($substring)
        /**
         * Pour autocompletion var categorielle ajout arbre
         * retourne les pied qui contiennent la substring
         */
    {
        $db = DB::connexion();

        $request = "
            SELECT pied FROM pied
        WHERE LOWER(pied) LIKE LOWER(concat('%', :substring, '%'))
            ";

        $statement = $db->prepare($request);
        $statement->bindParam(':substring', $substring);

        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_COLUMN);
    }


}