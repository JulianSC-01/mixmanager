import firebase from 'firebase/compat/app';

export class Tracklist {
    public id : string;
    public title : string;
    public created : firebase.firestore.Timestamp;

    constructor(builder : TracklistBuilder) { 
        this.id = builder.id;
        this.title = builder.title;
        this.created = builder.created;
    }
}
export class TracklistBuilder {
    id : string;
    title : string;
    created : firebase.firestore.Timestamp;

    private input : any;

    constructor() { 
        this.input = {};
    }

    withId(id : string) : TracklistBuilder {
        this.id  = id;
        this.input.id = id;
        return this;
    }

    withTitle(title : string) : TracklistBuilder {
        this.title = title;
        this.input.title = title
        return this;
    }

    withCreationDate(created : firebase.firestore.Timestamp) : TracklistBuilder {
        this.created = created;
        this.input.created = created
        return this;
    }

    buildInput() : any {
        return this.input;
    }

    buildTracklist() : Tracklist {
        return new Tracklist(this);
    }
}