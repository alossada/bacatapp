import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CalendarioDisponibilidad.css";

/**
 Calendario que muestra 2 meses (inline) y bloquea las fechas recibidas en `fechasOcupadas`
 */
const CalendarioDisponibilidad = ({
  fechaInicio,
  setFechaInicio,
  fechaFin,
  setFechaFin,
  fechasOcupadas = [],
}) => {
  const fechasBloqueadas = fechasOcupadas.map((f) => new Date(f));

  return (
    <div className="calendario-disponibilidad">
      <DatePicker
        inline
        monthsShown={2}
        selectsRange
        startDate={fechaInicio}
        endDate={fechaFin}
        onChange={(dates) => {
          const [start, end] = dates;
          setFechaInicio(start);
          setFechaFin(end);
        }}
        minDate={new Date()}
        excludeDates={fechasBloqueadas}
        placeholderText="Selecciona un rango"
        calendarClassName="calendario-custom"
      />
    </div>
  );
};

export default CalendarioDisponibilidad;

