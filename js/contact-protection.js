class ContactProtection {
    constructor() {
        this.correctPassword = 'doowon';
        this.isUnlocked = false;
        this.init();
    }

    init() {
        this.createModal();
        this.protectPhoneNumbers();
    }

    createModal() {
        const modalHTML = `
            <div id="passwordModal" class="password-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>🔒 보호된 연락처</h3>
                        <p>연락처 정보를 보시려면 비밀번호를 입력해주세요</p>
                    </div>
                    <div class="modal-body">
                        <input type="password" id="passwordInput" class="password-input" 
                               placeholder="비밀번호를 입력하세요..." maxlength="20">
                        <div class="error-message" id="errorMessage">
                            ❌ 비밀번호가 올바르지 않습니다
                        </div>
                        <div class="modal-buttons">
                            <button class="modal-btn cancel-btn" onclick="contactProtection.closeModal()">취소</button>
                            <button class="modal-btn confirm-btn" onclick="contactProtection.checkPassword()">확인</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Enter 키 이벤트
        document.getElementById('passwordInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkPassword();
        });
    }

    protectPhoneNumbers() {
        // 전화번호 패턴 찾기 (010-1234-5678, 02-123-4567 등)
        const phonePattern = /(\d{2,3}-?\d{3,4}-?\d{4})/g;
        const textNodes = this.getTextNodes(document.body);

        textNodes.forEach(node => {
            if (phonePattern.test(node.textContent)) {
                const parent = node.parentNode;
                const content = node.textContent;
                
                const wrapper = document.createElement('span');
                wrapper.className = 'protected-content';
                wrapper.innerHTML = `
                    <span class="protected-blur">${content}</span>
                    <button class="unlock-button" onclick="contactProtection.showModal()">🔓 보기</button>
                `;
                
                parent.replaceChild(wrapper, node);
            }
        });
    }

    getTextNodes(element) {
        const textNodes = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.trim()) {
                textNodes.push(node);
            }
        }
        return textNodes;
    }

    showModal() {
        if (this.isUnlocked) {
            this.unlockContent();
            return;
        }
        
        document.getElementById('passwordModal').style.display = 'block';
        document.getElementById('passwordInput').focus();
        document.getElementById('errorMessage').style.display = 'none';
    }

    closeModal() {
        document.getElementById('passwordModal').style.display = 'none';
        document.getElementById('passwordInput').value = '';
        document.getElementById('errorMessage').style.display = 'none';
    }

    checkPassword() {
        const inputPassword = document.getElementById('passwordInput').value;
        
        if (inputPassword === this.correctPassword) {
            this.isUnlocked = true;
            this.unlockContent();
            this.closeModal();
        } else {
            document.getElementById('errorMessage').style.display = 'block';
            document.getElementById('passwordInput').value = '';
            document.getElementById('passwordInput').focus();
        }
    }

    unlockContent() {
        const protectedElements = document.querySelectorAll('.protected-blur');
        const unlockButtons = document.querySelectorAll('.unlock-button');
        
        protectedElements.forEach(el => {
            el.classList.remove('protected-blur');
            el.style.filter = 'none';
        });
        
        unlockButtons.forEach(btn => {
            btn.textContent = '✅ 해제됨';
            btn.disabled = true;
            btn.style.opacity = '0.6';
        });
    }
}

// 페이지 로드 시 초기화
window.addEventListener('load', () => {
    window.contactProtection = new ContactProtection();
});
