document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const welcomeScreen = document.getElementById('welcome-screen');
    const questionScreen = document.getElementById('question-screen');
    const resultScreen = document.getElementById('result-screen');
    const startButton = document.getElementById('start-test');
    const questionContainer = document.getElementById('question-container');
    const optionButtons = document.querySelectorAll('.option-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const restartButton = document.getElementById('restart-test');
    const shareButton = document.getElementById('share-result');

    // 状态变量
    let currentQuestionIndex = 0;
    let answers = [];

    // 初始化测试
    function initTest() {
        currentQuestionIndex = 0;
        answers = [];
        showScreen(welcomeScreen);
        updateProgress();
    }

    // 显示指定屏幕
    function showScreen(screen) {
        welcomeScreen.classList.remove('active');
        questionScreen.classList.remove('active');
        resultScreen.classList.remove('active');
        screen.classList.add('active');
    }

    // 更新进度条
    function updateProgress() {
        const progress = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
    }

    // 显示当前问题
    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionContainer.innerHTML = `
            <h3>问题 ${currentQuestionIndex + 1}/${questions.length}</h3>
            <p>${question.text}</p>
        `;
    }

    // 处理答案选择
    function handleAnswer(value) {
        answers.push(value);
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
            updateProgress();
        } else {
            showResult();
        }
    }

    // 计算结果
    function calculateResult() {
        // 计算每个维度的得分
        let scores = {
            IE: 0, // 内向-外向
            SN: 0, // 感觉-直觉
            TF: 0, // 思考-情感
            JP: 0  // 判断-知觉
        };

        questions.forEach((question, index) => {
            const answer = answers[index];
            const dimension = question.dimension;
            scores[dimension] += (answer - 2.5) * 2; // 将1-4分转换为-3到3分
        });

        // 确定每个维度的类型
        const type = {
            IE: scores.IE > 0 ? 'E' : 'I',
            SN: scores.SN > 0 ? 'N' : 'S',
            TF: scores.TF > 0 ? 'F' : 'T',
            JP: scores.JP > 0 ? 'P' : 'J'
        };

        return {
            type: type.IE + type.SN + type.TF + type.JP,
            scores: scores
        };
    }

    // 显示结果
    function showResult() {
        const result = calculateResult();
        const resultType = document.getElementById('result-type');
        const resultDescription = document.getElementById('result-description');
        
        resultType.textContent = result.type;
        resultDescription.textContent = types[result.type].description;

        // 更新维度条
        updateDimensionBar('ie-bar', result.scores.IE);
        updateDimensionBar('sn-bar', result.scores.SN);
        updateDimensionBar('tf-bar', result.scores.TF);
        updateDimensionBar('jp-bar', result.scores.JP);

        showScreen(resultScreen);
    }

    // 更新维度条显示
    function updateDimensionBar(barId, score) {
        const bar = document.getElementById(barId);
        const percentage = (score + 30) / 60 * 100; // 假设分数范围是-30到30
        bar.style.width = `${percentage}%`;
    }

    // 事件监听器
    startButton.addEventListener('click', () => {
        showScreen(questionScreen);
        showQuestion();
    });

    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleAnswer(parseInt(button.dataset.value));
        });
    });

    restartButton.addEventListener('click', initTest);

    shareButton.addEventListener('click', () => {
        const result = document.getElementById('result-type').textContent;
        const shareText = `我的MBTI-64类型是：${result}！来测测你的类型吧：${window.location.href}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'MBTI-64测试结果',
                text: shareText,
                url: window.location.href
            });
        } else {
            // 如果不支持原生分享，复制到剪贴板
            navigator.clipboard.writeText(shareText)
                .then(() => alert('结果已复制到剪贴板！'))
                .catch(() => alert('复制失败，请手动复制。'));
        }
    });

    // 初始化测试
    initTest();
}); 