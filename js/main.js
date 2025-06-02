

[Deprecation] -ms-high-contrast is in the process of being deprecated. Please see <URL> for tips on updating to the new Forced Colors Mode standard. [Deprecation] -ms-high-contrast is in the process of being deprecated. Please see <URL> for tips on updating to the new Forced Colors Mode standard.

pasted


// 반응형 최적화 JavaScript console.log('반응형 최적화 스크립트 로드됨'); // 디바이스 감지 및 성능 최적화 const isMobile = window.innerWidth <= 768; const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024; const isDesktop = window.innerWidth > 1024; // 디바운스 함수 (성능 최적화) function debounce(func, wait) {

pasted


<!DOCTYPE html> <html lang="ko"> <head> <!-- 성능 최적화 메타태그 추가 --> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"> <meta name="theme-color" content="#FF5A00"> <!-- 프리로드 최적화 추가 -->

pasted


/* ===== 기존 스타일 유지 + 미디어 최적화 ===== */ /* 기본 스타일 초기화 */ * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; } /* 글꼴 */ @font-face { font-family: 'Pretendard'; src: url('

pasted

네비게이션 메뉴가 작동하지 않는데... 왜 그럴까?

코드를 분석해보니 네비게이션 메뉴가 작동하지 않는 주요 원인들이 보입니다. 콘솔 에러와 코드를 함께 살펴보면 다음과 같은 문제들이 있어요:

주요 문제점들
1. Content Security Policy (CSP) 위반
[Report Only] Refused to load the script because it violates CSP directive: "script-src 'unsafe-inline'"
인라인 스크립트들이 CSP에 의해 차단되고 있어요
2. 비동기 로딩 문제
JavaScript에서 loading="eager"와 defer 속성을 동시에 사용하면서 타이밍 문제가 발생할 수 있어요.

3. 이벤트 리스너 충돌
스크롤 이벤트에서 passive: false와 passive: true가 혼재되어 있어요.

해결 방법

수정된 네비게이션 JavaScript 코드
Code 
추가 수정사항
HTML에서도 몇 가지 수정이 필요해요:


수정된 HTML head 섹션
Code 
스크립트 로딩 순서 수정
HTML 하단의 스크립트 부분도 수정해주세요:


수정된 스크립트 로딩
Code 



Continue


수정된 스크립트 로딩
Code ∙ Version 2 
추가로 CSS에서 스크롤 성능 개선
CSS에도 몇 가지 성능 최적화를 추가해주세요:


CSS 성능 최적화 추가
Code 
문제 해결 요약
네비게이션이 작동하지 않는 주요 원인들과 해결책은 다음과 같습니다:

🔍 주요 문제점들
CSP (Content Security Policy) 위반
인라인 스크립트가 보안 정책에 의해 차단됨
unsafe-inline과 unsafe-eval 허용 필요
이벤트 리스너 중복/충돌
같은 요소에 여러 번 이벤트 리스너 등록
passive: true/false 혼재로 인한 충돌
스크립트 로딩 순서 문제
defer 속성과 DOMContentLoaded 이벤트 충돌
Font Awesome 비동기 로딩으로 인한 아이콘 렌더링 지연
스크롤 성능 이슈
Violation 경고들로 인한 스크롤 블로킹
✅ 해결 방법
CSP 정책 완화 - 더 관대한 보안 정책 설정
이벤트 리스너 정리 - 기존 리스너 제거 후 재등록
스크립트 로딩 개선 - 순차적이고 안정적인 로딩
성능 최적화 - GPU 가속, 터치 최적화 등
🛠️ 적용 방법
JavaScript 파일(js/main.js) 를 수정된 코드로 교체
HTML head 섹션 의 CSP와 스크립트 로딩 부분 수정
CSS 파일 상단 에 성능 최적화 코드 추가
HTML 하단 의 스크립트 로딩 부분 수정
이렇게 수정하면 네비게이션 메뉴가 정상적으로 작동할 것입니다! 💪




여전히 네비가 작동되지 않아 ㅜㅜ 그리고 프레스 게시판이 다 보이지 않게 됐어

아, 문제를 정확히 파악했어요! 네비게이션이 안 되는 이유와 프레스 게시판이 안 보이는 이유를 찾았습니다.


JavaScript navigation scroll not working DOM ready
10 results





















문제를 찾았어요! 두 가지 주요 이슈가 있습니다:

JavaScript가 DOM 요소를 찾지 못함 - 스크립트가 로드되기 전에 실행되고 있어요
articles 배열이 누락됨 - 프레스 게시판 데이터가 빠졌네요
간단하고 확실한 해결책을 제시할게요:


확실히 작동하는 간단한 네비게이션 스크립트
Code 
이제 HTML에서 스크립트 로딩 부분을 아주 간단하게 수정해주세요:


간단한 HTML 스크립트 로딩
Code 
🔧 해결 방법 요약
문제점들:
❌ DOM 요소를 찾지 못함 - 스크립트가 너무 일찍 실행됨
❌ 프레스 기사 데이터 누락 - `



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
    
    // 프레스 데이터
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
