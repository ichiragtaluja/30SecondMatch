<?php session_start();
$_SESSION["isLoggedIn"] = false;
echo (json_encode($_SESSION["isLoggedIn"]));
