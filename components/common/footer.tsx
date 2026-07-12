"use client"

import { motion } from "framer-motion"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <p className="text-white/60 mb-2">© {year} Pranav Dabhi. All rights reserved.</p>
        <p className="text-white/40 font-mono text-sm">Total Visitors: 000</p>
      </motion.div>
    </footer>
  )
}


