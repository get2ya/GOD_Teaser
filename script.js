// 영상 전환 시스템
(function() {
    const firstVideo = document.getElementById('firstVideo');
    const replayVideo = document.getElementById('replayVideo');
    const naverBtn = document.querySelector('.top-naver-btn');

    if (!firstVideo || !replayVideo) return;

    // First 영상 종료 시 Replay 영상으로 전환
    firstVideo.addEventListener('ended', function() {
        // First 영상 숨기기
        firstVideo.classList.remove('active');

        // Replay 영상 표시 및 재생
        replayVideo.classList.add('active');
        replayVideo.play();

        // 네이버 버튼 우아하게 표시
        if (naverBtn) {
            setTimeout(function() {
                naverBtn.classList.add('visible');
            }, 300); // 영상 전환 후 0.3초 뒤에 버튼 표시
        }
    });

    // 페이지 로드 시 First 영상 자동 재생
    window.addEventListener('load', function() {
        firstVideo.play().catch(function(error) {
            console.log('자동 재생 실패:', error);
            // 자동 재생 실패 시 클릭으로 재생
            document.addEventListener('click', function playOnClick() {
                firstVideo.play();
                document.removeEventListener('click', playOnClick);
            }, { once: true });
        });
    });
})();
