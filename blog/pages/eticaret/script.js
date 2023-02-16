let products = [
    {
        name: "Dell Inspiron 7710",
        image: "https://m.media-amazon.com/images/I/71O2OURn+yL._AC_SY355_.jpg",
        price: 34.973,
        stock: 10
    },
    {
        name: "Steelseries Apex 5",
        image: "https://m.media-amazon.com/images/I/71xVotbL3kL._AC_SX679_.jpg",
        price: 2.026,
        stock: 8
    },
    {
        name: "Acer Aspire 7",
        image: "https://m.media-amazon.com/images/I/71v0Qf+ih5L._AC_SX425_.jpg",
        price: 15.699,
        stock: 7
    },
    {
        name: "MSI NB GF63 THIN 11UD-615XTR",
        image: "https://m.media-amazon.com/images/I/71ttPN2OS3L._AC_SX425_.jpg",
        price: 22.499,
        stock: 40
    },
    {
        name: "Fırfırlı Balon Kollu Pamuklu Bluz",
        image: "https://cdn.dsmcdn.com/ty83/product/media/images/20210316/8/71954755/118384899/1/1_org_zoom.jpg",
        price: 210,
        stock: 40
    },
    {
        name: "Bebek Pamuklu Kot Gömlek",
        image: "https://cdn.dsmcdn.com/ty222/product/media/images/20211103/20/165206354/225228591/1/1_org_zoom.jpg",
        price: 209,
        stock: 70
    },
    {
        name: "Pamuklu Kargo Pantolon",
        image: "https://cdn.dsmcdn.com/ty24/product/media/images/20201114/13/26184850/63802247/1/1_org_zoom.jpg",
        price: 330,
        stock: 54
    },
    {
        name: "Kız Çocuk Pamuklu Pembe Mont",
        image: "https://cdn.dsmcdn.com/ty690/product/media/images/20230117/21/260554418/676939334/1/1_org_zoom.jpg",
        price: 699,
        stock: 86
    }
]

let baskets = [];
let orders = [];

showProducts();
setBasketCount();
checkBasketCountForPaymentButton();
setOrderSpanCount();

function showProducts() {
    let count = products.length;
    let element = `<div class="row">`;
    for (let i = 0; i < count; i++) {
        element += `
        <div class="col-md-3">
        <div class="card mb-4">
            <img src="${products[i].image}" class="card-img-top mx-auto mt-1" alt="...">
            <div class="card-body">
                <h5 class="card-title">${products[i].name}</h5>
                <span class="card-text">Fiyat: ${products[i].price} ₺</span>
                <p class="card-text text-bg-danger">Kalan Adet: ${products[i].stock}</p>
                <a href="#" onclick="addBasket(${i})" class="btn btn-warning">Sepete Ekle</a>
            </div>
        </div>
        </div>
        `
    }
    element += `</div>`;

    let pdoructsElement = document.getElementById("product");
    pdoructsElement.innerHTML = element;

}

function setBasketCount() {
    let element = document.getElementById("basketcount");
    if (baskets.length == 0) {
        document.getElementById("basketSpanElement").className += "hidden"
        element.className += "hidden"
    } else {
        document.getElementById("basketSpanElement").className = "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger";
        element.className = ""
    }
    element.innerText = baskets.length
}

function addBasket(index) {
    baskets.push(products[index]);
    setBasketCount();
    checkBasketCountForPaymentButton();
}

function setBasketModalTable() {
    let body = document.getElementById("tbody");
    let element = "";
    for (let i = 0; i < baskets.length; i++) {
        element += `
        <tr id="trElement${i}">
            <td>${i + 1}</td>
            <td>${baskets[i].name}</td>
            <td><img src="${baskets[i].image}" width="50"</td>
            <td>1</td>
            <td>${baskets[i].price}</td>
            <td>${baskets[i].price * 1}</td>
            <td>
                <button onclick="removeBasketById(${i})" class="btn btn-outline-danger btn-sm">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        </tr>
        `
    }

    body.innerHTML = element
}

function removeBasketById(index) {
    baskets.splice(index, 1);
    setBasketCount();
    let trElement = document.getElementById("trElement" + index);
    console.log(trElement.remove());
    checkBasketCountForPaymentButton();
}

function checkBasketCountForPaymentButton() {
    let paymentButton = document.getElementById("paymentbutton");
    if (baskets.length == 0) {
        try {
            paymentButton.setAttribute("disabled", "disabled");
        } catch (e) {

        }
    } else {
        try {
            paymentButton.removeAttribute("disabled");
        } catch (e) {

        }
    }
}

function pay() {
    let total =0;
    baskets.forEach(element=>{
        total += element.price;
    })
    let order = {
        "date": new Date(),
        "baskets": baskets,
        "total": total
    }

    baskets = [];
    setBasketModalTable();
    checkBasketCountForPaymentButton();

    orders.push(order);

    setOrderSpanCount();
    let modalCloseBtn = document.getElementById("basketModalCloseBtnn")
    modalCloseBtn.click();
}

function setOrderSpanCount() {
    let element = document.getElementById("OrderSpanCount");
    element.innerHTML = orders.length;
}

function showMyOrder() {
    let tbody = document.getElementById("ordertbody")

    let element = "";
    for (let i = 0; i < orders.length; i++) {
        let date =  orders[i].date.getDate()+"."+orders[i].date.getMonth()+"."+orders[i].date.getFullYear() + " " + orders[i].date.getHours()+":"+orders[i].date.getMinutes()+":"+orders[i].date.getSeconds();

        element += `
        <tr>
            <td>${i + 1}</td>
            <td>${date}</td>
            <td>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ürün Adı</th>
                            <th>Ürün Resmi</th>
                            <th>Ürün Adeti</th>
                            <th>Fiyat</th>
                            <th>Toplam</th>
                        </tr>
                    </thead>
                    <tbody>
                    `
                    let products = "";
                    for (let x = 0; x < orders[i].baskets.length; x++) {
                        products +=  `
                        <tr>
                            <td>${x + 1}</td>
                            <td>${orders[i].baskets[x].name}</td>
                            <td><img src="${orders[i].baskets[x].image}" width="50"</td>  
                            <td>1</td>                              
                            <td>${orders[i].baskets[x].price}</td>
                            <td>${orders[i].baskets[x].price * 1}</td>
                        </tr>
                        `
                    }
                    element += products;
        element += `
                        <tr class="alert alert-danger">
                            <td colspan="5">Toplam</td>
                            <td>${orders[i].total}</td>
                        </tr>  
                    </tbody>
                </table>
            </td>
        </tr>
       `
    }

    tbody.innerHTML = element;
}
