// 반응형 최적화 JavaScript
console.log('반응형 최적화 스크립트 로드됨');

// 디바이스 감지 및 성능 최적화
const isMobile = window.innerWidth <= 768;
const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
const isDesktop = window.innerWidth > 1024;

// 디바운스 함수 (성능 최적화)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 쓰로틀 함수 (스크롤 성능 최적화)
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료 - 반응형 초기화');
    initResponsiveFeatures();
    setupNavigation();
    setupMobileMenu();
    setupHeaderEffects();
    setupPortfolioFilter();
    setupVideoModal();
    renderBoard();
    setupResizeHandlers();
    console.log('반응형 설정 완료');
});

// 반응형 기능 초기화
function initResponsiveFeatures() {
    // 뷰포트 메타태그 동적 설정
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
    }
    
    // 디바이스별 클래스 추가
    document.body.classList.add(
        isMobile ? 'mobile' : 
        isTablet ? 'tablet' : 'desktop'
    );
    
    // 터치 디바이스 감지
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
}

// 리사이즈 핸들러 설정
function setupResizeHandlers() {
    const handleResize = debounce(() => {
        const currentWidth = window.innerWidth;
        
        // 디바이스 타입 업데이트
        document.body.classList.remove('mobile', 'tablet', 'desktop');
        if (currentWidth <= 768) {
            document.body.classList.add('mobile');
            handleMobileResize();
        } else if (currentWidth <= 1024) {
            document.body.classList.add('tablet');
            handleTabletResize();
        } else {
            document.body.classList.add('desktop');
            handleDesktopResize();
        }
        
        // 히어로 섹션 높이 조정
        adjustHeroHeight();
        
        // 워터마크 크기 조정
        adjustWatermarkSize();
        
    }, 250);
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', debounce(handleResize, 500));
}

// 모바일 리사이즈 처리
function handleMobileResize() {
    // 모바일 메뉴 상태 확인
    const nav = document.querySelector('header nav');
    if (nav && nav.classList.contains('active')) {
        // 화면 회전시 메뉴 닫기
        nav.classList.remove('active');
    }
    
    // 모바일 비디오 모달 크기 조정
    adjustMobileVideoModal();
}

// 태블릿 리사이즈 처리
function handleTabletResize() {
    // 태블릿 특화 처리
    const nav = document.querySelector('header nav');
    if (nav) {
        nav.classList.remove('active');
    }
}

// 데스크톱 리사이즈 처리
function handleDesktopResize() {
    // 데스크톱 특화 처리
    const nav = document.querySelector('header nav');
    if (nav) {
        nav.classList.remove('active');
    }
}

// 히어로 섹션 높이 동적 조정
function adjustHeroHeight() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    if (viewportWidth <= 768) {
        // 모바일: 전체 화면 높이
        hero.style.height = `${viewportHeight}px`;
    } else if (viewportWidth <= 1024) {
        // 태블릿: 80vh
        hero.style.height = '80vh';
    } else {
        // 데스크톱: 원래 설정 유지
        hero.style.height = '';
    }
}

// 워터마크 크기 동적 조정
function adjustWatermarkSize() {
    const watermarks = document.querySelectorAll('.monkey-watermark');
    const viewportWidth = window.innerWidth;
    
    watermarks.forEach(watermark => {
        if (viewportWidth <= 480) {
            watermark.style.width = '60px';
        } else if (viewportWidth <= 768) {
            watermark.style.width = '80px';
        } else if (viewportWidth <= 1024) {
            watermark.style.width = '120px';
        } else {
            watermark.style.width = '220px';
        }
    });
}

// 모바일 비디오 모달 조정
function adjustMobileVideoModal() {
    const modal = document.querySelector('.video-modal iframe');
    if (!modal) return;
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    if (viewportWidth <= 768) {
        modal.style.width = '95vw';
        modal.style.height = '53vw'; // 16:9 비율 유지
        modal.style.maxHeight = `${viewportHeight * 0.6}px`;
    }
}

// 네비게이션 스크롤 기능 (간단하고 확실한 버전)
function setupNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a');
    console.log('네비게이션 링크 개수:', navLinks.length);

    navLinks.forEach(function(link, index) {
        console.log(`링크 ${index}:`, link.getAttribute('href'));
        
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 기본 동작 막기
            
            const href = this.getAttribute('href');
            console.log('클릭된 링크:', href);
            
            if (href && href.startsWith('#')) {
                const targetId = href.replace('#', '');
                console.log('타겟 ID:', targetId);
                scrollToSection(targetId);
                
                // 활성 링크 업데이트
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // 모바일 메뉴 닫기
                const nav = document.querySelector('header nav');
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    console.log('모바일 메뉴 닫힘');
                }
            }
        });
    });
}

// 섹션으로 스크롤 (간단하고 확실한 버전)
function scrollToSection(sectionId) {
    console.log('스크롤 시작:', sectionId);

    // Hero 섹션인 경우
    if (sectionId === 'hero') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        console.log('Hero 섹션으로 스크롤 완료');
        return;
    }

    // 다른 섹션인 경우
    const targetElement = document.getElementById(sectionId);
    console.log('타겟 요소:', targetElement);
    
    if (targetElement) {
        const headerHeight = 100; // 고정된 헤더 높이
        const elementTop = targetElement.offsetTop;
        const scrollPosition = Math.max(0, elementTop - headerHeight);

        console.log('요소 위치:', elementTop);
        console.log('스크롤 위치:', scrollPosition);

        try {
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
            console.log('스크롤 완료:', sectionId);
        } catch (error) {
            // 브라우저 호환성 문제시 기본 스크롤
            console.log('부드러운 스크롤 실패, 기본 스크롤 사용');
            window.scrollTo(0, scrollPosition);
        }
    } else {
        console.error('섹션을 찾을 수 없음:', sectionId);
        // 페이지의 모든 ID 요소 출력 (디버깅용)
        const allIds = Array.from(document.querySelectorAll('[id]')).map(el => el.id);
        console.log('페이지의 모든 ID:', allIds);
    }
}

// 모바일 메뉴 최적화
function setupMobileMenu() {
    console.log('모바일 메뉴 설정...');
    const menuButton = document.querySelector('.mobile-menu-btn');
    const navigation = document.querySelector('header nav');
    const body = document.body;

    if (!menuButton || !navigation) return;

    // 메뉴 버튼 클릭
    menuButton.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = navigation.classList.contains('active');
        
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // 메뉴 외부 클릭시 닫기
    document.addEventListener('click', function(e) {
        if (navigation.classList.contains('active') && 
            !navigation.contains(e.target) && 
            !menuButton.contains(e.target)) {
            closeMenu();
        }
    });

    // ESC 키로 메뉴 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navigation.classList.contains('active')) {
            closeMenu();
        }
    });

    function openMenu() {
        navigation.classList.add('active');
        body.style.overflow = 'hidden'; // 배경 스크롤 방지
        menuButton.innerHTML = '<i class="fas fa-times"></i>';
    }

    function closeMenu() {
        navigation.classList.remove('active');
        body.style.overflow = '';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

// 헤더 스크롤 효과 (쓰로틀 적용)
function setupHeaderEffects() {
    console.log('헤더 효과 설정...');
    
    const throttledScroll = throttle(() => {
        const header = document.querySelector('header');
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        updateActiveNavigation();
    }, 16); // 60fps

    window.addEventListener('scroll', throttledScroll, { passive: true });
}

// 네비게이션 활성화 업데이트 (최적화)
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    let currentSection = '';
    const scrollPosition = window.scrollY + 150;

    // 최상단이면 hero 활성화
    if (window.scrollY < 100) {
        currentSection = 'hero';
    } else {
        // 현재 보이는 섹션 찾기 (역순으로 검사하여 성능 향상)
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop) {
                currentSection = section.getAttribute('id');
                break;
            }
        }
    }

    // 활성 링크 업데이트 (변경된 경우만)
    const activeLink = document.querySelector('nav ul li a.active');
    const newActiveLink = document.querySelector(`nav ul li a[href="#${currentSection}"]`);
    
    if (activeLink !== newActiveLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (newActiveLink) {
            newActiveLink.classList.add('active');
        }
    }
}

// 포트폴리오 필터 (성능 최적화)
function setupPortfolioFilter() {
    console.log('포트폴리오 필터 설정...');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');

    if (filterButtons.length === 0 || workItems.length === 0) return;

    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // 활성 버튼 업데이트
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            console.log('필터 적용:', filterValue);
            
            // 애니메이션과 함께 필터링
            workItems.forEach(function(item, index) {
                const shouldShow = filterValue === 'all' || 
                                 item.getAttribute('data-category') === filterValue;
                
                if (shouldShow) {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    item.style.display = 'block';
                    
                    // 순차적 애니메이션
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    item.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
}

// 비디오 모달 (성능 및 접근성 최적화)
function setupVideoModal() {
    console.log('비디오 모달 설정...');
    const modal = document.getElementById('video-modal');
    const modalIframe = document.getElementById('modal-iframe');
    const closeButton = document.querySelector('.close-button');
    
    if (!modal || !modalIframe) {
        console.log('비디오 모달 요소를 찾을 수 없음');
        return;
    }

    // 포트폴리오 아이템 클릭
    document.querySelectorAll('.work-item').forEach(function(item) {
        item.addEventListener('click', function() {
            const iframe = this.querySelector('iframe');
            if (!iframe) return;

            const videoSrc = iframe.src;
            const videoId = extractYouTubeId(videoSrc);
            
            if (videoId) {
                openVideoModal(videoId);
            }
        });
    });

    // 모달 닫기 이벤트들
    if (closeButton) {
        closeButton.addEventListener('click', closeVideoModal);
    }

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeVideoModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeVideoModal();
        }
    });

    function extractYouTubeId(url) {
        const match = url.match(/youtube\.com\/embed\/([^?&]+)/);
        return match ? match[1] : null;
    }

    function openVideoModal(videoId) {
        const modalSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1`;
        modalIframe.src = modalSrc;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // 접근성: 포커스 설정
        modal.focus();
        
        console.log('비디오 모달 열림:', videoId);
    }

    function closeVideoModal() {
        modal.style.display = 'none';
        modalIframe.src = '';
        document.body.style.overflow = '';
        console.log('비디오 모달 닫힘');
    }

    // 전역으로 노출
    window.closeVideoModal = closeVideoModal;
}

// 게시판 데이터 (최적화)
const articles = [
    {
        date: "2025-05-28",
        media: "스포츠서울",
        title: "케이프스플래닛 '시크릿 아이돌' 원안자 + 공동제작자로 밝혀져",
        url: "https://www.sportsseoul.com/news/read/1519235",
        summary: "이정재가 1대주주로 있는 아티스트 스튜디오와 영국의 이매지너리움의 합작으로 기획개발중인 영화 '시크릿 아이돌'"
    },
    {
        date: "2025-05-08",
        media: "한국콘텐츠진흥원",
        title: "숏폼에서 콘텐츠 비즈니스의 미래를 보다 l 케이프스플래닛 유일한 대표",
        url: "https://youtu.be/4D40Ldpxm5c?si=Qv7Ebk-Mk5gygy-l5",
        summary: "케이프스플래닛 유일한 대표 인터뷰 영상. 한국 콘텐츠 진흥원 발간 웹진 방송영상 OTT트렌드 2025 Vol.1"
    },
    {
        date: "2025-05-07",
        media: "한국콘텐츠진흥원",
        title: "'KOCCA 트렌드 - 인물 인터뷰 유치콕 편",
        url: "https://www.kocca.kr/trendott/vol01/people_1.html",
        summary: "숏폼의 시작과 변천사 / 글로벌 숏폼드라마 플랫폼은 미래가 될 것인가 / 숏폼 IP 비즈니스의 미래와 앞으로의 전망"
    },
    {
        date: "2024-08-23",
        media: "스포츠경향",
        title: "'시방솔비' 솔비의 좌충우돌 B급 MC 성장기",
        url: "https://sports.khan.co.kr/article/202408230804003",
        summary: "김구라, 김종민, 가비, 유병재, 궤도 등 초특급 게스트로 연일 화제몰이중인 유튜브 채널 시방솔비"
    },
    {
        date: "2023-11-29",
        media: "한국콘텐츠진흥원",
        title: "KOCCA 콘텐츠 뉴스 - 바야흐로 숏숏폼 시대",
        url: "https://www.kocca.kr/n_content/vol30/sub02.html",
        summary: "숏폼들은 계속해서 업그레이드를 한다. '틱톡'의 등장과 함께 바야흐로 '숏숏폼(1분 이하의 콘텐츠)' 전성시대가 열렸다."
    },
    {
        date: "2023-11-08",
        media: "동아일보",
        title: "23년 서울 1인 창조기업 - 케이프스플래닛 창업진흥원장 표창",
        url: "https://www.donga.com/news/article/all/20231108/122080292/1",
        summary: "'2023 서울권 1인 창조기업 지원센터 입주기업 성과발표회에서 케이프스플래닛 등이 창업진흥원장 표창장을 받았다."
    }
];

// 게시판 렌더링 (성능 최적화)
function renderBoard() {
    const board = document.getElementById('headlineBoard');
    if (!board) return;

    // DocumentFragment 사용으로 성능 최적화
    const fragment = document.createDocumentFragment();
    
    articles.forEach(item => {
        const li = document.createElement('li');
        li.className = 'headline-row';
        li.innerHTML = `
            <div class="headline-date">${item.date}</div>
            <div class="headline-main">
                <a href="${item.url}" class="headline-title" target="_blank" rel="noopener">
                    ${item.title}
                </a>
                <div class="headline-summary">${item.summary}</div>
            </div>
            <div class="headline-media">${item.media}</div>
        `;
        fragment.appendChild(li);
    });
    
    board.appendChild(fragment);
}

// 성능 모니터링 (개발용)
function setupPerformanceMonitoring() {
    if (typeof performance !== 'undefined') {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('페이지 로드 성능:', {
                    'DOM 로드': Math.round(perfData.domContentLoadedEventEnd - perfData.navigationStart),
                    '전체 로드': Math.round(perfData.loadEventEnd - perfData.navigationStart),
                    'FCP': Math.round(perfData.responseEnd - perfData.navigationStart)
                });
            }, 1000);
        });
    }
}

// 이미지 레이지 로딩 (성능 최적화)
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// 초기화 시 성능 모니터링과 레이지 로딩 설정
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setupPerformanceMonitoring();
        setupLazyLoading();
    });
} else {
    setupPerformanceMonitoring();
    setupLazyLoading();
}
