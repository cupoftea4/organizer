export const confirmOptions = {
    render: (message, onConfirm, onCancel) => {
        return ( 
            <div className="center-container">
                <p>{message.msg}<b>{message?.name ?? ""}</b>{"?"} </p>
                <button onClick={onConfirm} className="primary-button red"> Так </button>
                <button onClick={onCancel} className="primary-button"> Ні </button>
            </div>
        );
    }
};

export const warningOptions = {
    render: (message, onConfirm) => {
        return ( 
            <div className="center-container error">
                <p>{message.msg}</p>
                <button onClick={onConfirm} className="primary-button"> Зрозуміло </button>
            </div>
        );
    }
}