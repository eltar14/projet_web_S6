<?php
ob_start();
require_once ("../class/User.php");
require_once ("../class/Playlist.php");

$user_id=User::Login();
$info=User::get_id($user_id);

?>

    <div id="id"><input id='id_user_home' type='text' style='display: none;' value=<?php echo $user_id ?>></div>
    <div id="id"><input id='tkt' type='text' style='display: none;' value=<?php echo $info ?>></div>


    <div class="sidebar">
        <a href="user_home.php">
            <div class="logo">

                <img src="../image/logo-removebg-preview-removebg-preview.png" alt="Logo" />

            </div>
        </a>

        <div class="navigation">
            <ul>
                <li>
                    <a href="user_account.php">
                        <span class="fa fa-home"></span>
                        <span>Your account</span>
                    </a>
                </li>


                <li>
                    <a href="#" id="your_library">
                        <span class="fa fas fa-book"></span>
                        <span>Your Library</span>
                    </a>
                </li>
            </ul>

            <ul>
                <li>
                    <a id="create_playlist" href="#">
                        <span class="fa fas fa-plus-square"></span>
                        <span>Create Playlist</span>
                    </a>
                </li>

                <li id="liked_song">
                    <a href="">
                        <span class="fa fas fa-heart"></span>
                        <span>Liked Songs</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>

    <div class="main-container" id="body">
        <div class="topbar">
            <div class="prev-next-buttons">
                <div class="search-box">
                    <form method="get">
                        <button type="submit" class="btn-search" id="loop"><ion-icon name="search-outline"></ion-icon></button>
                        <label>
                            <input type="text" id="search" class="input-search" placeholder="Type to Search...">
                            <select id="Select">
                                <option value="Album">Album</option>
                                <option value="Artist">Artist</option>
                                <option value="Music">Music</option>
                                <option value="Style">Style</option>
                                <option value="Annee">Year</option>
                            </select>
                        </label>
                    </form>
                </div>
            </div>
            <div class="navbar">
                <button type="button" style="display: flex; align-items: center;">
                    <a style="text-decoration: none;color=inherit;" href="user_logout.php">Log out</a>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg>
                </button>
            </div>
        </div>

        <div class="banana-playlist" >
            <div id="search_result"></div>
            <div class="list cs-hidden" id="autoWidth3">
            </div>
            <div id="search_scroll">
                <div class="button-container"></div>
            </div>

        </div>

        <div class="banana-playlist">
            <h2>Album</h2>
            <div class="button-container">
                <a class="prev" onclick="scrollToPrev()">&#10094;</a>
                <a class="next" onclick="scrollToNext()">&#10095;</a>
            </div>
            <div class="list cs-hidden" id="autoWidth"></div>

        </div>

        <div class="banana-playlist">
            <h2>Music</h2>
            <div class="button-container">
                <a class="prev" onclick="scrollToPrev2()">&#10094;</a>
                <a class="next" onclick="scrollToNext2()">&#10095;</a>
            </div>
            <div class="list cs-hidden" id="autoWidth1"></div>

        </div>

        <div  id='b_playlist' class="banana-playlist">
            <h2>Playlists</h2>
            <div class="button-container">
                <a class="prev" onclick="scrollToPrev3()">&#10094;</a>
                <a class="next" onclick="scrollToNext3()">&#10095;</a>
            </div>
            <div class="list cs-hidden" id="autoWidth2"></div>

        </div>
        <br><br><br><br><br>



        <footer id='footer' class="preview">
        </footer>


        <script src="../js/jquery3.4.1.js" defer></script>
        <script src="../js/ajax.js" defer></script>
        <script src="../js/accueuil.js" defer></script>
        <script src="../js/audio.js" defer></script>
        <script src="../js/carousel.js"></script>
<?php
$content_home = ob_get_clean();
require_once('template_home.php');