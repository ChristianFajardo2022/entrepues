import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const PasoFecha = ({ selectedDate, setSelectedDate }) => {
  return (
    <>
{/*       <div className="text-sm text-center mb-4">
        {selectedDate
          ? format(selectedDate, "EEEE d 'de' MMMM yyyy", { locale: es })
          : "Seleccione una fecha"}
      </div>
 */}
      <div className=" my-8 RovelleUnoRegular">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          inline
          locale={es}
          minDate={new Date()}
          calendarStartDay={1}
          calendarClassName="!border-none !shadow-none w-full"
        />
      </div>
    </>
  );
};

export default PasoFecha;