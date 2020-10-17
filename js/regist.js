;(function() {
    var user_lock = false;
    var pwd_lock = false;

    $('#username').blur(function() {
        let reg = /^[a-zA-Z_]\w{2,8}$/;
        // if($(this).val() == "" || $(this).val() == "请输入用户名"){
        //     user_lock = false;
        //     $(this).css("borderColor", "red");
        //     $(this).next().css("color", "red").html("账号不能为空");
        //     return;
        // } else if (!reg.test($(this).val())) {
        //     user_lock = false;
        //     $(this).css("borderColor", "red");
        //     $(this).next().css("color", "red").html("请输入3-9位由数字、字母、下划线组成的字符组合")
        // } 
        QF.get("../php/checkuser.php", {username:$('#username').val()}, (data) => {
            if (!data.error) {
                user_lock = true;
                if($(this).val() == "" || $(this).val() == "请输入用户名"){
                    user_lock = false;
                    $(this).css("borderColor", "red");
                    $(this).next().css("color", "red").html("账号不能为空");
                    return;
                } else if (!reg.test($(this).val())) {
                    user_lock = false;
                    $(this).css("borderColor", "red");
                    $(this).next().css("color", "red").html("请输入3-9位由数字、字母、下划线组成的字符组合")
                } else {
                    $(this).css("borderColor", "green");
                    $(this).next().css("color", "green").html(data.msg);
                }
            } else {
                user_lock = false;
                $(this).css("borderColor", "red");
                $(this).next().css("color", "red").html(data.msg);
            }
        })
    })
    
    $('#password').focus(function() {
        $(this).val("");
        $(this).next().html("");
    })
    
    $('#password').blur(function() {
        let reg = /^[A-Za-z0-9]{6,18}$/;
        if($(this).val() == "" || $(this).val() == "请输入密码"){
            pwd_lock = false;
            $(this).css("borderColor", "red");
            $(this).next().css("color", "red").html("密码不能为空");
        } else if (!reg.test($(this).val())) {
            pwd_lock = false;
            $(this).css("borderColor", "red");
            $(this).next().css("color", "red").html("请输入6-18位包含数字或字母的密码");
        } else {
            pwd_lock = true;
            $(this).css("borderColor", "green");
            $(this).next().html("");
        }
    })
    
    $('#password2').blur(function() {
        let pwd1 = $('#password').val();
        let pwd2 = $(this).val();
        if(pwd2 == "" || pwd2 == "请输入密码"){
            pwd_lock = false;
            $(this).css("borderColor", "red");
            $(this).next().css("color", "red").html("确认密码不能为空");
        } else if (pwd2 != pwd1) {
            pwd_lock = false;
            $(this).css("borderColor", "red");
            $(this).next().css("color", "red").html("两次密码输入不一致");
        } else {
            pwd_lock = true;
            $(this).css("borderColor", "green");
            $(this).next().html("");
        }
    })
    
    
    $('#registBtn').on('click', function(event) {
        event.preventDefault();

        if (!(user_lock && pwd_lock)) {
            alert("请重新检查用户名和密码");
            return;
        }

        var user = $('#username').val();
        var pwsd = $('#password').val();
        var pwsd2 = $('#password2').val();
    
        if (user == "" || pwsd == "" || pwsd2 == "" ) {
            alert("请重新检查用户名和密码");
            return 
        }
        QF.post("../php/regist.php", {username:user, password:pwsd}, function(data) {
           
            if (!data.error) {
                setTimeout(function() {
                    location.href = "/html/login.html";
                },1000)
            } else {
                alert(data.data);
            }
        })
    })
})()
