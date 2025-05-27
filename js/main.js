/**
 * 차윤호 개인 홈페이지 - 메인 JavaScript
 * 공통 기능들을 처리하는 스크립트
 */

// DOM이 로드되면 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeMobileMenu();
});

// 네비게이션 관련 기능
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // 스크롤 시 네비게이션 스타일 변경
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 현재 페이지에 따른 활성 링크 설정
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// 스크롤 효과
function initializeScrollEffects() {
    // Intersection Observer로 애니메이션 트리거
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // 숫자 카운터 애니메이션
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들 관찰
    const animateElements = document.querySelectorAll('.animate-fade-up, .animate-fade-left, .animate-fade-right, .stat-item');
    animateElements.forEach(el => observer.observe(el));
}

// 숫자 카운터 애니메이션
function animateCounter(element) {
    const numberElement = element.querySelector('.stat-number');
    if (!numberElement || numberElement.hasAttribute('data-animated')) return;
    
    const target = numberElement.getAttribute('data-target');
    
    // 무한대 기호 처리
    if (target === '∞') {
        let counter = 0;
        const interval = setInterval(() => {
            counter += Math.floor(Math.random() * 50) + 1;
            numberElement.textContent = counter;
            if (counter > 999) {
                numberElement.textContent = '∞';
                clearInterval(interval);
            }
        }, 50);
    } else {
        const targetNum = parseInt(target);
        let current = 0;
        const increment = targetNum / 50; // 50프레임으로 나누어 애니메이션
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNum) {
                numberElement.textContent = targetNum;
                clearInterval(timer);
            } else {
                numberElement.textContent = Math.floor(current);
            }
        }, 30);
    }
    
    numberElement.setAttribute('data-animated', 'true');
}

// 애니메이션 초기화
function initializeAnimations() {
    // CSS 애니메이션 클래스 추가
    const style = document.createElement('style');
    style.textContent = `
        .animate-fade-up.animate {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        .animate-fade-left.animate {
            animation: fadeInLeft 0.8s ease forwards;
        }
        
        .animate-fade-right.animate {
            animation: fadeInRight 0.8s ease forwards;
        }
        
        .animate-fade-up,
        .animate-fade-left,
        .animate-fade-right {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .animate-fade-left {
            transform: translateX(-30px);
        }
        
        .animate-fade-right {
            transform: translateX(30px);
        }
    `;
    document.head.appendChild(style);
}

// 모바일 메뉴
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // 햄버거 아이콘 변경
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // 링크 클릭 시 모바일 메뉴 닫기
        const mobileLinks = navLinks.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// 부드러운 스크롤 (내부 링크용)
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 유틸리티 함수들
const utils = {
    // 요소가 뷰포트에 있는지 확인
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // 디바운스 함수
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    // 스로틀 함수
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// 전역 변수로 유틸리티 함수 노출
window.utils = utils;
