// 로딩 스크린
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
});

// 비디오 지연 로딩
document.addEventListener('DOMContentLoaded', () => {
    const videoIframe = document.querySelector('.video-background iframe');
    if (videoIframe) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    videoIframe.src = videoIframe.getAttribute('data-src');
                    observer.disconnect();
                }
            });
        });
        observer.observe(videoIframe);
    }
});

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

// 비디오 썸네일 클릭 이벤트
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

    // 키보드 이벤트
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
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 100) {
                    scrollIndicator.style.opacity = '0';
                } else {
                    scrollIndicator.style.opacity = '1';
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
}); 