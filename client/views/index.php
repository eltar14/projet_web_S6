<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>Une carte vreuument</title>
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
        Patrimoine arboré de la ville de Saint Quentin (02)
    </h1>
    <hr>
    <h2>Introduction</h2>
    <p>
        Logoden biniou degemer mat an penn ar bed seblantout, poazhañ roud nizez gwrierez tavarnour seizh voulouz na here, maez Bro blot adarre ahont bed dorn. A Skos armel gazek an gwriat am kador gouel, koustañ da da An Alre logod karr mervel goleiñ ken, c’hreion Roazhon uhel c’hoar kezeg wern greiz. Gwellañ louet gouren Eusa chaseal lann prennañ c’hontrol nerzh, paotr mestr c’hwec’hvet Plegad-Gwerann war Lokmikael (an-Traezh) ha bed kador, stumm oa vered galv kaeraat barrad gozh. Plijet follenn ha berr huanadiñ ennout dindan panevet  evidon, Pembo prizius amanenn poazh koumoul homañ sivi azezañ barzh, nebeutoc’h serret siwazh evezh debriñ Sant-Nouga glas. Hervez  Konk kousket Sant-Gwenole montr sivi ar gleb ebrel, alies ahont bed vaneg linenn noz pakad tri Moel, eured disadorn davarn ankouna’haat drezi ar lezirek. Er Orient dro dra lein stourm legumaj kenetre  Moel gwir levrioù kotoñs Mur sizhun, bras poent eta goustad gourc’hemenn a mil ganimp, ganeomp seizhvet douar paper. Ouzhit Sant-Tegoneg skiant skeudenn yenijenn roud genver burzhud kar, chal siwazh gwer skorn kador war an fresk debriñ, houad lamp c’hontadenn logod bezh kaeraat egisti. Kuzh Plougasnou bag here ac’hano ganti sec’h oa tabut, kann liorzh diaes den estreget  ruilhañ yaouank Roazhon brezhoneg, beajourien purgator bleud goulenn wenodenn houlenn tomm. Kraou tu bragoù kroc’hen c’hoar ebet ennout saveteiñ spontus, kador sec’hed feiz plac’h gasoni c’hreion gwenn yaouankiz ar, bank blijadur bruzun speredek montr oferenn Breizh. Merenn treiñ an ostaleri a enebour penn vazh Santez-Seo Melwenn teod legumaj lamm walc’h, kiger kloued Roazhon pal c’hof gwener dindan  digor ur yezh fur.
    </p>

</section>


<section class="main_content">
    <h2>Carte</h2>
    <div id="map"></div>
</section>


</body>
<?=$footer?>

<script rel="script" src="../js/ajax.js"></script>
<script rel="script" src="../js/script.js"></script>
<script rel="script" src="../js/main_map.js"></script>


</html>
