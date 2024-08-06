interface TooltipProps {
    text: string;
}

const Tooltip = ({ text }: TooltipProps) => {
    return (
        <div className="tooltip">
            <svg
                fill="#929296"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm1,15a1,1,0,0,1-2,0V11a1,1,0,0,1,2,0ZM12,8a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,8Z" />
            </svg>
            <span className="tooltiptext">{text}</span>
        </div>
    );
};

export default Tooltip;