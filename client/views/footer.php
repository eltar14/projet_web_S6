<?php
$site_root = '/client';

$footer2 = "
    <footer>
        No rights reserved, CIR26C
    </footer>
    ";


$footer = "
<footer>
    <div class='footer_main'>
        <div class='footer_grid'>
            <div class='footer_logo'>
                <img src='../views/img/logo.png' width='100em'>
            </div>
            <div class='footer_nav'>
                <div class='footer_socials'>
                <span class='subtitle'>Suivez-nous</></span>
                    <ul>
                        <li>
                            <a href='https://instagram.com'>
                                <img src='../views/img/logo_insta.png' alt='' width='32px'>
                            </a>
                        </li>
                        <li>
                            <a href='https://twitter.com'>
                                <img src='../views/img/logo_twitter.png' alt='' width='32px'>
                            </a>
                        </li>
                    </ul>
                </div>


                <div class='footer_links'>
                    <span class='subtitle'>NAVIGATION</span>

                    <ul>
                        <li>
                            <a href='$site_root/controllers/espace_presse.php'>Espace presse</a>

                        </li>
                        <li>
                            <a href='$site_root/controllers/contacte.php'>Nous contacter</a>

                        </li>
                        <li>
                            <a href='#'>Actualités</a>

                        </li>

                    </ul>
                </div>

            </div>
        </div>
    </div>
    <div class='footer_sub'>
        <div>
            <ul>
                <li>
                    ©2024 CIR26C - Antoine LE BOULCH - Tom LELIEVRE - Nathan SIMON
                </li>
                <li>
                    <a href='#'>Mentions légales</a>
                </li>
                <li>
                    <a href='#'>CGU</a>
                </li>
                <li>
                    <a href='$site_root/controllers/protection.php'>Politique de protection des données</a>
                </li>
                <li>
                    <a href='$site_root/controllers/cookies.php'>Politique de gestion des cookies</a>
                </li>
            </ul>
        </div>
    </div>
</footer>
";
