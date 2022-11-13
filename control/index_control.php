
<?php
session_start();
if(isset($_POST["choice"])){
    $choice = $_POST["choice"];
    if($choice == "pharmaci"){
        $_SESSION["pharmaci"] = true;
        $_SESSION["fornisseur"] = false;
    }else{
        $_SESSION["pharmaci"] = false;
        $_SESSION["fornisseur"] = true;
    }
}
print_r($_SESSION)

?>