
"use client";

import ToolCard from "./tool-card";
import type { Tool } from "@/lib/tool-definitions";
import { motion } from "framer-motion";

interface ToolCategorySectionProps {
  title: string;
  tools: Tool[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function ToolCategorySection({
  title,
  tools,
}: ToolCategorySectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        variants={containerVariants}
      >
        {tools.map((tool) => (
          <motion.div key={tool.slug} variants={itemVariants}>
            <ToolCard tool={tool} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
