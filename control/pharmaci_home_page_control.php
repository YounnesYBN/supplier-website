<?php 

session_start();
include "./../module/commands.php";
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
if(isset($_GET["get_info"])){
    $phaId = $_SESSION["id"];
    $username = $_SESSION["username"] ;
    $email = $_SESSION["email"] ;
    echo json_encode(["username"=>$username,"email"=>$email]);
}
if(isset($_GET['getdataR'])){
    $id_par=$_SESSION['id'];
    $command= new Commands("","",$id_par);
    $database= $command->connect_db();

    if($database!=false){
        $array_refusee=$command->get_all_command_refusee($database);
        $refusee=$command->convertDataToEncourRefusse($array_refusee);
        echo json_encode(["get_refusee" => $refusee]) ;

        
    }
     
};

if(isset($_GET['getdataA'])){
    $id_phar=$_SESSION['id'];
    $com= new Commands("","",$id_phar);
    $db=$com->connect_db();
    if($db!=false){
       $array=$com->get_all_command_annule($db);
       $com_annuler=$com->convertDataToannul($array);
       echo json_encode(["get_anul"=>$com_annuler]);
    }
    

        
    
}


?>