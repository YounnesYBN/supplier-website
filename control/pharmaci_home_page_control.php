<?php 
include "./../module/medicament_fornisseur.php";
include "./../module/commands.php";
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
if(isset($_GET["get_pharmaci_ord"])){
    $id_pharmaci = $_SESSION["id"];
    $pharmaciOrd = new Commands("","",$id_pharmaci);
    $db1 = $pharmaciOrd->connect_db();
    if($db1!=false){
        $ArrayOrders1 = $pharmaciOrd->get_all_command_encour_accepter($db1);
        $convert_ArrayOrders1 = $pharmaciOrd->convertDataToEncourAccepter($ArrayOrders1);
        echo json_encode(["encour_accepter_orders"=>$convert_ArrayOrders1]);
    }
}
if(isset($_GET["get_all_ord"])){
    $med_for = new Medicament_fornisseur();
    $db2 = $med_for->connect_bd();
    if($db2!=false){
        $ArrayAvalibalCommade = $med_for->get_all_med($db2);
        echo json_encode(["avalibal_com"=>$ArrayAvalibalCommade]);
    }
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

