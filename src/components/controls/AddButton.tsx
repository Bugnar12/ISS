interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
}

const AlertButton: React.FC<ButtonProps> = ({ children , onClick}) => {
    const handleClick = () => {
        alert('Add button clicked');
        if(onClick) {
            onClick();
        }
    };

    return (
        <button onClick={handleClick}>
            {children}
        </button>
    );
};

export default AlertButton;