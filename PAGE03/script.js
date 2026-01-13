// 영상 제어 및 네이버 버튼 (Double Video Element Strategy)
(function() {
    const naverBtn = document.querySelector('.naver-btn');
    const mainVideo = document.getElementById('main-video');
    const loopVideo = document.getElementById('loop-video');
    const bgGroup = document.querySelector('.background-group');

    if (!mainVideo || !loopVideo) return;

    // Video A (인트로/Main) 재생 시작
    function startVideo() {
        // 배경 페이드인
        if (bgGroup) {
            bgGroup.classList.add('visible');
        }

        mainVideo.classList.add('visible');
        mainVideo.play().catch(function() {});
    }

    // Video A 종료 시 → Video B로 즉시 교체 (Event Driven Switch)
    mainVideo.addEventListener('ended', function() {
        // 1. Video A 숨김
        mainVideo.classList.add('fade-out');

        // 2. Video B 보여주기 + 재생 시작
        loopVideo.classList.add('visible');
        loopVideo.play().catch(function() {});

        // 3. 네이버 버튼 표시
        if (naverBtn) {
            naverBtn.classList.add('visible');
        }
    });

    // 두 영상 모두 로드 대기 후 시작
    let mainReady = mainVideo.readyState >= 3;
    let loopReady = loopVideo.readyState >= 3;

    function checkAndStart() {
        if (mainReady && loopReady) {
            startVideo();
        }
    }

    if (mainReady && loopReady) {
        startVideo();
    } else {
        mainVideo.addEventListener('canplaythrough', function() {
            mainReady = true;
            checkAndStart();
        }, { once: true });

        loopVideo.addEventListener('canplaythrough', function() {
            loopReady = true;
            checkAndStart();
        }, { once: true });
    }
})();
