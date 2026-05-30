import Link from "next/link";

const tools = [
  {
    title: "营销文案生成器",
    description: "输入产品信息，秒级生成适合小红书、抖音、朋友圈、淘宝等多平台的营销文案",
    icon: "✍️",
    href: "/tools/copywriter",
    tag: "热门",
  },
  {
    title: "合同风险分析",
    description: "粘贴合同内容，AI智能识别风险条款、遗漏保护、不利条款",
    icon: "📋",
    href: "/tools/contract",
    tag: "实用",
  },
  {
    title: "AI简历优化",
    description: "上传简历+目标职位，AI帮你优化关键词、经历描述、排版建议",
    icon: "📄",
    href: "#",
    tag: "即将上线",
    disabled: true,
  },
  {
    title: "智能翻译助手",
    description: "专业级多语言翻译，支持商务、法律、技术等专业领域术语",
    icon: "🌐",
    href: "#",
    tag: "即将上线",
    disabled: true,
  },
];

function ToolCard({ tool }: { tool: typeof tools[number] }) {
  const tagColorClass =
    tool.tag === "热门"
      ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
      : tool.tag === "实用"
      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400";

  const content = (
    <div
      className={`group relative block p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all ${
        tool.disabled
          ? "opacity-60 cursor-not-allowed"
          : "hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1"
      }`}
    >
      {tool.tag && (
        <span className={`absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-xs font-semibold ${tagColorClass}`}>
          {tool.tag}
        </span>
      )}
      <div className="text-4xl mb-4">{tool.icon}</div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">
        {tool.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
    </div>
  );

  if (tool.disabled) {
    return content;
  }
  return <Link href={tool.href}>{content}</Link>;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
      {/* 导航栏 */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI工具宝
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/tools/copywriter" className="hover:text-indigo-600 transition-colors">文案生成</Link>
            <Link href="/tools/contract" className="hover:text-indigo-600 transition-colors">合同分析</Link>
          </div>
        </div>
      </nav>

      {/* Hero区域 */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          AI驱动 · 秒级生成 · 完全免费
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            用AI提升你的工作效率
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          一键生成高质量营销文案、智能分析合同风险——让AI成为你最得力的工作助手
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tools/copywriter"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transition-all hover:-translate-y-0.5"
          >
            ✍️ 免费生成文案
          </Link>
          <Link
            href="/tools/contract"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-gray-300 dark:border-gray-700 font-semibold text-lg hover:border-indigo-500 hover:text-indigo-600 transition-all"
          >
            📋 合同风险分析
          </Link>
        </div>
      </section>

      {/* 工具卡片 */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-center mb-12">🛠️ AI工具箱</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.title} tool={tool} />
          ))}
        </div>
      </section>

      {/* 特性展示 */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "⚡", title: "秒级生成", desc: "先进的AI模型，3秒内生成高质量内容" },
            { icon: "🎯", title: "精准定制", desc: "针对不同平台和场景优化，文案自然不机械" },
            { icon: "🔒", title: "隐私安全", desc: "数据仅用于生成，不存储不泄露" },
          ].map((f) => (
            <div key={f.title} className="text-center p-6">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 text-center text-sm text-gray-500">
        <p>© 2026 AI工具宝 · 用AI让工作更高效</p>
      </footer>
    </div>
  );
}
