// 여러 파일에서 공통적으로 사용되는 타입을 모아서 관리

export interface existingLangInterface {
    index: number;
    learningLang: string;
}

export interface userDataInterface {
    userid: string;
    name: string;
    gender: string;
    nation: string;
    firLang: string;
}

export interface postsInterface {
    postId: number;
    userid: string;
    content: string;
    createdAt: Date;
}
