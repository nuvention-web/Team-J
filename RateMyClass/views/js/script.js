var app = angular.module('login-register',[]);

/*creating Directive to Upload file starts*/
app.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind('change', function(event){
             scope.$apply(function(){
                var files = event.target.files;
                /* 
                    Writing the selected file name below the Upload image
                */  
                angular.element( document.querySelector( '#selectedFile' )).html(files[0].name);
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
}]);
/*creating Directive to Upload file ends*/

app.controller('login-register', function ($scope,$http,$timeout,$window) {	

    // alert("JS for login");
    
    /* variables for  Hide show starts*/
    $scope.LoginBox=false; 
    $scope.LoginAlert=true;
    $scope.RegisterBox=true;

    $scope.RegisterAlert=true;
    $scope.confirmPasswordAlert=true;
    $scope.PasswordLengthAlert=true;

    /* variables for  Hide show ends*/

    /* usernamme check variables starts*/
    var TypeTimer;                
    var TypingInterval = 1000;
    /* usernamme check variables ends*/
    

    /* Hide show Login and Registration box  starts */
    $scope.toggle_register = function() {
        $scope.RegisterBox = !$scope.RegisterBox;
        $scope.LoginBox = !$scope.LoginBox;
    };
    $scope.toggle_login = function() {
        $scope.LoginBox = !$scope.LoginBox;
        $scope.RegisterBox = !$scope.RegisterBox;
    };
    /* Hide show Login and Registration box ends*/
    

    /* Login operation starts*/
    $scope.login = function(){
        var data={
            username:$scope.username,
            password:$scope.password
        }

        $http.post('/login',data).success(function(data, status, headers, config) {
            if(data.is_logged){
                $scope.LoginAlert = true;
<<<<<<< HEAD
                $window.location.href = "/main.html#?id="+data.uid;
=======
                $window.location.href = "/main.html";
>>>>>>> 8d69d9467e737a2e38544e9391c957e7fdba0e0a
            }else{
                $scope.LoginAlert = false;
            }
        }).error(function(data, status) {
            alert("Connection Error");
        });
    };
    /* Login operation ends*/

    

    /* usernamme check operation starts*/
    $scope.keyup_uncheck = function() {
        $timeout.cancel(TypeTimer);
        TypeTimer=$timeout( function(){
            var data={
                username:$scope.registerUsername
            }
            etc_function.check_username(data);            
        }, TypingInterval);
    };
    $scope.keydown_uncheck = function(){
        $timeout.cancel(TypeTimer);
    };
   
    $scope.blur_uncheck = function(){
        var data={
            username:$scope.registerUsername
        }
        etc_function.check_username(data);
        $timeout.cancel(TypeTimer); 
    };
    /* username check operation ends*/

    /* password length check operation starts*/ 
    $scope.blur_passwordLength = function(){
        var password = $scope.registerPassword;

        if (password.length < 8)
            $scope.PasswordLengthAlert=false;
        else
            $scope.PasswordLengthAlert=true;
    };
    /* password length check operation ends*/

    /* confirm password check operation starts*/ 
    $scope.blur_checkpassword = function(){
        var password = $scope.registerPassword;
        var confirm = $scope.confirmPassword;

        if (password != confirm)
            $scope.confirmPasswordAlert=false;
        else
            $scope.confirmPasswordAlert=true;
    };

    $scope.change_checkpassword = function(){
        var password = $scope.registerPassword;
        var confirm = $scope.confirmPassword;

        if (password != confirm)
            $scope.confirmPasswordAlert=false;
        else
            $scope.confirmPasswordAlert=true;
    };
    /* confirm password check operation ends*/


    /* Regsiter operation starts*/
    $scope.register = function(){

            var fd = new FormData();
            // fd.append('file', file);
            fd.append('username',$scope.registerUsername);
            fd.append('password',$scope.registerPassword);
            $http.post("/register", fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(data, status, headers, config) {
                // console.log("data", data);
                if (data == "No record found"){
                    alert("Invalid NetID!");
                    location.reload();
                }
                else if (data == "Not a student")
                    alert("Sorry, currently this platform only for students!");
                else{
                    if(data == "User entered"){
                        $scope.LoginAlert = true;
<<<<<<< HEAD
                        $window.location.href = "/main.html#?id="+data.id;
=======
                        $window.location.href = "/main.html";
>>>>>>> 8d69d9467e737a2e38544e9391c957e7fdba0e0a
                    }else{
                        //alert(JSON.stringify(data.is_logged));
                        $scope.LoginAlert = false;
                        $window.location.href = "/profile.html";
                    }
                }
            })
            .error(function(){
                alert("Connection Error");
            });
    };
    /* Regsiter operation ends*/

    $scope.submitRegister = function(){
        if ($scope.registerUsername == null || $scope.registerPassword == null || $scope.confirmPassword == null)
            alert("Empty Inputs");
        else if ($scope.confirmPasswordAlert == false || $scope.RegisterAlert == false || $scope.PasswordLengthAlert == false)
            alert("Wrong Inputs");
        else
            $("#myModal").modal('show');
    }

   
    /* Making Extra function*/
    var etc_function={
        check_username:function(data){
            $http.post('/check_name',data).success(function(data, status, headers, config) {
                if( !data.msg ){
                    $scope.RegisterAlert = true;

                }else{
                    $scope.RegisterAlert = false;
                }
            }).error(function(data, status) {
                alert("Connection Error");
            });
        }
    }
});