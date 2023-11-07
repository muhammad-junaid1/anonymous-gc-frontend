import { Button as Btn } from "@mui/material";

const Button = ({ children, props, type="primary", style, onClick }) => {
  if (type === "primary") {
    return (
      <Btn
        type="button"
        style={{ background: "black", fontSize: "15px", color: "white", ...style }}
        className={`rounded text-white font-bold flex justify-center items-center`}
        onClick={onClick}
        {...props}
      >
        <strong style={{
            fontSize: "14px"
        }}>{children}</strong>
      </Btn>
    );
  } else {
    return (
      <Btn
        type="button"
        style={{ background: "grey", color: "black" }}
        className="rounded text-white font-bold flex justify-center items-center"
        {...props}
      >
        <strong style={{
            fontSize: "14px"
        }}>{children}</strong>
      </Btn>
    );
  }
};

export default Button;
