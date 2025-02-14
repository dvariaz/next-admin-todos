import "./Invoice.css";

interface IProps {
  totalToPay: number;
  taxes: number;
}

const Invoice: React.FC<IProps> = ({ totalToPay, taxes }) => {
  return (
    <div className="invoice bg-white text-black rounded-t-lg">
      <div className="px-14 py-10 text-center shadow">
        <div className="mb-2 text-lg">Total to pay:</div>
        <div className="mb-2 font-medium text-3xl">${totalToPay}</div>
        <div className="mb-2">Taxes (15%): ${taxes}</div>
      </div>
    </div>
  )
}

export default Invoice;
