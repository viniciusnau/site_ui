import StaticPageTemplate from '../../../Components/StaticPageTemplate/StaticPageTemplate'
import styles from './AreasOfActivity.module.css'
import civel from '../../../Assets/AreasOfActivityImages/civil.jpeg'
import consumidor from '../../../Assets/AreasOfActivityImages/consumidor.jpeg'
import criancaEAdolescente from '../../../Assets/AreasOfActivityImages/crianca_e_adolescente.jpeg'
import criminal from '../../../Assets/AreasOfActivityImages/criminal.jpeg'
import defesaDaMulher from '../../../Assets/AreasOfActivityImages/defesa_da_mulher.jpeg'
import direitosHumanos from '../../../Assets/AreasOfActivityImages/direitos_humanos.jpeg'
import familia from '../../../Assets/AreasOfActivityImages/familia.jpeg'
import fazendaPublica from '../../../Assets/AreasOfActivityImages/fazenda_publica.jpeg'
import idoso from '../../../Assets/AreasOfActivityImages/idoso.jpeg'
import juizadoEspecial from '../../../Assets/AreasOfActivityImages/juizado_especial.jpeg'
import saude from '../../../Assets/AreasOfActivityImages/saude.jpeg'
import tutelaColetiva from '../../../Assets/AreasOfActivityImages/tutela_coletiva.jpeg'

function AreasOfActivity() {
const content = {
        tag:"div",
        props: {className: styles.container},
        children: [
            {
                tag: "h1",
                props: {className: styles.title},
                children: ["Áreas de Atuação"]
            },
            {
                tag:"div",
                props: {className: styles.bodyContainer},
                children: [
                    {
                        tag: "a",
                        props: {className: styles.imageContainer, alt:"Cível",  href:"/institucional/areas-de-atuacao/civel"},
                        children: [
                            {
                                tag: "img",
                                props: {className: styles.image, alt:"Cível", src: civel,},
                                children: []
                            },
                            {
                                tag: "div",
                                props:{className: styles.textContainer},
                                children: [
                                    {
                                        tag: "h3",
                                        props: {className: styles.text},
                                        children:['Cível']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "a",
                        props: {className: styles.imageContainer, alt:"Consumidor",  href:"/institucional/areas-de-atuacao/consumidor"},
                        children: [        
                        {
                            tag: "img",
                            props: {className: styles.image, alt:"Consumidor", src: consumidor},
                            children: []
                        },
                        {
                            tag: "div",
                            props:{className: styles.textContainer},
                            children: [
                                {
                                    tag: "h3",
                                    props: {className: styles.text},
                                    children:['Consumidor']
                                }
                            ]
                        }
                    ]
                    },
                    {
                        tag: "a",
                        props: {className: styles.imageContainer, alt:"Criança e Adolescente",  href:"/institucional/areas-de-atuacao/crianca-e-adolescente"},
                        children: [ 
                            {
                                tag: "img",
                                props: {className: styles.image, alt:"Criança e Adolescente", src: criancaEAdolescente},
                                children: []
                            },
                            {
                                tag: "div",
                                props:{className: styles.textContainer},
                                children: [
                                    {
                                        tag: "h3",
                                        props: {className: styles.text},
                                        children:['Criança e Adolescente']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "a",
                        props: {className: styles.imageContainer, alt:"Criminal", href:"/institucional/areas-de-atuacao/criminal"},
                        children: [        
                            {
                                tag: "img",
                                props: {className: styles.image, alt:"Criminal", src: criminal},
                                children: []
                            }, 
                            {
                                tag: "div",
                                props:{className: styles.textContainer},
                                children: [
                                    {
                                        tag: "h3",
                                        props: {className: styles.text},
                                        children:['Criminal']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "a",
                        props: {className: styles.imageContainer, alt:"Defesa da Mulher", href:"/institucional/areas-de-atuacao/defesa-da-mulher"},
                        children: [        
                            {
                                tag: "img",
                                props: {className: styles.image, alt:"Defesa da Mulher", src: defesaDaMulher},
                                children: []
                            },
                            {
                                tag: "div",
                                props:{className: styles.textContainer},
                                children: [
                                    {
                                        tag: "h3",
                                        props: {className: styles.text},
                                        children:['Defesa da Mulher']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "a",
                        props: {className: styles.imageContainer, alt:"Direitos Humanos", href:"/institucional/areas-de-atuacao/direitos-humanos"},
                        children: [        
                            {
                                tag: "img",
                                props: {className: styles.image, alt:"Direitos Humanos", src: direitosHumanos},
                                children: []
                            },
                            {
                                tag: "div",
                                props:{className: styles.textContainer},
                                children: [
                                    {
                                        tag: "h3",
                                        props: {className: styles.text},
                                        children:['Direitos Humanos']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "a",
                        props: {className: styles.imageContainer, alt:"Família", href:"/institucional/areas-de-atuacao/familia"},
                        children: [
                            {
                                tag: "img",
                                props: {className: styles.image, alt:"Família", src: familia},
                                children: []
                            },
                            {
                                tag: "div",
                                props:{className: styles.textContainer},
                                children: [
                                    {
                                        tag: "h3",
                                        props: {className: styles.text},
                                        children:['Família']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "a",
                        props: {className: styles.imageContainer, alt:"Fazenda Pública", href:"/institucional/areas-de-atuacao/fazenda-publica"},
                        children: [        
                            {
                                tag: "img",
                                props: {className: styles.image, alt:"Fazenda Pública", src: fazendaPublica},
                                children: []
                            },
                            {
                                tag: "div",
                                props:{className: styles.textContainer},
                                children: [
                                    {
                                        tag: "h3",
                                        props: {className: styles.text},
                                        children:['Fazenda Pública']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "a",
                        props: {className: styles.imageContainer, alt:"Idoso",  href:"/institucional/areas-de-atuacao/idoso"},
                        children: [        
                            {
                                tag: "img",
                                props: {className: styles.image, alt:"Idoso", src: idoso},
                                children: []
                            },
                            {
                                tag: "div",
                                props:{className: styles.textContainer},
                                children: [
                                    {
                                        tag: "h3",
                                        props: {className: styles.text},
                                        children:['Idoso']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "a",
                        props: {className: styles.imageContainer, alt:"Juizado Especial",  href:"/institucional/areas-de-atuacao/juizado-especial"},
                        children: [        
                            {
                                tag: "img",
                                props: {className: styles.image, alt:"Juizado Especial", src: juizadoEspecial},
                                children: []
                            },
                            {
                                tag: "div",
                                props:{className: styles.textContainer},
                                children: [
                                    {
                                        tag: "h3",
                                        props: {className: styles.text},
                                        children:['Juizado Especial']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "a",
                        props: {className: styles.imageContainer, alt:"Saúde", href:"/institucional/areas-de-atuacao/saude"},
                        children: [        
                            {
                                tag: "img",
                                props: {className: styles.image, alt:"Saúde", src: saude},
                                children: []
                            },
                            {
                                tag: "div",
                                props:{className: styles.textContainer},
                                children: [
                                    {
                                        tag: "h3",
                                        props: {className: styles.text},
                                        children:['Saúde']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "a",
                        props: {className: styles.imageContainer, alt:"Tutela Coletiva",  href:"/institucional/areas-de-atuacao/tutela-coletiva"},
                        children: [        
                            {
                                tag: "img",
                                props: {className: styles.image, alt:"Tutela Coletiva", src: tutelaColetiva},
                                children: []
                            },
                            {
                                tag: "div",
                                props:{className: styles.textContainer},
                                children: [
                                    {
                                        tag: "h3",
                                        props: {className: styles.text},
                                        children:['Tutela Coletiva']
                                    }
                                ]
                            }
                        ]
                    }
            ]
        }
        ]    
};

  return (  <>
            <StaticPageTemplate content={content} />
        </>
  )
}

export default AreasOfActivity