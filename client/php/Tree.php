<?php
require_once '../../DB.php';
require_once 'Etat.php';
require_once 'Stadedev.php';

require_once 'Port.php';
require_once 'Pied.php';
require_once 'Situation.php';
require_once 'Nomtech.php';
require_once 'Ville.php';
require_once 'Secteur.php';
require_once 'Feuillage.php';

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
        feuillage f ON a.id_feuillage = f.id_feuillage ORDER BY id_arbre;
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

    static function add($longitude, $latitude, $haut_tot, $haut_tronc, $tronc_diam, $revetement, $nbr_diags, $remarquable, $etat, $stadedev, $port, $pied, $situation, $nomtech, $villeca, $secteur, $feuillage, $id_user){
        //error_log('func add tree Tree');
        try{
            $db = DB::connexion();
            if (!is_null($longitude) && !is_null($latitude) && !is_null($haut_tot) && !is_null($haut_tronc) && !is_null($tronc_diam) && !is_null($revetement) && !is_null($nbr_diags) && !is_null($remarquable) && !is_null($etat) && !is_null($stadedev) && !is_null($port) && !is_null($pied) && !is_null($situation) && !is_null($nomtech) && !is_null($villeca) && !is_null($secteur) && !is_null($feuillage)){

                $id_etat = Etat::get_id_x_add_etat($etat);
                $id_stadedev = Stadedev::get_id_x_add_stadedev($stadedev);
                $id_port = Port::get_id_x_add_port($port);
                $id_pied = Pied::get_id_x_add_pied($pied);
                $id_situation = Situation::get_id_x_add_situation($situation);
                $id_nomtech = Nomtech::get_id_x_add_nomtech($nomtech);
                $id_ville = Ville::get_id_x_add_villeca($villeca);
                $id_secteur = Secteur::get_id_x_add_secteur($secteur);
                $id_feuillage = Feuillage::get_id_x_add_feuillage($feuillage);





                // cast des types
                $latitude = floatval($latitude);
                $longitude = floatval($longitude);

                $haut_tot = intval($haut_tot);
                $haut_tronc = intval($haut_tronc);
                $tronc_diam = intval($tronc_diam);
                $revetement = boolval($revetement);
                $nbr_diags = intval($nbr_diags);
                $remarquable = boolval($remarquable);
                $id_etat = intval($id_etat);
                $id_stadedev = intval($id_stadedev);
                $id_port = intval($id_port);
                $id_pied = intval($id_pied);
                $id_situation = intval($id_situation);
                $id_nomtech = intval($id_nomtech);
                $id_ville = intval($id_ville);
                $id_user = intval($id_user);
                $id_secteur = intval($id_secteur);
                $id_feuillage = intval($id_feuillage);


                /*
                error_log('id etat : '.$id_etat);
                error_log("id stade dev : ". $id_stadedev);
                error_log("id port : ". $id_port);
                error_log("id pied : ". $id_pied);
                error_log("id situation : ". $id_situation);
                error_log("id nomtech : ". $id_nomtech);
                error_log("id villeca : ". $id_ville);
                error_log("id secteur : ". $id_secteur);
                error_log("id feuilage : ". $id_feuillage);
                */




                $request = 'INSERT INTO arbre(latitude, longitude, haut_tot, haut_tronc, tronc_diam, revetement, clc_nbr_diag, remarquable, id_etat, id_stadedev, id_port, id_pied, id_situation, id_nomtech, id_villeca, id_user, id_secteur, id_feuillage)  
                            VALUES(:latitude, :longitude, :haut_tot, :haut_tronc, :tronc_diam, :revetement, :clc_nbr_diag, :remarquable, :id_etat, :id_stadedev, :id_port, :id_pied, :id_situation, :id_nomtech, :id_villeca, :id_user, :id_secteur, :id_feuillage) 
                ';


                $statement = $db->prepare($request);

                $statement-> bindParam(':latitude',  $latitude); // float
                $statement-> bindParam(':longitude', $longitude); // float
                $statement-> bindParam(':haut_tot', $haut_tot); // int
                $statement-> bindParam(':haut_tronc', $haut_tronc); // int
                $statement-> bindParam(':tronc_diam', $tronc_diam); // int
                $statement-> bindParam(':revetement', $revetement); // bool
                $statement-> bindParam(':clc_nbr_diag', $nbr_diags); // int
                $statement-> bindParam(':remarquable', $remarquable); // bool
                $statement-> bindParam(':id_etat', $id_etat); // int
                $statement-> bindParam(':id_stadedev', $id_stadedev); // int
                $statement-> bindParam(':id_port', $id_port); // int
                $statement-> bindParam(':id_pied', $id_pied); // int
                $statement-> bindParam(':id_situation', $id_situation); // int
                $statement-> bindParam(':id_nomtech', $id_nomtech); // int
                $statement-> bindParam(':id_villeca', $id_ville); // int
                $statement-> bindParam(':id_user', $id_user); // int
                $statement-> bindParam(':id_secteur', $id_secteur); // int
                $statement-> bindParam(':id_feuillage', $id_feuillage); // int



                $statement->execute();


            }//catch
        }
        catch (PDOException $exception)
        {
            error_log('Request error: '.$exception->getMessage());
            return false;
        }

    return true;


        // get tous les ids des categorielles, si pas existants creer
    }

    //une fonction qui fait une requete sql pour recupere toute les infos d'un arbre a partir d'un tableau d'id_arbre avec tout les join possible
     static function get_all_arbre_by_id($id_arbre){

         try {
            if (empty($id_arbre)) {
                return false;
            }
             $db = DB::connexion();
             //requete sql je veux recuperer l'id arbre haut_tot tronc diam nomtech stadedev haut tronc clc nbr diag par id arbre
                $request = 'SELECT arbre.id_arbre,arbre.age_estim,arbre.longitude,arbre.latitude,arbre.revetement,arbre.haut_tot, arbre.haut_tronc, arbre.tronc_diam, arbre.clc_nbr_diag,stadedev.stadedev, nomtech.nomtech, e.arb_etat, p.port, p2.pied, s.situaton, v.villeca, u.nom_user,u.prenom_user, se.clc_secteur, f.feuillage
                            FROM arbre
                            JOIN stadedev ON arbre.id_stadedev = stadedev.id_stadedev
                            JOIN nomtech ON arbre.id_nomtech = nomtech.id_nomtech
                            JOIN etat e on arbre.id_etat = e.id_etat
                            JOIN port p on arbre.id_port = p.id_port
                            JOIN pied p2 on arbre.id_pied = p2.id_pied
                            JOIN situation s on arbre.id_situation = s.id_situation
                            JOIN villeca v on arbre.id_villeca = v.id_villeca
                            JOIN secteur se on arbre.id_secteur = se.id_secteur
                            JOIN feuillage f on arbre.id_feuillage = f.id_feuillage
                            LEFT JOIN user u on arbre.id_user = u.id_user 

                            WHERE arbre.id_arbre IN ('.implode(',',$id_arbre).')';

             $statement = $db->prepare($request);
             $statement->execute();
             return $statement->fetchAll(PDO::FETCH_ASSOC);

         }catch (PDOException $exception){
             error_log('Request error: '.$exception->getMessage());
             return false;
         }

    }
     
}
             
