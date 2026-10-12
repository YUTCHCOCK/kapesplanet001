// KAPES PLANET 홈페이지 스크립트 (간단 버전)

const header = document.getElementById('header');
const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menuBtn');
const navLinks = nav.querySelectorAll('a');

// 1. 모바일 메뉴 열기/닫기
function setMenu(open) {
    nav.classList.toggle('open', open);
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
}
menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
});

// 2. 스크롤하면 헤더 배경 진하게 + 스크롤 안내 숨기기 + 현재 메뉴 표시
const scrollIndicator = document.querySelector('.scroll-indicator');
const sections = [...navLinks].map(a => document.querySelector(a.getAttribute('href')));

function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 50);
    if (scrollIndicator) scrollIndicator.classList.toggle('hide', y > 80);

    let current = 0;
    sections.forEach((sec, i) => {
        if (sec && sec.getBoundingClientRect().top <= window.innerHeight * 0.4) current = i;
    });
    navLinks.forEach((a, i) => a.classList.toggle('active', i === current));
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// 3. Work 영상: 유튜브 썸네일 자동 표시 + 클릭하면 팝업 재생
const cards = document.querySelectorAll('.video-card');
const modal = document.getElementById('videoModal');
const modalFrame = document.getElementById('modalFrame');

cards.forEach(card => {
    const id = card.dataset.id;
    card.style.backgroundImage = `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`;
    card.setAttribute('aria-label', card.querySelector('b').textContent + ' 영상 보기');
    card.addEventListener('click', () => {
        modalFrame.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    modal.hidden = true;
    modalFrame.src = '';
    document.body.style.overflow = '';
}
document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

// 4. Work 필터 버튼
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        cards.forEach(card => {
            card.hidden = !(filter === 'all' || card.dataset.category === filter);
        });
    });
});

// 5. 푸터 연도 자동 갱신
document.getElementById('year').textContent = new Date().getFullYear();
