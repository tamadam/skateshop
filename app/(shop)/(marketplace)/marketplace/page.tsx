import Billboard from "../components/Billboard/Billboard";
import getBillboard from "../../actions/getBillboard";

const MarketplacePage = async () => {
  const billboard = await getBillboard("9737f519-0681-4508-9af9-24d1a96732c9");

  return (
    <div>
      <Billboard billboard={billboard} />
    </div>
  );
};

export default MarketplacePage;
