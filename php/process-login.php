<?php session_start();

$email = $_POST["email"];
$password = $_POST["password"];

$_SESSION["isLoggedIn"] = false;
//connect
include("./partials/dbconnect.php");

//prepare
$stmt = $pdo->prepare("SELECT * FROM `users` WHERE `users`.`email` ='$email'  AND `users`.`password` = '$password';");

//execute
if ($stmt->execute()) {
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo (json_encode($results));
    $_SESSION["isLoggedIn"] = true;
} else {
    $_SESSION["isLoggedIn"] = false;
}


//execute