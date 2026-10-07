export type Block =
  | { kind: "text"; body: string }
  | { kind: "heading"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "technique"; name: string; steps: string[]; mistake?: string };

export type Lesson = {
  id: string;
  title: string;
  goal: string;
  blocks: Block[];
};

export type LessonGroup = {
  title: string | null;
  lessons: Lesson[];
};

export type Chapter = {
  id: string;
  title: string;
  lead: string;
  groups: LessonGroup[];
};

function text(body: string): Block {
  return { kind: "text", body };
}

function heading(text: string): Block {
  return { kind: "heading", text };
}

function list(items: string[]): Block {
  return { kind: "list", items };
}

function technique(name: string, steps: string[], mistake?: string): Block {
  return { kind: "technique", name, steps, mistake };
}

function lesson(id: string, title: string, goal: string, blocks: Block[]): Lesson {
  return { id, title, goal, blocks };
}

export const CHAPTERS: Chapter[] = [
  {
    id: "conceitos",
    title: "Conceitos",
    lead: "Posições, pontos e o que a luta pede.",
    groups: [
      {
        title: null,
        lessons: [
          lesson("conceitos", "Conceitos", "Explicar as posições, a pontuação e o que o jiu-jitsu faz.", [
            text("O jiu-jitsu é a arte suave. Jū é suave. Jutsu é arte. Usa alavanca, técnica e timing para o menor vencer o maior. Gasta pouca energia e cuida do parceiro."),
            text("Veio do judô e do jiu-jitsu japonês, com Mitsuyo Maeda. Carlos e Hélio Gracie trouxeram isso para o Brasil."),
            text("A luta tem duas coisas: finalização e pontuação."),
            heading("Finalizações"),
            list([
              "Estrangulamentos.",
              "Chave de perna, pé, ombro, mão, tornozelo, coluna e joelho.",
            ]),
            heading("Posições"),
            technique("Queda", [
              "Os dois começam em pé. O objetivo é levar o outro ao chão.",
              "Quatro formas: sentado, de costas, de lado ou de quatro apoios.",
              "De quatro apoios: pelo menos um joelho dele no chão e você no controle.",
              "Para pontuar, segura 3 segundos.",
            ]),
            technique("Guarda", [
              "A ferramenta são as pernas. Elas impedem a passagem.",
              "O controle é lateral, longitudinal ou transversal.",
              "Depois pode vir outro controle: joelho na barriga ou montada.",
            ]),
            technique("Raspagem", [
              "Sai da guarda e leva o outro ao chão.",
              "As mesmas quatro formas da queda: sentado, de costas, de lado ou de quatro apoios.",
              "De quatro apoios: pelo menos um joelho no chão e você no controle.",
              "Se ele cair de bruços, espera. Ainda não há desfecho.",
            ]),
            technique("Passagem de guarda", [
              "Você está dentro da guarda dele.",
              "Ultrapassa as pernas e chega no controle lateral, longitudinal ou transversal.",
            ]),
            technique("Joelho na barriga", [
              "Nesta posição não existe guarda.",
              "Livre da guarda, joelho ou canela no tronco dele, de frente ou de costas.",
              "Pelo menos um joelho em cima, controlando.",
            ]),
            technique("Montada de frente", [
              "Livre da guarda, sentado no tronco, controlando.",
              "Pelo menos um joelho no tatame.",
            ]),
            technique("Montada de costas", ["Os dois joelhos no tatame."]),
            technique("Pegada de costas", [
              "Usa ganchos. Os pés não se cruzam. Cruzado é cadeado, não gancho.",
              "O braço não é obrigatório.",
              "Três pontos: dois ganchos e o controle do quadril dele.",
            ]),
            technique("100 kg", [
              "Não é um controle. É o fim de um movimento que vira controle.",
              "Exemplo: o fim de uma raspagem ou de uma passagem de guarda.",
            ]),
            heading("Pontuação"),
            list([
              "Queda: 2. Leva de pé ao chão e cai por cima, no controle.",
              "Raspagem: 2. Sai de baixo e fica por cima.",
              "Joelho na barriga: 2.",
              "Passagem de guarda: 3. Passa as pernas e firma o controle.",
              "Montada: 4.",
              "Pegada de costas: 4.",
            ]),
            text("Cada posição pede 3 segundos firme. Vantagem e penalidade desempatam."),
          ]),
        ],
      },
    ],
  },
  {
    id: "fundamentos",
    title: "Fundamentos",
    lead: "Cair, rolar e recuperar a distância sem se machucar.",
    groups: [
      {
        title: null,
        lessons: [
          lesson("fundamentos", "Fundamentos", "Rolar, amortecer a queda e fugir com o quadril.", [
            technique(
              "Rolamento frontal",
              [
                "Mão e braço apoiam no chão. Queixo no peito.",
                "Rola na diagonal: um ombro, depois a costa do outro lado.",
                "Termina em pé ou sentado.",
              ],
              "Rolar em cima da cabeça ou da coluna.",
            ),
            technique(
              "Rolamento lateral",
              ["A mesma lógica do frontal, rolando de lado."],
              "A cabeça toca o chão.",
            ),
            technique(
              "Rolamento para trás",
              ["Senta, queixo no peito.", "Rola por cima do ombro. As mãos empurram o chão."],
              "Pescoço sem proteção.",
            ),
            technique(
              "Amortecimento (ukemi)",
              [
                "Queixo no peito.",
                "O braço bate no chão a uns 45°, com a palma aberta.",
                "Não apoia a mão nem o cotovelo.",
                "Variações: costas, lado e frente.",
              ],
              "Cair com o braço esticado ou apoiado.",
            ),
            technique(
              "Fuga de quadril",
              [
                "De costas, com os pés no chão.",
                "Empurra o chão, tira o quadril para o lado e recupera a distância.",
                "Serve para recolocar a guarda.",
              ],
              "Mexer só as pernas, sem o quadril.",
            ),
            technique(
              "Taisabaki",
              [
                "Esquiva com giro do corpo. Sai da linha do ataque.",
                "O pivô é nos pés.",
                "É a base das entradas de queda e da defesa pessoal.",
              ],
              "Girar sem equilíbrio ou sem base.",
            ),
          ]),
        ],
      },
    ],
  },
  {
    id: "defesa",
    title: "Defesa pessoal",
    lead: "Sair da linha, proteger a cabeça e ir embora ou levar ao chão. Fugir é a melhor opção.",
    groups: [
      {
        title: null,
        lessons: [
          lesson("defesa-pessoal", "Defesa pessoal", "Neutralizar o ataque e sair, ou conduzir ao chão.", [
            heading("Princípios"),
            list([
              "Sair da linha de ataque.",
              "Proteger a cabeça.",
              "Controlar a distância.",
              "Neutralizar.",
              "Levar ao chão ou fugir.",
            ]),
            heading("Situações"),
            technique("Agarrão de pulso", ["Gira o pulso contra o polegar dele e puxa."]),
            technique("Agarrão de roupa ou gola", [
              "Prende a mão dele no seu peito.",
              "Gira o corpo e controla ou projeta.",
            ]),
            technique("Estrangulamento frontal", [
              "Abaixa o queixo.",
              "Sobe os braços por dentro, gira e quebra a pegada.",
              "Contra-ataca.",
            ]),
            technique("Estrangulamento por trás", [
              "Protege o queixo e puxa o braço dele.",
              "Gira para o lado do braço que passou.",
              "Sai e controla.",
            ]),
            technique("Abraço de urso, braços livres", [
              "Base baixa, quadril para trás.",
              "Mãos no quadril ou no rosto dele.",
              "Projeta ou foge.",
            ]),
            technique("Abraço de urso, braços presos", [
              "Desce o centro de gravidade.",
              "Pisão ou cabeçada.",
              "Gira o quadril e projeta.",
            ]),
            technique("Soco", [
              "Taisabaki e bloqueio.",
              "Entra na distância, faz o clinch e aplica queda ou controle.",
            ]),
            technique("Chute", ["Esquiva em taisabaki.", "Pega a perna e derruba, no single leg."]),
            technique("Agressor em cima, no chão", ["Entra na guarda ou faz a saída.", "Levanta com técnica."]),
          ]),
        ],
      },
    ],
  },
  {
    id: "quedas",
    title: "Quedas",
    lead: "Desequilibrar, entrar, projetar e controlar. Tori projeta. Uke cai.",
    groups: [
      {
        title: "Pernas",
        lessons: [
          lesson("queda-single-leg", "1. Single leg", "Derrubar pegando uma perna.", [
            text("Queda de pernas."),
            heading("Como fazer"),
            list([
              "Muda de nível e penetra.",
              "Pega uma perna. A cabeça cola no lado do corpo dele.",
              "Controla o tronco, a manga ou a gola. Leva o peso para uma base estreita.",
              "Levanta a perna e empurra o ombro, ou corre o pipe.",
              "Derruba e fica com a perna controlada.",
            ]),
          ]),
          lesson("queda-morote-gari", "2. Morote-gari", "Derrubar pegando as duas pernas.", [
            text("Double leg. Queda de pernas."),
            heading("Como fazer"),
            list([
              "Muda de nível. O joelho vai ao chão e o ombro ao quadril.",
              "Pega as duas pernas por trás dos joelhos, por trás ou em volta.",
              "Avança com o tronco e conduz para trás.",
              "Puxa as pernas e empurra com o ombro.",
              "Derruba nas costas ou de lado.",
            ]),
          ]),
          lesson("queda-kibisu-gaeshi", "3. Kibisu-gaeshi", "Derrubar pelo calcanhar.", [
            text("Queda de pernas."),
            heading("Como fazer"),
            list([
              "Entra baixo. Pega o calcanhar, ou a calça, e a gola.",
              "Desequilibra para trás. Pode conduzir de lado ao mesmo tempo.",
              "Empurra o tronco ou o ombro.",
              "Puxa ou levanta o calcanhar e leva ao chão.",
            ]),
          ]),
        ],
      },
      {
        title: "Ceifa",
        lessons: [
          lesson("queda-o-soto-gari", "4. O-soto-gari", "Ceifar a perna de apoio por fora.", [
            text("Ceifa."),
            heading("Como fazer"),
            list([
              "Pegada de gola e manga.",
              "Passo ao lado do pé de apoio. Leva o peso para essa perna, para trás.",
              "Ceifa essa perna por fora.",
              "Empurra o tronco e projeta para trás.",
            ]),
          ]),
          lesson("queda-o-uchi-gari", "5. O-uchi-gari", "Ceifar por dentro a perna que está longe.", [
            text("Ceifa."),
            heading("Como fazer"),
            list([
              "Pegada de gola e manga.",
              "Entra com um pé entre as pernas dele.",
              "Leva o peso para a perna mais afastada, para trás.",
              "Ceifa essa perna por dentro e leva ao chão.",
            ]),
          ]),
          lesson("queda-ko-uchi-gari", "6. Ko-uchi-gari", "Varrer o calcanhar por dentro.", [
            text("Ceifa."),
            heading("Como fazer"),
            list([
              "Pegada de gola e manga.",
              "Desequilibra para trás. O peso vai para o calcanhar.",
              "Com a planta do pé, varre o calcanhar por dentro, para o lado varrido.",
              "Derruba.",
            ]),
          ]),
        ],
      },
      {
        title: "Quadril e ombro",
        lessons: [
          lesson("queda-ippon-seoi-nage", "7. Ippon seoi nage", "Projetar por cima do ombro, com um braço sob a axila.", [
            text("Queda de quadril e ombro."),
            heading("Como fazer"),
            list([
              "Uma mão na manga. O outro braço entra sob a axila. Pode ser manga e gola, ou o braço.",
              "Puxa para a frente e gira de costas para ele.",
              "Quadril baixo. Carrega nas costas.",
              "Projeta por cima do ombro.",
            ]),
          ]),
          lesson("queda-morote-seoi-nage", "8. Morote seoi nage", "Projetar por cima do ombro com gola e manga.", [
            text("Igual ao ippon seoi nage, com as duas mãos na pegada."),
            heading("Como fazer"),
            list([
              "Pegada de gola e manga. O antebraço fica sob a axila.",
              "Puxa para a frente e gira de costas para ele.",
              "Encaixa nas costas.",
              "Projeta por cima do ombro.",
            ]),
          ]),
          lesson("queda-koshi-guruma", "9. Koshi-guruma", "Rodar o outro sobre o quadril, com o braço na cabeça.", [
            text("Queda de quadril."),
            heading("Como fazer"),
            list([
              "Pegada de gola e manga. Um braço envolve a cabeça ou o pescoço.",
              "Conduz para a frente e gira de costas.",
              "O quadril fica abaixo do dele.",
              "Roda o uke sobre o quadril.",
            ]),
          ]),
          lesson("queda-o-goshi", "10. O-goshi", "Projetar sobre o quadril, com o braço na cintura.", [
            text("Queda de quadril."),
            heading("Como fazer"),
            list([
              "Pegada de gola e manga, ou controle do tronco. O braço envolve a cintura.",
              "Puxa para a frente e gira de costas.",
              "Encaixa o quadril abaixo do centro de gravidade dele.",
              "Estende as pernas e projeta sobre o quadril.",
            ]),
          ]),
          lesson("queda-tai-otoshi", "11. Tai-otoshi", "Bloquear a frente com a perna e projetar.", [
            text("A perna estendida faz o bloqueio. O corpo gira e puxa."),
            heading("Como fazer"),
            list([
              "Pegada de gola e manga.",
              "Puxa para a frente e conduz na diagonal. Passo e giro.",
              "A perna estendida bloqueia a frente dele.",
              "Puxa, gira e projeta por cima desse bloqueio.",
            ]),
          ]),
          lesson("queda-harai-goshi", "14. Harai-goshi", "Encaixar o quadril e varrer a coxa.", [
            text("Queda de quadril com a perna."),
            heading("Como fazer"),
            list([
              "Pegada de gola e manga.",
              "Puxa para a frente e gira de costas, como no o-goshi.",
              "Encaixa o quadril.",
              "Varre a coxa dele com a sua perna e projeta em rotação.",
            ]),
          ]),
        ],
      },
      {
        title: "Sacrifício",
        lessons: [
          lesson("queda-tani-otoshi", "12. Tani-otoshi", "Cair para o lado e levar o outro por cima da sua perna.", [
            text("Sacrifício lateral."),
            heading("Como fazer"),
            list([
              "Pegada de tronco, gola ou manga.",
              "Fica atrás ou ao lado. Conduz para trás ou para o lado.",
              "A sua perna bloqueia a perna dele.",
              "Senta ou cai para trás, ou para o lado, e leva ele ao chão.",
            ]),
          ]),
          lesson("queda-tomoe-nage", "13. Tomoe-nage", "Cair para trás e projetar com o pé no abdômen.", [
            text("Sacrifício."),
            heading("Como fazer"),
            list([
              "Pegada de gola e manga.",
              "Puxa para a frente, senta e cai para trás.",
              "O pé apoia no abdômen ou no quadril.",
              "Projeta por cima da sua cabeça.",
            ]),
          ]),
        ],
      },
      {
        title: "Pegada",
        lessons: [
          lesson("queda-cinturada", "15. Cinturada", "Projetar pelo abraço na cintura.", [
            text("Queda de pegada."),
            heading("Como fazer"),
            list([
              "Abraça a cintura pela frente ou de lado. As mãos se juntam, ou seguram o cinturão.",
              "Cola o corpo no dele.",
              "Desequilibra para trás ou para o lado.",
              "Projeta com o abraço, o quadril e a condução do corpo.",
            ]),
          ]),
        ],
      },
    ],
  },
  {
    id: "guardas",
    title: "Guardas",
    lead: "Em cada guarda: o que ela é, 3 saídas e 3 raspagens.",
    groups: [
      {
        title: null,
        lessons: [
          lesson("guarda-fechada", "Guarda fechada", "Segurar com as pernas cruzadas, sair ou raspar.", [
            text("As pernas cruzam atrás das costas dele. O quadril fica colado."),
            text("Quebre a postura pela gola ou pela cabeça. Isole um braço. Faça ângulo com o quadril."),
            heading("Saídas"),
            list([
              "Abre e levanta com técnica.",
              "Abre e troca para a guarda aberta.",
              "Pegada de costas: faz ângulo e gira.",
            ]),
            heading("Raspagens"),
            list(["Tesoura.", "Flor, ou pêndulo.", "Quadril (hip bump)."]),
          ]),
          lesson("guarda-meia", "Meia guarda", "Prender uma perna e sair, recuperar ou raspar.", [
            text("Uma perna dele fica presa entre as suas."),
            text("O controle é o underhook, com o ombro."),
            heading("Saídas"),
            list([
              "Levanta com o underhook. É o dog fight.",
              "Recupera a guarda fechada ou a aberta.",
              "Pegada de costas pelo underhook.",
            ]),
            heading("Raspagens"),
            list([
              "Underhook: levanta e passa.",
              "Old school: pega a perna e tomba de lado.",
              "Elevador, com pegada na perna.",
            ]),
          ]),
          lesson("guarda-aranha", "Guarda aranha", "Controlar os bíceps com os pés e as mangas com as mãos.", [
            text("Os pés ficam nos bíceps. As mãos pegam as mangas."),
            heading("Saídas"),
            list([
              "Recupera a guarda com a fuga de quadril.",
              "Levanta, soltando as pernas.",
              "Troca para o laço ou para a de la Riva.",
            ]),
            heading("Raspagens"),
            list([
              "Aranha básica: empurra o bíceps, puxa a manga e tomba de lado.",
              "Tesoura, a partir da aranha.",
              "Pé no quadril e puxada de manga: tomba para trás ou de lado.",
            ]),
          ]),
          lesson("guarda-laco", "Guarda laço", "Prender um braço com a perna e raspar ou trocar de guarda.", [
            text("A perna passa por fora do braço e o prende. A mão pega a manga ou a gola."),
            heading("Saídas"),
            list([
              "Recupera com a fuga de quadril.",
              "Levanta com o braço ainda preso.",
              "Troca para a aranha ou para a de la Riva.",
            ]),
            heading("Raspagens"),
            list([
              "Laço clássico: tomba de lado.",
              "Pé no quadril: controla a perna de apoio.",
              "Triângulo: laço junto com a raspagem.",
            ]),
          ]),
          lesson("guarda-de-la-riva", "De la Riva", "Ganchar a perna por fora e raspar ou trocar de guarda.", [
            text("O gancho entra por fora da perna dele. Uma mão no tornozelo, a outra na manga."),
            heading("Saídas"),
            list([
              "Recupera com a fuga de quadril.",
              "Levanta pela perna do gancho.",
              "Troca para a aranha ou para a meia guarda.",
            ]),
            heading("Raspagens"),
            list([
              "Clássica: puxa a perna e tomba.",
              "Tornozelo (ankle pick).",
              "Berimbolo: giro invertido.",
            ]),
          ]),
        ],
      },
    ],
  },
  {
    id: "finalizacoes",
    title: "Finalizações",
    lead: "Finalizar da guarda, da montada e dos 100 kg.",
    groups: [
      {
        title: null,
        lessons: [
          lesson("finalizacao-guarda", "Da guarda", "Finalizar de baixo, com o outro na sua guarda.", [
            technique("Chave de braço", [
              "Isola o braço. O quadril vai ao ombro.",
              "As pernas cruzam sobre o peito e o rosto.",
              "Estica o cotovelo.",
            ]),
            technique("Triângulo", [
              "Uma perna no pescoço, a outra no braço. Fecha em 4.",
              "Sobe o quadril e puxa a cabeça.",
            ]),
            technique("Kimura", ["Pegada em 4 no braço.", "Torção do ombro."]),
            technique("Guilhotina", ["O braço passa sob o queixo.", "Trava as mãos e sobe o quadril."]),
            technique("Estrangulamento cruzado", ["As mãos cruzam na gola.", "Puxa os cotovelos."]),
            technique("Omoplata", [
              "A perna passa sobre o ombro e prende o braço.",
              "Gira o corpo e torce o ombro.",
            ]),
          ]),
          lesson("finalizacao-montada", "Da montada", "Finalizar sentado no tronco.", [
            technique("Americana", [
              "A mão dele fica no chão. Pegada em 4.",
              "Arrasta o braço para o lado do corpo.",
              "Torção do ombro.",
            ]),
            technique("Chave de braço", ["Isola o braço.", "Gira para trás e estica o cotovelo."]),
            technique("Estrangulamento cruzado", [
              "As mãos cruzam na gola.",
              "Puxa os cotovelos para fora.",
            ]),
            technique("Ezequiel", ["A mão entra por dentro da manga.", "Trava e pressiona o pescoço."]),
          ]),
          lesson("finalizacao-100kg", "Dos 100 kg", "Finalizar no fim do movimento, a partir do 100 kg.", [
            text("O 100 kg não é a posição de controle. É o momento em que o movimento termina e o controle aparece."),
            technique("Americana", ["O mesmo princípio da americana, a partir do 100 kg."]),
            technique("Kimura", ["Pegada em 4.", "Torção do ombro, girando para o lado."]),
            technique("Estrangulamento", ["Pela gola ou pelo braço.", "Aplica em ângulo, com o peso do corpo."]),
            technique("Chave de braço", ["Gira em volta do braço isolado."]),
          ]),
        ],
      },
    ],
  },
  {
    id: "checklist",
    title: "Checklist",
    lead: "O que a avaliação pede, antes de subir.",
    groups: [
      {
        title: null,
        lessons: [
          lesson("checklist", "Checklist", "Conferir teoria e prática antes da avaliação.", [
            heading("Teoria"),
            list([
              "Definir queda, guarda, raspagem, passagem, joelho na barriga, montada, pegada de costas e 100 kg.",
              "Citar as 4 formas de queda e de raspagem, e a regra dos 3 segundos.",
              "Explicar os 3 pontos da pegada de costas e a diferença entre gancho e cadeado.",
            ]),
            heading("Prática"),
            list([
              "Três rolamentos, amortecimento, fuga de quadril e taisabaki.",
              "Defesas pessoais.",
              "15 quedas.",
              "5 guardas, cada uma com 3 saídas e 3 raspagens. São 30 técnicas.",
              "Finalizações da guarda, da montada e dos 100 kg.",
            ]),
            text("Treine nesta ordem: fundamentos, quedas, guardas, finalizações. Com parceiro. Fale o nome da técnica enquanto faz."),
          ]),
        ],
      },
    ],
  },
];

export const LESSONS: Lesson[] = CHAPTERS.flatMap((chapter) => chapter.groups.flatMap((group) => group.lessons));

const LESSON_IDS = new Set(LESSONS.map((lesson) => lesson.id));

export function isLessonId(id: string) {
  return LESSON_IDS.has(id);
}

export function lessonById(id: string) {
  return LESSONS.find((lesson) => lesson.id === id) ?? null;
}

export function chapterOf(lessonId: string) {
  return CHAPTERS.find((chapter) => chapter.groups.some((group) => group.lessons.some((lesson) => lesson.id === lessonId))) ?? null;
}
