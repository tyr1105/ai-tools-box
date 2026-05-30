"use client";

import { useState } from "react";
import Link from "next/link";

const PLATFORMS = [
  { id: "xiaohongshu", name: "小红书", icon: "📕" },
  { id: "douyin", name: "抖音/短视频", icon: "🎵" },
  { id: "wechat_moments", name: "朋友圈", icon: "💬" },
  { id: "taobao", name: "淘宝/电商", icon: "🛒" },
  { id: "weibo", name: "微博", icon: "📱" },
  { id: "official_account", name: "公众号", icon: "📰" },
];

const STYLES = [
  "专业大气", "活泼俏皮", "走心感人", "简洁有力", "搞笑幽默", "高端格调",
];

export default function CopywriterPage() {
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [platform, setPlatform] = useState("xiaohongshu");
  const [style, setStyle] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [copies, setCopies] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!productName.trim() || !productDesc.trim()) {
      setError("请填写产品名称和描述");
      return;
    }
    setError("");
    setLoading(true);
    setCopies([]);

    try {
      const res = await fetch("/api/generate-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: productName.trim(),
          productDesc: productDesc.trim(),
          platform,
          style,
          extraInfo: extraInfo.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "生成失败");
        return;
      }
      setCopies(data.copies || [data.raw]);
    } catch {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      {/* 导航 */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-2xl">🤖</span>
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI工具宝
              </span>
            </Link>
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-gray-600 dark:text-gray-400">营销文案生成器</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* 标题 */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            ✍️ 营销文案生成器
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            输入产品信息，3秒生成多平台营销文案
          </p>
        </div>

        {/* 表单 */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 md:p-8 mb-8">
          {/* 产品名称 */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              产品名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="例如：晶冻冰皮月饼礼盒"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-base"
            />
          </div>

          {/* 产品描述 */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              产品描述 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={productDesc}
              onChange={(e) => setProductDesc(e.target.value)}
              placeholder="描述产品的卖点、特色、适用场景等。越详细，生成的文案越精准。"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-base resize-none"
            />
          </div>

          {/* 目标平台 */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              目标平台
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                    platform === p.id
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                >
                  <span className="text-lg">{p.icon}</span>
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* 风格选择 */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              文案风格 <span className="text-gray-400 font-normal">(可选)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(style === s ? "" : s)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    style === s
                      ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 ring-2 ring-purple-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 补充信息 */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              补充信息 <span className="text-gray-400 font-normal">(可选)</span>
            </label>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              placeholder="目标用户群、价格区间、促销活动等额外信息"
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-base resize-none"
            />
          </div>

          {/* 生成按钮 */}
          <button
            onClick={handleGenerate}
            disabled={loading || !productName.trim() || !productDesc.trim()}
            className={`w-full py-4 rounded-xl text-lg font-bold text-white transition-all ${
              loading || !productName.trim() || !productDesc.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-white loading-dot"></span>
                  <span className="w-2 h-2 rounded-full bg-white loading-dot"></span>
                  <span className="w-2 h-2 rounded-full bg-white loading-dot"></span>
                </span>
                AI正在创作中...
              </span>
            ) : (
              "🚀 一键生成文案"
            )}
          </button>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300">
            ❌ {error}
          </div>
        )}

        {/* 生成结果 */}
        {copies.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">📝 生成结果</h2>
            {copies.map((copy, idx) => (
              <div
                key={idx}
                className="copy-card bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-6 relative"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    文案方案 {idx + 1}
                  </span>
                  <button
                    onClick={() => copyToClipboard(copy, idx)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      copiedIdx === idx
                        ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-600"
                    }`}
                  >
                    {copiedIdx === idx ? "✅ 已复制" : "📋 复制"}
                  </button>
                </div>
                <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed text-[15px]">
                  {copy}
                </div>
              </div>
            ))}

            {/* 重新生成按钮 */}
            <div className="text-center pt-4">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="px-8 py-3 rounded-xl border-2 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-all"
              >
                🔄 换一套文案
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
