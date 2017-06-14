(function(){
  angular.module('zodiac')
    .controller('SignupCtrl', SignupCtrl)

    SignupCtrl.$inject = ['user_fac', '$state'];

    function SignupCtrl(user_fac, $state) {
      var vm = this;
      vm.title = 'signup ctrl';
      
      vm.newUserInfo = {};

      var err_callback = function(err) {
        console.log(err, '<< err');
      };

      vm.userClickedSignup = function(){
        if (vm.confirm_new_password === vm.newUserInfo.password) {
        user_fac
          .signup(vm.newUserInfo)
          .then(function(res){
            console.log(res, '<< res -> POST /api/users/')
            $state.go('login')
          }, err_callback)
        }
      }

    }
})()