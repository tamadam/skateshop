"use client";

import ApiList from "../../components/ApiInfo/ApiList";
import Heading from "../../components/Heading/Heading";
import ColorTable from "./ColorTable";
import { columns, FormattedColor } from "./columns";

interface ColorClientProps {
  colors: FormattedColor[];
  totalColors: number;
}

const ColorClient = ({ colors, totalColors }: ColorClientProps) => {
  return (
    <div>
      <Heading
        title={`Colors (${totalColors})`}
        description="Manage your colors for your shop"
      />

      <ColorTable colors={colors} totalColors={totalColors} columns={columns} />

      <ApiList entityName="colors" entityIdName="colorId" />
    </div>
  );
};

export default ColorClient;
