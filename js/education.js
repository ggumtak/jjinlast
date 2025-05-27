/**
 * Education Page JavaScript
 * Education 페이지 전용 스크립트
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeSemesterTabs();
    initializeProgressBars();
    initializeCourseCards();
    initializeActivityCards();
    initializeUniversityCard();
});

// 학기 탭 기능
function initializeSemesterTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const semesterCourses = document.querySelectorAll('.semester-courses');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const semester = this.getAttribute('data-semester');
            
            // 모든 탭 비활성화
            tabButtons.forEach(btn => btn.classList.remove('active'));
            semesterCourses.forEach(course => course.classList.remove('active'));
            
            // 선택된 탭 활성화
            this.classList.add('active');
            document.getElementById(`${semester}-courses`).classList.add('active');
            
            // 과목 카드 재애니메이션
            const courseCards = document.querySelectorAll(`#${semester}-courses .course-card`);
            courseCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
            
            // 진도 바 재애니메이션
            setTimeout(() => {
                animateProgressBars(`#${semester}-courses .progress-fill`);
            }, 300);
        });
    });
}

// 진도 바 애니메이션
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                const progress = entry.target.getAttribute('data-progress');
                animateProgressBar(entry.target, progress);
                entry.target.setAttribute('data-animated', 'true');
            }
        });
    }, {
        threshold: 0.5
    });
    
    progressBars.forEach(bar => observer.observe(bar));
}

function animateProgressBar(progressBar, targetProgress) {
    let currentProgress = 0;
    const increment = targetProgress / 50; // 50프레임으로 나누어 애니메이션
    
    const animation = setInterval(() => {
        currentProgress += increment;
        if (currentProgress >= targetProgress) {
            progressBar.style.width = targetProgress + '%';
            
            // 진도율 텍스트 업데이트
            const progressPercent = progressBar.closest('.course-progress').querySelector('.progress-percent');
            if (progressPercent) {
                progressPercent.textContent = targetProgress + '%';
            }
            
            clearInterval(animation);
            
            // 완료 시 글로우 효과
            progressBar.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.6)';
            setTimeout(() => {
                progressBar.style.boxShadow = 'none';
            }, 1000);
        } else {
            progressBar.style.width = currentProgress + '%';
            
            // 진도율 텍스트 실시간 업데이트
            const progressPercent = progressBar.closest('.course-progress').querySelector('.progress-percent');
            if (progressPercent) {
                progressPercent.textContent = Math.floor(currentProgress) + '%';
            }
        }
    }, 20);
}

function animateProgressBars(selector) {
    const progressBars = document.querySelectorAll(selector);
    progressBars.forEach((bar, index) => {
        if (!bar.hasAttribute('data-animated')) {
            setTimeout(() => {
                const progress = bar.getAttribute('data-progress');
                animateProgressBar(bar, progress);
                bar.setAttribute('data-animated', 'true');
            }, index * 200);
        }
    });
}

// 과목 카드 인터랙션
function initializeCourseCards() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        // 카드 호버 시 토픽 태그 애니메이션
        card.addEventListener('mouseenter', function() {
            const topics = this.querySelectorAll('.topic');
            topics.forEach((topic, index) => {
                setTimeout(() => {
                    topic.style.transform = 'translateY(-3px)';
                    topic.style.background = 'var(--accent)';
                    topic.style.color = 'var(--primary-bg)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const topics = this.querySelectorAll('.topic');
            topics.forEach(topic => {
                topic.style.transform = 'translateY(0)';
                topic.style.background = 'var(--secondary-bg)';
                topic.style.color = 'var(--text-secondary)';
            });
        });
        
        // 카드 클릭 시 확장 효과
        card.addEventListener('click', function() {
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        // 순차적 등장 애니메이션
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.setAttribute('data-animated', 'true');
                }
            });
        }, {
            threshold: 0.3
        });
        
        // 초기 상태 설정
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.8s ease';
        
        observer.observe(card);
    });
    
    // 과목 아이콘 회전 애니메이션
    const courseIcons = document.querySelectorAll('.course-icon');
    courseIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 600);
        });
    });
}

// 활동 카드 애니메이션
function initializeActivityCards() {
    const activityCards = document.querySelectorAll('.activity-card');
    
    activityCards.forEach((card, index) => {
        // 순차적 등장 애니메이션
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.setAttribute('data-animated', 'true');
                        
                        // 통계 숫자 카운터 애니메이션
                        animateStatNumbers(entry.target);
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
        
        // 카드 호버 시 아이콘 펄스 애니메이션
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.activity-icon');
            icon.style.animation = 'pulse 1s ease-in-out infinite';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.activity-icon');
            icon.style.animation = '';
        });
    });
}

// 통계 숫자 애니메이션
function animateStatNumbers(card) {
    const statNumbers = card.querySelectorAll('.stat-number');
    
    statNumbers.forEach(statNumber => {
        const finalText = statNumber.textContent;
        const isNumeric = /^\d+/.test(finalText);
        
        if (isNumeric) {
            const targetNumber = parseInt(finalText);
            let currentNumber = 0;
            const increment = targetNumber / 30; // 30프레임으로 나누어 애니메이션
            
            const animation = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= targetNumber) {
                    statNumber.textContent = finalText; // 원래 텍스트로 복원 (+ 기호 등 포함)
                    clearInterval(animation);
                } else {
                    statNumber.textContent = Math.floor(currentNumber);
                }
            }, 50);
        }
    });
}

// 대학교 카드 3D 효과
function initializeUniversityCard() {
    const universityCard = document.querySelector('.university-card');
    
    if (universityCard) {
        universityCard.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        universityCard.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // 대학교 로고 클릭 효과
        const universityLogo = universityCard.querySelector('.university-logo');
        if (universityLogo) {
            universityLogo.addEventListener('click', function() {
                this.style.animation = 'logoSpin 1s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 1000);
            });
        }
    }
}

// 토픽 태그 인터랙션
document.addEventListener('DOMContentLoaded', function() {
    const topics = document.querySelectorAll('.topic');
    
    topics.forEach(topic => {
        topic.addEventListener('click', function() {
            // 클릭된 토픽 하이라이트
            this.style.background = 'var(--accent-light)';
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 212, 255, 0.4)';
            
            setTimeout(() => {
                this.style.background = '';
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 800);
        });
    });
});

// 스크롤 기반 애니메이션 트리거
function createScrollAnimation() {
    const animateElements = document.querySelectorAll('.animate-fade-up');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
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

// 키보드 네비게이션
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // 탭 키로 과목 카드 간 이동시 하이라이트
        setTimeout(() => {
            const focusedCard = document.querySelector('.course-card:focus');
            if (focusedCard) {
                focusedCard.style.outline = '2px solid var(--accent)';
                focusedCard.style.outlineOffset = '2px';
            }
        }, 10);
    }
});

// 추가 애니메이션 정의
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('#education-animations')) {
        const style = document.createElement('style');
        style.id = 'education-animations';
        style.textContent = `
            @keyframes logoSpin {
                0% { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(180deg) scale(1.1); }
                100% { transform: rotate(360deg) scale(1); }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            @keyframes statCountUp {
                0% { transform: translateY(20px); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
            }
            
            .stat-number {
                animation: statCountUp 0.8s ease;
            }
            
            .topic {
                transition: all 0.3s ease;
            }
            
            .topic:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
            
            .course-card:focus {
                outline: none !important;
            }
            
            .activity-icon {
                transition: all 0.3s ease;
            }
            
            .university-card {
                transition: transform 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 스크롤 애니메이션 초기화
    createScrollAnimation();
});

// 모바일 디바이스에서 터치 효과
if ('ontouchstart' in window) {
    const cards = document.querySelectorAll('.course-card, .activity-card');
    
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}
