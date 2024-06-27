<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>Un tableau vreummant</title>
    <link rel="icon" type="image/x-icon" href="/client/views/img/logo.png">
    <!--    Our styles-->
    <link rel="stylesheet" href="../css/style.css">
    <!-- JS Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.min.js"
            integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8=" crossorigin="anonymous"></script>
</head>
<?=$navbar?>

<body>

<section class='main_content'>
    <h2>Formulaire de Tri</h2>
    <form>
        <label for="criteria">Critère de tri :</label>
        <select id="criteria" name="criteria">
            <option value="id_arbre">Arbre</option>

            <option value="haut_tot">Hauteur Totale</option>
            <option value="haut_tronc">Hauteur du Tronc</option>
            <option value="tronc_diam">Diamètre du Tronc</option>
            <option value="age_estim">Âge Estimé</option>
            <option value="clc_nbr_diag">Nombre de Diagnostics</option>
            <option value="remarquable">Remarquable</option>
            <option value="arb_etat">État de l'Arbre</option>
            <option value="stadedev">Stade de Développement</option>
            <option value="nomtech">Nom Technique</option>
            <option value="clc_secteur">Secteur</option>
            <option value="feuillage">Feuillage</option>
        </select>

        <label for="order">Ordre de tri :</label>
        <select id="order" name="order">
            <option value="croissant">Croissant</option>
            <option value="décroissant">Décroissant</option>
        </select>

        <button type="button" id="sortButton">Trier</button>
        <button type="button" id="resetButton">Annuler</button>
    </form>

    </br>
<table id="arbre_info">

</table>
    <div id="pagination">
    </div>

</section>

<section class="main_content">
    <table id="result_age_tab"></table>
</section>


</body>
<?=$footer?>

<script rel="script" src="../js/ajax.js"></script>
<script rel="script" src="../js/script.js"></script>


</html>