import { ChevronDown, Check, ArrowRight, Calendar } from "lucide-react";
import { capitalizeFirst } from "../../constants/firsLetterUppercase";
import { BackgroundCards } from "../ui/BackgroundCards";

/**
 * Header del acordeón para cada paso de la reserva
 * Muestra el número, título, descripción y estado del paso
 */
export default function HeaderPaso({
  index,
  paso,
  isExpanded,
  isCompleted,
  currentStep,
  onClick,
  content,
}) {
  const isDisabled = index > currentStep && !isCompleted;

  return (
    <BackgroundCards
      fullWidth="small"
      rounded="small"
      padding={false}
      customClasses="px-4 py-2"
    >
      <button
        onClick={onClick}
        disabled={isDisabled}
        className="flex items-center justify-between relative"
      >
        {/* Número del paso */}

        {/* Título y descripción */}
        <div>
          <h3 className="text-xl">{paso.titulo}</h3>
          {content && (
            <div className="mt-2 flex items-center text-secondary/50">
              {content}
            </div>
          )}
        </div>

        {/* <p className=" text-sm mt-1">
          {isCompleted ? capitalizeFirst(paso.descripcion) : ""}
        </p> */}

        {/* Indicador de estado */}
        <div
          className={`size-8 aspect-square border rounded-full flex justify-center items-center justify-self-end ${
            isCompleted
              ? "border-secondary/0"
              : !isExpanded && !isCompleted
              ? "border-secondary/0"
              : "border-white"
          }`}
        >
          {isCompleted ? (
            <Check className="text-green-500" />
          ) : (
            <>
              {" "}
              <ArrowRight className="text-secondary" />{" "}
            </>
          )}
        </div>
      </button>
    </BackgroundCards>
  );
}
