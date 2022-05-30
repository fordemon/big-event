function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token")
        // },
        success: (res) => {
            console.log(res);
            renderAvatar(res.data);
        }
    })
}
const renderAvatar = (user) => {
    console.log(user);
    let uname = user.nickname || user.username;
    // 渲染欢迎语
    $("#welcome").html(`欢迎${uname}`);
    // 按需渲染头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic)
        $(".text-avatar").hide();
    } else {
        // 设置文本头像
        $(".layui-nav-img").hide();
        $(".text-avatar").html(uname[0].toUpperCase());
    }
}
// 退出功能
// $("#btnLogout").click(() => {
//     layui.layer.confirm(
//         "确定退出登录？",
//         { icon: 3, title: "" },
//         function (i
$("#btnLogout").click(() => {
    layer.confirm("是否退出？",
        {
            icon: 3, title: "提示"
        }, function (index) {
            localStorage.removeItem("token")
            location.href = "/login.html"

        })
})
getUserInfo()