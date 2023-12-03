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
$dsn = "mysql:host=localhost;dbname=30-second-match;charset=utf8mb4";
$dbusername = "root";
$dbpassword = "";
$pdo = new PDO($dsn, $dbusername, $dbpassword);

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
