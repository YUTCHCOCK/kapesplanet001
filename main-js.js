// 웹사이트 기능 구현
document.addEventListener('DOMContentLoaded', function() {
    // 로딩 애니메이션
    setTimeout(function() {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2500);

    // 헤더 스크롤 효과
    const header = document.querySelector('header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 모바일 메뉴 토글
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // 모바일 메뉴 링크 클릭 시 메뉴 닫기
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // 비디오 모달 기능
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    
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

    // 썸네일 클릭 시 모달 열기
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoUrl = this.getAttribute('data-video');
            modalIframe.innerHTML = `<iframe src="${videoUrl}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
            videoModal.classList.add('active');
            document.body.classList.add('no-scroll');
        });
    });

    // 모달 닫기 버튼
    modalClose.addEventListener('click', function() {
        videoModal.classList.remove('active');
        document.body.classList.remove('no-scroll');
        setTimeout(() => {
            modalIframe.innerHTML = '';
        }, 300);
    });

    // 모달 바깥 클릭 시 닫기
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
            setTimeout(() => {
                modalIframe.innerHTML = '';
            }, 300);
        }
    });

    // 스크롤 애니메이션
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // 스크롤 이벤트에 애니메이션 함수 연결
    window.addEventListener('scroll', animateOnScroll);
    
    // 초기 실행
    animateOnScroll();
});

// YouTube API 연동
let player;

function onYouTubeIframeAPIReady() {
    // 히어로 섹션 배경 비디오
    player = new YT.Player('youtube-player', {
        videoId: 'YOUR_VIDEO_ID', // 실제 쇼릴 영상 ID로 변경 필요
        playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: 'YOUR_VIDEO_ID', // 같은 ID 입력하여 반복 재생
            controls: 0,
            showinfo: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1,
            mute: 1 // 자동 재생을 위해 음소거 필요
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
    // 비디오 사이즈 조정
    resizeVideo();
    // 창 크기 변경 시 비디오 사이즈 재조정
    window.addEventListener('resize', resizeVideo);
}

function onPlayerStateChange(event) {
    // 비디오가 끝나면 다시 재생
    if (event.data === YT.PlayerState.ENDED) {
        player.playVideo();
    }
}

function resizeVideo() {
    const videoWrapper = document.querySelector('.video-wrapper');
    if (!videoWrapper) return;
    
    const width = videoWrapper.clientWidth;
    const height = videoWrapper.clientHeight;
    const aspectRatio = 16 / 9;
    
    let newWidth, newHeight;
    
    if (width / height > aspectRatio) {
        newWidth = width;
        newHeight = width / aspectRatio;
    } else {
        newHeight = height;
        newWidth = height * aspectRatio;
    }
    
    if (player && player.setSize) {
        player.setSize(newWidth, newHeight);
    }
}

// 스크롤 시 요소 애니메이션 추가 (회사 소개, 작업물 등)
window.addEventListener('DOMContentLoaded', () => {
    // 애니메이션이 필요한 요소들에 클래스 추가
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        const header = section.querySelector('.section-header');
        if (header) {
            header.classList.add('animate-on-scroll');
        }
    });
    
    const aboutSections = document.querySelectorAll('.about-section, .company-philosophy, .company-image, .company-description');
    aboutSections.forEach(section => {
        section.classList.add('animate-on-scroll');
    });
    
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.classList.add('animate-on-scroll');
    });
    
    // 초기 애니메이션 적용
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 스크롤 애니메이션 CSS 추가
    document.querySelectorAll('.animate-on-scroll.active').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
});
