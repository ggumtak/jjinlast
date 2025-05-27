/**
 * Projects Page JavaScript
 * Projects 페이지 전용 스크립트
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeStatsCounter();
    initializeProgressBars();
    initializeProjectCards();
    initializeRoadmap();
    initializeSkillsTimeline();
    initializeTechTags();
});

// 통계 숫자 카운터 애니메이션
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.projects-stats .stat-number');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                entry.target.setAttribute('data-animated', 'true');
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 30; // 30프레임으로 나누어 애니메이션
    const duration = 1500; // 1.5초
    const stepTime = duration / 30;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
            
            // 완료 시 펄스 효과
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 300);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// 프로젝트 진도 바 애니메이션
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
    const increment = targetProgress / 60; // 60프레임으로 나누어 애니메이션
    
    const animation = setInterval(() => {
        currentProgress += increment;
        if (currentProgress >= targetProgress) {
            progressBar.style.width = targetProgress + '%';
            clearInterval(animation);
            
            // 완료 시 글로우 효과
            progressBar.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.6)';
            setTimeout(() => {
                progressBar.style.boxShadow = 'none';
            }, 1000);
        } else {
            progressBar.style.width = currentProgress + '%';
        }
    }, 25);
}

// 프로젝트 카드 애니메이션
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // 순차적 등장 애니메이션
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.setAttribute('data-animated', 'true');
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

        // 카드 호버 시 기술 태그 애니메이션
        card.addEventListener('mouseenter', function() {
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach((tag, tagIndex) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-3px)';
                    tag.style.background = 'var(--accent)';
                    tag.style.color = 'var(--primary-bg)';
                }, tagIndex * 100);
            });
        });

        card.addEventListener('mouseleave', function() {
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transform = 'translateY(0)';
                tag.style.background = '';
                tag.style.color = '';
            });
        });

        // 프로젝트 아이콘 클릭 효과
        const projectIcon = card.querySelector('.project-icon');
        if (projectIcon) {
            projectIcon.addEventListener('click', function() {
                this.style.animation = 'projectIconSpin 1s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 1000);
            });
        }
    });

    // 프로젝트 링크 클릭 시 알림 (실제 링크가 없으므로)
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 임시 알림 표시
            showNotification('프로젝트 완성 후 링크가 활성화됩니다!');
            
            // 클릭 효과
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// 알림 표시 함수
function showNotification(message) {
    // 기존 알림 제거
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--card-bg);
        color: var(--text-primary);
        padding: 1rem 2rem;
        border-radius: var(--radius-md);
        border: 1px solid var(--accent);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // 3초 후 제거
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 로드맵 인터랙션
function initializeRoadmap() {
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    
    roadmapItems.forEach((item, index) => {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                        entry.target.setAttribute('data-animated', 'true');

                        // 스킬 태그 순차적 등장
                        const skillTags = entry.target.querySelectorAll('.roadmap-skills span');
                        skillTags.forEach((tag, tagIndex) => {
                            setTimeout(() => {
                                tag.style.opacity = '1';
                                tag.style.transform = 'translateY(0)';
                            }, tagIndex * 100);
                        });
                    }, index * 300);
                }
            });
        }, {
            threshold: 0.3
        });

        // 초기 상태 설정
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.8s ease';

        // 스킬 태그 초기 상태
        const skillTags = item.querySelectorAll('.roadmap-skills span');
        skillTags.forEach(tag => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';
            tag.style.transition = 'all 0.5s ease';
        });

        observer.observe(item);

        // 로드맵 아이템 클릭 시 확장 효과
        item.addEventListener('click', function() {
            const content = this.querySelector('.roadmap-content');
            content.style.transform = 'scale(1.02)';
            content.style.background = 'var(--secondary-bg)';
            
            setTimeout(() => {
                content.style.transform = '';
                content.style.background = '';
            }, 500);
        });
    });
}

// 스킬 타임라인 애니메이션
function initializeSkillsTimeline() {
    const skillMilestones = document.querySelectorAll('.skill-milestone');
    const timelineTrack = document.querySelector('.timeline-track::after');
    
    // 타임라인 진행률 애니메이션
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 타임라인 트랙 진행률 업데이트
                const track = document.querySelector('.timeline-track');
                if (track) {
                    setTimeout(() => {
                        track.style.setProperty('--progress', '100%');
                    }, 500);
                }
            }
        });
    }, {
        threshold: 0.3
    });

    const timelineSection = document.querySelector('.skills-timeline');
    if (timelineSection) {
        observer.observe(timelineSection);
    }

    // 마일스톤 순차적 활성화
    skillMilestones.forEach((milestone, index) => {
        const milestoneObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-activated')) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                        entry.target.setAttribute('data-activated', 'true');

                        // 마일스톤 컨텐츠 애니메이션
                        const content = entry.target.querySelector('.milestone-content');
                        const listItems = content.querySelectorAll('li');
                        
                        listItems.forEach((item, itemIndex) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateX(0)';
                            }, itemIndex * 150);
                        });
                    }, index * 400);
                }
            });
        }, {
            threshold: 0.5
        });

        // 리스트 아이템 초기 상태
        const listItems = milestone.querySelectorAll('li');
        listItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.5s ease';
        });

        milestoneObserver.observe(milestone);

        // 마일스톤 호버 효과
        milestone.addEventListener('mouseenter', function() {
            const marker = this.querySelector('.milestone-marker');
            if (marker) {
                marker.style.transform = 'scale(1.2)';
                marker.style.boxShadow = '0 0 25px rgba(0, 212, 255, 0.6)';
            }
        });

        milestone.addEventListener('mouseleave', function() {
            const marker = this.querySelector('.milestone-marker');
            if (marker) {
                marker.style.transform = '';
                marker.style.boxShadow = '';
            }
        });
    });
}

// 기술 태그 인터랙션
function initializeTechTags() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // 클릭된 태그 하이라이트
            this.style.background = 'var(--accent-light)';
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 212, 255, 0.4)';
            
            setTimeout(() => {
                this.style.background = '';
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 800);

            // 같은 기술 태그 찾아서 하이라이트
            const sameTagText = this.textContent;
            const allTags = document.querySelectorAll('.tech-tag');
            
            allTags.forEach(otherTag => {
                if (otherTag !== this && otherTag.textContent === sameTagText) {
                    otherTag.style.background = 'rgba(0, 212, 255, 0.3)';
                    setTimeout(() => {
                        otherTag.style.background = '';
                    }, 1000);
                }
            });
        });
    });
}

// 프로젝트 필터링 (향후 확장용)
function initializeProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // 모든 버튼 비활성화
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 프로젝트 카드 필터링
            projectCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// 키보드 네비게이션
document.addEventListener('keydown', function(e) {
    // 탭 키로 프로젝트 카드 간 이동시 하이라이트
    if (e.key === 'Tab') {
        setTimeout(() => {
            const focusedCard = document.querySelector('.project-card:focus-within');
            if (focusedCard) {
                focusedCard.style.outline = '2px solid var(--accent)';
                focusedCard.style.outlineOffset = '2px';
            }
        }, 10);
    }
    
    // Enter 키로 프로젝트 링크 활성화
    if (e.key === 'Enter') {
        const focusedLink = document.querySelector('.project-link:focus');
        if (focusedLink) {
            focusedLink.click();
        }
    }
});

// 터치 디바이스 지원
if ('ontouchstart' in window) {
    const cards = document.querySelectorAll('.project-card, .roadmap-item, .skill-milestone');
    
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// 추가 애니메이션 정의
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('#projects-animations')) {
        const style = document.createElement('style');
        style.id = 'projects-animations';
        style.textContent = `
            @keyframes projectIconSpin {
                0% { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(180deg) scale(1.1); }
                100% { transform: rotate(360deg) scale(1); }
            }
            
            @keyframes slideInRight {
                0% { transform: translateX(100%); opacity: 0; }
                100% { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                0% { transform: translateX(0); opacity: 1; }
                100% { transform: translateX(100%); opacity: 0; }
            }
            
            @keyframes milestoneActivate {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
            
            .skill-milestone.active .milestone-marker {
                animation: milestoneActivate 0.6s ease;
            }
            
            .tech-tag {
                transition: all 0.3s ease;
            }
            
            .project-link {
                transition: all 0.3s ease;
            }
            
            .roadmap-content {
                transition: all 0.3s ease;
            }
            
            .milestone-content {
                transition: all 0.3s ease;
            }
            
            .timeline-track::after {
                transition: width 2s ease-out;
            }
        `;
        document.head.appendChild(style);
    }
});

// 스크롤 기반 진행률 업데이트
function updateProgress() {
    const sections = document.querySelectorAll('section');
    const currentSection = Array.from(sections).find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
    });
    
    if (currentSection) {
        const sectionId = currentSection.className;
        // 현재 섹션에 따른 추가 동작 수행
    }
}

// 스크롤 이벤트 최적화
const throttledProgressUpdate = utils.throttle(updateProgress, 100);
window.addEventListener('scroll', throttledProgressUpdate);

// 리사이즈 이벤트 처리
window.addEventListener('resize', utils.debounce(function() {
    // 타임라인 위치 재조정
    const activeTimeline = document.querySelector('.skills-timeline');
    if (activeTimeline && window.innerWidth <= 768) {
        // 모바일에서 타임라인 스타일 조정
        activeTimeline.classList.add('mobile-layout');
    } else if (activeTimeline) {
        activeTimeline.classList.remove('mobile-layout');
    }
}, 250));

// 페이지 언로드 시 리소스 정리
window.addEventListener('beforeunload', function() {
    const timers = document.querySelectorAll('[data-timer]');
    timers.forEach(timer => {
        clearInterval(parseInt(timer.dataset.timer));
    });
});

// 접근성을 위한 미디어 쿼리 감지
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // 애니메이션 축소
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    
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
