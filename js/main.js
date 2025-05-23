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

    document.addEventListener('DOMContentLoaded', function () {
          // 썸네일 클릭 시 모달 오픈
      document.querySelectorAll('.video-thumbnail').forEach(function(thumbnail) {
        thumbnail.addEventListener('click', function(e) {
          e.preventDefault();
          const videoUrl = thumbnail.getAttribute('data-video');
          if (!videoUrl) return;
          const modal = document.getElementById('video-modal');
          const iframe = document.getElementById('modal-iframe');
          iframe.src = videoUrl + "?autoplay=1";
          modal.style.display = 'flex';
          document.body.style.overflow = "hidden"; // 스크롤 방지
    });
  });

      // 닫기 버튼 또는 바깥 클릭 시 모달 닫기
      const modal = document.getElementById('video-modal');
      if (modal) {
        modal.querySelector('.close-button').addEventListener('click', function() {
        closeModal();
    });
        modal.addEventListener('click', function(e) {
          if (e.target === modal) closeModal();
    });
  }

      function closeModal() {
        const modal = document.getElementById('video-modal');
        const iframe = document.getElementById('modal-iframe');
        modal.style.display = 'none';
        iframe.src = ""; // 재생 중지
        document.body.style.overflow = ""; // 스크롤 복구
  }
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
