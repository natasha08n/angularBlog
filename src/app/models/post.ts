export class Post {
    id: number;
    title: string;
    subtitle: string;
    text: string;
    dateCreate: number;
    dateUpdate: number;
    tags: string[];
    excerpt: string;
    authorName: string;
    authorSurname: string;
    userId: number;

    constructor (id: number = 0, title: string = '', subtitle: string = '', text: string = '', tags: string[] = [], authorName: string = '', authorSurname: string ='', userId: number = 0){
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.text = text;
        this.tags = tags;
    }
}
