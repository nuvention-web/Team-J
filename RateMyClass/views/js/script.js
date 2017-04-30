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
    $scope.RegisterAlert=true;
    $scope.emailAlert=true;
    $scope.confirmPasswordAlert=true;
    $scope.legalName=true;
    $scope.RegisterBox=true;
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
                $window.location.href = "/main#?id="+data.id;
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
                username:$scope.username
            }
            etc_function.check_username(data);            
        }, TypingInterval);
    };
    $scope.keydown_uncheck = function(){
        $timeout.cancel(TypeTimer);
    };
   
    $scope.blur_uncheck = function(){
        var data={
            username:$scope.username
        }
        etc_function.check_username(data);
        $timeout.cancel(TypeTimer); 
    };
    /* username check operation ends*/

    /* Email check operation starts*/
    // $scope.check_email_keyup = function() {
    //     $timeout.cancel(TypeTimer);
    //     TypeTimer=$timeout( function(){
    //         var data={
    //             email:$scope.email
    //         }
    //         console.log(data);
    //         // etc_function.check_email(data);            
    //     }, TypingInterval);
    // };
    // $scope.check_email_keydown = function(){
    //     $timeout.cancel(TypeTimer);
    // };
   
    $scope.check_email_blur = function(){
        var inputEmail=$scope.email;
        

        var emailResult = emailValidation(inputEmail);
        console.log(emailResult);
        // etc_function.check_email(data);
        $timeout.cancel(TypeTimer); 
    };
    /* Email check operation ends*/

    /* Name check operation starts*/
    // $scope.keyup_uncheck = function() {
    //     $timeout.cancel(TypeTimer);
    //     TypeTimer=$timeout( function(){
    //         var data={
    //             username:$scope.username
    //         }
    //         etc_function.check_name(data);            
    //     }, TypingInterval);
    // };
    // $scope.keydown_uncheck = function(){
    //     $timeout.cancel(TypeTimer);
    // };
   
    // $scope.blur_uncheck = function(){
    //     var data={
    //         username:$scope.username
    //     }
    //     etc_function.check_name(data);
    //     $timeout.cancel(TypeTimer); 
    // };
    /* Name check operation ends*/


    /* Regsiter operation starts*/
    $scope.register = function(){
        var file_ext=["image/png","image/jpg","image/jpeg","image/gif"];
        var file_type_ok=true;
        var file = $scope.myFile;
        var file_size=Math.round(file.size/1024);

        file_ext.forEach(function(element, index){
            if(element===(file.type).toLowerCase()){
                file_type_ok=false;
            }
        });
        
        if(file_size>500){
            alert("Upload file below 500 KB.");
        }else if(file_type_ok){
            alert("Upload image file.");
        }
        else{
            var fd = new FormData();
            fd.append('file', file);
            fd.append('username',$scope.username);
            fd.append('password',$scope.password);
            $http.post("/register", fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(data, status, headers, config) {
                if(data.is_logged){
                    $scope.LoginAlert = true;
                    $window.location.href = "/home#?id="+data.id;
                }else{
                    $scope.LoginAlert = false;
                }
            })
            .error(function(){
                alert("Connection Error");
            });
        }
    };
    /* Regsiter operation ends*/

   
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

        // check_email:function(data){
        //     $http.post('/check_name',data).success(function(data, status, headers, config) {
        //         if( !data.msg ){
        //             $scope.RegisterAlert = true;

        //         }else{
        //             $scope.RegisterAlert = false;
        //         }
        //     }).error(function(data, status) {
        //         alert("Connection Error");
        //     });
        // }
    }
});


function emailValidation(input){
    
    console.log(input);
}