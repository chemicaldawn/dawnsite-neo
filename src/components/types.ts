export class Album {

    name: string;
    id: string;
    artist: string;
    year: number;
    cover: string;

    genres: Set<String>;
    vibes: Set<String>;

    greenborder: boolean;

    constructor(name : string, id: string, artist : string, year : number, cover : string, genres : Set<String>, vibes : Set<String>, greenborder: boolean) {
        this.name = name;
        this.id = id;
        this.artist = artist;
        this.year = year;
        this.cover = cover;

        this.genres = genres;
        this.vibes = vibes;

        this.greenborder = greenborder;
    }
}