<?php session_start();

$name = $_POST["name"];
$email = $_POST["email"];
$DOB = $_POST["dob"];
$password = $_POST["password"];
$personality = $_POST["personality"];
$image = NULL;

$_SESSION["isLoggedIn"] = false;


$dob = new DateTime($DOB);
$today = new DateTime();
$interval = $today->diff($dob);
$age = $interval->y;

// Connect to the database
include("./partials/dbconnect.php");

$success = true;

$stmt = $pdo->prepare("INSERT INTO `users` (`user-id`, `name`, `age`, `personality`, `image`, `email`, `password`) VALUES (NULL, '$name', '$age', '$personality', '$image', '$email', '$password');");

$stmt->execute();

if ($success) {
    echo '{"success": "true"}';
    $_SESSION["isLoggedIn"] = true;
} else {
    echo '{"success": "false"}';
    $_SESSION["isLoggedIn"] = false;
}
