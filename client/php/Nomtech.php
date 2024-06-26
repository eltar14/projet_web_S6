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


    static function get_id_by_name($name)
    {
        $db = DB::connexion();
        $request = "
            SELECT id_nomtech FROM nomtech
        WHERE LOWER(nomtech) LIKE LOWER(:name)
            ";

        $statement = $db->prepare($request);
        $statement->bindParam(':name', $name);

        $statement->execute();
        return $statement->fetch()[0];
    }

    static function add($name){
        try
        {
            $db = DB::connexion();
            $request = "
        INSERT INTO nomtech(nomtech) VALUES(:name); 
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

    static function get_id_x_add_nomtech($name)
    {
        $id = Nomtech::get_id_by_name($name);
        if($id == NULL){
            $id = Nomtech::add($name);
        }
        return $id;
    }


}