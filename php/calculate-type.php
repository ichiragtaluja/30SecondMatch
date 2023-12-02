<?php
include("./partials/dbconnect.php");

$combination = $_GET["combination"];

$stmt = $pdo->prepare("SELECT `type` FROM `types` WHERE `combination` = '$combination' ;");

$stmt->execute();

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo (json_encode($results));
