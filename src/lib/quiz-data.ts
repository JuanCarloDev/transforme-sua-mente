export type WoundType =
  | "abandono"
  | "rejeicao"
  | "humilhacao"
  | "traicao"
  | "injustica";

export interface QuestionOption {
  text: string;
  wound: WoundType;
}

export interface Question {
  text: string;
  hint: string;
  options: QuestionOption[];
}

export interface WoundData {
  name: string;
  sub: string;
  emoji: string;
  teaser: string;
  description: string;
  traits: string[];
  cta: string;
}

export type Scores = Record<WoundType, number>;

export const initialScores: Scores = {
  abandono: 0,
  rejeicao: 0,
  humilhacao: 0,
  traicao: 0,
  injustica: 0,
};

export const questions: Question[] = [
  {
    text: "Quando alguém próximo se afasta ou para de dar atenção, como você costuma reagir?",
    hint: "Pense em relacionamentos amorosos ou de amizade",
    options: [
      { text: "Fico apavorado(a) e faço tudo para reconquistar essa pessoa", wound: "abandono" },
      { text: "Sinto que fiz algo errado e fico com vergonha de mim mesmo(a)", wound: "rejeicao" },
      { text: "Acredito que não mereço atenção mesmo — não me surpreende", wound: "humilhacao" },
      { text: "Sinto raiva e me fecho, esperando que a pessoa venha até mim", wound: "traicao" },
      { text: "Prefiro não me apegar demais para não sofrer depois", wound: "injustica" },
    ],
  },
  {
    text: "Em grupo, como você costuma se sentir?",
    hint: "Observe seu padrão mais frequente",
    options: [
      { text: "Com medo de que as pessoas me abandonem ou se cansem de mim", wound: "abandono" },
      { text: "Sempre precisando agradar e ser aceito(a) pelo grupo", wound: "rejeicao" },
      { text: "Envergonhado(a) do meu corpo ou da minha forma de ser", wound: "humilhacao" },
      { text: "Desconfiante — acho que podem me trair ou falar mal de mim", wound: "traicao" },
      { text: "Exigente comigo mesmo(a), tentando ser perfeito(a) o tempo todo", wound: "injustica" },
    ],
  },
  {
    text: "Qual dessas frases ressoa mais com você?",
    hint: "Escolha a que você diria ou pensaria com mais frequência",
    options: [
      { text: '"Tenho medo de ser abandonado(a) pelas pessoas que amo"', wound: "abandono" },
      { text: '"Tenho medo de ser rejeitado(a) e não ser aceito(a) do jeito que sou"', wound: "rejeicao" },
      { text: '"Sinto vergonha de quem sou ou de como apareço para o mundo"', wound: "humilhacao" },
      { text: '"Tenho dificuldade de confiar — sempre espero ser traído(a)"', wound: "traicao" },
      { text: '"Nunca me sinto suficientemente bom(boa) ou justo(a) comigo"', wound: "injustica" },
    ],
  },
  {
    text: "Como você lida com críticas?",
    hint: "Mesmo críticas dadas com boa intenção",
    options: [
      { text: "Fico com medo de que a pessoa me abandone por causa disso", wound: "abandono" },
      { text: "Sinto que estou sendo rejeitado(a) como pessoa, não só o que fiz", wound: "rejeicao" },
      { text: "Sinto muita vergonha e quero sumir naquele momento", wound: "humilhacao" },
      { text: "Fico na defensiva e desconfio da intenção de quem criticou", wound: "traicao" },
      { text: "Concordo mesmo quando não devia, para evitar qualquer conflito", wound: "injustica" },
    ],
  },
  {
    text: "Como você se relaciona com seus limites pessoais?",
    hint: "Pense em situações do dia a dia",
    options: [
      { text: "Tenho dificuldade de dizer não — tenho medo de perder as pessoas", wound: "abandono" },
      { text: "Cedo facilmente para ser aceito(a) e não gerar desconforto", wound: "rejeicao" },
      { text: "Deixo as pessoas ultrapassarem meus limites por não me sentir merecedor(a)", wound: "humilhacao" },
      { text: "Imponho limites muito rígidos para me proteger de traições", wound: "traicao" },
      { text: "Sou muito rígido(a) com regras e com o que é certo ou errado", wound: "injustica" },
    ],
  },
  {
    text: "Qual é sua maior dificuldade nos relacionamentos amorosos?",
    hint: "Seja honesto(a) consigo mesmo(a)",
    options: [
      { text: "Ciúme excessivo e medo constante de ser deixado(a)", wound: "abandono" },
      { text: "Me sentir inadequado(a) e não merecedor(a) de amor", wound: "rejeicao" },
      { text: "Me expor de verdade — tenho vergonha de quem sou", wound: "humilhacao" },
      { text: "Confiar plenamente na outra pessoa sem esperar traição", wound: "traicao" },
      { text: "Me permitir errar sem me punir ou me culpar demais", wound: "injustica" },
    ],
  },
  {
    text: "Como você costuma lidar com suas emoções?",
    hint: "Observe seu padrão predominante",
    options: [
      { text: "As expresso de forma intensa, especialmente o medo de perder alguém", wound: "abandono" },
      { text: "As escondo para não me tornar um peso para os outros", wound: "rejeicao" },
      { text: "Sinto vergonha de sentir o que sinto", wound: "humilhacao" },
      { text: "Guardo tudo dentro e me fecho quando me machucam", wound: "traicao" },
      { text: "As controlo muito — tenho medo de perder o controle", wound: "injustica" },
    ],
  },
  {
    text: "O que você mais busca nas pessoas ao seu redor?",
    hint: "Pense no que te faz se sentir seguro(a)",
    options: [
      { text: "Presença constante e a certeza de que não vão embora", wound: "abandono" },
      { text: "Aprovação e aceitação do jeito que sou", wound: "rejeicao" },
      { text: "Alguém que não me julgue nem me humilhe", wound: "humilhacao" },
      { text: "Lealdade e comprometimento acima de tudo", wound: "traicao" },
      { text: "Honestidade e justiça no trato sempre", wound: "injustica" },
    ],
  },
  {
    text: "Como sua infância influenciou sua forma de se relacionar?",
    hint: "Pense no que você aprendeu sobre amor e vínculos",
    options: [
      { text: "Aprendi que as pessoas que amo podem me deixar a qualquer momento", wound: "abandono" },
      { text: "Aprendi que não sou suficientemente bom(boa) para ser amado(a)", wound: "rejeicao" },
      { text: "Aprendi a sentir vergonha de quem sou e de como me expresso", wound: "humilhacao" },
      { text: "Aprendi que as pessoas podem me trair quando menos espero", wound: "traicao" },
      { text: "Aprendi que tenho que ser perfeito(a) para merecer amor", wound: "injustica" },
    ],
  },
  {
    text: "Qual dessas situações mais te machuca?",
    hint: "Escolha a que provoca mais dor em você",
    options: [
      { text: "Ser ignorado(a) ou perceber que alguém está se distanciando", wound: "abandono" },
      { text: "Ser excluído(a) ou sentir que não pertence ao grupo", wound: "rejeicao" },
      { text: "Ser humilhado(a) ou ridicularizado(a) na frente de outros", wound: "humilhacao" },
      { text: "Ser traído(a) ou descobrir que alguém mentiu para você", wound: "traicao" },
      { text: "Ser tratado(a) de forma injusta ou desigual", wound: "injustica" },
    ],
  },
];

export const wounds: Record<WoundType, WoundData> = {
  abandono: {
    name: "Ferida do Abandono",
    sub: "O medo de ser deixado",
    emoji: "\u{1F311}",
    teaser:
      "Você carrega um medo profundo de ser deixado para trás — e isso molda cada escolha que você faz nos seus relacionamentos.",
    description:
      "A ferida do abandono nasce geralmente na infância, quando a criança vivencia ausências emocionais ou físicas dos pais ou cuidadores. Esse padrão cria um adulto que vive em alerta constante de perda, que se apega intensamente e que às vezes faz coisas que não queria para garantir que as pessoas fiquem. A boa notícia é que quando reconhecemos essa ferida, podemos começar a criar vínculos mais saudáveis e seguros.",
    traits: [
      "Medo intenso de ser abandonado(a) ou deixado(a) para trás",
      "Tendência a se apegar demais ou sufocar as pessoas que ama",
      "Ciúmes frequentes e necessidade constante de reasseguramento",
      "Dificuldade de ficar sozinho(a) sem se sentir ansioso(a)",
      "Padrão de se relacionar com pessoas emocionalmente indisponíveis",
    ],
    cta: "Quer entender como essa ferida surgiu e como se curar dela?",
  },
  rejeicao: {
    name: "Ferida da Rejeição",
    sub: "O medo de não ser aceito",
    emoji: "\u{1F312}",
    teaser:
      "Você passou a vida tentando se encaixar, agradar e ser aceito — porque no fundo, sente que do jeito que é, não é suficiente.",
    description:
      "A ferida da rejeição é uma das mais dolorosas porque atinge diretamente o senso de valor pessoal. Quem carrega essa ferida frequentemente sente que precisa se tornar outra pessoa para ser amado(a) e aceito(a). Esse padrão leva à busca constante por aprovação externa e à dificuldade de se amar de forma incondicional. A cura passa por reconhecer que você é digno(a) de amor e pertencimento exatamente como é.",
    traits: [
      "Necessidade constante de aprovação das pessoas ao redor",
      "Dificuldade em se expressar com medo de ser julgado(a)",
      "Sensação de que nunca é suficientemente bom(boa)",
      "Tendência a se anular e se calar para agradar os outros",
      "Mágoa intensa quando sente que não foi aceito(a)",
    ],
    cta: "Quer descobrir como parar de buscar aprovação e se amar de verdade?",
  },
  humilhacao: {
    name: "Ferida da Humilhação",
    sub: "A vergonha de existir",
    emoji: "\u{1F313}",
    teaser:
      "Você aprendeu cedo que havia algo errado em você — e carrega até hoje uma vergonha profunda de quem é, do seu corpo ou das suas emoções.",
    description:
      "A ferida da humilhação surge quando a criança é envergonhada, ridicularizada ou constantemente criticada. O resultado é um adulto que sente vergonha de se mostrar, que se esconde atrás de uma imagem construída e que tem dificuldade de receber elogios ou reconhecimento. Curar essa ferida significa aprender a se mostrar ao mundo sem medo e reconhecer que você tem valor inerente.",
    traits: [
      "Vergonha do próprio corpo, emoções ou forma de ser",
      "Dificuldade em receber elogios ou reconhecimento sem desconfiar",
      "Tendência a se diminuir ou se colocar como menos importante",
      "Medo de ser exposto(a), julgado(a) ou ridicularizado(a)",
      "Comportamentos de autossabotagem para não se destacar",
    ],
    cta: "Quer aprender a se mostrar ao mundo sem vergonha e sem medo?",
  },
  traicao: {
    name: "Ferida da Traição",
    sub: "A dificuldade de confiar",
    emoji: "\u{1F314}",
    teaser:
      "Você já foi tão machucado(a) por pessoas em quem confiava, que hoje tem dificuldade de se abrir de verdade — e carrega esse escudo para se proteger.",
    description:
      "A ferida da traição nasce quando promessas são quebradas, segredos são revelados ou quando figuras de confiança desapontam profundamente. Quem carrega essa ferida tende a ser controlador(a), desconfiante e tem dificuldade de delegar ou se vulnerabilizar. A cura não significa ser ingênuo(a) — significa aprender a confiar com sabedoria e a se abrir para conexões genuínas.",
    traits: [
      "Grande dificuldade de confiar nas pessoas ao redor",
      "Tendência a controlar situações, pessoas e resultados",
      "Hipervigilância — sempre esperando ser traído(a) de alguma forma",
      "Dificuldade de pedir ajuda ou mostrar vulnerabilidade",
      "Lealdade muito intensa com quem considera digno de confiança",
    ],
    cta: "Quer aprender a confiar novamente sem se colocar em risco?",
  },
  injustica: {
    name: "Ferida da Injustiça",
    sub: "A busca pela perfeição",
    emoji: "\u{1F315}",
    teaser:
      "Você aprendeu que o amor era condicional — que só merecia ser amado(a) se fosse perfeito(a). E até hoje cobra demais de si mesmo(a).",
    description:
      "A ferida da injustiça nasce em ambientes muito rígidos, frios ou perfeccionistas. A criança aprende que para ser amada, precisa ser perfeita, justa e impecável. O resultado é um adulto extremamente crítico consigo mesmo(a), com dificuldade de aceitar os próprios erros e com padrões de exigência muito altos. Curar essa ferida é aprender que você já é suficiente — mesmo imperfeito(a).",
    traits: [
      "Autocrítica excessiva e dificuldade de aceitar os próprios erros",
      "Padrões de exigência muito altos para si mesmo(a)",
      "Dificuldade em relaxar e simplesmente 'ser humano(a)'",
      "Rigidez com regras — o certo e o errado são muito claros",
      "Sensação de que nunca faz o suficiente, mesmo fazendo muito",
    ],
    cta: "Quer aprender a se tratar com mais gentileza e compaixão?",
  },
};
