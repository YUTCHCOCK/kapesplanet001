document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('header nav');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });

        // 메뉴 링크 클릭 시 메뉴 닫기
        document.querySelectorAll('nav ul li a').forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
            });
        });
    }

    // 스무스 스크롤 - 수정된 버전
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            console.log('링크 클릭됨:', href); // 디버깅용
            
            if (href && href.length > 1) {
                e.preventDefault();
                
                // 특별한 경우: #hero는 페이지 최상단으로
                if (href === '#hero') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }
                
                const target = document.querySelector(href);
                console.log('타겟 요소:', target); // 디버깅용
                
                if (target) {
                    const header = document.querySelector('header');
                    const headerOffset = header ? header.offsetHeight + 20 : 100; // 여유 공간 추가
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    console.log('스크롤 위치:', offsetPosition); // 디버깅용
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    console.error('타겟 요소를 찾을 수 없습니다:', href);
                }
            }
        });
    });

    // 헤더 스크롤 효과
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // 비디오 모달 기능
    const modal = document.getElementById('video-modal');
    const closeButton = modal ? modal.querySelector('.close-button') : null;
    const modalIframe = document.getElementById('modal-iframe');

    // 포트폴리오 비디오 클릭 이벤트 설정
    function setupVideoClicks() {
        console.log('Setting up video clicks...');
        
        document.querySelectorAll('.portfolio-item').forEach(function(item, index) {
            console.log(`Setting up click for item ${index}`);
            
            // 기존 이벤트 리스너 제거를 위해 복제
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);
        });

        // 새로 복제된 요소들에 이벤트 추가
        document.querySelectorAll('.portfolio-item').forEach(function(item, index) {
            item.style.cursor = 'pointer';
            
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log(`Portfolio item ${index} clicked`);
                
                const iframe = this.querySelector('iframe');
                console.log('Found iframe:', iframe);
                
                if (iframe && modal && modalIframe) {
                    let videoSrc = iframe.src;
                    console.log('Original video src:', videoSrc);
                    
                    // YouTube URL에서 비디오 ID 추출
                    let videoId = '';
                    
                    if (videoSrc.includes('youtube.com/embed/')) {
                        const embedMatch = videoSrc.match(/youtube\.com\/embed\/([^?&]+)/);
                        if (embedMatch) {
                            videoId = embedMatch[1];
                        }
                    } else if (videoSrc.includes('youtu.be/')) {
                        const shortMatch = videoSrc.match(/youtu\.be\/([^?&]+)/);
                        if (shortMatch) {
                            videoId = shortMatch[1];
                        }
                    }
                    
                    console.log('Extracted video ID:', videoId);
                    
                    if (videoId) {
                        // 모달용 URL 생성
                        const modalVideoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`;
                        console.log('Modal video src:', modalVideoSrc);
                        
                        modalIframe.src = modalVideoSrc;
                        modal.style.display = 'flex';
                        document.body.style.overflow = 'hidden';
                        
                        console.log('Modal opened successfully');
                    } else {
                        console.error('Could not extract video ID from:', videoSrc);
                        alert('비디오를 재생할 수 없습니다.');
                    }
                } else {
                    console.error('Missing elements:', {
                        iframe: !!iframe,
                        modal: !!modal,
                        modalIframe: !!modalIframe
                    });
                    alert('비디오 플레이어를 찾을 수 없습니다.');
                }
            });
        });
    }

    // 모달 닫기 함수
    function closeModal() {
        console.log('Closing modal...');
        if (modal && modalIframe) {
            modal.style.display = 'none';
            modalIframe.src = '';
            document.body.style.overflow = '';
            console.log('Modal closed');
        }
    }

    // 닫기 버튼 클릭
    if (closeButton) {
        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });
    }

    // 모달 바깥 클릭 시 닫기
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // 포트폴리오 필터링
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // 활성 버튼 변경
            filterBtns.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // 포트폴리오 아이템 필터링
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            portfolioItems.forEach(function(item) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            // 필터링 후 비디오 클릭 이벤트 재설정
            setTimeout(function() {
                setupVideoClicks();
                console.log('Video clicks re-setup after filtering');
            }, 100);
        });
    });

    // EmailJS 초기화
    if (typeof emailjs !== 'undefined') {
        emailjs.init("GnCf85iVH7vsa-xKr");
        
        // 폼 제출 처리
        const contactForm = document.querySelector('.contact-form');
        const newsletterForm = document.querySelector('.newsletter-form');

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
                        console.log('SUCCESS!', response.status, response.text);
                    })
                    .catch(function(error) {
                        alert('전송 중 오류가 발생했습니다. 다시 시도해주세요.');
                        console.error('FAILED...', error);
                    })
                    .finally(function() {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    });
            });
        }

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
                        })
                        .catch(function(error) {
                            alert('구독 신청 중 오류가 발생했습니다.');
                            console.error('Newsletter error:', error);
                        });
                }
            });
        }
    }

    // 네비게이션 활성 링크 업데이트 - 수정된 버전
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let current = '';
        const scrollPosition = window.scrollY + 150; // 헤더 높이 고려
        
        // 최상단에 있을 때는 hero를 활성화
        if (window.scrollY < 100) {
            current = 'hero';
        } else {
            // 각 섹션의 위치를 확인
            sections.forEach(function(section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
        }

        // 네비게이션 링크 업데이트
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // 스크롤 이벤트에 네비게이션 업데이트 추가
    window.addEventListener('scroll', updateActiveNavigation);

    // 초기 비디오 클릭 이벤트 설정
    setupVideoClicks();
    
    // 초기 네비게이션 상태 설정
    updateActiveNavigation();
    
    console.log('Page loaded, navigation and video clicks setup complete');
});
