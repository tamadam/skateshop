import React from "react";
import AdminActionButton from "./AdminActionButton";

interface HeadingProps {
  title: string;
  description: string;
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="flex">
      <div>
        <h1 className="font-bold text-3xl">{title}</h1>
        <span>{description}</span>
        <hr />
      </div>
      <AdminActionButton />
    </div>
  );
};

export default Heading;
