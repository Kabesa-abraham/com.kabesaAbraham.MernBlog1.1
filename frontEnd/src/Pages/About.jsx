import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen flex items-center justify-center' >
      <div className='max-w-2xl mx-auto p-3 text-center' >
        <div>
          <h1 className='text-3xl font-semibold text-center my-7' >Apropo de Abram's Blog</h1>
          <div className='text-sm lg:text-lg text-gray-500 flex flex-col gap-6' >
             <p>
                Bienvenue sur  Abram's Blog! Ce blog a été créé par  Kabesa Abraham (Actuellement Etudiant en Informatique à l'ucc Don Akam) comme un projet personnel
                pour partager ses idées et réflexions avec le monde. Kabesa est un développeur passionné qui aime écrire sur la technologie,
                le code, et tout ce qui se trouve entre les deux.
             </p>

             <p>
              Sur ce blog, vous trouverez des articles sur des sujets tels que le développement web,
              développement d'applications de bureau, mobile et les langages de programmation . Kabesa est toujours en train d'apprendre et d'explorer de 
              nouvelles technologies, alors assurez-vous de revenir souvent pour découvrir du nouveau contenu !
             </p>

             <p>
             Nous vous encourageons à laisser des commentaires sur nos articles et à échanger avec d'autres lecteurs. Vous pouvez consulter les commentaires 
             des autres et leur répondre aussi. Nous croyons qu'une communauté de lecteurs peut s'entraider pour grandir et s'améliorer.
             </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
