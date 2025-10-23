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
function handleScroll() {
  const w = window.innerWidth;
  const y = window.scrollY;
//  الحالة 1: شاشة كمبيوترأكبر من 980px
  if (w >= 980) {
    if (y > 138) {
      jsContent.style.animationName = 'totop'
      HtmlContent.style.animationName = 'totop'
      cssContent.style.animationName = 'totop'
      RcContent.style.animationName = 'totop'
    }
    if (y > 808) {
      eCo1.style.animationName = 'totop';
      eCo2.style.animationName = 'totop';
      eCo3.style.animationName = 'totop';
      eCo4.style.animationName = 'totop';
    }
  }
//(عرض أقل أو يساوي 450px)
  else if (w <= 450) {
    if (y > 102) {
      HtmlContent.style.animationName = 'skills2'
    }
    if (y > 341) {
      cssContent.style.animationName = 'skills'
    }
    if (y > 573) {
      jsContent.style.animationName = 'skills2'
    }
    if (y > 772) {
      RcContent.style.animationName = 'skills'
    }
    if (y > 1170 ) {
      eCo1.style.animationName = 'totop';
    }
    if (y > 1497) {
      eCo2.style.animationName = 'totop';
    }
    if (y > 1806) {
      eCo3.style.animationName = 'totop';
    }
    if (y > 2102) {
      eCo4.style.animationName = 'totop';
    }
  }
//(بين 450 و 1052)
  else if (w > 450 && w <= 1052) {
    if (y > 102) {
      jsContent.style.animationName = 'skills'
      HtmlContent.style.animationName = 'skills2'
      cssContent.style.animationName = 'skills2'
      RcContent.style.animationName = 'skills'
    }
    if (y > 685) {
      eCo1.style.animationName = 'totop';
      eCo2.style.animationName = 'totop';
      eCo3.style.animationName = 'totop';
      eCo4.style.animationName = 'totop';
    }
  }
}
// إضافة الأحداث
window.addEventListener('scroll', handleScroll);