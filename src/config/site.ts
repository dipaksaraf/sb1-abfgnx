export const siteConfig = {
  name: "ModernCRM",
  description: "High-performance CRM system built with React and Supabase",
  mainNav: [
    {
      title: "Dashboard",
      href: "/",
      icon: "LayoutDashboard",
    },
    {
      title: "Customers",
      href: "/customers",
      icon: "Users",
    },
    {
      title: "Sales",
      href: "/sales",
      icon: "BadgeDollarSign",
    },
    {
      title: "Inventory",
      href: "/inventory",
      icon: "Package",
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: "BarChart3",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: "Settings",
    },
  ],
  theme: {
    light: {
      primary: "#0284c7",
      background: "#ffffff",
      text: "#1f2937",
    },
    dark: {
      primary: "#38bdf8",
      background: "#111827",
      text: "#f9fafb",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;