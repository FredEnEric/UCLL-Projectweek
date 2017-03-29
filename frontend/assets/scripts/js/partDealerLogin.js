var makeAccount = function () {
    var account =  {
        "loginName": $('#loginName').val(),
        "type": "partDealer"
    };
    return account;
};

var login = function (e) {
    e.preventDefault();
    sessionStorage.setItem("account", JSON.stringify(makeAccount()));
    //console.log(sessionStorage.getItem("account"))
    window.location = "partDealerChain.html";
};

var back = function (e) {
    e.preventDefault();
    setLogin();
};

var startup = function () {
    if( sessionStorage.getItem("account") === null) {
        setLogin();
    } else {
        window.location = "partDealerChain.html";
    }
};

var setLogin = function () {
    $('form').empty();
    $('form').append('<h2>Login</h2>');
    $('form').append('<label for="loginName">Username</label> <input type="text" id="loginName"><br>');
    $('form').append('<label for="loginPassword">Password</label> <input type="password" id="loginPassword"> <br>');
    $('form').append('<a href="#" id="partDealerLogin">Login</a> <a id="partDealerRegister" href="#">Register</a>');
};

var register = function () {
    if($('#registerPasword1').val() != $('#registerPasword2').val()) {
        $('#registerPasword1').val("");
        $('#registerPasword2').val("");
        alert("Passwords do not match");
    } else {
        setLogin();
        $('form').append('<p>Your account has been registert</p>');
    }
};

var registerField = function (e) {
    e.preventDefault();
    $('form').empty();
    $('form').append('<h2>Register</h2>');
    $('form').append('<label for="registerLoginName">Username</label> <input type="text" id="registerLoginName"> <br>');
    $('form').append('<label for="registerPasword1">Password</label> <input type="password" id="registerPasword1"> <br>');
    $('form').append('<label for="registerPasword2">Repeat Password</label> <input type="password" id="registerPasword2"> <br>');
    $('form').append('<a href="#" id="registerField">Register</a> <a id="back" href="#">Return</a>');
};

$(document).ready(function (){
    startup();
    $('form').on('click', 'a#partDealerLogin', login);
    $('form').on('click', 'a#partDealerRegister', registerField);
    $('form').on('click', 'a#back', back);
    $('form').on('click', 'a#registerField', register);

    $('a#lol').on('click', function (e) {
        e.preventDefault();

    });
    
});