( function(){
  angular.module('zodiac')
    .config(function($stateProvider, $urlRouterProvider) {

      // for date format
      // $locationProvider.html5Mode({
      //   enabled: true,
      //   requireBase: false
      // })

      $urlRouterProvider.otherwise('/login')

      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'partials/login.html',
          controller: 'LoginCtrl as login_ctrl'
        })
        .state('signup', {
          url: '/signup',
          templateUrl: 'partials/signup.html',
          controller: 'SignupCtrl as signup_ctrl'
        })
        .state('zodiac-home', {
          url: '/zodiac',
          templateUrl: 'partials/zodiac_home.html',
          controller: 'ZodiacCtrl as zodiac_ctrl'
        })
        .state('profile', {
          url: '/zodiac/profile',
          templateUrl: 'partials/zodiac_profile.html',
          controller: 'ProfileCtrl as profile_ctrl'
          // params: {
          //   user: null
          // }
        })
    })
})()