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


    static function get_id_by_name($name)
    {
        $db = DB::connexion();
        $request = "
            SELECT pied FROM pied
        WHERE LOWER(pied) LIKE LOWER(:name)
            ";

        $statement = $db->prepare($request);
        $statement->bindParam(':name', $name);

        $statement->execute();
        return $statement->fetch()[0];
    }


    static function add_pied($name){
        try
        {
            $db = DB::connexion();
            $request = "
            INSERT INTO pied(pied) VALUES(:name); 
            ";

            $statement = $db->prepare($request);
            $statement->bindParam(':name', $name);

            $statement->execute();
            return $db->lastInsertId();

        }
        catch (PDOException $exception)
        {
            error_log('Request error: ' . $exception->getMessage());
            return "error";
        }
    }

    static function get_id_x_add_pied($name)
    {
        $id = Pied::get_id_by_name($name);
        if($id == NULL){
            $id = Pied::add_pied($name);
        }
        return $id;
    }

}