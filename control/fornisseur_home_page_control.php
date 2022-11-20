<?php 
session_start();
if(isset($_GET["checkAccess"])){

    if(isset($_SESSION["accessPass"])){
        if($_SESSION["accessPass"]){
            echo json_encode(["allow"=>true]);
        }else{
            echo json_encode(["allow"=>false]);
        }
    }else{
        echo json_encode(["allow"=>false]);
    }
}

                


if(isset($_POST["logout"])){
    $_SESSION["accessPass"] = false;
    $_SESSION["id"] ="";
    $_SESSION["email"] ="";
    $_SESSION["username"] ="";
}


?>