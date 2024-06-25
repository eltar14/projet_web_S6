<?php
require_once '../../DB.php';
class Stadedev
{
    static function get_lines_substr_in_stadedev($substring)
        /**
         * Pour autocompletion var categorielle ajout arbre
         * retourne les stadedev qui contiennent la substring
         */
    {
        $db = DB::connexion();

        $request = "
            SELECT stadedev FROM stadedev
        WHERE LOWER(stadedev) LIKE LOWER(concat('%', :substring, '%'))
            ";

        $statement = $db->prepare($request);
        $statement->bindParam(':substring', $substring);

        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
}