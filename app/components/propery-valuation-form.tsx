"use client"

import { useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"



export default function PropertyValuationForm() {
  const [propertyData, setPropertyData] = useState<PropertyData>({
    propertyType: "",
    propertySubtype: "",
    address: "",
    pricePerSqm: "",
    suites: "",
    bathrooms: "",
    livingRooms: "",
    kitchens: "",
    parkingSpaces: "",
    hasPool: false,
    decorModern: false,
    decorClassic: false,
    decorMinimalist: false,
    decorIndustrial: false,
    decorRustic: false,
    exteriorPaint: "",
    interiorPaint: "",
  })

  const [isEstimating, setIsEstimating] = useState(false)
  const [estimatedPrice, setEstimatedPrice] = useState<string | null>(null)

  const handleEstimatePrice = async () => {
    setIsEstimating(true)
    setEstimatedPrice(null)

    try {
      const response = await fetch("/api/estimate-price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyData,
          address: propertyData.address,
        }),
      })

      const data = await response.json()
      setEstimatedPrice(data.estimatedPrice)
    } catch (error) {
      console.error("Error estimating price:", error)
      setEstimatedPrice("Error estimating price. Please try again.")
    } finally {
      setIsEstimating(false)
    }
  }

  const paintOptions = [
    { value: "1", label: "1 - mal estado" },
    { value: "2", label: "2 - precisa de reparos" },
    { value: "3", label: "3 - condição média" },
    { value: "4", label: "4 - boa condição" },
    { value: "5", label: "5 - completamente novo" },
  ]

  const propertySubtypes = {
    house: [
      { value: "sobrado", label: "Sobrado" },
      { value: "asobradado", label: "Asobradado" },
      { value: "terrea", label: "Térrea" },
      { value: "geminada", label: "Casa Geminada" },
      { value: "palafita", label: "Palafita" },
    ],
    apartment: [
      { value: "flat", label: "Flat" },
      { value: "loft", label: "Loft" },
      { value: "kitnet", label: "Kitnet" },
      { value: "studio", label: "Studio" },
    ],
    warehouse: [
      { value: "industrial", label: "Galpão Industrial" },
      { value: "logistico", label: "Galpão Logístico" },
      { value: "comercial", label: "Galpão Comercial/Armazenamento Convencional" },
      { value: "urbano", label: "Galpão Urbano" },
    ],
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Imóvel</CardTitle>
          <CardDescription>Preencha as informações abaixo para calcular a avaliação do seu imóvel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Tipo do imóvel */}
          <div className="space-y-4 flex">
            <div className="flex flex-col gap-6">
              <div className="space-y-2" >
                <Label htmlFor="propertyType">Tipo do imóvel</Label>
                <Select
                  value={propertyData.propertyType}
                  onValueChange={(value) => 
                    setPropertyData({ ...
                      propertyData, propertyType: value,
                      propertySubtype: "" })}
                >
                  <SelectTrigger id="propertyType">
                    <SelectValue placeholder="Selecione o tipo do imóvel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">Casa</SelectItem>
                    <SelectItem value="apartment">Apartamento</SelectItem>
                    <SelectItem value="warehouse">Galpão</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {propertyData.propertyType && (
                <div className="space-y-2">
                  <Label htmlFor="propertySubtype">
                    {propertyData.propertyType === "house" && "Tipo de Casa"}
                    {propertyData.propertyType === "apartment" && "Tipo de Apartamento"}
                    {propertyData.propertyType === "warehouse" && "Tipo de Galpão"}
                  </Label>
                  <Select
                    value={propertyData.propertySubtype}
                    onValueChange={(value) => setPropertyData({ ...propertyData, propertySubtype: value })}
                  >
                    <SelectTrigger id="propertySubtype">
                      <SelectValue placeholder={propertyData.propertyType === "house" ? "selecione o tipo de casa" : propertyData.propertyType === "apartment" ? "selecione o tipo de apartamento" : "selecione o tipo de galpão"} />
                    </SelectTrigger>
                    <SelectContent>
                      {propertySubtypes[propertyData.propertyType as keyof typeof propertySubtypes]?.map((subtype) => (
                        <SelectItem key={subtype.value} value={subtype.value}>
                          {subtype.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            {propertyData.propertySubtype && (
              <div className="ml-8 flex-1 p-4 border rounded-lg bg-muted">
                <h1 className="mb-4">{`O que é um ${propertyData.propertySubtype}?`}</h1>
                {propertyData.propertyType === "house" && propertyData.propertySubtype === "sobrado" && (
                  <p>Um sobrado é uma casa com dois ou mais andares (pavimentos), caracterizada por sua construção vertical que otimiza o espaço, sendo ideal para terrenos menores em áreas urbanas. Geralmente, as áreas sociais (sala, cozinha) ficam no térreo, e as áreas íntimas (quartos, banheiros) no andar superior, proporcionando mais privacidade, e historicamente surgiu no Brasil Colônia para moradias de senhores nas cidades, aproveitando o espaço sob o piso principal. </p>
                )}
                {propertyData.propertyType === "apartment" && propertyData.propertySubtype === "flat" && (
                  <p>Um flat é um tipo de apartamento que combina características residenciais e hoteleiras, oferecendo comodidades como serviços de limpeza, recepção e, frequentemente, áreas comuns como piscinas e academias. Geralmente, os flats são mobiliados e projetados para estadias de curto a médio prazo, sendo ideais para profissionais em viagens de negócios ou turistas que buscam conveniência e conforto durante sua estadia.</p>
                )}
                {propertyData.propertyType === "warehouse" && propertyData.propertySubtype === "industrial" && (
                  <p>Um galpão industrial é uma estrutura ampla e funcional projetada para abrigar atividades industriais, como fabricação, montagem e armazenamento de produtos. Caracteriza-se por sua construção robusta, com grandes vãos livres, pé-direito elevado e sistemas de ventilação adequados para suportar operações industriais. Esses galpões são essenciais para empresas que necessitam de espaços amplos e adaptáveis para suas operações produtivas.</p>
                )}
              </div>
            )}
          </div>
          {/* Location Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Endereço e Preço</h3>
            <div className="space-y-2">
              <Label htmlFor="address">Endereço do Imóvel</Label>
              <Input
                id="address"
                placeholder="Digite o endereço do imóvel"
                value={propertyData.address}
                onChange={(e) => setPropertyData({ ...propertyData, address: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pricePerSqm">Preço por Metro Quadrado ($)</Label>
              <Input
                id="pricePerSqm"
                type="number"
                placeholder="Digite o preço por metro quadrado"
                value={propertyData.pricePerSqm}
                onChange={(e) => setPropertyData({ ...propertyData, pricePerSqm: e.target.value })}
              />
            </div>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={handleEstimatePrice}
              disabled={isEstimating || !propertyData.address}
            >
              {isEstimating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Estimating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />Não sei o preço - Obtenha uma sugestão de IA
                </>
              )}
            </Button>
            {estimatedPrice && (
              <div className="rounded-lg bg-accent/20 p-4">
                <p className="text-sm font-medium text-accent-foreground">
                  Preço estimado por metro quadrado: {estimatedPrice}
                </p>
              </div>
            )}
          </div>

          {/* Room Count Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contagem de quartos</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="suites">Número de suítes</Label>
                <Input
                  id="suites"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={propertyData.suites}
                  onChange={(e) => setPropertyData({ ...propertyData, suites: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Número de banheiros</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={propertyData.bathrooms}
                  onChange={(e) => setPropertyData({ ...propertyData, bathrooms: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="livingRooms">Número de Salas de Estar</Label>
                <Input
                  id="livingRooms"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={propertyData.livingRooms}
                  onChange={(e) => setPropertyData({ ...propertyData, livingRooms: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kitchens">Número de Cozinhas</Label>
                <Input
                  id="kitchens"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={propertyData.kitchens}
                  onChange={(e) => setPropertyData({ ...propertyData, kitchens: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parkingSpaces">Número de Vagas de Estacionamento</Label>
                <Input
                  id="parkingSpaces"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={propertyData.parkingSpaces}
                  onChange={(e) =>
                    setPropertyData({
                      ...propertyData,
                      parkingSpaces: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Características</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasPool"
                checked={propertyData.hasPool}
                onCheckedChange={(checked) => setPropertyData({ ...propertyData, hasPool: checked as boolean })}
              />
              <Label
                htmlFor="hasPool"
                className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                possui piscina?
              </Label>
            </div>
          </div>

          {/* Decor Types Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Estilo de Decoração</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="decorModern"
                  checked={propertyData.decorModern}
                  onCheckedChange={(checked) =>
                    setPropertyData({
                      ...propertyData,
                      decorModern: checked as boolean,
                    })
                  }
                />
                <Label
                  htmlFor="decorModern"
                  className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Moderno
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="decorClassic"
                  checked={propertyData.decorClassic}
                  onCheckedChange={(checked) =>
                    setPropertyData({
                      ...propertyData,
                      decorClassic: checked as boolean,
                    })
                  }
                />
                <Label
                  htmlFor="decorClassic"
                  className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Clássico
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="decorMinimalist"
                  checked={propertyData.decorMinimalist}
                  onCheckedChange={(checked) =>
                    setPropertyData({
                      ...propertyData,
                      decorMinimalist: checked as boolean,
                    })
                  }
                />
                <Label
                  htmlFor="decorMinimalist"
                  className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Minimalista
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="decorIndustrial"
                  checked={propertyData.decorIndustrial}
                  onCheckedChange={(checked) =>
                    setPropertyData({
                      ...propertyData,
                      decorIndustrial: checked as boolean,
                    })
                  }
                />
                <Label
                  htmlFor="decorIndustrial"
                  className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Industrial
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="decorRustic"
                  checked={propertyData.decorRustic}
                  onCheckedChange={(checked) =>
                    setPropertyData({
                      ...propertyData,
                      decorRustic: checked as boolean,
                    })
                  }
                />
                <Label
                  htmlFor="decorRustic"
                  className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Rustic
                </Label>
              </div>
            </div>
          </div>

          {/* Paint Condition Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Condição da Pintura</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="exteriorPaint">Pintura Externa</Label>
                <Select
                  value={propertyData.exteriorPaint}
                  onValueChange={(value) => setPropertyData({ ...propertyData, exteriorPaint: value })}
                >
                  <SelectTrigger id="exteriorPaint">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {paintOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interiorPaint">Pintura Interna</Label>
                <Select
                  value={propertyData.interiorPaint}
                  onValueChange={(value) => setPropertyData({ ...propertyData, interiorPaint: value })}
                >
                  <SelectTrigger id="interiorPaint">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {paintOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="pt-4">
            <Button className="w-full" size="lg">
              Calcular Avaliação do Imóvel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
