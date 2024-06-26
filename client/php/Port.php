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




    static function get_id_by_name($name)
    {
        $db = DB::connexion();
        $request = "
            SELECT id_port FROM port
        WHERE LOWER(port) LIKE LOWER(:name)
            ";

        $statement = $db->prepare($request);
        $statement->bindParam(':name', $name);

        $statement->execute();
        return $statement->fetch()[0];
    }

    static function add_port($name){
        try
        {
            $db = DB::connexion();
            $request = "
        INSERT INTO port(port) VALUES(:name); 
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

    static function get_id_x_add_port($name)
    {
        $id = Port::get_id_by_name($name);
        if($id == NULL){
            $id = Port::add_port($name);
        }
        return $id;
    }
}