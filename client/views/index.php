<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>Patrimoine arboré</title>
    <link rel="icon" type="image/x-icon" href="/client/views/img/logo.png">
    <!--    Our styles-->
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossorigin=""/>
    <!-- JS Scripts -->
    <!-- Make sure you put this AFTER Leaflet's CSS -->
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
            crossorigin=""></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.min.js"
            integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8=" crossorigin="anonymous"></script>

</head>
<?=$navbar?>

<body>

<section id="intro" class="main_content">
    <h1>
        Patrimoine arboré de la ville de Saint Quentin
    </h1>
    <hr>
    <p>Bienvenue sur notre site web, fruit d'un projet étudiant de troisième année à l'<a href="https://isen-caen.fr/">ISEN Caen</a>. Ce projet de trois semaines porte sur le patrimoine arboré de la ville de Sainte-Quentin dans l'Aisne (02), intégrant diverses disciplines telles que le Big Data, l'IA et le développement web.</p>

    <p> En Big Data, nous avons nettoyé et préparé les données. Grâce à l'IA (machine learning), nous avons développé des prédictions pour l'âge des arbres et leur risque de déracinement en cas de tempête. Enfin, sur la partie web, nous avons créé ce site où vous pouvez exploiter toutes ces fonctionnalités.</p>

    <p>    Sur notre site, vous pouvez accéder à toutes les données de notre base de données sur les arbres, trier et filtrer par différentes caractéristiques et même ajouter de nouveaux arbres si vous êtes authentifié. Vous pouvez également prédire l'âge des arbres. </p>

    <p> Explorez notre site et découvrez notre travail sur le patrimoine arboré de Saint-Quentin! </p>
</section>


<section class="main_content">
    <h2>Carte interactive du patrimoine arboré</h2>
    <p>Découvrez avec cette l'intégralité du patrimoine arboré de la ville.</p>
    <p>Pour avoir plus d'informations sur un arbre, il est possible de cliquer dessus.</p>
    <div id="map"></div>
</section>


</body>
<?=$footer?>

<script rel="script" src="../js/ajax.js"></script>
<script rel="script" src="../js/script.js"></script>
<script rel="script" src="../js/index.js"></script>



</html>
