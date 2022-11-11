<?php
// class  fornesseur 
class Fornisseur{

    
    private  string $nom;
    private string $prenom;
    private string $email;
    private string $password;
    private string $adresse;
    private string $tel;

    public  function __construct( string $nom="",string $prenom="",string $email="",string $password="",string $adresse="",string $tel=""){
        $this-> nom=$nom;
        $this-> prenom=$prenom;
        $this->email=$email;
        $this->password=$password;
        $this->adresse=$adresse;
        $this->tel=$tel;
    }
    public function conect_db(){
        try{
            $username="root";
            $passwordc='';
            $dsn='musql:host=localhost;dbname=projet_db;port=3306;charset=utf8';
            $db= new PDO($dsn,$username,$passwordc);
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $db;

        } catch (PDOException $e){
            return false ;
        }
    }
    // function add fornisseur (sing up)
    public function add_fornisseur($database){
        $name=$this->nom;
        $prenom=$this-> prenom;
        $email=$this->email;
        $pass=$this->password;
        $add=$this->adresse;
        $tel=$this->tel;
        // insertion dans la table  fornisseure
        try {
            $myreq=$database->exec("INSERT INTO fornesseur(nom,prenom,email,password,adress,tel) VALUES('$name','$prenom','$email','$pass','$add','$tel') ");
            echo $myreq ? "<script>alert('tuple insert')</script>" : "<script>alert('problem d'insertion')</script>";

        } catch (\Throwable $th) {
            return false;
        }
        
    }
    public function verf_email(){
        $myreq3=$database->prepare("SELECT * FROM email=?");
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
   
    
}

?>