import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, Button } from "react-bootstrap";

function AnimatedModal({ show, onClose, title, body, onCloseLabel = "Close" }) {
  return (
    <AnimatePresence>
      {show && (
        <Modal
          show={show}
          onHide={onClose}
          backdrop="static"
          keyboard={false}
          centered
          dialogClassName="animated-modal"
        >
          <motion.div
            initial={{ y: "-50px", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-50px", opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                {onCloseLabel}
              </Button>
            </Modal.Footer>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}

export default AnimatedModal;
