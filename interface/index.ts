export interface IMostViewData {
  pagePath: string;
  pageView: string;
}

export interface IMostViewPost {
  postContent: any;
  postView: string;
}

export interface IAnswer {
  id: number;
  description: string;
  votes: number;
}

export interface IPoll {
  id: number;
  question: string;
  totalVotes: number;
  open: boolean;
  maxAnswers: number;
  voted: boolean;
  answers: IAnswer[];
}

export interface FeaturedImage {
  node: {
    mediaItemUrl: string;
  };
}

export interface IMostComments {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date: Date;
  featuredImage: FeaturedImage;
  commentCount: number;
}
