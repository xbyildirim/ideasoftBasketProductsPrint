function getCartItems() {
    var mainDataList = [];
    const cartItemsDiv = document.getElementById('cart-items');
    const cartItems = cartItemsDiv.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
        const productName = item.querySelector('.cart-item-name a').innerText;
        const productPrice = item.querySelector('.cart-item-price .item-rebate-price').innerText.trim();
        const productQuantity = item.querySelector('.product-quantity input').value.trim();
        const productImageURL = item.querySelector('.cart-item-image img').src.trim();
        productPrice == "" ? item.querySelector('.cart-item-price .item-price').innerText.trim() : productPrice;
        mainDataList.push({
            productName: productName,
            productPrice: productPrice,
            productQuantity: productQuantity,
            productImageURL: productImageURL
        })
    }
    );
    var totalPrice = document.querySelector('[data-selector="total-amount"]').innerText;
    function turkishToText(str) {
        const turkishMapping = {
            'ç': 'c',
            'ğ': 'g',
            'ı': 'i',
            'ö': 'o',
            'ş': 's',
            'ü': 'u',
            'Ç': 'C',
            'Ğ': 'G',
            'İ': 'I',
            'Ö': 'O',
            'Ş': 'S',
            'Ü': 'U'
        };
        return str.replace(/[çğıöşüÇĞİÖŞÜ]/g, function(char) {
            return turkishMapping[char] || char
        })
    }
    let tableItems = '';
    mainDataList.forEach(element => {
        tableItems += `
            <tr>
                <td style="width:10px; text-align: center"><img src="${element.productImageURL}" alt="${element.productName}" style="width: 60%; height:50%"></td>
                <td style="width:170px; text-wrap: wrap; white-space: nowrap;">${turkishToText(element.productName)}</td>
                <td style="width:50px">${element.productQuantity}</td>
                <td style="width:50px">${element.productPrice}</td>
            </tr>
        `
    }
    );
    var htmlString = `
        <!DOCTYPE html>
        <html lang="tr-TR">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <meta name="description" content="Yazdırma fonksiyonu, full stack freelancer web developer xbyildirim tarafından hazırlanmıştır.">
                <meta name="keywords" content="xbyildirim, full stack ,freelancer web developer">
                <meta name="author" content="xbyildirim">
                <style>
                    #writeBody {white-space: nowrap;}
                    table {
                        border-collapse: collapse !important;
                    }
                    th, td {
                        border: 1px solid #ccc !important;
                        padding: 6px !important;
                        text-align: center !important;
                        text-wrap: wrap;
                        white-space: nowrap;
                    }
                    body {
                        font-family: 'Roboto-Regular', Arial, Helvetica, sans-serif;
                    }
                </style>
            </head>
            <body id="writeBody">
                <div>
                <div style="width:100%; display:flex; margin-top:20px; margin-bottom:20px; padding-left:45px;">
                    <p style="font-size:20px">AEON</p>
                </div>        
                <table style="width:95%; height: 100px; margin:0 auto;">
                        <thead style="text-align:center; background:#ccc;">
                            <tr>
                                <th>Ürün Görseli</th>
                                <th>Ürün Ad</th>
                                <th>Miktar</th>
                                <th>Toplam</th>
                            </tr>
                        </thead>
                        <tbody style="font-size:15px;">
                            ${tableItems}
                        </tbody>
                    </table>
                </div>
                <div style="width:100%; display:flex; margin-top:20px; padding-right:50px; justify-content: flex-end;">
                    <p style="font-size:22px">Genel Toplam : ${totalPrice}</p>
                </div>
            </body>
        </html>
    `;
    const {jsPDF} = window.jspdf;
    var doc = new jsPDF('l','px',[1365, 961]);
    doc.addFileToVFS('Roboto-Regular.ttf', fontExample);
    doc.addFont('Roboto-Regular.ttf', 'Roboto-Regular', 'normal');
    const htmlElement = document.createElement('html');
    htmlElement.innerHTML = htmlString;
    doc.setFont('Roboto-Regular');
    const divElement = document.createElement('div');
    divElement.id = 'aeonisiDiv';
    divElement.appendChild(htmlElement);
    document.body.appendChild(divElement);
    doc.html(document.getElementById("aeonisiDiv"), {
        callback: function(pdf) {
            pdf.save("sepetD.pdf")
        },
        x: 15,
        y: 15,
        html2canvas: {
            scale: 0.70
        }
    })
}
function elementsFunc() {
    if (window.location.pathname === '/sepet') {
        const cartButtonsElements = document.querySelectorAll('.cart-buttons');
        if (cartButtonsElements.length > 0) {
            const writeBtn = document.querySelector('.writeButton');
            if (writeBtn == null) {
                cartButtonsElements.forEach(element => {
                        element.style.display = 'flex';
                        const newButton = document.createElement('button');
                        newButton.className = 'btn btn-sm btn-primary writeButton';
                        newButton.style.marginLeft = "10px";
                        newButton.innerHTML = `<span>YAZDIR</span>`;
                        newButton.onclick = function() {
                            getCartItems()
                        };
                        element.appendChild(newButton)
                    }
                )
            }
        }
    }
}
setInterval( () => {
    elementsFunc()
}
, 1000);
$(document).ready(function() {
    elementsFunc()
})