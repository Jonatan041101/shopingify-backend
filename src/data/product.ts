import { Product } from "./types";

export const products: Product[] = [{
 categoryId: '7532a94f-d18b-455b-8850-d4f0b332809f',
 image: 'https://res.cloudinary.com/damjxqb5f/image/upload/v1688448918/lg_tsz5mj.jpg',
 name: 'Palta',
 note:'La palta es rica en grasas saludables, fibra, vitamina K, vitamina E, vitamina C, vitamina B6, ácido fólico, potasio y magnesio. Beneficia la salud cardiovascular, digestiva, inmunológica y ósea.'
}, {
 categoryId: '7532a94f-d18b-455b-8850-d4f0b332809f',
 image: 'https://res.cloudinary.com/damjxqb5f/image/upload/v1688449391/A.2.6-500GR_n9evmu.jpg',
 name: 'Banana',
 note:'La banana es una fruta rica en potasio, vitamina C, vitamina B6, fibra y antioxidantes. Ayuda a regular la presión arterial, mejora la digestión, fortalece el sistema inmunológico y aporta energía.'
 }, {
  categoryId: '7532a94f-d18b-455b-8850-d4f0b332809f',
 image: 'https://res.cloudinary.com/damjxqb5f/image/upload/v1688449390/mandarina_yxphty.jpg',
 name: 'Mandarina',
 note:'La mandarina es una fruta cítrica cargada de vitamina C, fibra y antioxidantes. Beneficia la salud del sistema inmunológico, fortalece los huesos, mejora la digestión y aporta nutrientes esenciales para el organismo.'
 },{
  categoryId: '7532a94f-d18b-455b-8850-d4f0b332809f',
 image: 'https://res.cloudinary.com/damjxqb5f/image/upload/v1688449391/1366_2000_cbusye.jpg',
 name: 'Melon',
  note:'El melón es una fruta refrescante y jugosa, rica en vitaminas A y C, así como en antioxidantes. Además, es una fuente de hidratación debido a su alto contenido de agua. Aporta fibra, potasio y otros nutrientes esenciales para el organismo, promoviendo la salud y el bienestar.'
 }, {categoryId: '7532a94f-d18b-455b-8850-d4f0b332809f',
 image: 'https://res.cloudinary.com/damjxqb5f/image/upload/v1688449391/39_igsqve.png',
 name: 'Manzana',
 note:'La manzana es una fruta nutritiva y saludable, cargada de fibra, vitaminas como la C y antioxidantes. También es baja en calorías y rica en minerales como el potasio. Su consumo regular puede ayudar a mejorar la digestión, fortalecer el sistema inmunológico y mantener un corazón saludable.'}]
export const productsDrinks: Product[] = [
 {
  categoryId: '0b06d994-e5cd-4e61-891d-441606b3457c',//Bebidas,
  name: 'Cerveza Andes',
  image: 'https://res.cloudinary.com/damjxqb5f/image/upload/v1688510880/Andes-Origen-Fresquita_koka72.jpg',
  note:'La cerveza es una bebida alcohólica, generalmente carbonatada, elaborada a partir de granos de cereal fermentados, como la cebada. Es una bebida refrescante y versátil, que puede tener una amplia variedad de estilos y sabores. Desde las cervezas ligeras y refrescantes hasta las oscuras y robustas, cada variedad tiene su propia personalidad y carácter distintivo. La cerveza puede ofrecer notas de malta, lúpulo, levadura y otros ingredientes, que se combinan para crear una experiencia única en cada sorbo. Ya sea que disfrutes de una cerveza artesanal, una lager tradicional o una cerveza de trigo con un toque cítrico, la cerveza es una compañera popular en celebraciones, reuniones sociales y momentos de relajación.'
 },
 {
  categoryId: '0b06d994-e5cd-4e61-891d-441606b3457c',//Bebidas,
  name: 'Coca-Cola',
  image: 'https://res.cloudinary.com/damjxqb5f/image/upload/v1688510880/coca-cola-min_q1z1j5.webp',
 note:'Coca-Cola, la icónica bebida carbonatada de sabor dulce y burbujeante, refresca y deleita con su distintivo sabor a cola.'
 },
 {
  categoryId: '0b06d994-e5cd-4e61-891d-441606b3457c',//Bebidas,
  name: 'Speed',
  image: 'https://res.cloudinary.com/damjxqb5f/image/upload/v1688510880/6094-F1-38_ejaitc.jpg',
  note:'Speed, la energizante bebida que impulsa tus sentidos con su potente combinación de ingredientes energéticos.'
 }
]
export const productMeat: Product[] = [
 {
  categoryId: '6ce8dd67-31b3-498a-b5dd-fc48af790a23',//Carne y pescado
  image: 'https://res.cloudinary.com/damjxqb5f/image/upload/v1688510884/descarga_uug5qi.jpg',
  name: 'Costeleta',
  note: 'La costeleta de carne es un corte jugoso y sabroso que proviene de las costillas de animales como el cerdo o la ternera. Esta carne cuenta con hueso y una capa de grasa que le aporta sabor y jugosidad durante la cocción. Las costeletas de carne son muy versátiles y pueden ser utilizadas en una amplia variedad de platos.'
 }, {
  categoryId: '6ce8dd67-31b3-498a-b5dd-fc48af790a23',//Carne y pescado
  image: 'https://res.cloudinary.com/damjxqb5f/image/upload/v1688510884/carne-molida-vacuno_r3entd.jpg',
  name: 'Carne molida',
  note:'La molida carne, un versátil ingrediente cárnico que se adapta a una variedad de deliciosas preparaciones culinarias.'
 }, {
  categoryId: '6ce8dd67-31b3-498a-b5dd-fc48af790a23',//Carne y pescado
  image: 'https://res.cloudinary.com/damjxqb5f/image/upload/v1688510884/carne-pollo_fonygc.jpg',
  name: 'Pollo',
  note:'El pollo, una jugosa y versátil carne blanca, ofrece infinitas posibilidades culinarias con su sabor delicado y textura tierna.'
 }, {
  categoryId: '6ce8dd67-31b3-498a-b5dd-fc48af790a23',//Carne y pescado
  image: 'https://res.cloudinary.com/damjxqb5f/image/upload/v1688510885/bota-para-asar-bogota_qibbyf.jpg',
  name: 'Molida',
  note:'La carne blanda, un término general que describe una textura suave y tierna en diversos tipos de carne, ofreciendo una experiencia masticable y jugosa al disfrutarla.'
 }
]