<?php
require_once '../../DB.php';

class User
{
    /**
     *
     * return id_user si le couple id mdp est valide.
     * TODO : chiffrer les mdp dans la BDD
     * @param $email
     * @param $password
     * @return mixed
     */
    static function authenticate($email, $password)
    {
        $db = DB::connexion();
        $request = '
            SELECT id_user FROM user
            WHERE email_user =:email_user AND password_user=:password_user
            ';
        // password_user=crypt(:password_user,password_user)
        $statement = $db->prepare($request);
        $statement->bindParam(':email_user', $email);
        $statement->bindParam(':password_user', $password);
        $statement->execute();

        return $statement->fetch()['id_user'];
    }


}