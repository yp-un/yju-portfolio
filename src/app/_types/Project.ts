export interface Project {
  id: string;
  title: string;
  skills: string[];
  thumbnail: string;
  images: string[] | string;
  introduce: string;
  githubUrl: string;
  serviceUrl: string;
  readme: {
    owner: string;
    repo: string;
    branch?: string;
    filePath?: string;
  }
}
