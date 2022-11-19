<?php
session_start();
include "./../module/pharmaci.php";
if(isset($_POST["login"])){

    $_SESSION["pharmaci"] = true;
    $_SESSION["fornisseur"] = false;

    $email = $_POST["email"];
    $password = $_POST["password"];
    $pharmaci = new Pharmacie("",$email,$password,"","");
    $database = $pharmaci->conect_db();
    if($database!=false){
        $get_phar = $pharmaci->get_pharmaci($database);
        if($get_phar==true){
            $_SESSION["accessPass"] = "true";
            echo json_encode(["error"=>false]);
        }else{
            echo json_encode(["error"=>true,"message"=>"login faild"]);
            
        }
    }else{
        echo json_encode(["error"=>true,"message"=>"error database"]);
    }

}

?>