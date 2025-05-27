document.addEventListener('DOMContentLoaded', function() {
    console.log('페이지 로드 완료');

    // 네비게이션 메뉴 클릭 이벤트
    const navLinks = document.querySelectorAll('nav ul li a');
    console.log('네비게이션 링크 개수:', navLinks.length);

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('클릭된 링크:', this.getAttribute('href'));

            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                
                if (targetId === 'hero') {
                    // 페이지 최상단으로
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const target = document.getElementById(targetId);
                    if (target) {
                        // 헤더 높이 고려해서 스크롤
                        const headerHeight = 120;
                        const targetTop = target.offsetTop - headerHeight;
                        window.scrollTo({ 
                            top: Math.max(0, targetTop), 
                            behavior: 'smooth' 
                        });
                    }
                }
            }

            // 모바일 메뉴 닫기
            const nav = document.querySelector('header nav');
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });

    // 모바일 메뉴 토글
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('header nav');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // 헤더 스크롤 효과
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // 포트폴리오 필터링
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // 활성 버튼 변경
            filterBtns.forEach(function(b) { 
                b.classList.remove('active'); 
            });
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // 포트폴리오 아이템 필터링
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            portfolioItems.forEach(function(item) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 포트폴리오 비디오 클릭 (모달)
    const modal = document.getElementById('video-modal');
    const modalIframe = document.getElementById('modal-iframe');
    const closeButton = modal ? modal.querySelector('.close-button') : null;

    if (modal && modalIframe) {
        // 포트폴리오 아이템 클릭
        document.querySelectorAll('.portfolio-item').forEach(function(item) {
            item.addEventListener('click', function() {
                const iframe = this.querySelector('iframe');
                if (iframe) {
                    const videoSrc = iframe.src;
                    let videoId = '';
                    
                    if (videoSrc.includes('youtube.com/embed/')) {
                        const match = videoSrc.match(/youtube\.com\/embed\/([^?&]+)/);
                        if (match) videoId = match[1];
                    }
                    
                    if (videoId) {
                        const modalSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`;
                        modalIframe.src = modalSrc;
                        modal.style.display = 'flex';
                        document.body.style.overflow = 'hidden';
                    }
                }
            });
        });

        // 모달 닫기
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                modal.style.display = 'none';
                modalIframe.src = '';
                document.body.style.overflow = '';
            });
        }

        // 모달 바깥 클릭시 닫기
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                modalIframe.src = '';
                document.body.style.overflow = '';
            }
        });
    }

    // EmailJS 폼 처리 (EmailJS가 로드된 경우)
    if (typeof emailjs !== 'undefined') {
        emailjs.init("GnCf85iVH7vsa-xKr");
        
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = '전송 중...';
                submitBtn.disabled = true;
                
                const templateParams = {
                    from_name: formData.get('name') || '이름 없음',
                    from_email: formData.get('email') || '',
                    message: formData.get('message') || ''
                };
                
                emailjs.send('service_x1zvv5a', 'template_lujx42n', templateParams)
                    .then(function(response) {
                        alert('문의가 성공적으로 전송되었습니다!');
                        contactForm.reset();
                    })
                    .catch(function(error) {
                        alert('전송 중 오류가 발생했습니다. 다시 시도해주세요.');
                        console.error('이메일 전송 실패:', error);
                    })
                    .finally(function() {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    });
            });
        }
    }

    console.log('모든 이벤트 설정 완료');
});
