angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope) {})

//.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //$scope.chats = Chats.all();
  //$scope.remove = function(chat) {
    //Chats.remove(chat);
  //};
//})

//.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  //$scope.chat = Chats.get($stateParams.chatId);
//})

// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableFriends: true
//   };
// })


// controller del Barcode Scanner
.controller('ControladorBarCode', function($scope, $cordovaBarcodeScanner, $ionicPlatform) {

  $ionicPlatform.ready(function() {

          $scope.scanBarCode = function() {

            $cordovaBarcodeScanner.scan().then(function(imageData){

            alert(imageData.text);
            console.log("Formato de código de barras" + imageData.format);
            console.log("Cancelado -> " + imageData.cancelled);

          }, function(error){
            console.log("Ha ocurrido un error" + error);
          });

        }
  });

})

// controller del cordovaFile
.controller('ControladorFile', function($scope,$cordovaFile,$cordovaNativeAudio,$ionicPlatform) {

    $scope.archivo ={};
  
  $scope.escribirArchivo = function(){
    $cordovaFile.writeFile(cordova.file.dataDirectory, "file.txt", $scope.archivo.texto, true)
      .then(function (success) {
        $scope.escribir = "Se escribio en el archivo"
    $cordovaNativeAudio
    .preloadSimple('audio', 'audio/exito.wav')
    .then(function (msg) {
       $cordovaNativeAudio.play('audio');
    }, function (error) {
      alert(error);
    });
      }, function (error) {
        alert('No se pudo escribir el archivo');
    $cordovaNativeAudio
    .preloadSimple('audio', 'audio/error.wav')
    .then(function (msg) {
       $cordovaNativeAudio.play('audio');
    }, function (error) {
      alert(error);
    }); 
      });  
  }
  
  $scope.leerArchivo = function(){
    $cordovaFile.readAsText(cordova.file.dataDirectory, "file.txt")
      .then(function (success) {
        $scope.leer = success;
      }, function (error) {
        alert('No se puede leer el archivo');
      });
  }
})


//controller del device motion
.controller('ControladorDeviceMotion', function($scope, $cordovaDeviceMotion, $ionicPlatform, $window, $cordovaVibration) {

  $scope.options = { 
        frequency: 50, // mide cada 50ms
        deviation : 25  // usamos el deviation para determinar el evento de movimiento, valores recomendados entre 25 y 30
    };

  $scope.datos = {};

  // $scope.datos.pantallaAlto = $window.innerHeight;

  // $scope.datos.pantallaAncho = $window.innerWidth;

  // Medidas previas    
    $scope.datos = {
        X : 100,
        Y : 150,
        Z : null,
        pantallaAlto : $window.innerHeight,
        pantallaAncho : $window.innerWidth, 
        timestamp : null
    }

  $ionicPlatform.ready(function () {

    $scope.watch = $cordovaDeviceMotion.watchAcceleration($scope.options);
    $scope.watch.then(
      null,
      function(error) {
      // An error occurred
      },
      function(result) {


      // $scope.datos.X = result.x + 100;
      // $scope.datos.Y = result.y + 150;
      // $scope.Z = result.z;

      //$scope.timeStamp = result.timestamp;


       if(result.x > 1)
        {
          $scope.datos.X = $scope.datos.X-result.x;
          if($scope.datos.X<0) //si se va a la izquierda lo para en 0
          {
             $scope.datos.X=0;
             $cordovaVibration.vibrate(100);
          }
        }else
        {
          if(result.x < -1)
          {
             $scope.datos.X = $scope.datos.X-result.x;
             if($scope.datos.X >190)
             {
               $scope.datos.X=190;
               $cordovaVibration.vibrate(200);
             }
          }
        }

      if(result.y < -1)
      {
        $scope.datos.Y = $scope.datos.Y + result.y;
        if($scope.datos.Y<0) //si se va por arriba lo detiene en 0
        {
          $scope.datos.Y=0;
          $cordovaVibration.vibrate(100);
        }
      }else
      {
        if(result.y > 1)
        {
          $scope.datos.Y = $scope.datos.Y + result.y;
          if($scope.datos.Y>330) //si se va por abajo lo detiene en 330
          {
            $scope.datos.Y=330;
            $cordovaVibration.vibrate(50);
          }
        }
      }

    }); //fin del ionicPlatform.ready

   /* $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
$scope.X = result.x;       $scope.Y = result.y;       $scope.Z = result.z;
$scope.timeStamp = result.timestamp;     }, function(err) {       // An error
occurred. Show a message to the user       alert("no funciona");     });*/

  }, false);

})// fin del controller


// controller capture
.controller('ControladorCapture', function($scope, $cordovaCapture){
   $scope.captureAudio = function() {
    var options = { limit: 3, duration: 10 };

    $cordovaCapture.captureAudio(options).then(function(audioData) {
      $scope.audioCapturado = audioData;
    }, function(err) {
      alert(err);
    });
  }
  
  $scope.captureVideo = function() {
    var options = { limit: 3, duration: 15 };

    $cordovaCapture.captureVideo(options).then(function(videoData) {
      $scope.videoCapturado = videoData;
    }, function(err) {
      alert(err);
    });
  }
  
})



//controller de la cámara dada en clase
// .controller('ControladorCamara', function($scope, $ionicHistory, $firebaseArray, $cordovaCamera) {

// //
// $scope.mostrarSpin='si';

// $scope.datos={
//       comentario:"Sin comentario",
//       lenguaje:"",
//       materia:"",
//       titulo:"Sin Titulo"
//     };
    
// $scope.settings = {
//   calidad:50,
//     guardar: true,
//     editar: true
//   };
//   $ionicHistory.clearHistory();
//  $scope.images  = [];
//  var syncArray = $firebaseArray(myDataRef.child('fotos'));



//   myDataRef.on("child_added", function(snapshot) {
         
//         $scope.mostrarSpin='no';
//         console.info("valor array syncArray",syncArray);
//         $scope.images=syncArray;
//       //  alert("imagen volvio.");

// }, function (errorObject) {

//     $scope.mostrarSpin='no';

//   console.log("The read failed: " + errorObject.code);
// }); 

//    $scope.upload = function() {
//         var options = {
//             quality : $scope.settings.calidad,
//             destinationType : Camera.DestinationType.DATA_URL,
//             sourceType : Camera.PictureSourceType.CAMERA,
//             allowEdit : $scope.settings.editar,
//             encodingType: Camera.EncodingType.JPEG,
//             popoverOptions: CameraPopoverOptions,
//             targetWidth: 500,
//             targetHeight: 500,
//             saveToPhotoAlbum:$scope.settings.guardar
//         };
//         $cordovaCamera.getPicture(options).then(function(imageData) {



//             syncArray.$add({image: imageData ,fecha: Firebase.ServerValue.TIMESTAMP,informacion: $scope.datos})
//             .then(function() {
//                 alert("imagen guardada.");
//             },function(error){
//               alert("error al sincronizar: "+error);
//             });
//         }, function(error) {
//             alert("error.");
//         });
//     }
// })

//controller Geolocation
.controller('ControladorGeolocation', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {
     
    $ionicPlatform.ready(function() { 


        console.log("ionicPlatform"); 

        var posOptions = {timeout: 10000, enableHighAccuracy: true};

        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {

            console.log("$cordovaGeolocation");

            var lat  = position.coords.latitude

            console.log("latitud: "+ lat);

            var long = position.coords.longitude


            var myLatlng = new google.maps.LatLng(lat, long);

        var mapOptions = {
          zoom: 16,
          center: myLatlng
        }

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title:"¡Hola Mundo!"
        });

        // setMap() añade el marcador
        marker.setMap(map);
          }, function(err) {
            console.log("Error: " + err);
          });


        var watchOptions = {
          timeout : 3000,
          enableHighAccuracy: false // may cause errors if true
        };

        var watch = $cordovaGeolocation.watchPosition(watchOptions);
        watch.then(
          null,
          function(err) {
            console.log("Error " + err);
          },
          function(position) {
            var lat  = position.coords.latitude
            var long = position.coords.longitude
        });
      })
})


// controller de mensajes Toast
.controller('ControladorToast', ['$scope', 'ionicToast', function($scope, ionicToast) {
   /*$scope.settings = {
    enableFriends: true
  };*/
$scope.mostrarMensaje=function(mensaje,posicion,cierreAutomatico,duracion){
    
 // <!-- ionicToast.show(message, position(top, middle, bottom), stick(true or false), time); -->
  ionicToast.showInfo(mensaje, posicion, cierreAutomatico, duracion);
  
 }
}])

.controller('RootPageController', function($scope, $ionicSideMenuDelegate) {
    })


.controller('NavController', function($scope, $ionicSideMenuDelegate) {
      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
    });



