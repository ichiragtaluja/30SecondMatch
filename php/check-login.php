<?php session_start();

if (!isset($_SESSION['isLoggedIn'])) {
    $_SESSION["isLoggedIn"] = false;
}

echo (json_encode($_SESSION["isLoggedIn"]));
