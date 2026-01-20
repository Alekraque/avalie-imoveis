"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Building2, MapPin, DollarSign, BedDouble, Waves, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

const PROPERTY_TYPES = [
  { value: "casa", label: "Casa" },
  { value: "apartamento", label: "Apartamento" },
  { value: "galpao", label: "Galpão" },
]

const CASA_SUBTYPES = [
  { value: "sobrado", label: "Sobrado" },
  { value: "assobradado", label: "Assobradado" },
  { value: "casa-terrea", label: "Casa Térrea" },
  { value: "casa-geminada", label: "Casa Geminada" },
  { value: "palafita", label: "Palafita" },
]

const APARTAMENTO_SUBTYPES = [
  { value: "flat", label: "Flat" },
  { value: "loft", label: "Loft" },
  { value: "kitnet", label: "Kitnet" },
  { value: "studio", label: "Studio" },
  { value: "cobertura", label: "Cobertura" },
  { value: "apartamento-tradicional", label: "Apartamento Tradicional" },
]

const GALPAO_SUBTYPES = [
  { value: "galpao-industrial", label: "Galpão Industrial" },
  { value: "galpao-comercial", label: "Galpão Comercial/Armazenamento Convencional" },
  { value: "galpao-logistico", label: "Galpão Logístico" },
  { value: "galpao-urbano", label: "Galpão Urbano" },
]

const CONDITION_OPTIONS = [
  { value: "1", label: "1 - Mal estado" },
  { value: "2", label: "2 - Precisa de reparos" },
  { value: "3", label: "3 - Condição média" },
  { value: "4", label: "4 - Boa condição" },
  { value: "5", label: "5 - Completamente novo" },
]

const POOL_VALUE_OPTIONS = [
  { value: "1", label: "Tem piscina, mas não influencia na decisão de compra." },
  { value: "2", label: "Tem piscina, mas não é um diferencial decisivo." },
  { value: "3", label: "A piscina é um bom atrativo, mas não essencial." },
  { value: "4", label: "A piscina é um diferencial importante na decisão." },
  { value: "5", label: "Piscina é um dos principais motivos da compra." },
]

const STEP_BUTTONS = [
  { next: "Continuar para Preço", prev: "" },
  { next: "Continuar para Cômodos", prev: "Voltar" },
  { next: "Continuar para Detalhes", prev: "Voltar" },
  { next: "Finalizar Avaliação", prev: "Voltar" },
]

interface FormData {
  propertyType: string
  propertySubtype: string
  cep: string
  numero: string
  precoMetroQuadrado: string
  quartos: number
  suites: number
  banheiros: number
  banheirosComChuveiro: number
  cozinhas: number
  vagas: number
  possuiPiscina: string
  tamanhoPiscina: string
  piscinaAquecimento: boolean
  piscinaIluminacao: boolean
  piscinaCondicao: string
  piscinaValor: string
  pinturaExterna: string
  pinturaInterna: string
  mobilhado: string
  condicaoMobilia: string
}

export function AvaliaAiForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    propertyType: "",
    propertySubtype: "",
    cep: "",
    numero: "",
    precoMetroQuadrado: "",
    quartos: 0,
    suites: 0,
    banheiros: 0,
    banheirosComChuveiro: 0,
    cozinhas: 0,
    vagas: 0,
    possuiPiscina: "",
    tamanhoPiscina: "",
    piscinaAquecimento: false,
    piscinaIluminacao: false,
    piscinaCondicao: "",
    piscinaValor: "",
    pinturaExterna: "",
    pinturaInterna: "",
    mobilhado: "",
    condicaoMobilia: "",
  })

  const getSubtypes = () => {
    switch (formData.propertyType) {
      case "casa":
        return CASA_SUBTYPES
      case "apartamento":
        return APARTAMENTO_SUBTYPES
      case "galpao":
        return GALPAO_SUBTYPES
      default:
        return []
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      console.log("Form submitted:", formData)
      alert("Avaliação finalizada! Dados enviados com sucesso.")
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generateRange = (max: number) => {
    return Array.from({ length: max + 1 }, (_, i) => i)
  }

  const stepIcons = [
    <Building2 key="building" className="size-5" />,
    <DollarSign key="dollar" className="size-5" />,
    <BedDouble key="bed" className="size-5" />,
    <Waves key="waves" className="size-5" />,
  ]

  const stepTitles = [
    "Tipo do Imóvel",
    "Valor do Metro Quadrado",
    "Estrutura do Imóvel",
    "Detalhes e Condições",
  ]

  const stepDescriptions = [
    "Selecione o tipo e localização do imóvel",
    "Informe o valor do metro quadrado na região",
    "Descreva a estrutura interna do imóvel",
    "Informe os detalhes adicionais e condições",
  ]

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[0, 1, 2, 3].map((step) => (
          <div
            key={step}
            className={`flex items-center ${step < 3 ? "flex-1" : ""}`}
          >
            <div
              className={`flex items-center justify-center size-10 rounded-full border-2 transition-all duration-300 ${
                step === currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : step < currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/30 text-muted-foreground"
              }`}
            >
              {step + 1}
            </div>
            {step < 3 && (
              <div
                className={`h-1 flex-1 mx-2 rounded-full transition-all duration-300 ${
                  step < currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <Card className="relative overflow-hidden">
        <CardHeader className="text-center border-b pb-6">
          <div className="flex items-center justify-center gap-2 text-primary mb-2">
            {stepIcons[currentStep]}
            <span className="text-sm font-medium">Etapa {currentStep + 1} de 4</span>
          </div>
          <CardTitle className="text-2xl">{stepTitles[currentStep]}</CardTitle>
          <CardDescription>{stepDescriptions[currentStep]}</CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentStep * 100}%)` }}
            >
              {/* Step 1 - Property Type */}
              <div className="w-full shrink-0 px-1">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Tipo do Imóvel</Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, propertyType: value, propertySubtype: "" })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o tipo do imóvel" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROPERTY_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.propertyType && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <Label htmlFor="propertySubtype">Subtipo do Imóvel</Label>
                      <Select
                        value={formData.propertySubtype}
                        onValueChange={(value) =>
                          setFormData({ ...formData, propertySubtype: value })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o subtipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {getSubtypes().map((subtype) => (
                            <SelectItem key={subtype.value} value={subtype.value}>
                              {subtype.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cep">
                        <MapPin className="size-4 inline mr-1" />
                        CEP
                      </Label>
                      <Input
                        id="cep"
                        placeholder="00000-000"
                        value={formData.cep}
                        onChange={(e) =>
                          setFormData({ ...formData, cep: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numero">Número</Label>
                      <Input
                        id="numero"
                        placeholder="123"
                        value={formData.numero}
                        onChange={(e) =>
                          setFormData({ ...formData, numero: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 - Price */}
              <div className="w-full shrink-0 px-1">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="precoMetroQuadrado">
                      Valor do Metro Quadrado (R$)
                    </Label>
                    <Input
                      id="precoMetroQuadrado"
                      type="number"
                      placeholder="Ex: 5000"
                      value={formData.precoMetroQuadrado}
                      onChange={(e) =>
                        setFormData({ ...formData, precoMetroQuadrado: e.target.value })
                      }
                    />
                  </div>

                  <Button
                    variant="outline"
                    className="w-full gap-2 border-dashed bg-transparent"
                    type="button"
                  >
                    <Sparkles className="size-4" />
                    Não sei o preço - Obtenha uma sugestão de IA
                  </Button>
                </div>
              </div>

              {/* Step 3 - Rooms */}
              <div className="w-full shrink-0 px-1">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quartos">Número de Quartos</Label>
                      <Input
                        id="quartos"
                        type="number"
                        min={0}
                        max={20}
                        value={formData.quartos}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            quartos: Math.min(20, Math.max(0, parseInt(e.target.value) || 0)),
                            suites: Math.min(
                              formData.suites,
                              Math.min(20, Math.max(0, parseInt(e.target.value) || 0))
                            ),
                          })
                        }
                      />
                    </div>
                    {formData.quartos > 0 && (
                      <div className="space-y-2 animate-in fade-in slide-in-from-right-2 duration-300">
                        <Label htmlFor="suites">Quantos são Suítes?</Label>
                        <Select
                          value={formData.suites.toString()}
                          onValueChange={(value) =>
                            setFormData({ ...formData, suites: parseInt(value) })
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {generateRange(formData.quartos).map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="banheiros">Número de Banheiros</Label>
                      <Input
                        id="banheiros"
                        type="number"
                        min={0}
                        max={10}
                        value={formData.banheiros}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            banheiros: Math.min(10, Math.max(0, parseInt(e.target.value) || 0)),
                            banheirosComChuveiro: Math.min(
                              formData.banheirosComChuveiro,
                              Math.min(10, Math.max(0, parseInt(e.target.value) || 0))
                            ),
                          })
                        }
                      />
                    </div>
                    {formData.banheiros > 0 && (
                      <div className="space-y-2 animate-in fade-in slide-in-from-right-2 duration-300">
                        <Label htmlFor="banheirosComChuveiro">Quantos têm Chuveiro?</Label>
                        <Select
                          value={formData.banheirosComChuveiro.toString()}
                          onValueChange={(value) =>
                            setFormData({ ...formData, banheirosComChuveiro: parseInt(value) })
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {generateRange(formData.banheiros).map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cozinhas">Número de Cozinhas</Label>
                      <Input
                        id="cozinhas"
                        type="number"
                        min={0}
                        value={formData.cozinhas}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            cozinhas: Math.max(0, parseInt(e.target.value) || 0),
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vagas">Vagas de Garagem</Label>
                      <Input
                        id="vagas"
                        type="number"
                        min={0}
                        value={formData.vagas}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            vagas: Math.max(0, parseInt(e.target.value) || 0),
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 - Details */}
              <div className="w-full shrink-0 px-1">
                <div className="space-y-6">
                  {/* Pool Section */}
                  <div className="space-y-4 p-4 rounded-lg bg-muted/50">
                    <div className="space-y-2">
                      <Label htmlFor="possuiPiscina">Possui Piscina?</Label>
                      <Select
                        value={formData.possuiPiscina}
                        onValueChange={(value) =>
                          setFormData({ ...formData, possuiPiscina: value })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sim">Sim</SelectItem>
                          <SelectItem value="nao">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.possuiPiscina === "sim" && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="space-y-2">
                          <Label htmlFor="tamanhoPiscina">Tamanho da Piscina (m²)</Label>
                          <Input
                            id="tamanhoPiscina"
                            type="number"
                            min={0}
                            placeholder="Ex: 30"
                            value={formData.tamanhoPiscina}
                            onChange={(e) =>
                              setFormData({ ...formData, tamanhoPiscina: e.target.value })
                            }
                          />
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="piscinaAquecimento"
                              checked={formData.piscinaAquecimento}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  piscinaAquecimento: checked as boolean,
                                })
                              }
                            />
                            <Label htmlFor="piscinaAquecimento" className="cursor-pointer">
                              Possui Aquecimento
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="piscinaIluminacao"
                              checked={formData.piscinaIluminacao}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  piscinaIluminacao: checked as boolean,
                                })
                              }
                            />
                            <Label htmlFor="piscinaIluminacao" className="cursor-pointer">
                              Possui Iluminação
                            </Label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="piscinaCondicao">Condição Estética da Piscina</Label>
                          <Select
                            value={formData.piscinaCondicao}
                            onValueChange={(value) =>
                              setFormData({ ...formData, piscinaCondicao: value })
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione a condição" />
                            </SelectTrigger>
                            <SelectContent>
                              {CONDITION_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="piscinaValor">
                            Qual o valor da piscina para a compra?
                          </Label>
                          <Select
                            value={formData.piscinaValor}
                            onValueChange={(value) =>
                              setFormData({ ...formData, piscinaValor: value })
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o valor" />
                            </SelectTrigger>
                            <SelectContent>
                              {POOL_VALUE_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Paint Condition */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pinturaExterna">Condição da Pintura Externa</Label>
                      <Select
                        value={formData.pinturaExterna}
                        onValueChange={(value) =>
                          setFormData({ ...formData, pinturaExterna: value })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {CONDITION_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pinturaInterna">Condição da Pintura Interna</Label>
                      <Select
                        value={formData.pinturaInterna}
                        onValueChange={(value) =>
                          setFormData({ ...formData, pinturaInterna: value })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {CONDITION_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Furnished */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobilhado">O Imóvel está Mobiliado?</Label>
                      <Select
                        value={formData.mobilhado}
                        onValueChange={(value) =>
                          setFormData({ ...formData, mobilhado: value })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sim">Sim</SelectItem>
                          <SelectItem value="nao">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.mobilhado === "sim" && (
                      <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <Label htmlFor="condicaoMobilia">Condição da Mobília</Label>
                        <Select
                          value={formData.condicaoMobilia}
                          onValueChange={(value) =>
                            setFormData({ ...formData, condicaoMobilia: value })
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a condição" />
                          </SelectTrigger>
                          <SelectContent>
                            {CONDITION_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="gap-2 bg-transparent"
            >
              <ChevronLeft className="size-4" />
              {STEP_BUTTONS[currentStep].prev || "Voltar"}
            </Button>
            <Button onClick={handleNext} className="gap-2">
              {STEP_BUTTONS[currentStep].next}
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
