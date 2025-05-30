console.log('main.js 로드됨');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료');
    setupNavigation();
    setupMobileMenu();
    setupHeaderEffects();
    setupPortfolioFilter();
    setupVideoModal();
    renderBoard();
    setupContactForm();
    console.log('모든 설정 완료');
});

// 네비게이션 스크롤 기능
function setupNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                // 내부 앵커일 경우만 기본 동작 막고 스크롤 이동
                e.preventDefault();
                const targetId = href.replace('#', '');
                scrollToSection(targetId);
            }
        });
    });
}
// 섹션으로 스크롤
function scrollToSection(sectionId) {
    console.log('스크롤 시작:', sectionId);

    if (sectionId === 'hero') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        console.log('Hero 섹션으로 스크롤');
        return;
    }

    const targetElement = document.getElementById(sectionId);

    if (targetElement) {
        const headerHeight = 120;
        const elementTop = targetElement.offsetTop;
        const scrollPosition = elementTop - headerHeight;

        console.log('타겟 위치:', elementTop);
        console.log('스크롤 위치:', scrollPosition);

        window.scrollTo({
            top: Math.max(0, scrollPosition),
            behavior: 'smooth'
        });

        console.log('스크롤 완료');
    } else {
        console.error('섹션을 찾을 수 없음:', sectionId);
    }
}

// 모바일 메뉴 설정
function setupMobileMenu() {
    console.log('모바일 메뉴 설정...');
    const menuButton = document.querySelector('.mobile-menu-btn');
    const navigation = document.querySelector('header nav');

    if (menuButton && navigation) {
        // 메뉴 버튼 클릭
        menuButton.addEventListener('click', function() {
            navigation.classList.toggle('active');
            console.log('모바일 메뉴 토글');
        });

        // 메뉴 링크 클릭시 메뉴 닫기
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (navigation.classList.contains('active')) {
                    navigation.classList.remove('active');
                    console.log('모바일 메뉴 닫힘');
                }
            });
        });
    }
}

// 헤더 스크롤 효과
function setupHeaderEffects() {
    console.log('헤더 효과 설정...');
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        updateActiveNavigation();
    });
}

// 네비게이션 활성화 업데이트
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
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
    }

    navLinks.forEach(function(link) {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// 포트폴리오 필터 설정
function setupPortfolioFilter() {
    console.log('포트폴리오 필터 설정...');
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            filterButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            const filterValue = this.getAttribute('data-filter');
            console.log('필터 적용:', filterValue);
            const workItems = document.querySelectorAll('.work-item');
            workItems.forEach(function(item) {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// 비디오 모달 설정
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
            if (iframe) {
                const videoSrc = iframe.src;
                let videoId = '';
                // YouTube 영상 ID 추출
                if (videoSrc.includes('youtube.com/embed/')) {
                    const match = videoSrc.match(/youtube\.com\/embed\/([^?&]+)/);
                    if (match) {
                        videoId = match[1];
                    }
                }
                if (videoId) {
                    const modalSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`;
                    modalIframe.src = modalSrc;
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                    console.log('비디오 모달 열림:', videoId);
                }
            }
        });
    });
    // 모달 닫기 버튼
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            closeVideoModal();
        });
    }
    // 모달 바깥 클릭시 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeVideoModal();
        }
    });
    // ESC 키로 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeVideoModal();
        }
    });
}
function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const modalIframe = document.getElementById('modal-iframe');
    if (modal && modalIframe) {
        modal.style.display = 'none';
        modalIframe.src = '';
        document.body.style.overflow = '';
        console.log('비디오 모달 닫힘');
    }
}

// 게시판 데이터
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
    summary: "숏폼의 시작과 변천사 / 글로벌 숏폼드라마 플랫폼은 미래가 될 것인가 / 숏폼 IP 비즈니스의 미래와 앞으로의 전망 "
  },
  {
    date: "2024-08-23",
    media: "스포츠경향",
    title: "'시방솔비' 솔비의 좌충우돌 B급 MC 성장기 ",
    url: "https://sports.khan.co.kr/article/202408230804003",
    summary: "김구라, 김종민, 가비, 유병재, 궤도 등 초특급 게스트로 연일 화제몰이중인 유튜브 채널 시방솔비"
  },
  {
    date: "2023-11-29",
    media: "한국콘텐츠진흥원",
    title: "KOCCA 콘텐츠 뉴스 - 바야흐로 숏숏폼 시대",
    url: "https://www.kocca.kr/n_content/vol30/sub02.html",
    summary: "숏폼들은 계속해서 업그레이드를 한다. ‘틱톡’의 등장과 함께 바야흐로 ‘숏숏폼(1분 이하의 콘텐츠)’ 전성시대가 열렸다.."
  },
  {
    date: "2023-11-08",
    media: "동아일보",
    title: "23년 서울 1인 창조기업 - 케이프스플래닛 창웝진흥원장 표창",
    url: "https://www.donga.com/news/article/all/20231108/122080292/1",
    summary: " ‘2023 서울권 1인 창조기업 지원센터 입주기업 성과발표회에서 케이프스플래닛 등이 창업진흥원장 표창장을 받았다."
  }
];

// 게시판 렌더링
function renderBoard() {
  const board = document.getElementById('headlineBoard');
  if (!board) return;
  let html = "";
  articles.forEach(item => {
    html += `
      <li class="headline-row">
        <div class="headline-date">${item.date}</div>
        <div class="headline-main">
          <a href="${item.url}" class="headline-title" target="_blank" rel="noopener">
            ${item.title}
          </a>
          <div class="headline-summary">${item.summary}</div>
        </div>
        <div class="headline-media">${item.media}</div>
      </li>
    `;
  });
  board.innerHTML = html;
}
