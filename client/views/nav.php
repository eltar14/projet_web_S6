<?php
$site_root = '/client';

$navbar = '
<section>
    <nav class="nav">
        <a href= "'.$site_root.'/controllers/index.php"  class="logo">
            <img src="../views/img/logo.png" alt="notre logo" height="70px">
        </a>

        <div class="nav-right">
            <a href="'.$site_root.'/controllers/#">Carte</a>
            <a href="'.$site_root.'/controllers/#">AAAA</a>
            <a href="'.$site_root.'/controllers/#">BBBB</a>
<!-- <a href="'.$site_root.'/controllers/#" class="disconnect">Disconnect</a> -->
                 <button id="open-button" onclick="openForm()">Connexion</button>

                            <div class="form-popup" id="myForm">
                                <form action="" class="form-container">
                                    <h1>Login</h1>
                        
                                    <label for="email"><b>Email</b></label>
                                    <input id="login_email" type="text" placeholder="Enter Email" name="email" required>
                        
                                    <label for="psw"><b>Password</b></label>
                                    <input id="login_password" type="password" placeholder="Enter Password" name="psw" required>
                        
                                    <button type="button" class="btn" id="login_submit_button">Login</button>
                                    <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
                                </form>
                            </div>

                    
        </div>
    </nav>
    <script rel="script" src="../js/nav_script.js"></script>
</section>
';

