/**
 * About Page JavaScript
 * About 페이지 전용 스크립트
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeSkillBars();
    initializeTimelineAnimation();
    initializeProfileCard();
    initializeValueCards();
});

// 스킬 바 애니메이션
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                const level = entry.target.getAttribute('data-level');
                animateSkillBar(entry.target, level);
                entry.target.setAttribute('data-animated', 'true');
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

function animateSkillBar(skillBar, targetLevel) {
    let currentLevel = 0;
    const increment = targetLevel / 50; // 50프레임으로 나누어 애니메이션
    
    const animation = setInterval(() => {
        currentLevel += increment;
        if (currentLevel >= targetLevel) {
            skillBar.style.width = targetLevel + '%';
            clearInterval(animation);
            
            // 완료 시 반짝이는 효과
            skillBar.style.boxShadow = `0 0 20px rgba(0, 212, 255, 0.6)`;
            setTimeout(() => {
                skillBar.style.boxShadow = 'none';
            }, 1000);
        } else {
            skillBar.style.width = currentLevel + '%';
        }
    }, 20);
}

// 타임라인 애니메이션
function initializeTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                
                // 타임라인 도트 애니메이션
                const dot = entry.target.querySelector('.timeline-dot');
                if (dot) {
                    setTimeout(() => {
                        dot.style.transform = 'scale(1.3)';
                        setTimeout(() => {
                            dot.style.transform = 'scale(1)';
                        }, 300);
                    }, 200);
                }
            }
        });
    }, {
        threshold: 0.3
    });
    
    // 초기 상태 설정
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// 프로필 카드 인터랙션
function initializeProfileCard() {
    const profileCard = document.querySelector('.profile-card');
    const profileAvatar = document.querySelector('.profile-avatar');
    
    if (profileCard && profileAvatar) {
        // 마우스 움직임에 따른 3D 효과
        profileCard.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        profileCard.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
        
        // 아바타 클릭 효과
        profileAvatar.addEventListener('click', function() {
            this.style.animation = 'avatarBounce 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
        
        // 아바타 바운스 애니메이션 정의
        if (!document.querySelector('#avatar-bounce-keyframes')) {
            const style = document.createElement('style');
            style.id = 'avatar-bounce-keyframes';
            style.textContent = `
                @keyframes avatarBounce {
                    0%, 100% { transform: scale(1); }
                    25% { transform: scale(1.1) rotate(5deg); }
                    50% { transform: scale(1.2) rotate(-5deg); }
                    75% { transform: scale(1.1) rotate(5deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// 가치관 카드 애니메이션
function initializeValueCards() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach((card, index) => {
        // 순차적 등장 애니메이션
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.setAttribute('data-animated', 'true');
                    }, index * 150); // 각 카드마다 150ms 지연
                }
            });
        }, {
            threshold: 0.3
        });
        
        // 초기 상태 설정
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        
        observer.observe(card);
        
        // 카드 호버 시 주변 카드들 약간 축소
        card.addEventListener('mouseenter', function() {
            valueCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.style.transform = 'scale(0.95)';
                    otherCard.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            valueCards.forEach(otherCard => {
                otherCard.style.transform = 'scale(1)';
                otherCard.style.opacity = '1';
            });
        });
    });
}

// 목표 섹션 인터랙션
document.addEventListener('DOMContentLoaded', function() {
    const goalItems = document.querySelectorAll('.goal-item');
    
    goalItems.forEach((item, index) => {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                        entry.target.setAttribute('data-animated', 'true');
                        
                        // 리스트 아이템들 순차적 등장
                        const listItems = entry.target.querySelectorAll('li');
                        listItems.forEach((li, liIndex) => {
                            setTimeout(() => {
                                li.style.opacity = '1';
                                li.style.transform = 'translateX(0)';
                            }, liIndex * 100);
                        });
                    }, index * 200);
                }
            });
        }, {
            threshold: 0.3
        });
        
        // 초기 상태 설정
        item.style.opacity = '0';
        item.style.transform = 'translateX(-100px)';
        item.style.transition = 'all 0.8s ease';
        
        // 리스트 아이템 초기 상태
        const listItems = item.querySelectorAll('li');
        listItems.forEach(li => {
            li.style.opacity = '0';
            li.style.transform = 'translateX(-20px)';
            li.style.transition = 'all 0.5s ease';
        });
        
        observer.observe(item);
    });
});

// 스크롤 진행률 표시 (선택사항)
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', utils.throttle(function() {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    }, 10));
}

// 부드러운 등장 효과를 위한 Intersection Observer 유틸리티
function createFadeInObserver(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-active');
            }
        });
    }, {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });
}

// CSS 클래스 추가 (동적으로)
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('#fade-in-styles')) {
        const style = document.createElement('style');
        style.id = 'fade-in-styles';
        style.textContent = `
            .fade-in-element {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s ease;
            }
            
            .fade-in-active {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    // 스크롤 진행률 초기화 (원하는 경우)
    // initializeScrollProgress();
});

// 스킬 카테고리 호버 효과
document.addEventListener('DOMContentLoaded', function() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.category-header i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.color = 'var(--accent-light)';
            }
        });
        
        category.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.category-header i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = 'var(--accent)';
            }
        });
    });
});
