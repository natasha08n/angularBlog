export class Post {
    id: number;
    title: string;
    subtitle: string;
    text: string;
    dateCreate: string;
    dateUpdate: string;
    tags: string[];

    constructor (id: number = 0, title: string = '', subtitle: string = '', text: string = '', tags: string[] = []){
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.text = text;
        this.tags = tags;
    }
}
