interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.title}>{title}</div>
                    <button style={styles.closeButton} onClick={onClose}>×</button>
                </div>

                <div style={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

const styles = {
    overlay: {
        position: 'fixed' as const,
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        display: 'flex',
        flexDirection: 'column' as const,
        width: '100%',
        gap: '16px',
        backgroundColor: 'white',
        borderRadius: '12px',
        maxWidth: '500px',
        padding: '24px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '12px',
    },
    title: {
        fontSize: '20px',
        fontWeight: 'bold',
    },
    closeButton: {
        border: 'none',
        background: 'none',
        color: 'black',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '4px',
    },
    content: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '20px',
    },
}

export default Modal;