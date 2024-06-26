<?php
require_once '../../DB.php';

class Port
{
    static function get_lines_substr_in_port($substring)
        /**
         * Pour autocompletion var categorielle ajout arbre
         * retourne les port qui contiennent la substring
         */
    {
        $db = DB::connexion();

        $request = "
            SELECT port FROM port
        WHERE LOWER(port) LIKE LOWER(concat('%', :substring, '%'))
            ";

        $statement = $db->prepare($request);
        $statement->bindParam(':substring', $substring);

        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_COLUMN);
    }


}