export class Reply {
    private constructor(private _content: string) {}

    get content(): string {
        return this._content;
    }

    public static send(content: string): Reply {
        return new Reply(content);
    }
}
