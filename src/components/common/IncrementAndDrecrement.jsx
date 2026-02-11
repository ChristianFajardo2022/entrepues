import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/Button";

export const IncremenAndDecrementComponent = ({
  item,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className="flex items-center gap-2 rounded-lg p-1">
      <Button
        type="button-thirty"
        Icon={Minus}
        iconSize="small"
        onClick={decreaseQuantity}
        props={{ "aria-label": "Disminuir cantidad" }}
        customClass="opacity-40 hover:opacity-100 !px-4 !py-1 !rounded-md"
      />

      <span className="w-6 text-center font-semibold">{item}</span>
      <Button
        type="button-thirty"
        Icon={Plus}
        iconSize="small"
        onClick={increaseQuantity}
        props={{ "aria-label": "Aumentar cantidad" }}
        customClass="opacity-40 hover:opacity-100 !px-4 !py-1 !rounded-md"
      />
    </div>
  );
};
