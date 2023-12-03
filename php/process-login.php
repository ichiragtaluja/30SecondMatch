<?php session_start();

$email = $_POST["email"];
$password = $_POST["password"];

$_SESSION["isLoggedIn"] = false;
//connect
$dsn = "mysql:host=localhost;dbname=30-second-match;charset=utf8mb4";

$dbusername = "root";
$dbpassword = "";
$pdo = new PDO($dsn, $dbusername, $dbpassword);

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