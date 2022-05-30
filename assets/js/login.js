$(function () {
    $('#link_reg').click(() => {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').click(() => {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    const form = layui.form
    const layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须是6到12位，且不能是空格"],
        repwd: (value) => {
            const pwd = $('#form_reg [name=password]').val()
            if(pwd !== value) {
                return "两次密码不一致"
            }
        }
    })
    const baseUrl = `http://www.liulongbin.top:3007`
    $('#form_reg').on('submit',(e) => {
        e.preventDefault()
        $.ajax({
            type:'POST',
            url: "/api/reguser",
            data:{
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: (res) => {
                if(res.status !== 0) return layer.msg('注册失败！')
                layer.msg('注册成功')
                $("link_login").click()
            },
        })
    })
    $("#form_login").on('submit',function(e) {
        e.preventDefault();
        $.ajax({
            type:'POST',
            url: "/api/login",
            data: $(this).serialize(),
            success: (res) =>{
                if (res.status !== 0) return layer.msg('登录失败')
                layer.msg('登录成功')
                localStorage.setItem("token",res.token);
                location.href = "/index.html"
            }
        })
    })
    // 登录功能

})
