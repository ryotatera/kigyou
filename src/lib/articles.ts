export interface Article {
  slug: string;
  title: string;
  category: "観察" | "考察" | "戦略" | "実践";
  excerpt: string;
  author: string;
  publishedAt: string; // YYYY-MM-DD
  readMinutes: number;
  paragraphs: { text: string; isPublic: boolean }[];
  tags: string[];
}

export const articles: Article[] = [
  {
    slug: "pmf-no-shoutai",
    title: "PMF の正体は「言葉にならない引力」である",
    category: "考察",
    excerpt:
      "Product-Market Fit を「指標」で語ろうとした瞬間、本質は手をすり抜ける。10 社の起業家インタビューから抽出した、PMF の現場感を言語化する。",
    author: "田所 雅之",
    publishedAt: "2026-04-22",
    readMinutes: 8,
    tags: ["PMF", "起業の科学"],
    paragraphs: [
      {
        text: "「PMF を達成しましたか？」という問いほど、起業家を黙らせるものはない。明確に「達成した」と答える人は、たいてい達成していない。本当に達成した人は、達成した瞬間ではなく、何ヶ月も後になって「そういえばあれが PMF だった」と振り返るからだ。",
        isPublic: true,
      },
      {
        text: "今回、過去 12 ヶ月で売上が 5 倍以上になった国内スタートアップ 10 社の創業者にインタビューを行った。問いはひとつ。「あなたは PMF をどう確認したか」。返ってきた答えは、教科書には書かれていない 5 つの具体的な瞬間だった。",
        isPublic: true,
      },
      {
        text: "ひとつ目は「サポートが間に合わなくなった瞬間」である。ある SaaS の創業者は、土曜日の朝に Slack のメンションが鳴り止まないことで PMF を確信したという。",
        isPublic: true,
      },
      {
        text: "ふたつ目は「営業しなくなった瞬間」だ。これまでアウトバウンドで埋めていたカレンダーが、いつの間にかインバウンドの問い合わせで埋まり、自分が営業しなくても受注が積み上がる。",
        isPublic: false,
      },
      {
        text: "みっつ目は「断ることが増えた瞬間」。価格を上げても解約が出ないどころか、入金スピードが上がる。「うちはこういう会社なので合わないかもしれません」と伝えても、それでも欲しいと言われる。",
        isPublic: false,
      },
      {
        text: "そしてこの 5 つの瞬間に共通しているのは、すべて「能動的に追いかけた指標」ではなく、「受動的に観察された変化」であるということだ。本記事では残りの 2 つの瞬間と、PMF 達成後の落とし穴について、各社の具体例を交えて掘り下げていく。",
        isPublic: false,
      },
    ],
  },
  {
    slug: "cpf-no-trap",
    title: "CPF で陥る 3 つの罠 — 顧客課題を「作って」しまっていないか",
    category: "観察",
    excerpt:
      "顧客課題仮説（CPF）の検証で、創業者は無自覚のうちに自分の都合のいい答えを引き出してしまう。実際の失敗事例から学ぶ、3 つの典型パターン。",
    author: "田所 雅之",
    publishedAt: "2026-04-15",
    readMinutes: 6,
    tags: ["CPF", "起業の科学"],
    paragraphs: [
      {
        text: "「顧客に話を聞きました。みんな同意してくれました」。CPF（Customer Problem Fit）の検証フェーズで、この報告ほど警戒すべきものはない。",
        isPublic: true,
      },
      {
        text: "なぜなら、顧客は基本的に「目の前の人を喜ばせたい」生き物だからだ。創業者が情熱を持って語れば語るほど、相手は同意しやすくなる。これは検証ではなく、もはや営業である。",
        isPublic: true,
      },
      {
        text: "今回は、この罠に陥った 3 社の事例を取り上げる。1 社は SaaS、1 社はマーケットプレイス、1 社は D2C。業種は違えど、検証の構造は驚くほど似ている。",
        isPublic: true,
      },
      {
        text: "1 社目の SaaS 創業者は、潜在顧客 30 人にヒアリングを行い、全員が「課題に同意した」と報告した。しかし蓋を開けてみると、有償版を契約した人はゼロだった。原因は、質問の構造そのものにあった。",
        isPublic: false,
      },
      {
        text: "2 社目のマーケットプレイス創業者は、出品者側のヒアリングだけを重ねて「これは伸びる」と判断した。しかし買い手側の課題は完全に見落としていた。",
        isPublic: false,
      },
    ],
  },
  {
    slug: "kyousou-senryaku-kichi",
    title: "競争戦略は「捨てる順番」で決まる",
    category: "戦略",
    excerpt:
      "起業大全で繰り返し語られる競争戦略は、何を「やるか」より、何を「捨てるか」の順番に本質がある。",
    author: "田所 雅之",
    publishedAt: "2026-03-30",
    readMinutes: 7,
    tags: ["競争戦略", "起業大全"],
    paragraphs: [
      {
        text: "競争戦略を学ぶ多くの起業家が、フレームワークを「やることリスト」として読んでしまう。だが本来、戦略の核心は「やらないことの順序付け」にある。",
        isPublic: true,
      },
      {
        text: "本記事では、起業大全の第 4 章で扱った 5 つの競争戦略パターンを、「何を最初に捨てるか」という観点で再整理する。",
        isPublic: true,
      },
      {
        text: "コストリーダーシップ戦略が捨てるのは「品質の上限」ではない。捨てるのは「顧客セグメントの広さ」である。これは多くの教科書が誤解している。",
        isPublic: false,
      },
      {
        text: "差別化戦略が捨てるのは「価格競争への参加権」である。価格で勝負しないと決めた瞬間に、機能設計・流通・マーケティングのすべてが連動して変わる。",
        isPublic: false,
      },
    ],
  },
  {
    slug: "investor-3-questions",
    title: "投資家が最初の 30 分で必ず聞く 3 つの質問",
    category: "実践",
    excerpt:
      "30 名以上の VC・CVC への取材から判明した、ピッチで投資家が最初の 30 分で必ず確認する質問パターン。",
    author: "田所 雅之",
    publishedAt: "2026-03-12",
    readMinutes: 5,
    tags: ["ピッチ", "資金調達"],
    paragraphs: [
      {
        text: "ピッチデックを 30 枚作り込んで挑む起業家は多い。だが投資家の頭の中では、最初の 30 分で答えが出る 3 つの質問がある。それ以外はほぼ確認作業に過ぎない。",
        isPublic: true,
      },
      {
        text: "今回、国内外の VC・CVC のパートナークラス 30 名以上に「最初の 30 分で必ず確認する質問は何か」を取材した。結果は驚くほど一致していた。",
        isPublic: true,
      },
      {
        text: "1 つ目の質問は「なぜあなたなのか」。これは経歴の確認ではない。市場と創業者の間に「不可避な接続」があるかを見ている。",
        isPublic: false,
      },
      {
        text: "2 つ目の質問は「なぜ今なのか」。市場のタイミングを問う質問だが、回答の構造が重要である。",
        isPublic: false,
      },
    ],
  },
  {
    slug: "rapid-prototyping",
    title: "MVP を 1 週間で作るための 4 つの省略",
    category: "実践",
    excerpt:
      "MVP は「最低限動くプロダクト」ではなく「最低限の検証で済ませるもの」である。1 週間で作るための具体的な省略の技術。",
    author: "田所 雅之",
    publishedAt: "2026-02-25",
    readMinutes: 4,
    tags: ["MVP", "プロトタイピング"],
    paragraphs: [
      {
        text: "MVP を 3 ヶ月かけて作っている時点で、それはもう MVP ではない。Minimum Viable Product の本質は「最低限動く」ではなく「最低限の検証」である。",
        isPublic: true,
      },
      {
        text: "今回紹介する 4 つの省略は、すべて実際のスタートアップ事例から抽出した、再現性のあるパターンだ。",
        isPublic: true,
      },
      {
        text: "ひとつ目は「バックエンドを人間にする」省略。Slack と Google フォームだけで、検証段階のサービスは大半が回せる。",
        isPublic: false,
      },
      {
        text: "ふたつ目は「決済を後ろに置く」省略。",
        isPublic: false,
      },
    ],
  },
];

export function findArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
