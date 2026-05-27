"use strict";

setTimeout(() => {
    const avatar = document.querySelector('.loading-screen > img');
    avatar.classList.add('slide-out');
    
    setTimeout(() => {
        window.location.href = '/login';
    }, 500);
}, 1000);

document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth < 768) {
    const currentPath = window.location.pathname;
    document.querySelectorAll('footer a').forEach(a => {
      if (a.getAttribute('href') === currentPath) {
        a.classList.add('active');
      }
    });
  }
});

document.querySelectorAll('.avatar-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.avatar-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
    });
});