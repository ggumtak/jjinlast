/**
 * Contact Page JavaScript
 * Contact 페이지 전용 스크립트
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeContactCards();
    initializeSocialCards();
    initializeContactForm();
    initializeFAQ();
    initializeScrollAnimations();
    initializeFormValidation();
});

// 연락처 카드 애니메이션
function initializeContactCards() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach((card, index) => {
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

        // 카드 클릭 시 연락처 복사 (이메일, 전화번호)
        const contactValue = card.querySelector('.contact-value');
        if (contactValue) {
            contactValue.addEventListener('click', function() {
                const text = this.textContent;
                copyToClipboard(text);
                showNotification(`${text}이(가) 클립보드에 복사되었습니다!`);
                
                // 복사 효과
                this.style.background = 'var(--accent)';
                this.style.color = 'var(--primary-bg)';
                this.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    this.style.background = '';
                    this.style.color = '';
                    this.style.transform = '';
                }, 1000);
            });
            
            // 툴팁 표시
            contactValue.title = '클릭하여 복사';
            contactValue.style.cursor = 'pointer';
        }

        // 연락처 액션 버튼 인터랙션
        const contactAction = card.querySelector('.contact-action');
        if (contactAction) {
            contactAction.addEventListener('click', function(e) {
                if (this.dataset.action === 'location') {
                    e.preventDefault();
                    showLocationModal();
                }
                
                // 클릭 효과
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        }
    });
}

// 소셜 미디어 카드 애니메이션
function initializeSocialCards() {
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach((card, index) => {
        // 순차적 등장 애니메이션
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.setAttribute('data-animated', 'true');
                        
                        // 통계 숫자 카운터 애니메이션
                        animateSocialStats(entry.target);
                    }, index * 150);
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

        // 소셜 카드 클릭 시 알림 (실제 링크가 없으므로)
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.dataset.platform;
            showNotification(`${platform} 계정을 준비 중입니다!`);
        });

        // 카드 호버 시 통계 하이라이트
        card.addEventListener('mouseenter', function() {
            const stats = this.querySelectorAll('.stat');
            stats.forEach((stat, statIndex) => {
                setTimeout(() => {
                    stat.style.transform = 'scale(1.05)';
                    stat.style.background = 'var(--accent)';
                    stat.style.color = 'var(--primary-bg)';
                }, statIndex * 100);
            });
        });

        card.addEventListener('mouseleave', function() {
            const stats = this.querySelectorAll('.stat');
            stats.forEach(stat => {
                stat.style.transform = '';
                stat.style.background = '';
                stat.style.color = '';
            });
        });
    });
}

// 소셜 통계 애니메이션
function animateSocialStats(card) {
    const statNumbers = card.querySelectorAll('.stat-number');
    
    statNumbers.forEach(statNumber => {
        const finalText = statNumber.textContent;
        const isNumeric = /^\d+/.test(finalText);
        
        if (isNumeric) {
            const targetNumber = parseInt(finalText);
            let currentNumber = 0;
            const increment = targetNumber / 20; // 20프레임으로 나누어 애니메이션
            
            const animation = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= targetNumber) {
                    statNumber.textContent = finalText; // 원래 텍스트로 복원 (+ 기호 등 포함)
                    clearInterval(animation);
                } else {
                    statNumber.textContent = Math.floor(currentNumber);
                }
            }, 80);
        }
    });
}

// 연락처 폼 초기화
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const formGroups = form.querySelectorAll('.form-group');
    
    // 실시간 폼 검증
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        if (input) {
            input.addEventListener('input', function() {
                validateField(this);
            });
            
            input.addEventListener('blur', function() {
                validateField(this);
            });
        }
    });
    
    // 폼 제출 처리
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // 체크박스 커스텀 애니메이션
    const checkbox = form.querySelector('#privacy');
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            const checkmark = this.nextElementSibling;
            if (this.checked) {
                checkmark.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    checkmark.style.transform = '';
                }, 200);
            }
        });
    }
}

// 개별 필드 검증
function validateField(field) {
    const group = field.closest('.form-group');
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // 기존 에러 메시지 제거
    const existingError = group.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // 필수 필드 검증
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = '이 필드는 필수입니다.';
    }
    
    // 이메일 형식 검증
    if (fieldName === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = '올바른 이메일 형식을 입력해주세요.';
        }
    }
    
    // 이름 길이 검증
    if (fieldName === 'name' && field.value.trim() && field.value.trim().length < 2) {
        isValid = false;
        errorMessage = '이름은 2글자 이상 입력해주세요.';
    }
    
    // 메시지 길이 검증
    if (fieldName === 'message' && field.value.trim() && field.value.trim().length < 10) {
        isValid = false;
        errorMessage = '메시지는 10글자 이상 입력해주세요.';
    }
    
    // 검증 결과에 따른 스타일 적용
    if (isValid) {
        field.style.borderColor = 'var(--accent)';
        group.classList.remove('error');
        group.classList.add('valid');
    } else {
        field.style.borderColor = '#f44336';
        group.classList.remove('valid');
        group.classList.add('error');
        
        // 에러 메시지 표시
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.cssText = `
            color: #f44336;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            animation: fadeIn 0.3s ease;
        `;
        group.appendChild(errorDiv);
    }
    
    return isValid;
}

// 전체 폼 검증
function validateForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isFormValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });
    
    // 개인정보 동의 확인
    const privacyCheckbox = form.querySelector('#privacy');
    if (!privacyCheckbox.checked) {
        showNotification('개인정보 수집 및 이용에 동의해주세요.', 'error');
        isFormValid = false;
    }
    
    return isFormValid;
}

// 폼 제출 처리
function submitForm() {
    const submitBtn = document.querySelector('.submit-btn');
    const form = document.getElementById('contactForm');
    
    // 로딩 상태 표시
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // 가짜 제출 프로세스 (실제로는 서버로 전송)
    setTimeout(() => {
        // 성공 메시지 표시
        showNotification('메시지가 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.', 'success');
        
        // 폼 초기화
        form.reset();
        
        // 로딩 상태 해제
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // 검증 스타일 초기화
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('valid', 'error');
            const input = group.querySelector('input, select, textarea');
            if (input) {
                input.style.borderColor = '';
            }
        });
        
    }, 2000); // 2초 대기 (실제 전송 시뮬레이션)
}

// FAQ 토글 기능
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // 순차적 등장 애니메이션
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.setAttribute('data-animated', 'true');
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.3
        });

        // 초기 상태 설정
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
        
        observer.observe(item);
        
        // 클릭 이벤트
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // 모든 FAQ 아이템 닫기
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                otherAnswer.style.maxHeight = '0';
            });
            
            // 클릭된 아이템 토글
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
        
        // 키보드 접근성
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // 포커스 가능하도록 설정
        question.tabIndex = 0;
    });
}

// 스크롤 애니메이션 초기화
function initializeScrollAnimations() {
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

// 폼 검증 초기화
function initializeFormValidation() {
    // 에러 메시지 애니메이션 정의
    if (!document.querySelector('#form-validation-styles')) {
        const style = document.createElement('style');
        style.id = 'form-validation-styles';
        style.textContent = `
            @keyframes fadeIn {
                0% { opacity: 0; transform: translateY(-10px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            
            .form-group.valid input,
            .form-group.valid select,
            .form-group.valid textarea {
                border-color: var(--accent) !important;
                box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.1);
            }
            
            .form-group.error input,
            .form-group.error select,
            .form-group.error textarea {
                border-color: #f44336 !important;
                box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.1);
            }
            
            .error-message {
                animation: fadeIn 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
}

// 유틸리티 함수들
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // 구형 브라우저 지원
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

function showNotification(message, type = 'info') {
    // 기존 알림 제거
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const colors = {
        info: 'var(--accent)',
        success: '#4caf50',
        error: '#f44336'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--card-bg);
        color: var(--text-primary);
        padding: 1rem 2rem;
        border-radius: var(--radius-md);
        border: 2px solid ${colors[type]};
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // 자동 제거
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

function showLocationModal() {
    // 위치 정보 모달 표시 (간단한 예시)
    const modal = document.createElement('div');
    modal.className = 'location-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>위치 정보</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>주소:</strong> 경기도 성남시 xxxx</p>
                <p><strong>참고사항:</strong> 대학교 근처에서 만나는 것을 선호합니다.</p>
                <p><strong>교통편:</strong> 지하철 또는 버스 이용 가능</p>
                <br>
                <p><em>정확한 만남 장소는 사전 연락을 통해 조율하겠습니다.</em></p>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    // 모달 스타일 정의
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--card-bg);
                border-radius: var(--radius-lg);
                border: 1px solid var(--border);
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid var(--border);
            }
            
            .modal-header h3 {
                color: var(--text-primary);
                font-size: 1.3rem;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 50%;
                transition: all var(--transition-normal);
            }
            
            .modal-close:hover {
                background: var(--secondary-bg);
                color: var(--text-primary);
            }
            
            .modal-body {
                padding: 1.5rem;
                color: var(--text-secondary);
                line-height: 1.6;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    
    // 모달 닫기 이벤트
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    [closeBtn, overlay].forEach(element => {
        element.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
    });
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeBtn.click();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// 키보드 네비게이션
document.addEventListener('keydown', function(e) {
    // Tab 키로 포커스 이동시 시각적 피드백
    if (e.key === 'Tab') {
        setTimeout(() => {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('contact-action') || 
                focusedElement.classList.contains('social-card')) {
                focusedElement.style.outline = '2px solid var(--accent)';
                focusedElement.style.outlineOffset = '2px';
            }
        }, 10);
    }
});

// 터치 디바이스 지원
if ('ontouchstart' in window) {
    const cards = document.querySelectorAll('.contact-card, .social-card, .faq-item');
    
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
    if (!document.querySelector('#contact-animations')) {
        const style = document.createElement('style');
        style.id = 'contact-animations';
        style.textContent = `
            @keyframes slideInRight {
                0% { transform: translateX(100%); opacity: 0; }
                100% { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                0% { transform: translateX(0); opacity: 1; }
                100% { transform: translateX(100%); opacity: 0; }
            }
            
            @keyframes fadeOut {
                0% { opacity: 1; }
                100% { opacity: 0; }
            }
            
            .contact-value {
                transition: all 0.3s ease;
            }
            
            .social-stats .stat {
                transition: all 0.3s ease;
            }
            
            .faq-question {
                transition: all 0.3s ease;
            }
            
            .submit-btn {
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
});

// 리사이즈 이벤트 처리
window.addEventListener('resize', utils.debounce(function() {
    // 모바일 레이아웃 조정
    const formContainer = document.querySelector('.form-container');
    if (formContainer && window.innerWidth <= 768) {
        formContainer.style.gridTemplateColumns = '1fr';
    } else if (formContainer) {
        formContainer.style.gridTemplateColumns = '2fr 1fr';
    }
}, 250));

// 페이지 언로드 시 리소스 정리
window.addEventListener('beforeunload', function() {
    const timers = document.querySelectorAll('[data-timer]');
    timers.forEach(timer => {
        clearInterval(parseInt(timer.dataset.timer));
    });
});
