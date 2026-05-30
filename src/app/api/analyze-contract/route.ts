import { NextRequest, NextResponse } from "next/server";
import { callDeepSeek } from "@/lib/deepseek";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contractText } = body as { contractText: string };

    if (!contractText || contractText.trim().length < 50) {
      return NextResponse.json(
        { error: "请粘贴合同内容（至少50字）" },
        { status: 400 }
      );
    }

    if (contractText.length > 50000) {
      return NextResponse.json(
        { error: "合同内容过长，请控制在50000字以内" },
        { status: 400 }
      );
    }

    const systemPrompt = `你是一位资深法律顾问，专门负责合同审查和风险分析。
请对用户提供的合同内容进行专业分析，用通俗易懂的语言说明问题。

分析框架：
1. 【合同概要】简要说明合同类型和主要内容
2. 【风险条款】识别对己方不利的条款（标注风险等级：⚠️高风险 / ⚡中风险 / 💡低风险）
3. 【遗漏条款】指出合同中缺少的重要保护性条款
4. 【模糊表述】找出含义不明确、可能产生争议的表述
5. 【修改建议】针对每个问题给出具体的修改建议
6. 【总体评价】合同整体风险评级（安全/一般/风险较高/高风险）

注意：
- 使用通俗语言，让非法律专业人士也能理解
- 每个风险点都要给出具体修改建议
- 这只是AI辅助分析，不构成法律意见`;

    const userPrompt = `请分析以下合同内容：

${contractText}

请按照上述分析框架给出完整的审查报告。`;

    const result = await callDeepSeek(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      { temperature: 0.3, max_tokens: 6000 }
    );

    return NextResponse.json({ analysis: result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "分析失败，请稍后重试";
    console.error("Analyze contract error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
