<?php

$questionId = $_GET["question-id"];

include("./partials/dbconnect.php");

$success = true;

$stmt = $pdo->prepare("DELETE FROM `questions` WHERE `questions`.`question-id` = '$questionId';");

$stmt->execute();


if ($success) {
    echo '{"success": "true"}';
} else {
    echo '{"success": "false"}';
}
