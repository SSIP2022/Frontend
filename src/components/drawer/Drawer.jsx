import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Drawer.css";
import { FaTimes } from "react-icons/fa";

export function Drawer({ close, children, height, isActive }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="drawer-wrapper"
          drag={"y"}
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 300) close();
          }}
          style={{ height: height ? height : `height: calc(100% - 6rem)` }}
          initial={{ opacity: 0.5, y: "110%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0.5, y: "110%" }}
          transition={{ damping: 25, type: "spring" }}
        >
          <motion.div>

            <div className="drawer">
            {/* <div className="drawerLine"></div> */}
              {/* <div style={{ display: "flex", justifyContent: "flex-end" }}> */}
                <div
                  style={{
                    background: "#ec4646",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "5px 10px",
                    border: "0.5px solid black",
                    borderRadius: "5px",
                    // width: "30px",
                    height: "30px",
                    cursor: "pointer",
                    position: "absolute",
                    top: "1em",
                    right: "1em",
                    color:"white",
                    fontWeight:"bold",
                    letterSpacing:"1.5px",
                    zIndex:"12"
                  }}
                  onClick={() => close()}
                >
                  <FaTimes/>
                </div>
              {/* </div> */}
              <div className="child" style={{margin:"20px 0"}}>{children}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
