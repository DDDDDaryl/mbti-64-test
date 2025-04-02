const questions = [
    // E vs I 维度的问题
    {
        text: "我更喜欢在热闹的环境中工作",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我倾向于先说出想法，然后再仔细思考",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我喜欢成为注意力的焦点",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我更容易在与他人交谈中获得能量",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我喜欢参加大型社交活动",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我需要独处的时间来恢复精力",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我倾向于深思熟虑后再发言",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我更喜欢安静的环境",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我更喜欢与少数几个人深入交谈",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我在独自工作时表现最好",
        dimension: "EI",
        direction: "I"
    },

    // S vs N 维度的问题
    {
        text: "我更关注具体的细节和事实",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我更相信实际经验而不是理论",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我喜欢按部就班地完成任务",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我更喜欢处理当下的实际问题",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我倾向于选择已经证实有效的方法",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我经常思考事物背后的含义和联系",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我喜欢探索新的可能性和想法",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我更关注整体画面而不是细节",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我喜欢思考未来的可能性",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我经常能看到事物之间的潜在联系",
        dimension: "SN",
        direction: "N"
    },

    // T vs F 维度的问题
    {
        text: "我在做决定时更看重逻辑和事实",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我倾向于客观分析问题",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我认为保持公平比维护和谐更重要",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我更重视真理而不是他人感受",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我在批评他人时直言不讳",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我在做决定时会考虑他人的感受",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我容易被他人的情绪影响",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我更看重人际关系的和谐",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我倾向于用同理心理解他人",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我在表达批评时会考虑措辞",
        dimension: "TF",
        direction: "F"
    },

    // J vs P 维度的问题
    {
        text: "我喜欢提前计划和安排",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我倾向于立即完成任务",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我喜欢有条理的生活方式",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我更喜欢确定性而不是开放性",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我习惯按计划行事",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我喜欢保持选择的灵活性",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我倾向于推迟做决定",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我喜欢随机应变",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我享受探索各种可能性",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我不喜欢被严格的计划束缚",
        dimension: "JP",
        direction: "P"
    }
]; 