<?php
require_once '../../DB.php';

class Ville
{
    static function get_lines_substr_in_ville($substring)
        /**
         * Pour autocompletion var categorielle ajout arbre
         * retourne les ville qui contiennent la substring
         */
    {
        $db = DB::connexion();

        $request = "
            SELECT villeca FROM villeca
        WHERE LOWER(villeca) LIKE LOWER(concat('%', :substring, '%'))
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
            SELECT villeca FROM villeca
        WHERE LOWER(villeca) LIKE LOWER(:name)
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
        INSERT INTO villeca(villeca) VALUES(:name); 
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

    static function get_id_x_add_villeca($name)
    {
        $id = Ville::get_id_by_name($name);
        if($id == NULL){
            $id = Ville::add($name);
        }
        return $id;
    }

}