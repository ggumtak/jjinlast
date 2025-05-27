/**
 * Interests Page JavaScript
 * Interests 페이지 전용 스크립트
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeHobbiesCarousel();
    initializeTechCards();
    initializeLearningGoals();
    initializeInspirationCards();
    initializeInterestLevels();
    initializeFloatingShapes();
});

// 취미 캐러셀 기능
function initializeHobbiesCarousel() {
    const slides = document.querySelectorAll('.hobby-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let autoPlayInterval;

    function showSlide(index) {
        // 모든 슬라이드 숨기기
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                setTimeout(() => {
                    slide.classList.add('active');
                }, 100);
            }
        });

        // 모든 점 비활성화
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });

        currentSlide = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // 이벤트 리스너
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // 마우스 호버 시 자동 재생 정지
    const carousel = document.querySelector('.hobbies-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }

    // 키보드 네비게이션
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        }
    });

    // 자동 재생 시작
    startAutoPlay();

    // 슬라이드 전환 애니메이션 개선
    slides.forEach((slide, index) => {
        slide.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}

// 기술 카드 애니메이션
function initializeTechCards() {
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach((card, index) => {
        // 순차적 등장 애니메이션
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.setAttribute('data-animated', 'true');

                        // 관심도 레벨 바 애니메이션
                        animateInterestLevel(entry.target);
                    }, index * 200);
                }
            });
        }, {
            threshold: 0.3
        });

        // 초기 상태 설정
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s ease';
        
        observer.observe(card);

        // 카드 호버 시 세부 정보 하이라이트
        card.addEventListener('mouseenter', function() {
            const detailItems = this.querySelectorAll('.detail-item');
            detailItems.forEach((item, itemIndex) => {
                setTimeout(() => {
                    item.style.background = 'rgba(0, 212, 255, 0.05)';
                    item.style.transform = 'translateX(10px)';
                }, itemIndex * 100);
            });
        });

        card.addEventListener('mouseleave', function() {
            const detailItems = this.querySelectorAll('.detail-item');
            detailItems.forEach(item => {
                item.style.background = '';
                item.style.transform = '';
            });
        });

        // 기술 아이콘 클릭 효과
        const techIcon = card.querySelector('.tech-icon');
        if (techIcon) {
            techIcon.addEventListener('click', function() {
                this.style.animation = 'techIconSpin 1s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 1000);
            });
        }
    });
}

// 관심도 레벨 애니메이션
function animateInterestLevel(card) {
    const levelBars = card.querySelectorAll('.level-bar.active');
    levelBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.transform = 'scaleX(1)';
            bar.style.opacity = '1';
        }, index * 150);
    });
}

function initializeInterestLevels() {
    const levelBars = document.querySelectorAll('.level-bar');
    
    // 초기 상태 설정
    levelBars.forEach(bar => {
        if (bar.classList.contains('active')) {
            bar.style.transform = 'scaleX(0)';
            bar.style.transformOrigin = 'left';
            bar.style.transition = 'transform 0.6s ease';
        }
    });
}

// 학습 목표 애니메이션
function initializeLearningGoals() {
    const goalCategories = document.querySelectorAll('.goal-category');
    
    goalCategories.forEach((category, index) => {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.setAttribute('data-animated', 'true');

                        // 목표 아이템들 순차적 등장
                        const goalItems = entry.target.querySelectorAll('.goal-item');
                        goalItems.forEach((item, itemIndex) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateX(0)';
                            }, itemIndex * 150);
                        });
                    }, index * 300);
                }
            });
        }, {
            threshold: 0.3
        });

        // 초기 상태 설정
        category.style.opacity = '0';
        category.style.transform = 'translateY(50px)';
        category.style.transition = 'all 0.8s ease';

        // 목표 아이템 초기 상태
        const goalItems = category.querySelectorAll('.goal-item');
        goalItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = 'all 0.6s ease';
        });

        observer.observe(category);

        // 카테고리 호버 효과
        category.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.category-title i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(360deg)';
                icon.style.color = 'var(--accent-light)';
            }
        });

        category.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.category-title i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = 'var(--accent)';
            }
        });
    });

    // 목표 아이템 개별 인터랙션
    const goalItems = document.querySelectorAll('.goal-item');
    goalItems.forEach(item => {
        item.addEventListener('click', function() {
            // 클릭된 아이템 하이라이트
            this.style.background = 'var(--accent)';
            this.style.color = 'var(--primary-bg)';
            this.style.transform = 'translateX(20px) scale(1.02)';

            setTimeout(() => {
                this.style.background = '';
                this.style.color = '';
                this.style.transform = '';
            }, 1000);
        });
    });
}

// 영감 카드 애니메이션
function initializeInspirationCards() {
    const inspirationCards = document.querySelectorAll('.inspiration-card');
    
    inspirationCards.forEach((card, index) => {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.setAttribute('data-animated', 'true');
                    }, index * 150);
                }
            });
        }, {
            threshold: 0.3
        });

        // 초기 상태 설정
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s ease';
        
        observer.observe(card);

        // 카드 호버 시 예시 태그 애니메이션
        card.addEventListener('mouseenter', function() {
            const examples = this.querySelectorAll('.inspiration-examples span');
            examples.forEach((example, exampleIndex) => {
                setTimeout(() => {
                    example.style.transform = 'translateY(-5px)';
                    example.style.background = 'var(--accent)';
                    example.style.color = 'var(--primary-bg)';
                }, exampleIndex * 100);
            });
        });

        card.addEventListener('mouseleave', function() {
            const examples = this.querySelectorAll('.inspiration-examples span');
            examples.forEach(example => {
                example.style.transform = '';
                example.style.background = '';
                example.style.color = '';
            });
        });

        // 영감 아이콘 클릭 효과
        const inspirationIcon = card.querySelector('.inspiration-icon');
        if (inspirationIcon) {
            inspirationIcon.addEventListener('click', function() {
                this.style.animation = 'inspirationPulse 1s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 1000);
            });
        }
    });
}

// 플로팅 도형 애니메이션
function initializeFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        // 마우스 움직임에 따른 패럴랙스 효과
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            const moveX = (mouseX - windowWidth / 2) * 0.01 * (index + 1);
            const moveY = (mouseY - windowHeight / 2) * 0.01 * (index + 1);
            
            shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        // 클릭 시 색상 변경
        shape.addEventListener('click', function() {
            const colors = [
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
            ];
            
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.style.background = randomColor;
            this.style.transform = 'scale(1.2)';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
}

// 스크롤 기반 애니메이션 개선
function enhanceScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-fade-up');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.setAttribute('data-animated', 'true');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
}

// 키보드 접근성 개선
document.addEventListener('keydown', function(e) {
    // Tab 키로 포커스 이동 시 시각적 피드백
    if (e.key === 'Tab') {
        setTimeout(() => {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('goal-item')) {
                focusedElement.style.outline = '2px solid var(--accent)';
                focusedElement.style.outlineOffset = '2px';
            }
        }, 10);
    }
    
    // Enter/Space 키로 카드 활성화
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('tech-card') || 
            focusedElement.classList.contains('inspiration-card')) {
            focusedElement.click();
            e.preventDefault();
        }
    }
});

// 터치 디바이스 지원
if ('ontouchstart' in window) {
    const cards = document.querySelectorAll('.tech-card, .inspiration-card, .goal-item');
    
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// 성능 최적화를 위한 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 추가 애니메이션 정의
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('#interests-animations')) {
        const style = document.createElement('style');
        style.id = 'interests-animations';
        style.textContent = `
            @keyframes techIconSpin {
                0% { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(180deg) scale(1.2); }
                100% { transform: rotate(360deg) scale(1); }
            }
            
            @keyframes hobbySlideIn {
                0% { 
                    opacity: 0; 
                    transform: translateX(100px) rotateY(45deg); 
                }
                100% { 
                    opacity: 1; 
                    transform: translateX(0) rotateY(0); 
                }
            }
            
            @keyframes goalItemPop {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            .goal-item:hover {
                animation: goalItemPop 0.3s ease;
            }
            
            .hobby-slide.active {
                animation: hobbySlideIn 0.6s ease;
            }
            
            .detail-item {
                transition: all 0.3s ease;
            }
            
            .inspiration-examples span {
                transition: all 0.3s ease;
            }
            
            .level-bar {
                transition: all 0.3s ease;
            }
            
            .tech-icon,
            .inspiration-icon {
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 스크롤 애니메이션 개선 초기화
    enhanceScrollAnimations();
});

// 리사이즈 이벤트 처리
window.addEventListener('resize', debounce(function() {
    // 캐러셀 위치 재조정
    const activeSlide = document.querySelector('.hobby-slide.active');
    if (activeSlide) {
        activeSlide.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
}, 250));

// 페이지 언로드 시 자동 재생 정리
window.addEventListener('beforeunload', function() {
    const intervals = document.querySelectorAll('[data-interval]');
    intervals.forEach(interval => {
        clearInterval(parseInt(interval.dataset.interval));
    });
});

// 접근성을 위한 미디어 쿼리 감지
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // 애니메이션 축소
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}
