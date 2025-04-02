class MBTI64Test {
    constructor() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.scores = {
            EI: 0, // 正值表示E，负值表示I
            SN: 0, // 正值表示S，负值表示N
            TF: 0, // 正值表示T，负值表示F
            JP: 0  // 正值表示J，负值表示P
        };
        this.subtypeScores = {
            assertive: 0,    // 正值表示A型，负值表示T型
            variant: 0       // 正值表示第一变体，负值表示第二变体
        };

        this.initializeElements();
        this.setupEventListeners();
        this.shuffleQuestions();
    }

    initializeElements() {
        this.welcomeScreen = document.getElementById('welcome-screen');
        this.questionScreen = document.getElementById('question-screen');
        this.resultScreen = document.getElementById('result-screen');
        this.questionContainer = document.getElementById('question-container');
        this.progressBar = document.getElementById('progress-bar');
        this.progressText = document.getElementById('progress-text');
        this.resultType = document.getElementById('result-type');
        this.resultDescription = document.getElementById('result-description');
    }

    setupEventListeners() {
        document.getElementById('start-test').addEventListener('click', () => this.startTest());
        document.getElementById('restart-test').addEventListener('click', () => this.restartTest());
        document.getElementById('share-result').addEventListener('click', () => this.shareResult());

        const optionButtons = document.querySelectorAll('.option-btn');
        optionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const value = parseInt(button.dataset.value);
                this.submitAnswer(value);
            });
        });
    }

    shuffleQuestions() {
        // Fisher-Yates 洗牌算法
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
    }

    startTest() {
        this.welcomeScreen.classList.remove('active');
        this.questionScreen.classList.add('active');
        this.showQuestion();
    }

    showQuestion() {
        const question = questions[this.currentQuestionIndex];
        this.questionContainer.textContent = `${this.currentQuestionIndex + 1}. ${question.text}`;
        this.updateProgress();
    }

    submitAnswer(value) {
        const question = questions[this.currentQuestionIndex];
        const score = this.calculateScore(value, question.direction);
        
        // 更新维度分数
        if (question.dimension === 'EI') this.scores.EI += score;
        else if (question.dimension === 'SN') this.scores.SN += score;
        else if (question.dimension === 'TF') this.scores.TF += score;
        else if (question.dimension === 'JP') this.scores.JP += score;

        // 记录答案
        this.answers.push({
            questionIndex: this.currentQuestionIndex,
            value: value,
            dimension: question.dimension,
            direction: question.direction
        });

        this.currentQuestionIndex++;

        if (this.currentQuestionIndex < questions.length) {
            this.showQuestion();
        } else {
            this.showResult();
        }
    }

    calculateScore(value, direction) {
        // 将1-4的选项值转换为-3到3的分数
        const scoreMap = {1: -3, 2: -1, 3: 1, 4: 3};
        let score = scoreMap[value];
        
        // 如果问题方向是第二个选项（I/N/F/P），则反转分数
        if (direction === 'I' || direction === 'N' || direction === 'F' || direction === 'P') {
            score = -score;
        }
        
        return score;
    }

    updateProgress() {
        const progress = (this.currentQuestionIndex / questions.length) * 100;
        this.progressBar.style.width = `${progress}%`;
        this.progressText.textContent = `${Math.round(progress)}%`;
    }

    determineBaseType() {
        const type = [
            this.scores.EI < 0 ? 'I' : 'E',
            this.scores.SN < 0 ? 'N' : 'S',
            this.scores.TF < 0 ? 'F' : 'T',
            this.scores.JP < 0 ? 'P' : 'J'
        ].join('');
        return type;
    }

    determineSubtype() {
        // 计算A/T倾向
        const assertiveScore = this.calculateAssertiveScore();
        const variant = this.calculateVariantScore();
        
        // 确定子类型后缀
        if (assertiveScore > 0) {
            return 'A';  // Assertive
        } else if (assertiveScore < 0) {
            return 'T';  // Turbulent
        } else if (variant > 0) {
            return this.getFirstVariant(this.determineBaseType());
        } else {
            return this.getSecondVariant(this.determineBaseType());
        }
    }

    calculateAssertiveScore() {
        // 基于答案计算自信/谨慎倾向
        let score = 0;
        this.answers.forEach(answer => {
            if (['EI', 'TF'].includes(answer.dimension)) {
                score += this.calculateScore(answer.value, answer.direction);
            }
        });
        return score;
    }

    calculateVariantScore() {
        // 基于答案计算变体倾向
        let score = 0;
        this.answers.forEach(answer => {
            if (['SN', 'JP'].includes(answer.dimension)) {
                score += this.calculateScore(answer.value, answer.direction);
            }
        });
        return score;
    }

    getFirstVariant(baseType) {
        const variantMap = {
            'ISTJ': 'Sc', 'ISFJ': 'Nu', 'INFJ': 'Co', 'INTJ': 'Sc',
            'ISTP': 'Cr', 'ISFP': 'Ar', 'INFP': 'Dr', 'INTP': 'Ar',
            'ESTP': 'Op', 'ESFP': 'En', 'ENFP': 'Ch', 'ENTP': 'In',
            'ESTJ': 'Di', 'ESFJ': 'Su', 'ENFJ': 'Me', 'ENTJ': 'St'
        };
        return variantMap[baseType];
    }

    getSecondVariant(baseType) {
        const variantMap = {
            'ISTJ': 'Lo', 'ISFJ': 'Pr', 'INFJ': 'Ad', 'INTJ': 'St',
            'ISTP': 'An', 'ISFP': 'Na', 'INFP': 'He', 'INTP': 'Ex',
            'ESTP': 'Pr', 'ESFP': 'Ca', 'ENFP': 'Me', 'ENTP': 'Vi',
            'ESTJ': 'Su', 'ESFJ': 'Pr', 'ENFJ': 'Ca', 'ENTJ': 'Pi'
        };
        return variantMap[baseType];
    }

    showResult() {
        const baseType = this.determineBaseType();
        const subtype = this.determineSubtype();
        const fullType = `${baseType}-${subtype}`;
        
        this.questionScreen.classList.remove('active');
        this.resultScreen.classList.add('active');
        
        const typeInfo = mbtiTypes[fullType];
        this.resultType.textContent = `${fullType} (${typeInfo.name})`;
        this.resultDescription.textContent = typeInfo.description;

        // 更新维度条
        this.updateDimensionBar('ie', this.scores.EI);
        this.updateDimensionBar('sn', this.scores.SN);
        this.updateDimensionBar('tf', this.scores.TF);
        this.updateDimensionBar('jp', this.scores.JP);
    }

    updateDimensionBar(dimension, score) {
        const maxScore = 30; // 假设最大分数为30
        const percentage = ((score / maxScore) * 50) + 50; // 转换为0-100的百分比，50为中点
        document.getElementById(`${dimension}-bar`).style.width = `${percentage}%`;
    }

    shareResult() {
        const baseType = this.determineBaseType();
        const subtype = this.determineSubtype();
        const fullType = `${baseType}-${subtype}`;
        const typeInfo = mbtiTypes[fullType];
        
        const text = `我的MBTI-64类型是：${fullType} (${typeInfo.name})\n${typeInfo.description}\n\n来测试你的类型：`;
        
        if (navigator.share) {
            navigator.share({
                title: 'MBTI-64测试结果',
                text: text,
                url: window.location.href
            }).catch(console.error);
        } else {
            // 如果不支持原生分享，则复制到剪贴板
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('结果已复制到剪贴板！');
        }
    }

    restartTest() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.scores = {EI: 0, SN: 0, TF: 0, JP: 0};
        this.subtypeScores = {assertive: 0, variant: 0};
        
        this.resultScreen.classList.remove('active');
        this.welcomeScreen.classList.add('active');
        
        this.shuffleQuestions();
        this.updateProgress();
    }
}

// 当页面加载完成时初始化测试
document.addEventListener('DOMContentLoaded', () => {
    new MBTI64Test();
}); 