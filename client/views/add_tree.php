<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>Ajout arbre</title>
    <link rel="icon" type="image/x-icon" href="/client/views/img/logo.png">
    <!--    Our styles-->
    <link rel="stylesheet" href="../css/style.css">
    <!-- JS Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.min.js"
            integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8=" crossorigin="anonymous"></script>
</head>
<?=$navbar?>

<body>
<section class="main_content">
    <h1>Ajout d'un arbre dans la base de données</h1>
    <div>
        <form action="" method="">
            <p>
                <label for="longitude">Longitude :</label>
                <input type="number" id="longitude" name="longitude" required>
            </p>

            <p>
                <label for="latitude">Latitude :</label>
                <input type="number" id="latitude" name="latitude" required>
            </p>

            <p>
                <label for="haut_tot">Hauteur totale (en mètres) :</label>
                <input type="number" id="haut_tot" name="haut_tot" required>
            </p>

            <p>
                <label for="haut_tronc">Hauteur du tronc (en mètres) :</label>
                <input type="number" id="haut_tronc" name="haut_tronc" required>
            </p>

            <p>
                <label for="tronc_diam">Diamètre du tronc (en cm) :</label>
                <input type="number" id="tronc_diam" name="tronc_diam" required>
            </p>

            <p>
                <label for="revetement">Revêtement :</label>
                <input type="checkbox" id="revetement" name="revetement">
            </p>

<!--            <p>-->
<!--                <label for="age_estim">Age estimé :</label>-->
<!--                <input type="number" id="age_estim" name="age_estim" required>-->
<!--            </p>-->

            <p>
                <label for="prec_estim">Précision estimée :</label>
                <input type="number" id="prec_estim" name="prec_estim" required>
            </p>

            <p>
                <label for="clc_nbr_diag">Nombre de diags ? :</label>
                <input type="number" id="clc_nbr_diag" name="clc_nbr_diag" required>
            </p>

            <p>
                <label for="remarquable">Remarquable :</label>
                <input type="checkbox" id="remarquable" name="remarquable">
            </p>

            <p>
                <label for="etat">État :</label>
                <input type="text" id="etat" name="etat" required>
            </p>

            <p>
                <label for="stadedev">Stade de Développement :</label>
                <input type="text" id="stadedev" name="stadedev" required>
            </p>

            <p>
                <label for="port">Port :</label>
                <input type="text" id="port" name="port" required>
            </p>

            <p>
                <label for="pied">Pied :</label>
                <input type="text" id="pied" name="pied" required>
            </p>

            <p>
                <label for="situation">Situation :</label>
                <input type="text" id="situation" name="situation" required>
            </p>

            <p>
                <label for="nomtech">Nom Technique :</label>
                <input type="text" id="nomtech" name="nomtech" required>
            </p>

            <p>
                <label for="villeca">Ville :</label>
                <input type="text" id="villeca" name="villeca" required>
            </p>

            <p>
                <label for="secteur">Secteur :</label>
                <input type="text" id="secteur" name="secteur" required>
            </p>

            <p>
                <label for="feuillage">Feuillage :</label>
                <input type="text" id="feuillage" name="feuillage" required>
            </p>

            <p>
                <button type="submit">Ajouter l'Arbre</button>
            </p>
        </form>
    </div>
</section>
</body>
<?=$footer?>

<script rel="script" src="../js/ajax.js"></script>
<script rel="script" src="../js/script.js"></script>
</html>
