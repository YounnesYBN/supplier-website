<?php 
session_start();
if(isset($_SESSION["accessPass"])){
    if($_SESSION["accessPass"]==false){
        header("Location:http://localhost/my-projects/school%20project/view/login%20fornisseur/fornisseur_login.html");
        exit();
    }
}else{
    header("Location:http://localhost/my-projects/school%20project/view/login%20fornisseur/fornisseur_login.html");
    exit();
    
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>fornisseur home</title>
    <link rel="stylesheet" href="./fornisseur_home.css">
    <script src="./../../../jquery-3.6.1.min.js"></script>
</head>
<body>
    <!-- start of error popup -->
  <div id="error_popup" style="display: none;">
    <div id="error_popup_child">
      <div id="error_header_pop">
        <p>Error</p>
      </div>
      <div id="error_underline">

      </div>
      <div id="error_message_pop">
        
      </div>
    </div>
  </div>
  <!-- end of error popup -->
  <!-- start of success popup -->
  <div id="success_popup" style="display: none">
    <div id="success_popup_child">
      <div id="success_header_pop">
        <p>Success</p>
      </div>
      <div id="success_underline">

      </div>
      <div id="success_message_pop">
      </div>
    </div>
  </div>
  <!-- end of success popup -->
    <!-- start_edite_popup -->
    <div id="edite_popup" style="display: none;">
        <div id="edite_popup_con">
            <div id="edite_popup_title">
                <h1>Edite Medicent .</h1>
                <div id="edite_popup_underline"></div>
            </div>
            <div id="edite_popup_info">
                <div id="edite_select_con">
                    <select name="" id="edite_select">
                        <option id="default" value="default">Choose a medicents</option>
                    </select>
                </div>
                <div id="first_two_ibt">
                    <div class="input-box">
                        <span class="details">Medicent Name</span>
                        <input type="text" placeholder="Enter your Name" required id="medicient_name_edite">
                    </div>
                    <div class="input-box">
                        <span class="details">Nubmer Of Medicents</span>
                        <input type="text" placeholder="enter the number" required id="number_of_medicents_edite" >
                    </div>
                </div>
                <div class="input-box">
                    <span class="details">Price For Each</span>
                    <input type="text" placeholder="Enter The Price" required id="price_edite" >
                </div>
            </div>
            <div id="edite_popup_buttons">
                <div id="edite_con">
                    <button id="edite">Edite</button>
                </div>
                <div id="cancel_empty_con">
                    <button id="empty">Empty</button>
                    <button id="cancel">Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <!-- end_edite_popup -->
<!--start delete popup -->
<div id="delete_popup" style="display: none;" >
    <div id="delete_popup_con">
        <div id="delete_popup_title">
            <h1>Delete Medicent .</h1>
            <div id="delete_popup_underline"></div>
        </div>
        <div id="delete_select_con">
            <select name="" id="delete_select">
                <option id="default" value="default">Choose a medicents</option>
            </select>
        </div>
        <div id="delete_popup_buttons">
            <div id="delete_cancel_con">
                <button id="delete">Delete</button>
            
                <button id="cancel_delete_popup">Cancel</button>
            </div>
        </div>
    </div>
</div>
<!--end delete popup -->

<!-- --------------------------------------------------------------------- -->
<!--start add popup -->
<div id="add_popup" style="display: none;">
    <div id="add_popup_con">
        <div id="add_popup_title">
            <h1>Add Medicent .</h1>
            <div id="add_popup_underline"></div>
        </div>
        <div id="add_popup_info">
            <div id="first_two_ibt">
                <div class="input-box">
                    <span class="details">Medicent Name</span>
                    <input type="text" placeholder="Enter your Name" required id="medicient_name">
                </div>
                <div class="input-box">
                    <span class="details">Nubmer Of Medicents</span>
                    <input type="text" placeholder="enter the number" required id="number_of_medicents" >
                </div>
            </div>
            <div class="input-box">
                <span class="details">Price For Each</span>
                <input type="text" placeholder="Enter The Price" required id="price" >
            </div>
        </div>
        <div id="add_popup_buttons">
            <div id="add_con">
                <button id="add">Add</button>
            </div>
            <div id="cancel_empty_con">
                <button id="empty">Empty</button>
                <button id="cancel">Cancel</button>
            </div>
        </div>
    </div>
</div>
<!--end add popup -->
<header>

</header>
<main>
    
    <div id="medicents_con">
        <div id="all_medicent">
            <div id="medicents_title">
                <p>All Your Medicents</p>
                <div id="underline_med"></div>
            </div>
            <div id="medicents_display">
                <div id="display_con">
                    <div id="display">
                        <div id="med">
                            <div id="medName">
                                <img src="./medisent.png" alt="" srcset="" width="30px">
                                <h3>Medisent</h3>
                            </div>
                            <div id="medstoke">
                                <img src="./store.png" alt="" srcset="" width="30px">
                                <h3>50</h3>
                            </div>
                            <div id="medprice">
                                <img src="./price.png" alt="" srcset="" width="30px">
                                <h3>100 DH</h3>
                            </div>
                        </div>
                                
                    </div>
                </div>
            </div>


        </div>
    </div>
    <div id="operation_con">

        <div id="operation_buttons">
            <div id="operation_title">
                <h2 >Operations</h2>
                <div id="underline">
                    
                </div>
            </div>
            <div id="all_buttons">
                <button id="add_med">Add medicine</button>
                <button id="delete_med">Delete medicine</button>
                <button id="edite_med">Edite medicine</button>
            </div>
            
        </div>
    </div>
</main>
<footer>
    
</footer>
<script src="./fornisseur_home.js"></script>
</body>
</html>