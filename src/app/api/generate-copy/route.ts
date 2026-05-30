import { NextRequest, NextResponse } from "next/server";
import { callDeepSeek } from "@/lib/deepseek";

// 平台对应的文案风格指导
const PLATFORM_GUIDES: Record<string, string> = {
  xiaohongshu: `小红书风格：
- 标题要有emoji和吸引眼球的钩子，15字以内
- 正文用短句分段，每段1-2句话
- 大量使用emoji增加可读性
- 加入"姐妹们""家人们""真的绝了""yyds""冲冲冲"等口语化表达
- 结尾加互动引导："你们觉得呢？""评论区告诉我"
- 3-5个相关话题标签`,
  douyin: `抖音短视频文案风格：
- 前3秒必须有强钩子（悬念/反转/冲突）
- 语言极其口语化、接地气
- 可以用夸张/搞笑/煽情的表达
- 15秒-60秒的内容节奏
- 结尾要有引导关注/点赞的话术`,
  wechat_moments: `朋友圈文案风格：
- 简洁有格调，通常50-100字
- 可以带一点文艺/哲理感
- 或者走真实接地气路线
- 配合emoji点缀但不要过多
- 让人想点赞或评论`,
  taobao: `淘宝/电商详情页文案风格：
- 卖点清晰，突出产品优势
- 使用"限时""爆款""热卖""好评"等促转化词汇
- 场景化描述使用体验
- 包含规格、材质、功效等关键信息
- 营造紧迫感和稀缺感`,
  weibo: `微博文案风格：
- 话题性强，容易引发讨论
- 可以带观点和态度
- 140字以内简洁有力
- @相关账号增加曝光
- 配合1-3个热门话题`,
  official_account: `公众号推文风格：
- 标题要有吸引力但不过度标题党
- 开头要能抓住读者（讲故事/提问题/给数据）
- 正文逻辑清晰，分段明确
- 适当加入金句和观点
- 结尾有总结和互动`,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productName, productDesc, platform, style, extraInfo } = body as {
      productName: string;
      productDesc: string;
      platform: string;
      style?: string;
      extraInfo?: string;
    };

    if (!productName || !productDesc || !platform) {
      return NextResponse.json(
        { error: "请填写产品名称、产品描述，并选择目标平台" },
        { status: 400 }
      );
    }

    const platformGuide = PLATFORM_GUIDES[platform] || PLATFORM_GUIDES.xiaohongshu;

    const systemPrompt = `你是一位资深营销文案策划师，擅长为各种产品撰写高质量营销文案。
你需要根据用户提供的产品信息和目标平台，生成多套不同角度的营销文案。

要求：
1. 生成3套不同角度/风格的文案
2. 每套文案都要贴合目标平台特点
3. 文案要有吸引力、转化力
4. 语言自然流畅，不要有AI味

${style ? `风格要求：${style}` : ""}`;

    const userPrompt = `请为以下产品生成营销文案：

【产品名称】${productName}
【产品描述】${productDesc}
${extraInfo ? `【补充信息】${extraInfo}` : ""}

【目标平台】${platform}
${platformGuide}

请生成3套不同角度的文案，每套之间用 "---" 分隔。每套文案包含标题和正文。`;

    const result = await callDeepSeek(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      { temperature: 0.85, max_tokens: 4000 }
    );

    // 解析3套文案
    const copies = result
      .split(/---+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 10);

    return NextResponse.json({ copies, raw: result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "生成失败，请稍后重试";
    console.error("Generate copy error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
