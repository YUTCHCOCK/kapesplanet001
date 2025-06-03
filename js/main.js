// 간단하고 확실하게 작동하는 네비게이션 스크립트
console.log('네비게이션 스크립트 시작');

// 전역 변수로 초기화 상태 관리
let isInitialized = false;

// 안전한 초기화 함수
function safeInit() {
    if (isInitialized) return;
    
    console.log('안전한 초기화 시작...');
    
    // DOM 요소들이 존재하는지 확인
    const navLinks = document.querySelectorAll('header nav ul li a');
    console.log('네비게이션 링크 개수:', navLinks.length);
    
    if (navLinks.length === 0) {
        console.log('네비게이션 링크를 찾을 수 없음. 1초 후 재시도...');
        setTimeout(safeInit, 1000);
        return;
    }
    
    // 모든 기능 초기화
    try {
        setupSimpleNavigation();
        setupMobileMenu();
        setupHeaderScroll();
        setupPortfolioFilter();
        setupVideoModal();
        renderPressBoard();
        setupResizeHandler();
        
        isInitialized = true;
        console.log('✅ 모든 기능 초기화 완료');
    } catch (error) {
        console.error('초기화 중 오류:', error);
        // 3초 후 재시도
        setTimeout(() => {
            isInitialized = false;
            safeInit();
        }, 3000);
    }
}

// 1. 간단한 네비게이션 설정
function setupSimpleNavigation() {
    console.log('📍 네비게이션 설정 중...');
    
    const navLinks = document.querySelectorAll('header nav ul li a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        console.log('링크 설정:', href);
        
        if (href && href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = href.substring(1); // # 제거
                console.log('클릭된 섹션:', targetId);
                
                scrollToTarget(targetId);
                setActiveLink(this);
                closeMobileMenu();
            });
        }
    });
}

// 2. 스크롤 함수 (가장 간단한 버전)
function scrollToTarget(sectionId) {
    console.log('🎯 스크롤 대상:', sectionId);
    
    if (sectionId === 'hero' || sectionId === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('✅ Hero 섹션으로 스크롤');
        return;
    }
    
    const target = document.getElementById(sectionId);
    if (!target) {
        console.error('❌ 섹션을 찾을 수 없음:', sectionId);
        return;
    }
    
    const headerHeight = 100; // 고정 헤더 높이
    const targetTop = target.offsetTop - headerHeight;
    
    console.log('📐 계산된 스크롤 위치:', targetTop);
    
    window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth'
    });
    
    console.log('✅ 스크롤 완료:', sectionId);
}

// 3. 활성 링크 설정
function setActiveLink(clickedLink) {
    document.querySelectorAll('header nav ul li a').forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');
}

// 4. 모바일 메뉴
function setupMobileMenu() {
    console.log('📱 모바일 메뉴 설정 중...');
    
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('header nav');
    
    if (!menuBtn || !nav) {
        console.log('모바일 메뉴 요소 없음');
        return;
    }
    
    menuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        nav.classList.toggle('active');
        
        if (nav.classList.contains('active')) {
            menuBtn.innerHTML = '<i class="fas fa-times"></i>';
            document.body.style.overflow = 'hidden';
        } else {
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });
    
    // 메뉴 외부 클릭시 닫기
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const nav = document.querySelector('header nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        document.body.style.overflow = '';
        if (menuBtn) {
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
}

// 5. 헤더 스크롤 효과
function setupHeaderScroll() {
    console.log('📜 헤더 스크롤 효과 설정 중...');
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        const header = document.querySelector('header');
        
        if (header) {
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

// 6. 포트폴리오 필터
function setupPortfolioFilter() {
    console.log('🎨 포트폴리오 필터 설정 중...');
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    
    if (filterBtns.length === 0) {
        console.log('필터 버튼 없음');
        return;
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // 활성 버튼 변경
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 아이템 필터링
            workItems.forEach(item => {
                const category = item.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                
                item.style.display = shouldShow ? 'block' : 'none';
            });
            
            console.log('필터 적용됨:', filter);
        });
    });
}

// 7. 비디오 모달
function setupVideoModal() {
    console.log('🎬 비디오 모달 설정 중...');
    
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('modal-iframe');
    const closeBtn = document.querySelector('.close-button');
    
    if (!modal || !iframe) {
        console.log('비디오 모달 요소 없음');
        return;
    }
    
    // 포트폴리오 아이템 클릭
    document.querySelectorAll('.work-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const videoFrame = this.querySelector('iframe');
            if (videoFrame) {
                const src = videoFrame.src;
                const videoId = extractVideoId(src);
                if (videoId) {
                    openModal(videoId);
                }
            }
        });
    });
    
    // 모달 닫기
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    function extractVideoId(url) {
        const match = url.match(/youtube\.com\/embed\/([^?&]+)/);
        return match ? match[1] : null;
    }
    
    function openModal(videoId) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.style.display = 'none';
        iframe.src = '';
        document.body.style.overflow = '';
    }
    
    // 전역으로 노출
    window.closeVideoModal = closeModal;
}

// 8. 프레스 게시판 렌더링
function renderPressBoard() {
    console.log('📰 프레스 게시판 렌더링 중...');
    
    const board = document.getElementById('headlineBoard');
    if (!board) {
        console.log('프레스 게시판 요소 없음');
        return;
    }

// 기존 main.js 파일에서 수정할 부분들

// 1. setupScrollIndicator 함수를 다른 함수들과 함께 추가
// (renderPressBoard 함수 다음에 추가하면 됩니다)

// 8. 프레스 게시판 렌더링
function renderPressBoard() {
    console.log('📰 프레스 게시판 렌더링 중...');
    
    const board = document.getElementById('headlineBoard');
    if (!board) {
        console.log('프레스 게시판 요소 없음');
        return;
    }
    
    // 프레스 데이터
    const articles = [
        // ... 기존 articles 배열 내용 ...
    ];
    
    // 기사 목록 생성
    board.innerHTML = '';
    
    articles.forEach(article => {
        const li = document.createElement('li');
        li.className = 'headline-row';
        li.innerHTML = `
            <div class="headline-date">${article.date}</div>
            <div class="headline-main">
                <a href="${article.url}" class="headline-title" target="_blank" rel="noopener">
                    ${article.title}
                </a>
                <div class="headline-summary">${article.summary}</div>
            </div>
            <div class="headline-media">${article.media}</div>
        `;
        board.appendChild(li);
    });
    
    console.log('✅ 프레스 게시판 렌더링 완료');
}

// 🆕 9. 스크롤 안내 표시판 설정 함수 (여기에 추가!)
function setupScrollIndicator() {
    console.log('📍 스크롤 안내 표시판 설정 중...');
    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroSection = document.querySelector('.hero');
    
    if (!scrollIndicator || !heroSection) {
        console.log('스크롤 안내 표시판 요소 없음');
        return;
    }
    
    // 클릭시 About 섹션으로 스크롤
    scrollIndicator.addEventListener('click', function() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            scrollToTarget('about');
            console.log('스크롤 안내 클릭 - About 섹션으로 이동');
        }
    });
    
    // 스크롤에 따른 표시판 숨김/표시
    let lastScrollY = 0;
    let ticking = false;
    
    function updateScrollIndicator() {
        const scrollY = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;
        const scrollProgress = scrollY / (heroHeight * 0.3); // 히어로의 30% 지점에서 시작
        
        if (scrollProgress > 1) {
            // 완전히 숨김
            scrollIndicator.classList.add('hide');
        } else if (scrollProgress > 0.5) {
            // 페이드 아웃 시작
            const opacity = 1 - ((scrollProgress - 0.5) * 2);
            scrollIndicator.style.opacity = Math.max(0, opacity);
            scrollIndicator.style.transform = `translateX(-50%) translateY(${scrollProgress * 20}px)`;
        } else {
            // 완전히 표시
            scrollIndicator.classList.remove('hide');
            scrollIndicator.style.opacity = '';
            scrollIndicator.style.transform = '';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollIndicator);
            ticking = true;
        }
    }
    
    // 스크롤 이벤트 리스너 (쓰로틀링 적용)
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    
    // 히어로 섹션 높이 변경시 재계산
    if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(requestScrollUpdate);
        resizeObserver.observe(heroSection);
    }
    
    console.log('✅ 스크롤 안내 표시판 설정 완료');
}

function safeInit() {
    if (isInitialized) return;
    
    console.log('안전한 초기화 시작...');
    
    // DOM 요소들이 존재하는지 확인
    const navLinks = document.querySelectorAll('header nav ul li a');
    console.log('네비게이션 링크 개수:', navLinks.length);
    
    if (navLinks.length === 0) {
        console.log('네비게이션 링크를 찾을 수 없음. 1초 후 재시도...');
        setTimeout(safeInit, 1000);
        return;
    }
    
    // 모든 기능 초기화
    try {
        setupSimpleNavigation();
        setupMobileMenu();
        setupHeaderScroll();
        setupPortfolioFilter();
        setupVideoModal();
        renderPressBoard();
        setupResizeHandler();
        setupScrollIndicator(); // 🆕 이 줄 추가!
        
        isInitialized = true;
        console.log('✅ 모든 기능 초기화 완료');
    } catch (error) {
        console.error('초기화 중 오류:', error);
        // 3초 후 재시도
        setTimeout(() => {
            isInitialized = false;
            safeInit();
        }, 3000);
    }
}

// 나머지 코드는 그대로 유지...


    
    // 프레스 데이터
    const articles = [
        {
            date: "2025-05-28",
            media: "스포츠서울",
            title: "케이프스플래닛 '시크릿 아이돌' 원안자 + 공동제작자로 밝혀져",
            url: "https://www.sportsseoul.com/news/read/1519235",
            summary: "아티스트 스튜디오와 영국의 이매지너리움의 합작으로 기획개발중인 영화 '시크릿 아이돌'"
        },
        {
            date: "2025-05-08",
            media: "한국콘텐츠진흥원",
            title: "숏폼에서 콘텐츠 비즈니스의 미래를 보다 l 케이프스플래닛 유일한 대표",
            url: "https://youtu.be/4D40Ldpxm5c?si=Qv7Ebk-Mk5gygy-l5",
            summary: "유일한 대표 인터뷰 영상. 한국 콘텐츠 진흥원 발간 웹진 방송영상 OTT트렌드 2025 Vol.1"
        },
        {
            date: "2025-05-07",
            media: "한국콘텐츠진흥원",
            title: "'KOCCA 트렌드 - 인물 인터뷰 케이프스플래닛 유일한 대표",
            url: "https://www.kocca.kr/trendott/vol01/people_1.html",
            summary: "숏폼의 시작과 변천사 / 글로벌 숏폼드라마 플랫폼은 미래? / 숏폼 IP 비즈니스의 전망"
        },
        {
            date: "2024-08-23",
            media: "스포츠경향",
            title: "'시방솔비' 솔비의 좌충우돌 B급 MC 성장기",
            url: "https://sports.khan.co.kr/article/202408230804003",
            summary: "김구라, 김종민, 퀸가비 등 초특급 게스트로 연일 화제몰이중인 유튜브 채널 시방솔비"
        },
        {
            date: "2023-11-29",
            media: "한국콘텐츠진흥원",
            title: "KOCCA 콘텐츠 뉴스 - 바야흐로 숏숏폼 시대",
            url: "https://www.kocca.kr/n_content/vol30/sub02.html",
            summary: "'틱톡'의 등장과 함께 바야흐로 '숏숏폼(1분 이하의 콘텐츠)' 전성시대가 열렸다."
        },
        {
            date: "2023-11-08",
            media: "동아일보",
            title: "23년 서울 1인 창조기업 - 케이프스플래닛 창업진흥원장 표창",
            url: "https://www.donga.com/news/article/all/20231108/122080292/1",
            summary: "'2023 서울권 1인 창조기업 성과발표회, 케이프스플래닛 창업진흥원장 표창"
        }
    ];
    
    // 기사 목록 생성
    board.innerHTML = ''; // 기존 내용 초기화
    
    articles.forEach(article => {
        const li = document.createElement('li');
        li.className = 'headline-row';
        li.innerHTML = `
            <div class="headline-date">${article.date}</div>
            <div class="headline-main">
                <a href="${article.url}" class="headline-title" target="_blank" rel="noopener">
                    ${article.title}
                </a>
                <div class="headline-summary">${article.summary}</div>
            </div>
            <div class="headline-media">${article.media}</div>
        `;
        board.appendChild(li);
    });
    
    console.log('✅ 프레스 게시판 렌더링 완료');
}
<script>
window.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.querySelector(".scroll-indicator")?.classList.remove("hide");
    }, 3000); // 5초(5000ms) 후 나타남
});
</script>
// 9. 리사이즈 핸들러
function setupResizeHandler() {
    console.log('📏 리사이즈 핸들러 설정 중...');
    
    let resizeTimer;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // 모바일 메뉴가 열려있으면 닫기
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        }, 250);
    }, { passive: true });
}

// 초기화 실행
// 다양한 시점에서 초기화 시도
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeInit);
} else {
    safeInit();
}

// 추가 안전장치: 페이지 로드 완료 후에도 한 번 더 시도
window.addEventListener('load', function() {
    if (!isInitialized) {
        console.log('페이지 로드 완료 후 재시도...');
        setTimeout(safeInit, 500);
    }
});

console.log('🚀 네비게이션 스크립트 로드 완료');
