import StaticPageTemplate from '../../../../Components/StaticPageTemplate/StaticPageTemplate'
import styles from './Organograma.module.css'
import organograma from '../../../../Assets/DPE_4_63e5404187a50.jpeg'


function Organograma() {
const content = {
  tag: "div",
  props: {
    className: styles.container,
  },
  children: [ 
    {
        tag: "h1",
        props: {className: styles.title,},
        children: ["Organograma"]
    },
    {
        tag: "p",
        props: {ClassName: styles.text},
        children:["Confira os detalhes do organograma na imagem a seguir:"]
    },
    {
        tag: "img",
        props: {className: styles.image, src: organograma},
    }
   ],
};

  return (  <>
            <StaticPageTemplate content={content} toPrint={true}/>
        </>
  )
}

export default Organograma