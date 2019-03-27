// 右侧导航条
export const getSer = () => {
    var $sideBar = $('#sideBar');
    $(window).scroll(function () {
        sideBar();
    });

    function sideBar() {
        if ($('#banner').offset().top <= $(window).scrollTop()) {
            $sideBar.css({
                top: 20
            });
        } else {
            $sideBar.css({
                top: 232
            });
        }

    }

    sideBar();

    var $mainCont_item = $('[js-move]');
    var $sideBar_btn = $('.sideBar-list').find('a').not($('.sideBar-list').find('a').last());
    $sideBar_btn.click(function () {
        var index = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $("html,body").stop().animate({
            scrollTop: $mainCont_item.eq(index).offset().top
        });
        return false;
    });
    $(window).scroll(function () {
        $mainCont_item.each(function (i) {
            if ($(window).scrollTop() > $mainCont_item.eq(i).offset().top - 300) {
                $sideBar_btn.eq(i).addClass('cur').siblings().removeClass('cur');
            }
            if ($(window).scrollTop() < 500) {
                $sideBar_btn.removeClass('cur');
            }

        });
    });
}