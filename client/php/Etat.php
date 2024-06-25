<?php
require_once '../../DB.php';
class Etat
{
    static function get_lines_substr_in_etat($substring)
        /**
         * Pour autocompletion var categorielle ajout arbre
         * retourne les etat qui contiennent la substring
         */
    {
        $db = DB::connexion();

        $request = "
            SELECT arb_etat FROM etat
        WHERE LOWER(arb_etat) LIKE LOWER(concat('%', :substring, '%'))
            ";

        $statement = $db->prepare($request);
        $statement->bindParam(':substring', $substring);

        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_COLUMN);
    }
}