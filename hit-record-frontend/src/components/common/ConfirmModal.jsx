import React from "react";
import Button from "./Button";
import "./ConfirmModal.css";

// Takes in a message prop as well as a confirmation and cancel function
const ConfirmModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal-box">
                <p>{message}</p>
                <div className="confirm-modal-buttons">
                    <Button onClick={onConfirm}>Yes</Button>
                    <Button onClick={onCancel}>No</Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;