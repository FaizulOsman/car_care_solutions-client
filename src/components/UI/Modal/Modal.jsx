import React from "react";

const Modal = ({ styles, Button, data, modalBody, isDisabled }) => {
  return (
    <div className={`flex items-center ${styles}`}>
      <button
        disabled={isDisabled ? isDisabled : false}
        onClick={() => document.getElementById(data?.id).showModal()}
      >
        {Button}
      </button>
      <dialog id={data?.id} className="modal">
        <div className="modal-box bg-[#2a2a31]">{modalBody}</div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Modal;
