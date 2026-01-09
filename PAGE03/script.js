// 영상 제어 및 네이버 버튼
(function() {
    const naverBtn = document.querySelector('.naver-btn');
    const video = document.querySelector('.logo-animation');

    if (!video) return;

    // 영상이 재생 가능할 때까지 대기 후 재생
    video.addEventListener('canplaythrough', function() {
        video.play();
    }, { once: true });

    // 재생 시작하면 영상 표시
    video.addEventListener('playing', function() {
        video.classList.add('playing');
    }, { once: true });

    // 영상 끝나면 네이버 버튼 표시
    video.addEventListener('ended', function() {
        if (naverBtn) {
            naverBtn.classList.add('visible');
        }
    });
})();
