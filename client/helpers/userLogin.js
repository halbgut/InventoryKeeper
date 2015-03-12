Template.userLogin.events({
  'click .login__submit': function () {
    var username = document.querySelector('.login__username').value
  , password = document.querySelector('.login__password').value
    Meteor.loginWithPassword(username, password, function (err) {
      if(err) return console.log(err)
      Router.go('/')
    })
    return false
  }
})