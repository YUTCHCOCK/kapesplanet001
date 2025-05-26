document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('header nav');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });

        // 메뉴 링크 클릭 시 메뉴 닫기
        document.querySelectorAll('nav ul li a').forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
            });
        });
    }

    // 포트폴리오 필터링
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // 활성 버튼 변경
            filterBtns.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // 포트폴리오 아이템 필터링
            portfolioItems.forEach(function(item) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 스무스 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const header = document.querySelector('header');
                    const headerOffset = header ? header.offsetHeight : 0;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

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

    // 비디오 모달 기능
    const modal = document.getElementById('video-modal');
    const closeButton = modal ? modal.querySelector('.close-button') : null;
    const modalIframe = document.getElementById('modal-iframe');

    // 비디오 썸네일 클릭 시 모달 열기
    document.querySelectorAll('.video-thumbnail').forEach(function(thumbnail) {
        thumbnail.addEventListener('click', function(e) {
            e.preventDefault();
            const iframe = this.querySelector('iframe');
            if (iframe && modal && modalIframe) {
                const videoSrc = iframe.src;
                modalIframe.src = videoSrc + (videoSrc.includes('?') ? '&' : '?') + 'autoplay=1';
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // 모달 닫기 함수
    function closeModal() {
        if (modal && modalIframe) {
            modal.style.display = 'none';
            modalIframe.src = '';
            document.body.style.overflow = '';
        }
    }

    // 닫기 버튼 클릭
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // 모달 바깥 클릭 시 닫기
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // 폼 제출 처리
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
            this.reset();
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('뉴스레터 구독이 완료되었습니다.');
            this.querySelector('.newsletter-input').value = '';
        });
    }

    // 스크롤 애니메이션 (선택사항)
    let ticking = false;
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-text');
        elements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                animateOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // 네비게이션 활성 링크 업데이트
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let current = '';
        sections.forEach(function(section) {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // 초기 로딩 완료 후 애니메이션 시작
    setTimeout(function() {
        animateOnScroll();
    }, 100);
});
