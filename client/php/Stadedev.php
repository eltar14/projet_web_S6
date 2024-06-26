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
        return $statement->fetchAll(PDO::FETCH_COLUMN);
    }

    static function get_id_by_name($name)
    {
        $db = DB::connexion();
        $request = "
            SELECT stadedev FROM stadedev
        WHERE LOWER(stadedev) LIKE LOWER(:name)
            ";

        $statement = $db->prepare($request);
        $statement->bindParam(':name', $name);

        $statement->execute();
        return $statement->fetch()[0];
    }

    static function add_stadedev($name)
    {
        try
        {
        $db = DB::connexion();
        $request = "
        INSERT INTO stadedev(stadedev) VALUES(:name); 
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

    static function get_id_x_add_stadedev($name)
    {
        $id = Stadedev::get_id_by_name($name);
        if($id == NULL){
            $id = Stadedev::add_stadedev($name);
        }
        return $id;
    }

}