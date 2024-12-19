import React from "react";
import ReactDOM from "react-dom";
import "../styles/Modal.css"; // 스타일은 별도 파일로 관리

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // 모달이 열려있지 않으면 렌더링하지 않음

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body // 모달을 body 태그 하위에 렌더링
  );
}

export default Modal;
