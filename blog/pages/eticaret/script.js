let products = [];
let baskets = [];
let orders = [];

const getProducts = async () => {
    const response = await fetch("/blog/data.json");
    const productList = await response.json();
    products = productList;
    showProducts();
}


getProducts()
showProducts();
setBasketCount();
checkBasketCountForPaymentButton();
setOrderSpanCount();

function showProducts() {
    let count = products.length;
    let electronicsElement = "";
    let accessorryElement = ""
    let fashionElement = ""
    for (let i = 0; i < count; i++) {
        let element = `
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
            <div class="card mb-4">
                <div style="min-height:250px" class="d-flex align-items-center justify-content-center">
                    <img src="${products[i].image}" height="300px" class="card-img-top w-50 img-fluid" alt="product">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${products[i].name}</h5>
                    <h6 class="card-text">Category: ${products[i].category}</h6>
                    <span class="card-text">Price: ${products[i].price} ₺</span>
                    <p class="card-text text-bg-danger">Stock: ${products[i].stock}</p>
                    <a href="#" onclick="addBasket(${i})" class="btn btn-warning">Add to Basket</a>
                </div>
            </div>
        </div>
        `

        if (products[i].category === "electronics") {
            electronicsElement += element
        } else if (products[i].category === "jewelery") {
            accessorryElement += element
        } else if (products[i].category === "fashion") {
            fashionElement += element
        }


    }

let electronicElements = document.getElementById("productElectronic");
electronicElements.innerHTML += electronicsElement;

let accessorryElements = document.getElementById("productAccessory");
accessorryElements.innerHTML += accessorryElement

let fashionElements = document.getElementById("productFashion");
fashionElements.innerHTML += fashionElement
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
    const totalQuantity = baskets.reduce((acc, cur) => acc + cur.quantity, 0);
    element.innerText = totalQuantity;
}

function addBasket(index) {
    let product = products[index];
    let existingBasket = baskets.find(basketProduct => basketProduct.name === product.name);

    if (product.stock > 0) {
        if (existingBasket) {
            existingBasket.quantity++;
        } else {
            baskets.push({ ...product, quantity: 1 });
        }
        products[index].stock--;
        setBasketCount();
        setBasketModalTable();
        checkBasketCountForPaymentButton();
        showProducts()
    } else {
        alert("Stokta yeterli ürün yok!");
    }
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
            <td>${baskets[i].quantity}</td>
            <td>${baskets[i].price}</td>
            <td>${baskets[i].price * baskets[i].quantity}</td>
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
    let existingBasket = baskets[index];

    if (existingBasket.quantity > 1) {
        existingBasket.quantity--;
        let product = products.find(product => product.name === existingBasket.name);
        product.stock++;
    } else {
        baskets.splice(index, 1);
        let product = products.find(product => product.name === existingBasket.name);
        product.stock++;
    }
    setBasketCount();
    setBasketModalTable();
    checkBasketCountForPaymentButton();
    showProducts();
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
    let total = 0;
    baskets.forEach(element => {
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

    setBasketCount()
}

function setOrderSpanCount() {
    let element = document.getElementById("OrderSpanCount");
    element.innerHTML = orders.length;
}

function showMyOrder() {
    let tbody = document.getElementById("ordertbody")

    let element = "";
    for (let i = 0; i < orders.length; i++) {
        let date = orders[i].date.getDate() + "." + orders[i].date.getMonth() + "." + orders[i].date.getFullYear() + " " + orders[i].date.getHours() + ":" + orders[i].date.getMinutes() + ":" + orders[i].date.getSeconds();

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
            products += `
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
