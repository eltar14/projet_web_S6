<?php
require_once '../../DB.php';

class Situation
{
    static function get_lines_substr_in_situation($substring)
        /**
         * Pour autocompletion var categorielle ajout arbre
         * retourne les situation qui contiennent la substring
         */
    {
        $db = DB::connexion();

        $request = "
            SELECT situaton FROM situation
        WHERE LOWER(situaton) LIKE LOWER(concat('%', :substring, '%'))
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
            SELECT situaton FROM situation
        WHERE LOWER(situaton) LIKE LOWER(:name)
            ";

        $statement = $db->prepare($request);
        $statement->bindParam(':name', $name);

        $statement->execute();
        return $statement->fetch()[0];
    }


    static function add_situation($name){
        try
        {
            $db = DB::connexion();
            $request = "
        INSERT INTO situation(situaton) VALUES(:name); 
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

    static function get_id_x_add_situation($name)
    {
        $id = Situation::get_id_by_name($name);
        if($id == NULL){
            $id = Situation::add_situation($name);
        }
        return $id;
    }

}