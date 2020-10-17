;(function() {
    var $list = $(".goods-list");
    var $divs = $list.find("div");
    var page = document.querySelector(".pagination");
    var dataCount = 12;
    var currentPage = 0;
    var allData =[];
    var num = 0;
    $('.list li').each(function(){
        $(this).click(function() {
            $(this).addClass("active").siblings().removeClass("active");
        })
    })

    QF.get("../php/goodsInfo.php", {}, function({error,data}) {
        if (!error) {
            allData = data;
            var arr = data.slice(currentPage * dataCount, currentPage * dataCount + dataCount);
            renderData(arr);
            num = Math.ceil(data.length / 12);
            // console.log(num);
            renderPage(currentPage);
        }
    });

    page.onclick = function(e) {
        // 通过e判断点击到的是谁
        if (e.target.className === "leftBtn") {
            // 点击左按钮 让当前页--
            currentPage--;
            // 边界判断
            if (currentPage < 0) {
                currentPage = 0;
                return;
            }
            // 截取数据
            var arr = allData.slice(currentPage * dataCount, currentPage * dataCount + dataCount);
            // 根据数据渲染结构
            renderData(arr);
            renderPage(currentPage);
        } else if (e.target.className === "rightBtn") {
            // 点击有按钮 当前页++
            currentPage++;
            // 边界判定
            if (currentPage > num) {
                currentPage = num;
                return;
            }
            // 截取数据
            var arr = allData.slice(currentPage * dataCount, currentPage * dataCount + dataCount);
            // 根据数据渲染结构
            renderData(arr);
            renderPage(currentPage);
        } else if (e.target.className === "num") {
            if (currentPage === e.target.innerHTML - 1) {
                return;
            }
            // 当前页变为 点击按钮的页数 -1
            currentPage = e.target.innerHTML - 1;
            // 截取数据
            var arr = allData.slice(currentPage * dataCount, currentPage * dataCount + dataCount)
            // 根据数据渲染结构
            renderData(arr);
            renderPage(currentPage);
        }
    }

    function renderData(data) {
        for (var i = 0; i < $divs.length; i++) {
            $divs.eq(i).html("");
        }
        data.forEach((value, index) => {
                $divs.eq(index % 3).append(`
                <dl>
                    <dt>
                        <img src="${value.imageUrl}" alt="">
                    </dt>
                    <dd>
                        <p class="title">${value.title}</p>
                        <p class="price">
                            <span>￥${value.actualCurrentPrice}</span>
                            <span>￥${value.marketPrice}</span>
                        </p>
                        <p class="cart"><a class="addToCart" role="button" data-id="${value.goodsId}">加入购物车</a></p>
                    </dd>
                </dl>
                `);
        })
    }

    function renderPage() {
        // 判断当前页
        var str = ` <li>
            <a aria-label="Previous">
                <span class="leftBtn" aria-hidden="true">&laquo;</span>
            </a>
        </li>`;
        if (num < 10){
            for (var i = 0; i < 9; i++) {
                str += `<li><a class="num">${i + 1}</a></li>`;
            }
        } else {
            if (currentPage <= 6) {
                    for (var i = 0; i < 4; i++) {
                        str += `<li><a class="num">${i + 1}</a></li>`;
                    }
                }else {
                    var end = currentPage + 4 > num ? num : currentPage + 4;
                    for (var i = currentPage - 6; i < end; i++) {
                        str += `<li><a class='num'>${i + 1}</a></li>`;
                    }
                }
        }
        str += `<li>
            <a aria-label="Next">
               <span class="rightBtn" aria-hidden="true">&raquo;</span>
            </a>
        </li>`;

        page.innerHTML = str;
    }

    $list.click(function(e) {
        if (e.target.className.includes("addToCart")) {
            // 获取当前商品的信息
            var goods_id = e.target.getAttribute("data-id");
            // 拿id去本地存储看一看是否有
            var arr = JSON.parse(localStorage.getItem("shoppingCartInfo")) || [];
            var goods_item = arr.find(function(value) {
                return value.goodsId === goods_id;
            });
            // 判断
            if (goods_item) {
                goods_item.number++;
            } else {
                // 不存在 拿id去大数组里找
                goods_item = allData.find(function(value) {
                    return value.goodsId === goods_id;
                });
                // 设置一个number属性为1 直接往本地存储数组里存储
                goods_item.number = 1;
                arr.push(goods_item);
            }
            // 将修改后的数据放回本地存储
            localStorage.setItem("shoppingCartInfo", JSON.stringify(arr));
        }
    })

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

    $(window).scroll(function() {
        toggleTool();
    })

    $('.back').click(function() {
        $('body,html').animate({
            scrollTop: "0px"
        });
    })
})()
