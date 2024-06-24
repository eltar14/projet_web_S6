#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------

DROP TABLE IF EXISTS arbre;
DROP TABLE IF EXISTS quartier;
DROP TABLE IF EXISTS secteur;
DROP TABLE IF EXISTS etat;
DROP TABLE IF EXISTS stadedev;
DROP TABLE IF EXISTS port;
DROP TABLE IF EXISTS pied;
DROP TABLE IF EXISTS situation;
DROP TABLE IF EXISTS nomtech;
DROP TABLE IF EXISTS villeca;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS role_user;
DROP TABLE IF EXISTS feuillage;


#------------------------------------------------------------
# Table: secteur
#------------------------------------------------------------

CREATE TABLE secteur(
                        id_secteur  Int  Auto_increment  NOT NULL ,
                        clc_secteur Varchar (240) NOT NULL
    ,CONSTRAINT secteur_PK PRIMARY KEY (id_secteur)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: quartier
#------------------------------------------------------------

CREATE TABLE quartier(
                         id_quartier  Int  Auto_increment  NOT NULL ,
                         clc_quartier Varchar (240) NOT NULL ,
                         id_secteur   Int NOT NULL
    ,CONSTRAINT quartier_PK PRIMARY KEY (id_quartier)

    ,CONSTRAINT quartier_secteur_FK FOREIGN KEY (id_secteur) REFERENCES secteur(id_secteur)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: etat
#------------------------------------------------------------

CREATE TABLE etat(
                     id_etat  Int  Auto_increment  NOT NULL ,
                     arb_etat Varchar (80) NOT NULL
    ,CONSTRAINT etat_PK PRIMARY KEY (id_etat)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: stadedev
#------------------------------------------------------------

CREATE TABLE stadedev(
                         id_stadedev Int  Auto_increment  NOT NULL ,
                         stadedev    Varchar (80) NOT NULL
    ,CONSTRAINT stadedev_PK PRIMARY KEY (id_stadedev)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: port
#------------------------------------------------------------

CREATE TABLE port(
                     id_port Int  Auto_increment  NOT NULL ,
                     port    Varchar (80) NOT NULL
    ,CONSTRAINT port_PK PRIMARY KEY (id_port)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: pied
#------------------------------------------------------------

CREATE TABLE pied(
                     id_pied Int  Auto_increment  NOT NULL ,
                     pied    Varchar (80) NOT NULL
    ,CONSTRAINT pied_PK PRIMARY KEY (id_pied)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: situation
#------------------------------------------------------------

CREATE TABLE situation(
                          id_situation Int  Auto_increment  NOT NULL ,
                          situaton     Varchar (80) NOT NULL
    ,CONSTRAINT situation_PK PRIMARY KEY (id_situation)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: nomtech
#------------------------------------------------------------

CREATE TABLE nomtech(
                        id_nomtech Int  Auto_increment  NOT NULL ,
                        nomtech    Varchar (80) NOT NULL
    ,CONSTRAINT nomtech_PK PRIMARY KEY (id_nomtech)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: villeca
#------------------------------------------------------------

CREATE TABLE villeca(
                        id_villeca Int  Auto_increment  NOT NULL ,
                        villeca    Varchar (80) NOT NULL
    ,CONSTRAINT villeca_PK PRIMARY KEY (id_villeca)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: role_user
#------------------------------------------------------------

CREATE TABLE role_user(
                          id_role_user Int  Auto_increment  NOT NULL ,
                          role_user    Varchar (80) NOT NULL
    ,CONSTRAINT role_user_PK PRIMARY KEY (id_role_user)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: user
#------------------------------------------------------------

CREATE TABLE user(
                     id_user       Int  Auto_increment  NOT NULL ,
                     nom_user      Varchar (80) NOT NULL ,
                     prenom_user   Varchar (80) NOT NULL ,
                     password_user Varchar (80) NOT NULL ,
                     email_user    Varchar (256) NOT NULL ,
                     id_role_user  Int NOT NULL
    ,CONSTRAINT user_AK UNIQUE (email_user)
    ,CONSTRAINT user_PK PRIMARY KEY (id_user)

    ,CONSTRAINT user_role_user_FK FOREIGN KEY (id_role_user) REFERENCES role_user(id_role_user)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: feuillage
#------------------------------------------------------------

CREATE TABLE feuillage(
                          id_feuillage Int  Auto_increment  NOT NULL ,
                          feuillage    Varchar (80) NOT NULL
    ,CONSTRAINT feuillage_PK PRIMARY KEY (id_feuillage)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: arbre
#------------------------------------------------------------

CREATE TABLE arbre(
                      id_arbre     Int  Auto_increment  NOT NULL ,
                      latitude     Double Precision NOT NULL ,
                      longitude    Double Precision NOT NULL ,
                      haut_tot     Int NOT NULL ,
                      haut_tronc   Int NOT NULL ,
                      tronc_diam   Int NOT NULL ,
                      revetement   Bool NOT NULL ,
                      age_estim    Int ,
                      prec_estim   Int ,
                      clc_nbr_diag Int NOT NULL ,
                      remarquable  Bool NOT NULL ,
                      id_etat      Int NOT NULL ,
                      id_stadedev  Int NOT NULL ,
                      id_port      Int NOT NULL ,
                      id_pied      Int NOT NULL ,
                      id_situation Int NOT NULL ,
                      id_nomtech   Int NOT NULL ,
                      id_villeca   Int NOT NULL ,
                      id_user      Int ,
                      id_secteur   Int NOT NULL ,
                      id_feuillage Int NOT NULL
    ,CONSTRAINT arbre_PK PRIMARY KEY (id_arbre)

    ,CONSTRAINT arbre_etat_FK FOREIGN KEY (id_etat) REFERENCES etat(id_etat)
    ,CONSTRAINT arbre_stadedev0_FK FOREIGN KEY (id_stadedev) REFERENCES stadedev(id_stadedev)
    ,CONSTRAINT arbre_port1_FK FOREIGN KEY (id_port) REFERENCES port(id_port)
    ,CONSTRAINT arbre_pied2_FK FOREIGN KEY (id_pied) REFERENCES pied(id_pied)
    ,CONSTRAINT arbre_situation3_FK FOREIGN KEY (id_situation) REFERENCES situation(id_situation)
    ,CONSTRAINT arbre_nomtech4_FK FOREIGN KEY (id_nomtech) REFERENCES nomtech(id_nomtech)
    ,CONSTRAINT arbre_villeca5_FK FOREIGN KEY (id_villeca) REFERENCES villeca(id_villeca)
    ,CONSTRAINT arbre_user6_FK FOREIGN KEY (id_user) REFERENCES user(id_user)
    ,CONSTRAINT arbre_secteur7_FK FOREIGN KEY (id_secteur) REFERENCES secteur(id_secteur)
    ,CONSTRAINT arbre_feuillage8_FK FOREIGN KEY (id_feuillage) REFERENCES feuillage(id_feuillage)
)ENGINE=InnoDB;