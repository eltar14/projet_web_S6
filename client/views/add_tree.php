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
    <div class="advice" id="add_tree_form_auth_advice">
        Veuillez vous connecter pour ajouter un arbre.
    </div>
    <div>
        <form autocomplete="off" id="add_tree_form" class="need_login">

            <div style="display: flex">
                <label for="longitude">Longitude :</label>
                <div class="autocomplete" style="width:450px; margin-bottom:1em">
                    <input type="number" id="longitude" name="longitude" required class="required">
                </div>
            </div>

            <div style="display: flex">
                <label for="latitude">Latitude :</label>
                <div class="autocomplete" style="width:450px; margin-bottom:1em">
                    <input type="number" id="latitude" name="latitude" required class="required">
                </div>
            </div>

            <div style="display: flex">
                <label for="haut_tot">Hauteur totale (en mètres) :</label>
                <div class="autocomplete" style="width:450px; margin-bottom:1em">
                    <input type="number" id="haut_tot" name="haut_tot" required class="required">
                </div>
            </div>

            <div style="display: flex">
                <label for="haut_tronc">Hauteur du tronc (en mètres) :</label>
                <div class="autocomplete" style="width:450px; margin-bottom:1em">
                    <input type="number" id="haut_tronc" name="haut_tronc" required class="required">
                </div>
            </div>

            <div style="display: flex">
                <label for="tronc_diam">Diamètre du tronc (en cm) :</label>
                <div class="autocomplete" style="width:450px; margin-bottom:1em">
                    <input type="number" id="tronc_diam" name="tronc_diam" required class="required">
                </div>
            </div>


            <div style="display: flex">
                <label for="revetement">Revêtement :</label>
                    <input type="checkbox" id="revetement" name="revetement">
            </div>

<!--            <div class="autocomplete" style="width:450px; margin-bottom:1em">-->
<!--                <label for="age_estim">Age estimé :</label>-->
<!--                <input type="number" id="age_estim" name="age_estim" required class="required">-->
<!--            </div>-->

            <div style="display: flex">
                <label for="clc_nbr_diag">Nombre de diags ? :</label>
                <div class="autocomplete" style="width:450px; margin-bottom:1em">

                    <input type="number" id="clc_nbr_diag" name="clc_nbr_diag" required class="required">
                </div>
            </div>

            <div style="display: flex">
                <label for="remarquable">Remarquable :</label>
                <div class="autocomplete" style="width:450px; margin-bottom:1em">
                    <input type="checkbox" id="remarquable" name="remarquable">
                </div>
            </div>



            <div style="display: flex">
                <label for="etat">État :</label>
                <div class="autocomplete" style="width:450px; margin-bottom:1em">
                    <input type="text" id="etat" name="etat" required class="required">
                </div>
            </div>

            <div style="display: flex">
                <label for="stadedev">Stade de Développement :</label>
                <div class="autocomplete" style="width:450px; margin-bottom:1em">
                    <input type="text" id="stadedev" name="stadedev" required class="required">
                </div>
            </div>

            <div style="display: flex">
                <label for="port">Port :</label>
                <div class="autocomplete" style="width:450px; margin-bottom:1em">
                    <input type="text" id="port" name="port" required class="required">
                </div>
            </div>

            <div style="display: flex">
                <label for="pied">Pied :</label>
                <div class="autocomplete" style="width:450px; margin-bottom:1em">
                    <input type="text" id="pied" name="pied" required class="required">
                </div>
            </div>

            <div style="display: flex">
                <label for="situation">Situation :</label>
                <div class="autocomplete" style="width:450px; margin-bottom:1em">
                    <input type="text" id="situation" name="situation" required class="required">
                </div>
            </div>

            <div style="display: flex">
                <label for="nomtech">Nom Technique :</label>
                <div class="autocomplete" style="width:450px; margin-bottom:1em">
                    <input type="text" id="nomtech" name="nomtech" required class="required">
                </div>
            </div>

            <div style="display: flex">
                <label for="villeca">Ville :</label>
                <div class="autocomplete" style="width:450px; margin-bottom:1em">
                    <input type="text" id="villeca" name="villeca" required class="required">
                </div>
            </div>

            <div style="display: flex">
                <label for="secteur">Secteur :</label>
                <div class="autocomplete" style="width:450px; margin-bottom:1em">
                    <input type="text" id="secteur" name="secteur" required class="required">
                </div>
            </div>

            <div style="display: flex">
                <label for="feuillage">Feuillage :</label>
                <div class="autocomplete" style="width:450px; margin-bottom:1em">
                    <input type="text" id="feuillage" name="feuillage" required class="required">
                </div>
            </div>

            <div style="margin-bottom:1em">
                <div id="add_tree_form_div_missing_values" class="error" style="display: none">Formulaire incomplet !</div>
                <div id="add_tree_form_div_success" class="success" style="display: none">Arbre ajouté avec succès.</div>
                <button type="submit" id="add_tree_button">Ajouter l'Arbre</button>
            </div>
        </form>
    </div>
</section>


<!-- <section class="main_content">
    <button id="testAjaxBtn">TEST vers console js</button>
</section> -->

</body>
<?=$footer?>

<script rel="script" src="../js/ajax.js"></script>
<script rel="script" src="../js/script.js"></script>

</html>