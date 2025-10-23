let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count')
let Category = document.getElementById('Category');
let submit = document.getElementById('submit');

let mode = 'create'
let tmp;
function getTotal(){
    if(price.value >= 1001){
        total.style.background = 'rgb(124, 8, 8)'
        total.innerHTML = '0'
        total.innerHTML = 'not defind'
        price.style.border = 'solid 1px rgb(124, 8, 8)'
    }
    else if (price.value != '' ) {
        let rusolt = ( +price.value + +taxes.value + +ads.value - +discount.value)
        total.innerHTML = rusolt
        total.style.background = 'rgb(0, 47, 17)'
        price.style.border = '1px solid rgb(27, 146, 0)'
        price.focus.border = '1px solid rgb(27, 146, 0)'
    }
    else{
        total.style.background = 'rgb(124, 8, 8)'
        total.innerHTML = '0'
        price.style.border = 'none'
    }
}
let datPro;
if (localStorage.product != null){
    datPro = JSON.parse(localStorage.product)
}
else{
    datPro = [];
}
submit.onclick = function(){
    let newPro = {  
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        Category:Category.value.toLowerCase(),
    }
    if(title.value != '' && price.value != '' && Category.value != '' && newPro.count < 100){
          if (mode === 'create') {
        if (newPro.count > 0) {
        for (let i = 0; i < newPro.count; i++) {
            datPro.push(newPro);
        }
        }else{
        datPro.push(newPro);
        }
        }else{
        datPro[  tmp  ] = newPro;
        mode = 'create'
        submit.innerHTML = 'create'
        count.style.display = 'block'
        
    }  
       ClearData()
    }

    localStorage.setItem('product',JSON.stringify(datPro))
  
     showData()
}
function ClearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '0';
    total.style.background =  'rgb(124, 8, 8)';
    count.value = '';
    Category.value = '';
}
function showData(){
    let table = '';
    for (let i = 0; i < datPro.length; i++) {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${datPro[i].title}</td>
            <td>${datPro[i].price}</td>
            <td>${datPro[i].taxes}</td>
            <td>${datPro[i].ads}</td>
            <td>${datPro[i].discount}</td>
            <td>${datPro[i].total}</td>
            <td>${datPro[i].Category}</td>
            <td><button onclick='updateData(${i})' id="update">update</button></td>
            <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
        </tr>
        `;
        
    }
    let DeletAll = document.getElementById('deletAll')
        if(datPro.length > 0){
            DeletAll.innerHTML =  `
            
        <button onclick="DeletAll()" >DeletAll</button>
        
            `
        }
        else{
            DeletAll.innerHTML = '';
        }
    document.getElementById('tbody').innerHTML = table;
}
showData()
function updateData(i){
    title.value = datPro[i].title;
    price.value = datPro[i].price;
    taxes.value = datPro[i].taxes;
    ads.value = datPro[i].ads;
    discount.value = datPro[i].discount;
    getTotal()
    Category.value = datPro[i].Category;
    count.style.display = 'none'
    submit.innerHTML = 'update';
    mode = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}
function deleteData(i){
    datPro.splice(i,1)
    localStorage.product = JSON.stringify(datPro);
    showData()
}
function DeletAll(){
    localStorage.clear()
    datPro.splice(0)
    showData()
}
let searchMod = 'title';

function getSearchMod(id){
    let search = document.getElementById('search')
    if (id == 'searchTitle' ) {
        searchMod = 'title';
    }
    else{
        searchMod = 'Category';
    }
    search.placeholder = 'searh by '+searchMod
    search.focus()
    search.value = ''
    showData()
}
function searchData(value){
    let table ='';
    if(searchMod == 'title'){
        for (let i = 0; i < datPro.length; i++) {
            if(datPro[i].title.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${datPro[i].title}</td>
                        <td>${datPro[i].price}</td>
                        <td>${datPro[i].taxes}</td>
                        <td>${datPro[i].ads}</td>
                        <td>${datPro[i].discount}</td>
                        <td>${datPro[i].total}</td>
                        <td>${datPro[i].Category}</td>
                        <td><button onclick='updateData(${i})' id="update">update</button></td>
                        <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
                    </tr>
                    `;
            }
            
        }
    }else{
         for (let i = 0; i < datPro.length; i++) {
            if(datPro[i].Category.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${datPro[i].title}</td>
                        <td>${datPro[i].price}</td>
                        <td>${datPro[i].taxes}</td>
                        <td>${datPro[i].ads}</td>
                        <td>${datPro[i].discount}</td>
                        <td>${datPro[i].total}</td>
                        <td>${datPro[i].Category}</td>
                        <td><button onclick='updateData(${i})' id="update">update</button></td>
                        <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
                    </tr>
                   `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}