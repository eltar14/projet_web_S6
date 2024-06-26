<?php
require_once '../../DB.php';

class Tree
{

    static function get_info_arbre(){

        try{
            $db = DB::connexion();
            $statement = $db->prepare("SELECT 
    a.id_arbre,
    a.latitude,
    a.longitude,
    a.haut_tot,
    a.haut_tronc,
    a.tronc_diam,
    a.revetement,
    a.age_estim,
    a.clc_nbr_diag,
    a.remarquable,
    e.arb_etat,
    sd.stadedev,
    p.port,
    pi.pied,
    s.situaton,
    n.nomtech,
    v.villeca,
    u.nom_user,
    u.prenom_user,
    se.clc_secteur,
    f.feuillage
    FROM 
        arbre a
    JOIN 
        etat e ON a.id_etat = e.id_etat
    JOIN 
        stadedev sd ON a.id_stadedev = sd.id_stadedev
    JOIN 
        port p ON a.id_port = p.id_port
    JOIN 
        pied pi ON a.id_pied = pi.id_pied
    JOIN 
        situation s ON a.id_situation = s.id_situation
    JOIN 
        nomtech n ON a.id_nomtech = n.id_nomtech
    JOIN 
        villeca v ON a.id_villeca = v.id_villeca
    LEFT JOIN 
        user u ON a.id_user = u.id_user
    JOIN 
        secteur se ON a.id_secteur = se.id_secteur
    JOIN 
        feuillage f ON a.id_feuillage = f.id_feuillage ORDER BY id_arbre LIMIT 100;
    ");
            $statement->execute();
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);

            if (empty($result)){
                return "No info in database";
            }else{
                return $result;
            }

        }catch (PDOException $exception) {
            error_log('Connection error: '.$exception->getMessage());
            return false;
        }

    }
}