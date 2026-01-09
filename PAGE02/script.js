// 영상 제어 및 랙포커스 연출
(function() {
    const naverBtn = document.querySelector('.naver-btn');
    const video = document.querySelector('.logo-animation');
    const bgGroup = document.querySelector('.background-group');

    if (!video) return;

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

            video.play().then(function() {
                video.classList.add('playing');
            }).catch(function(e) {
                console.log('Video play error:', e);
                video.classList.add('playing');
            });
        }, 3000);
    }

    // 영상 프리로드 완료 후 시퀀스 시작
    if (video.readyState >= 3) {
        startSequence();
    } else {
        video.addEventListener('canplaythrough', startSequence, { once: true });
    }

    // 영상 끝나면 네이버 버튼 표시
    video.addEventListener('ended', function() {
        if (naverBtn) {
            naverBtn.classList.add('visible');
        }
    });
})();
