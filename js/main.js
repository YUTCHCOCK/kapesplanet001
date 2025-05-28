console.log('main.js 로드됨');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료');
    
    // 기본 설정들 먼저 실행
    setupNavigation();
    setupMobileMenu();
    setupHeaderEffects();
    setupHistoryNavigation();
    
    // 동적 콘텐츠 관련 설정은 지연 실행
    setTimeout(() => {
        setupPortfolioFilter();
        renderBoard();
        
        // 모든 동적 콘텐츠가 렌더링된 후 이벤트 리스너 등록
        setTimeout(() => {
            setupVideoModal();
            setupContactForm();
            console.log('모든 설정 완료');
        }, 100);
    }, 50);
});

// 이벤트 리스너를 다시 등록하는 함수
function reAttachEventListeners() {
    console.log('이벤트 리스너 재등록');
    setupVideoModal();
}

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
            
            // 스크롤 완료 후 이벤트 리스너 재확인
            setTimeout(() => {
                reAttachEventListeners();
            }, 1000);
            
            // 히스토리 상태 업데이트
            if (window.location.hash !== '#' + targetId) {
                history.pushState({ section: targetId }, '', '#' + targetId);
            }
        });
    });
}

// 히스토리 네비게이션 설정
function setupHistoryNavigation() {
    window.addEventListener('popstate', function(e) {
        const hash = window.location.hash.replace('#', '') || 'hero';
        console.log('히스토리 네비게이션:', hash);
        scrollToSection(hash);
        
        // 히스토리 네비게이션 후에도 이벤트 리스너 재확인
        setTimeout(() => {
            reAttachEventListeners();
        }, 1000);
    });
    
    // 페이지 로드시 URL 해시 확인
    if (window.location.hash) {
        const initialSection = window.location.hash.replace('#', '');
        setTimeout(() => {
            scrollToSection(initialSection);
            setTimeout(() => reAttachEventListeners(), 1000);
        }, 100);
    }
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

        // 메뉴 외부 클릭시 닫기
        document.addEventListener('click', function(e) {
            if (!navigation.contains(e.target) && !menuButton.contains(e.target)) {
                if (navigation.classList.contains('active')) {
                    navigation.classList.remove('active');
                    console.log('모바일 메뉴 외부 클릭으로 닫힘');
                }
            }
        });

        // ESC 키로 메뉴 닫기
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navigation.classList.contains('active')) {
                navigation.classList.remove('active');
                console.log('ESC 키로 모바일 메뉴 닫힘');
            }
        });
    }
}

// 헤더 스크롤 효과
function setupHeaderEffects() {
    console.log('헤더 효과 설정...');
    
    let ticking = false;
    
    function updateHeader() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        updateActiveNavigation();
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// 네비게이션 활성화 업데이트
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    let currentSection = '';
    const scrollPosition = window.scrollY + 150;

    if (window.scrollY < 100) {
        currentSection = 'hero';
    } else {
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
    
    if (filterButtons.length === 0) {
        console.log('필터 버튼을 찾을 수 없음, 재시도...');
        setTimeout(setupPortfolioFilter, 100);
        return;
    }
    
    filterButtons.forEach(function(button) {
        // 기존 이벤트 리스너 제거 (중복 방지)
        button.removeEventListener('click', handleFilterClick);
        button.addEventListener('click', handleFilterClick);
    });
}

// 필터 클릭 핸들러 (별도 함수로 분리)
function handleFilterClick() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
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
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 10);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
    
    // 필터 변경 후 비디오 모달 이벤트 재등록
    setTimeout(() => {
        setupVideoModal();
    }, 350);
}

// 비디오 모달 설정 (개선된 버전)
function setupVideoModal() {
    console.log('비디오 모달 설정...');
    const modal = document.getElementById('video-modal');
    const modalIframe = document.getElementById('modal-iframe');
    const closeButton = document.querySelector('.close-button');
    
    if (!modal || !modalIframe) {
        console.log('비디오 모달 요소를 찾을 수 없음');
        return;
    }
    
    // 기존 이벤트 리스너 제거 (중복 방지)
    const workItems = document.querySelectorAll('.work-item');
    
    if (workItems.length === 0) {
        console.log('워크 아이템을 찾을 수 없음, 재시도...');
        setTimeout(setupVideoModal, 100);
        return;
    }
    
    console.log(`${workItems.length}개의 워크 아이템 발견`);
    
    workItems.forEach(function(item) {
        // 기존 클릭 이벤트 제거
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
    });
    
    // 새로운 이벤트 리스너 등록
    document.querySelectorAll('.work-item').forEach(function(item) {
        item.addEventListener('click', function(e) {
            console.log('워크 아이템 클릭됨');
            e.preventDefault();
            e.stopPropagation();
            
            const iframe = this.querySelector('iframe');
            if (iframe) {
                const videoSrc = iframe.src;
                let videoId = '';
                
                console.log('비디오 소스:', videoSrc);
                
                try {
                    if (videoSrc.includes('youtube.com/embed/')) {
                        const match = videoSrc.match(/youtube\.com\/embed\/([^?&]+)/);
                        if (match && match[1]) {
                            videoId = match[1];
                        }
                    }
                    
                    if (videoId) {
                        const modalSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`;
                        modalIframe.src = modalSrc;
                        modal.style.display = 'flex';
                        document.body.style.overflow = 'hidden';
                        
                        console.log('비디오 모달 열림:', videoId);
                    } else {
                        console.error('비디오 ID를 찾을 수 없음');
                    }
                } catch (error) {
                    console.error('비디오 ID 추출 실패:', error);
                }
            } else {
                console.error('iframe을 찾을 수 없음');
            }
        });
    });
    
    // 모달 닫기 이벤트 설정
    if (closeButton) {
        closeButton.removeEventListener('click', closeVideoModal);
        closeButton.addEventListener('click', closeVideoModal);
    }
    
    modal.removeEventListener('click', handleModalClick);
    modal.addEventListener('click', handleModalClick);
}

// 모달 클릭 핸들러 (별도 함수로 분리)
function handleModalClick(e) {
    if (e.target === document.getElementById('video-modal')) {
        closeVideoModal();
    }
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

// ESC 키 이벤트 (전역)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('video-modal');
        if (modal && modal.style.display === 'flex') {
            closeVideoModal();
        }
    }
});

// 프레스 기사 데이터
const articles = [
    {
        date: "2025-05-28",
        media: "스포츠서울",
        title: "케이프스플래닛 '시크릿 아이돌' 원안자 + 공동제작자로 밝혀져",
        url: "https://www.sportsseoul.com/news/read/1519235",
        summary: "이정재가 1대주주로 있는 아티스트 스튜디오와 영국의 이매지너리움의 합작으로 기획개발중인 영화 '시크릿 아이돌'의 원안 기획 및 공동제작사가 케이프스플래닛가 글로벌 주목을 받고 있다."
    },
    {
        date: "2025-05-08",
        media: "한국콘텐츠진흥원",
        title: "숏폼에서 콘텐츠 비즈니스의 미래를 보다 l 케이프스플래닛 유일한 대표",
        url: "https://youtu.be/4D40Ldpxm5c?si=Qv7Ebk-Mk5gygy-l5",
        summary: "케이프스플래닛 유일한 대표 인터뷰 영상. 한국 콘텐츠 진흥원 발간 웹진 방송영상 OTT트렌드 2025 Vol.1 *다소 길고 지루할 수 있으니, 숏폼을 즐겨보시는 분은 시청을 삼가해주세요*"
    },
    {
        date: "2025-05-07",
        media: "한국콘텐츠진흥원",
        title: "'KOCCA 트렌드 - 인물 인터뷰 유치콕 편",
        url: "https://www.kocca.kr/trendott/vol01/people_1.html",
        summary: "숏폼의 역사 돌아보기: 숏폼의 시작과 변천사 / 숏폼의 오늘: 글로벌 숏폼드라마 플랫폼은 미래가 될 것인가 / 숏폼의 내일: 숏폼 IP 비즈니스의 미래와 앞으로의 전망"
    },
    {
        date: "2024-08-23",
        media: "스포츠경향",
        title: "'시방솔비' 솔비의 좌충우돌 B급 MC 성장기",
        url: "https://sports.khan.co.kr/article/202408230804003",
        summary: "김구라, 김종민, 가비, 유병재, 궤도 등 초특급 게스트로 연일 화제몰이중인 유튜브 채널 시방솔비. 단독 MC 자질 논란에 시달리던 솔비는, 이것은 페이크다큐라며 한국의 오프라 윈프리를 꿈꾼다고 뻔뻔하게 말했다."
    },
    {
        date: "2023-11-29",
        media: "한국콘텐츠진흥원",
        title: "KOCCA 콘텐츠 뉴스 - 바야흐로 숏숏폼 시대",
        url: "https://www.kocca.kr/n_content/vol30/sub02.html",
        summary: "숏폼들은 계속해서 한 단계 업그레이드를 한다. '틱톡'의 등장과 함께 1분 이하의 더 짧은 콘텐츠의 시대가 개막한 것이다. 인스타 릴스, 유튜브 숏츠.. 바야흐로 '숏숏폼(1분 이하의 콘텐츠)' 전성시대가 열렸다.."
    },
    {
        date: "2023-11-08",
        media: "동아일보",
        title: "23년 서울 1인 창조기업 - 케이프스플래닛 창웝진흥원장 표창",
        url: "https://www.donga.com/news/article/all/20231108/122080292/1",
        summary: "'2023 서울권 1인 창조기업 지원센터 입주기업 성과발표회가 열렸습니다. 본 행사에서 케이프스플래닛 유일한 대표 등이 우수한 성과를 낸 공로를 인정받아 창업진흥원장 표창장을 받았다."
    }
];

// 프레스 보드 렌더링
function renderBoard() {
    console.log('프레스 보드 렌더링 시작...');
    const board = document.getElementById('headlineBoard');
    
    if (!board) {
        console.error('headlineBoard 요소를 찾을 수 없음, 재시도...');
        setTimeout(renderBoard, 100);
        return;
    }

    let html = "";
    articles.forEach((item, index) => {
        html += `
            <li class="headline-row" data-index="${index}">
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

    board.innerHTML = `<ul class="headline-list">${html}</ul>`;
    
    console.log('프레스 보드 렌더링 완료 - 기사 수:', articles.length);
    
    // 렌더링 후 요소 확인
    const renderedItems = board.querySelectorAll('.headline-row');
    console.log('렌더링된 기사 수:', renderedItems.length);
}

// 컨택트 폼 설정
function setupContactForm() {
    console.log('컨택트 폼 설정...');
    
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS가 로드되지 않음');
        return;
    }
    
    emailjs.init("GnCf85iVH7vsa-xKr");
    
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');

    // 컨택트 폼 처리
    if (contactForm) {
        // 기존 이벤트 리스너 제거
        contactForm.removeEventListener('submit', handleContactSubmit);
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // 뉴스레터 폼 처리
    if (newsletterForm) {
        newsletterForm.removeEventListener('submit', handleNewsletterSubmit);
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

// 컨택트 폼 제출 핸들러
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const message = formData.get('message')?.trim();
    
    if (!name || !email || !message) {
        alert('모든 필드를 입력해주세요.');
        return;
    }
    
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
        alert('올바른 이메일 주소를 입력해주세요.');
        return;
    }
    
    submitBtn.textContent = '전송 중...';
    submitBtn.disabled = true;
    
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message
    };
    
    emailjs.send('service_x1zvv5a', 'template_lujx42n', templateParams)
        .then(function(response) {
            alert('문의가 성공적으로 전송되었습니다!');
            this.reset();
            console.log('이메일 전송 성공:', response);
        }.bind(this))
        .catch(function(error) {
            alert('전송 중 오류가 발생했습니다. 다시 시도해주세요.');
            console.error('이메일 전송 실패:', error);
        })
        .finally(function() {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
}

// 뉴스레터 폼 제출 핸들러
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('.newsletter-input');
    const email = emailInput.value?.trim();
    
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!email) {
        alert('이메일 주소를 입력해주세요.');
        emailInput.focus();
        return;
    }
    
    if (!emailRegex.test(email)) {
        alert('올바른 이메일 주소를 입력해주세요.');
        emailInput.focus();
        return;
    }
    
    const templateParams = {
        from_name: '뉴스레터 구독자',
        from_email: email,
        message: '뉴스레터 구독을 신청합니다.'
    };
    
    emailjs.send('service_x1zvv5a', 'template_lujx42n', templateParams)
        .then(function(response) {
            alert('뉴스레터 구독이 완료되었습니다!');
            emailInput.value = '';
            console.log('뉴스레터 구독 성공:', response);
        })
        .catch(function(error) {
            alert('구독 신청 중 오류가 발생했습니다.');
            console.error('뉴스레터 구독 실패:', error);
        });
}
