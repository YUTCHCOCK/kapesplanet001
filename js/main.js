// 페이지 로드 후 즉시 실행되는 디버깅 코드
console.log('=== 네비게이션 디버깅 시작 ===');

// DOM이 로드되기 전에도 확인
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료');
    
    // 1. 섹션들이 존재하는지 확인
    const sections = ['hero', 'about', 'work', 'contact'];
    sections.forEach(id => {
        const element = document.getElementById(id);
        console.log(`섹션 ${id}:`, element ? '존재함' : '없음');
        if (element) {
            console.log(`- 위치: top=${element.offsetTop}, height=${element.offsetHeight}`);
        }
    });
    
    // 2. 네비게이션 링크들 확인
    const navLinks = document.querySelectorAll('nav ul li a');
    console.log('네비게이션 링크 개수:', navLinks.length);
    
    navLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        console.log(`링크 ${index}: href="${href}", 텍스트="${link.textContent}"`);
    });
    
    // 3. 간단한 스크롤 테스트 함수
    window.testScroll = function(targetId) {
        console.log(`=== ${targetId}로 스크롤 테스트 ===`);
        const target = document.getElementById(targetId);
        
        if (!target) {
            console.error(`타겟 요소 ${targetId}를 찾을 수 없습니다`);
            return;
        }
        
        const targetTop = target.offsetTop;
        console.log(`타겟 위치: ${targetTop}px`);
        
        window.scrollTo({
            top: targetTop - 100, // 헤더 높이 고려
            behavior: 'smooth'
        });
        
        console.log('스크롤 명령 실행됨');
    };
    
    // 4. 수동으로 각 링크에 클릭 이벤트 추가 (기존 이벤트와 별개)
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            console.log(`=== 네비게이션 링크 ${index} 클릭됨 ===`);
            console.log('href:', this.getAttribute('href'));
            console.log('이벤트 기본 동작 방지됨');
            
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                console.log('타겟 ID:', targetId);
                
                if (targetId === 'hero') {
                    console.log('Hero 섹션으로 이동 - 페이지 최상단');
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    const target = document.getElementById(targetId);
                    if (target) {
                        const targetTop = target.offsetTop;
                        const headerHeight = 100; // 헤더 높이 추정
                        const scrollTo = targetTop - headerHeight;
                        
                        console.log(`스크롤 대상: ${targetTop}px, 헤더 고려: ${scrollTo}px`);
                        
                        window.scrollTo({
                            top: scrollTo,
                            behavior: 'smooth'
                        });
                    } else {
                        console.error('타겟 요소를 찾을 수 없음:', targetId);
                    }
                }
            }
        });
    });
    
    // 5. 모바일 메뉴 처리
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('header nav');
    
    if (mobileMenuBtn && nav) {
        console.log('모바일 메뉴 버튼 이벤트 설정');
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            console.log('모바일 메뉴 토글:', nav.classList.contains('active') ? '열림' : '닫힘');
        });
        
        // 모바일 메뉴에서 링크 클릭 시 메뉴 닫기
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    console.log('모바일 메뉴 닫힘');
                }
            });
        });
    }
    
    console.log('=== 네비게이션 설정 완료 ===');
    
    // 6. 콘솔에서 테스트할 수 있는 함수들 제공
    console.log('테스트 함수들:');
    console.log('- testScroll("about") - About 섹션으로 스크롤');
    console.log('- testScroll("work") - work 섹션으로 스크롤');
    console.log('- testScroll("contact") - Contact 섹션으로 스크롤');
});

// 즉시 실행되는 체크
console.log('현재 URL:', window.location.href);
console.log('페이지 로드 상태:', document.readyState);
