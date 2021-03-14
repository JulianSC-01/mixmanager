export class Tracklist {
    constructor(
        public id : string,
        public title : string,
        public created : firebase.firestore.Timestamp ) { 
    }
}