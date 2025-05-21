// 모든 코드를 DOMContentLoaded에서 실행하여 요소를 못 찾는 문제와 JS 오류로 인한 로딩 고착을 방지합니다.
document.addEventListener('DOMContentLoaded', () => {
    // 로딩 스크린 숨기기
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }

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
        // 클릭 이벤트
        thumbnail.addEventListener('click', () => {
            try {
                const videoUrl = thumbnail.getAttribute('data-video');
                if (!videoUrl) {
                    console.error('비디오 URL이 없습니다.');
                    return;
                }
                const modal = document.createElement('div');
                modal.className = 'video-modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close-button" aria-label="비디오 닫기">&times;</span>
                        <iframe src="${videoUrl}?autoplay=1" frameborder="0" allowfullscreen></iframe>
                    </div>
                `;
                document.body.appendChild(modal);

                modal.querySelector('.close-button').addEventListener('click', () => {
                    modal.remove();
                });
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.remove();
                    }
                });
            } catch (error) {
                console.error('비디오 모달 생성 중 오류 발생:', error);
            }
        });

        // 키보드 접근성
        thumbnail.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                thumbnail.click();
            }
        });
    });

    // 스크롤 인디케이터 (있을 때만)
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
            // href="#..."가 존재할 때만 동작
            const href = this.getAttribute('href');
            if (href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 100;
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
    // 실제로 data-src 사용 안 한다면 이 코드는 생략해도 됨
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
});
