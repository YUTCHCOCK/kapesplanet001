// 새로운 main.js - 간단하고 확실하게 작동
console.log('main.js 로드됨');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료');
    
    // 네비게이션 스크롤 설정
    setupNavigation();
    
    // 모바일 메뉴 설정
    setupMobileMenu();
    
    // 헤더 스크롤 효과
    setupHeaderEffects();
    
    // 포트폴리오 필터
    setupPortfolioFilter();
    
    // 비디오 모달
    setupVideoModal();
    
    // 컨택트 폼
    setupContactForm();
    
    console.log('모든 설정 완료');
});

// 네비게이션 스크롤 기능
function setupNavigation() {
    console.log('네비게이션 설정...');
    
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').replace('#', '');
            console.log('클릭된 섹션:', targetId);
            
            scrollToSection(targetId);
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
        
        // 네비게이션 활성화 업데이트
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
    
    // 네비게이션 링크 업데이트
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
            // 모든 버튼에서 active 제거
            filterButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            
            // 클릭된 버튼에 active 추가
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            console.log('필터 적용:', filterValue);
            
            // 포트폴리오 아이템 필터링
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

// 비디오 모달 닫기
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
// 기사 데이터
const articles = [
  {
    date: "2025-05-28",
    title: "케이프스플래닛 '시크릿 아이돌' 원안자 + 공동제작자로 밝혀져",
    url: "https://www.sportsseoul.com/news/read/1519235",
    summary: "이정재가 1대주주로 있는 아티스트 스튜디오와 영국의 이매지너리움의 합작으로 기획개발중인 영화 '시크릿 아이돌'의 원안 기획 및 공동제작자로 케이프스플래닛이 참여 중."
  },
  {
    date: "2025-04-24",
    title: "대상웰라이프, 건강한 내일을 위한 브랜드 ‘헤이N’ 론칭",
    url: "https://news-site.com/article2",
    summary: "대상웰라이프가 건강한 내일을 위한 새로운 브랜드 '헤이N'을 론칭했습니다."
  },
  {
    date: "2025-04-21",
    title: "뉴케어, 청소년 균형영양식 ‘뉴케어 하이멘토’ 출시",
    url: "https://news-site.com/article3",
    summary: "뉴케어가 청소년을 위한 균형영양식 '하이멘토'를 새롭게 출시하였습니다."
  }
  // ... 더 추가 가능
];

// 게시판 렌더링
function renderNewsList() {
  const list = document.getElementById('newsList');
  list.innerHTML = articles.map(item => `
    <li class="news-item">
      <a href="${item.url}" class="news-title" target="_blank" rel="noopener noreferrer">${item.title}</a>
      <div class="news-summary">${item.summary}</div>
      <div class="news-date">${item.date}</div>
    </li>
  `).join('');
}

window.addEventListener('DOMContentLoaded', renderNewsList);
// articles 배열에 날짜와 언론사 추가 (예시로 6개)
const articles = [
  {
    date: "2025-05-28",
    press: "스포츠서울",
    title: "케이프스플래닛 '시크릿 아이돌' 원안자 + 공동제작자로 밝혀져",
    url: "https://www.sportsseoul.com/news/read/1519235",
    summary: "이정재가 1대주주로 있는 아티스트 스튜디오와 영국의 이매지너리움의 합작으로 기획개발중인 영화 '시크릿 아이돌'의 원안 기획 및 공동제작"
  },
  {
    date: "2025-05-08",
    press: "한국콘텐츠진흥원",
    title: "숏폼에서 콘텐츠 비즈니스의 미래를 보다 l 케이프스플래닛 유일한 대표",
    url: "https://youtu.be/4D40Ldpxm5c?si=Qv7Ebk-Mk5gygy-l5",
    summary: "케이프스플래닛 유일한 대표 인터뷰 영상. 한국 콘텐츠 진흥원 발간 웹진 방송영상 OTT트렌드 2025 Vol.1"
  },
 {
    date: "2025-05-07",
    press: "한국콘텐츠진흥원",
    title: "'KOCCA 트렌드 - 인물 인터뷰 유치콕 편",
    url: "https://www.kocca.kr/trendott/vol01/people_1.html",
    summary: "원숭이행성 자체 제작 유튜브 채널 <시방솔비> 론칭으로 화제몰이 중인 MC솔비를 만나다 "
  },
{
    date: "2025-05-28",
    press: "스포츠경향",
    title: "'시방솔비' 솔비의 좌충우돌 B급 MC 성장기 ",
    url: "https://www.sportsseoul.com/news/read/1519235",
    summary: "솔비는 최근 론칭한 유튜브 채널 ‘시방솔비(연출 유일한, 원숭이행성 제작)’에서 단독 MC를 맡고, ‘성장형 캐릭터’로서 기대를 모으고 있다.
  },
 {
    date: "2023-11-29",
    press: "한국콘텐츠진흥원",
    title: "KOCCA 콘텐츠 뉴스 - 바야흐로 숏숏폼 시대",
    url: "https://www.kocca.kr/n_content/vol30/sub02.html",
    summary: "케이프스플래닛 유일한 대표와 함께 숏폼 콘텐츠 비즈니스의 어제와 오늘, 그리고 내일에 대해 이야기해보았습니다."
  },
 {
    date: "2025-05-28",
    press: "동아일보",
    title: "23년 서울 1인 창조기업 - 케이프스플래닛 창웝진흥원장 표창",
    url: "https://www.donga.com/news/article/all/20231108/122080292/1",
    summary: " ‘2023 서울권 1인 창조기업 지원센터 입주기업 성과발표회를 통해 케이프스플래닛 유일한 대표(창업진흥원) 등이 우수한 성과를 낸 공로를 인정받아 표창장을 받았다."
  },

// 게시판 렌더링
function renderNewsList() {
  const list = document.getElementById('newsList');
  list.innerHTML = articles.map(item => `
    <li class="news-item">
      <a href="${item.url}" class="news-title" target="_blank" rel="noopener noreferrer">${item.title}</a>
      <div class="news-summary">${item.summary}</div>
      <div class="news-date">${item.date}</div>
    </li>
  `).join('');
}

window.addEventListener('DOMContentLoaded', renderNewsList);
let openedIdx = null;

function renderBoard() {
  const board = document.getElementById('headlineBoard');
  if (!board) return;

  let html = '<ul class="headline-list">';
  articles.forEach((item, idx) => {
    html += `
      <li class="headline-row">
        <span class="headline-date">${item.date}</span>
        <button
          class="headline-title-btn"
          onclick="toggleArticle(${idx})"
          title="기사 열기"
        >
          ${item.title}
        </button>
        <span class="headline-press">${item.press}</span>
        <div id="articleContent${idx}" class="article-content${openedIdx === idx ? ' open' : ''}">
          <iframe src="${item.url}" title="기사${idx + 1}"></iframe>
        </div>
      </li>
    `;
  });
  html += '</ul>';
  board.innerHTML = html;
}

window.toggleArticle = function(idx) {
  openedIdx = (openedIdx === idx) ? null : idx;
  renderBoard();
};

window.addEventListener('DOMContentLoaded', renderBoard);

// 컨택트 폼 설정
function setupContactForm() {
    console.log('컨택트 폼 설정...');
    
    // EmailJS 초기화 확인
    if (typeof emailjs === 'undefined') {
        console.log('EmailJS가 로드되지 않음');
        return;
    }
    
    emailjs.init("GnCf85iVH7vsa-xKr");
    
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // 컨택트 폼 처리
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // 전송 중 표시
            submitBtn.textContent = '전송 중...';
            submitBtn.disabled = true;
            
            const templateParams = {
                from_name: formData.get('name') || '이름 없음',
                from_email: formData.get('email') || '',
                message: formData.get('message') || ''
            };
            
            emailjs.send('service_x1zvv5a', 'template_lujx42n', templateParams)
                .then(function(response) {
                    alert('문의가 성공적으로 전송되었습니다!');
                    contactForm.reset();
                    console.log('이메일 전송 성공');
                })
                .catch(function(error) {
                    alert('전송 중 오류가 발생했습니다. 다시 시도해주세요.');
                    console.error('이메일 전송 실패:', error);
                })
                .finally(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
    
    // 뉴스레터 폼 처리
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('.newsletter-input').value;
            
            if (email) {
                const templateParams = {
                    from_name: '뉴스레터 구독자',
                    from_email: email,
                    message: '뉴스레터 구독을 신청합니다.'
                };
                
                emailjs.send('service_x1zvv5a', 'template_lujx42n', templateParams)
                    .then(function(response) {
                        alert('뉴스레터 구독이 완료되었습니다!');
                        newsletterForm.querySelector('.newsletter-input').value = '';
                        console.log('뉴스레터 구독 성공');
                    })
                    .catch(function(error) {
                        alert('구독 신청 중 오류가 발생했습니다.');
                        console.error('뉴스레터 구독 실패:', error);
                    });
            }
        });
    }
}
