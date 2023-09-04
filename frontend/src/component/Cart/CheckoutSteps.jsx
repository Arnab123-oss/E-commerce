import React from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import { MdOutlineLocalShipping } from "react-icons/md";
import { MdLibraryAddCheck } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <MdOutlineLocalShipping size={25}/>,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <MdLibraryAddCheck size={25}/>,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <MdAccountBalance size={25}/>,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
                size:25
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
