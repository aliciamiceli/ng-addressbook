'use strict';

app.controller("AuthCtrl", function($rootScope, $scope, $location, AuthFactory, UserFactory){
  // $scope.loginContainer = true;
  $scope.registerContainer = true;

  if($location.path() === "/logout"){
    AuthFactory.logout();
    $rootScope.user = {};
    $location.url("/auth");
  }

  let logMeIn = function(loginStuff){
        AuthFactory.authenticate(loginStuff).then(function(didLogin){
        console.log("didLogin", didLogin);
        return UserFactory.getUser(didLogin.uid);
      }).then(function(userCreds){
        $rootScope.user = userCreds;
        $scope.login = {};
        $scope.register = {};
        $location.url("/contacts/list");
      });
  };

  $scope.setLoginContainer = function(){
    $scope.loginContainer = true;
    $scope.registerContainer = false;
  };

  $scope.setRegisterContainer = function(){
    $scope.loginContainer = false;
    $scope.registerContainer = true;
  };

  $scope.registerUser = function(registerNewUser){
    AuthFactory.registerWithEmail(registerNewUser).then(function(didRegister){
      console.log("didRegister", didRegister);
      registerNewUser.uid = didRegister.uid;
      return UserFactory.addUser(registerNewUser);
    }).then(function(registerComplete){
      logMeIn(registerNewUser);
    });
  };

  $scope.alreadyHaveAnAccount = function() {
    $location.url('auth/login');
  };

  $scope.loginUser = function(loginNewUser){
    logMeIn(loginNewUser);
  };
});