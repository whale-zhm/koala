;(function() {
    // 获取元素
    var tbody = document.querySelector("tbody");
    var thead = document.querySelector("thead");
    var panelBody = document.querySelector(".allPrice");
    var counte = document.querySelector(".counter");

    function count() {
        // 获取本地存储数据
        var shoppingCart = JSON.parse(localStorage.getItem("shoppingCartInfo"));
        var sum = shoppingCart.filter(function(value) {
            return value.isSelected;
        })
        .reduce(function(prev, value) {
            return prev + value.actualCurrentPrice * value.number;
        },0);
        
        panelBody.innerHTML = sum;
    }

    function counter() {
        var shoppingCart = JSON.parse(localStorage.getItem("shoppingCartInfo"));
        var num = shoppingCart.filter(function(value){
            return value.isSelected;
        })
        .reduce(function(prev, value) {
            return prev + value.number;
        },0);
        counte.innerHTML = num
    }

    function render() {
        // 获取本地存储
        var arr = JSON.parse(localStorage.getItem("shoppingCartInfo")) || [];
        // 判断是否都是选中
        var isAllChecked = arr.every(function(value) {
            return value.isSelected;
        })
        thead.innerHTML = `<tr>
            <th class="text-center"><input ${isAllChecked ? "checked" : ""} type="checkbox" id="">全选</th>
            <th class="text-center">商品图片</th>
            <th class="text-center">商品信息</th>
            <th class="text-center">单元(元)</th>
            <th class="text-center">商品数量</th>
            <th class="text-center">金额(元)</th>
        </tr>`

        // 获取本地存储
        var arr = JSON.parse(localStorage.getItem("shoppingCartInfo")) || [];
        var str = '';
        arr.forEach(function(value) {
            str += `<tr>
                <td><input ${value.isSelected ? "checked" : ""} data-id="${value.goodsId}" type="checkbox"></td>
                <td class="imgli"><img src="${value.imageUrl}"></td>
                <td>${value.title}</td>
                <td>${value.actualCurrentPrice}</td>
                <td>
                <button data-id="${value.goodsId}">+</button>
                <span class="count">${value.number}</span>
                <button data-id="${value.goodsId}">-</button>
                </td>
                <td>${value.actualCurrentPrice * value.number}</td>
            </tr>`;
        });
        tbody.innerHTML = str;
    }
    render();
    counter()
    count();

    // 通过事件委托 绑定事件
    thead.onclick = function(e) {
        if (e.target.tagName === "INPUT") {
            var isAllChecked = e.target.checked;
            var shoppingCart = JSON.parse(localStorage.getItem("shoppingCartInfo"));
            shoppingCart.forEach(function(value) {
                value.isSelected = isAllChecked;
            });
            localStorage.setItem("shoppingCartInfo", JSON.stringify(shoppingCart));
            count();
            counter()
            render();
        }
    }

    tbody.onclick = function(e) {
        // 获取本地存储的数据
        var shoppingCart = JSON.parse(localStorage.getItem("shoppingCartInfo"));
        if (e.target.tagName === "INPUT") {
            // 获取信息的ID
            var id = e.target.getAttribute("data-id");
            // 先找到商品
            var product = shoppingCart.find((value) => {
                return value.goodsId === id;
            })
            // 给它添加一个属性
            product.isSelected = e.target.checked;
            localStorage.setItem("shoppingCartInfo", JSON.stringify(shoppingCart));
            count();
            counter()
            render();
            
        } else if (e.target.innerHTML === "+") {
            var id = e.target.getAttribute("data-id");
            // 先找到商品
            var product = shoppingCart.find((value) => {
                return value.goodsId === id;
            })
            // 让商品数量加1
            product.number++;
            // 存回本地存储
            localStorage.setItem("shoppingCartInfo", JSON.stringify(shoppingCart));
            render();
            counter()
            count();
        } else if (e.target.innerHTML === "-") {
            var id = e.target.getAttribute("data-id");
            // 先找到商品
            var product = shoppingCart.find((value) => {
                return value.goodsId === id;
            })
            // 让商品数量加1
            product.number--;
            // 判定如果等于0
           if (product.number === 0) {
                // 获取商品下标
                var idx = shoppingCart.indexOf(product);
                shoppingCart.splice(idx,1);
           }
            // 存回本地存储
            localStorage.setItem("shoppingCartInfo", JSON.stringify(shoppingCart));
            render();
            counter()
            count();
        }
    }


})();