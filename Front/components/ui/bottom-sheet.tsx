"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          
          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}  // 90% 차지하도록 10%만 남김
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed left-0 right-0 bottom-0 h-[95vh] z-50 bg-background border-2 rounded-t-xl shadow-lg"
          >
            {/* Handle */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2">
              <div className="h-1.5 w-12 bg-muted-foreground/20 rounded-full" />
            </div>
            
            {/* Content */}
            <div className="pt-6 h-full overflow-hidden">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 