// 영상 제어 및 랙포커스 연출
(function() {
    const naverBtn = document.querySelector('.naver-btn');
    const mainVideo = document.getElementById('main-video');
    const loopVideo = document.getElementById('loop-video');
    const bgGroup = document.querySelector('.background-group');

    if (!mainVideo) return;

    let loopStarted = false;

    function startSequence() {
        // Phase 1: 페이드인 + background/big_2 포커스
        bgGroup.classList.add('visible', 'phase1');

        // Phase 2: big_change 포커스 (1.5초 후)
        setTimeout(function() {
            bgGroup.classList.remove('phase1');
            bgGroup.classList.add('phase2');
        }, 1500);

        // 영상 재생 (3초 후) + Phase 3: 전체 블러
        setTimeout(function() {
            bgGroup.classList.remove('phase2');
            bgGroup.classList.add('phase3');

            mainVideo.classList.add('visible');
            mainVideo.play().catch(function() {});
        }, 3000);
    }

    // requestAnimationFrame으로 프레임 단위 감시
    function checkVideoTime() {
        if (!mainVideo.duration) {
            requestAnimationFrame(checkVideoTime);
            return;
        }

        const timeLeft = mainVideo.duration - mainVideo.currentTime;

        // 1. 영상 종료 0.4초 전: 뒤에 있는 루프 영상 미리 재생
        if (timeLeft <= 0.4 && !loopStarted) {
            loopVideo.classList.add('visible');
            loopVideo.play();
            loopStarted = true;
        }

        // 2. 영상 종료 0.15초 전: 앞의 메인 영상 투명화 (ended 전에 미리!)
        if (timeLeft <= 0.15) {
            mainVideo.classList.add('fade-out');

            if (naverBtn) {
                naverBtn.classList.add('visible');
            }
            return;
        }

        requestAnimationFrame(checkVideoTime);
    }

    // 영상 재생 시작과 함께 감시 시작
    mainVideo.addEventListener('play', function() {
        requestAnimationFrame(checkVideoTime);
    });

    // 안전장치: 혹시라도 감시가 실패했을 때를 대비
    mainVideo.addEventListener('ended', function() {
        if (!loopStarted) {
            loopVideo.classList.add('visible');
            loopVideo.play();
        }
        mainVideo.classList.add('fade-out');
        if (naverBtn) {
            naverBtn.classList.add('visible');
        }
    });

    // 영상 프리로드 완료 후 시퀀스 시작
    if (mainVideo.readyState >= 3) {
        startSequence();
    } else {
        mainVideo.addEventListener('canplaythrough', startSequence, { once: true });
    }
})();
