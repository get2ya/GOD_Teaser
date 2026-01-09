// 영상 제어 및 네이버 버튼
(function() {
    const naverBtn = document.querySelector('.naver-btn');
    const video = document.querySelector('.logo-animation');

    if (!video) return;

    // 영상 끝나면 네이버 버튼 표시
    video.addEventListener('ended', function() {
        if (naverBtn) {
            naverBtn.classList.add('visible');
        }
    });
})();
