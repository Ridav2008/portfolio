let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sipia = document.getElementById('sipia');
let grayscale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let upload = document.getElementById('upload');
let hueRotate = document.getElementById('hue-rotate');
let download = document.getElementById('download');
let img = document.getElementById('img');
let reset = document.querySelector('span');
let imgBox = document.querySelector('img-box');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
window.onload = function(){
    download.style.display = 'none';
    reset.style.display = 'none';
}
upload.onchange = function(){
    restValue();
    download.style.display = 'block';
    reset.style.display = 'block';
    let file = new FileReader()
    file.readAsDataURL(upload.files[0])
    file.onload = function(){
       img.src = file.result; 
    }
   img.onload = function(){
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img,0,0,canvas.width,canvas.height)
    img.style.display = 'none'
   }
}
function restValue(){
    img.style.filter = 'none'
    saturate.value = '100' 
    contrast.value = '100' 
    brightness.value = '100' 
    sipia.value = '0' 
    grayscale.value = '0' 
    blur.value = '0' 
    hueRotate.value = '0' 
}
let filters = document.querySelectorAll('ul li input')
filters.forEach(filter => {
    filter.addEventListener('input' , function() {
        ctx.filter = `
        saturate( ${saturate.value}% )
        contrast( ${contrast.value}% )
        brightness( ${brightness.value}% )
        sepia( ${sipia.value}% )
        grayscale( ${grayscale.value} )
        blur( ${blur.value}px )
        hue-rotate( ${hueRotate.value}deg )
        `
    ctx.drawImage(img,0,0,canvas.width,canvas.height)
    })
});
download.onclick = function(){
    download.href = canvas.toDataURL();
}