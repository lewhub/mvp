(function(){
  angular.module('zodiac')
    .factory('user_fac', user_fac)

    user_fac.$inject = ['$http'];

    function user_fac($http) {
      var api = '/api/users/'
      var service = {
        login: login,
        signup: signup,
        logout: logout,
        isAuthed: isAuthed,
        updateInfo: updateInfo,
        showOne: showOne,
        remove_user: remove_user
      }

      function login(userObj) {
        return $http.post(api + 'login', userObj);
      }

      function signup(userObj) {
        return $http.post(api, userObj);
      }
      function logout(){
        return $http.get(api + 'logout');
      }
      function isAuthed() {
        return $http.get(api + 'sessionWatch');
      }
      function updateInfo(userObj) {
        return $http.patch(api + userObj.id, userObj)
      }

      function showOne(id) {
        return $http.get(api + id);
      }

      function remove_user(id) {
        return $http.delete(api + id);
      }

      return service;
    };
})()