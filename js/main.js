// 반응형 최적화 JavaScript (수정된 버전)
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

// DOM 로드 완료 후 초기화
function initializeApp() {
    console.log('DOM 로드 완료 - 반응형 초기화');
    
    // 순차적으로 초기화
    try {
        initResponsiveFeatures();
        setupNavigation();
        setupMobileMenu();
        setupHeaderEffects();
        setupPortfolioFilter();
        setupVideoModal();
        renderBoard();
        setupResizeHandlers();
        console.log('반응형 설정 완료');
    } catch (error) {
        console.error('초기화 중 오류 발생:', error);
    }
}

// 문서 준비 상태 확인
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

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

// 네비게이션 스크롤 기능 (완전히 수정된 버전)
function setupNavigation() {
    console.log('네비게이션 설정 시작...');
    
    // 네비게이션 링크 찾기
    const navLinks = document.querySelectorAll('nav ul li a');
    console.log('네비게이션 링크 개수:', navLinks.length);

    if (navLinks.length === 0) {
        console.error('네비게이션 링크를 찾을 수 없습니다.');
        return;
    }

    navLinks.forEach(function(link, index) {
        const href = link.getAttribute('href');
        console.log(`링크 ${index}:`, href);
        
        // 기존 이벤트 리스너 제거 (중복 방지)
        link.removeEventListener('click', handleNavClick);
        
        // 새 이벤트 리스너 추가
        link.addEventListener('click', handleNavClick, { passive: false });
    });

    function handleNavClick(e) {
        const href = this.getAttribute('href');
        console.log('클릭된 링크:', href);
        
        // 네비게이션 링크인지 확인 (# 으로 시작하는 것만)
        if (href && href.startsWith('#')) {
            e.preventDefault(); // 기본 동작 막기
            e.stopPropagation(); // 이벤트 전파 막기
            
            const targetId = href.replace('#', '');
            console.log('타겟 ID:', targetId);
            
            // 스크롤 실행
            scrollToSection(targetId);
            
            // 활성 링크 업데이트
            updateActiveLink(this);
            
            // 모바일 메뉴 닫기
            closeMobileMenu();
        }
    }

    function updateActiveLink(clickedLink) {
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(l => l.classList.remove('active'));
        clickedLink.classList.add('active');
    }

    function closeMobileMenu() {
        const nav = document.querySelector('header nav');
        const menuButton = document.querySelector('.mobile-menu-btn');
        const body = document.body;
        
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            body.style.overflow = '';
            if (menuButton) {
                menuButton.innerHTML = '<i class="fas fa-bars"></i>';
            }
            console.log('모바일 메뉴 닫힘');
        }
    }
}

// 섹션으로 스크롤 (완전히 재작성)
function scrollToSection(sectionId) {
    console.log('스크롤 시작:', sectionId);

    try {
        // Hero 섹션인 경우
        if (sectionId === 'hero' || sectionId === '') {
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
            // 헤더 높이 계산
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight + 20 : 100;
            
            // 요소 위치 계산
            const elementRect = targetElement.getBoundingClientRect();
            const elementTop = elementRect.top + window.pageYOffset;
            const scrollPosition = Math.max(0, elementTop - headerHeight);

            console.log('요소 위치:', elementTop);
            console.log('헤더 높이:', headerHeight);
            console.log('스크롤 위치:', scrollPosition);

            // 부드러운 스크롤 실행
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
            
            console.log('스크롤 완료:', sectionId);
        } else {
            console.error('섹션을 찾을 수 없음:', sectionId);
            
            // 디버깅: 페이지의 모든 ID 요소 출력
            const allIds = Array.from(document.querySelectorAll('[id]')).map(el => el.id);
            console.log('페이지의 모든 ID:', allIds);
        }
    } catch (error) {
        console.error('스크롤 중 오류 발생:', error);
        
        // 폴백: 기본 스크롤
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// 모바일 메뉴 최적화 (수정된 버전)
function setupMobileMenu() {
    console.log('모바일 메뉴 설정...');
    
    const menuButton = document.querySelector('.mobile-menu-btn');
    const navigation = document.querySelector('header nav');
    const body = document.body;

    if (!menuButton || !navigation) {
        console.error('모바일 메뉴 요소를 찾을 수 없습니다.');
        return;
    }

    // 기존 이벤트 리스너 제거
    menuButton.removeEventListener('click', handleMenuToggle);
    
    // 메뉴 버튼 클릭
    menuButton.addEventListener('click', handleMenuToggle, { passive: false });

    function handleMenuToggle(e) {
        e.stopPropagation();
        e.preventDefault();
        
        const isActive = navigation.classList.contains('active');
        
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // 메뉴 외부 클릭시 닫기
    document.addEventListener('click', function(e) {
        if (navigation.classList.contains('active') && 
            !navigation.contains(e.target) && 
            !menuButton.contains(e.target)) {
            closeMenu();
        }
    }, { passive: true });

    // ESC 키로 메뉴 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navigation.classList.contains('active')) {
            closeMenu();
        }
    }, { passive: true });

    function openMenu() {
        navigation.classList.add('active');
        body.style.overflow = 'hidden';
        menuButton.innerHTML = '<i class="fas fa-times"></i>';
        console.log('모바일 메뉴 열림');
    }

    function closeMenu() {
        navigation.classList.remove('active');
        body.style.overflow = '';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        console.log('모바일 메뉴 닫힘');
    }

    // 전역으로 노출
    window.closeMobileMenu = closeMenu;
}

// 헤더 스크롤 효과 (수정된 버전)
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

    // 스크롤 이벤트 등록
    window.addEventListener('scroll', throttledScroll, { passive: true });
}

// 네비게이션 활성화 업데이트 (최적화된 버전)
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    let currentSection = '';
    const scrollPosition = window.scrollY + 150;

    // 최상단이면 hero 활성화
    if (window.scrollY < 100) {
        currentSection = 'hero';
    } else {
        // 현재 보이는 섹션 찾기
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
    
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', debounce(handleResize, 500), { passive: true });
}

// 나머지 함수들은 기존 코드와 동일하게 유지...
function handleMobileResize() {
    const nav = document.querySelector('header nav');
    if (nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
    }
    adjustMobileVideoModal();
}

function handleTabletResize() {
    const nav = document.querySelector('header nav');
    if (nav) {
        nav.classList.remove('active');
    }
}

function handleDesktopResize() {
    const nav = document.querySelector('header nav');
    if (nav) {
        nav.classList.remove('active');
    }
}

function adjustHeroHeight() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    if (viewportWidth <= 768) {
        hero.style.height = `${viewportHeight}px`;
    } else if (viewportWidth <= 1024) {
        hero.style.height = '80vh';
    } else {
        hero.style.height = '';
    }
}

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

function adjustMobileVideoModal() {
    const modal = document.querySelector('.video-modal iframe');
    if (!modal) return;
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    if (viewportWidth <= 768) {
        modal.style.width = '95vw';
        modal.style.height = '53vw';
        modal.style.maxHeight = `${viewportHeight * 0.6}px`;
    }
}

// 포트폴리오 필터 (기존 코드 유지)
function setupPortfolioFilter() {
    console.log('포트폴리오 필터 설정...');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');

    if (filterButtons.length === 0 || workItems.length === 0) return;

    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            console.log('필터 적용:', filterValue);
            
            workItems.forEach(function(item, index) {
                const shouldShow = filterValue === 'all' || 
                                 item.getAttribute('data-category') === filterValue;
                
                if (shouldShow) {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    item.style.display = 'block';
                    
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

// 비디오 모달 (기존 코드 유지)
function setupVideoModal() {
    console.log('비디오 모달 설정...');
    const modal = document.getElementById('video-modal');
    const modalIframe = document.getElementById('modal-iframe');
    const closeButton = document.querySelector('.close-button');
    
    if (!modal || !modalIframe) {
        console.log('비디오 모달 요소를 찾을 수 없음');
        return;
    }

    document.querySelectorAll('.work-item').forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            const iframe = this.querySelector('iframe');
            if (!iframe) return;

            const videoSrc = iframe.src;
            const videoId = extractYouTubeId(videoSrc);
            
            if (videoId) {
                openVideoModal(videoId);
            }
        });
    });

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
        modal.focus();
        console.log('비디오 모달 열림:', videoId);
    }

    function closeVideoModal() {
        modal.style.display = 'none';
        modalIframe.src = '';
        document.body.style.overflow = '';
        console.log('비디오 모달 닫힘');
    }

    window.closeVideoModal = closeVideoModal;
}

// 게시판 데이터와 렌더링 (기존 코드 유지)
const articles = [
    {
        date: "2025-05-28",
        media: "스포츠서울",
        title: "케이프스플래닛 '시크릿 아이돌' 원안자 + 공동제작자로 밝혀져",
        url: "https://www.sportsseoul.com/news/read/1519235",
        summary: "이정재가 1대주주로 있는 아티스트 스튜디오와 영국의 이매지너리움의 합작으로 기획개발중인 영화 '시크릿 아이돌'"
    },
    // 나머지 기사들...
];

function renderBoard() {
    const board = document.getElementById('headlineBoard');
    if (!board) return;

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

// 성능 모니터링
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

// 이미지 레이지 로딩
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

// 초기화
setupPerformanceMonitoring();
setupLazyLoading();
