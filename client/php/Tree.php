<?php

class Tree
{

    static function get_info_arbre(){

        try{
            $db = DB::connexion();
            $statement = $db->prepare("SELECT * from arbre")
            $statement->execute();
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);

            if (empty($result)){
                return "No info in database";
            }else{
                return $result
            }

        }catch (PDOException $exception) {
            error_log('Connection error: '.$exception->getMessage());
            return false;
        }

    }
}