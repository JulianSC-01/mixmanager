export class Track {
    constructor(
        public id : string,
        public title : string,
        public artist : string,
        public bpm : number,
        public key : string,
        public created : firebase.firestore.Timestamp ) { 
    }
}