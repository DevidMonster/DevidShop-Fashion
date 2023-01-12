import { GrPrevious } from "../../../asset/icons";

function PrevButton(props) {
    const { className, style, onClick } = props;
    return (
        <button  className={className}
        style={{ ...style, display: "block", zIndex: "10", left: "10px" }}
        onClick={onClick}>
            <GrPrevious/>
        </button>
    );
}

export default PrevButton;