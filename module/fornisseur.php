<?php
// class  fornesseur 
class Fornisseur{

    
    private string $username;
    private string $email;
    private string $password;
    private string $adresse;
    private string $tel;

    public  function __construct(string $username="",string $email="",string $password="",string $adresse="",string $tel=""){
        
        $this-> username=$username;
        $this->email=$email;
        $this->password=$password;
        $this->adresse=$adresse;
        $this->tel=$tel;
    }
    public function conect_db(){
        try{
            $username="root";
            $passwordc='';
            $dsn='mysql:host=localhost;dbname=projet_db;port=3306;charset=utf8';
            $db= new PDO($dsn,$username,$passwordc);
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $db;

        } catch (PDOException $e){
            return false ;
        }
    }
    // function add fornisseur (sing up)
    public function add_fornisseur($database){
        $username=$this-> username;
        $email=$this->email;
        $pass=$this->password;
        $add=$this->adresse;
        $tel=$this->tel;
        // insertion dans la table  fornisseure
        try {
            $myreq=$database->prepare("INSERT INTO fornesseur(username,email,password,adress,tel) VALUES(?,?,?,?,?) ");
            $myreq->execute([$username,$email,$pass,$add,$tel]) ;
            return true;
        } catch (Exception $th) {
            return false;
        }
        
    }
    public function verf_email($database){
        $myreq3=$database->prepare("SELECT * FROM  fornesseur where email=?");
        $myreq3->execute(array(
            $this->email
        ));
        if($myreq3->fetch()){
            return true;
        }else{
            return false ;
        }
    }
    public function get_fornisseur($database){
                $myreq2=$database->prepare("SELECT * FROM fornesseur WHERE email=? AND password=?;");
                $myreq2->execute(array(
                    $this->email,$this->password
                ));
                if($myreq2->fetch()){
                    return true;
                }else{
                    return false;
                }
            }
    public function Set_info_session($database){
        $myreq=$database->prepare("SELECT * FROM  fornesseur where email=?");
        $myreq->execute(array(
            $this->email
        ));
        if($info=$myreq->fetch()){
            $id = $info["id_for"];
            $email = $info["email"];
            $username = $info["username"];
            $_SESSION["id"] = $id;
            $_SESSION["email"] = $email;
            $_SESSION["username"] = $username;
            
        }
    }
   
    
}

?>