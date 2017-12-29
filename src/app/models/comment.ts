export class Comment {
    userId: number;
    postId: number;
    text: string;
    dateCreate: number;
    dateUpdate: number;
    previousId: number

    constructor(userId: number, postId: number, text: string, dateCreate: number, dateUpdate: number, previousId: number) {
        this.userId = userId;
        this.postId = postId;
        this.text = text;
        this.dateCreate = dateCreate;
        this.dateUpdate = dateUpdate;
        this.previousId = previousId;
    }
}