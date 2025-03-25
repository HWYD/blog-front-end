// components/CodeHighlighter.jsx
'use client';
import { useEffect } from 'react';
import Prism from 'prismjs';
import { usePathname } from 'next/navigation';

// 按需加载语言包
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-jsx';

export default function CodeHighlighter() {
  const pathname = usePathname();

  useEffect(() => {
    // 主高亮函数
    const highlightAll = () => {
      Prism.highlightAll();
      console.log('Prism',Prism)
      
      // 处理行号插件（如果使用）
      if (typeof Prism.plugins.lineNumbers === 'function') {
        Prism.plugins.lineNumbers();
      }
    };

    // 初始高亮
    setTimeout(()=>{
        highlightAll();
    },500)

  }, [pathname]); // 监听 pathname 变化

  return null;
}
