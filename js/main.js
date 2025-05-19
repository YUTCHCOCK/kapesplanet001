/* 기본 스타일 및 리셋 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: #FF6B00; /* 오렌지 기본 컬러 */
    --primary-dark: #DD5B00;
    --secondary-color: #000000; /* 검은색 */
    --text-color: #333333;
    --light-color: #FFFFFF;
    --gray-color: #F5F5F5;
    --dark-gray: #222222;
    --overlay-color: rgba(0, 0, 0, 0.7);
    --transition: all 0.3s ease;
    --section-padding: 100px 0;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Noto Sans KR', 'Montserrat', sans-serif;
    color: var(--text-color);
    background-color: var(--secondary-color);
    line-height: 1.6;
    overflow-x: hidden;
    font-size: 16px;
}

a {
    text-decoration: none;
    color: inherit;
}

ul, li {
    list-style: none;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
    font-weight: 700;
    line-height: 1.2;
}

img {
    max-width: 100%;
    height: auto;
    display: block;
}

.btn {
    display: inline-block;
    padding: 15px 30px;
    background-color: var(--primary-color);
    color: var(--light-color);
    border: none;
    font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    cursor: pointer;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.btn::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transition: all 0.4s ease;
}

.btn:hover::after {
    left: 100%;
}

.btn:hover {
    background-color: var(--primary-dark);
}

section {
    padding: var(--section-padding);
    position: relative;
}

.section-header {
    text-align: center;
    margin-bottom: 60px;
    position: relative;
}

.section-header h2 {
    font-size: 48px;
    margin-bottom: 15px;
    color: var(--light-color);
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    display: inline-block;
}

.section-header h2::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: var(--primary-color);
}

.section-subheader {
    font-size: 18px;
    color: #999;
    margin-top: 20px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
}

/* 애니메이션 */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

@keyframes slideLeft {
    from { transform: translateX(50px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideRight {
    from { transform: translateX(-50px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

/* 로딩 애니메이션 */
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--secondary-color);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease, visibility 0.5s ease;
}

.loading-screen.hidden {
    opacity: 0;
    visibility: hidden;
}

.loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.loader-logo {
    width: 180px;
    height: 180px;
    margin-bottom: 20px;
    animation: pulse 2s infinite;
}

.loader-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.loader-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 42px;
    font-weight: 700;
    letter-spacing: 2px;
    display: flex;
    overflow: hidden;
}

.loader-text .kapes {
    color: var(--light-color);
    margin-right: 8px;
    animation: slideRight 0.8s forwards;
}

.loader-text .planet {
    color: var(--primary-color);
    animation: slideLeft 0.8s forwards;
}

/* 헤더 */
header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    transition: all 0.4s ease;
}

header.scrolled {
    background-color: rgba(0, 0, 0, 0.95);
    padding: 15px 50px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.logo {
    position: relative;
    z-index: 101;
}

.logo-img {
    height: 40px;
    transition: var(--transition);
}

header.scrolled .logo-img {
    height: 30px;
}

nav ul {
    display: flex;
}

nav ul li {
    margin-left: 40px;
}

nav ul li a {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: var(--light-color);
    letter-spacing: 1px;
    transition: var(--transition);
    position: relative;
}

nav ul li a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: var(--transition);
}

nav ul li a:hover {
    color: var(--primary-color);
}

nav ul li a:hover::after {
    width: 100%;
}

.menu-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
    z-index: 101;
}

.menu-toggle span {
    width: 30px;
    height: 3px;
    background-color: var(--light-color);
    margin-bottom: 6px;
    transition: var(--transition);
}

.menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(7px, 7px);
}

.menu-toggle.active span:nth-child(2) {
    opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -7px);
}

.mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--secondary-color);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
}

.mobile-menu.active {
    opacity: 1;
    visibility: visible;
}

.mobile-menu ul {
    text-align: center;
}

.mobile-menu ul li {
    margin-bottom: 30px;
}

.mobile-menu ul li a {
    font-family: 'Montserrat', sans-serif;
    font-size: 24px;
    color: var(--light-color);
    font-weight: 700;
    letter-spacing: 2px;
    transition: var(--transition);
}

.mobile-menu ul li a:hover {
    color: var(--primary-color);
}

/* 히어로 섹션 */
.hero {
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    overflow: hidden;
}

.video-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.video-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.video-fallback {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #111;
    background-image: url('https://via.placeholder.com/1920x1080/222222/FF6B00/?text=KAPES+PLANET');
    background-size: cover;
    background-position: center;
    z-index: -2;
}

.video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.9) 0%,
        rgba(0, 0, 0, 0.6) 50%,
        rgba(0, 0, 0, 0.9) 100%
    );
    z-index: -1;
}

.hero-content {
    text-align: center;
    z-index: 1;
    padding: 0 20px;
    max-width: 1200px;
    width: 100%;
}

.hero-text h1 {
    font-size: 60px;
    font-weight: 900;
    line-height: 1.2;
    color: var(--light-color);
    margin-bottom: 30px;
}

.hero-text .tagline {
    font-size: 22px;
    font-weight: 500;
    color: var(--light-color);
    margin-bottom: 40px;
    opacity: 0.9;
}

.hero-logo {
    margin: 40px 0;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
}

.hero-logo img {
    width: 100%;
}

.animate-text {
    display: block;
    opacity: 0;
    animation: slideUp 0.8s forwards;
}

.delay-1 {
    animation-delay: 0.3s;
}

.delay-2 {
    animation-delay: 0.6s;
}

.delay-3 {
    animation-delay: 0.9s;
}

.scroll-indicator {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: fadeIn 1s forwards;
    animation-delay: 1.5s;
    opacity: 0;
}

.scroll-indicator span {
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
