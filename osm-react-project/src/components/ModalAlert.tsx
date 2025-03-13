interface ModalAlertProps {
  title: string,
  text: string,
  onClose: () => void,
  open: boolean
}

export default function ModalAlert(props: ModalAlertProps) {
  return (
    <>
        <div className={`modal ${props.open ? 'show' : ''}`} tabIndex={-1} style={{ display: props.open ? 'block' : 'none' }}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{props.title}</h5>
                <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={props.onClose}
                ></button>
            </div>
            <div className="modal-body">
                <p>{props.text}</p>
            </div>
            <div className="modal-footer">
                <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={props.onClose}
                >
                Understood!
                </button>
            </div>
            </div>
        </div>
        </div>
    </>
  );
}
