<?php
include("./partials/dbconnect.php");

$personality = $_GET["personality"];

$stmt = $pdo->prepare("SELECT * FROM `users` WHERE `personality` = '$personality' ;");

$stmt->execute();

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo (json_encode($results));
