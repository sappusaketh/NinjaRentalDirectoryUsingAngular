var testModule=angular.module("testModule",["ngRoute","ngAnimate"]);


testModule.config(['$routeProvider',function($routeProvider){
   $routeProvider
      .when('/home',{
         templateUrl:'views/home.html',
         controller:"ninjacontroller"
      })
      .when('/contact',{
         templateUrl:'views/contact.html',
         controller:"ContactController"
      })
      .when('/contactSuccess',{
         templateUrl:'views/contactSuccess.html',
         controller:"ContactController"
      })
      .when('/directory',{
         templateUrl:'views/directory.html',
         controller:'ninjacontroller'
      }).otherwise({
         redirectTo:'/home'
      })

}])

testModule.directive('randomNinja',[function(){
   return{
      restrict:'EA',
      scope:{
         ninjas:'=',
         title:'='
      },
      transclude:true,
      replace:true,
      templateUrl:'views/randomninja.html',
      controller:function($scope){
         $scope.random=Math.floor(Math.random()*4)
      }
   };
}])

testModule.controller('ninjacontroller',['$scope','$http',function($scope,$http){

   $scope.remove=function(ninja){
      var removed_ninja=$scope.ninjas.indexOf(ninja);
      $scope.ninjas.splice(removed_ninja,1)
   }

   $scope.AddNewNinja=function(newninja){
    $scope.ninjas.push(newninja)
    $scope.newninja=undefined;
   }
   $scope.removeall=function(){
      $scope.ninjas=[]; 
   }
   $http.get('data/ninjas.json').then(function(successCallback,errorCallback){
      if(errorCallback){
         console.log(err)
      }
      else{
         console.log(successCallback)
         $scope.ninjas=successCallback.data;
      }
      
     
   })
   
}] );

testModule.controller("ContactController",['$scope','$location',function($scope,$location){

   $scope.sendMessage=function(){
      contact=$scope.contact;
      $location.path('contactSuccess')
   }

}])