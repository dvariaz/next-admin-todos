import clsx from 'clsx';
import { IoIosListBox } from "react-icons/io";

interface IProps {
  className?: string;
}

const Brand: React.FC<IProps> = ({ className }) => {
  return (
    <div className={clsx("inline-flex items-center", className)}>
      <IoIosListBox
        size={30}
        color="#5daae8"
        data-testid="brand-icon" />

      <span
        className="hidden md:block ml-2 font-bold uppercase tracking-widest"
        data-testid="brand-text">
          Todo App
      </span>
    </div>
  )
}

export default Brand;
