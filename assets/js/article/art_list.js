$(function () {
    const form = layui.form
    const laypage = layui.laypage
    const q = {
        pagenum: 1,
        pagesize: 3,
        cate_id: "",
        state: "",
    }
    //   获取表格数据
    const initTable = () => {
        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: q,
            success: (res) => {
                console.log(res);
                if (res.status !== 0) return layer.msg("获取文章列表失败")
                const htmlstr = template("tpl-table", res)
                $("tbody").html(htmlstr)
                renderPage(res.total)
            }
        })
    }
    $("#form-search").submit((e) => {
        e.preventDefault()
        q.cate_id = $("[name=cate_id]").val()
        q.state = $("[name=state]").val()
        initTable()
    })
    const initCate = () => {
        $.ajax({
            method: 'GET',
            url: "/my/article/cates",
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg("获取分类数据失败")
                }
                const htmlstr = template("tpl-cate", res)
                $("[name=cate_id").html(htmlstr)
                form.render();
            }
        })
    }
    const renderPage = (total) => {
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum,// 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],// 每页展示多少条
            // jump 触发条件
            // 1、渲染的时候就会先加载一次，此时first参数为 true
            // 2、切换页码的时候也会触发，此时 first 参数为 undefined
            jump: (obj, first) => {
                console.log(first);
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                // 渲染的时候不要调用，只有切换的时候才去调用
                if (!first) {
                    initTable()
                }
            }
        })
    }
    $("tbody").on("click",".btn-delete",function(){
        const len = $(".btn-delete").length;
        console.log(len);
        const id = $(this).attr("data-id");
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index){
            $.ajax({
                type: "GET",
                url: "/my/article/delete/" + id,
                success: (res) => {
                    if(res.status !== 0) return layer.msg('删除文章失败！')
                    layer.msg('删除文章成功')
                    if(len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
                    }
                    initTable()
                    layer.close(index);
                }
            })
        })
    })
    initTable();
    initCate();
    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
})