(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))p(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const S of o.addedNodes)S.tagName==="LINK"&&S.rel==="modulepreload"&&p(S)}).observe(document,{childList:!0,subtree:!0});function m(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function p(s){if(s.ep)return;s.ep=!0;const o=m(s);fetch(s.href,o)}})();function i(t,n){return Math.floor(Math.random()*(n-t))+t}let x=20,M=0,y=0,k,u="low",a=!1,g=0;const L=document.querySelector(".start"),w=document.querySelector(".stop"),v=document.querySelector(".score"),c=document.getElementById("game"),f=c.getContext("2d"),C=document.querySelectorAll(".speed"),T=document.querySelector(".speed_low"),P=document.querySelector(".speed_medium"),R=document.querySelector(".speed_hard"),b=document.querySelector(".container__finish-game"),H=document.querySelector(".finish-score"),r=20,d=20,e={x:i(0,d)*r,y:i(0,d)*r,dx:r,dy:0,cells:[],maxCells:3},l={x:i(0,d)*r,y:i(0,d)*r};v.innerHTML=`score: ${y}`;T.classList.add("active");function q(t){u!==t.target.innerHTML&&A();const n=t.target,m=document.querySelector(".border");switch(C.forEach(p=>{p.classList.remove("active")}),m.classList.remove("border-red"),n.innerHTML){case"medium":x=6,u="medium",n.classList.add("active");break;case"low":x=20,u="low",n.classList.add("active");break;case"hard":x=6,u="hard",m.classList.add("border-red"),n.classList.add("active");break}}function B(){e.x<0?e.x=c.width-r:e.x>=c.width&&(e.x=0),e.y<0?e.y=c.height-r:e.y>=c.height&&(e.y=0)}function A(){y=0,v.innerHTML=`score: ${y}`,e.x=i(0,d)*r,e.y=i(0,d)*r,e.cells=[],e.maxCells=3,e.dx=r,e.dy=0,E(),cancelAnimationFrame(k),w.style.display="none",L.style.display="block"}function F(){(e.x<0||e.x>=c.width||e.y<0||e.y>=c.height)&&(b.style.display="flex",H.innerHTML=`your score: ${y}`,A())}function E(){l.x=i(0,d)*r,l.y=i(0,d)*r;for(let t=0;t<e.cells.length;t++)if(l.x===e.cells[t].x&&l.y===e.cells[t].y){E();break}}function O(){if(k=requestAnimationFrame(O),!(++M<x)){M=0,f.clearRect(0,0,c.width,c.height),e.x+=e.dx,e.y+=e.dy,u==="hard"?F():B(),e.cells.unshift({x:e.x,y:e.y}),e.cells.length>e.maxCells&&e.cells.pop(),f.fillStyle="#d12527",f.fillRect(l.x,l.y,r-1,r-1),f.fillStyle="#bdda57",e.cells.forEach(function(t){f.fillRect(t.x,t.y,r-1,r-1)});for(let t=1;t<e.cells.length;t++)e.x===e.cells[t].x&&e.y===e.cells[t].y&&(b.style.display="flex",H.innerHTML=`your score: ${y}`,A());e.x===l.x&&e.y===l.y&&(e.maxCells++,v.innerHTML=`score: ${++y}`,E())}}function _(){Date.now()-g>300?a=!1:a=!0,g=0}function h(){g===0?g=Date.now():_()}document.addEventListener("keydown",function(t){t.key==="ArrowLeft"&&e.dx===0?(h(),a||(e.dx=-r,e.dy=0)):t.key==="ArrowUp"&&e.dy===0?(h(),a||(e.dy=-r,e.dx=0)):t.key==="ArrowRight"&&e.dx===0?(h(),a||(e.dx=r,e.dy=0)):t.key==="ArrowDown"&&e.dy===0&&(h(),a||(e.dy=r,e.dx=0))});T.addEventListener("click",q);P.addEventListener("click",q);R.addEventListener("click",q);L.addEventListener("click",()=>{requestAnimationFrame(O),b.style.display="none",w.style.display="block",L.style.display="none"});w.addEventListener("click",()=>{cancelAnimationFrame(k),w.style.display="none",L.style.display="block"});
