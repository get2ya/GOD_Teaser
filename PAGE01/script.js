// 네이버 버튼 우아하게 표시
(function() {
    const naverBtn = document.querySelector('.naver-btn');
    const logoImg = document.querySelector('.logo-animation');

    if (!naverBtn) return;

    // WebP 애니메이션 완료 후 버튼 표시
    // WebP 애니메이션 길이를 알 수 없으므로 일정 시간 후 표시
    // 또는 로고 이미지 로드 완료 후 일정 시간 대기

    function showNaverButton() {
        naverBtn.classList.add('visible');
    }

    if (logoImg) {
        // 이미지 로드 완료 확인
        if (logoImg.complete) {
            // 이미 로드됨 - 애니메이션 시간(약 10초) 후 버튼 표시
            setTimeout(showNaverButton, 10000);
        } else {
            // 로드 대기
            logoImg.addEventListener('load', function() {
                setTimeout(showNaverButton, 10000);
            });
        }
    } else {
        // 로고 없으면 3초 후 표시
        setTimeout(showNaverButton, 3000);
    }
})();
