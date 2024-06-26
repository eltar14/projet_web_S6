<?php
require_once '../../DB.php';

class Feuillage
{
    static function get_lines_substr_in_feuillage($substring)
        /**
         * Pour autocompletion var categorielle ajout arbre
         * retourne les feuillage qui contiennent la substring
         */
    {
        $db = DB::connexion();

        $request = "
            SELECT feuillage FROM feuillage
        WHERE LOWER(feuillage) LIKE LOWER(concat('%', :substring, '%'))
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
            SELECT id_feuillage FROM feuillage
        WHERE LOWER(feuillage) LIKE LOWER(:name)
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
        INSERT INTO feuillage(feuillage) VALUES(:name); 
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

    static function get_id_x_add_feuillage($name)
    {
        $id = Feuillage::get_id_by_name($name);
        if($id == NULL){
            $id = Feuillage::add($name);
        }
        return $id;
    }




}