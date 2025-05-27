function updateClock() {
    const now = new Date();
    
    // 날짜 포맷팅
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateStr = `${year}.${month}.${day}`;
    
    // 시간 포맷팅
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}:${seconds}`;
    
    // DOM 업데이트
    document.getElementById('clock-date').textContent = dateStr;
    document.getElementById('clock-time').textContent = timeStr;
}

// 페이지 로드 시 시계 시작
window.addEventListener('load', function() {
    updateClock();
    setInterval(updateClock, 1000);
});
