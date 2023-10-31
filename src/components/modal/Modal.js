import { useEffect, useRef } from "react";
import "./modal.css";

// In general, interesting implementation, have not seen many that use the dialog element.
// I personally would have made a simple div element and applied absolute styling to
// make it seem like a modal.

// Naming can be changed to getIsClickedIsideRectangle
const isClickInsideRectangle = (e, element) => {
  const r = element.getBoundingClientRect();

  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

const Modal = ({ title, isOpened, onClose, children }) => {
  // Make the variable naming more explicit by renaming it to `dialogRef`
  const ref = useRef(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      // The class assignment is not needed. You can do it in the dialog tag by assigning a `className` based on `isOpened` property.
      document.body.classList.add("modal-open");
    } else {
      ref.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [isOpened]);

  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e) =>
        ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
      }
    >
      <h3>{title}</h3>
      {/* Remove empty lines */}

      {children}

      <button onClick={onClose}>Close</button>
    </dialog>
  );
};

export default Modal;
