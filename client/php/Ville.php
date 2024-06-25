<?php
require_once '../../DB.php';

class Ville
{
    static function get_lines_substr_in_ville($substring)
        /**
         * Pour autocompletion var categorielle ajout arbre
         * retourne les ville qui contiennent la substring
         */
    {
        $db = DB::connexion();

        $request = "
            SELECT villeca FROM villeca
        WHERE LOWER(villeca) LIKE LOWER(concat('%', :substring, '%'))
            ";

        $statement = $db->prepare($request);
        $statement->bindParam(':substring', $substring);

        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_COLUMN);
    }


}