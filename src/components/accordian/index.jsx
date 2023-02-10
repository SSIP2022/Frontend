import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa";
import styles from "../../styles/Accordian.module.scss"

export function Accordian({ title, description, isOpen }) {
  return (
    <div
    
      className={styles.accordianWrapper}
    >
      <main>
        <AnimatePresence>
          <motion.div layout>
            <motion.h4
              layout
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>{title}</div>
              <div
                className={styles.plusMinus}
              >
                {isOpen ? <FaMinus /> : <FaPlus />}
              </div>
            </motion.h4>
            {isOpen && (
              <p
             
                className={styles.description}
              >
                {description}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
