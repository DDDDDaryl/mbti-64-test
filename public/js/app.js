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
            if (index < answers.length) {  // 确保只处理已回答的问题
                const answer = answers[index];
                const dimension = question.dimension;
                if (question.direction === dimension[0]) {
                    // 如果问题方向与维度的第一个字母相同（如E、S、T、J）
                    scores[dimension] += (answer - 2.5) * 2;
                } else {
                    // 如果问题方向与维度的第二个字母相同（如I、N、F、P）
                    scores[dimension] -= (answer - 2.5) * 2;
                }
            }
        });

        // 确定每个维度的类型
        const type = {
            IE: scores.IE > 0 ? 'E' : 'I',
            SN: scores.SN > 0 ? 'N' : 'S',
            TF: scores.TF > 0 ? 'F' : 'T',
            JP: scores.JP > 0 ? 'P' : 'J'
        };

        // 生成基础类型
        const baseType = type.IE + type.SN + type.TF + type.JP;
        
        // 根据分数强度确定子类型
        const subTypes = {
            'A': '自信型',
            'T': '谨慎型',
            'Sc': '系统型',
            'Lo': '逻辑型'
        };
        
        // 选择子类型（这里简单地根据分数绝对值选择）
        const maxScore = Math.max(
            Math.abs(scores.IE),
            Math.abs(scores.SN),
            Math.abs(scores.TF),
            Math.abs(scores.JP)
        );
        
        let subType;
        if (maxScore > 20) subType = 'A';
        else if (maxScore > 15) subType = 'T';
        else if (maxScore > 10) subType = 'Sc';
        else subType = 'Lo';

        const fullType = baseType + '-' + subType;

        return {
            type: fullType,
            scores: scores
        };
    }

    // 显示结果
    function showResult() {
        const result = calculateResult();
        
        // 先切换到结果页面
        showScreen(resultScreen);
        
        // 然后更新结果内容
        const resultType = document.getElementById('result-type');
        const resultDescription = document.getElementById('result-description');
        
        // 设置类型和描述
        resultType.textContent = result.type;
        resultDescription.textContent = types[result.type]?.description || '这是一个独特的性格组合！';

        // 更新维度条 - 使用固定的最大值来计算百分比
        const maxScore = 30; // 最大可能分数
        const updateBar = (barId, score) => {
            const bar = document.getElementById(barId);
            // 将分数映射到0-100的范围
            const percentage = ((score + maxScore) / (2 * maxScore)) * 100;
            bar.style.width = `${Math.min(Math.max(percentage, 0), 100)}%`;
        };

        updateBar('ie-bar', result.scores.IE);
        updateBar('sn-bar', result.scores.SN);
        updateBar('tf-bar', result.scores.TF);
        updateBar('jp-bar', result.scores.JP);
    }

    // 处理答案选择
    function handleAnswer(value) {
        answers.push(parseInt(value));
        currentQuestionIndex++;
        
        if (currentQuestionIndex >= questions.length) {
            // 更新进度到100%
            progressBar.style.width = '100%';
            progressText.textContent = '100%';
            // 确保异步执行结果显示
            setTimeout(showResult, 100);
        } else {
            showQuestion();
            updateProgress();
        }
    }

    // 事件监听器
    startButton.addEventListener('click', () => {
        showScreen(questionScreen);
        showQuestion();
    });

    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleAnswer(button.dataset.value);
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