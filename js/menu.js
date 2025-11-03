let topp = document.getElementById('top')
let menu = document.getElementById('menu')
let dashbord = document.querySelector('ul')
let HtmlContent = document.getElementById('Html-content')
let jsContent = document.getElementById('js-content')
let cssContent = document.getElementById('css-content')
let RcContent = document.getElementById('Rc-content')
let eCo1 = document.getElementById('e-co1')
let eCo2 = document.getElementById('e-co2')
let eCo3 = document.getElementById('e-co3')
let eCo4 = document.getElementById('e-co4')

// عند الضغط يرجع للأعلى
function topWeb(){
    if ( window.scrollY > 322){
        topp.style.position = 'fixed'
        topp.style.display = 'flex'
    }else{
        topp.style.display = 'none'
    }
}


window.addEventListener('scroll' , topWeb)
topp.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    });
});


// menu with animation
function getMenu() {
  if (innerWidth <= 1052) {
    menu.style.display = 'none';
    dashbord.style.display = 'flex';
  }
}
function removeMenu() {
  if (innerWidth <= 1052) {
    menu.style.display = 'flex';
    dashbord.style.display = 'none';
  }
}
window.getMenu = function () {
  if (innerWidth >= 1052) return;
  menu.style.display = 'none';
  dashbord.style.cssText = "display:flex;opacity:0;transform:translateY(-10px);transition:.7s";
  dashbord.offsetHeight; 
  dashbord.style.opacity = 1; dashbord.style.transform = "translateY(0)";
};
window.removeMenu = function () {
  if (innerWidth >= 1052) return;
  dashbord.style.cssText += ";opacity:0;transform:translateY(-10px)";
  setTimeout(() => { dashbord.style.display = 'none'; menu.style.display = 'flex'; }, 400);
};

// أنيميشن السكرول
let elems = [HtmlContent, jsContent, cssContent, RcContent, eCo1, eCo2, eCo3, eCo4].filter(Boolean);
let io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationName = 'totop';
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0,            // نريد التفعيل بمجرد دخول العنصر إلى مجال المراقبة
  rootMargin: '0px 0px 10% 0px'  // هذا يجعل التفعيل قبل ظهور العنصر فعليًا بنسبة 20%
});

elems.forEach(el => io.observe(el));
