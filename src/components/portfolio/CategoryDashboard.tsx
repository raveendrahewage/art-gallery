import React from "react";
import { motion } from "framer-motion";
import "./CategoryDashboard.css";

type CategoryDashboardProps = {
  category: string;
  photoCount: number;
  featuredPhoto: string;
  onExplore: () => void;
};

const CategoryDashboard: React.FC<CategoryDashboardProps> = ({
  category,
  photoCount,
  featuredPhoto,
  onExplore,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="category-dashboard"
    >
      <div className="dashboard-hero">
        <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={featuredPhoto} 
            alt={category} 
        />
      </div>
      <div className="dashboard-content">
        <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="category-title"
        >
            {category}
        </motion.h2>
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="category-stats"
        >
            {photoCount} EXQUISITE PIECES
        </motion.p>
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="category-description"
        >
            Explore a curated collection of {category} photography. Each piece captures a unique moment, blending artistic vision with technical precision to bring you a truly immersive experience.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="explore-btn"
          onClick={onExplore}
        >
          Explore Collection
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CategoryDashboard;
