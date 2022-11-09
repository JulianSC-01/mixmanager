import firebase from 'firebase/compat/app';

export class Track {
    public id : string;
    public title : string;
    public artist : string;
    public bpm : number;
    public key : string;
    public startTime : number;
    public endTime : number;
    public created : firebase.firestore.Timestamp;

    constructor(builder : TrackBuilder) { 
        this.id = builder.id;
        this.title = builder.title;
        this.artist = builder.artist;
        this.bpm = builder.bpm;
        this.key = builder.key;
        this.startTime = builder.startTime;
        this.endTime = builder.endTime;
        this.created = builder.created;
    }

    buildCoreInput() : any {
        return new TrackBuilder().
            withTitle(this.title).
            withArtist(this.artist).
            withBPM(this.bpm).
            withKey(this.key).
            buildInput();
    }
}
export class TrackBuilder {
    id : string;
    title : string;
    artist : string;
    bpm : number;
    key : string;
    startTime : number;
    endTime : number;
    created : firebase.firestore.Timestamp;

    private input : any;

    constructor() { 
        this.input = {};
    }

    withId(id : string) : TrackBuilder {
        this.id = id;
        this.input.id = id
        return this;
    }

    withTitle(title : string) : TrackBuilder {
        this.title = title;
        this.input.title = title
        return this;
    }

    withArtist(artist : string) : TrackBuilder {
        this.artist = artist;
        this.input.artist = artist
        return this;
    }

    withBPM(bpm : number) : TrackBuilder {
        this.bpm = bpm;
        this.input.bpm = bpm
        return this;
    }

    withKey(key : string) : TrackBuilder {
        this.key = key;
        this.input.key = key
        return this;
    }

    withStartTime(startTime : number) : TrackBuilder {
        this.startTime = startTime;
        this.input.startTime = startTime;
        return this;
    }

    withEndTime(endTime : number) : TrackBuilder {
        this.endTime = endTime;
        this.input.endTime = endTime;
        return this;
    }

    withCreationDate(created : firebase.firestore.Timestamp) : TrackBuilder {
        this.created = created;
        this.input.created = created;
        return this;
    }

    buildTrack() : Track {
        return new Track(this);
    }

    buildInput() : any {
        return this.input;
    }
}