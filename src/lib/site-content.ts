export type SiteLocale = "pt" | "en";

export const downloadFiles = {
  pt: {
    book: "/downloads/transforme-sua-mente-portugues.pdf",
    cover: "/downloads/transforme-sua-mente-capa-portugues.pdf",
  },
  en: {
    book: "/downloads/transform-your-mind-english.pdf",
    cover: "/downloads/transform-your-mind-cover-english.pdf",
  },
} as const;

export const siteContent = {
  pt: {
    htmlLang: "pt-BR",
    switchLabel: "EN",
    switchHref: "/en",
    bookTitle: "Transforme Sua Mente",
    shortBookTitle: "Transforme Sua Mente",
    navQuiz: "Quiz",
    navDownload: "Baixar livro",
    hero: {
      eyebrow: "Disponível agora",
      titleLine1: "Transforme",
      titleLine2: "Sua Mente",
      tagline: "Ciência, Fé e a Superação dos Traumas",
      description:
        "Uma obra que integra psicanálise, neurociência e teologia cristã para iluminar as raízes do trauma emocional e abrir caminhos reais de cura e restauração da identidade.",
      button: "Baixar o Livro",
      note: "PDF gratuito · Edições em português e inglês",
      cover: "/covers/transforme-sua-mente-cover-portuguese.png",
      coverAlt: "Capa do livro Transforme Sua Mente",
      discover: "Descubra",
    },
    pain: {
      eyebrow: "Você se reconhece?",
      title: "As feridas que ninguém vê",
      titleMuted: "mas que controlam tudo",
      description:
        "Muitos adultos carregam dores da infância sem perceber como elas moldam cada decisão, cada relacionamento e cada padrão de autossabotagem.",
      cards: [
        {
          title: "Medo de não ser suficiente",
          desc: 'Críticas internalizadas na infância que se tornaram crenças: "não sou bom o bastante", "não mereço amor".',
        },
        {
          title: "Padrões que se repetem",
          desc: "Relacionamentos que sempre terminam igual. Autossabotagem quando tudo parece dar certo. O ciclo que não se quebra.",
        },
        {
          title: "Ansiedade e vazio crônico",
          desc: "A hipervigilância constante, a dificuldade de confiar e a sensação de que algo essencial está faltando dentro de você.",
        },
      ],
    },
    quote: {
      text: "O trauma não é o fim da história. É o ponto a partir do qual a história pode, enfim, ser reescrita.",
      author: "Do livro Transforme Sua Mente",
      freud: "Quando a dor de não estar vivendo for maior que o medo da mudança, a pessoa muda.",
    },
    about: {
      eyebrow: "Sobre o livro",
      title: "Onde a ciência encontra a fé",
      intro:
        "Uma abordagem que não opõe psicologia e espiritualidade. Ambas apontam para as mesmas verdades por caminhos complementares.",
      paragraphs: [
        "Transforme Sua Mente nasce da convicção de que a cura emocional e a restauração espiritual não são caminhos distintos, mas movimentos complementares. A psicologia nos fornece a linguagem e a compreensão dos processos internos; a fé nos oferece sentido, direção e transcendência.",
        "Ao longo de 12 capítulos, Ricardo Batista Cavassin conduz o leitor por uma jornada que vai das origens do trauma na infância até os caminhos práticos de restauração, passando pela formação de crenças limitantes, padrões geracionais, mecanismos de defesa e o poder da renovação da mente.",
        "Fundamentado em autores como Freud, Winnicott, Bowlby, Bandura, Gabor Maté e Van der Kolk, e ancorado na Palavra de Deus, especialmente em Romanos 12:2, este livro é ao mesmo tempo profundo e acessível, técnico e pastoral.",
      ],
      features: [
        {
          title: "Base Psicanalítica Sólida",
          desc: "15+ autores renomados da psicologia e neurociência, com conceitos explicados de forma acessível.",
          stat: "15+ autores",
        },
        {
          title: "Fundamentação Bíblica",
          desc: "30+ referências bíblicas integradas naturalmente, do Antigo ao Novo Testamento.",
          stat: "30+ refs",
        },
        {
          title: "Casos Reais",
          desc: "Histórias que criam identificação, como Ana, que cresceu sendo criticada, e o homem que não conseguia confiar.",
          stat: "12 casos",
        },
        {
          title: "Caminhos de Cura",
          desc: "Além do diagnóstico, o livro apresenta caminhos reais de reconexão, hábitos e enfrentamento.",
          stat: "Prático",
        },
      ],
    },
    chapters: {
      eyebrow: "Conteúdo",
      title: "12 capítulos de transformação",
      description: "Uma jornada em três fases, da compreensão ao enfrentamento e do enfrentamento à restauração.",
      phase: "Fase",
      phases: [
        {
          label: "Compreender",
          chapters: [
            { num: "01", title: "O Convite à Transformação", desc: "Romanos 12:2 como tese central. A infância e a renovação da mente." },
            { num: "02", title: "A Criança Interior", desc: "Como as primeiras feridas se tornam estruturas internas." },
            { num: "03", title: "A Construção da Identidade", desc: "Criação, Queda, ambiente e o papel da figura paterna." },
            { num: "04", title: "Crenças Limitantes", desc: "Esquemas cognitivos e figuras que distorcem a verdade." },
          ],
        },
        {
          label: "Enfrentar",
          chapters: [
            { num: "05", title: "Aprendizagem Social", desc: "Bandura, Skinner e a transmissão de padrões." },
            { num: "06", title: "O Trauma Emocional", desc: "Freud, Bowlby, Van der Kolk, Levine e Gabor Maté." },
            { num: "07", title: "Carne e Espírito", desc: "Gálatas 5 sob uma leitura psicanalítica." },
            { num: "08", title: "A Dor como Mecanismo", desc: "Vergonha, medo, culpa, fuga e mecanismos de defesa." },
          ],
        },
        {
          label: "Restaurar",
          chapters: [
            { num: "09", title: "Traumas Geracionais", desc: "Herança emocional e transmissão intergeracional." },
            { num: "10", title: "Consequências das Feridas", desc: "Dissociação, vícios, agressividade e as cinco feridas." },
            { num: "11", title: "Reconexão e Hábitos", desc: "O aqui e agora, a natureza do hábito e o enfrentamento." },
            { num: "12", title: "Há Esperança", desc: "Perdão, restauração e a renovação que transforma." },
          ],
        },
      ],
    },
    stats: [
      { target: 12, suffix: "", label: "Capítulos" },
      { target: 36, suffix: "k", label: "Palavras" },
      { target: 15, suffix: "+", label: "Autores Citados" },
      { target: 30, suffix: "+", label: "Ref. Bíblicas" },
    ],
    author: {
      eyebrow: "O Autor",
      role: "Professor · Historiador · Psicanalista · Escritor",
      body:
        "Ricardo estuda a interseção entre psicanálise e teologia cristã, com anos de dedicação à compreensão dos traumas emocionais e de seus efeitos na identidade humana. Sua abordagem combina rigor acadêmico com sensibilidade pastoral, criando pontes entre a ciência do comportamento e a fé cristã.",
      closing:
        '“Transforme Sua Mente” é o resultado dessa jornada de pesquisa e vivência, um convite a olhar para dentro com coragem e encontrar, na renovação da mente, o caminho para a verdadeira liberdade.',
    },
    downloads: {
      eyebrow: "Download gratuito",
      title: "Escolha sua edição",
      description: "O livro completo e a capa editorial estão disponíveis em português e inglês.",
      bookButton: "Baixar livro em PDF",
      coverButton: "Baixar capa em PDF",
      ptLabel: "Português",
      ptDescription: "Edição original revisada",
      enLabel: "Inglês",
      enDescription: "Edição completa em inglês",
    },
    quiz: {
      eyebrow: "Quiz Gratuito",
      title: "Descubra qual Ferida Emocional",
      titleMuted: "está influenciando sua vida",
      description:
        "Responda 10 perguntas e descubra qual ferida emocional está moldando seus relacionamentos, escolhas e forma de se ver.",
      button: "Fazer o Quiz Agora",
    },
    final: {
      eyebrow: "Comece agora",
      title: "Há esperança. Há cura.",
      titleMuted: "Há um caminho.",
      description: "Leia no seu ritmo, marque as passagens importantes e dê o primeiro passo rumo à renovação da mente.",
      button: "Escolher edição",
      note: "Download gratuito · PDF",
    },
    footerRights: "Todos os direitos reservados.",
    contact: "Contato",
  },
  en: {
    htmlLang: "en",
    switchLabel: "PT",
    switchHref: "/",
    bookTitle: "Transform Your Mind",
    shortBookTitle: "Transform Your Mind",
    navQuiz: "Quiz",
    navDownload: "Download book",
    hero: {
      eyebrow: "Available now",
      titleLine1: "Transform",
      titleLine2: "Your Mind",
      tagline: "Science, Faith, and Overcoming Trauma",
      description:
        "A work that brings psychoanalysis, neuroscience, and Christian theology together to illuminate the roots of emotional trauma and open real paths toward healing and restored identity.",
      button: "Download the Book",
      note: "Free PDF · Portuguese and English editions",
      cover: "/covers/transform-your-mind-cover.png",
      coverAlt: "Cover of the book Transform Your Mind",
      discover: "Discover",
    },
    pain: {
      eyebrow: "Do you recognize yourself?",
      title: "The wounds no one can see",
      titleMuted: "yet they control everything",
      description:
        "Many adults carry childhood pain without realizing how it shapes every decision, relationship, and pattern of self-sabotage.",
      cards: [
        {
          title: "Fear of not being enough",
          desc: 'Criticism internalized in childhood that became beliefs: "I am not good enough" and "I do not deserve love."',
        },
        {
          title: "Patterns that keep repeating",
          desc: "Relationships that always end the same way. Self-sabotage when everything seems to be going well. A cycle that will not break.",
        },
        {
          title: "Anxiety and chronic emptiness",
          desc: "Constant hypervigilance, difficulty trusting others, and the feeling that something essential is missing inside you.",
        },
      ],
    },
    quote: {
      text: "Trauma is not the end of the story. It is the point from which the story can finally be rewritten.",
      author: "From the book Transform Your Mind",
      freud: "When the pain of not living becomes greater than the fear of change, a person changes.",
    },
    about: {
      eyebrow: "About the book",
      title: "Where science meets faith",
      intro:
        "An approach that does not set psychology against spirituality. Both point toward the same truths through complementary paths.",
      paragraphs: [
        "Transform Your Mind was born from the conviction that emotional healing and spiritual restoration are not separate paths, but complementary movements. Psychology gives us language and insight into our inner processes; faith offers meaning, direction, and transcendence.",
        "Across 12 chapters, Ricardo Batista Cavassin guides readers from the origins of childhood trauma to practical paths of restoration, exploring limiting beliefs, generational patterns, defense mechanisms, and the power of renewing the mind.",
        "Grounded in authors such as Freud, Winnicott, Bowlby, Bandura, Gabor Maté, and Van der Kolk, and anchored in the Word of God, especially Romans 12:2, this book is both profound and accessible, technical and pastoral.",
      ],
      features: [
        {
          title: "A Solid Psychoanalytic Foundation",
          desc: "More than 15 respected voices in psychology and neuroscience, with their ideas explained accessibly.",
          stat: "15+ authors",
        },
        {
          title: "Biblical Grounding",
          desc: "More than 30 biblical references woven naturally throughout the Old and New Testaments.",
          stat: "30+ refs",
        },
        {
          title: "Real Stories",
          desc: "Stories that create recognition, including Ana, who grew up under criticism, and the man who could not trust.",
          stat: "12 stories",
        },
        {
          title: "Paths Toward Healing",
          desc: "Beyond diagnosis, the book offers real paths toward reconnection, new habits, and courageous confrontation.",
          stat: "Practical",
        },
      ],
    },
    chapters: {
      eyebrow: "Inside the book",
      title: "12 chapters of transformation",
      description: "A journey in three phases, from understanding to confrontation and from confrontation to restoration.",
      phase: "Phase",
      phases: [
        {
          label: "Understand",
          chapters: [
            { num: "01", title: "The Invitation to Transformation", desc: "Romans 12:2 as the central thesis. Childhood and the renewal of the mind." },
            { num: "02", title: "The Inner Child", desc: "How early wounds become internal structures." },
            { num: "03", title: "The Construction of Identity", desc: "Creation, the Fall, environment, and the role of the father figure." },
            { num: "04", title: "Limiting Beliefs", desc: "Cognitive schemas and figures that distort the truth." },
          ],
        },
        {
          label: "Confront",
          chapters: [
            { num: "05", title: "Social Learning", desc: "Bandura, Skinner, and the transmission of patterns." },
            { num: "06", title: "Emotional Trauma", desc: "Freud, Bowlby, Van der Kolk, Levine, and Gabor Maté." },
            { num: "07", title: "Flesh and Spirit", desc: "Galatians 5 through a psychoanalytic lens." },
            { num: "08", title: "Pain as a Mechanism", desc: "Shame, fear, guilt, escape, and defense mechanisms." },
          ],
        },
        {
          label: "Restore",
          chapters: [
            { num: "09", title: "Generational Trauma", desc: "Emotional inheritance and intergenerational transmission." },
            { num: "10", title: "Consequences of Emotional Wounds", desc: "Dissociation, addiction, aggression, and the five wounds." },
            { num: "11", title: "Reconnection and Habits", desc: "The here and now, the nature of habit, and confrontation." },
            { num: "12", title: "There Is Hope", desc: "Forgiveness, restoration, and the renewal that transforms." },
          ],
        },
      ],
    },
    stats: [
      { target: 12, suffix: "", label: "Chapters" },
      { target: 36, suffix: "k", label: "Words" },
      { target: 15, suffix: "+", label: "Authors Cited" },
      { target: 30, suffix: "+", label: "Bible References" },
    ],
    author: {
      eyebrow: "The Author",
      role: "Professor · Historian · Psychoanalyst · Writer",
      body:
        "Ricardo studies the intersection of psychoanalysis and Christian theology, with years devoted to understanding emotional trauma and its effects on human identity. His approach combines academic rigor with pastoral sensitivity, building bridges between behavioral science and Christian faith.",
      closing:
        '“Transform Your Mind” is the result of that journey of research and lived experience, an invitation to look within courageously and find the path to true freedom through the renewal of the mind.',
    },
    downloads: {
      eyebrow: "Free download",
      title: "Choose your edition",
      description: "The complete book and its editorial cover are available in Portuguese and English.",
      bookButton: "Download book PDF",
      coverButton: "Download cover PDF",
      ptLabel: "Portuguese",
      ptDescription: "Original revised edition",
      enLabel: "English",
      enDescription: "Complete English edition",
    },
    quiz: {
      eyebrow: "Free Quiz",
      title: "Discover Which Emotional Wound",
      titleMuted: "is influencing your life",
      description:
        "Answer 10 questions and discover which emotional wound is shaping your relationships, choices, and the way you see yourself. The quiz is currently available in Portuguese.",
      button: "Take the Quiz",
    },
    final: {
      eyebrow: "Begin now",
      title: "There is hope. There is healing.",
      titleMuted: "There is a way forward.",
      description: "Read at your own pace, mark the passages that matter, and take the first step toward renewing your mind.",
      button: "Choose an edition",
      note: "Free download · PDF",
    },
    footerRights: "All rights reserved.",
    contact: "Contact",
  },
} as const;

export type SiteCopy = (typeof siteContent)[SiteLocale];
