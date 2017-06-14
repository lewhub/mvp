(function(){
  angular.module('zodiac')
    .controller('LoginCtrl', LoginCtrl)

    LoginCtrl.$inject = ['user_fac', '$state'];

    function LoginCtrl(user_fac, $state) {
      var vm = this;
      vm.title = 'login ctrl';

      vm.userInfo = {};

      var err_callback = function(err) {
        console.log(err, '<< err');
      }

      vm.userClickedLogin = function() {
        user_fac
          .login(vm.userInfo)
          .then(function(res) {
            if (res.data.success) {
              console.log(res, '< response -> POST api/users/login')
              $state.go('zodiac-home');
            }
          }, err_callback)
      }
    }
})()