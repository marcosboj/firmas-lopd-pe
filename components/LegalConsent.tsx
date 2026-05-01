"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  lugar: z.string().min(1, "El lugar es obligatorio"),
  fecha: z.string().min(1, "La fecha es obligatoria"),
  nombreApellidos: z.string().min(1, "El nombre y apellidos son obligatorios"),
  dni: z.string().min(1, "El DNI es obligatorio"),
  telefono: z.string().min(1, "El teléfono de contacto es obligatorio"),
});

type FormValues = z.infer<typeof formSchema>;

export function LegalConsent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lugar: "",
      fecha: "",
      nombreApellidos: "",
      dni: "",
      telefono: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // Aquí implementaremos el envío en el futuro
    console.log("Formulario enviado:", data);
    alert("Formulario enviado correctamente (ver consola)");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Contenedor del Texto Legal */}
      <div className="bg-white border border-gray-300 rounded-md shadow-sm p-6 lg:p-8">
        <div className="max-h-[60vh] overflow-y-auto pr-4 text-sm text-gray-800 leading-relaxed space-y-4 font-serif">
          <p className="font-bold text-center mb-6">
            CONSENTIMIENTO INFORMADO ACERCA DE LA RECOGIDA DE DATOS PERSONALES PARA USUARIOS DEL PROGRAMA “Ni Un Hogar Sin Energía”
          </p>
          <p>
            Conforme a lo exigido en la normativa vigente en protección de datos personales se da cumplimiento a la obligación de informar al interesado acerca de los siguientes epígrafes:
          </p>
          
          <div>
            <p className="font-bold">RESPONSABLE DE SUS DATOS PERSONALES</p>
            <p>Sus datos personales pasarán a disposición de FUNDACIÓN ECOLOGÍA Y DESARROLLO, NIF ESG50503523 Plaza San Bruno 9, 1º Oficinas 50001 Zaragoza Delegado de Protección de Datos: dpo.ecodes@portalartico.es</p>
          </div>

          <div>
            <p className="font-bold">FINALIDADES</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Contactar para dar cita para el asesoramiento energético</li>
              <li>Realizar un diagnóstico energético para emitir un informe personalizado con recomendaciones sobre optimización de los contratos de suministro energético y hábitos y medidas de eficiencia energética en el hogar, así como acompañar en la tramitación del bono social, si aplica.</li>
              <li>Hacer seguimiento de las recomendaciones, para lo cual podremos comunicarnos tanto por teléfono (incluidas apps de mensajería), como por correo postal o electrónico.</li>
            </ul>
          </div>

          <div>
            <p className="font-bold">LEGITIMACIÓN</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Interés legítimo</li>
              <li>Consentimiento del interesado (otorgado firmando el presente formulario).</li>
            </ul>
          </div>

          <div>
            <p className="font-bold">DESTINATARIOS</p>
            <p>No se cederán datos a terceros, salvo obligación legal, con la excepción del envío de la solicitud de bono social a la comercializadora regulada correspondiente, si aplica. No se realizarán transferencias de datos internacionales.</p>
          </div>

          <div>
            <p className="font-bold">PLAZOS DE CONSERVACIÓN</p>
            <p>Los datos personales se mantendrán durante el tiempo necesario para la adecuada gestión del servicio proporcionado, o en cualquier caso, durante un periodo de cinco años.</p>
            <p>ECODES se reserva el derecho a usar los resultados del estudio, de manera anonimizada, con fines estadísticos.</p>
          </div>

          <div>
            <p className="font-bold">DERECHOS</p>
            <p>Usted puede ejercitar los derechos que por normativa de protección de datos personales le asisten (acceso, rectificación, supresión y derecho al olvido, limitación del tratamiento, portabilidad, oposición al tratamiento, revocación del consentimiento otorgado) presencialmente o por correo postal o electrónico en: Ni un hogar sin Energía ECODES, Plaza San Bruno 9, 1º Oficinas 5 Zaragoza 50001 dpo.ecodes@portalartico.es</p>
          </div>

          <div>
            <p className="font-bold">INFORMACIÓN ADICIONAL</p>
            <p>Puede encontrar más información sobre sus derechos en www.ecodes.org. Igualmente puede obtener más información y/o presentar una reclamación por medio de los datos de contacto del responsable del tratamiento o ante la Agencia Española de Protección de Datos.</p>
            <p>En el caso de que se produzca alguna modificación de sus datos le rogamos que nos comunique por escrito dicha modificación, con la finalidad de mantener actualizados sus datos.</p>
          </div>

          <p className="font-bold mt-6">
            Manifiesto que he sido informado de los epígrafes anteriores y EXPRESO MI CONSENTIMIENTO al amparo de la normativa vigente en protección de datos personales.
          </p>
        </div>
      </div>

      {/* Formulario de Captura */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-300 rounded-md shadow-sm p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-2">
            <label htmlFor="lugar" className="block text-sm font-medium text-gray-700">En (Lugar)</label>
            <input
              id="lugar"
              type="text"
              placeholder="Zaragoza"
              {...register("lugar")}
              className={cn(
                "mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                errors.lugar ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.lugar && <p className="text-red-500 text-xs">{errors.lugar.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha</label>
            <input
              id="fecha"
              type="date"
              {...register("fecha")}
              className={cn(
                "mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                errors.fecha ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.fecha && <p className="text-red-500 text-xs">{errors.fecha.message}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="nombreApellidos" className="block text-sm font-medium text-gray-700">Nombre y apellidos</label>
            <input
              id="nombreApellidos"
              type="text"
              {...register("nombreApellidos")}
              className={cn(
                "mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                errors.nombreApellidos ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.nombreApellidos && <p className="text-red-500 text-xs">{errors.nombreApellidos.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="dni" className="block text-sm font-medium text-gray-700">DNI / NIE</label>
            <input
              id="dni"
              type="text"
              {...register("dni")}
              className={cn(
                "mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                errors.dni ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.dni && <p className="text-red-500 text-xs">{errors.dni.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono de contacto</label>
            <input
              id="telefono"
              type="tel"
              {...register("telefono")}
              className={cn(
                "mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                errors.telefono ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.telefono && <p className="text-red-500 text-xs">{errors.telefono.message}</p>}
          </div>

        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
}
