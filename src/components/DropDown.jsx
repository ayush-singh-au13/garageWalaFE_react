import React from "react";
import Select from "react-select";

const options = [
  { label: "--------------Select--------------" },
  { value: "1", label: "Partner is not picking up the call" },
  { value: "2", label: "Garage is closed" },
  { value: "3", label: "Partner not available" },
  { value: "4", label: "Road is blocked" },
  { value: "5", label: "Other Issue" },
];

export default function MyComponent() {
  return <Select options={options} />;
}
