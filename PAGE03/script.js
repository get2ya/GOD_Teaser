// 영상 제어 및 네이버 버튼
(function() {
    const naverBtn = document.querySelector('.naver-btn');
    const video = document.querySelector('.logo-animation');

    if (!video) return;

    let loopStart = 0;
    let isLooping = false;

    // 메타데이터 로드 시 루프 시작점 계산
    video.addEventListener('loadedmetadata', function() {
        const duration = video.duration;
        loopStart = Math.max(0, duration - 2); // 마지막 2초 시작점
        console.log('Video duration:', duration, 'Loop start:', loopStart);
    });

    // 영상 끝나면 마지막 2초로 이동 후 반복
    video.addEventListener('ended', function() {
        isLooping = true;
        video.currentTime = loopStart;
        video.play();

        // 네이버 버튼 표시
        if (naverBtn) {
            naverBtn.classList.add('visible');
        }
    });

    // 루프 중일 때 마지막 2초만 반복
    video.addEventListener('timeupdate', function() {
        if (isLooping && video.currentTime >= video.duration - 0.05) {
            video.currentTime = loopStart;
        }
    });
})();
