"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { SignaturePad } from "./SignaturePad";

// Importación dinámica para evitar problemas con SSR en Next.js
const generatePDFDocument = async (htmlContent: HTMLElement, fileName: string) => {
  const html2pdf = (await import("html2pdf.js")).default;
  
  const opt = {
    margin:       [10, 0, 10, 0] as [number, number, number, number],
    filename:     fileName,
    image:        { type: 'jpeg' as const, quality: 0.98 },
    html2canvas:  { scale: 2, windowWidth: 800 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
    pagebreak:    { mode: 'avoid-all' }
  };

  await html2pdf().set(opt).from(htmlContent).save();
};

const formSchema = z.object({
  lugar: z.string().min(1, "El lugar es obligatorio"),
  fecha: z.string().min(1, "La fecha es obligatoria"),
  nombreApellidos: z.string().min(1, "El nombre y apellidos son obligatorios"),
  dni: z.string().min(1, "El DNI es obligatorio"),
  telefono: z.string().min(1, "El teléfono de contacto es obligatorio"),
});

type FormValues = z.infer<typeof formSchema>;

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export function LegalConsent() {
  const [signature, setSignature] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      lugar: "",
      fecha: "",
      nombreApellidos: "",
      dni: "",
      telefono: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!signature) return;

    setIsGenerating(true);

    try {
      // Formatear fecha de "YYYY-MM-DD" a "Día de Mes de Año"
      const dateParts = data.fecha.split("-");
      let formattedDate = data.fecha;
      if (dateParts.length === 3) {
        const year = dateParts[0];
        const monthIndex = parseInt(dateParts[1], 10) - 1;
        const day = parseInt(dateParts[2], 10);
        const monthName = MESES[monthIndex] || dateParts[1];
        formattedDate = `${day} de ${monthName} de ${year}`;
      }

      // Crear contenedor off-screen
      const container = document.createElement("div");
      
      // Construir el HTML estricto
      container.innerHTML = `
        <div style="width: 800px; padding: 40px; font-family: serif; font-size: 11px; line-height: 1.35; color: #000; text-align: justify; box-sizing: border-box;">
          <p style="font-weight: bold; text-align: center; margin-bottom: 20px; font-size: 14px;">
            CONSENTIMIENTO INFORMADO ACERCA DE LA RECOGIDA DE DATOS PERSONALES PARA USUARIOS DEL PROGRAMA “Ni Un Hogar Sin Energía”
          </p>
          <p style="margin-bottom: 12px;">
            Conforme a lo exigido en la normativa vigente en protección de datos personales se da cumplimiento a la obligación de informar al interesado acerca de los siguientes epígrafes:
          </p>
          
          <div style="margin-bottom: 12px;">
            <p style="font-weight: bold; margin-bottom: 4px;">RESPONSABLE DE SUS DATOS PERSONALES</p>
            <p>Sus datos personales pasarán a disposición de FUNDACIÓN ECOLOGÍA Y DESARROLLO, NIF ESG50503523 Plaza San Bruno 9, 1º Oficinas 50001 Zaragoza Delegado de Protección de Datos: dpo.ecodes@portalartico.es</p>
          </div>

          <div style="margin-bottom: 12px;">
            <p style="font-weight: bold; margin-bottom: 4px;">FINALIDADES</p>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Contactar para dar cita para el asesoramiento energético</li>
              <li>Realizar un diagnóstico energético para emitir un informe personalizado con recomendaciones sobre optimización de los contratos de suministro energético y hábitos y medidas de eficiencia energética en el hogar, así como acompañar en la tramitación del bono social, si aplica.</li>
              <li>Hacer seguimiento de las recomendaciones, para lo cual podremos comunicarnos tanto por teléfono (incluidas apps de mensajería), como por correo postal o electrónico.</li>
            </ul>
          </div>

          <div style="margin-bottom: 12px;">
            <p style="font-weight: bold; margin-bottom: 4px;">LEGITIMACIÓN</p>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Interés legítimo</li>
              <li>Consentimiento del interesado (otorgado firmando el presente formulario).</li>
            </ul>
          </div>

          <div style="margin-bottom: 12px;">
            <p style="font-weight: bold; margin-bottom: 4px;">DESTINATARIOS</p>
            <p>No se cederán datos a terceros, salvo obligación legal, con la excepción del envío de la solicitud de bono social a la comercializadora regulada correspondiente, si aplica. No se realizarán transferencias de datos internacionales.</p>
          </div>

          <div style="margin-bottom: 12px;">
            <p style="font-weight: bold; margin-bottom: 4px;">PLAZOS DE CONSERVACIÓN</p>
            <p>Los datos personales se mantendrán durante el tiempo necesario para la adecuada gestión del servicio proporcionado, o en cualquier caso, durante un periodo de cinco años.</p>
            <p>ECODES se reserva el derecho a usar los resultados del estudio, de manera anonimizada, con fines estadísticos.</p>
          </div>

          <div style="margin-bottom: 12px;">
            <p style="font-weight: bold; margin-bottom: 4px;">DERECHOS</p>
            <p>Usted puede ejercitar los derechos que por normativa de protección de datos personales le asisten (acceso, rectificación, supresión y derecho al olvido, limitación del tratamiento, portabilidad, oposición al tratamiento, revocación del consentimiento otorgado) presencialmente o por correo postal o electrónico en: Ni un hogar sin Energía ECODES, Plaza San Bruno 9, 1º Oficinas 5 Zaragoza 50001 dpo.ecodes@portalartico.es</p>
          </div>

          <div style="margin-bottom: 12px;">
            <p style="font-weight: bold; margin-bottom: 4px;">INFORMACIÓN ADICIONAL</p>
            <p>Puede encontrar más información sobre sus derechos en www.ecodes.org. Igualmente puede obtener más información y/o presentar una reclamación por medio de los datos de contacto del responsable del tratamiento o ante la Agencia Española de Protección de Datos.</p>
            <p>En el caso de que se produzca alguna modificación de sus datos le rogamos que nos comunique por escrito dicha modificación, con la finalidad de mantener actualizados sus datos.</p>
          </div>

          <p style="font-weight: bold; margin-top: 16px; margin-bottom: 24px;">
            Manifiesto que he sido informado de los epígrafes anteriores y EXPRESO MI CONSENTIMIENTO al amparo de la normativa vigente en protección de datos personales.
          </p>
          
          <div style="margin-top: 20px; break-inside: avoid; page-break-inside: avoid;">
            <p style="margin-bottom: 12px;">En <strong>${data.lugar}</strong>, a <strong>${formattedDate}</strong></p>
            
            <div style="margin-bottom: 16px;">
              <p style="margin-bottom: 4px;"><strong>Nombre y apellidos:</strong> ${data.nombreApellidos}</p>
              <p style="margin-bottom: 4px;"><strong>DNI / NIE:</strong> ${data.dni}</p>
              <p style="margin-bottom: 4px;"><strong>Teléfono:</strong> ${data.telefono}</p>
            </div>

            <div>
              <p style="font-weight: bold; margin-bottom: 8px;">Firma del usuario:</p>
              <img src="${signature}" alt="Firma" style="max-width: 200px; max-height: 100px; object-fit: contain; border-bottom: 1px solid #000;" />
            </div>
          </div>
        </div>
      `;

      // Sanitizar el nombre para el archivo
      const safeName = data.nombreApellidos.replace(/[^a-zA-Z0-9]/g, "_");
      const fileName = `LOPD_ECODES_${safeName}.pdf`;

      await generatePDFDocument(container, fileName);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Hubo un error al generar el PDF. Por favor, inténtelo de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Contenedor del Texto Legal Visible */}
      <div className="bg-white border border-gray-300 rounded-md shadow-sm p-6 lg:p-8">
        <div className="max-h-[60vh] overflow-y-auto pr-4 text-sm text-gray-900 leading-relaxed space-y-4 font-serif">
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

      {/* Formulario y Firma */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-300 rounded-md shadow-sm p-6 lg:p-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="lugar" className="block text-sm font-medium text-gray-700">En (Lugar)</label>
            <input
              id="lugar"
              type="text"
              placeholder="Zaragoza"
              {...register("lugar")}
              className={cn(
                "mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-900",
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
                "mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-900",
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
                "mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-900",
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
                "mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-900",
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
                "mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-900",
                errors.telefono ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.telefono && <p className="text-red-500 text-xs">{errors.telefono.message}</p>}
          </div>
        </div>

        {/* Zona de Firma */}
        <div className="pt-4 border-t border-gray-200">
          <SignaturePad 
            onEnd={(base64) => setSignature(base64)} 
            onClear={() => setSignature(null)} 
          />
        </div>

        {/* Botón de Envío */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={!isValid || !signature || isGenerating}
            className={cn(
              "w-full py-3 px-4 rounded-md font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
              isValid && signature && !isGenerating
                ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                : "bg-gray-400 cursor-not-allowed"
            )}
          >
            {isGenerating ? "Generando PDF..." : "Generar Documento PDF"}
          </button>
          {(!isValid || !signature) && (
            <p className="mt-2 text-sm text-center text-gray-500">
              Debes rellenar todos los campos y firmar para generar el documento.
            </p>
          )}
        </div>

      </form>
    </div>
  );
}
