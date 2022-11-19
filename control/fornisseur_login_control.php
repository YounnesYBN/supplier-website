<?php
session_start();
include "../module/fornisseur.php";
if(isset($_POST["login"])){
    
    $_SESSION["pharmaci"] = false;
    $_SESSION["fornisseur"] = true;

    $email = $_POST["email"];
    $password = $_POST["password"];
    $fornisseur = new Fornisseur("",$email,$password,"","");
    $database = $fornisseur->conect_db();
    if($database!=false){
        $get_for = $fornisseur->get_fornisseur($database);
        if($get_for==true){
            $_SESSION["accessPass"] = "true";
            $fornisseur->Set_info_session($database);
            echo "login succsess";
        }else{
            echo "login faild" ;
        }
    }else{
        echo "error in database";
    }

}

?>