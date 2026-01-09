// 영상 제어 및 네이버 버튼
(function() {
    const naverBtn = document.querySelector('.naver-btn');
    const video = document.querySelector('.logo-animation');

    if (!video) return;

    // 영상 끝나면 마지막 2초 구간 반복 재생
    video.addEventListener('loadedmetadata', function() {
        const duration = video.duration;
        const loopStart = Math.max(0, duration - 2); // 마지막 2초 시작점

        video.addEventListener('timeupdate', function() {
            // 영상이 끝나면 loopStart로 돌아가서 반복
            if (video.currentTime >= duration - 0.1) {
                video.currentTime = loopStart;
            }
        });
    });

    // 네이버 버튼 표시
    if (naverBtn) {
        video.addEventListener('ended', function() {
            naverBtn.classList.add('visible');
        });

        // ended 이벤트가 발생 안 할 수 있으므로 시간 기반으로도 체크
        video.addEventListener('loadedmetadata', function() {
            const duration = video.duration;
            setTimeout(function() {
                naverBtn.classList.add('visible');
            }, (duration - 2) * 1000); // 루프 시작 전에 버튼 표시
        });
    }
})();
