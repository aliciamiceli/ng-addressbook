'use strict';

app.controller("ContactEditCtrl", function($scope, $location, $routeParams, ContactFactory) {
  $scope.newContact = {};
  let contactId = $routeParams.id;

  ContactFactory.getSingleContact(contactId).then(function(oneContact){
    oneContact.id = contactId;
    $scope.newContact = oneContact;
    console.log("oneContact", oneContact);
  });

  $scope.addNewContact = function(){
    ContactFactory.editContact($scope.newContact).then(function(response){
      $scope.newContact = {};
      $location.url("/contacts/list");
    });
  };
});