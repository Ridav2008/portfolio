let add = document.getElementById('add'),
    number = document.getElementById('number'),
    price = document.getElementById('price'),
    Subtotal = document.getElementById('Subtotal'),
    navebare = document.querySelector('.star'),
    clearBtn = document.getElementById('clear');

// navebare add && remove
window.onscroll = function () {
  if (scrollY > 550) {
    navebare.classList.add('navebare');
  } else {
    navebare.classList.remove('navebare');
  }
};

// ------------------localStorage price && number && subtotal ------------------
number.innerHTML = localStorage.num1 || 0;
price.innerHTML = localStorage.price1 || '$0';
if (Subtotal) Subtotal.innerHTML = localStorage.subtotal1 || '$0';

// ------------------ إظهار أو إخفاء زر clear ------------------
function toggleClearButton() {
  let currentPrice = parseFloat(localStorage.getItem('price1')?.replace('$', '')) || 0;
  if (clearBtn) {
    // إظهار أو إخفاء تدريجي دون تغيير مكان الزر
    clearBtn.style.opacity = currentPrice > 0 ? '1' : '0';
    clearBtn.style.pointerEvents = currentPrice > 0 ? 'auto' : 'none';
  }
}
toggleClearButton();

// ------------------ price && number (تحدِيث الـ subtotal أيضاً) ------------------
function addd(Value) {
  Value = +Value || 0;

  number.innerHTML = +number.innerHTML + 1;

  let current = parseFloat(price.innerHTML.replace('$','')) || 0;
  let total = current + Value;
  price.innerHTML = '$' + total;
  localStorage.num1 = number.innerHTML;
  localStorage.price1 = price.innerHTML;

  // تحديث subtotal في التخزين والـ DOM
  let sub = parseFloat((localStorage.subtotal1 || (Subtotal ? Subtotal.innerHTML : '$0')).replace('$','')) || 0;
  let newSub = sub + Value;
  localStorage.subtotal1 = '$' + newSub;
  if (Subtotal) Subtotal.innerHTML = '$' + newSub;
  toggleClearButton();
}
// ------------------ صفحة المنتج ------------------
function showData(imgSrc, num, name) {
  let item = `
    <article class="product flex">
      <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
      <p class="price">$${num}</p>
      <p class="title">${name}</p>
      <img style="border-radius:.2rem;" width="70" height="70" src="${imgSrc}" alt="">
    </article>
  `;
  let items = JSON.parse(localStorage.getItem('shopItems')) || [];
  items.push(item);
  localStorage.setItem('shopItems', JSON.stringify(items));

  console.log('عنصر جديد أُضيف بنجاح');
}
// ------------------ صفحة cart ------------------
window.addEventListener('DOMContentLoaded', () => {
  let Shop = document.getElementById('Shop');
  let items = JSON.parse(localStorage.getItem('shopItems')) || [];
  if (Shop && items.length > 0) {
    Shop.innerHTML = items.join('');
    console.log('✅ تم عرض جميع العناصر');
  }

  Shop?.addEventListener('click', (e) => {
    if (e.target.closest('.delete')) {
      const article = e.target.closest('.product');
      if (!article) return;

      const priceText = article.querySelector('.price').textContent.trim();
      const priceValue = parseFloat(priceText.replace('$', '')) || 0;

      // حذف من الواجهة
      article.remove();

      // حذف من localStorage (نبحث أول مطابقة ونحذفها)
      let items = JSON.parse(localStorage.getItem('shopItems')) || [];
      const index = items.findIndex((html) => html.includes(priceText));
      if (index !== -1) {
        items.splice(index, 1);
        localStorage.setItem('shopItems', JSON.stringify(items));
      }

      // تحديث السعر والعدد
      let currentPrice = parseFloat(localStorage.getItem('price1')?.replace('$', '')) || 0;
      let number = Math.max((+localStorage.getItem('num1') || 1) - 1, 0);
      let newPrice = Math.max(currentPrice - priceValue, 0);
      localStorage.setItem('num1', number);
      localStorage.setItem('price1', '$' + newPrice);
      let numberEl = document.getElementById('number');
      let priceEl = document.getElementById('price');
      if (numberEl) numberEl.innerHTML = number;
      if (priceEl) priceEl.innerHTML = '$' + newPrice;

      // تحديث Subtotal في التخزين والـ DOM
      let currentSub = parseFloat(localStorage.getItem('subtotal1')?.replace('$','')) || 0;
      let newSub = Math.max(currentSub - priceValue, 0);
      localStorage.setItem('subtotal1', '$' + newSub);
      if (Subtotal) Subtotal.innerHTML = '$' + newSub;

      toggleClearButton();
    }
  });
});

// ------------------ زر حذف السلة بالكامل ------------------
document.addEventListener('DOMContentLoaded', () => {
  const clearBtnLocal = document.getElementById('clear');
  if (clearBtnLocal) {
    clearBtnLocal.addEventListener('click', () => {
      localStorage.removeItem('shopItems');
      localStorage.removeItem('num1');
      localStorage.removeItem('price1');
      localStorage.removeItem('subtotal1');

      let Shop = document.getElementById('Shop');
      if (Shop) Shop.innerHTML = '';

      let number = document.getElementById('number');
      let price = document.getElementById('price');
      if (number) number.innerHTML = '0';
      if (price) price.innerHTML = '$0';
      if (Subtotal) Subtotal.innerHTML = '$0';
      
      toggleClearButton();
      console.log('تم مسح السلة وكل البيانات بنجاح!');
    });
  }
});