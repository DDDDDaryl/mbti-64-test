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
    const prevButton = document.getElementById('prev-question');
    const nextButton = document.getElementById('next-question');
    const answerGrid = document.querySelector('.answer-grid');

    // 状态变量
    let currentQuestionIndex = 0;
    let answers = new Array(questions.length).fill(null);

    // 初始化答题格子
    function initAnswerGrid() {
        answerGrid.innerHTML = '';
        for (let i = 0; i < questions.length; i++) {
            const cell = document.createElement('div');
            cell.className = 'answer-cell';
            cell.textContent = i + 1;
            cell.addEventListener('click', () => {
                if (answers[i] !== null) {
                    goToQuestion(i);
                }
            });
            answerGrid.appendChild(cell);
        }
        updateAnswerGrid();
    }

    // 更新答题格子状态
    function updateAnswerGrid() {
        const cells = answerGrid.children;
        for (let i = 0; i < cells.length; i++) {
            cells[i].classList.remove('answered', 'current');
            if (answers[i] !== null) {
                cells[i].classList.add('answered');
            }
            if (i === currentQuestionIndex) {
                cells[i].classList.add('current');
            }
        }
    }

    // 初始化测试
    function initTest() {
        currentQuestionIndex = 0;
        answers = new Array(questions.length).fill(null);
        showScreen(welcomeScreen);
        updateProgress();
        initAnswerGrid();
        updateNavigationButtons();
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
        const answeredCount = answers.filter(a => a !== null).length;
        const progress = (answeredCount / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
    }

    // 更新导航按钮状态
    function updateNavigationButtons() {
        prevButton.disabled = currentQuestionIndex === 0;
        
        if (currentQuestionIndex === questions.length - 1) {
            nextButton.textContent = '完成测试';
            // 在最后一题，只有所有题目都回答了才能完成测试
            nextButton.disabled = answers.includes(null);
        } else {
            nextButton.textContent = '下一题';
            // 只有当前题目已答才能进入下一题
            nextButton.disabled = answers[currentQuestionIndex] === null;
        }
    }

    // 显示当前问题
    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionContainer.innerHTML = `
            <h3>问题 ${currentQuestionIndex + 1}/${questions.length}</h3>
            <p>${question.text}</p>
        `;
        
        // 重置所有选项按钮的状态
        optionButtons.forEach(button => {
            button.classList.remove('selected');
            if (answers[currentQuestionIndex] === parseInt(button.dataset.value)) {
                button.classList.add('selected');
            }
        });

        updateAnswerGrid();
        updateNavigationButtons();
    }

    // 跳转到指定问题
    function goToQuestion(index) {
        currentQuestionIndex = index;
        showQuestion();
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

        // 记录每个维度的问题数量
        let counts = {
            IE: 0,
            SN: 0,
            TF: 0,
            JP: 0
        };

        questions.forEach((question, index) => {
            if (answers[index] !== null) {
                const dimension = question.dimension;
                const answer = answers[index];
                const score = answer - 2.5; // 将1-4转换为-1.5到1.5

                if (question.direction === dimension[0]) {
                    scores[dimension] += score;
                } else {
                    scores[dimension] -= score;
                }
                counts[dimension]++;
            }
        });

        // 计算每个维度的平均分并标准化
        Object.keys(scores).forEach(dim => {
            if (counts[dim] > 0) {
                scores[dim] = (scores[dim] / counts[dim]) * 20; // 标准化到-20到20的范围
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
        
        // 根据最显著的偏好确定子类型
        const preferences = [
            { dimension: 'IE', score: Math.abs(scores.IE) },
            { dimension: 'SN', score: Math.abs(scores.SN) },
            { dimension: 'TF', score: Math.abs(scores.TF) },
            { dimension: 'JP', score: Math.abs(scores.JP) }
        ].sort((a, b) => b.score - a.score);

        // 根据最强的偏好选择子类型
        let subType;
        const strongestScore = preferences[0].score;
        if (strongestScore > 15) {
            subType = 'A'; // 强烈偏好
        } else if (strongestScore > 10) {
            subType = 'T'; // 明显偏好
        } else if (strongestScore > 5) {
            subType = 'Sc'; // 中等偏好
        } else {
            subType = 'Lo'; // 轻微偏好
        }

        return {
            type: baseType + '-' + subType,
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

        // 更新维度条
        const updateBar = (barId, score) => {
            const bar = document.getElementById(barId);
            // 将分数转换为缩放比例（-1到1）
            const scale = Math.min(Math.max(Math.abs(score) / 20, 0), 1);
            
            // 移除之前的方向类
            bar.classList.remove('left', 'right');
            
            if (score < 0) {
                // 负分，向左扩展（I/S/T/J）
                bar.classList.add('left');
                bar.style.transform = `scaleX(${scale})`;
            } else {
                // 正分，向右扩展（E/N/F/P）
                bar.classList.add('right');
                bar.style.transform = `scaleX(${scale})`;
            }
        };

        updateBar('ie-bar', result.scores.IE);
        updateBar('sn-bar', result.scores.SN);
        updateBar('tf-bar', result.scores.TF);
        updateBar('jp-bar', result.scores.JP);
    }

    // 处理答案选择
    function handleAnswer(value) {
        answers[currentQuestionIndex] = parseInt(value);
        updateProgress();
        updateAnswerGrid();
        updateNavigationButtons();
    }

    // 事件监听器
    startButton.addEventListener('click', () => {
        showScreen(questionScreen);
        showQuestion();
        initAnswerGrid();
    });

    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            optionButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            handleAnswer(button.dataset.value);
        });
    });

    prevButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentQuestionIndex === questions.length - 1) {
            // 如果是最后一题且所有题目都已回答，显示结果
            if (!answers.includes(null)) {
                progressBar.style.width = '100%';
                progressText.textContent = '100%';
                setTimeout(showResult, 100);
            }
        } else if (answers[currentQuestionIndex] !== null) {
            // 如果当前题目已答，前进到下一题
            currentQuestionIndex++;
            showQuestion();
        }
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