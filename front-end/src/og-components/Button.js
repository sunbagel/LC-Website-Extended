import "./Button.css";
import { Link } from "react-router-dom";

const STYLES = ["btn--primary", "btn--outline"];

const SIZES = ["btn--medium", "btn--large"];

const Button = ({ children, type, onClick, buttonStyle, buttonSize }) => {
  // const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle :
  //     STYLES[0]; 
      
  // const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize
  //   : SIZES[0];
  return (
    <Link to='/sign-up' className='btn-mobile'>
      <button  className={`btn ${buttonStyle} ${buttonSize}`} onClick={onClick} type={type}>
        {children}
      </button>
    </Link>
  );
};

Button.defaultProps = {
  buttonStyle: "btn--primary",
  buttonSize: "btn--medium",
};

export default Button;
