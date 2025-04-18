const canvas = document.querySelector('.canvas');
const cd = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
gsap.registerPlugin(ScrollTrigger);
let mouse = {
  x: 0,
  y: 0
}
function distance(x1,y1,x2,y2){
  return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
}
class particles{
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.tempradius = radius;
    this.color = color;
    this.dx = Math.random() * 1 - .5;
    this.dy = Math.random() * 1 - .5;
  }
  draw() {
    cd.beginPath();
    cd.fillStyle = this.color;
    cd.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    cd.fill();
    cd.closePath();
    this.x += this.dx;
    this.y += this.dy;
    if(this.x>canvas.width){
      this.x = 0;
  }
  if(this.x<0){
    this.x = canvas.width;
  }
  if(this.y>canvas.height){
    this.y = 0;
  }
  if(this.y<0){
    this.y = canvas.height;
  }
  
  if(distance(this.x,this.y,mouse.x,mouse.y) < 150){

    if(this.radius<3){
    this.radius += 0.3;
    }
    
  }
  else{
    if(this.radius>this.tempradius){
      this.radius -= 0.1;
    }
    else{
      this.radius = this.tempradius
    }
  }
}
}
window.onresize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
const particlesArray = [];
let myparticlecolor = 'rgb(255, 213, 0)';
for (let i = 0; i < 200; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  let radius = Math.random() * 0.6 + 0.2;
  particlesArray.push(new particles(x,y, radius,myparticlecolor))
}
function animateH(time){
  document.querySelector('.gola').style.transform = `rotate(${Math.sin(time)*10}deg)`;
}

document.querySelector('.foregrounddiv').addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
})
let mytime = 0;
function animate() {
  mytime += 0.2;
  requestAnimationFrame(animate);
  cd.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].draw();
  }
  
}
animate();

let toggle = 0;
let curangle = 180;
document.querySelector('.gola').addEventListener('click', (e) => {
  if(toggle == 0){
    document.querySelector('.gola').style.transform = `rotate(${curangle}deg)`;
    curangle += 180;
    document.documentElement.style.setProperty('--mygold', 'rgb(0, 247, 255)');
    for(let i = 0; i < particlesArray.length; i++){
      particlesArray[i].color = 'rgb(0, 247, 255)';
    }
    console.log('clicked');
    toggle = 1;
    return
  }
  if(toggle == 1){
    document.documentElement.style.setProperty('--mygold', 'rgb(255, 213, 0)');
    document.querySelector('.gola').style.transform = `rotate(${curangle}deg)`;
    curangle += 180;
    for(let i = 0; i < particlesArray.length; i++){
      particlesArray[i].color = 'rgb(255, 213, 0)';
    }
    console.log('undoed');
    toggle = 0;
    return
  }
})
