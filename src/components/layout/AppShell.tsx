import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';
import { motion } from 'framer-motion';

interface AppShellProps {
  children: React.ReactNode;
  activeRoute: string;
  onNavigate: (route: string) => void;
  role: 'patient' | 'doctor' | 'worker' | 'facility';
  title?: string;
  subtitle?: string;
}

export function AppShell({ children, activeRoute, onNavigate, role, title, subtitle }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen sahaay-page-bg">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        activeRoute={activeRoute}
        onNavigate={onNavigate}
        role={role}
      />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="absolute left-0 top-0 bottom-0 w-[280px]"
          >
            <Sidebar
              collapsed={false}
              onToggle={() => setMobileOpen(false)}
              activeRoute={activeRoute}
              onNavigate={(route) => { onNavigate(route); setMobileOpen(false); }}
              role={role}
            />
          </motion.div>
        </div>
      )}

      <motion.div
        initial={false}
        animate={{ marginLeft: collapsed ? 72 : 260 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:block min-h-screen"
      >
        <Topbar
          sidebarCollapsed={collapsed}
          onMenuToggle={() => setMobileOpen(true)}
          title={title}
          subtitle={subtitle}
        />
        <main className="p-4 lg:p-6 pb-8">
          {children}
        </main>
      </motion.div>

      {/* Mobile layout */}
      <div className="lg:hidden min-h-screen">
        <Topbar
          sidebarCollapsed={false}
          onMenuToggle={() => setMobileOpen(true)}
          title={title}
          subtitle={subtitle}
        />
        <main className="p-4 pb-24">
          {children}
        </main>
        <MobileNav activeRoute={activeRoute} onNavigate={onNavigate} role={role} />
      </div>
    </div>
  );
}
