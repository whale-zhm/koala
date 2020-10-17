;(function(){
    let username_lock = false;
    let password_lock = false;

    let $user = $("#username");
    let $pwd = $("#password");
    let remenber = document.getElementById("remenber");
    let $loginBtn = $("#loginBtn");

    let userinfo = JSON.parse(localStorage.getItem("userinfo"));
    if (userinfo) {
        let{user, pwd, isRemenber} = userinfo;
        $user.val(user);
        $pwd.val(pwd);
        remenber.checked = isRemenber;
    }

    $user.blur(function() {
        let reg = /^[a-zA-Z_]\w{2,8}$/;
        if($(this).val() == "" ){
            username_lock = false;
            $(this).css("borderColor", "red");
            $(this).next().css("color", "red").html("账号不能为空");
            return;
        } else if (!reg.test($(this).val())) {
            username_lock = false;
            $(this).css("borderColor", "red");
            $(this).next().css("color", "red").html("请输入3-9位由数字、字母、下划线组成的字符组合")
        } else {
            username_lock = true;
            $(this).css("borderColor", "green");
            $(this).next().html("");
        }
    });

    $pwd.blur(function() {
        let reg = /^[A-Za-z0-9]{6,18}$/;
        if($(this).val() == ""){
            password_lock = false;
            $(this).css("borderColor", "red");
            $(this).next().css("color", "red").html("密码不能为空");
        } else if (!reg.test($(this).val())) {
            password_lock = false;
            $(this).css("borderColor", "red");
            $(this).next().css("color", "red").html("请输入6-18位包含数字或字母的密码");
        } else {
            password_lock = true;
            $(this).css("borderColor", "green");
            $(this).next().html("");
        }
    })

    remenber.onchange = function(e) {
        let isRemenber = this.checked;
        let obj = {
            user: $user.val(),
            pwd: $pwd.val(),
            isRemenber
        }
        if (isRemenber) {
            localStorage.setItem("userinfo", JSON.stringify(obj));
        } else {
            localStorage.removeItem("userinfo", JSON.stringify(obj))
        }
    }

    $loginBtn.on('click', function(event) {
        event.preventDefault();
        var user = $user.val();
        var pwd = $pwd.val();
        if (user == "" || pwd == "") {
            return setTimeout(function() {
                location.href = "/html/regist.html"
            },2000);
        }
        // if (!(username_lock && password_lock)){
        //     return;
        // }
        QF.post("../php/login.php", {username:$('#username').val(), password:$('#password').val()}, function(data) {
            if (!data.error) {
                setTimeout(function() {
                    location.href = "/index.html";
                },1000)
            } else {
                alert(data.data);
            }
        })
    })

    $('.login-list li').eq(0).click(function(e){
        $(this).addClass('active').siblings().removeClass();
        $(".richScan").css('display', 'block');
        $(".phone").css('display', 'none');
    })
    $('.login-list li').eq(1).click(function(e){
        $(this).addClass('active').siblings().removeClass();
        $(".phone").css('display', 'block');
        $(".richScan").css('display', 'none');
    })
})()
  