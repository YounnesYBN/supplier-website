<?php 
session_start();
if(isset($_POST["logout"])){
    $_SESSION["accessPass"] = false;
    $_SESSION["id"] ="";
    $_SESSION["email"] ="";
    $_SESSION["username"] ="";
}


?>