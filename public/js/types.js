const mbtiTypes = {
    // ISTJ 子类型
    "ISTJ-A": {
        name: "尽责的执行者-A",
        description: "严谨、可靠、注重细节的实践者，具有很强的自信心和独立性。"
    },
    "ISTJ-T": {
        name: "尽责的执行者-T",
        description: "谨慎、负责任、注重传统的实践者，对自己的工作质量有较高要求。"
    },
    "ISTJ-Sc": {
        name: "系统的组织者",
        description: "专注于建立和维护系统和程序，重视效率和秩序。"
    },
    "ISTJ-Lo": {
        name: "逻辑的守护者",
        description: "依靠逻辑和经验做决策，重视事实和具体数据。"
    },

    // ISFJ 子类型
    "ISFJ-A": {
        name: "尽职的守护者-A",
        description: "温和、负责、关心他人的实践者，具有较强的自信心。"
    },
    "ISFJ-T": {
        name: "尽职的守护者-T",
        description: "谨慎、体贴、注重细节的实践者，希望能够完美地照顾他人。"
    },
    "ISFJ-Nu": {
        name: "滋养的照顾者",
        description: "专注于照顾和支持他人的需求，富有同理心。"
    },
    "ISFJ-Pr": {
        name: "实用的帮助者",
        description: "注重实际帮助和具体支持，善于处理日常事务。"
    },

    // INFJ 子类型
    "INFJ-A": {
        name: "神秘的智者-A",
        description: "有洞察力、理想主义的思考者，对自己的判断很有信心。"
    },
    "INFJ-T": {
        name: "神秘的智者-T",
        description: "敏感、理想主义的思考者，经常反思和质疑自己。"
    },
    "INFJ-Co": {
        name: "富有同理心的顾问",
        description: "专注于理解和指导他人，善于洞察人性。"
    },
    "INFJ-Ad": {
        name: "倡导者",
        description: "致力于推动积极的社会变革，具有强烈的使命感。"
    },

    // INTJ 子类型
    "INTJ-A": {
        name: "建筑师-A",
        description: "独立、战略性的思考者，对自己的能力充满信心。"
    },
    "INTJ-T": {
        name: "建筑师-T",
        description: "完美主义、战略性的思考者，不断追求自我提升。"
    },
    "INTJ-Sc": {
        name: "科学家",
        description: "专注于研究和分析复杂系统，追求知识和理解。"
    },
    "INTJ-St": {
        name: "策略家",
        description: "善于制定长期战略和规划，注重效率和创新。"
    },

    // ISTP 子类型
    "ISTP-A": {
        name: "鉴赏家-A",
        description: "灵活、适应性强的实践者，对自己的能力很有信心。"
    },
    "ISTP-T": {
        name: "鉴赏家-T",
        description: "观察敏锐、适应性强的实践者，追求技能的完善。"
    },
    "ISTP-Cr": {
        name: "工匠",
        description: "专注于掌握具体技能和工具，享受动手操作。"
    },
    "ISTP-An": {
        name: "分析者",
        description: "善于分析系统和机制，喜欢解决技术问题。"
    },

    // ISFP 子类型
    "ISFP-A": {
        name: "探险家-A",
        description: "艺术性、随性的实践者，对自己的选择很有信心。"
    },
    "ISFP-T": {
        name: "探险家-T",
        description: "敏感、艺术性的实践者，经常怀疑自己的决定。"
    },
    "ISFP-Ar": {
        name: "艺术家",
        description: "专注于艺术创作和美学表达，重视个人风格。"
    },
    "ISFP-Na": {
        name: "自然主义者",
        description: "与自然和生命联系紧密，追求和谐与平衡。"
    },

    // INFP 子类型
    "INFP-A": {
        name: "调停者-A",
        description: "理想主义、富有创造力的思考者，相信自己的价值观。"
    },
    "INFP-T": {
        name: "调停者-T",
        description: "敏感、理想主义的思考者，经常质疑自己的决定。"
    },
    "INFP-Dr": {
        name: "梦想家",
        description: "沉浸在想象和创意中，追求独特的表达方式。"
    },
    "INFP-He": {
        name: "治愈者",
        description: "致力于帮助他人成长和康复，具有深厚的同理心。"
    },

    // INTP 子类型
    "INTP-A": {
        name: "逻辑学家-A",
        description: "创新、分析性的思考者，对自己的理论很有信心。"
    },
    "INTP-T": {
        name: "逻辑学家-T",
        description: "好奇、分析性的思考者，不断质疑和完善理论。"
    },
    "INTP-Ar": {
        name: "建筑师",
        description: "专注于设计和构建理论体系，追求逻辑完整性。"
    },
    "INTP-Ex": {
        name: "探索者",
        description: "不断探索新的知识领域，享受智力挑战。"
    },

    // ESTP 子类型
    "ESTP-A": {
        name: "企业家-A",
        description: "大胆、实用主义的行动者，对自己的能力充满信心。"
    },
    "ESTP-T": {
        name: "企业家-T",
        description: "冒险、实用主义的行动者，追求更好的表现。"
    },
    "ESTP-Op": {
        name: "操作者",
        description: "善于处理紧急情况和实际问题，反应快速。"
    },
    "ESTP-Pr": {
        name: "表演者",
        description: "享受成为关注的焦点，善于调动气氛。"
    },

    // ESFP 子类型
    "ESFP-A": {
        name: "表演者-A",
        description: "活力四射、随性的表演者，对自己的魅力很有信心。"
    },
    "ESFP-T": {
        name: "表演者-T",
        description: "热情、敏感的表演者，希望得到他人的认可。"
    },
    "ESFP-En": {
        name: "娱乐者",
        description: "善于创造欢乐氛围，让他人感到快乐。"
    },
    "ESFP-Ca": {
        name: "关怀者",
        description: "注重照顾他人的情感需求，富有同理心。"
    },

    // ENFP 子类型
    "ENFP-A": {
        name: "探险家-A",
        description: "热情、创新的激励者，对自己的想法充满信心。"
    },
    "ENFP-T": {
        name: "探险家-T",
        description: "充满热情、创意的激励者，经常反思自己的决定。"
    },
    "ENFP-Ch": {
        name: "变革者",
        description: "致力于推动积极的改变，激发他人的潜能。"
    },
    "ENFP-Me": {
        name: "导师",
        description: "善于指导和启发他人，享受分享知识。"
    },

    // ENTP 子类型
    "ENTP-A": {
        name: "辩论家-A",
        description: "机智、创新的思考者，对自己的观点很有信心。"
    },
    "ENTP-T": {
        name: "辩论家-T",
        description: "好奇、创新的思考者，不断挑战和完善观点。"
    },
    "ENTP-In": {
        name: "创新者",
        description: "专注于开发新想法和解决方案，享受创造过程。"
    },
    "ENTP-Vi": {
        name: "远见者",
        description: "善于预见趋势和可能性，具有战略思维。"
    },

    // ESTJ 子类型
    "ESTJ-A": {
        name: "总管-A",
        description: "果断、有组织的领导者，对自己的判断很有信心。"
    },
    "ESTJ-T": {
        name: "总管-T",
        description: "负责任、有条理的领导者，追求更高的标准。"
    },
    "ESTJ-Di": {
        name: "指挥官",
        description: "善于管理和协调资源，确保目标达成。"
    },
    "ESTJ-Su": {
        name: "监督者",
        description: "注重维护规则和标准，确保系统运行有序。"
    },

    // ESFJ 子类型
    "ESFJ-A": {
        name: "执行官-A",
        description: "友善、负责任的组织者，对自己的能力很有信心。"
    },
    "ESFJ-T": {
        name: "执行官-T",
        description: "热心、谨慎的组织者，希望得到他人的认可。"
    },
    "ESFJ-Su": {
        name: "支持者",
        description: "专注于满足他人的需求，创造和谐的环境。"
    },
    "ESFJ-Pr": {
        name: "提供者",
        description: "善于照顾他人的实际需求，注重具体帮助。"
    },

    // ENFJ 子类型
    "ENFJ-A": {
        name: "主人公-A",
        description: "魅力型、有远见的领导者，对自己的影响力很有信心。"
    },
    "ENFJ-T": {
        name: "主人公-T",
        description: "富有同情心、理想主义的领导者，追求完美表现。"
    },
    "ENFJ-Me": {
        name: "导师",
        description: "致力于指导他人成长，善于激发潜能。"
    },
    "ENFJ-Ca": {
        name: "催化者",
        description: "推动积极的改变，创造团结的氛围。"
    },

    // ENTJ 子类型
    "ENTJ-A": {
        name: "指挥官-A",
        description: "果断、战略性的领导者，对自己的能力充满信心。"
    },
    "ENTJ-T": {
        name: "指挥官-T",
        description: "有野心、完美主义的领导者，追求卓越表现。"
    },
    "ENTJ-St": {
        name: "战略家",
        description: "专注于制定和执行长期战略，善于规划。"
    },
    "ENTJ-Pi": {
        name: "先驱者",
        description: "推动创新和变革，勇于开拓新领域。"
    }
}; 