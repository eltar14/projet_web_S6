<?php
require_once '../../DB.php';

class Secteur
{
    static function get_lines_substr_in_secteur($substring)
        /**
         * Pour autocompletion var categorielle ajout arbre
         * retourne les secteur qui contiennent la substring
         */
    {
        $db = DB::connexion();

        $request = "
            SELECT clc_secteur FROM secteur
        WHERE LOWER(clc_secteur) LIKE LOWER(concat('%', :substring, '%'))
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
            SELECT id_secteur FROM secteur
        WHERE LOWER(clc_secteur) LIKE LOWER(:name)
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
        INSERT INTO secteur(clc_secteur) VALUES(:name); 
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


    static function get_id_x_add_secteur($name)
    {
        $id = Secteur::get_id_by_name($name);
        if($id == NULL){
            $id = Secteur::add($name);
        }
        return $id;
    }

}