import type { Metadata } from "next";
import "./globals.css";
import { ToolNetworkFooter } from "@/components/ToolNetworkFooter";

export const metadata: Metadata = {
  title: "AI工具宝 - 智能营销文案生成器",
  description: "AI驱动的营销文案一键生成工具。支持小红书、抖音、朋友圈、淘宝等多种平台文案，秒级生成高质量营销内容。",
  keywords: "AI文案,营销文案,小红书文案,抖音文案,朋友圈文案,AI写作,文案生成器",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div style={{ flex: 1 }}>{children}</div>
        <ToolNetworkFooter />
      </body>
    </html>
  );
}
