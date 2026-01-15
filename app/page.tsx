import PropertyValuationForm from "./components/propery-valuation-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Sistema de Avaliação de Imóveis
          </h1>
          <p className="mt-3 text-pretty text-lg text-muted-foreground">
            Insira os detalhes do imóvel para obter uma avaliação precisa
          </p>
        </div>
        <PropertyValuationForm />
      </div>
    </div>
  );
}
