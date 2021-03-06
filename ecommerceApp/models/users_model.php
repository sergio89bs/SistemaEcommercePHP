
<?php 

//Requerimos una vez la pagina con la funcion conection()
require_once "conection_database.php";

class UsersModel{

    /* -------------------------------------------------------------------------- */
    /*                     METODO PARA REGISTRAR A UN USUARIO                     */
    /* -------------------------------------------------------------------------- */
    public static function signUpUsersModel($table,$dates){

        $stmt=Conection::conectDB()->prepare("INSERT INTO $table(username,email,password,picture)
        VALUES( :username, :email, :password, :picture)");
        $stmt -> bindParam(":username",$dates["username"], PDO::PARAM_STR);
		$stmt -> bindParam(":email", $dates["email"], PDO::PARAM_STR);
		$stmt -> bindParam(":password", $dates["password"], PDO::PARAM_STR);
		$stmt -> bindParam(":picture", $dates["picture"], PDO::PARAM_STR);
         
        if($stmt->execute()){
            return "okay";
        }else{
            return "error";
        }
        
      
        $stmt = null;
    }

    /* -------------------------------------------------------------------------- */
    /*                       METODO PARA EL INICIO DE SESION                      */
    /* -------------------------------------------------------------------------- */

    public static function valSignInModel($table,$dates,$dat){

        $stmt =Conection::conectDB()->prepare("SELECT * FROM $table WHERE username = :username AND password = :pass ");
        $stmt ->bindParam(":username",$dates,PDO::PARAM_STR);
        $stmt ->bindParam(":pass",$dat, PDO::PARAM_STR);

        $stmt -> execute();

		return $stmt -> fetch();
        
		$stmt = null;
    }


    
    /* -------------------------------------------------------------------------- */
    /*                    METODO PARA VERIFICAR EMAIL REPETIDO USUARIO EN LINEA                    */
    /* -------------------------------------------------------------------------- */
    public static function checkEmailModel($table,$value){

        $stmt=Conection::conectDB()->prepare("SELECT * FROM $table WHERE email = :value");
        $stmt -> bindParam(":value", $value, PDO::PARAM_STR);
    
		$stmt -> execute();

		return $stmt -> fetch();
        
		$stmt = null;
    }

     /* -------------------------------------------------------------------------- */
    /*                    METODO PARA MOSTRAR LAS COMPRAS DEL USUARIO                   */
    /* -------------------------------------------------------------------------- */
    public static function showOrderModel($table,$row,$valueRow){

        $stmt=Conection::conectDB()->prepare("SELECT * FROM $table WHERE $row = :value ");
        $stmt -> bindParam(":value", $valueRow, PDO::PARAM_STR);
    
		$stmt -> execute();

		return $stmt -> fetchAll();
        
		$stmt = null;
    }
   



    /* -------------------------------------------------------------------------- */
    /*                    METODO PARA MOSTRAR LA LISTA DE DESEOS                 */
    /* -------------------------------------------------------------------------- */
    public static function showWhisesModel($table,$row,$valueRow){

        $stmt=Conection::conectDB()->prepare("SELECT * FROM $table WHERE $row = :value");
        $stmt -> bindParam(":value", $valueRow, PDO::PARAM_STR);

		$stmt -> execute();

		return $stmt -> fetchAll();
        
		$stmt = null;
    }

    /* -------------------------------------------------------------------------- */
    /*                    METODO PARA MOSTRAR LAS CALIFICACIONES DE LOS PRODUCTOS                  */
    /* -------------------------------------------------------------------------- */
    public static function showRatesModel($table,$idProduct,$idUser){

        if($idUser != null){
            $stmt=Conection::conectDB()->prepare("SELECT * FROM $table WHERE id_product = :value AND id_user = :value2 ");
            $stmt -> bindParam(":value", $idProduct, PDO::PARAM_STR);
            $stmt -> bindParam(":value2",$idUser, PDO::PARAM_STR);
        
            $stmt -> execute();
    
            return $stmt -> fetch();
            
            $stmt = null;
        }
        // SI EL ID DE USUARIO VIENE VACIO, RETORNA TODAS LAS VALORACIONES
        else{
            $stmt=Conection::conectDB()->prepare("SELECT * FROM $table WHERE id_product = :value ");
            $stmt -> bindParam(":value", $idProduct, PDO::PARAM_STR);
            
         
            $stmt -> execute();
    
            return $stmt -> fetchAll();
            
            $stmt = null;
            
        }  
       
    
    }
     /* -------------------------------------------------------------------------- */
    /*                    METODO PARA ELIMINAR PRODUCTO DE LISTA DE DESEOS                  */
    /* -------------------------------------------------------------------------- */
    public static function removeWishModel($table,$dates){

        $stmt=Conection::conectDB()->prepare(" DELETE FROM $table WHERE id_user = :value AND id_product = :value2");
        $stmt -> bindParam(":value", $dates["idUser"], PDO::PARAM_STR);
        $stmt -> bindParam(":value2", $dates["idProd"], PDO::PARAM_STR);      
    
        if($stmt->execute()){
            return "okay";
        }else{
            return "error";
        }
        $stmt = null;
      
    }



    /* -------------------------------------------------------------------------- */
    /*              METODO PARA COMPROBAR SI HAY UN PRODUCTO EN LA LISTA DE DESEOS                     */
    /* -------------------------------------------------------------------------- */

    public static function checkWishListModel($table,$dates){

        $stmt=Conection::conectDB()->prepare("SELECT * FROM $table WHERE id_user = :value AND id_product = :value2");
        $stmt -> bindParam(":value", $dates["id_user"], PDO::PARAM_STR);
        $stmt -> bindParam(":value2", $dates["id_product"], PDO::PARAM_STR);
    
        $stmt -> execute();
    
        return $stmt -> fetch();
        
		$stmt = null;
    }

      /* -------------------------------------------------------------------------- */
    /*                    METODO PARA AGREGAR PRODUCTO A LISTA DE DESEOS                 */
    /* -------------------------------------------------------------------------- */
    public static function addProductListWishModel($table,$dates){

        $stmt=Conection::conectDB()->prepare("INSERT INTO $table(id_user,id_product) VALUES( :value,:value2)");
        $stmt -> bindParam(":value", $dates["idUser"], PDO::PARAM_STR); 
        $stmt -> bindParam(":value2", $dates["idProduct"], PDO::PARAM_STR);      
    
        if($stmt->execute()){
            return "okay";
        }else{
            return "error";
        }
        $stmt = null;
      
    }



    /* -------------------------------------------------------------------------- */
    /*                         METODO PARA MOSTRAR NOMBRE USUARIO EN LOS COMENTARIOS                       */
    /* -------------------------------------------------------------------------- */

    public static function showNameModel($table,$id){

        $stmt=Conection::conectDB()->prepare("SELECT username FROM $table WHERE id = :value ");
        $stmt -> bindParam(":value", $id, PDO::PARAM_STR);
    
		$stmt -> execute();

		return $stmt -> fetch();
        
		$stmt = null;
    }

    

     /* -------------------------------------------------------------------------- */
    /*                     METODO PARA REGISTRAR VALORACION              */
    /* -------------------------------------------------------------------------- */
    public static function newRateModel($table,$dates){

        $stmt=Conection::conectDB()->prepare("INSERT INTO $table (id_product, id_user, rate, comment) 
        VALUES(:id,:idUser,:stars,:comment)");
        
        $stmt -> bindParam(":id", $dates["idRate"], PDO::PARAM_STR);
        $stmt -> bindParam(":idUser", $dates["idUser"], PDO::PARAM_STR);
        $stmt -> bindParam(":comment",$dates["comment"], PDO::PARAM_STR);
		$stmt -> bindParam(":stars", $dates["stars"], PDO::PARAM_STR);
		     
        if($stmt->execute()){
            return "ok";
        }else{
            return "error";
        }
      
        $stmt = null;
    }

     /* -------------------------------------------------------------------------- */
    /*                     METODO PARA MODIFICAR NUEVA VALORACION              */
    /* -------------------------------------------------------------------------- */

    public static function modifRateModel($table,$dates){

        $stmt=Conection::conectDB()->prepare("UPDATE $table SET rate = :stars, comment = :comment WHERE id = :id");
        
        $stmt -> bindParam(":id", $dates["idComment"], PDO::PARAM_STR);
        $stmt -> bindParam(":comment",$dates["comment"], PDO::PARAM_STR);
		$stmt -> bindParam(":stars", $dates["stars"], PDO::PARAM_STR);
		     
        if($stmt->execute()){
            return "ok";
        }else{
            return "error";
        }
      
        $stmt = null;
    }

    



     /* -------------------------------------------------------------------------- */
    /*                     METODO PARA CREAR ORDER            */
    /* -------------------------------------------------------------------------- */
    public static function createOrderModel($table,$dates){

        $stmt=Conection::conectDB()->prepare("INSERT INTO $table(id_user,id_product,name,adress,location,stateDelivery)
        VALUES( :idUser, :idProduct, :name, :adress, :city, 0)");

        $stmt -> bindParam(":idUser",$dates["idUser"], PDO::PARAM_STR);
		$stmt -> bindParam(":idProduct", $dates["idProduct"], PDO::PARAM_STR);
		$stmt -> bindParam(":name", $dates["name"], PDO::PARAM_STR);
		$stmt -> bindParam(":adress", $dates["adress"], PDO::PARAM_STR);
		$stmt -> bindParam(":city", $dates["city"], PDO::PARAM_STR);
		     
        if($stmt->execute()){
            return "ok";
        }else{
            return "error";
        }
        
      
        $stmt = null;

    }
    public static function checkAdminModel($table,$id){

        $stmt=Conection::conectDB()->prepare("SELECT admin FROM $table WHERE id = :value ");
        $stmt -> bindParam(":value", $id, PDO::PARAM_STR);
    
		$stmt -> execute();

		return $stmt -> fetch();
        
		$stmt = null;
    }


     /* -------------------------------------------------------------------------- */
    /*                     METODO PARA CAMBIAR IMAGEN DE PERFIL         */
    /* -------------------------------------------------------------------------- */

    public static function changePictureModel($table,$dates){

        $stmt=Conection::conectDB()->prepare("UPDATE $table SET picture = :src  WHERE id = :id");
        
        $stmt -> bindParam(":src", $dates["src"], PDO::PARAM_STR);
        $stmt -> bindParam(":id", $dates["id"], PDO::PARAM_STR);
		     
        if($stmt->execute()){
            return "ok";
        }else{
            return "error";
        }
      
        $stmt = null;
    }
    

     /* -------------------------------------------------------------------------- */
    /*                    METODO QUE RETORNA EL VALOR SRC DE LA IMAGEN DE PERFIL                   */
    /* -------------------------------------------------------------------------- */
    public static function imgProfileModel($table,$value){

        $stmt=Conection::conectDB()->prepare("SELECT picture FROM $table WHERE id = :id");
        $stmt -> bindParam(":id", $value, PDO::PARAM_STR);
    
		$stmt -> execute();

		return $stmt -> fetch();
        
		$stmt = null;
    }

     /* -------------------------------------------------------------------------- */
    /*                    METODO PARA MOSTRAR LOS COMENTARIOS Y LIKES EN LA SECCION COMMENTS              */
    /* -------------------------------------------------------------------------- */
    public static function showCommentsLikesModel($table){

        $stmt=Conection::conectDB()->prepare("SELECT * FROM $table ORDER BY id DESC");

		$stmt -> execute();

		return $stmt -> fetchAll();
        
		$stmt = null;
    }

       /* -------------------------------------------------------------------------- */
    /*                     METODO PARA CREAR COMENTARIO          */
    /* -------------------------------------------------------------------------- */
    public static function newReviewModel($table,$dates){

        $stmt=Conection::conectDB()->prepare("INSERT INTO $table(id_user,comment,likes)
        VALUES( :idUser, :comm, 0)");

        $stmt -> bindParam(":idUser",$dates["idUser"], PDO::PARAM_STR);
		$stmt -> bindParam(":comm", $dates["comment"], PDO::PARAM_STR);	   
          
        if($stmt->execute()){
            return "ok";
        }else{
            return "error";
        }
        
      
        $stmt = null;

    }

     /* -------------------------------------------------------------------------- */
    /*                     METODO PARA A??ADIR LIKE       */
    /* -------------------------------------------------------------------------- */

    public static function addLikeModel($dates){

        // if($dates["numLikes"] == 1){

        $stmt=Conection::conectDB()->prepare("INSERT INTO likes_comments ( id_comment, id_user, numLikes) VALUES(:idComm,:id,:numLikes)");
        
        $stmt -> bindParam(":id", $dates["id"], PDO::PARAM_STR);
        $stmt -> bindParam(":idComm", $dates["idComm"], PDO::PARAM_STR);
        $stmt -> bindParam(":numLikes", $dates["numLikes"], PDO::PARAM_STR);
		     
               if($stmt->execute()){
                   return "ok";
               }else{
                   return "error";
               }
            //    }

      
        $stmt = null;
    }

    /* -------------------------------------------------------------------------- */
    /*                     METODO PARA SUMAR LIKES TOTALES DE UN COMENTARIO     */
    /* -------------------------------------------------------------------------- */

    public static function totalLikesModel($dates){

       
           $stmt=Conection::conectDB()->prepare("UPDATE comments SET likes = :numLikes WHERE id = :idComm");

        //    $stmt -> bindParam(":id", $dates["id"], PDO::PARAM_STR);
           $stmt -> bindParam(":idComm", $dates["idComm"], PDO::PARAM_STR);
           $stmt -> bindParam(":numLikes", $dates["numLikes"], PDO::PARAM_STR);

           if($stmt->execute()){
            return "ok";
            }else{
                return "error";
            
        }
      
        $stmt = null;
    }


     /* -------------------------------------------------------------------------- */
    /*                    METODO PARA COMPROBAR SI EL USUARIO DIO LIKE A UN COMENTARIO             */
    /* -------------------------------------------------------------------------- */
    public static function checkLikeModel($table, $dates){

        $stmt=Conection::conectDB()->prepare("SELECT * FROM $table WHERE id_comment = :idComm AND id_user = :id");

        $stmt -> bindParam(":id", $dates["id"], PDO::PARAM_STR);
        $stmt -> bindParam(":idComm", $dates["idComm"], PDO::PARAM_STR);

		$stmt -> execute();

		return $stmt -> fetchAll();
        
		$stmt = null;
    }


}
?>