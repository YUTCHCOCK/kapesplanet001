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

// articles 배열에 날짜와 언론사 추가 (예시로 6개)
const articles = [
  { date: "2024-03-20", press: "스포츠서울", title: "케이프스플래닛 '시크릿 아이돌' 원안자 + 공동제작자로 밝혀져", url: "https://www.sportsseoul.com/news/read/1519235" },
  { date: "2024-03-12", press: "유튜브", title: "유치콕 숏폼 관련 인터뷰", url: "https://youtu.be/4D40Ldpxm5c?si=4JWRI1hHd1MImN87" },
  { date: "2024-02-28", press: "KOCCA", title: "KOCCA 트렌드OTT - 인물 인터뷰 유치콕 편", url: "https://www.kocca.kr/trendott/vol01/people_1.html" },
  { date: "2024-02-15", press: "데일리안", title: "솔비 신개념 진행 빛났다 - B급 토크쇼 '시방솔비'로 MC 능력 검증", url: "https://www.dailian.co.kr/news/view/1399105" },
  { date: "2024-01-20", press: "KOCCA", title: "KOCCA 콘텐츠 뉴스 - 바야흐로 숏숏폼 시대", url: "https://www.kocca.kr/n_content/vol30/sub02.html" },
  { date: "2023-11-08", press: "동아일보", title: "서울 1인 우수 창조기업 - 케이프스플래닛 선정", url: "https://www.donga.com/news/article/all/20231108/122080292/1" }
];

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
