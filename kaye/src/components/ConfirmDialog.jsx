import './ConfirmDialog.css';

/**
 * A simple modal confirmation dialog.
 *
 * Props:
 *   message  — text shown inside the dialog
 *   onCancel — called when the user clicks Cancel or the backdrop
 *   onConfirm — called when the user clicks the destructive action button
 *   confirmLabel — label for the confirm button (default "Delete")
 */
const ConfirmDialog = ({ message, onCancel, onConfirm, confirmLabel = 'Delete' }) => {
  return (
    <div className="dialog-backdrop" onClick={onCancel}>
      <div className="dialog-card" onClick={(e) => e.stopPropagation()}>
        <p className="dialog-message">{message}</p>
        <div className="dialog-actions">
          <button className="dialog-btn dialog-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="dialog-btn dialog-confirm" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
