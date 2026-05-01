import { LegalConsent } from "@/components/LegalConsent";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Consentimiento LOPD
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Por favor, lea el siguiente texto legal y complete sus datos para continuar.
        </p>
      </div>

      <LegalConsent />
    </main>
  );
}
