(function(){
  const year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();

  const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!prefersReduced && 'IntersectionObserver' in window){
    const els=document.querySelectorAll('.service-card,.post,.step,.about-frame,.about-sticker');
    els.forEach(el=>{el.style.opacity='0';el.style.transform='translateY(18px)'});
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const el=entry.target;
          el.style.transition='opacity .7s ease, transform .7s cubic-bezier(.2,.75,.25,1)';
          el.style.opacity='1';
          el.style.transform='none';
          io.unobserve(el);
        }
      });
    },{threshold:.14});
    els.forEach(el=>io.observe(el));
  }
})();
