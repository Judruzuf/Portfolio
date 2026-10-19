// game of glfe running behind the page header moving the pointer over it spawns new cells
(()=>{const h=document.querySelector('header');if(!h)return;
const c=document.createElement('canvas');c.className='conways-life';c.setAttribute('aria-hidden','true');h.prepend(c);
const x=c.getContext('2d'),S=14,seed=()=>+(Math.random()<.22);let w,r,a,b;
function fit(){w=Math.ceil(h.clientWidth/S);r=Math.ceil(h.clientHeight/S);c.width=w*S;c.height=r*S;a=new Uint8Array(w*r).map(seed);b=new Uint8Array(w*r);draw()}
function draw(){x.clearRect(0,0,c.width,c.height);x.fillStyle='rgba(255,255,255,.16)';for(let i=0;i<a.length;i++)if(a[i])x.fillRect((i%w)*S+1,((i/w)|0)*S+1,S-2,S-2)}
function step(){let n=0;for(let y=0;y<r;y++)for(let X=0;X<w;X++){let k=0;for(let j=-1;j<2;j++)for(let i=-1;i<2;i++)if(i||j)k+=a[((y+j+r)%r)*w+(X+i+w)%w];const p=y*w+X;b[p]=k==3||(a[p]&&k==2)?1:0;n+=b[p]}[a,b]=[b,a];if(n<w*r*.015)a=a.map(seed)}
h.addEventListener('pointermove',e=>{const q=h.getBoundingClientRect(),X=((e.clientX-q.left)/S)|0,y=((e.clientY-q.top)/S)|0;for(let j=-1;j<2;j++)for(let i=-1;i<2;i++)if(Math.random()<.5)a[((y+j+r)%r)*w+(X+i+w)%w]=1});
addEventListener('resize',fit);fit();
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(()=>{step();draw()},130);
})();
