(function(){
  angular.module('zodiac')
    .controller('ZodiacCtrl', ZodiacCtrl)

    ZodiacCtrl.$inject = ['user_fac', '$state'];

    function ZodiacCtrl(user_fac, $state) {
      var vm = this;
      vm.title = 'zodiac ctrl';

      var err_callback = function(err) {
        console.log(err, '<< err');
      };

      
      var userId = '600860';
      var apiKey = 'c049075b72379e9f26f82023dd7594fd';


      $.ajax({
        url: 'https://json.astrologyapi.com/v1/sun_sign_prediction/daily/aries',
        method: 'POST',
        dataType: 'json',
        headers: {
          "authorization": "Basic " + btoa(userId+":"+apiKey),
          "Content-Type":'application/json'
        },
        success: function(data) {
          vm.ariesData = data.prediction;
          vm.hello = 'hello'
          console.log(data, 'success from astrology api')
          $('.emo').text(vm.ariesData.emotions)
          $('.heal').text(vm.ariesData.health)
          $('.luck').text(vm.ariesData.luck)
          $('.life').text(vm.ariesData.personal_life)
          $('.prof').text(vm.ariesData.profession)
          $('.trav').text(vm.ariesData.travel)
         
        },
        error: function(err) {
          console.log(err, '<< err in astology api')
        }
      })

      vm.calculateSign = function(birthday) {
        var bd = vm.currentUser.birthday.split('-');
        // console.log(bd, '>>>>>>> test')
        var day = Number(bd[2])
        var month = Number(bd[1])
        console.log(day, month, '>>>> test')


        

      }
    





      user_fac
        .isAuthed()
        .then(function(res) {
          console.log(res, '<< res');
          if (!res.data.canStay) {
            $state.go('login')
          }
          user_fac
            .showOne(res.data.user.id)
              .then(function(res) {
                console.log(res, '<< res with current current user');
                vm.currentUser = res.data.user;
                vm.calculateSign(vm.currentUser.birthday)



              }, err_callback)
   
        }, err_callback)
     
  

      vm.clickedLogout = function() {
        console.log('clicked!')
        user_fac
          .logout()
          .then(function(res) {
            console.log(res, 'success -> logout get /api/users/logout');
            $state.go('login');
          }, err_callback)
      };

      vm.clickedProfile = function() {
        $state.go('profile', { user: vm.currentUser })
      }

    }
})()