<?php
session_start();

$_SESSION["isLoggedIn"];

if (!isset($_SESSION['isLoggedIn'])) {
    $_SESSION["isLoggedIn"] = false;
}

echo (json_encode($_SESSION["isLoggedIn"]));
