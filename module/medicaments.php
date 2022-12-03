<?php
 class Medicament{
    private string $nom;

    public function __construct(string $nom = ""){
        $this->nom= $nom;
    }

    public function connect_db(){
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
     public function add_midec($database){
        try{
            $medic=$database->exec("INSERT INTO medicament(nom) values('$this->nom')");
            return true ;
        }catch(Exception $e){
            return false ;
        }

     }
     public function get_id_medic($database){
        try{
            $req=$database->prepare("call get_id(?)");
            $req->execute([$this->nom]);
            $result = $req->fetch();
            return $result["id_med"];
            
            
        }catch(Exception $e){
            return false;
        }
     }
     public function delete_medic($database,$id){
        try{
            $req2=$database->prepare(" DELETE FROM medicament where id_med=? ");
            $req2->execute([$id]);
            return true;
        }catch(Exception $e){
            return false;
        }
     }
}

?>