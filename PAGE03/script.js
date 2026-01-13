// 영상 제어 및 네이버 버튼 (Seamless Video Switch Strategy)
(function() {
    const naverBtn = document.querySelector('.naver-btn');
    const mainVideo = document.getElementById('main-video');
    const loopVideo = document.getElementById('loop-video');
    const bgGroup = document.querySelector('.background-group');

    if (!mainVideo || !loopVideo) return;

    // 전환 플래그 (중복 실행 방지)
    let switched = false;

    // Pre-Switch 타이밍 (종료 몇 초 전에 전환할지)
    const PRE_SWITCH_TIME = 0.05;

    // Video A (인트로/Main) 재생 시작
    function startVideo() {
        // 배경 페이드인
        if (bgGroup) {
            bgGroup.classList.add('visible');
        }

        mainVideo.classList.add('visible');
        mainVideo.play().catch(function() {});

        // loop-video는 로드된 상태로 대기 (pause 상태, currentTime = 0)
        loopVideo.currentTime = 0;
        loopVideo.pause();
    }

    // Pre-Switch: 종료 직전에 미리 전환 (timeupdate 방식)
    mainVideo.addEventListener('timeupdate', function() {
        if (switched) return;
        if (!mainVideo.duration) return;

        const remaining = mainVideo.duration - mainVideo.currentTime;

        // 종료 0.05초 전에 전환 실행
        if (remaining <= PRE_SWITCH_TIME) {
            switched = true;

            // 1. loop-video 시작점 동기화 + 재생
            loopVideo.currentTime = 0;
            loopVideo.play().catch(function() {});

            // 2. loop-video 즉시 보이기 (Hard Cut)
            loopVideo.classList.add('visible');

            // 3. main-video 즉시 숨김 (Hard Cut, fade 없음)
            mainVideo.style.visibility = 'hidden';

            // 4. 네이버 버튼 표시
            if (naverBtn) {
                naverBtn.classList.add('visible');
            }
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
