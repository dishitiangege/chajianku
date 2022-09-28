$(document).ready(function () {

    function tool(val) {
        $(".post").removeClass('visib')
        $('.post').css('display', 'inline-block')
        $('.post').css('display', 'none')
        $(".post:contains(" + val + ")").addClass('visib')
    }

    //全部
    $('#quanbu').click(function (e) {
        e.preventDefault();
        $('.post').css('display', 'inline-block')
    });

    //热门
    $('#remen').click(function (e) {
        e.preventDefault();
        tool('★★★★★')
    });

    //程序员必备
    $('#ITneed').click(function (e) {
        e.preventDefault();
        tool('算法')
        /* $(".post:contains('学习')").addClass('visib')
         $(".post:contains('计算机')").addClass('visib')
         $(".post:contains('面试')").addClass('visib')
         $(".post:contains('Java')").addClass('visib')
         $(".post:contains('程序')").addClass('visib')
         $(".post:contains('代码')").addClass('visib')
 */

    });

    //哔哩哔哩
    $('#bilibili').click(function (e) {
        e.preventDefault();

        tool('B站')
    });

    //完善优化
    $('#youhua').click(function (e) {
        e.preventDefault();

        tool('优化')
    });

    //工作办公
    $('#bangong').click(function (e) {
        e.preventDefault();

        tool('办公')
    });

    //工具筛选
    $('#gongju').click(function (e) {
        e.preventDefault();

        tool('工具')
    });

    //开发设计
    $('#kaifa').click(function (e) {
        e.preventDefault();

        tool('开发')
    });

    //影视音乐
    $('#yingyin').click(function (e) {
        e.preventDefault();

        tool('影音')
    });

    //美工
    $('#meihua').click(function (e) {
        e.preventDefault();

        tool('美化')
    });

    //电商
    $('#shopping').click(function (e) {
        e.preventDefault();

        tool('购物')
    });

    //其他资源
    $('#ziyuan').click(function (e) {
        e.preventDefault();

        tool('资源')
        /* $('.post').css('display', 'inline-block')
         $('.post').css('display', 'none')
         $('.tags:contains("资源")').parent().parent().parent().parent().parent().parent().addClass('visib')*/
    });
});