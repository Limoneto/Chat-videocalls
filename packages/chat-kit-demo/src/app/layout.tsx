import type { Metadata } from 'next'
import { ChatProvider } from '@/context/ChatProvider'
import { GlobalOverlays } from '@/components/GlobalOverlays'

export const metadata: Metadata = {
  title: 'Comvi',
  description: 'Chat y Llamadas',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, SF Pro Display, Segoe UI, Roboto, sans-serif;
            background: #0a1a1a;
            background-image:
              radial-gradient(ellipse at 20% 50%, rgba(0, 128, 128, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(10, 30, 30, 0.8) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 80%, rgba(0, 100, 100, 0.08) 0%, transparent 50%);
            min-height: 100vh;
            color: #F8FAFC;
            -webkit-font-smoothing: antialiased;
            overflow: hidden;
          }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
          ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes slideIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
          @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
          @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
          @keyframes ripple { to { transform: scale(2); opacity: 0; } }
          input:focus, textarea:focus { outline: none; }
          button { transition: all 0.15s ease; cursor: pointer; }
          button:active { transform: scale(0.95); }
          button:hover { opacity: 0.85; }
          ::selection { background: rgba(0,150,136,0.3); }
        `}</style>
      </head>
      <body suppressHydrationWarning>
        <ChatProvider><GlobalOverlays>{children}</GlobalOverlays></ChatProvider>
      </body>
    </html>
  )
}
