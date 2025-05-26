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

    // 포트폴리오 필터링
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // 활성 버튼 변경
            filterBtns.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // 포트폴리오 아이템 필터링
            portfolioItems.forEach(function(item) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

// 스무스 스크롤 (기존 코드를 이것으로 교체)
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const header = document.querySelector('header');
                const headerOffset = header ? header.offsetHeight : 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
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
// 비디오 모달 기능 - 완전 수정
const modal = document.getElementById('video-modal');
const closeButton = modal ? modal.querySelector('.close-button') : null;
const modalIframe = document.getElementById('modal-iframe');

// 포트폴리오 비디오 클릭 이벤트 - 개선됨
function setupVideoClicks() {
    // 모든 포트폴리오 아이템에 클릭 이벤트 추가
    document.querySelectorAll('.portfolio-item').forEach(function(item) {
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const iframe = this.querySelector('iframe');
            if (iframe && modal && modalIframe) {
                let videoSrc = iframe.src;
                console.log('Original video src:', videoSrc);
                
                // YouTube URL에서 비디오 ID 추출
                let videoId = '';
                
                // embed URL에서 ID 추출
                if (videoSrc.includes('youtube.com/embed/')) {
                    const embedMatch = videoSrc.match(/youtube\.com\/embed\/([^?&]+)/);
                    if (embedMatch) {
                        videoId = embedMatch[1];
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
                } else {
                    console.error('Could not extract video ID from:', videoSrc);
                    alert('비디오를 재생할 수 없습니다.');
                }
            }
        });
    });
}

// 모달 닫기 함수
function closeModal() {
    if (modal && modalIframe) {
        modal.style.display = 'none';
        modalIframe.src = '';
        document.body.style.overflow = '';
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

// 포트폴리오 필터링 함수도 수정
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        // 활성 버튼 변경
        filterBtns.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        // 포트폴리오 아이템 필터링
        portfolioItems.forEach(function(item) {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // 필터링 후 비디오 클릭 이벤트 재설정
        setTimeout(setupVideoClicks, 100);
    });
});

// 페이지 로드 시 비디오 클릭 이벤트 설정
document.addEventListener('DOMContentLoaded', function() {
    setupVideoClicks();
    
                }
            }
        });
    });

    // 포트폴리오 아이템 전체 클릭 시 모달 열기 (대안)
    document.querySelectorAll('.portfolio-item').forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const iframe = this.querySelector('iframe');
            if (iframe && modal && modalIframe) {
                let videoSrc = iframe.src;
                
                // YouTube URL에서 비디오 ID 추출
                let videoId = '';
                if (videoSrc.includes('youtube.com/embed/')) {
                    videoId = videoSrc.split('youtube.com/embed/')[1].split('?')[0];
                } else if (videoSrc.includes('youtu.be/')) {
                    videoId = videoSrc.split('youtu.be/')[1].split('?')[0];
                }
                
                if (videoId) {
                    // 모달용 YouTube URL 생성 (autoplay 포함)
                    const modalVideoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0`;
                    modalIframe.src = modalVideoSrc;
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });

    // 모달 닫기 함수
    function closeModal() {
        if (modal && modalIframe) {
            modal.style.display = 'none';
            modalIframe.src = '';
            document.body.style.overflow = '';
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
    
// EmailJS 초기화 
(function() {
    emailjs.init(GnCf85iVH7vsa-xKr); // 4단계에서 복사한 Public Key
})();

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
            
            emailjs.send(('service_x1zvv5a', 'template_lujx42n', templateParams)
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

    // 스크롤 애니메이션 (선택사항)
    let ticking = false;
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-text');
        elements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                animateOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // 네비게이션 활성 링크 업데이트
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let current = '';
        sections.forEach(function(section) {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // 초기 로딩 완료 후 애니메이션 시작
    setTimeout(function() {
        animateOnScroll();
    }, 100);
});
