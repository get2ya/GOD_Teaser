// 영상 제어 및 네이버 버튼
(function() {
    const naverBtn = document.querySelector('.naver-btn');
    const mainVideo = document.getElementById('main-video');
    const loopVideo = document.getElementById('loop-video');
    const bgGroup = document.querySelector('.background-group');

    if (!mainVideo) return;

    function startVideo() {
        // 배경 페이드인
        if (bgGroup) {
            bgGroup.classList.add('visible');
        }

        mainVideo.play().then(function() {
            mainVideo.classList.add('playing');
        }).catch(function(e) {
            mainVideo.classList.add('playing');
        });
    }

    // 메인 영상 끝나기 직전에 루프 영상 시작 (끊김 방지)
    mainVideo.addEventListener('timeupdate', function() {
        // 영상 끝나기 0.1초 전에 루프 영상 시작
        if (mainVideo.duration - mainVideo.currentTime < 0.1 && !loopVideo.classList.contains('playing')) {
            loopVideo.play().then(function() {
                loopVideo.classList.add('playing');
                // 메인 영상 숨기기
                mainVideo.classList.remove('playing');
            }).catch(function(e) {
                loopVideo.classList.add('playing');
                mainVideo.classList.remove('playing');
            });
        }
    });

    // 메인 영상 끝나면 네이버 버튼 표시
    mainVideo.addEventListener('ended', function() {
        if (naverBtn) {
            naverBtn.classList.add('visible');
        }
        // 메인 영상 완전히 숨기기
        mainVideo.style.display = 'none';
    });

    // 이미 로드됐으면 바로 재생
    if (mainVideo.readyState >= 3) {
        startVideo();
    } else {
        mainVideo.addEventListener('canplaythrough', startVideo, { once: true });
    }
})();
