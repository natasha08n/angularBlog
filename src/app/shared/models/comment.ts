export class Comment {
    id: number;
    userId: number;
    postId: number;
    text: string;
    dateCreate: number;
    dateUpdate: number;
    previousId: number;
    prevAuthor: string;
    children: Array<number>;

    constructor(id: number,
        userId: number,
        postId: number,
        text: string,
        dateCreate: number,
        dateUpdate: number,
        previousId: number,
        prevAuthor: string) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.text = text;
        this.dateCreate = dateCreate;
        this.dateUpdate = dateUpdate;
        this.previousId = previousId;
        this.prevAuthor = prevAuthor;
    }
}
