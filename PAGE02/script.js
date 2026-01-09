// 영상 제어 및 랙포커스 연출
(function() {
    const naverBtn = document.querySelector('.naver-btn');
    const mainVideo = document.getElementById('main-video');
    const loopVideo = document.getElementById('loop-video');
    const bgGroup = document.querySelector('.background-group');

    if (!mainVideo) return;

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

            mainVideo.play().then(function() {
                mainVideo.classList.add('playing');
            }).catch(function(e) {
                mainVideo.classList.add('playing');
            });
        }, 3000);
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

    // 영상 프리로드 완료 후 시퀀스 시작
    if (mainVideo.readyState >= 3) {
        startSequence();
    } else {
        mainVideo.addEventListener('canplaythrough', startSequence, { once: true });
    }
})();
