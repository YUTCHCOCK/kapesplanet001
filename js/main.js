// 간소화된 웹사이트 기능 구현
document.addEventListener('DOMContentLoaded', function() {
    // 로딩 화면 즉시 숨기기 
    document.querySelector('.loading-screen')?.style.display = 'none';
    
    // 헤더 스크롤 효과
    const header = document.querySelector('header');
    
    if(header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 모바일 메뉴 토글
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if(menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        // 모바일 메뉴 링크 클릭 시 메뉴 닫기
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // 비디오 썸네일 클릭 처리
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    
    if(videoThumbnails.length > 0) {
        // 비디오 모달 생성
        const videoModal = document.createElement('div');
        videoModal.className = 'video-modal';
        videoModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-close">&times;</div>
                <div class="modal-iframe"></div>
            </div>
        `;
        document.body.appendChild(videoModal);

        const modalClose = videoModal.querySelector('.modal-close');
        const modalIframe = videoModal.querySelector('.modal-iframe');

        // 썸네일 클릭 이벤트
        videoThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const videoUrl = this.getAttribute('data-video');
                if(videoUrl) {
                    modalIframe.innerHTML = `<iframe src="${videoUrl}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
                    videoModal.classList.add('active');
                }
            });
        });

        // 모달 닫기 이벤트
        if(modalClose) {
            modalClose.addEventListener('click', function() {
                videoModal.classList.remove('active');
                setTimeout(() => {
                    modalIframe.innerHTML = '';
                }, 300);
            });
        }

        // 모달 바깥 클릭 시 닫기
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                setTimeout(() => {
                    modalIframe.innerHTML = '';
                }, 300);
            }
        });
    }
});

// 페이지 로드 시에도 로딩 화면 숨기기 (추가 보장책)
window.onload = function() {
    document.querySelector('.loading-screen')?.style.display = 'none';
};
