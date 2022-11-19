<?php
session_start();
require "./../module/fornisseur.php";

if(isset($_POST["singup"])){

    $_SESSION["pharmaci"] = false;
    $_SESSION["fornisseur"] = true;
    
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $adress = $_POST["adress"];
    $tel = $_POST["tel"];
    $fornisseur = new Fornisseur($username,$email,$password,$adress,$tel);
    $database = $fornisseur->conect_db();
    if($database!=false){
        $checkEmail = $fornisseur->verf_email($database);
        if($checkEmail==false){
            $addForniseur = $fornisseur->add_fornisseur($database);
            if($addForniseur==true){
                $_SESSION["accessPass"] = true;
                $fornisseur->Set_info_session($database);
                echo json_encode(["error"=>false]);
            }else{
                echo json_encode(["error"=>true,"message"=>"singup faild somthing went wrong"]);

            }
        }else{
            echo json_encode(["error"=>true,"message"=>"this email is already exist"]);
        }

    }else{
        echo json_encode(["error"=>true,"message"=>"error in database"]);

    }
}



?>