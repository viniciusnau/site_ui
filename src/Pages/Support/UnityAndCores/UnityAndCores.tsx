import React from 'react'
import FAQ from '../../../Components/FAQ/FAQ'
import style from './UnityAndCores.module.css'

function AreaOfActivity() {
    const data =[
        {
            question: "Sede Florianópolis",
            subContent: [
            {
                question: "Sede Florianópolis",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370", "48 . 3665 6589", "48 . 3665 6654"],
                workTime: [" De segunda à quinta a partir das 8h.", "De segunda à sexta das 12h às 19h. "],
                details: ["Distribuição de senhas: ", "Horário de Funcionamento: "],
            },
            {
                question: "1ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Caroline Kohler Teixeira",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", " 48 . 3665 6586 "],
                email: ["triagemcapital@defensoria.sc.def.br", "capital01@defensoria.sc.def.br"],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description: `- Supervisão da triagem (em equidade com as 8ª Defensoria Pública da Capital, 22ª Defensoria Pública da Capital e 26ª Defensoria Pública da Capital)
- Atendimento e ajuizamento de 1/2 de iniciais relacionadas à área cível e bancária dos(as) residentes de Florianópolis perante as Unidades Jurisdicionais da Comarca da Capital, excetuadas as de competência específica das 14ª, 18ª, 20ª, 21ª e 25ª Defensorias Públicas da Capital
- 1ª Atuação Conflitante na 26ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 25ª Defensoria Pública da Capital (no ajuizamento das iniciais da área cível e bancária), em equidade com a 26ª Defensoria Pública da Capital `
            },      {
                question: "2ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Jose Eduardo da Silva Santos",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: [" 48 . 3665 7675 "],
                email: [" capital02@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description: ` Suspenso: MANIFESTAÇÃO CSDPESC Nº 258-2024
Suspensão da 2ª DPCAP e integração das atribuições da 16ª DPCAP nas atribuições da 2ª DPCAP
`
            },      {
                question: "3ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Renan Soares de Souza",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370", "48 . 3665 6589 ", "48 . 3665 6654 ", "48 . 3665 5709"],
                email: ["capital03@defensoria.sc.gov.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description: `- 4ª Vara Cível
- 6ª Vara Cível
- Juizado Especial Cível do Norte da Ilha
- Vara de Cumprimento de Sentenças Cíveis e Execuções Extrajudiciais (exclusivamente nas sentenças decorrentes da sua competência cível)
- 1ª Atuação Conflitante na 5ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 13ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 24ª Defensoria Pública da Capital

Obs: Nas causas abaixo de 20 salários-mínimos fica facultada a participação do(a) Defensor(a) Público(a) na audiência de conciliação. Todavia, excepcionalmente, nos termos do artigo 9º da Lei nº 9.099/1995 sua presença poderá ser exigida. `
            },      {
                question: "4ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Ralf Zimmer Junior",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6712 "],
                email: [" capital04@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description: ` - 2ª Vara Criminal - 1ª Atuação Conflitante na 7ª Defensoria Pública da Capital, exclusivamente na defesa do réu da Vara do Tribunal do Júri - 2ª Atuação Conflitante na 29ª Defensoria Pública da Capital - 2ª Atuação Conflitante na 6ª Defensoria Pública da Capital - 3ª Atuação Conflitante na 19ª Defensoria Pública da Capital

- 2ª Vara Criminal
- 1ª Atuação Conflitante na 7ª Defensoria Pública da Capital, exclusivamente na defesa do réu da Vara do Tribunal do Júri
- 2ª Atuação Conflitante na 29ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 6ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 19ª Defensoria Pública da Capital  `
            },      {
                question: "5ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Glenda Rose Gonçalves Chaves",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6593 ", " 48 . 3665 7647 "],
                email: ["capital05@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description: `5ª Vara Cível
-Juizado Especial Cível do Foro do Continente
-Juizado Especial Cível e Criminal da Universidade Federal de Santa Catarina, exclusivamente nos feitos de natureza cível
-Unidade Estadual de Direito Bancário, exclusivamente em favor de residentes na Capital
-Vara de Cumprimento de Sentenças Cíveis e Execuções Extrajudiciais (exclusivamente nas sentenças decorrentes da sua competência cível)
-1ª Atuação Conflitante na 13ª Defensoria Pública da Capital
-2ª Atuação Conflitante na 24ª Defensoria Pública da Capital
-3ª Atuação Conflitante na 3ª Defensoria Pública da Capital

Obs: Nas causas abaixo de 20 salários-mínimos fica facultada a participação do(a) Defensor(a) Público(a) na audiência de conciliação. Todavia, excepcionalmente, nos termos do artigo 9º da Lei nº 9.099/1995 sua presença poderá ser exigida `
            },      {
                question: "6ª DEFENSORIA PÚBLICA DA CAPITAL *(Suspensa)",
                people: "Cassio Kury Lopes",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370", "48 . 3665 6589 ", "  48 . 3665 6654", " 48 . 3665 6587 "],
                email: ["triagemcapital@defensoria.sc.def.br ", " capital06@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description: ` - 4ª Vara Criminal
- 1ª Atuação Conflitante na 4ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 19ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 2ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 28ª Defensoria Pública da Capital

Obs: Obs: Ocupando cargo na Administração Superior
Suspenso: Manifestação CSDPESC nº 262-2024, de 11/10/2024 `
            },      {
                question: "7ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Fernanda Mambrini Rudolfo",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: [" 48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", "  48 . 3665 6382  "],
                email: ["triagemcapital@defensoria.sc.def.br", " capital07@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description: ` Atuação na defesa do réu da Vara do Tribunal do Júri
Atuação na defesa da vítima e sucessão dos crimes vinculados às 1ª, 2ª, 3ª, 4ª e 5ª Varas Criminais da Capital, sendo que a vítima da Vara do Tribunal do Júri deverá ser encaminhada ao(à) respectivo(a) conflitante
- 1ª Atuação Conflitante da 21ª Defensoria Pública da Capital
- 1ª Atuação Conflitante na 25ª Defensoria Pública da Capital (no que tange à orientação e assistência jurídica às vítimas de violência doméstica e familiar contra a mulher)
- 4ª Atuação Conflitante na 2ª, 4ª, 6ª, 19ª, 27ª, 28ª e 29ª Defensorias Públicas da Capital. `
            },      {
                question: "8ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Adauto Felipe Colombo",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", " 48 . 3665 7572 "],
                email: ["triagemcapital@defensoria.sc.def.br", "capital08@defensoria.sc.def.br"],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description: `  Supervisão da triagem (em equidade com as 1ª Defensoria Pública da Capital, 22ª Defensoria Pública da Capital e 26ª Defensoria Pública da Capital)
Atendimento e ajuizamento de 1/2 de iniciais relacionadas à área de família (excetuadas as ações revisionais de alimentos relacionadas ao direito de defesa em processos em curso nas Unidades Jurisdicionais da Comarca da Capital e os cumprimentos de decisões liminares, bem como as relacionadas à mulher vítima de violência doméstica)
- 1ª Atuação Conflitante na 22ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 25ª Defensoria Pública da Capital (no ajuizamento das iniciais de família), em equidade com a 22ª Defensoria Pública da Capital `
            },      {
                question: "9ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Melina Camara Brigagão Müller",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", " 48 . 3665 6713"],
                email: ["triagemcapital@defensoria.sc.def.br", "capital09@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description: `- 1ª Vara da Família e Órfãos
- 1ª Atuação Conflitante na 12ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 30ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 10ª Defensoria Pública da Capital
- 4ª Atuação Conflitante na 11ª Defensoria Pública da Capital `
            },      {
                question: "10ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Luciane Krichenko Gewehr",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 7653 "],
                email: [" capital10@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description: ` - 2ª Vara da Família e Órfãos
- 1ª Atuação Conflitante na 30ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 12ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 11ª Defensoria Pública da Capital
- 4ª Atuação Conflitante na 9ª Defensoria Pública da Capital `
            },      {
                question: "11ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "George Lucas Flores Sodré",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", "  48 . 3665 6373 "],
                email: ["triagemcapital@defensoria.sc.def.br", "capital11@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description:` Vara da Família do Foro do Continente
- 1ª Atuação Conflitante na 10ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 9ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 12ª Defensoria Pública da Capital
- 4ª Atuação Conflitante na 30ª Defensoria Pública da Capital `
            },      {
                question: "12ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Conceição Raquel Melo Sabat",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", " 48 . 3665 6590 "],
                email: ["triagemcapital@defensoria.sc.def.br", " capital12@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description:` - Vara da Família e Órfãos do Norte da Ilha, em equidade, com a 30ª Defensoria Pública da Capital
- Juizado Especial Cível e Criminal da UFSC, exclusivamente nos feitos relativos à área de família, em equidade, com a 30ª Defensoria Pública da Capital
- 1ª Atuação Conflitante na 9ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 11ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 30ª Defensoria Pública da Capital
- 4ª Atuação Conflitante na 10ª Defensoria Pública da Capital
`,
            },      {
                question: "13ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Marcel Mangili Laurindo",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", " 48 . 3665 5710 "],
                email: ["triagemcapital@defensoria.sc.def.br", " capital13@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description:`

- 2ª Vara Cível
- 7ª Vara Cível da Capital – Continente
- 1ª Juizado Especial Cível
- Vara Regional de Recuperações Judiciais, Falências e Concordatas, exclusivamente em favor de residentes em Florianópolis
- Vara de Cumprimento de Sentenças Cíveis e Execuções Extrajudiciais (exclusivamente nas sentenças decorrentes da sua competência cível)
- 1ª Atuação Conflitante na 24ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 3ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 5ª Defensoria Pública da Capital

Obs: Nas causas abaixo de 20 salários-mínimos fica facultada a participação do(a) Defensor(a) Público(a) na audiência de conciliação. Todavia, excepcionalmente, nos termos do artigo 9º da Lei nº 9.099/1995 sua presença poderá ser exigida. `,
            },      {
                question: "14ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Dayana Luz",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", " 48 . 3665 6583 "],
                email: ["triagemcapital@defensoria.sc.def.br", "capital14@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description:` Atendimento e ajuizamento de 1/2 das ações vinculadas às 1ª, 2ª, 3ª Varas da Fazenda Pública e Juizado Especial da Fazenda Pública dos(as) residentes de Florianópolis
Acompanhamento das 1ª Vara da Fazenda Pública, 2ª Vara da Fazenda Pública, 3ª Vara da Fazenda Pública e Vara de Execuções contra a Fazenda Pública e Precatórios
1ª Atuação Conflitante na 18ª Defensoria Pública da Capital
2ª Atuação Conflitante na 20ª Defensoria Pública da Capital (perante a Vara de Execuções Fiscais Municipais e Estaduais)
3ª Atuação Conflitante na 20ª Defensoria Pública da Capital (perante a Vara de Sucessões e Registros Públicos).

Obs: Quando não necessitarem de capacidade postulatória específica de Defensor Público, as demandas que forem destinadas aos Juizados Especiais Cíveis deverão ser apenas atermadas. `,
            },      {
                question: "15ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Daniel Deggau Bastos",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", "48 . 3665 6719 "],
                email: ["triagemcapital@defensoria.sc.def.br", " capital15@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description:` 4ª Câmara Criminal
5ª Câmara Criminal
Órgão Especial (área criminal)
2ª Vice-Presidência (área criminal)
Câmara de Agravos Internos em Recursos Constitucionais e Conflitos de Competência (área criminal)
Seção Criminal
1º Grupo de Direito Criminal
2º Grupo de Direito Criminal
1ª Atuação Conflitante na 16ª Defensoria Pública da Capital
2ª Atuação Conflitante na 17ª Defensoria Pública da Capital
3ª Atuação Conflitante na 23ª Defensoria Pública da Capital
Obs: a) a atuação da 15ª Defensoria Pública da Capital no segundo grau ocorrerá a partir da prolação de decisões pelo Tribunal de Justiça em recursos interpostos ou ações ajuizadas pela Defensoria Pública; b) a apresentação de razões ou contrarrazões (em apelação, agravo de instrumento, agravo em execução penal, recurso em sentido estrito, habeas corpus, mandado de segurança, revisão criminal e outros recursos ou ações originárias) e o manejo de ações originárias perante o Tribunal de Justiça (habeas corpus, mandado de segurança, revisão criminal e outras) são atribuições do Órgão de Execução com atuação na origem, inclusive nos casos em que a assunção pela Defensoria Pública ocorreu em segundo grau; c) o ajuizamento de revisões criminais deverá observar a Resolução CSDPESC nº 67/2017 e o Provimento COGER nº 7/2017; d) os processos oriundos da Seção Criminal e dos Grupos de Direito Criminal serão divididos equitativamente entre as 15ª, 16ª, 17ª e 23ª Defensorias Públicas da Capital, ressalvada a prevenção; e) os processos oriundos da 5ª Câmara Criminal serão divididos equitativamente entre as 15ª, 16ª, 17ª e 23ª Defensorias Públicas da Capital, ressalvada a prevenção f) os processos oriundos do Órgão Especial serão divididos equitativamente entre as 15ª, 16ª, 17ª e 23ª Defensorias Públicas da Capital, ressalvada a prevenção; g) os processos oriundos da 2ª Vice-Presidência e da Câmara de Agravos Internos em Recursos Constitucionais e Conflitos de Competência serão distribuídos equitativamente entre as 15ª, 16ª, 17ª e 23ª Defensorias Públicas da Capital, ressalvada a prevenção; e h) a atuação da 15ª Defensoria Pública da Capital é restrita aos processos oriundos de Unidades Jurisdicionais de primeiro grau com atuação da Defensoria Pública.
`,
            },      {
                question: "16ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Thiago Burlani Neves",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", " 48 . 3665 6592 "],
                email: ["triagemcapital@defensoria.sc.def.br", "capital16@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description:`- 1ª Câmara Criminal
- 5ª Câmara Criminal
- Órgão Especial (área criminal)
- 2ª Vice-Presidência (área criminal)
- Câmara de Agravos Internos em Recursos Constitucionais e Conflitos de Competência (área criminal)
- Seção Criminal
- 1º Grupo de Direito Criminal
- 2º Grupo de Direito Criminal
-1ª Atuação Conflitante na 17ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 23ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 15ª Defensoria Pública da Capital
- Obs:
a) a atuação da 16ª Defensoria Pública da Capital ocorrerá a partir da prolação de decisões pelo Tribunal de Justiça em recursos interpostos ou ações ajuizadas pela Defensoria Pública;
b) a apresentação de razões ou contrarrazões (em apelação, agravo de instrumento, agravo em execução penal, recurso em sentido estrito, habeas corpus, mandado de segurança, revisão criminal e outros recursos ou ações originárias) e o manejo de ações originárias perante o Tribunal de Justiça (habeas corpus, mandado de segurança, revisão criminal e outras) são atribuições do Órgão de Execução com atuação na origem, inclusive nos casos em que a assunção pela Defensoria Pública ocorreu em segundo grau;
c) o ajuizamento de revisões criminais deverá observar a Resolução CSDPESC nº 67/2017 e o Provimento COGER nº 7/2017;
d) os processos oriundos da Seção Criminal e dos Grupos de Direito Criminal serão divididos equitativamente entre as 15ª, 16ª, 17ª e 23ª Defensorias Públicas da Capital, ressalvada a prevenção;
e) os processos oriundos 5ª Câmara Criminal serão divididos equitativamente entre as 15ª, 16ª, 17ª e 23ª Defensorias Públicas da Capital, ressalvada a prevenção;
f) os processos oriundos do Órgão Especial serão divididos equitativamente entre as 15ª, 16ª, 17ª e 23ª Defensorias Públicas da Capital, ressalvada a prevenção;
g) os processos oriundos da 2ª Vice-Presidência e da Câmara de Agravos Internos em Recursos Constitucionais e Conflitos de Competência serão distribuídos equitativamente entre as 15ª, 16ª, 17ª e 23ª Defensorias Públicas da Capital, ressalvada a prevenção; e
h) a atuação da 16ª Defensoria Pública da Capital é restrita aos processos oriundos de Unidades Jurisdicionais de primeiro grau com atuação da Defensoria Pública. `,
            },      {
                question: "17ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Thiago Yukio Guenka Campos",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", "48 . 3665 7563 "],
                email: ["triagemcapital@defensoria.sc.def.br", " capital17@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description:`- 2ª Câmara Criminal
- 5ª Câmara Criminal
- Órgão Especial (área criminal)
- 2ª Vice-Presidência (área criminal)
- Câmara de Agravos Internos em Recursos Constitucionais e Conflitos de Competência (área criminal)
- Seção Criminal
- 1º Grupo de Direito Criminal
- 2º Grupo de Direito Criminal
- 1ª Atuação Conflitante na 23ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 15ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 16ª Defensoria Pública da Capital
- Obs: a) a atuação da 17ª Defensoria Pública da Capital ocorrerá a partir da prolação de decisões pelo Tribunal de Justiça em recursos interpostos ou ações ajuizadas pela Defensoria Pública;
b) a apresentação de razões ou contrarrazões (em apelação, agravo de instrumento, agravo em execução penal, recurso em sentido estrito, habeas corpus, mandado de segurança, revisão criminal e outros recursos ou ações originárias) e o manejo de ações originárias perante o Tribunal de Justiça (habeas corpus, mandado de segurança, revisão criminal e outras) são atribuições do Órgão de Execução com atuação na origem, inclusive nos casos em que a assunção pela Defensoria Pública ocorreu em segundo grau;
c) o ajuizamento de revisões criminais deverá observar a Resolução CSDPESC nº 67/2017 e o Provimento COGER nº 7/2017;
d) os processos oriundos da Seção Criminal e dos Grupos de Direito Criminal serão divididos equitativamente entre as 15ª, 16ª, 17ª e 23ª Defensorias Públicas da Capital, ressalvada a prevenção;
e) os processos oriundos 5ª Câmara Criminal serão divididos equitativamente entre as 15ª, 16ª, 17ª e 23ª Defensorias Públicas da Capital, ressalvada a prevenção;
f) os processos oriundos do Órgão Especial serão divididos equitativamente entre as 15ª, 16ª, 17ª e 23ª Defensorias Públicas da Capital, ressalvada a prevenção;
g) os processos oriundos da 2ª Vice-Presidência e da Câmara de Agravos Internos em Recursos Constitucionais e Conflitos de Competência serão distribuídos equitativamente entre as 15ª, 16ª, 17ª e 23ª Defensorias Públicas da Capital, ressalvada a prevenção;
h) a atuação da 17ª Defensoria Pública da Capital é restrita aos processos oriundos de Unidades Jurisdicionais de primeiro grau com atuação da Defensoria Pública `,
            },      {
                question: "18ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Tiago Queiroz da Costa",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", " 48 . 3665 7568 "],
                email: ["triagemcapital@defensoria.sc.def.br", " capital18@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description:` - Atendimento e ajuizamento de 1/2 das ações vinculadas às 1ª, 2ª, 3ª Varas da Fazenda Pública e Juizado Especial da Fazenda Pública dos(as) residentes de Florianópolis
- Acompanhamento do Juizado Especial da Fazenda Pública
- 1ª Atuação Conflitante na 14ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 20ª Defensoria Pública da Capital (perante a Vara de Sucessões e Registros Públicos)
- 3ª Atuação Conflitante na 20ª Defensoria Pública da Capital (perante a Vara de Execuções Fiscais Municipais e Estaduais)

Obs: Quando não necessitarem de capacidade postulatória específica de Defensor Público, as demandas que forem destinadas aos Juizados Especiais Cíveis deverão ser apenas atermadas. `,
            },      {
                question: "19ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Raquel Paioli Braun",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", "48 . 3664 2694 "],
                email: ["triagemcapital@defensoria.sc.def.br", "capital19@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description:`- 5ª Vara Criminal
- 1ª Atuação Conflitante na 27ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 6ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 29ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 21ª Defensoria Pública da Capital `,
            },      {
                question: "20ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Lucas de Oliveira Mussi",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", " 48 . 3664 2554 "],
                email: ["triagemcapital@defensoria.sc.def.br", " capital20@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description:`- Atendimento e ajuizamento integral das ações vinculadas à Vara de Sucessões e Registros Públicos e Vara de Execuções Fiscais Municipais e Estaduais dos residentes de Florianópolis..
- Vara de Sucessões e Registros Públicos
- Vara de Execuções Fiscais Municipais e Estaduais
- 1ª Atuação Conflitante na 21ª Defensoria Pública da Capital (em matéria fazendária perante a Vara da Infância e Juventude)
- 2ª Atuação Conflitante na 14ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 18ª Defensoria Pública da Capital `,
            },      {
                question: "21ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Marcelo Scherer da Silva",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", " 48 . 3665 7565 "],
                email: ["triagemcapital@defensoria.sc.def.br", " capital21@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description:`Atendimento e ajuizamento integral das ações vinculadas à Vara da Infância e Juventude, defesa e acompanhamento de demandados(as) em feitos de adoção, guarda, tutela, acolhimento institucional, suspensão e destituição do poder familiar
- 1ª Atuação Conflitante na 20ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 18ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 31ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 14ª Defensoria Pública da Capital `,
            },      {
                question: "22ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Juliano Gonçalves da Silva",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", "48 . 3665 6591 "],
                email: ["triagemcapital@defensoria.sc.def.br", "capital22@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description:`Supervisão da triagem (em equidade com as 1ª Defensoria Pública da Capital, 8ª Defensoria Pública da Capital e 26ª Defensoria Pública da Capital)
Atendimento e ajuizamento de 1/2 de iniciais relacionadas à área de família (excetuadas as ações revisionais de alimentos relacionadas ao direito de defesa em processos em curso nas Unidades Jurisdicionais da Comarca da Capital e os cumprimentos de decisões liminares, bem como as relacionadas à mulher vítima de violência doméstica)
1ª Atuação Conflitante na 8ª Defensoria Pública da Capital
2ª Atuação Conflitante na 25ª Defensoria Pública da Capital (em matéria afeta ao direito de família), em equidade com a 8ª Defensoria Pública da Capital. `,
            },      {
                question: "23ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Ludmila Gradici Carvalho Drumond",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", "  48 . 3665 7561  "],
                email: ["triagemcapital@defensoria.sc.def.br", " capital23@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description:`- 3ª Câmara Criminal
- 5ª Câmara Criminal
- Órgão Especial (área criminal)
- 2ª Vice-Presidência
- Câmara de Agravos Internos em Recursos Constitucionais
- Seção Criminal
- 1º Grupo de Direito Criminal
- 2º Grupo de Direito Criminal
- 1ª Atuação Conflitante na 15ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 16ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 17ª Defensoria Pública da Capital

Obs: a) a atuação da 23ª Defensoria Pública da Capital ocorrerá a partir da prolação de decisões pelo Tribunal de Justiça em recursos interpostos ou ações ajuizadas pela Defensoria Pública;
b) a apresentação de razões ou contrarrazões (em apelação, agravo de instrumento, agravo em execução penal, recurso em sentido estrito, habeas corpus, mandado de segurança, revisão criminal e outros recursos ou ações originárias) e o manejo de ações originárias perante o Tribunal de Justiça (habeas corpus, mandado de segurança, revisão criminal e outras) são atribuições do Órgão de Execução com atuação na origem, inclusive nos casos em que a assunção pela Defensoria Pública ocorreu em segundo grau;
c) o ajuizamento de revisões criminais deverá observar a Resolução CSDPESC nº 67/2017 e o Provimento COGER nº 7/2017;
d) os processos oriundos da Seção Criminal e dos Grupos de Direito Criminal serão divididos equitativamente entre as 15ª, 16ª, 17ª e 23ª Defensorias Públicas da Capital, ressalvada a prevenção;
e) os processos oriundos 5ª Câmara Criminal serão divididos equitativamente entre as 15ª, 16ª, 17ª e 23ª Defensorias Públicas da Capital, ressalvada a prevenção;
f) os processos oriundos do Órgão Especial serão divididos equitativamente entre as 15ª, 16ª, 17ª e 23ª Defensorias Públicas da Capital, ressalvada a prevenção;
g) os processos oriundos da 2ª Vice-Presidência e da Câmara de Agravos Internos em Recursos Constitucionais e Conflitos de Competência serão distribuídos equitativamente entre as 15ª, 16ª, 17ª e 23ª Defensorias Públicas da Capital, ressalvada a prevenção; e
h) a atuação da 23ª Defensoria Pública da Capital é restrita aos processos oriundos de Unidades Jurisdicionais de primeiro grau com atuação da Defensoria Pública. `,
            },      {
                question: "24ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Michele do Carmo Lamaison",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", " 48 . 3665 6721 "],
                email: ["triagemcapital@defensoria.sc.def.br", " capital24@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description:`- 1ª Vara Cível
- 3ª Vara Cível
- 2ª Juizado Especial Cível
- Vara de Cumprimento de Sentenças Cíveis e Execuções Extrajudiciais (exclusivamente nas sentenças decorrentes da sua competência cível e nas execuções extrajudiciais)
- 1ª Atuação Conflitante na 3ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 5ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 13ª Defensoria Pública da Capital
- Obs.: Nas causas abaixo de 20 salários-mínimos fica facultada a participação do(a) Defensor(a) Público(a) na audiência de conciliação. Todavia, excepcionalmente, nos termos do artigo 9º da Lei nº 9.099/1995 sua presença poderá ser exigida. `,
            },      {
                question: "25ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Anne Teive Auras",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", "48 . 3665 7571 "],
                email: ["triagemcapital@defensoria.sc.def.br", " capital25@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description:`- Assistência à mulher em situação de violência de gênero, incluindo o primeiro atendimento, aconselhamento e orientação jurídica
- A propositura de medidas extrajudiciais e/ou judiciais de natureza cível ou criminal, cautelares e/ou principais, para a defesa e promoção dos direitos das mulheres, como aquelas relacionadas ao direito de família, reparação pecuniária, possessórias, dentre outras
- O acompanhamento dos processos em trâmite no Juizado da Violência Doméstica e Familiar da Capital, nos termos dos artigos 27 e 28 da Lei n. 11.340/06, podendo interpor recursos e acompanhá-los em todas as fases do processo
- Atender as usuárias ou pessoas por estas indicadas para prestar-lhes esclarecimentos sobre o andamento dos casos a cargo da Defensoria Pública, podendo solicitar informações ou novos documentos
- Entrevistar as usuárias antes dos atos judiciais a fim de orientá-las quanto aos seus direitos, sua situação processual e para a obtenção de elementos para a elaboração da tese jurídica
- Fazer encaminhamento das usuárias a outros serviços da rede de atendimento às mulheres em situação de violência, públicos ou privados, devendo, para tal, manter contato direto com os(as) representantes de tais serviços e participando da rede de atendimento à mulher
- Promover educação em direitos, em especial quanto à prevenção à violência contra as mulheres e à equidade de gênero
- Promover a representação ao NUDEM quando necessário
- 2ª Atuação Conflitante nas 8ª, 22ª, 26ª e 1ª Defensorias Públicas da Capital. `,
            },      {
                question: "26ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Lorena de Sá Ribeiro",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 ", " 48 . 3665 7566 "],
                email: ["triagemcapital@defensoria.sc.def.br", " capital26@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h.", "Segunda a Sexta, das 13h às 17h."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description:`- Supervisão da triagem (em equidade com as 1ª Defensoria Pública da Capital, 8ª Defensoria Pública da Capital e 22ª Defensoria Pública da Capital)
- Atendimento e ajuizamento de 1/2 de iniciais relacionadas à área cível e bancária dos(as) residentes de Florianópolis perante a Comarca da Capital, (excetuadas as de competência específica das 14ª, 18ª, 20ª, 21ª e 25ª Defensorias Públicas da Capital)
- 1ª Atuação Conflitante na 1ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 25ª Defensoria Pública da Capital (no ajuizamento das iniciais da área cível e bancária), em equidade com a 1ª Defensoria Pública da Capital `,
            },      {
                question: "27ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Bruno Figueiredo da Silveira",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 7644 "],
                email: ["capital27@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 08h às 19h "],
                details: ["Dias e Horários de Atendimento: "],
                description:`- Vara de Execuções Penais
- 1ª Atuação Conflitante na 19ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 21ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 2ª Defensoria Pública da Capital `,
            },      {
                question: "28ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Carlos Azeredo da Silva Teixeira ",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 7645 "],
                email: ["carlosteixeira@defensoria.sc.gov.br","capital28@defensoria.sc.gov.br "],
                description:`- 1ª Vara Criminal
- 1ª Atuação Conflitante na 29ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 27ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 7ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 21ª Defensoria Pública da Capital `,
            },      {
                question: "29ª DEFENSORIA PÚBLICA DA CAPITAL (suspensa*)",
                people: "Renê Beckmann Johann Júnior",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: [" 48 . 3665 7674 "],
                description:` - 3ª Vara Criminal
- 1ª Atuação Conflitante na 2ª Defensoria Pública da Capital
- 1ª Atuação Conflitante na 7ª Defensoria Pública da Capital, exclusivamente na defesa da vítima.
- 2ª Atuação Conflitante na 28ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 32ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 4ª Defensoria Pública da Capital

Obs: Obs: * Suspensa - Manifestação CSDPESC 259-2024, de 26/09/2024
MANIFESTAÇÃO CSDPESC nº 259/2024: O Conselho Superior da Defensoria Pública do Estado de Santa Catarina, no uso de suas atribuições legais, bem como nos termos do art. 3º da Resolução CSDPESC nº 63/2016, e nos termos da decisão proferida na 193ª sessão extraordinária ocorrida em 26 de setembro de 2024, DECIDE, com efeitos a partir de 1º de outubro de 2024, proceder à suspensão provisória das atribuições previstas na Deliberação CSDPESC nº 102/2023 quanto a 29ª Defensoria Pública da Capital. `,
            },      {
                question: "30ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "André Luiz de Souza Araújo",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 7646 "],
                email: ["andrearaujo@defensoria.sc.gov.br", "capital30@defensoria.sc.gov.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h "],
                details: ["Dias e Horários de Atendimento: "],
                description:` - Vara da Família e Órfãos do Norte da Ilha, em equidade, com a 12ª Defensoria Pública da Capital
- Juizado Especial Cível e Criminal da UFSC, exclusivamente nos feitos relativos à área de família, em equidade, com a 12ª Defensoria Pública da Capital
- 1ª Atuação Conflitante na 11ª Defensoria Pública da Capital
- 2ª Atuação Conflitante na 10ª Defensoria Pública da Capital
- 3ª Atuação Conflitante na 9ª Defensoria Pública da Capital
- 4ª Atuação Conflitante na 12ª Defensoria Pública da Capital `,
            },      {
                question: "31ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Enio Gentil Vieira Júnior",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 7609 "],
                email: [" capital31@defensoria.sc.gov.br "],
                workTime: ["De segunda à sexta das 12h às 19h. "],
                details: [" Horário de Funcionamento:"],
                description:` Atuação na área da Infância e Juventude, ressalvadas as atribuições da 21ª Defensoria Pública da Capital
1ª Atuação Conflitante na 32ª Defensoria Pública da Capital
4ª Atuação Conflitante na 4ª Defensoria Pública da Capital, exclusivamente na defesa da vítima
4ª Atuação Conflitante na 6ª Defensoria Pública da Capital
Cooperação com as Defensorias Públicas do Núcleo Regional da Capital `,
            },      {
                question: "32ª DEFENSORIA PÚBLICA DA CAPITAL",
                people: "Rodrigo Tadeu Pimenta de Oliveira",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 7656 "],
                email: [" capital32@defensoria.sc.gov.br "],
                workTime: ["De segunda à sexta das 12h às 19h. "],
                details: ["Horário de Funcionamento: "],
                description:` Atuação integral na área de Direito Militar
1ª Atuação Conflitante na 31ª Defensoria Pública da Capital
4ª Atuação Conflitante na 28ª Defensoria Pública da Capital
4ª Atuação Conflitante na 29ª Defensoria Pública da Capital
Cooperação com as Defensorias Públicas do Núcleo Regional da Capital
`,
            },      {
                question: "DEFENSORIA PÚBLICA DA CAPITAL",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: ["48 . 3665 6370 ", " 48 . 3665 6589 ", " 48 . 3665 6654 "],
                workTime: [" De segunda à sexta das 12h às 19h. "],
                details: ["Horário de Funcionamento: "],
            },
            ],
        },{
            question: "Núcleo Regional de Araranguá",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE ARARANGUÁ",
                address: "Avenida XV de Novembro, 1475, Edifício Classic, sala 101 e 102, Centro, Araranguá/SC - CEP 88900-000 ",
                phone: [" 48 . 3529 0393 ", " 48 . 3529 0394 "],
                email: ["ararangua@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h "],
                details: ["Horário de Funcionamento: "]
            },{
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE ARARANGUÁ",
                people: "Moacyr de Souza Coelho Neto",
                address: "Avenida XV de Novembro, 1475, Edifício Classic, sala 101 e 102, Centro, Araranguá/SC - CEP 88900-000 ",
                phone: [" 48 . 3529 0395 "],
                email: ["ararangua01@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", "Terça a Quinta, das 13h às 15h30 "],
                details: ["Horário de Funcionamento:", " Atendimento Externo:"],
                description:`Atendimento, ajuizamento e acompanhamento de demandas relacionadas à área da saúde
Atendimento, ajuizamento e acompanhamento de demandas relacionadas à área cível da infância e juventude (inclusive o acompanhamento de curadorias especiais)
Atendimento, ajuizamento e acompanhamento de demandas relacionadas à área de família (inclusive o acompanhamento de curadorias especiais)
Atuação na área da execução penal (nos termos do artigo 61 da LEP) `,
            },
            ]
        },{
            question: "Núcleo Regional de Balneário Camboriú",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE BALNEÁRIO CAMBORIÚ",
                address: " Avenida do Estado Dalmo Vieira, nº 4295, Sala 06, Ed. Icon Residence, Centro, Balneário Camboriú/SC - CEP 88330-659 ",
                phone: ["47 . 3398 6175 "],
                email: [" balneariocamboriu@defensoria.sc.def.br ", " triagembalneario@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h "],
                details: ["Horário de Funcionamento:"]
            },{
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CAMBORIÚ (suspensa*)",
                people: "Carla Gerhardt",
                address: " Avenida do Estado Dalmo Vieira, nº 4295, Sala 06, Ed. Icon Residence, Centro, Balneário Camboriú/SC - CEP 88330-659 ",
                phone: ["47 . 3398 6175 "],
                description: ` - Atendimento, ajuizamento e acompanhamento das demandas de Família e Sucessões (polo ativo/parte requerente)
- Atuação na área de registros públicos e educação infantil
- Atuação regionalizada na tutela do direito à saúde, perante as Comarcas de Balneário Camboriú, Camboriú, Porto Belo, Itapema e Tijucas
- 2ª Atuação Conflitante na 1ª Defensoria Pública de Balneário Camboriú
- 2ª Atuação Conflitante na 2ª Defensoria Pública de Balneário Camboriú

Obs: * Suspensa - Manifestação CSDPESC n. 230, de 10 de novembro de 2023 `,
            },{
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE BALNEÁRIO CAMBORIÚ",
                people: "Elinton Cassiano Nolli",
                address: " Avenida do Estado Dalmo Vieira, nº 4295, Sala 06, Ed. Icon Residence, Centro, Balneário Camboriú/SC - CEP 88330-659 ",
                phone: ["47 . 3398 6173 "],
                email: ["balneariocamboriu01@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h "],
                details: [" Horário de Funcionamento:"],
                description: ` - Atuação Integral na área de Família e Sucessões, em equidade com a 2ª Defensoria Pública de Balneário Camboriú, ressalvados os casos de ajuizamento vinculados
- Atuação na área de registros públicos e educação infantil, em equidade com a 2ª Defensoria Pública de Balneário Camboriú
- Supervisão de Triagem
- 1ª Atuação Conflitante na 2ª Defensoria Pública de Balneário Camboriú
- 1ª Atuação Conflitante na 1ª Defensoria Pública de Camboriú `
            },{
                question: "2ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE BALNEÁRIO CAMBORIÚ",
                people: "Ana Carolina Dihl Cavalin ",
                address: " Avenida do Estado Dalmo Vieira, nº 4295, Sala 06, Ed. Icon Residence, Centro, Balneário Camboriú/SC - CEP 88330-659 ",
                phone: [" 47 . 3398 6171 "],
                email: ["balneariocamboriu02@defensoria.sc.def.br"],
                workTime: [" Segunda a Sexta, das 12h às 19h "],
                details: ["Horário de Funcionamento: "],
                description: `- Atuação Integral na área de Família e Sucessões, em equidade com a 1ª Defensoria Pública de Balneário Camboriú, ressalvados os casos de ajuizamento vinculados
- Atuação na área de registros públicos e educação infantil, em equidade com a 1ª Defensoria Pública de Balneário Camboriú
- Assistência à mulher em situação de violência de gênero (atendimento, aconselhamento e orientação jurídica e ajuizamento e acompanhamento de medidas protetivas de urgência)
- 1ª Atuação Conflitante na 1ª Defensoria Pública de Balneário Camboriú
- 2ª Atuação Conflitante na 1ª Defensoria Pública de Camboriú `
            },
            ]
        },{
            question: "Núcleo Regional de Biguaçu",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE BIGUAÇU",
                address: " Rua Prefeito Paulo Frederico Alves Wildner, 195, Bairro Universitário, Biguaçu/SC - CEP 88160-070 ",
                phone: [" 48 . 3665 4107"],
                email:[" triagembiguacu@defensoria.sc.gov.br ", " biguacu@defensoria.sc.gov.br " ],
                workTime: [" Segundas, terças, quartas e quintas, das 13h às 18h "],
                details: [ "Horário de Funcionamento: "]
            },        {
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE BIGUAÇU",
                people: "Fernando Hollanda Ribeiro",
                address: " Rua Prefeito Paulo Frederico Alves Wildner, 195, Universitário, Biguaçu/SC - CEP 88160-070 ",
                phone: [" 48 . 3665 4106 "],
                email: [" biguacu01@defensoria.sc.gov.br "],
                workTime: [" Segundas, terças, quartas e quintas, das 13h às 18h "],
                details: ["Horário de Funcionamento: "],
                description: ` Atuação integral, em equidade com a 2ª Defensoria Pública de Biguaçu, ressalvada a atuação criminal
Atuação Conflitante na 2ª Defensoria Pública de Biguaçu `
            },        {
                question: "2ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE BIGUAÇU",
                people: "André Borges Braga",
                address: " Rua Prefeito Paulo Frederico Alves Wildner, 195, Bairro Universitário, Biguaçu/SC - CEP 88161-04 ",
                phone: ["48 . 3665 4108 "],
                email: [" biguacu02@defensoria.sc.gov.br "],
                workTime: ["  Segundas, terças, quartas e quintas, das 13h às 18h. "],
                details: ["Dias e Horários de Atendimento:"],
                description: `Atuação integral, em equidade com a 1ª Defensoria Pública de Biguaçu, ressalvada a atuação criminal
Supervisão da triagem
Atuação Conflitante na 1ª Defensoria Pública de Biguaçu `
            },
            ]
        },{
            question: "Núcleo Regional de Blumenau",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE BLUMENAU",
                address: "Rua Joinville, nº 860, Vila Nova, Blumenau/SC - CEP 89035-200 ",
                phone: ["47 . 3378 8436 "],
                email:["triagemblumenau@defensoria.sc.def.br "],
                workTime: ["  de 2ª a 6ª feira, das 12:00h às 19:00h "],
                details: ["Horário de Atendimento Presencial: "]
            },{
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE BLUMENAU",
                people: "Arthur Herman Calabria Lundgren de Albuquerque",
                address: "Rua Joinville, nº 860, Vila Nova, Blumenau/SC - CEP 89035-200  ",
                phone: [" 47 . 99223 5108 "],
                email:[" blumenau01@defensoria.sc.def.br "],
                workTime: ["de 2ª a 6ª feira, das 12:00h às 19:00h "],
                details: ["Horário de Atendimento Presencial: "],
                description: `

- 2ª Vara Criminal
- 1ª Atuação Conflitante na 7ª Defensoria Pública de Blumenau
- 2ª Atuação Conflitante na 5ª Defensoria Pública de Blumenau
- 3ª Atuação Conflitante na 3ª Defensoria Pública de Blumenau `
            },{
                question: "2ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE BLUMENAU",
                people:"Jair José Della Libera",
                address: " Rua Joinville, nº 860, Vila Nova, Blumenau/SC - CEP 89035-200 ",
                phone: [" 47 . 99159 1618 "],
                email:["blumenau02@defensoria.sc.def.br "],
                workTime: ["de 2ª a 6ª feira, das 12:00h às 19:00h "],
                details: ["Horário de Atendimento Presencial:"],
                description:`- Atuação Integral na área da Execução Penal, inclusive Tutela Coletiva
- 1ª Atuação Conflitante na 8ª Defensoria Pública de Blumenau
- 2ª Atuação Conflitante na 1ª Defensoria Pública de Blumenau
- 3ª Atuação Conflitante na 7ª Defensoria Pública de Blumenau `
            },{
                question: "3ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE BLUMENAU",
                people:"Albert Silva Lima",
                address: " Rua Joinville, nº 860, Vila Nova, Blumenau/SC - CEP 89035-200 ",
                phone: ["47 . 99211 2231 "],
                email:[" blumenau03@defensoria.sc.def.br "],
                workTime: ["de 2ª a 6ª feira, das 12:00h às 19:00h "],
                details: ["Horário de Atendimento Presencial: "],
                description:` - 2ª Vara de Família
- 1ª e 2ª Varas da Família em equidade com a 6ª Defensoria Pública de Blumenau (ressalvados os casos de ajuizamento vinculados)
- 1ª Atuação Conflitante na 6ª Defensoria Pública de Blumenau
- 2ª Atuação Conflitante na 8ª Defensoria Pública de Blumenau
- 3ª Atuação Conflitante na 1ª Defensoria Pública de Blumenau
`
            },{
                question: "4ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE BLUMENAU",
                people:"Jorge Calil Canut Neto",
                address: " Rua Joinville, nº 860, Vila Nova, Blumenau/SC - CEP 89035-200 ",
                phone: [" 47 . 99163 0590 "],
                email:[" blumenau04@defensoria.sc.def.br "],
                workTime: ["de 2ª a 6ª feira, das 12:00h às 19:00h "],
                details: [" Horário de Atendimento Presencial: "],
                description:`- Atuação Integral na área da Fazenda Pública, inclusive Tutela Coletiva, ressalvadas as atribuições coletivas específicas nas áreas da Execução Penal, Infância e Juventude e Cível
- 1ª Atuação Conflitante na 5ª Defensoria Pública de Blumenau
- 2ª Atuação Conflitante na 7ª Defensoria Pública de Blumenau
- 3ª Atuação Conflitante na 2ª Defensoria Pública de Blumenau `
            },{
                question: "5ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE BLUMENAU",
                people:"Everton Torres",
                address: " Rua Joinville, nº 860, Vila Nova, Blumenau99188-6137/SC - CEP 89035-200 ",
                phone: [" 47 . 99188 6137 "],
                email:[" blumenau05@defensoria.sc.def.br "],
                workTime: ["de 2ª a 6ª feira, das 12:00h às 19:00h "],
                details: ["Horário de Atendimento Presencial:  "],
                description:`- Atuação Integral na área Cível (polo ativo/ parte requerente), inclusive Tutela Coletiva, exceto: a) curadorias especiais; e b) resposta/contestação, impugnações e atuação em favor do polo passivo/parte requerida
- Assistência à mulher em situação de violência de gênero (atendimento, aconselhamento e orientação jurídica e ajuizamento e acompanhamento de medidas protetivas de urgência)
- 1ª Atuação Conflitante na 4ª Defensoria Pública de Blumenau
- 2ª Atuação Conflitante na 6ª Defensoria Pública de Blumenau
- 3ª Atuação Conflitante na 8ª Defensoria Pública de Blumenau `
            },{
                question: "6ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE BLUMENAU",
                people:"Ticianne Domingues Rubira",
                address: " Rua Joinville, nº 860, Vila Nova, Blumenau/SC - CEP 89035-200  ",
                phone: [" 47 . 99216 5443 "],
                email:[" blumenau06@defensoria.sc.def.br "],
                workTime: ["  de 2ª a 6ª feira, das 12:00h às 19:00h "],
                details: ["Horário de Atendimento Presencial: "],
                description:` - 1ª Vara da Família
- 1ª e 2ª Varas da Família em equidade com a 3ª Defensoria Pública de Blumenau (ressalvados os casos de ajuizamento vinculados)
- 1ª Atuação Conflitante na 3ª Defensoria Pública de Blumenau
- 2ª Atuação Conflitante na 4ª Defensoria Pública de Blumenau
- 3ª Atuação Conflitante na 5ª Defensoria Pública de Blumenau `
            },{
                question: "7ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE BLUMENAU",
                people:"Fernando Correa",
                address: " Rua Joinville, nº 860, Vila Nova, Blumenau/SC - CEP 89035-200  ",
                email:["blumenau07@defensoria.sc.gov.br ", "fernandocorrea@defensoria.sc.gov.br"],
                description:`- 1ª Vara Criminal
- 1ª Atuação Conflitante na 1ª Defensoria Pública de Blumenau
- 2ª Atuação Conflitante na 2ª Defensoria Pública de Blumenau
- 3ª Atuação Conflitante na 4ª Defensoria Pública de Blumenau `
            },{
                question: "8ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE BLUMENAU",
                people:"Vinicius Motta Scaliante",
                address: " Rua Joinville, nº 860, Vila Nova, Blumenau/SC - CEP 89035-200 ",
                phone: ["47 . 9204 6126 "],
                email:["blumenau08@defensoria.sc.gov.br "],
                description:`
- Atuação Integral na área da Infância e Juventude, inclusive Tutela Coletiva
- Supervisão da triagem
- 1ª Atuação Conflitante na 2ª Defensoria Pública de Blumenau
- 2ª Atuação Conflitante na 3ª Defensoria Pública de Blumenau
- 3ª Atuação Conflitante na 6ª Defensoria Pública de Blumenau `
            },
            ]
        },{
            question: "Núcleo Regional de Brusque",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE BRUSQUE",
                address: " Rua João Bauer, n°294, Centro, Brusque/SC - CEP 88350-100",
                phone: [" 47 . 3251 8240 "],
                email:[" brusque@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", "Segunda a Sexta, das 13h30 às 17h30 "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
            },         {
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE BRUSQUE",
                people: "Luisa Rotondo Garcia",
                address: " Rua João Bauer, n°294, Centro, Brusque/SC - CEP 88350-100 ",
                phone: [" 47 . 3251 8247 "],
                email:[" defensoriabrusque@gmail.com ", " brusque01@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", " Segunda a Sexta, das 13h30 às 17h30 "],
                details: [" Horário de Funcionamento: ", " Atendimento Externo: "],
                description: `Vara da Família, Infância e Juventude, Órfãos e Sucessões
Atendimento e ajuizamento de demandas relacionadas à área da Fazenda Pública
Atendimento, ajuizamento e acompanhamento de demandas relacionadas à área da saúde perante a Vara da Fazenda Pública e Registros Públicos
Atendimento e acompanhamento das demandas das vítimas de violência doméstica perante a Vara Criminal
Supervisão de Triagem
Atuação Conflitante na 2ª Defensoria Pública de Brusque `
            },         {
                question: "2ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE BRUSQUE",
                people: "Valentim Hodecker Junior",
                address: " Rua João Bauer, n°294, Centro, Brusque/SC - CEP 88350-100  ",
                phone: ["47 . 3251 8246 "],
                email:["defensoriabrusque@gmail.com ", " brusque02@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", "Segunda a Sexta, das 13h30 às 17h30 "],
                details: [" Horário de Funcionamento:", " Atendimento Externo:"],
                description: `Vara Criminal
Acompanhamento de demandas relacionadas à área da Fazenda Pública
Atendimento, ajuizamento e acompanhamento de demandas relacionadas à área de registros públicos perante a Vara da Fazenda Pública e Registros Públicos
Atuação Conflitante na 1ª Defensoria Pública de Brusque `
            },
            ]
        },{
            question: "Núcleo Regional de Caçador",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CAÇADOR",
                address: "Rua Maria Deomar Costa Neves, nº97 – Edifício Liverpool, Centro, Caçador/SC - CEP 89500-000",
                phone: [" 49 . 3561 6400 "],
                email: ["cacador@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", "Segunda a sexta, das 12h às 18h "],
                details: [" Horário de Funcionamento: ", "Atendimento Externo:"]
            },  {
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CAÇADOR",
                people: "Elaine Caroline Masnik",
                address: " Rua Maria Deomar Costa Neves, nº97 – Edifício Liverpool, Centro, Caçador/SC - CEP 89500-000 ",
                phone: [" 49 . 3561 6442 ", " 49 . 99111 8131 ", " 49 . 3561 6443 "],
                email: [" cacador01@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", "Segunda a sexta, das 12h às 18h "],
                details: [" Horário de Funcionamento: ", "Atendimento Externo:"],
                description: `Atuação Integral na Área da Infância e Juventude
Atuação Integral na área de Família e Sucessões (polo ativo/parte requerente) e na área de registros públicos, exceto curadorias especiais
Atendimento, ajuizamento e acompanhamento de demandas relacionadas à área da saúde
Assistência à mulher em situação de violência de gênero (atendimento, aconselhamento e orientação jurídica e ajuizamento e acompanhamento de medidas protetivas de urgência)
Obs: Fica mantido o acervo atual, sob responsabilidade do órgão de execução `
            },
            ]
        },{
            question: "Núcleo Regional de Campos Novos",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CAMPOS NOVOS",
                address: " Rua Coronel Lucidoro, nº755, Térreo, Centro, Campos Novos/SC - CEP 89620-000",
                phone: [" 49 . 3541 3343 "],
                email:["camposnovos@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", "Segunda a sexta, das 13h às 18h "],
                details: [" Horário de Funcionamento: ", "Atendimento Externo:"],
            },      {
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CAMPOS NOVOS",
                people: "Rafaela Lugon Lucchesi Ramacciotti",
                address: " Rua Coronel Lucidoro, nº755, térreo, Centro, Campos Novos/SC - CEP 89620-000 ",
                phone: ["49 . 3541 3362 ", "49 . 99170 3600 "],
                email: ["camposnovos01@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", "Segunda a sexta, das 13h às 18h "],
                details: [" Horário de Funcionamento: ", "Atendimento Externo:"],
                description: `Vara Criminal (à exceção dos feitos relacionados ao Juizado Especial Criminal)
1ª Vara Cível (exclusivamente nos feitos relativos à família, infância e juventude e curadoria especial)
2ª Vara Cível (exclusivamente nas áreas da sáude, registros públicos e curadoria especial) `
            },
            ]
        },{
            question: "Núcleo Regional de Chapecó",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CHAPECÓ",
                address: "Rua Pará, 53-D Maria Goretti, Centro, Chapecó9183-6515/SC - CEP 89801-400",
                phone: [" 49 . 99183 6515", "49 . 2049 7621", " 49 . 2049 7723"],
                email: ["triagemchapeco@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", "Segunda a Sexta, das 12h às 18h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
            },{
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CHAPECÓ",
                people:"Maria Fernanda Vidal Arellano",
                address: " Rua Pará, 53-D Maria Goretti, Centro, Chapecó /SC - CEP 89801-400 ",
                phone: ["49 . 2049 7765 ", "49 . 2049 7763"],
                email: [" chapeco01@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", "Segunda a Sexta, das 12h às 18h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
                description: ` - 2ª Vara Criminal
- 1ª Atuação conflitante na 8ª Defensoria Pública de Chapecó
- 2ª Atuação conflitante na 7ª Defensoria Pública de Chapecó
- 3ª Atuação conflitante na 5ª Defensoria Pública de Chapecó `
            },{
                question: "2ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CHAPECÓ",
                people:"Renato Moreno dos Santos",
                address: " Rua Pará, 53-D Maria Goretti, Centro, Chapecó/SC - CEP 89801-400 ",
                phone: ["49 . 99169 3434 ", " 49 . 2049 7766 "],
                email: ["chapeco02@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", "Segunda a Sexta, das 12h às 18h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
                description: ` Atuação Integral na área Cível (polo passivo/parte requerida), exceto curadorias especiais
- 1ª Atuação conflitante na 3ª Defensoria Pública de Chapecó
- 2ª Atuação conflitante na 6ª Defensoria Pública de Chapecó
- 3ª Atuação conflitante na 8ª Defensoria Pública de Chapecó
`
            },{
                question: "3ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CHAPECÓ",
                people:"Pedro Luporini Ferreira",
                address: " Rua Pará, 53-D Maria Goretti, Centro, Chapecó/SC - CEP 89801-400 ",
                phone: ["49 . 2049 7720 ", "49 . 2049 7765 ", "49 . 99178 2512 "],
                email: ["chapeco03@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", "Segunda a Sexta, das 12h às 18h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
                description: `Atuação Integral na área Cível (polo ativo/parte requerente), exceto curadorias especiais
- 1ª Atuação conflitante na 2ª Defensoria Pública de Chapecó
- 2ª Atuação conflitante na 4ª Defensoria Pública de Chapecó
- 3ª Atuação conflitante na 1ª Defensoria Pública de Chapecó `
            },{
                question: "4ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CHAPECÓ",
                people:"Éverton Beltrão de Matos",
                address: " Rua Pará, 53-D Maria Goretti, Centro, Chapecó/SC - CEP 89801-400 ",
                phone: [" 49 . 2049 7763 ", " 49 . 99172 2560 "],
                email: [" chapeco04@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", "Segunda a Sexta, das 12h às 18h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
                description: `- 2ª Vara de Família, Idoso, Órfãos e Sucessões
- 1ª Atuação conflitante na 6ª Defensoria Pública de Chapecó
- 2ª Atuação conflitante na 3ª Defensoria Pública de Chapecó
- 3ª Atuação conflitante na 2ª Defensoria Pública de Chapecó `
            },{
                question: "5ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CHAPECÓ",
                people:"Egon Hickmann Júnior",
                address: " Rua Pará, 53-D Maria Goretti, Centro, Chapecó/SC - CEP 89801-400 ",
                phone: [" 49 . 2049 7621 ", "49 . 2049 7765 ", " 49 . 99174 0185 "],
                email: [" chapeco05@@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", "Segunda a Sexta, das 12h às 18h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
                description: `Atuação Integral na área da Infância e Juventude, inclusive Tutela Coletiva
- 1ª Atuação conflitante na 7ª Defensoria Pública de Chapecó
- 2ª Atuação conflitante na 8ª Defensoria Pública de Chapecó
- 3ª Atuação conflitante na 4ª Defensoria Pública de Chapecó `
            },{
                question: "6ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CHAPECÓ",
                people:"Tiago Henrique Nunes Protásio da Silva",
                address: " Rua Pará, 53-D Maria Goretti, Centro, Chapecó/SC - CEP 89801-400 ",
                phone: [" 49 . 2049 7762 ", " 49 . 2049 7763 ", "49 . 99174 4883 "],
                email: [" chapeco06@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", "Segunda a Sexta, das 12h às 18h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
                description: `

- 1ª Vara da Família, Idoso, Órfãos e Sucessões
- Supervisão da triagem
- 1ª Atuação conflitante na 4ª Defensoria Pública de Chapecó
- 2ª Atuação conflitante na 2ª Defensoria Pública de Chapecó
- 3ª Atuação conflitante na 3ª Defensoria Pública de Chapecó `
            },{
                question: "7ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CHAPECÓ",
                people:"Micheli Andressa Alves",
                address: " Rua Pará, 53-D Maria Goretti, Centro, Chapecó/SC - CEP 89801-400 ",
                phone: ["49 . 2049 7722 ", "49 . 2049 7766 ", "49 . 99166 4609 "],
                email: ["chapeco07@defensoria.sc.def.br"],
                workTime: ["Segunda a Sexta, das 12h às 19h ", "Segunda a Sexta, das 12h às 18h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
                description: `Atuação Integral na área da Fazenda Pública, inclusive Tutela Coletiva, excetuadas as atribuições coletivas específicas da área de Execução Penal e da Infância e Juventude.
- Assistência à mulher em situação de violência de gênero (atendimento, aconselhamento e orientação jurídica e ajuizamento e acompanhamento de medidas protetivas de urgência).
- 1ª Atuação conflitante na 5ª Defensoria Pública de Chapecó
- 2ª Atuação conflitante na 1ª Defensoria Pública de Chapecó
- 3ª Atuação conflitante na 6ª Defensoria Pública de Chapecó `
            },{
                question: "8ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CHAPECÓ",
                people:"Rodrigo Santamaria Saber",
                address: " Rua Pará, 53-D Maria Goretti, Centro, Chapecó/SC - CEP 89801-400 ",
                phone: ["49 . 2049 7764 ", "49 . 99198 5027 "],
                email: ["chapeco08@defensoria.sc.gov.br "],
                description: `Atuação Integral na área de Execução Penal, inclusive Tutela Coletiva
1ª Atuação conflitante na 1ª Defensoria Pública de Chapecó
2ª Atuação conflitante na 5ª Defensoria Pública de Chapecó
3ª Atuação conflitante na 7ª Defensoria Pública de Chapecó `
            },
            ]
        },{
            question: "Núcleo Regional de Concórdia",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CONCÓRDIA",
                address: " Rua Osvaldo Zandavalli, 877, Ed. Brisas, Nossa Senhora da Salete, Concóridia(49) (49) 99201-5088/SC - CEP 89700-136 ",
                phone: ["49 . 99170 8830", "49 . 99170 8830", " 49 . 3482 6165 ", "49 . 3482 6220 "],
                email: [" concordia@defensoria.sc.def.br "],
                workTime: ["Segundas, Quartas e Sextas-feiras, das 13h00min às 17h00min. "],
                details: ["Atendimento ao Público:"],
            },         {
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CONCÓRDIA",
                people:"Gustavo Dobler",
                address: " Rua Osvaldo Zandavalli, 877, Ed. Brisas, Nossa Senhora da Salete, Concórdia/SC - CEP 89700-136 ",
                phone: ["49 . 3482 6220 ", " 49 . 3482 6165 "],
                email: [" concordia01@defensoria.sc.def.br "],
                workTime: ["Segundas, Quartas e Sextas-feiras, das 13h00min às 17h00min. ", "Segundas, Quartas e Sextas-Feiras das 13h00min às 17h00min. ", "Segunda-feira a Sexta-Feira, das 12h00min às 19h00min. "],
                details: ["Atendimento ao Público: ", "Atendimento Externo: ", "Casos Urgentes: "],
                description: ` Atuação Integral na Área da Infância e Juventude
Atuação Integral na área de Família e Sucessões (polo ativo/parte requerente) e na área de registros públicos, exceto curadorias especiais
Atendimento, ajuizamento e acompanhamento de demandas relacionadas à área da saúde
Assistência à mulher em situação de violência de gênero (atendimento, aconselhamento e orientação jurídica e ajuizamento e acompanhamento de medidas protetivas de urgência)

Obs: Obs: Fica mantido o acervo atual, sob responsabilidade do órgão de execução `
            },
            ]
        },{
            question: "Núcleo Regional de Criciúma",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CRICIÚMA",
                address: " Avenida Santos Dumont, nº 798, Milanese, Criciúma/SC - CEP 88804-578 ",
                phone: [" 48 . 3403 1051 ", "48 . 3403 1133 ", "48 . 3403 1659 "],
                email: ["criciuma@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h "],
                details: ["Horário de Funcionamento: "],
            },            {
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CRICIÚMA",
                people:"Juliana Braidoti Rodrigues",
                address: " Avenida Santos Dumont, nº 798, Milanese, Criciúma/SC - CEP 88804-578 ",
                phone: [" 48 . 3403 1465 "],
                email: [" criciuma@defensoria.sc.def.br ", " criciuma01@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", "Segunda a Sexta, das 12h30 às 16h "],
                details: ["Horário de Funcionamento:", "Atendimento Externo: "],
                description: `1ª Vara Criminal
1ª Atuação Conflitante na 4ª Defensoria Pública de Criciúma
2ª Atuação Conflitante na 5ª Defensoria Pública de Criciúma
3ª Atuação Conflitante na 7ª Defensoria Pública de Criciúma `
            },            {
                question: "2ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CRICIÚMA",
                people:"Rodrigo Martins Cavalcante Amorim",
                address: "Avenida Santos Dumont, nº 798, Milanese, Criciúma/SC - CEP 88804-578 ",
                phone: ["48 . 3403 1656 "],
                email: ["criciuma@defensoria.sc.def.br ", "criciuma02@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", " Segunda a Sexta, das 12h30 às 16h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description: ` 2ª Vara Criminal
1ª Atuação Conflitante na 7ª Defensoria Pública de Criciúma
2ª Atuação Conflitante na 6ª Defensoria Pública de Criciúma
3ª Atuação Conflitante na 3ª Defensoria Pública de Criciúma

Obs: ** MANIFESTAÇÃO CSDPESC nº 260/2024 O Conselho Superior da Defensoria Pública do Estado de Santa Catarina, no uso de suas atribuições legais, bem como nos termos do art. 3º da Resolução CSDPESC nº 63/2016, e nos termos da decisão proferida na 193ª sessão extraordinária ocorrida em 26 de setembro de 2024, DECIDE com efeitos a partir de 28/09/2024 a 20/12/2024, proceder à suspensão provisória das atribuições previstas na Deliberação CSDPESC nº 7/2017 quanto a 2ª Defensoria Pública de Criciúma `
            },            {
                question: "3ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CRICIÚMA",
                people:"Matheus Arthur Waskow",
                address: " Avenida Santos Dumont, nº 798, Milanese, Criciúma /SC - CEP 88804-578 ",
                phone: [" 48 . 3403 1657 "],
                email: [" criciuma@defensoria.sc.def.br ", " criciuma03@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", " Segunda a Sexta, das 12h30 às 16h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description: ` Vara da Família
Unidade de Cooperação da UNESC
1ª Atuação Conflitante na 6ª Defensoria Pública de Criciúma
2ª Atuação Conflitante na 7ª Defensoria Pública de Criciúma
3ª Atuação Conflitante na 5ª Defensoria Pública de Criciúma `
            },            {
                question: "4ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CRICIÚMA",
                people:"Ludmila Pereira Maciel",
                address: " Avenida Santos Dumont, nº 798, Milanese, Criciúma /SC - CEP 88804-578 ",
                phone: ["48 . 3403 1658 "],
                email: ["criciuma@defensoria.sc.def.br ", "criciuma04@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", " Segunda a Sexta, das 12h30 às 16h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description: `Vara da Infância, Juventude e Anexos
1ª Atuação Conflitante na 5ª Defensoria Pública de Criciúma
2ª Atuação Conflitante na 3ª Defensoria Pública de Criciúma
3ª Atuação Conflitante na 2ª Defensoria Pública de Criciúma `
            },            {
                question: "5ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CRICIÚMA",
                people:"Rodrigo Albano Guerino dos Reis",
                address: " Avenida Santos Dumont, nº 798, Milanese, Criciúma /SC - CEP 88804-578 ",
                phone: ["48 . 3403 1466 "],
                email: ["criciuma@defensoria.sc.def.br ", "criciuma05@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", " Segunda a Sexta, das 12h30 às 16h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description: `Vara de Execuções Penais
Atendimento, ajuizamento e acompanhamento de demandas referentes ao direito à saúde
1ª Atuação Conflitante na 3ª Defensoria Pública de Criciúma
2ª Atuação Conflitante na 4ª Defensoria Pública de Criciúma
3ª Atuação Conflitante na 1ª Defensoria Pública de Criciúma `
            },            {
                question: "6ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CRICIÚMA",
                people:"Diego Torres",
                address: " Avenida Santos Dumont, nº 798, Milanese, Criciúma /SC - CEP 88804-578 ",
                phone: [" 48 . 3403 1467 "],
                email: [" criciuma@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", " Segunda a Sexta, das 12h30 às 16h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description: `1ª e 2ª Varas Cíveis
1ª Vara da Fazenda Pública
Atendimento e ajuizamento de demandas nas Varas Cíveis e da Fazenda Pública em equidade com a 7ª Defensoria Pública de Criciúma
Atendimento, ajuizamento e acompanhamento de demandas no Juizado Especial Cível em equidade com a 7ª Defensoria Pública de Criciúma
1ª Atuação Conflitante na 2ª Defensoria Pública de Criciúma
2ª Atuação Conflitante na 1ª Defensoria Pública de Criciúma
3ª Atuação Conflitante na 4ª Defensoria Pública de Criciúma `
            },            {
                question: "7ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CRICIÚMA",
                people:"Fernando Morsch",
                address: " Avenida Santos Dumont, nº 798, Milanese, Criciúma /SC - CEP 88804-578 ",
                phone: ["48 . 3403 1655 "],
                email: [" criciuma@defensoria.sc.def.br ", "criciuma07@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", " Segunda a Sexta, das 12h30 às 16h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description: `3ª e 4ª Varas Cíveis
2ª Vara da Fazenda Pública
Atendimento e ajuizamento de demandas nas Varas Cíveis e da Fazenda Pública em equidade com a 6ª Defensoria Pública de Criciúma
Atendimento, ajuizamento e acompanhamento de demandas no Juizado Especial Cível em equidade com a 6ª Defensoria Pública de Criciúma
1ª Atuação Conflitante na 1ª Defensoria Pública de Criciúma
2ª Atuação Conflitante na 2ª Defensoria Pública de Criciúma
3ª Atuação Conflitante na 6ª Defensoria Pública de Criciúma `
            },
            ]
        },{
            question: "Núcleo Regional de Curitibanos",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CURITIBANOS",
                address: "Avenida Salomão Carneiro de Almeida, nº 388, Ed. Comercial Gaboardi Master Cente, Centro, Curitibanos/SC - CEP 89520-000 ",
                phone: ["49 . 3412 3171 "],
                email: [" curitibanos@defensoria.sc.def.br "],
                workTime: [`Terça, 13h às 16h30: presencial e/ou remoto, mediante agendamento – (último atendimento sendo marcado para às 16h)
Quinta, 13h às 16h30: presencial e/ou remoto, mediante agendamento – (último atendimento sendo marcado para às 16h)
Atendimentos de 30 em 30 minutos `, " Segunda e Quarta, 13h às 16h30, presencial e/ou remoto."],
                details: ["Atendimento de Triagem: ", " Atendimento de Retorno: "],
                description: `
Tratando-se de atendimento de urgência, entre em contato por ligação telefônica ou compareça ao Núcleo Regional de Curitibanos `
            },  {
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE CURITIBANOS",
                people:"Pedro Latini Azevedo",
                address: "Avenida Salomão Carneiro de Almeida, nº 388, Ed. Comercial Gaboardi Master Cente, Centro, Curitibanos/SC - CEP 89520-000 ",
                phone: [" 49 . 3412 3170 ", "49 . 99170 1184 "],
                email: [" curitibanos01@defensoria.sc.def.br "],
                workTime: [`Terça, 13h às 16h30: presencial e/ou remoto, mediante agendamento – (último atendimento sendo marcado para às 16h)
Quinta, 13h às 16h30: presencial e/ou remoto, mediante agendamento – (último atendimento sendo marcado para às 16h)
Atendimentos de 30 em 30 minutos `,"Segunda e Quarta, 13h às 16h30, presencial e/ou remoto."],
                details: ["Atendimento de Triagem:", "Atendimento de Retorno:"],
                description: `Vara Criminal (à exceção dos feitos relacionados ao Juizado Especial Criminal)
1ª Vara Cível (exclusivamente em curadoria especial)
2ª Vara Cível (exclusivamente nas áreas da sáude, registros públicos e curadoria especial)
Vara da Família, Infância, Juventude, Idoso, órfãos e Sucessões (exclusivamente nos feitos relacionados a atos infracionais) `
            },
            ]
        },{
            question: "Núcleo Regional de Itajaí",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE ITAJAÍ",
                address: "Avenida Coronel Marcos Konder, 747, Centro, Itajaí/SC - CEP 88301-300 ",
                phone: ["47 . 3398 6243 "],
                email: ["itajai@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", " Segunda a Quinta, das 12h às 16h ", " Sexta, das 12h às 18h ", "Quinta, das 12h15 às 17h15 "],
                details: ["Horário de Funcionamento: ", "Primeiro Atendimento no Núcleo: ", "Atendimento Processual: ", "Conciliações: "],
            }, {
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE ITAJAÍ (*)",
                people:"Pedro Ramos Lyra da Silva",
                address: "Avenida Coronel Marcos Konder, 747, Centro, Itajaí/SC - CEP 88301-300 ",
                phone: ["47 . 3398 6444 "],
                email: ["itajai01@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", " Segunda a Quinta, das 12h às 16h ", " Sexta, das 12h às 18h ", "Quinta, das 12h15 às 17h15 "],
                details: ["Horário de Funcionamento: ", "Primeiro Atendimento no Núcleo: ", "Atendimento Processual: ", "Conciliações: "],
                description: ` 1ª Vara Criminal
1ª Atuação Conflitante na 3ª Defensoria Pública de Itajaí
2ª Atuação Conflitante na 2ª Defensoria Pública de Itajaí
3ª Atuação Conflitante na 4ª Defensoria Pública de Itajaí
4ª Atuação Conflitante na 7ª Defensoria Pública de Itajaí

Obs: * MANIFESTAÇÃO CSDPESC nº 232, de 10 de novembro de 2023 (232/2023)

O CONSELHO SUPERIOR DA DEFENSORIA PÚBLICA DO ESTADO DE SANTA CATARINA, no uso de suas atribuições legais, conforme previsão contida no artigo 3º da Resolução CSDPESC nº 63/2016 e nos termos da decisão proferida na 176ª Sessão Ordinária, ocorrida em 10 de novembro de 2023, DECIDE suspender provisoriamente as atribuições funcionais da 1ª Defensoria Pública de Itajaí e integrar provisoriamente as atribuições funcionais da 7ª Defensoria Pública de Itajaí na 1ª Defensoria Pública de Itajaí, com efeitos a partir de 14/11/2023. `
            }, {
                question: "2ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE ITAJAÍ (suspensa*)",
                people:"Paula Pereira da Costa Moreira ",
                address: "Avenida Coronel Marcos Konder, 747, Centro, Itajaí/SC - CEP 88301-300 ",
                phone: [" 47 . 3398 6642 "],
                email: [" itajai@defensoria.sc.def.br ", " itajai02@defensoria.sc.gov.br"],
                workTime: ["Segunda a Sexta, das 12h às 19h ", " Segunda a Quinta, das 12h às 16h ", " Sexta, das 12h às 18h ", "Quinta, das 12h15 às 17h15 "],
                details: ["Horário de Funcionamento: ", "Primeiro Atendimento no Núcleo: ", "Atendimento Processual: ", "Conciliações: "],
                description: `

2ª Vara Criminal
1ª Atuação Conflitante na 6ª Defensoria Pública de Itajaí
2ª Atuação Conflitante na 1ª Defensoria Pública de Itajaí
3ª Atuação Conflitante na 3ª Defensoria Pública de Itajaí
4ª Atuação Conflitante na 4ª Defensoria Pública de Itajaí

Obs: * Suspensa - Manifestação CSDPESC nº 241, de 5 de abril de 2024 `
            }, {
                question: "3ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE ITAJAÍ (suspensa*)",
                people:"Samara Beatriz Fortunato Bellan",
                address: "Avenida Coronel Marcos Konder, 747, Centro, Itajaí/SC - CEP 88301-300 ",
                phone: ["47 . 3398 6443 "],
                email: [" itajai03@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", " Segunda a Quinta, das 12h às 16h ", " Sexta, das 12h às 18h ", "Quinta, das 12h15 às 17h15 "],
                details: ["Horário de Funcionamento: ", "Primeiro Atendimento no Núcleo: ", "Atendimento Processual: ", "Conciliações: "],
                description: `

Vara de Execuções Penais
Tutela Coletiva na área da execução penal, inclusive perante a Vara da Fazenda Pública, Executivo Fiscal, Acidentes de Trabalho e Registros Públicos
1ª Atuação Conflitante na 1ª Defensoria Pública de Itajaí
2ª Atuação Conflitante na 6ª Defensoria Pública de Itajaí
3ª Atuação Conflitante na 7ª Defensoria Pública de Itajaí
4ª Atuação Conflitante na 5ª Defensoria Pública de Itajaí

Obs: Suspensa - Manifestação CSDPESC nº 251, de 14 de junho de 2024 `
            }, {
                question: "4ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE ITAJAÍ",
                people:"Tiago de Oliveira Rummler",
                address: "Avenida Coronel Marcos Konder, 747, Centro, Itajaí/SC - CEP 88301-300 ",
                phone: ["47 . 3398 6645 "],
                email: [" itajai04@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", " Segunda a Quinta, das 12h às 16h ", " Sexta, das 12h às 18h ", "Quinta, das 12h15 às 17h15 "],
                details: ["Horário de Funcionamento: ", "Primeiro Atendimento no Núcleo: ", "Atendimento Processual: ", "Conciliações: "],
                description: `Vara da Infância e Juventude e Anexos
Supervisão de Triagem
Tutela Coletiva na área da infância e juventude, inclusive perante a Vara da Fazenda Pública, Executivo Fiscal, Acidentes de Trabalho e Registros Públicos
1ª Atuação Conflitante na 7ª Defensoria Pública de Itajaí
2ª Atuação Conflitante na 5ª Defensoria Pública de Itajaí
3ª Atuação Conflitante na 1ª Defensoria Pública de Itajaí
4ª Atuação Conflitante na 6ª Defensoria Pública de Itajaí `
            }, {
                question: "5ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE ITAJAÍ",
                people:"Tayana Cecília de Souza Pintarelli",
                address: "Avenida Coronel Marcos Konder, 747, Centro, Itajaí/SC - CEP 88301-300 ",
                phone: ["47 . 3398 6643 "],
                email: ["itajai05@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", " Segunda a Quinta, das 12h às 16h ", " Sexta, das 12h às 18h ", "Quinta, das 12h15 às 17h15 "],
                details: ["Horário de Funcionamento: ", "Primeiro Atendimento no Núcleo: ", "Atendimento Processual: ", "Conciliações: "],
                description: ` Vara da Família
1ª Atuação Conflitante na 4ª Defensoria Pública de Itajaí
2ª Atuação Conflitante na 7ª Defensoria Pública de Itajaí
3ª Atuação Conflitante na 6ª Defensoria Pública de Itajaí
4ª Atuação Conflitante na 2ª Defensoria Pública de Itajaí `
            }, {
                question: "6ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE ITAJAÍ",
                people:"Mônica Bernardi Rebelato",
                address: "Avenida Coronel Marcos Konder, 747, Centro, Itajaí/SC - CEP 88301-300 ",
                phone: [" 47 . 3398 6644 "],
                email: [" itajai06@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", " Segunda a Quinta, das 12h às 16h ", " Sexta, das 12h às 18h ", "Quinta, das 12h15 às 17h15 "],
                details: ["Horário de Funcionamento: ", "Primeiro Atendimento no Núcleo: ", "Atendimento Processual: ", "Conciliações: "],
                description: ` 1ª Vara Cível
2ª Vara Cível
Acompanhamento do Juizado Especial Cível
Atendimento e ajuizamento, em equidade com a 7ª Defensoria Pública de Itajaí, das ações vinculadas às 1ª, 2ª, 3ª e 4ª Varas Cíveis, ao Juizado Especial Cível e à Vara de Direito Bancário
Tutela Coletiva na área cível, inclusive perante a Vara da Fazenda Pública, Executivo Fiscal, Acidentes de Trabalho e Registros Públicos
1ª Atuação Conflitante na 5ª Defensoria Pública de Itajaí
2ª Atuação Conflitante na 3ª Defensoria Pública de Itajaí
3ª Atuação Conflitante na 2ª Defensoria Pública de Itajaí
4ª Atuação Conflitante na 1ª Defensoria Pública de Itajaí
OBS: a) a atuação da Defensoria Pública no Juizado Especial Cível ocorrerá nas ações cujo valor da causa supere 20 (vinte) salários mínimos; e b) as ações serão aforadas nas Varas Cíveis da Comarca de Itajaí (e a responsabilidade pelo acompanhamento é do Órgão de Execução com atribuição junto à respectiva Unidade Jurisdicional).
`
            }, {
                question: "7ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE ITAJAÍ (*)",
                people:"Fernanda Aparecida Rocha Silva de Menezes",
                address: "Avenida Coronel Marcos Konder, 747, Centro, Itajaí/SC - CEP 88301-300 ",
                phone: [" 47 . 3398 6445 "],
                email: [" itajai07@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", " Segunda a Quinta, das 12h às 16h ", " Sexta, das 12h às 18h ", "Quinta, das 12h15 às 17h15 "],
                details: ["Horário de Funcionamento: ", "Primeiro Atendimento no Núcleo: ", "Atendimento Processual: ", "Conciliações: "],
                description: `

3ª Vara Cível
4ª Vara Cível
Acompanhamento da Vara Regional de Direito Bancário
Atendimento e ajuizamento, em equidade com a 6ª Defensoria Pública de Itajaí, das ações vinculadas às 1ª, 2ª, 3ª e 4ª Varas Cíveis, ao Juizado Especial Cível e à Vara de Direito Bancário
Atendimento e ajuizamento das ações individuais de saúde de pessoas residentes no município de Itajaí, exceto aquelas de competência da Vara da Infância e Juventude
Atendimento e ajuizamento das ações vinculadas à Vara da Fazenda Pública, Executivo Fiscal, Acidentes de Trabalho e Registros Públicos
Tutela Coletiva na área cível, inclusive perante a Vara da Fazenda Pública, Executivo Fiscal, Acidentes de Trabalho e Registros Públicos
1ª Atuação Conflitante na 2ª Defensoria Pública de Itajaí
2ª Atuação Conflitante na 4ª Defensoria Pública de Itajaí
3ª Atuação Conflitante na 5ª Defensoria Pública de Itajaí
4ª Atuação Conflitante na 3ª Defensoria Pública de Itajaí
OBS: a) a atuação da Defensoria Pública no Juizado Especial Cível ocorrerá nas ações cujo valor da causa supere 20 (vinte) salários mínimos; e b) as ações serão aforadas nas Varas Cíveis da Comarca de Itajaí (e a responsabilidade pelo acompanhamento é do Órgão de Execução com atribuição junto à respectiva Unidade Jurisdicional).

Obs: * MANIFESTAÇÃO CSDPESC nº 232, de 10 de novembro de 2023 (232/2023)

O CONSELHO SUPERIOR DA DEFENSORIA PÚBLICA DO ESTADO DE SANTA CATARINA, no uso de suas atribuições legais, conforme previsão contida no artigo 3º da Resolução CSDPESC nº 63/2016 e nos termos da decisão proferida na 176ª Sessão Ordinária, ocorrida em 10 de novembro de 2023, DECIDE suspender provisoriamente as atribuições funcionais da 1ª Defensoria Pública de Itajaí e integrar provisoriamente as atribuições funcionais da 7ª Defensoria Pública de Itajaí na 1ª Defensoria Pública de Itajaí, com efeitos a partir de 14/11/2023. `
            },
            ]
        },{
            question: "Núcleo Regional de Jaraguá do Sul",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JARAGUÁ DO SUL",
                address: "Rua Olívio Domingos Brugnago, nº361, Vila Nova, Jaraguá do Sul/SC - CEP 89259-260 ",
                phone: ["47 . 3276 9316 "],
                email: [" triagemjaraguadosul@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", " Terça a Quinta, das 13h30 às 16h "],
                details: [" Horário de Funcionamento: ", " Atendimento Externo: "],
            },{
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JARAGUÁ DO SUL",
                people:"Sidney Hideo Gomes",
                address: " Rua Olívio Domingos Brugnago, nº361, Vila Nova, Jaraguá do Sul/SC - CEP 89259-260 ",
                phone: [" 47 . 3276 9325 ", " 47 . 99203 9746 "],
                email: ["jaraguadosul01@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", " Terça a Quinta, das 13h30 às 16h "],
                details: [" Horário de Funcionamento: ", " Atendimento Externo: "],
                description: `

- 1ª Vara Criminal (exclusivamente nos feitos inerentes ao Tribunal do Júri)
- 2ª Vara Criminal (exceto nos feitos do Juizado Especial Criminal)
- 1ª Atuação Conflitante na 2ª Defensoria Pública da Jaraguá do Sul
- 2ª Atuação Conflitante na 3ª Defensoria Pública da Jaraguá do Sul
- 3ª Atuação Conflitante na 4ª Defensoria Pública da Jaraguá do Sul `
            },{
                question: "2ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JARAGUÁ DO SUL",
                people:"Leonardo Vinicius Vieira ",
                address: " Rua Olívio Domingos Brugnago, nº361, Vila Nova, Jaraguá do Sul/SC - CEP 89259-260 ",
                phone: ["47 . 3276 9275 ", "47 . 99108 3633 "],
                email: [" jaraguadosul02@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", " Terça a Quinta, das 13h30 às 16h "],
                details: [" Horário de Funcionamento: ", " Atendimento Externo: "],
                description: ` - Atuação Integral na área da Fazenda Pública e Registros Públicos, inclusive Tutela Coletiva
- Atendimento, Ajuizamento e acompanhamento de ações na área do direito do consumidor (polo ativo/parte requerente)
- Assistência à mulher em situação de violência de gênero (atendimento, aconselhamento e orientação jurídica e ajuizamento e acompanhamento de medidas protetivas de urgência)
- 1ª Atuação Conflitante na 1ª Defensoria Pública da Jaraguá do Sul
- 2ª Atuação Conflitante na 4ª Defensoria Pública da Jaraguá do Sul
- 3ª Atuação Conflitante na 3ª Defensoria Pública da Jaraguá do Sul
`
            },{
                question: "3ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JARAGUÁ DO SUL",
                people:"Alessandro Cantelli",
                address: " Rua Olívio Domingos Brugnago, nº361, Vila Nova, Jarugua do Sul/SC - CEP 89259-260 ",
                phone: ["47 . 3276 9272 ", "47 . 99158 2223 "],
                email: ["jaraguadosul03@defensoria.sc.gov.br"],
                description: `- Atendimento, ajuizamento e acompanhamento das demandas de Família e Sucessões (polo ativo/parte requerente), ressalvados os casos de ajuizamento vinculados.
- Supervisão da triagem
- 1ª Atuação Conflitante na 4ª Defensoria Pública da Jaraguá do Sul
- 2ª Atuação Conflitante na 1ª Defensoria Pública da Jaraguá do Sul
- 3ª Atuação Conflitante na 2ª Defensoria Pública da Jaraguá do Sul `
            },{
                question: "4ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JARAGUÁ DO SUL",
                people:" Daniel Pereira de Barros Cobra ",
                address: " Rua Olívio Domingos Brugnago, nº361, Vila Nova, Jarugua do Sul/SC - CEP 89259-260 ",
                phone: [" 47 . 3276 9274 ", "47 . 99180 5605 "],
                email: [" jaraguadosul04@defensoria.sc.gov.br "],
                description: `- Atendimento, ajuizamento e acompanhamento das demandas de Família e Sucessões (polo passivo/ parte requerida), ressalvados os casos de ajuizamento vinculados.
- 1ª Atuação Conflitante na 3ª Defensoria Pública da Jaraguá do Sul
- 2ª Atuação Conflitante na 2ª Defensoria Pública da Jaraguá do Sul
- 3ª Atuação Conflitante na 1ª Defensoria Pública da Jaraguá do Sul `
            },
            ]
        },{
            question: "Núcleo Regional de Joaçaba",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JOAÇABA",
                address: "Rua Norino Rotolo, nº75, Edifício São Francisco de Assis, térreo, Centro, Joaçaba/SC - CEP 89600-000 ",
                phone: [" 49 . 3527 9827 ", " 49 . 99170 6537 "],
                email: [" joacaba@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", "Segunda a Sexta, das 13h às 17h "],
                details: ["Horário de Funcionamento:", " Atendimento Externo: "],
            },{
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JOAÇABA",
                people:"Thaís de Oliveira",
                address: " Rua Norino Rotolo, nº75, Edifício São Francisco de Assis, térreo, Centro, Joaçaba/SC - CEP 89600-000 ",
                phone: [" 49 . 3527 9828 "],
                email: ["joacaba01@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", "Segunda a Sexta, das 13h às 17h "],
                details: ["Horário de Funcionamento:", " Atendimento Externo: "],
                description: ` Atuação Integral na Área da Infância e Juventude
Atuação Integral na área de Família e Sucessões (polo ativo/parte requerente) e na área de registros públicos, exceto curadorias especiais
Atendimento, ajuizamento e acompanhamento de demandas relacionadas à área da saúde
Assistência à mulher em situação de violência de gênero (atendimento, aconselhamento e orientação jurídica e ajuizamento e acompanhamento de medidas protetivas de urgência)

Obs: Obs: Fica mantido o acervo atual, sob responsabilidade do órgão de execução `
            },
            ]
        },{
            question: "Núcleo Regional de Joinville",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JOINVILLE",
                people: "Djoni Luiz Gilgen Benedete",
                address: "Rua Saguaçu, 140 - Térreo, Saguaçu, Joinville/SC - CEP 89221-010 ",
                phone: [" 47 . 3481 2113", "47 . 3481 2115"],
                email: ["atendimentojoinville@defensoria.sc.def.br "],
                workTime: ["Distribuição de senhas: De Segunda à Quinta a partir das 8h. Atendimento Externo: Segunda a Sexta, das 12h às 19h "],
                details: ["Atendimento ao Público:"],
            },{
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JOINVILLE",
                people:"Thiago Simões Vieira de Souza",
                address: " Rua Saguaçu, 140 - Térreo, Saguaçu, Joinville/SC - CEP 89221-010 ",
                phone: ["47 . 3481 2195 ", " 47 . 99170 9557 "],
                email: [" joinville01@defensoria.sc.def.br "],
                workTime: ["Distribuição de senhas: De Segunda à Quinta a partir das 8h. Atendimento Externo: Segunda a Sexta, das 12h às 19h "],
                details: ["Atendimento ao Público:"],
                description: ` Atendimento, ajuizamento e acompanhamento das ações vinculadas às 1ª, 2ª, 3ª Varas da Fazenda Pública e Juizado Especial da Fazenda Pública, exceto feitos de natureza tributária/fiscal (preço público e taxa) e registro público
1ª Atuação Conflitante na 6ª Defensoria Pública de Joinville
2ª Atuação Conflitante na 13ª Defensoria Pública de Joinville
3ª Atuação Conflitante na 14ª Defensoria Pública de Joinville

Obs: Obs: MANIFESTAÇÃO CSDPESC nº 263/2024
O Conselho Superior da Defensoria Pública do Estado de Santa Catarina, no uso de suas atribuições legais, bem como nos termos do art. 3º da Resolução CSDPESC nº 63/2016, e nos termos da decisão proferida na 195ª sessão extraordinária ocorrida em 11/10/2024, DECIDE com efeitos a partir de 10/10/2024, pela suspensão provisória das atribuições previstas na Deliberação CSDPESC nº 103/2023 quanto a 10ª Defensoria Pública de Joinville; e pela integração das atribuições da 1ª Defensoria Pública de Joinville nas atribuições da 10ª Defensoria Pública de Joinville. `
            },{
                question: "2ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JOINVILLE",
                people:"Nobuyuki Hayashi",
                address: " Rua Saguaçu, 140 - Térreo, Saguaçu, Joinville/SC - CEP 89221-010 ",
                phone: ["47 . 3481 2484 "],
                email: [" joinville02@defensoria.sc.def.br "],
                workTime: ["Distribuição de senhas: De Segunda à Quinta a partir das 8h. Atendimento Externo: Segunda a Sexta, das 12h às 19h "],
                details: ["Atendimento ao Público:"],
                description: `- 1ª Vara da Família
- 1ª Atuação Conflitante na 3ª Defensoria Pública de Joinville
- 2ª Atuação Conflitante na 4ª Defensoria Pública de Joinville
- 4ª Atuação Conflitante na 5ª Defensoria Pública de Joinville `
            },{
                question: "3ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JOINVILLE",
                people:"Juliane Schlichting ",
                address: " Rua Saguaçu, 140 - Térreo, Saguaçu, Joinville/SC - CEP 89204-251 ",
                phone: [" 47 . 3481 2483 "],
                email: [" joinville03@defensoria.sc.def.br "],
                workTime: ["Distribuição de senhas: De Segunda à Quinta a partir das 8h. Atendimento Externo: Segunda a Sexta, das 12h às 19h "],
                details: ["Atendimento ao Público:"],
                description: `- 2ª Vara da Família
- 1ª Atuação Conflitante na 4ª Defensoria Pública de Joinville
- 2ª Atuação Conflitante na 2ª Defensoria Pública de Joinville
- 2ª Atuação Conflitante na 5ª Defensoria Pública de Joinville `
            },{
                question: "4ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JOINVILLE",
                people:"Larissa Leite Gazzaneo",
                address: " Rua Saguaçu, 140 - Térreo, Saguaçu, Joinville/SC - CEP 89221-010 ",
                phone: [" 47 . 3481 2194 "],
                email: [" joinville04@defensoria.sc.def.br "],
                workTime: ["Distribuição de senhas: De Segunda à Quinta a partir das 8h. Atendimento Externo: Segunda a Sexta, das 12h às 19h "],
                details: ["Atendimento ao Público:"],
                description: `

- 3ª Vara da Família
- 1ª Atuação Conflitante na 2ª Defensoria Pública de Joinville
- 2ª Atuação Conflitante na 3ª Defensoria Pública de Joinville
- 3ª Atuação Conflitante na 5ª Defensoria Pública de Joinville `
            },{
                question: "5ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JOINVILLE",
                people:"Antonio Luiz Barretto Lins de Castro",
                address: " Rua Saguaçu, 140 - Térreo, Saguaçu, 140, Joinville/SC - CEP 89221-010 ",
                phone: ["47 . 3481 2485 "],
                email: [" joinville05@defensoria.sc.def.br "],
                workTime: ["Distribuição de senhas: De Segunda à Quinta a partir das 8h. Atendimento Externo: Segunda a Sexta, das 12h às 19h "],
                details: ["Atendimento ao Público:"],
                description: `

- Atendimento, ajuizamento e acompanhamento integral da Vara da Infância e Juventude
- Tutela coletiva nas competências da Vara da Infância e Juventude
- 2ª Atuação Conflitante na 1ª Defensoria Pública de Joinville
- 2ª Atuação Conflitante na 6ª Defensoria Pública de Joinville `
            },{
                question: "6ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JOINVILLE",
                people:"Vinicius Manuel Ignácio Garcia",
                address: " Rua Saguaçu, 140 - Térreo, Saguaçu, 140, Joinville/SC - CEP 89221-010 ",
                phone: [" 47 . 3481 2488 ", " 47 . 99144 7220 "],
                email: ["joinville06@defensoria.sc.def.br "],
                workTime: ["Distribuição de senhas: De Segunda à Quinta a partir das 8h. Atendimento Externo: Segunda a Sexta, das 12h às 19h "],
                details: ["Atendimento ao Público:"],
                description: `Atendimento, ajuizamento e acompanhamento das matérias na área bancária, tributária/fiscal e registro público dos(as) residentes de Joinville perante a Comarca de Joinville ou em eventuais unidades Regionalizadas ou Estadualizadas dessas matérias ainda que em outras Comarcas
- 1ª Atuação Conflitante na 1ª Defensoria Pública de Joinville
- 2ª Atuação Conflitante na 14ª Defensoria Pública de Joinville
- 3ª Atuação Conflitante na 13ª Defensoria Pública de Joinville `
            },{
                question: "7ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JOINVILLE",
                people:"Daniel Santiago Barbosa",
                address: " Rua Saguaçu, 140 - Térreo, Saguaçu, Joinville/SC - CEP 89221-010 ",
                phone: [" 47 . 3481 2490 ", " 47 . 99137 2666 "],
                email: [" joinville07@defensoria.sc.def.br "],
                workTime: ["Distribuição de senhas: De Segunda à Quinta a partir das 8h. Atendimento Externo: Segunda a Sexta, das 12h às 19h "],
                details: ["Atendimento ao Público:"],
                description: ` joinville07@defensoria.sc.def.br `
            },{
                question: "8ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JOINVILLE",
                people:"Sergio Renato de Mello ",
                address: " Rua Saguaçu, 140 - Térreo, Saguaçu, 140, Joinville/SC - CEP 89221-010 ",
                phone: [" 47 . 3481 2489 "],
                email: ["joinville08@defensoria.sc.def.br "],
                workTime: ["Distribuição de senhas: De Segunda à Quinta a partir das 8h. Atendimento Externo: Segunda a Sexta, das 12h às 19h "],
                details: ["Atendimento ao Público:"],
                description: `

- 2ª Vara Criminal
- Assistência e defesa da vítima de violência doméstica e familiar
- 1ª Atuação Conflitante na 7ª Defensoria Pública de Joinville
- 2ª Atuação Conflitante na 15ª Defensoria Pública de Joinville
- 2ª Atuação Conflitante na 9ª Defensoria Pública de Joinville
- 3ª Atuação Conflitante na 10ª Defensoria Pública de Joinville `
            },{
                question: "9ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JOINVILLE",
                people:"Fabio de Castro Thomazini",
                address: " Rua Saguaçu, 140 - Térreo, Saguaçu, Joinville/SC - CEP 89221-010 ",
                phone: ["47 . 3481 2491 "],
                email: ["joinville09@defensoria.sc.def.br "],
                workTime: ["Distribuição de senhas: De Segunda à Quinta a partir das 8h. Atendimento Externo: Segunda a Sexta, das 12h às 19h "],
                details: ["Atendimento ao Público:"],
                description: ` Vara de Execuções Penais
Tutela coletiva na competência da Execução Penal
1ª Atuação Conflitante na 8ª Defensoria Pública de Joinville, ressalvada a orientação e assistência jurídica às vítimas de violência doméstica e familiar contra a mulher
2ª Atuação Conflitante na 7ª Defensoria Pública de Joinville
2ª Atuação Conflitante na 10ª Defensoria Pública de Joinville `
            },{
                question: "10ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JOINVILLE (Suspensa*)",
                people:"Thiago Simões Vieira de Souza",
                address: " Rua Saguaçu, 140 - Térreo, Saguaçu, Joinville/SC - CEP 89221-010 ",
                workTime: ["Distribuição de senhas: De Segunda à Quinta a partir das 8h. Atendimento Externo: Segunda a Sexta, das 12h às 19h "],
                details: ["Atendimento ao Público:"],
                description: ` Juizado de Violência Doméstica e Familiar contra a Mulher e Crimes contra a Criança e o Adolescente
- 1ª Atuação Conflitante na 15ª Defensoria Pública de Joinville
- 2ª Atuação Conflitante na 8ª Defensoria Pública de Joinville
- 3ª Atuação Conflitante na 7ª Defensoria Pública de Joinville
- 3ª Atuação Conflitante na 9ª Defensoria Pública de Joinville

Obs: MANIFESTAÇÃO CSDPESC nº 263/2024
O Conselho Superior da Defensoria Pública do Estado de Santa Catarina, no uso de suas atribuições legais, bem como nos termos do art. 3º da Resolução CSDPESC nº 63/2016, e nos termos da decisão proferida na 195ª sessão extraordinária ocorrida em 11/10/2024, DECIDE com efeitos a partir de 10/10/2024, pela suspensão provisória das atribuições previstas na Deliberação CSDPESC nº 103/2023 quanto a 10ª Defensoria Pública de Joinville; e pela integração das atribuições da 1ª Defensoria Pública de Joinville nas atribuições da 10ª Defensoria Pública de Joinville. `
            },{
                question: "11ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JOINVILLE",
                people:"Caio Vilas Boas da Costa Pacheco",
                address: " Rua Saguaçu, 140 - Térre, Saguaçu, Joinville/SC - CEP 89221-010 ",
                phone: [" 47 . 3481 2482 ", " 47 . 99247 8427 "],
                email: [" joinville11@defensoria.sc.def.br "],
                workTime: ["Distribuição de senhas: De Segunda à Quinta a partir das 8h. Atendimento Externo: Segunda a Sexta, das 12h às 19h "],
                details: ["Atendimento ao Público:"],
                description: `Supervisão da triagem (em equidade com a 12ª Defensoria Pública de Joinville)
- Atendimento e ajuizamento de iniciais relacionadas à área de família (excetuadas as ações revisionais de alimentos relacionadas ao direito de defesa em processos em curso nas Unidades - Jurisdicionais da Comarca de Joinville e os cumprimentos de decisões liminares)
- 1ª Atuação Conflitante na 12ª Defensoria Pública de Joinville `
            },{
                question: "12ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JOINVILLE",
                people:"Anderson de Oliveira Euriques",
                address: " Rua Saguaçu, 140 - Térre, Saguaçu, Joinville/SC - CEP 89221-010 ",
                phone: [" 47 . 3481 2587 ", " 47 . 99197 0574 "],
                email: ["joinville12@defensoria.sc.def.br "],
                workTime: ["Distribuição de senhas: De Segunda à Quinta a partir das 8h. Atendimento Externo: Segunda a Sexta, das 12h às 19h "],
                details: ["Atendimento ao Público:"],
                description: `- Supervisão da triagem (em equidade com a 11ª Defensoria Pública de Joinville)
- Atendimento e ajuizamento das iniciais relacionadas à área cível (excetuadas as de competência específica das 1ª, 5ª e 6ª Defensorias Públicas de Joinville)
- Obs: a atuação da Defensoria Pública no Juizado Especial Cível ocorrerá inclusive nas ações cujo valor da causa seja inferior a 20 (vinte) salários mínimos, devendo nesses casos ocorrer a atermação eletrônica, momento em que finalizará a atuação da Defensoria Pública
- 1ª Atuação Conflitante na 11ª Defensoria Pública de Joinville `
            },{
                question: "13ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JOINVILLE",
                people: "Rodrigo Scarpellini Gonçalves de Freitas",
                address: "Rua Saguaçu, 140 - Térreo, Saguaçu, Joinville/SC - CEP 89221-010",
                phone: ["47 . 3481 3657"],
                email: ["joinville13@defensoria.sc.def.br"],
                workTime: [
                    "Distribuição de senhas: De Segunda à Quinta a partir das 8h. Atendimento Externo: Segunda a Sexta, das 12h às 19h"
                ],
                details: ["Atendimento ao Público:"],
                description: `- 1ª Vara Cível
                - 2ª Vara Cível
                - 3ª Vara Cível
                - 7ª Vara Cível
                - 1º Juizado Especial Cível (Foro Central)
                - 2º Juizado Especial Cível (Univille), em equidade, com a 14ª Defensoria Pública de Joinville
                - 1ª Atuação Conflitante na 14ª Defensoria Pública de Joinville
                - 3ª Atuação Conflitante na 1ª Defensoria Pública de Joinville

                Obs: a atuação da Defensoria Pública no Juizado Especial Cível ocorrerá somente nas ações cujo valor da causa supere 20 (vinte) salários mínimos, todavia é obrigatória na fase recursal, se assim for solicitado pelo(a) assistido(a)`
            },{
                question: "14ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JOINVILLE",
                people: "Hermes Henrique Braga",
                address: "Rua Saguaçu, 140 - Térreo, Saguaçu, Joinville/SC - CEP 89221-010",
                phone: ["47 . 3481 2493"],
                email: ["joinville14@defensoria.sc.def.br"],
                workTime: [
                    "Distribuição de senhas: De Segunda à Quinta a partir das 8h. Atendimento Externo: Segunda a Sexta, das 12h às 19h"
                ],
                details: ["Atendimento ao Público:"],
                description: `- 4ª Vara Cível
                - 5ª Vara Cível
                - 6ª Vara Cível
                - 8ª Vara Cível
                - 3º Juizado Especial Cível (Sociesc)
                - 2º Juizado Especial Cível (Univille), em equidade, com a 13ª Defensoria Pública de Joinville
                - 1ª Atuação Conflitante na 13ª Defensoria Pública de Joinville
                - 3ª Atuação Conflitante na 6ª Defensoria Pública de Joinville

                Obs: a atuação da Defensoria Pública no Juizado Especial Cível ocorrerá somente nas ações cujo valor da causa supere 20 (vinte) salários mínimos, todavia é obrigatória na fase recursal, se assim for solicitado pelo(a) assistido(a)`
            },{
                question: "15ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE JOINVILLE",
                people: "Adriana Yurika Iwashita",
                address: "Rua Saguaçu, 140 - Térreo, Saguaçu, Joinville/SC - CEP 89221-010",
                phone: ["47 . 3481 2486"],
                email: ["joinville15@defensoria.sc.def.br"],
                workTime: [
                    "Distribuição de senhas: De Segunda à Quinta a partir das 8h. Atendimento Externo: Segunda a Sexta, das 12h às 19h"
                ],
                details: ["Dias e Horários de Atendimento:"],
                description: `- Atuação na defesa do réu da Vara do Tribunal do Júri
                - Atuação na defesa da vítima e sucessão dos crimes vinculados às 1ª, 2ª, 3ª e 4ª Varas Criminais de Joinville, sendo que a vítima da Vara do Tribunal do Júri deverá ser encaminhada ao(à) respectivo(a) conflitante
                - 1ª Atuação conflitante na 5ª Defensoria Pública de Joinville
                - 1ª Atuação conflitante na 8ª Defensoria Pública de Joinville (no que tange à orientação e assistência jurídica às vítimas de violência doméstica e familiar contra a mulher)
                - 4ª Atuação Conflitante nas 7ª, 8ª, 9ª e 10ª Defensorias Públicas de Joinville`
            },]},
        {
            question: "Núcleo Regional de Lages",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE LAGES",
                address: "Rua Veríssimo Galdino Duarte, n° 80 – Ao lado da Justiça Eleitoral), Centro, Lages/SC - CEP 88502-330 ",
                phone: [" 49 . 3289 8301 ", "49 . 99171 2449"],
                email: ["lages@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h", `Área da Família, Criminal e Cível: Segunda, Terça e Quarta, das 12h às 17h
Área de Medicamento: Segunda a Sexta das 13h às 19h
Área da Infância e Juventude/ Maria da Penha: Segunda, Terça e Quarta, das 12h às 17h`],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
            },            {
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE LAGES (*) (**)",
                people:"Eli Augusto Cuti Dorneles",
                address: " Rua Veríssimo Galdino Duarte, n° 80 – Ao lado da Justiça Eleitoral), Centro , Lages/SC - CEP 88502-330 ",
                phone: ["49 . 3289 8304 ", "49 . 99137 1504 "],
                email: ["lages01@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", `Área da Família, Criminal e Cível: Segunda, Terça e Quarta, das 12h às 17h
Área de Medicamento: Segunda a Sexta das 13h às 19h
Área da Infância e Juventude/ Maria da Penha: Segunda, Terça e Quarta, das 12h às 17h `],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
                description: ` Supervisão da Triagem;
Vara da Família em equidade com a 4ª Defensoria Pública;
Unidade Judiciária de Cooperação (campus da UNIPLAC) em equidade com a 4ª Defensoria Pública;
Atendimento e ajuizamento das demandas de Direito de Família, em equidade com a 4ª
Defensoria Pública;
Atendimento e ajuizamento de 1/6 das demandas Cíveis e Fazendárias (exceto demandas relacionadas ao direito de saúde) em equidade com as demais Defensorias Públicas;
1ª Atuação Conflitante na 4ª Defensoria Pública de Lages;
2ª Atuação Conflitante na 2ª Defensoria Pública de Lages;
3ª Atuação Conflitante na 6ª Defensoria Pública de Lages;

Obs: ** MANIFESTAÇÃO CSDPESC nº255//2024:

O Conselho Superior da Defensoria Pública do Estado de Santa Catarina, no uso de suas atribuições legais, bem como nos termos do art. 3º da Resolução CSDPESC nº 63/2016, e nos termos da decisão proferida na 193ª sessão extraordinária ocorrida em 26 de setembro de 2024, DECIDE i) pela suspensão provisória das atribuições previstas na Deliberação CSDPESC nº 246/2024 quanto a 2ª e 5ª Defensorias Públicas de Lages; ii) pela suspensão provisória das atribuições criminais previstas na Deliberação CSDPESC nº 234/2024 quanto a 3ª Defensoria Pública de Lages até o dia 10/02/2025; iii) pela integração provisória das atribuições atinentes da 5ª Defensoria Pública de Lages previstas na Deliberação CSDPESC nº 246/2024 na 2ª Defensoria Pública de Lages; iv) pela integração provisória das atribuições atinentes ao Atendimento e ajuizamento de 1/6 das demandas Cíveis e Fazendárias (exceto demandas de saúde) e acompanhamento das ações em tramite na 4ª Vara Cível (exceto curadoria especial) na 6ª Defensoria Pública de Lages com atribuição prevista na previstas na Deliberação CSDPESC nº 234/2024. `
            },            {
                question: "2ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE LAGES (*) (**)",
                people:"Júlia Gimenes Pedrollo",
                address: " Rua Veríssimo Galdino Duarte, n° 80 - (Ao lado da Justiça Eleitoral), Centro, Lages/SC - CEP 88502-330 ",
                phone: ["49 . 3289 8380", "49 . 99185 7825 "],
                email: ["lages02@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", `Área da Família, Criminal e Cível: Segunda, Terça e Quarta, das 12h às 17h
Área de Medicamento: Segunda a Sexta das 13h às 19h
Área da Infância e Juventude/ Maria da Penha: Segunda, Terça e Quarta, das 12h às 17h `],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
                description: ` 2ª Vara Criminal;
Atendimento e ajuizamento de 1/6 das demandas Cíveis e Fazendárias (exceto demandas relacionadas ao direito de saúde), em equidade com as demais Defensorias Públicas;
Acompanhamento das ações em tramite na 4ª Vara Cível, exceto curadoria especial;
1ª Atuação Conflitante na 3ª Defensoria Pública de Lages;
2ª Atuação Conflitante na 1ª Defensoria Pública de Lages;
3ª Atuação Conflitante na 5ª Defensoria Pública de Lages;

Obs: ** MANIFESTAÇÃO CSDPESC nº255//2024:

O Conselho Superior da Defensoria Pública do Estado de Santa Catarina, no uso de suas atribuições legais, bem como nos termos do art. 3º da Resolução CSDPESC nº 63/2016, e nos termos da decisão proferida na 193ª sessão extraordinária ocorrida em 26 de setembro de 2024, DECIDE i) pela suspensão provisória das atribuições previstas na Deliberação CSDPESC nº 246/2024 quanto a 2ª e 5ª Defensorias Públicas de Lages; ii) pela suspensão provisória das atribuições criminais previstas na Deliberação CSDPESC nº 234/2024 quanto a 3ª Defensoria Pública de Lages até o dia 10/02/2025; iii) pela integração provisória das atribuições atinentes da 5ª Defensoria Pública de Lages previstas na Deliberação CSDPESC nº 246/2024 na 2ª Defensoria Pública de Lages; iv) pela integração provisória das atribuições atinentes ao Atendimento e ajuizamento de 1/6 das demandas Cíveis e Fazendárias (exceto demandas de saúde) e acompanhamento das ações em tramite na 4ª Vara Cível (exceto curadoria especial) na 6ª Defensoria Pública de Lages com atribuição prevista na previstas na Deliberação CSDPESC nº 234/2024. `
            },            {
                question: "3ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE LAGES (*) (**)",
                people:"Tauser Ximenes Farias",
                address: "Rua Veríssimo Galdino Duarte, n° 80 – (Ao lado da Justiça Eleitoral), Centro, Lages/SC - CEP 88502-330 ",
                phone: ["49 . 3289 8302 ", "49 . 99168 1132 "],
                email: ["lages03@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", `Área da Família, Criminal e Cível: Segunda, Terça e Quarta, das 12h às 17h
Área de Medicamento: Segunda a Sexta das 13h às 19h
Área da Infância e Juventude/ Maria da Penha: Segunda, Terça e Quarta, das 12h às 17h `],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
                description: ` 3ª Vara Criminal;
Atendimento e ajuizamento de 1/6 das demandas Cíveis e Fazendárias (exceto demandas relacionadas ao direito de saúde) em equidade com as demais Defensorias Públicas;
Acompanhamento das ações em tramite na 1ª Vara Cível, exceto curadoria especial;
1ª Atuação Conflitante na 2ª Defensoria Pública de Lages
2ª Atuação Conflitante na 5ª Defensoria Pública de Lages
3ª Atuação Conflitante na 1ª Defensoria Pública de Lages

Obs: ** MANIFESTAÇÃO CSDPESC nº255//2024:

O Conselho Superior da Defensoria Pública do Estado de Santa Catarina, no uso de suas atribuições legais, bem como nos termos do art. 3º da Resolução CSDPESC nº 63/2016, e nos termos da decisão proferida na 193ª sessão extraordinária ocorrida em 26 de setembro de 2024, DECIDE i) pela suspensão provisória das atribuições previstas na Deliberação CSDPESC nº 246/2024 quanto a 2ª e 5ª Defensorias Públicas de Lages; ii) pela suspensão provisória das atribuições criminais previstas na Deliberação CSDPESC nº 234/2024 quanto a 3ª Defensoria Pública de Lages até o dia 10/02/2025; iii) pela integração provisória das atribuições atinentes da 5ª Defensoria Pública de Lages previstas na Deliberação CSDPESC nº 246/2024 na 2ª Defensoria Pública de Lages; iv) pela integração provisória das atribuições atinentes ao Atendimento e ajuizamento de 1/6 das demandas Cíveis e Fazendárias (exceto demandas de saúde) e acompanhamento das ações em tramite na 4ª Vara Cível (exceto curadoria especial) na 6ª Defensoria Pública de Lages com atribuição prevista na previstas na Deliberação CSDPESC nº 234/2024. `
            },            {
                question: "4ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE LAGES (*) (**)",
                people:"Vanessa Moritz Luz",
                address: " Rua Veríssimo Galdino Duarte, n° 80 – (Ao lado da Justiça Eleitoral), Centro, Lages/SC - CEP 88502-330 ",
                phone: [" 49 . 3289 8303 ", "49 . 99107 2721 "],
                email: [" lages04@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", `Área da Família, Criminal e Cível: Segunda, Terça e Quarta, das 12h às 17h
Área de Medicamento: Segunda a Sexta das 13h às 19h
Área da Infância e Juventude/ Maria da Penha: Segunda, Terça e Quarta, das 12h às 17h `],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
                description: ` Supervisão da Triagem;
Vara da Família em equidade com a 1ª Defensoria Pública;
Unidade Judiciária de Cooperação (campus da UNIPLAC) em equidade com a 1ª Defensoria Pública;
Atendimento e ajuizamento das demandas de Direito de Família, em equidade com a 1ª
Defensoria Pública;
Atendimento e ajuizamento de 1/6 das demandas Cíveis e Fazendárias (exceto demandas relacionadas ao direito de saúde) em equidade com as demais Defensorias Públicas;
1ª Atuação Conflitante na 1ª Defensoria Pública de Lages
2ª Atuação Conflitante na 6ª Defensoria Pública de Lages
3ª Atuação Conflitante na 2ª Defensoria Pública de Lages

Obs: ** MANIFESTAÇÃO CSDPESC nº255//2024:

O Conselho Superior da Defensoria Pública do Estado de Santa Catarina, no uso de suas atribuições legais, bem como nos termos do art. 3º da Resolução CSDPESC nº 63/2016, e nos termos da decisão proferida na 193ª sessão extraordinária ocorrida em 26 de setembro de 2024, DECIDE i) pela suspensão provisória das atribuições previstas na Deliberação CSDPESC nº 246/2024 quanto a 2ª e 5ª Defensorias Públicas de Lages; ii) pela suspensão provisória das atribuições criminais previstas na Deliberação CSDPESC nº 234/2024 quanto a 3ª Defensoria Pública de Lages até o dia 10/02/2025; iii) pela integração provisória das atribuições atinentes da 5ª Defensoria Pública de Lages previstas na Deliberação CSDPESC nº 246/2024 na 2ª Defensoria Pública de Lages; iv) pela integração provisória das atribuições atinentes ao Atendimento e ajuizamento de 1/6 das demandas Cíveis e Fazendárias (exceto demandas de saúde) e acompanhamento das ações em tramite na 4ª Vara Cível (exceto curadoria especial) na 6ª Defensoria Pública de Lages com atribuição prevista na previstas na Deliberação CSDPESC nº 234/2024. `
            },            {
                question: "5ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE LAGES (*) (**)",
                people:"Lucia Maria Menegaz",
                address: " Rua Veríssimo Galdino Duarte, n° 80 – (Ao lado da Justiça Eleitoral), Centro, Lages/SC - CEP 88502-330 ",
                phone: ["49 . 3289 8381 ", "49 . 99172 6226 "],
                email: [" lages05@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", `Área da Família, Criminal e Cível: Segunda, Terça e Quarta, das 12h às 17h
Área de Medicamento: Segunda a Sexta das 13h às 19h
Área da Infância e Juventude/ Maria da Penha: Segunda, Terça e Quarta, das 12h às 17h `],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
                description: ` Vara da Infância e Juventude e Anexos;
Acompanhamento das ações em tramite na 2ª Vara Cível, exceto curadoria especial;
Atendimento e ajuizamento de 1/6 das demandas Cíveis e Fazendárias (exceto demandas relacionadas ao direito de saúde) em equidade com as demais Defensorias Públicas;
1ª Atuação Conflitante na 6ª Defensoria Pública de Lages;
2ª Atuação Conflitante na 4ª Defensoria Pública de Lages;
3ª Atuação Conflitante na 3ª Defensoria Pública de Lages;

Obs: ** MANIFESTAÇÃO CSDPESC nº255//2024:

O Conselho Superior da Defensoria Pública do Estado de Santa Catarina, no uso de suas atribuições legais, bem como nos termos do art. 3º da Resolução CSDPESC nº 63/2016, e nos termos da decisão proferida na 193ª sessão extraordinária ocorrida em 26 de setembro de 2024, DECIDE i) pela suspensão provisória das atribuições previstas na Deliberação CSDPESC nº 246/2024 quanto a 2ª e 5ª Defensorias Públicas de Lages; ii) pela suspensão provisória das atribuições criminais previstas na Deliberação CSDPESC nº 234/2024 quanto a 3ª Defensoria Pública de Lages até o dia 10/02/2025; iii) pela integração provisória das atribuições atinentes da 5ª Defensoria Pública de Lages previstas na Deliberação CSDPESC nº 246/2024 na 2ª Defensoria Pública de Lages; iv) pela integração provisória das atribuições atinentes ao Atendimento e ajuizamento de 1/6 das demandas Cíveis e Fazendárias (exceto demandas de saúde) e acompanhamento das ações em tramite na 4ª Vara Cível (exceto curadoria especial) na 6ª Defensoria Pública de Lages com atribuição prevista na previstas na Deliberação CSDPESC nº 234/2024. `
            },            {
                question: "6ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE LAGES (*) (**)",
                people:"Heleno José Nabuco Santos",
                address: " Rua Veríssimo Galdino Duarte, n° 80 – (Ao lado da Justiça Eleitoral), Centro, Lages/SC - CEP 88502-330 ",
                phone: [" 49 . 3289 8382 ", "49 . 99150 5145 "],
                email: [" lages06@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", `Área da Família, Criminal e Cível: Segunda, Terça e Quarta, das 12h às 17h
Área de Medicamento: Segunda a Sexta das 13h às 19h
Área da Infância e Juventude/ Maria da Penha: Segunda, Terça e Quarta, das 12h às 17h `],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
                description: ` Atendimento e ajuizamento de ações relacionadas ao direito de saúde, exceto as que
tramitarem na Vara da Infância e Juventude;
Acompanhamento das ações em tramite Vara da Fazenda Pública (exceto curadoria especial);
Acompanhamento das ações em tramite na 3ª Vara Cível (exceto curadoria especial);
Acompanhamento das ações em tramite no Juizado Especial Cível;
Atendimento e ajuizamento de 1/6 das demandas Cíveis e Fazendárias (exceto demandas relacionadas ao direito de saúde) em equidade com as demais Defensorias Públicas;
1ª Atuação Conflitante na 5ª Defensoria Pública de Lages
2ª Atuação Conflitante na 3ª Defensoria Pública de Lages
3ª Atuação Conflitante na 4ª Defensoria Pública de Lages

Obs: ** MANIFESTAÇÃO CSDPESC nº255//2024:

O Conselho Superior da Defensoria Pública do Estado de Santa Catarina, no uso de suas atribuições legais, bem como nos termos do art. 3º da Resolução CSDPESC nº 63/2016, e nos termos da decisão proferida na 193ª sessão extraordinária ocorrida em 26 de setembro de 2024, DECIDE i) pela suspensão provisória das atribuições previstas na Deliberação CSDPESC nº 246/2024 quanto a 2ª e 5ª Defensorias Públicas de Lages; ii) pela suspensão provisória das atribuições criminais previstas na Deliberação CSDPESC nº 234/2024 quanto a 3ª Defensoria Pública de Lages até o dia 10/02/2025; iii) pela integração provisória das atribuições atinentes da 5ª Defensoria Pública de Lages previstas na Deliberação CSDPESC nº 246/2024 na 2ª Defensoria Pública de Lages; iv) pela integração provisória das atribuições atinentes ao Atendimento e ajuizamento de 1/6 das demandas Cíveis e Fazendárias (exceto demandas de saúde) e acompanhamento das ações em tramite na 4ª Vara Cível (exceto curadoria especial) na 6ª Defensoria Pública de Lages com atribuição prevista na previstas na Deliberação CSDPESC nº 234/2024. `
            },
            ]
        }
        ,{
            question: "Núcleo Regional de Mafra",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE MAFRA",
                address: " Rua Dom Pedro II, nº 315, Vila Buenos Aires, Mafra/SC - CEP 89300-000 ",
                phone: [" 47 . 3647 0480 "],
                email: [" mafra@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h ", "Segunda a Sexta, das 08h às 19h ", "Entrevistas com o Defensor Público: Terça a Quinta, das 08h às 12h "],
                details: ["Horário de Funcionamento:", "Atendimento de Triagem: ", "Atendimento Externo: "],
            },{
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE MAFRA (Suspensa parcialmente*)",
                people:"Elcio Guerra Junior ",
                address: " Rua Dom Pedro II, nº 315, Vila Buenos Aires, Mafra/SC - CEP 89300-000 ",
                phone: [" 47 . 3647 0512 ", " 47 . 3647 0513 ", " 47 . 99249 5164 "],
                email: [" mafra01@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 08h às 19h ", "Segunda a Sexta, das 08h às 19h ", "Entrevistas com o Defensor Público: Terça a Quinta, das 08h às 12h "],
                details: ["Horário de Funcionamento:", "Atendimento de Triagem: ", "Atendimento Externo: "],
                description: `

Vara Criminal
1ª Vara Cível (atendimento, ajuizamento e acompanhamento das ações relacionadas ao direito de família e à infância e juventude)
2ª Vara Cível (atendimento, ajuizamento e acompanhamento das ações de saúde e regitros públicos)
Curadoria Especial nas 1ª e 2ª Varas Cíveis

Obs: *Conforme a manifestação CSDPESC nº83, de 15 de março de 2019 suspende parcialmente as atribuições da 1ª Defensoria Pública de Mafra no que tange ao ajuizamento das ações de família perante a 1ª Vara Cível de Mafra, ao ajuizamento das ações registro perante a 2ª Vara Cível de Mafra, bem como na realização de Curadoria Especial nas 1ª e 2ª Varas Cíveis de Mafra. `
            },
            ]
        },{
            question: "Núcleo Regional de Maravilha",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE MARAVILHA",
                address: " Avenida Araucária, nº 736, Ed. Belluno, sala 102, Centro, Maravilha/SC - CEP 89874-000 ",
                phone: ["49 . 99200 9721 ", " 49 . 3664 6590 "],
                email: [" maravilha@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", " Segunda a Sexta, das 12h às 18h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
            },  {
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE MARAVILHA",
                people:"Lisiane Beatriz Wickert",
                address: " Avenida Araucária, nº 736, Ed. Belluno, sala 102, Centro, Maravilha/SC - CEP 89874-000 ",
                phone: ["49 . 3664 6561 "],
                email: [" maravilha01@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", " Segunda a Sexta, das 12h às 18h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
                description: ` Atuação Integral na Área da Infância e Juventude
Atuação Integral na área de Família e Sucessões (polo ativo/parte requerente) e na área de registros públicos, exceto curadorias especiais
Atendimento, ajuizamento e acompanhamento de demandas relacionadas à área da saúde
Assistência à mulher em situação de violência de gênero (atendimento, aconselhamento e orientação jurídica e ajuizamento e acompanhamento de medidas protetivas de urgência)

Obs: Obs: Fica mantido o acervo atual, sob responsabilidade do órgão de execução `
            },
            ]
        },{
            question: "Núcleo Regional de Palhoça",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE PALHOÇA",
                address: "Rua Najla Carone Goedert, nº 840, Passa Vinte, Palhoça/SC - CEP 88132-150 ",
                phone: ["48 . 3665 4984 "],
                email: ["palhoca@defensoria.sc.def.br"],
                workTime: ["Segunda a Sexta, das 12h30 às 19h ", " Terça, Quarta e Quinta, das 12h30 às 14h30 "],
                details: ["Horário de Funcionamento:", " Atendimento Externo: "],
            },           {
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE PALHOÇA",
                people:"Edison Marconi Dittrich Schmitt",
                address: "Rua Najla Carone Goedert, nº 840, Passa Vinte, Palhoça/SC - CEP 88132-150 ",
                phone: [" 48 . 3665 7580 "],
                email: ["palhoca01@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h30 às 19h ", " Terça, Quarta e Quinta, das 12h30 às 14h30 "],
                details: ["Horário de Funcionamento:", " Atendimento Externo: "],
                description: ` Atuação Integral na área da Infância e Juventude
1ª Atuação Conflitante na 3ª Defensoria Pública de Palhoça
2ª Atuação Conflitante na 2ª Defensoria Pública de Palhoça
3ª Atuação Conflitante na 4ª Defensoria Pública de Palhoça `
            },           {
                question: "2ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE PALHOÇA",
                people:"Milton Müller Júnior",
                address: "Rua Najla Carone Goedert, nº 840, Passa Vinte, Palhoça/SC - CEP 88132-150 ",
                phone: [" 48 . 3665 5557 "],
                email: [" palhoca02@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h30 às 19h ", " Terça, Quarta e Quinta, das 12h30 às 14h30 "],
                details: ["Horário de Funcionamento:", " Atendimento Externo: "],
                description: ` - Atuação Integral na área Cível (polo ativo/parte requerente), exceto curadorias especiais
- 1ª Atuação Conflitante na 1ª Defensoria Pública de Palhoça
- 2ª Atuação Conflitante na 4ª Defensoria Pública de Palhoça
- 3ª Atuação Conflitante na 5ª Defensoria Pública de Palhoça `
            },           {
                question: "3ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE PALHOÇA",
                people:"Gustavo Henrique Gomes Baptista",
                address: " Rua Najla Carone Goedert, nº 840, Passa Vinte, Palhoça/SC - CEP 88132-150 ",
                phone: ["48 . 3665 7579 "],
                email: [" palhoca03@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h30 às 19h ", " Terça, Quarta e Quinta, das 12h30 às 14h30 "],
                details: ["Horário de Funcionamento:", " Atendimento Externo: "],
                description: `- Atuação Integral na área da Fazenda Pública e atuação Integral da área Cível (polo passivo/parte requerida), exceto curadorias especiais
- 1ª Atuação Conflitante na 2ª Defensoria Pública de Palhoça
- 2ª Atuação Conflitante na 5ª Defensoria Pública de Palhoça
- 3ª Atuação Conflitante na 1ª Defensoria Pública de Palhoça `
            },           {
                question: "4ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE PALHOÇA",
                people:"Gabriela Souza Cotrim",
                address: "Rua Najla Carone Goedert, nº 840, Passa Vinte, Palhoça/SC - CEP 88132-150 ",
                phone: [" 48 . 3665 4552 "],
                email: ["palhoca04@defensoria.sc.gov.br "],
                description: `- Atuação integral na área de família e sucessões, em equidade com a 5ª DPE (ressalvados os casos de ajuizamento vinculados)
- Assistência à mulher em situação de violência de gênero em equidade com a 5ª DPE (atendimento, aconselhamento e orientação jurídica) e ajuizamento e acompanhamento de medidas protetivas de urgência.
- 1ª Atuação Conflitante na 5ª Defensoria Pública de Palhoça
- 2ª Atuação Conflitante na 3ª Defensoria Pública de Palhoça
- 3ª Atuação Conflitante na 2ª Defensoria Pública de Palhoça `
            },           {
                question: "5ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE PALHOÇA",
                people:"Leonardo Bertoncini Filomeno",
                address: " Rua Najla Carone Goedert, nº 840, Passa Vinte, Palhoça/SC - CEP 88132-150 ",
                phone: [" 48 . 3665 4744 "],
                email: [" palhoca05@defensoria.sc.gov.br "],
                description: `- Atuação integral na área de família e sucessões, em equidade com a 4ª DPE (ressalvados os casos de ajuizamento vinculados).
- Assistência à mulher em situação de violência de gênero em equidade com a 4ª DPE (atendimento, aconselhamento e orientação jurídica) e ajuizamento e acompanhamento de medidas protetivas de urgência
- Supervisão da triagem
- 1ª Atuação Conflitante na 4ª Defensoria Pública de Palhoça
- 2ª Atuação Conflitante na 1ª Defensoria Pública de Palhoça
- 3ª Atuação Conflitante na 3ª Defensoria Pública de Palhoça `
            },
            ]
        },{
            question: "Núcleo Regional de Rio do Sul",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE RIO DO SUL",
                address: " Rua Dom Bosco, nº 701, Sala 01, Centro Empresarial Ilha de Creta, Centro, Rio do Sul/SC - CEP 89160-121 ",
                phone: [" 47 . 3526 3136 ", " 47 . 3526 3135 ", " 47 . 99106 1395 "],
                email: ["riodosul@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", " Segunda a Quinta, das 13h30 às 17h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
            }, {
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE RIO DO SUL",
                people:"Monique Azevedo Bastos de Oliveira",
                address: "Rua Dom Bosco, nº 701, Sala 01, Centro Empresarial Ilha de Creta, Centro, Rio do Sul/SC - CEP 89160-121 ",
                phone: ["47 . 9214 5668 "],
                email: ["riodosul01@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", " Segunda a Quinta, das 13h30 às 17h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
                description: `Vara Criminal
Atendimento, ajuizamento e acompanhamento das demandas vinculadas à Vara da Fazenda Pública, Acidentes de Trabalho e Registros Públicos (excetuadas as atribuições da 2ª Defensoria Pública de Rio do Sul)
Curadoria Especial na 1ª Vara Cível
Curadoria Especial na Vara Regional de Direito Bancário (nas ações oriundas da Comarca de Rio do Sul)
Tutela Coletiva na Vara da Fazenda Pública, Acidentes de Trabalho e Registros Públicos (excetuadas as atribuições da 2ª Defensoria Pública de Rio do Sul)
1ª Atuação Conflitante na 2ª Defensoria Pública de Rio do Sul `
            }, {
                question: "2ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE RIO DO SUL",
                people:"Larissa Thielle Arcaro ",
                address: "Rua Dom Bosco, nº 701, Sala 01, Centro Empresarial Ilha de Creta, Centro, Rio do Sul/SC - CEP 89160-121 ",
                phone: ["47 . 3526 3179 ", " 47 . 99147 8267 "],
                email: ["riodosul02@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", " Segunda a Quinta, das 13h30 às 17h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
                description: `Vara da Família, Órfãos, Sucessões e Infância e Juventude
Atendimento, ajuizamento e acompanhamento das ações de saúde e registros públicos (que devam tramitar na Vara da Fazenda Pública, Acidentes de Trabalho e Registros Públicos)
Curadoria Especial na 2ª Vara Cível
Orientação e assistência jurídica às vítimas de violência doméstica e familiar contra a mulher
Tutela Coletiva na área da saúde e registros públicos.
1ª Atuação Conflitante na 1ª Defensoria Pública de Rio do Sul `
            },
            ]
        },{
            question: "Núcleo Regional de São José",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE SÃO JOSÉ",
                address: "Manoel Loureiro, 1948, Barreiros, São José/SC - CEP 88117-331 ",
                phone: [" 48 . 3665 6711 ", "48 . 3665 7581 "],
                email: [" saojose@defensoria.sc.def.br "],
                workTime: ["Segundas, terças, quartas e quintas, das 13h às 18h. "],
                details: ["Horário de Funcionamento:"],
            },{
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE SÃO JOSÉ",
                people:"Felipe Schmitz da Silva",
                address: "Manoel Loureiro, 1948, Barreiros, São José/SC - CEP 88117-331 ",
                phone: ["48 . 3665 7582 "],
                email: [" saojose@defensoria.sc.def.br ", "saojose01@defensoria.sc.def.br "],
                workTime: ["Segundas, terças, quartas e quintas, das 13h às 18h. "],
                details: ["Dias e Horários de Atendimento:"],
                description: ` - Atuação Integral na área da Execução Penal
- 1ª Atuação Conflitante na 5ª Defensoria Pública de São José
- 2ª Atuação Conflitante na 2ª Defensoria Pública de São José
- 3ª Atuação Conflitante na 7ª Defensoria Pública de São José
`
            },{
                question: "2ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE SÃO JOSÉ",
                people:"Sharon Simões",
                address: " Manoel Loureiro, 1948, Barreiros, São José/SC - CEP 88117-331 ",
                phone: [" 48 . 3665 7583 "],
                email: [" saojose02@defensoria.sc.def.br "],
                workTime: ["Segundas, terças, quartas e quintas, das 13h às 18h "],
                details: ["Dias e Horários de Atendimento: "],
                description: `

Atuação Integral na área da Infância e Juventude
- 1ª Atuação Conflitante na 1ª Defensoria Pública de São José
- 2ª Atuação Conflitante na 5ª Defensoria Pública de São José
- 3ª Atuação Conflitante na 3ª Defensoria Pública de São José `
            },{
                question: "3ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE SÃO JOSÉ",
                people:"Ronaldo Francisco",
                address: " Manoel Loureiro, 1948, Barreiros, São José/SC - CEP 88117-331 ",
                phone: [" 48 . 3665 6791 ", "48 . 99101 7958 "],
                email: [" saojose03@defensoria.sc.def.br "],
                workTime: [" Segundas, terças, quartas e quintas, das 13h às 18h "],
                details: ["Dias e Horários de Atendimento: "],
                description: `Atuação nas no atendimento e ajuizamento de ações iniciais na área de família, sucessões, tutela, curatela, emancipação e ausência
- Supervisão da Triagem
- 1ª Atuação Conflitante na 2ª Defensoria Pública de São José
- 2ª Atuação Conflitante na 1ª Defensoria Pública de São José
- 3ª Atuação Conflitante na 4ª Defensoria Pública de São José `
            },{
                question: "4ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE SÃO JOSÉ",
                people:"João Jofilly Coutinho",
                address: " Manoel Loureiro, 1948, Barreiros, São José/SC - CEP 88117-331 ",
                phone: ["48 . 3665 6722 ", "48 . 99106 6501 "],
                email: ["saojose04@defensoria.sc.def.br "],
                workTime: ["Segundas, terças, quartas e quintas, das 13h às 18h "],
                details: ["Dias e Horários de Atendimento:"],
                description: `Atuação Integral na área da Família, perante a 1ª e 2ª Varas da Família, em equidade com a 5ª Defensoria Pública de São José (ressalvados os casos de ajuizamento vinculado)
Assistência à mulher em situação de violência de gênero em equidade com a 5ª DPE (atendimento, aconselhamento e orientação jurídica e ajuizamento e acompanhamento de medidas protetivas de urgência)
- 1ª Atuação Conflitante na 3ª Defensoria Pública de São José
- 2ª Atuação Conflitante na 6ª Defensoria Pública de São José
- 3ª Atuação Conflitante na 2ª Defensoria Pública de São José `
            },{
                question: "5ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE SÃO JOSÉ",
                people:"Sérgio Dantas Chamoun",
                address: " Manoel Loureiro, 1948, Barreiros, São José/SC - CEP 88117-331 ",
                phone: ["48 . 99134 5129 "],
                email: [" saojose05@defensoria.sc.def.br "],
                workTime: [" Segundas, terças, quartas e quintas, das 13h às 18h. "],
                details: [" Dias e Horários de Atendimento: "],
                description: `Atuação Integral na área da Família, perante a 1ª e a 2ª Varas da Família, em equidade com a 4ª Defensoria Pública de São José (ressalvados os casos de ajuizamento vinculado)
Assistência à mulher em situação de violência de gênero em equidade com a 4ª DPE (atendimento, aconselhamento e orientação jurídica e ajuizamento e acompanhamento de medidas protetivas de urgência)
1ª Atuação Conflitante na 4ª Defensoria Pública de São José
2ª Atuação Conflitante na 7ª Defensoria Pública de São José
3ª Atuação Conflitante na 6ª Defensoria Pública de São José `
            },{
                question: "6ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE SÃO JOSÉ",
                people:"Fernando André Pinto de Oliveira Filho",
                address: "Manoel Loureiro, 1948, Barreiros, São José/SC - CEP 88117-331 ",
                phone: ["48 . 3665 7650 ", " 48 . 99125 3940 "],
                email: ["saojose06@defensoria.sc.def.br "],
                workTime: [" Segundas, terças, quartas e quintas, das 13h às 18h. "],
                details: ["Dias e Horários de Atendimento: "],
                description: `

Atuação remanescente integral na área cível e fazendária (polo ativo/parte requerente). Atendimento, ajuizamento inicial e acompanhamento
- 1ª Atuação Conflitante na 7ª Defensoria Pública de São José
- 2ª Atuação Conflitante na 3ª Defensoria Pública de São José
- 3ª Atuação Conflitante na 1ª Defensoria Pública de São José `
            },{
                question: "7ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE SÃO JOSÉ",
                people:"Otávia Garcez Marroni",
                address: "Manoel Loureiro, 1948, Barreiros, São José/SC - CEP 88117-331 ",
                phone: ["48 . 3665 7651 "],
                email: ["saojose07@defensoria.sc.def.br "],
                description: `Atuação integral na área cível (polo passivo/parte requerida). Atendimento, ajuizamento de defesas e acompanhamento
- 1ª Atuação Conflitante na 6ª Defensoria Pública de São José
- 2ª Atuação Conflitante na 4ª Defensoria Pública de São José
- 3ª Atuação Conflitante na 5ª Defensoria Pública de São José `
            },
            ]
        },{
            question: "Núcleo Regional de São Lourenço do Oeste",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE SÃO LOURENÇO DO OESTE",
                address: "Rua Nereu Ramos, nº 581, Centro, São Lourenço do Oeste/SC - CEP 89990-000",
                phone: [" 49 . 3372 1129 "],
                email: ["saolourencodooeste@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", "Segunda a Sexta, das 13h00 às 17h00 "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
            }, {
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE SÃO LOURENÇO DO OESTE",
                people:"Raíssa Mariana Scalada Viana",
                address: " Rua Nereu Ramos, nº 581, Centro, São Lourenço do Oeste/SC - CEP 89990-000 ",
                phone: ["49 . 99144 6419 ", " 49 . 3372 1131 ", " 49 . 3372 1107 "],
                email: ["saolourencodooeste01@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", "Segunda a Sexta, das 13h00 às 17h00 "],
                details: ["Horário de Funcionamento: ", " Atendimento Externo: "],
                description: `Vara única. `
            },
            ]
        },{
            question: "Núcleo Regional de São Miguel do Oeste",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE SÃO MIGUEL DO OESTE",
                address: "R. Santos Dumont, n° 134, Centro, São Miguel do Oeste/SC - CEP 89900-000 ",
                phone: ["49 . 3631 2942 "],
                email: ["saomigueldooeste@defensoria.sc.def.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", "Segunda à sexta, das 13:00 às 16:00. "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
            },{
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE SÃO MIGUEL DO OESTE",
                people:"Gustavo Araripe Cariri Linhares ",
                address: " R. Santos Dumont, n° 134, Centro, São Miguel do Oeste/SC - CEP 89900-000 ",
                phone: ["49 . 3631 3242 ", "49 . 99171 0299 "],
                email: ["saomigueldooeste01@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", " segunda à sexta, das 13:00 às 16:00."],
                details: ["Horário de Funcionamento: ", "Atendimento Externo: "],
                description: ` Atuação Integral na Área da Infância e Juventude
Atuação Integral na área de Família e Sucessões (polo ativo/parte requerente) e na área de registros públicos, exceto curadorias especiais
Atendimento, ajuizamento e acompanhamento de demandas relacionadas à área da saúde
Assistência à mulher em situação de violência de gênero (atendimento, aconselhamento e orientação jurídica e ajuizamento e acompanhamento de medidas protetivas de urgência)

Obs: Obs: Fica mantido o acervo atual, sob responsabilidade do órgão de execução `
            },
            ]
        },{
            question: "Núcleo Regional de Tubarão",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE TUBARÃO",
                address: " Av. Marcolino Martins Cabral, nº 1572, Centro, Tubarão/SC - CEP 88701-001 ",
                phone: [" 48 . 3631 9685 "],
                email: [" atendimentotubarao@defensoria.sc.gov.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", " Terça a Quinta, das 13h às 16h "],
                details: [" Horário de Funcionamento: ", " Atendimento Externo:"],
            }, {
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE TUBARÃO (INTEGRAÇÃO E SUSPENSÃO)",
                people:"Rafaela Duarte Fernandes",
                address: " Av. Marcolino Martins Cabral, nº 1572, Centro, Tubarão/SC - CEP 88701-001 ",
                phone: [" 48 . 99153 6444 ", " 48 . 3631 9461 "],
                email: ["tubarao01@defensoria.sc.gov.br "],
                workTime: ["Segunda a Sexta, das 12h às 19h ", " Terça a Quinta, das 13h às 16h "],
                details: ["Horário de Funcionamento:", "Atendimento Externo:"],
                description: ` 1ª Vara Criminal
Vara da Fazenda Pública e Anexos
1ª Atuação Conflitante na 3ª Defensoria Pública de Tubarão
2ª Atuação Conflitante na 2ª Defensoria Pública de Tubarão

Obs: Obs: MANIFESTAÇÃO CSDPESC nº 266/2024: O Conselho Superior da Defensoria Pública do Estado de Santa Catarina, no uso de suas atribuições legais, bem como nos termos do art. 3º da Resolução
CSDPESC no 63/2016, e nos termos da decisão proferida na 198ª Sessão
Extraordinária ocorrida em 13 de novembro de 2024, DECIDE com efeitos a partir
de 18/11/2024 b) pela integração da atribuição da 3ª Defensoria Pública de
Tubarão referente à Vara de Família, Órfãos, Infância e Juventude (exceto área
de Família) nas atribuições da 1ª Defensoria Pública de Tubarão; c) pela
suspensão provisória das atribuições previstas na Deliberação CSDPESC nº
85/2021 quanto a 1ª Defensoria Pública de Tubarão referente a 1ª Vara Criminal. `
            }, {
                question: "2ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE TUBARÃO",
                people:"Suzi Maria Comelli Boing",
                address: "Av. Marcolino Martins Cabral, nº 1572, Centro, Tubarão/SC - CEP 88701-001 ",
                phone: [" 48 . 99153 6444 ", "48 . 3631 9459 "],
                email: ["tubarao02@defensoria.sc.def.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", "Terça a Quinta, das 13h às 16h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
                description: ` 2ª Vara Criminal
1ª Atuação Conflitante na 1ª Defensoria Pública de Tubarão
2ª Atuação Conflitante na 3ª Defensoria Pública de Tubarão

Obs: Salas 401 a 407, Ed. Office Center `
            }, {
                question: "3ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE TUBARÃO (SUSPENSÃO)",
                people:"Mariana Carvalho dos Santos Macedo",
                address: " Av. Marcolino Martins Cabral, nº 1572, Centro, Tubarão/SC - CEP 88701-001 ",
                phone: ["48 . 99153 6444 ", "48 . 3631 9460 "],
                email: [" tubarao03@defensoria.sc.gov.br "],
                workTime: [" Segunda a Sexta, das 12h às 19h ", "Terça a Quinta, das 13h às 16h "],
                details: ["Horário de Funcionamento: ", "Atendimento Externo:"],
                description: ` Vara de Família, Órfãos, Infância e Juventude (exceto área de Família)
Orientação Jurídica à mulher em situação de violência de gênero
Juizado Especial Cível (exceto causas de até 20 salários mínimos)
1ª Vara Cível (exceto curadoria especial)
2ª Vara Cível (exceto curadoria especial)
3ª Vara Cível (exceto curadoria especial)
1ª Atuação Conflitante na 2ª Defensoria Pública de Tubarão
2ª Atuação Conflitante na 1ª Defensoria Pública de Tubarão

Obs: Obs: MANIFESTAÇÃO CSDPESC no
266/2024: O Conselho Superior da Defensoria Pública do Estado de Santa Catarina,
no uso de suas atribuições legais, bem como nos termos do art. 3º da Resolução
CSDPESC no 63/2016, e nos termos da decisão proferida na 198ª Sessão
Extraordinária ocorrida em 13 de novembro de 2024, DECIDE com efeitos a partir
de 18/11/2024: a) pela suspensão provisória das atribuições previstas na
Deliberação CSDPESC nº 108/2024 quanto a 3a Defensoria Pública de Tubarão `
            },
            ]
        },{
            question: "Núcleo Regional de Xanxerê",
            subContent: [
            {
                question: "DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE XANXERÊ",
                address: " Rua Olímpio Júlio Tortato, nº 101, Centro, Xanxerê/SC - CEP 89820-000 ",
                phone: [" 49 . 3382 2267 ", "49 . 99172 2213 "],
                email: [" xanxere@defensoria.sc.gov.br "],
                workTime: [` Segunda a Quinta, das 12h às 18h - Atendimento presencial
Sextas-feiras, somente entrega de documentos. `, "Segunda, Quarta e Sexta, das 13h30 às 17h30 "],
                details: [" Horário de Funcionamento: ", "Atendimento Externo: "],
            },{
                question: "1ª DEFENSORIA PÚBLICA DO NÚCLEO REGIONAL DE XANXERÊ",
                people:"Leonel Paraguassu Pereira Correia Silva Hora de Andrade",
                address: " Rua Olímpio Júlio Tortato, nº 101, Centro, Xanxerê/SC - CEP 89820-000 ",
                phone: ["49 . 3382 2268 "],
                email: [" xanxere01@defensoria.sc.gov.br "],
                workTime: [` Segunda a Quinta, das 12h às 18h - Atendimento presencial
Sextas-feiras, somente entrega de documentos. `, "Segunda, Quarta e Sexta, das 13h30 às 17h30 "],
                details: [" Horário de Funcionamento: ", "Atendimento Externo: "],
                description: ` Atuação Integral na Área da Infância e Juventude
Atuação Integral na área de Família e Sucessões (polo ativo/parte requerente) e na área de registros públicos, exceto curadorias especiais
Atendimento, ajuizamento e acompanhamento de demandas relacionadas à área da saúde
Assistência à mulher em situação de violência de gênero (atendimento, aconselhamento e orientação jurídica e ajuizamento e acompanhamento de medidas protetivas de urgência)

Obs: Obs: Fica mantido o acervo atual, sob responsabilidade do órgão de execução `
            },
            ]
        },{
            question: "Unidade ALESC",
            subContent: [
            {
                question: "UNIDADE ALESC – ASSEMBLÉIA LEGISLATIVA DO ESTADO DE SANTA CATARINA",
                people: "Edison Marconi Dittrich Schmitt",
                address: "Av. Rio Branco, nº 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC - CEP 88015-205 ",
                phone: [" 48 . 3221 2731 "],
                email: [" unidadealesc@defensoria.sc.gov.br "],
                workTime: [" De segunda à quinta a partir das 8h.", "De segunda à sexta das 12h às 19h. "],
                details: ["Distribuição de senhas: ", "Horário de Funcionamento: "]
            },
            ]
        }
    ]
  return (
    <div className={style.container}>
        <div className={style.faqContainer}>
            <FAQ content={data} isUnity title='NÚCLEOS E UNIDADES'></FAQ>
        </div>
    </div>
  )
}

export default AreaOfActivity