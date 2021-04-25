export interface Track {
    id : string,
    title : string,
    artist : string,
    bpm : number,
    key : string,
    created : firebase.firestore.Timestamp
}