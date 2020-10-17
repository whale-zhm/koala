;(function () {
    var $brand = $(".brand");
    var $brand1 = $(".brand1");
    var $brand2 = $(".brand2");
    var $brand3 = $(".brand3");
    var $brand4 = $(".brand4");

    function sendAjax1() {
        return new Promise(function(resolve, reject) {
            QF.get("../php/bag.php", {}, function(data){
                if (!data.error) {
                    resolve(data.data);
                    renderData(data.data,$brand)
                }
            })
        })
    }
    function sendAjax2() {
        return new Promise(function(resolve, reject) {
            QF.get("../php/bag2.php", {}, function(data){
                if (!data.error) {
                    resolve(data.data);
                    renderData(data.data,$brand1)
                }
            })
        })
    }
    function sendAjax3() {
        return new Promise(function(resolve, reject) {
            QF.get("../php/bag3.php", {}, function(data){
                if (!data.error) {
                    resolve(data.data);
                    renderData(data.data,$brand2)
                }
            })
        })
    }
    function sendAjax4() {
        return new Promise(function(resolve, reject) {
            QF.get("../php/clothing.php", {}, function(data){
                if (!data.error) {
                    resolve(data.data);
                    renderData(data.data,$brand3)
                }
            })
        })
    }
    function sendAjax5() {
        return new Promise(function(resolve, reject) {
            QF.get("../php/shoes.php", {}, function(data){
                if (!data.error) {
                    resolve(data.data);
                    renderData(data.data,$brand4)
                }
            })
        })
    }
    async function demo() {
        var data1 = await sendAjax1();
        var data2 = await sendAjax2();
        var data3 = await sendAjax3();
        var data4 = await sendAjax4();
        var data5 = await sendAjax5();
    }
    demo();

    function renderData(data,brand) {
        var brand = brand;
        data.forEach((value) => {
            brand.append(`
            <dl>
                <dt>
                    <img src="${value.img}" alt="">
                </dt>
                <dd>
                    <img src="${value.logo}" alt="">
                    <p class="title">${value.name}</p>
                    <p class="other">${value.sellPoint}&gt;</p>
                </dd>
            </dl>
            `)
        })
    }
})()

;(function(){
    var toolTop = $('.w').offset().top;
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $('.sub').fadeIn();
        } else {
            $('.sub').fadeOut();
        }
    }

    $(window).scroll(function () {
        toggleTool();
        $('.container .content').each(function(i, ele) {
            if ($(document).scrollTop() >= $(ele).offset().top) {
                $(".nav li span").eq(i).css("display","block").parent().siblings().find("span").css("display","none");
            }
        })
    })

    $(".nav li").click(function () {
        var current = $(".container .content").eq($(this).index()).offset().top;
        $("body,html").stop().animate({
            scrollTop: current
        });
        $(this).addClass("active").siblings().removeClass();
    })

    $('.back').click(function() {
        $('body,html').animate({
            scrollTop: "0px"
        });
    })
    
    $('.list li').each(function(){
        $(this).mouseenter(function() {
            $(this).css("color", "red").siblings().css("color", "")
        })
        $(this).mouseout(function() {
            $(this).css("color", "")
        })
    })
    
})()
