<?php
session_start();
include "../module/pharmaci.php";
if(isset($_POST['singup'])){

    $_SESSION["pharmaci"] = true;
    $_SESSION["fornisseur"] = false;

    $username=$_POST['userName'];
    $email=$_POST['email'];
    $adress=$_POST['adress'];
    $tel=$_POST['tel'];
    $password=$_POST['password'];
    $pharmacie= new Pharmacie($username,$email,$password,$adress,$tel);
    $database=$pharmacie->conect_db();
    if($database!=false){
        $verf_email=$pharmacie->verf_email($database);
        if($verf_email==false){
            $add_pharmacie=$pharmacie->add_pharmaci($database);
            if($add_pharmacie==true ){
                $_SESSION["accessPass"] = "true";
                $pharmacie->Set_info_session($database);
                echo json_encode(["error"=>false]);
            }else{
                echo json_encode(["error"=>true,"message"=>"singup faild"]);
                
            }
        }else{
            echo json_encode(["error"=>true,"message"=>"this email is exist "]);

        }

    }else{
        echo json_encode(["error"=>true,"message"=>"error database"]);
    }

}

?>