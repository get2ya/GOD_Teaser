// 영상 제어 및 네이버 버튼
(function() {
    const naverBtn = document.querySelector('.naver-btn');
    const video = document.querySelector('.logo-animation');

    if (!video) return;

    const loopDuration = 2; // 반복할 마지막 구간 (초)
    let isLooping = false;

    // 영상 끝나면 마지막 2초로 이동 후 반복
    video.addEventListener('ended', function() {
        isLooping = true;
        const loopStart = Math.max(0, video.duration - loopDuration);
        video.currentTime = loopStart;
        video.play();

        // 네이버 버튼 표시
        if (naverBtn) {
            naverBtn.classList.add('visible');
        }

        console.log('Loop started. Duration:', video.duration, 'Loop from:', loopStart);
    });

    // 루프 중일 때 마지막 2초만 반복
    video.addEventListener('timeupdate', function() {
        if (isLooping && video.currentTime >= video.duration - 0.1) {
            const loopStart = Math.max(0, video.duration - loopDuration);
            video.currentTime = loopStart;
            video.play();
        }
    });
})();
