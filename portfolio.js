(function(){
  const year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();

  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce && 'IntersectionObserver' in window){
    const els=document.querySelectorAll('.portfolio-page .reveal,.work-card,.expertise-grid article,.diff-grid div');
    els.forEach(el=>{el.style.opacity='0';el.style.transform='translateY(20px)'});
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        entry.target.style.transition='opacity .7s ease, transform .7s cubic-bezier(.2,.75,.25,1)';
        entry.target.style.opacity='1';
        entry.target.style.transform='none';
        io.unobserve(entry.target);
      });
    },{threshold:.1});
    els.forEach(el=>io.observe(el));
  }

  const buttons=[...document.querySelectorAll('.filter-btn')];
  const cards=[...document.querySelectorAll('.work-card')];
  buttons.forEach(btn=>btn.addEventListener('click',()=>{
    buttons.forEach(b=>b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const filter=btn.dataset.filter;
    cards.forEach(card=>{
      card.classList.toggle('is-hidden', filter!=='all' && card.dataset.category!==filter);
    });
  }));

  const modal=document.querySelector('.project-modal');
  if(modal){
    const img=modal.querySelector('.modal-image img');
    const title=modal.querySelector('.modal-title');
    const type=modal.querySelector('.modal-type');
    const openModal=card=>{
      img.src=card.dataset.image;
      img.alt=card.dataset.title;
      title.textContent=card.dataset.title;
      type.textContent=card.dataset.type;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
    };
    const closeModal=()=>{
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden','true');
      document.body.style.overflow='';
    };
    cards.forEach(card=>card.querySelector('.work-media')?.addEventListener('click',()=>openModal(card)));
    modal.querySelectorAll('[data-modal-close]').forEach(el=>el.addEventListener('click',closeModal));
    document.addEventListener('keydown',e=>{if(e.key==='Escape') closeModal();});
  }
})();
