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

    static function get_id_by_name($name)
    {
        $db = DB::connexion();
        $request = "
            SELECT id_etat FROM etat
        WHERE LOWER(arb_etat) LIKE LOWER(:name)
            ";

        $statement = $db->prepare($request);
        $statement->bindParam(':name', $name);

        $statement->execute();
        return $statement->fetch()[0];
    }

    static function add_etat($etat)
    {
        try
        {
        $db = DB::connexion();
        $request = "
        INSERT INTO etat(arb_etat) VALUES(:etat); 
        ";
        $statement = $db->prepare($request);
        $statement->bindParam(':etat', $etat);

        $statement->execute();
        return $db->lastInsertId();
        }
        catch (PDOException $exception)
        {
            error_log('Request error: ' . $exception->getMessage());
            return "error";
        }
    }

    static function get_id_x_add_etat($name){
        $id = Etat::get_id_by_name($name);
        if($id == NULL){
            $id = Etat::add_etat($name); //
        }
        return $id;
    }

}