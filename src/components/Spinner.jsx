import { BarLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto 50px auto",
};

const Spinner = ({ color = "blue", size = 150 }) => {
  return (
    <div className="spinner-container">
      <BarLoader
        color={color}
        width={size}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
