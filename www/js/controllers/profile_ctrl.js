(function(){
  angular.module('zodiac')
    .controller('ProfileCtrl', ProfileCtrl)

    ProfileCtrl.$inject = ['user_fac', '$state', '$stateParams']

    function ProfileCtrl(user_fac, $state, $stateParams) {


      var months = {
        'January,': '01',
        'February,': '02',
        'March,': '03',
        'April,': '04',
        'May,': '05',
        'June,': '06',
        'July,': '07',
        'August,': '08',
        'September,': '09',
        'October,': '10',
        'November,': '11',
        'December,': '12'
      }

      var days = {
        1: '01',
        2: '02',
        3: '03',
        4: '04',
        5: '05',
        6: '06',
        7: '07',
        8: '08',
        9: '09',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
        21: '21',
        22: '22',
        23: '23',
        24: '24',
        25: '25',
        26: '26',
        27: '27',
        28: '28',
        29: '29',
        30: '30',
        31: '31'
      }

      var vm = this;
      vm.title = 'profile ctrl';
      vm.isEditEmail = false;
      vm.isEditBirthday = false;
      vm.isEditDelete = false;
      // console.log($stateParams, 'state params')

      var err_callback = function(err) {
        console.log(err, '<< err');
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
                vm.updateUserInfo = {
                  email: vm.currentUser.email,
                  birthday: new Date(vm.currentUser.birthday),
                  id: vm.currentUser.id
                };

              }, err_callback)
        }, err_callback)

        vm.userClickedMessage = function(){
          vm.isEditEmail = true;
        }
        vm.userClickedBirthdayCake = function() {
          console.log('clicked cake')
          vm.isEditBirthday = true;
           
          console.log($('.unique-picker'), '<<<< picker')
        }

        vm.userClickedE = function() {
          vm.isEditDelete = true;
        }

        vm.userClickedNoDelete = function() {
          vm.isEditDelete = false;
          $('#editprofile').modal('close');
        }

        vm.setPickerInit = function() {
          $('.datepicker').pickadate({
            selectMonths: true,
            selectYears: 100 
          });
        }

        vm.clickedEdit = function() {
          console.log('clicked!')
          
          $('.modal').modal()
          $('.modal.bottom-sheet').css({'top': '34% !important'})
          $('#editprofile').css({'top': '34% !important'})
          $('#editprofile').modal({
            inDuration: 500,
            dismissible: false
          })
          $('#editprofile').modal('open')
        }


        vm.clickedBack = function() {
          $state.go('zodiac-home')
        }

        vm.userClickedSave = function(){
            console.log(vm.updateUserInfo, '<<<<<< test')
            console.log($('.datepicker').val(), '<<<<< date')
            var datePickerDate = $('.datepicker').val();
            
            if (datePickerDate && !datePickerDate.includes('-')) {
              var datesP = datePickerDate.split(' ');
              vm.updateUserInfo.birthday = datesP[2] + '-' + months[datesP[1]] + '-' + days[datesP[0]];
            } else {
              vm.updateUserInfo.birthday = vm.currentUser.birthday;
            }
            user_fac
              .updateInfo(vm.updateUserInfo)
              .then(function(res) {
                console.log(res, 'success')
                user_fac
                  .showOne(vm.currentUser.id)
                    .then(function(res) {
                      vm.isEditEmail = false;
                      vm.isEditBirthday = false;
                      vm.currentUser = res.data.user;
                      $('#editprofile').modal('close');
                    }, err_callback)
              }, err_callback)
          }
        
          vm.userClickedYesOnDelete = function() {
            // delete user from database
            user_fac
              .remove_user(vm.currentUser.id)
              .then(function(res){
                console.log(res, '<< res Delete -> /api/users/:id')
                $('#editprofile').modal('close');

                $state.go('login')
              }, err_callback)
          }
      
    }
})()