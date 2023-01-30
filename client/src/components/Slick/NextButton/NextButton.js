import { GrNext } from "../../../asset/icons";

function NextButton(props) {
    const { className, style, onClick } = props;
    return (
        <button  
        className={className}
        style={{ ...style, display: "block", zIndex: "10", right: "10px" }}
        onClick={onClick}
        >
            <GrNext/>
        </button>
    );
}

export default NextButton;