"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContractPage() {
  const [contractText, setContractText] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (!contractText.trim() || contractText.trim().length < 50) {
      setError("请粘贴合同内容（至少50字）");
      return;
    }
    setError("");
    setLoading(true);
    setAnalysis("");

    try {
      const res = await fetch("/api/analyze-contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractText: contractText.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "分析失败");
        return;
      }
      setAnalysis(data.analysis);
    } catch {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  const copyAnalysis = async () => {
    try {
      await navigator.clipboard.writeText(analysis);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-amber-950">
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
            <span className="text-gray-600 dark:text-gray-400">合同风险分析</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* 标题 */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            📋 合同风险分析
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            粘贴合同内容，AI秒级识别风险条款和遗漏保护
          </p>
        </div>

        {/* 输入区 */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 md:p-8 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              合同内容 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={contractText}
              onChange={(e) => setContractText(e.target.value)}
              placeholder="粘贴完整的合同内容到这里...&#10;&#10;支持各类合同：劳动合同、租赁合同、服务合同、合作协议、买卖合同等"
              rows={12}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-sm resize-none font-mono"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>支持各类合同文本</span>
              <span>{contractText.length} / 50000字</span>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || contractText.trim().length < 50}
            className={`w-full py-4 rounded-xl text-lg font-bold text-white transition-all ${
              loading || contractText.trim().length < 50
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-white loading-dot"></span>
                  <span className="w-2 h-2 rounded-full bg-white loading-dot"></span>
                  <span className="w-2 h-2 rounded-full bg-white loading-dot"></span>
                </span>
                AI正在分析中...
              </span>
            ) : (
              "🔍 开始分析"
            )}
          </button>
        </div>

        {/* 错误 */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300">
            ❌ {error}
          </div>
        )}

        {/* 分析结果 */}
        {analysis && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">🔍 分析报告</h2>
              <button
                onClick={copyAnalysis}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  copied
                    ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-amber-100 dark:hover:bg-amber-900 hover:text-amber-600"
                }`}
              >
                {copied ? "✅ 已复制" : "📋 复制报告"}
              </button>
            </div>
            <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed text-[15px]">
              {analysis}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400">
              ⚠️ 以上为AI辅助分析结果，仅供参考，不构成法律意见。重要合同请咨询专业律师。
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
