"use client";

import { motion } from "framer-motion";
import { FolderKanban, Cpu, MessageSquare, Eye } from "lucide-react";
import { adminStats } from "@/lib/data/fake-data";

const stats = [
  {
    label: "Total Projects",
    value: adminStats.totalProjects,
    icon: FolderKanban,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    label: "Technologies",
    value: adminStats.totalTechnologies,
    icon: Cpu,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    label: "Messages",
    value: adminStats.totalMessages,
    icon: MessageSquare,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    label: "Published",
    value: adminStats.publishedProjects,
    icon: Eye,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <Icon size={20} className={stat.color} />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[
            {
              action: "Published",
              item: "E-commerce PWA",
              time: "2 hours ago",
            },
            {
              action: "Updated",
              item: "Tech Stack — React",
              time: "5 hours ago",
            },
            {
              action: "New message",
              item: "from client@startup.io",
              time: "1 day ago",
            },
            {
              action: "Created",
              item: "AI Analytics Dashboard",
              time: "3 days ago",
            },
          ].map((activity, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div>
                <span className="text-accent-light text-sm font-medium">
                  {activity.action}
                </span>
                <span className="text-foreground text-sm ml-2">
                  {activity.item}
                </span>
              </div>
              <span className="text-xs text-muted">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
