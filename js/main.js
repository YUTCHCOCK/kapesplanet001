document.addEventListener('DOMContentLoaded', () => {
    // ★ 로딩 스크린 숨기기는 try-catch 밖에서 반드시 먼저 실행!
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }

    // ▼ 아래는 JS 에러가 나도 사이트가 멈추지 않도록 모두 try-catch로 감쌉니다.
    try {
        // 스크롤 애니메이션
        let ticking = false;
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.animate-text');
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                if (elementTop < window.innerHeight && elementBottom > 0) {
                    element.classList.add('visible');
                }
            });
        };
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    animateOnScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
        window.addEventListener('load', animateOnScroll);

        // 비디오 썸네일 클릭 이벤트 (포트폴리오 섹션)
        document.querySelectorAll('.video-thumbnail').forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                try {
                    const videoUrl = thumbnail.getAttribute('data-video');
                    if (!videoUrl) return;
                    const modal = document.createElement('div');
                    modal.className = 'video-modal';
                    modal.innerHTML = `
                        <div class="modal-content">
                            <span class="close-button" aria-label="비디오 닫기">&times;</span>
                            <iframe src="${videoUrl}?autoplay=1" frameborder="0" allowfullscreen></iframe>
                        </div>
                    `;
                    document.body.appendChild(modal);

                    modal.querySelector('.close-button').addEventListener('click', () => modal.remove());
                    modal.addEventListener('click', (e) => {
                        if (e.target === modal) modal.remove();
                    });
                } catch (error) {
                    console.error('비디오 모달 생성 중 오류 발생:', error);
                }
            });

            thumbnail.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    thumbnail.click();
                }
            });
        });

        // 스크롤 인디케이터
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            let indicatorTicking = false;
            window.addEventListener('scroll', () => {
                if (!indicatorTicking) {
                    window.requestAnimationFrame(() => {
                        if (window.scrollY > 100) {
                            scrollIndicator.style.opacity = '0';
                        } else {
                            scrollIndicator.style.opacity = '1';
                        }
                        indicatorTicking = false;
                    });
                    indicatorTicking = true;
                }
            });
        }

        // 스무스 스크롤 (내부 앵커 이동)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.length > 1) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        // 헤더가 fixed라면 실제 높이로 보정
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

        // (선택) YouTube Hero 비디오 Intersection Observer - data-src 속성 활용시
        const heroVideo = document.querySelector('.hero-video-embed iframe');
        if (heroVideo && heroVideo.dataset.src) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        heroVideo.src = heroVideo.getAttribute('data-src');
                        observer.disconnect();
                    }
                });
            });
            observer.observe(heroVideo);
        }
    } catch (e) {
        // JS 오류가 나더라도 로딩 스크린만큼은 항상 숨겨지도록
        console.error('main.js 오류:', e);
        if (loadingScreen) loadingScreen.style.display = 'none';
    }
});
