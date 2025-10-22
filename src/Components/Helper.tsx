import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

export function dateFormat(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}
export const optionsCargo = [
  "Administrador Geral",
  "CECADEP",
  "GETI",
  "ASSEJUR",
  "GEAJU",
  "GEFIC",
  "NUDEM",
];

export const optionsNewsStatus = ["Publicado", "Agendado", "Rascunho"];

export const optionsStatus = ["Ativo", "Inativo"];

export function formatDateFromObject(date: any) {
  const day = date.day < 10 ? `0${date.day}` : date.day;
  const month = date.month < 10 ? `0${date.month}` : date.month;
  return `${day}-${month}-${date.year}`;
}

export function formatDateUTC(dateString: string) {
  const [year, month, day] = dateString.split("-");
  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
}

export function exhibitionDateFormat(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export const formatDate = (date: any) => {
  const year = String(date.year).padStart(2, "0");
  const month = String(date.month).padStart(2, "0");
  const day = String(date.day).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function handleKeyPress(
  event: any,
  handleSubmit: any,
  key: string,
  different?: string | string[]
) {
  const differentArray = Array.isArray(different) ? different : [different];

  if (event.key === key && !differentArray.includes(event.target.name)) {
    handleSubmit();
  }
}

export function handleResetResponse() {
  setTimeout(() => {
    window.location.reload();
  }, 2 * 1000);
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/script/gi, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim();
};

export const sanitize = (input: string) => {
    return input
      .replace(/[<>]/g, "")
      .replace(/script/gi, "")
      .replace(/[\u0000-\u001F\u007F]/g, "");
  }

const STOPWORDS = new Set([
  "a",
  "o",
  "os",
  "as",
  "de",
  "do",
  "da",
  "e",
  "em",
  "um",
  "uma",
  "uns",
  "umas",
  "com",
  "sem",
  "por",
  "para",
  "como",
  "que",
  "na",
  "no",
  "nos",
  "nas",
  "ao",
  "aos",
  "à",
  "às",
  "se",
  "já",
  "ou",
  "é",
  "foi",
  "são",
  "ser",
  "está",
  "estavam",
  "estava",
  "será",
  "tem",
  "têm",
]);

export function extractKeywords(input: string): string[] {
  const clean = sanitizeInput(input.toLowerCase());
  return clean
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOPWORDS.has(word));
}

export const maxLenght = 50;

export function logGroup(type: string, data: any) {
  console.groupCollapsed(type);
  console.groupEnd();
}

export function useLastPathSegment(): string {
  const location = useLocation();

  if (location.pathname === "/") {
    return "home";
  }

  const lastSegment = location.pathname.split("/").filter(Boolean).pop();
  return lastSegment || "";
}

export interface IDocument {
  type: string;
  title: string;
  date?: string;
  size?: string;
  downloadLink: string;
  contactText?: string;
  contactLink?: string;
  accessChannelsText?: string;
}

export const dataURLtoFile = (
  dataUrl: string,
  filename: string
): File | null => {
  const arr = dataUrl.split(",");

  if (!arr[0] || !arr[0].includes("data:") || !arr[0].includes(";base64")) {
    console.warn("Formato de dataUrl inválido:", dataUrl);
    return null;
  }

  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    console.warn("MIME type não encontrado em dataUrl:", dataUrl);
    return null;
  }

  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};


export function useIsResponsive(breakpoint = 768): boolean {
  const [isResponsive, setIsResponsive] = useState<boolean>(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsResponsive(window.innerWidth <= breakpoint);
    };

    checkWidth();

    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, [breakpoint]);

  return isResponsive;
}

export const UnitsAndCores = [
  "Sede Florianópolis",
  "Núcleo Regional de Araranguá",
  "Núcleo Regional de Balneário Camboriú",
  "Núcleo Regional de Biguaçu",
  "Núcleo Regional de Blumenau",
  "Núcleo Regional de Brusque",
  "Núcleo Regional de Caçador",
  "Núcleo Regional de Campos Novos",
  "Núcleo Regional de Chapecó",
  "Núcleo Regional de Concórdia",
  "Núcleo Regional de Criciúma",
  "Núcleo Regional de Curitibanos",
  "Núcleo Regional de Itajaí",
  "Núcleo Regional de Jaraguá do Sul",
  "Núcleo Regional de Joaçaba",
  "Núcleo Regional de Joinville",
  "Núcleo Regional de Lages",
  "Núcleo Regional de Mafra",
  "Núcleo Regional de Maravilha",
  "Núcleo Regional de Palhoça",
  "Núcleo Regional de Rio do Sul",
  "Núcleo Regional de São José",
  "Núcleo Regional de São Lourenço do Oeste",
  "Núcleo Regional de São Miguel do Oeste",
  "Núcleo Regional de Tubarão",
  "Núcleo Regional de Xanxerê",
  "Unidade ALESC",

]

export const cities = [
"ABDON BATISTA ",
"ABELARDO LUZ",
"AGROLÂNDIA",
"AGRONÔMICA",
"ÁGUA DOCE",
"ÁGUAS DE CHAPECÓ",
"ÁGUAS FRIAS",
"ÁGUAS MORNAS",
"ALFREDO WAGNER",
"ALTO BELA VISTA",
"ANCHIETA",
"ANGELINA",
"ANITA GARIBALDI",
"ANITÁPOLIS",
"ANTÔNIO CARLOS",
"APIÚNA",
"ARABUTÃ",
"ARAQUARI",
"ARARANGUÁ",
"ARMAZÉM",
"ARROIO TRINTA",
"ARVOREDO",
"ASCURRA",
"ATALANTA",
"AURORA",
"BALNEÁRIO ARROIO DO SILVA",
"BALNEÁRIO BARRA DO SUL",
"BALNEÁRIO CAMBORIÚ",
"BALNEÁRIO GAIVOTA",
"BALNEÁRIO PIÇARRAS",
"BALNEÁRIO RINCÃO",
"BANDEIRANTE",
"BARRA BONITA",
"BARRA VELHA",
"BELA VISTA DO TOLDO",
"BELMONTE",
"BENEDITO NOVO",
"BIGUAÇU",
"BLUMENAU",
"BOCAINA DO SUL",
"BOM JARDIM DA SERRA",
"BOM JESUS",
"BOM JESUS DO OESTE",
"BOM RETIRO",
"BOMBINHAS",
"BOTUVERÁ",
"BRAÇO DO NORTE",
"BRAÇO DO TROMBUDO",
"BRUNÓPOLIS",
"BRUSQUE",
"CAÇADOR",
"CAIBI",
"CALMON",
"CAMBORIÚ",
"CAMPO ALEGRE",
"CAMPO BELO DO SUL",
"CAMPO ERÊ",
"CAMPOS NOVOS",
"CANELINHA",
"CANOINHAS",
"CAPÃO ALTO",
"CAPINZAL",
"CAPIVARI DE BAIXO",
"CATANDUVAS",
"CAXAMBU DO SUL",
"CELSO RAMOS",
"CERRO NEGRO",
"CHAPADÃO DO LAGEADO",
"CHAPECÓ",
"COCAL DO SUL",
"CONCÓRDIA",
"CORDILHEIRA ALTA",
"CORONEL FREITAS",
"CORONEL MARTINS",
"CORREIA PINTO",
"CORUPÁ",
"CRICIÚMA",
"CUNHA PORÃ",
"CUNHATAÍ",
"CURITIBANOS",
"DESCANSO",
"DIONÍSIO CERQUEIRA",
"DONA EMMA",
"DOUTOR PEDRINHO",
"ENTRE RIOS",
"ERMO",
"ERVAL VELHO",
"FAXINAL DOS GUEDES",
"FLOR DO SERTÃO",
"FLORIANÓPOLIS",
"FORMOSA DO SUL",
"FORQUILHINHA",
"FRAIBURGO",
"FREI ROGÉRIO",
"GALVÃO",
"GAROPABA",
"GARUVA",
"GASPAR",
"GOVERNADOR CELSO RAMOS",
"GRÃO PARÁ",
"GRAVATAL",
"GUABIRUBA",
"GUARACIABA",
"GUARAMIRIM",
"GUARUJÁ DO SUL",
"GUATAMBU",
"HERVAL DO OESTE",
"IBIAM",
"IBICARÉ",
"IBIRAMA",
"IÇARA",
"ILHOTA",
"IMARUÍ",
"IMBITUBA",
"IMBUIA",
"INDAIAL",
"IOMERÊ",
"IPIRA",
"IPORÃ DO OESTE",
"IPUAÇU",
"IPUMIRIM",
"IRACEMINHA",
"IRANI",
"IRATI",
"IRINEÓPOLIS",
"ITÁ",
"ITAIÓPOLIS",
"ITAJAÍ",
"ITAPEMA",
"ITAPIRANGA",
"ITAPOÁ",
"ITUPORANGA",
"JABORÁ",
"JACINTO MACHADO",
"JAGUARUNA",
"JARAGUÁ DO SUL",
"JARDINÓPOLIS",
"JOAÇABA",
"JOINVILLE",
"JOSÉ BOITEUX",
"JUPIÁ",
"LACERDÓPOLIS",
"LAGES",
"LAGUNA",
"LAJEADO GRANDE",
"LAURENTINO",
"LAURO MULLER",
"LEBON RÉGIS",
"LEOBERTO LEAL",
"LINDÓIA DO SUL",
"LONTRAS",
"LUIZ ALVES",
"LUZERNA",
"MACIEIRA",
"MAFRA",
"MAJOR GERCINO",
"MAJOR VIEIRA",
"MARACAJÁ",
"MARAVILHA",
"MAREMA",
"MASSARANDUBA",
"MATOS COSTA",
"MELEIRO",
"MIRIM DOCE",
"MODELO",
"MONDAÍ",
"MONTE CARLO",
"MONTE CASTELO",
"MORRO DA FUMAÇA",
"MORRO GRANDE",
"NAVEGANTES",
"NOVA ERECHIM",
"NOVA ITABERABA",
"NOVA TRENTO",
"NOVA VENEZA",
"NOVO HORIZONTE",
"ORLEANS",
"OTACÍLIO COSTA",
"OURO",
"OURO VERDE",
"PAIAL",
"PAINEL",
"PALHOÇA",
"PALMA SOLA",
"PALMEIRA",
"PALMITOS",
"PAPANDUVA",
"PARAÍSO",
"PASSO DE TORRES",
"PASSOS MAIA",
"PAULO LOPES",
"PEDRAS GRANDES",
"PENHA",
"PERITIBA",
"PESCARIA BRAVA",
"PETROLÂNDIA",
"PINHALZINHO",
"PINHEIRO PRETO",
"PIRATUBA",
"PLANALTO ALEGRE",
"POMERODE",
"PONTE ALTA",
"PONTE ALTA DO NORTE",
"PONTE SERRADA",
"PORTO BELO",
"PORTO UNIÃO",
"POUSO REDONDO",
"PRAIA GRANDE",
"PRESIDENTE CASTELO BRANCO",
"PRESIDENTE GETÚLIO",
"PRESIDENTE NEREU",
"PRINCESA",
"QUILOMBO",
"RANCHO QUEIMADO",
"RIO DAS ANTAS",
"RIO DO CAMPO",
"RIO DO OESTE",
"RIO DO SUL",
"RIO DOS CEDROS",
"RIO FORTUNA",
"RIO NEGRINHO",
"RIO RUFINO",
"RIQUEZA",
"RODEIO",
"ROMELÂNDIA",
"SALETE",
"SALTINHO",
"SALTO VELOSO",
"SANGÃO",
"SANTA CECÍLIA",
"SANTA HELENA",
"SANTA ROSA DE LIMA",
"SANTA ROSA DO SUL",
"SANTA TEREZINHA",
"SANTA TEREZINHA DO PROGRESSO",
"SANTIAGO DO SUL",
"SANTO AMARO DA IMPERATRIZ",
"SÃO BENTO DO SUL",
"SÃO BERNARDINO",
"SÃO BONIFÁCIO",
"SÃO CARLOS",
"SÃO CRISTÓVÃO DO SUL",
"SÃO DOMINGOS",
"SÃO FRANCISCO DO SUL",
"SÃO JOÃO BATISTA",
"SÃO JOÃO DO ITAPERIU",
"SÃO JOÃO DO OESTE",
"SÃO JOÃO DO SUL",
"SÃO JOAQUIM",
"SÃO JOSÉ",
"SÃO JOSÉ DO CEDRO",
"SÃO JOSÉ DO CERRITO",
"SÃO LOURENÇO DO OESTE",
"SÃO LUDGERO",
"SÃO MARTINHO",
"SÃO MIGUEL DA BOA VISTA",
"SÃO MIGUEL DO OESTE",
"SÃO PEDRO DE ALCÂNTARA",
"SAUDADES",
"SCHROEDER",
"SEARA",
"SERRA ALTA",
"SIDERÓPOLIS",
"SOMBRIO",
"SUL BRASIL",
"TAIÓ",
"TANGARÁ",
"TIGRINHOS",
"TIJUCAS",
"TIMBÉ DO SUL",
"TIMBÓ",
"TIMBÓ GRANDE",
"TRÊS BARRAS",
"TREVISO",
"TREZE DE MAIO",
"TREZE TÍLIAS",
"TROMBUDO CENTRAL",
"TUBARÃO",
"TUNÁPOLIS",
"TURVO",
"UNIÃO DO OESTE",
"URUBICI",
"URUPEMA",
"URUSSANGA",
"VARGEÃO",
"VARGEM",
"VARGEM BONITA",
"VIDAL RAMOS",
"VIDEIRA",
"VITOR MEIRELES",
"WITMARSUM",
"XANXERÊ",
"XAVANTINA",
"XAXIM",
"ZORTÉA",
]