"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { techStackData } from "@/lib/data/fake-data";

export default function AdminStack() {
  const allItems = Object.entries(techStackData).flatMap(([category, items]) =>
    items.map((item) => ({
      ...item,
      id: `${category}-${item.name}`,
      category,
    })),
  );

  const [stack, setStack] = useState(allItems);

  const deleteItem = (id: string) => {
    setStack((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Tech Stack</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary inline-flex items-center gap-2 text-sm"
        >
          <Plus size={16} />
          Add Technology
        </motion.button>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stack.map((tech, i) => (
          <motion.div
            key={tech.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            className="glass-card p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {tech.name}
                </h3>
                <span className="text-xs text-accent-light capitalize">
                  {tech.category}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 rounded-lg text-muted hover:text-accent-light hover:bg-accent/10 transition-colors"
                >
                  <Edit2 size={13} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteItem(tech.id)}
                  className="p-1.5 rounded-lg text-muted hover:text-error hover:bg-error/10 transition-colors"
                >
                  <Trash2 size={13} />
                </motion.button>
              </div>
            </div>

            {/* Level bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 progress-track">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${tech.level}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                />
              </div>
              <span className="text-xs font-mono text-accent-light w-10 text-right">
                {tech.level}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
