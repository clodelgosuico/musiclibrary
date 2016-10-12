(function () {
    'use strict';

    var _ = require('lodash');

    var musicLibrary = [];
    var trackStats = [];
    var artistStats = [];

    module.exports = {

        //adds data to the musicLibrary
        //music is expected to be a JSON obj
        addMusic: function(music) {
            if (!this.hasMusic(music)) {
                musicLibrary = _.sortedUniq(_.concat(musicLibrary, music));
            }
        },

        //finds data in the music library
        //music is expected to be a JSON obj
        findMusic: function(music) {
            return _.find(musicLibrary, music);
        },

        //returns if music exists in the library
        //music is expected to be a JSON obj
        hasMusic: function(music) {
            return _.some(musicLibrary, music);
        },

        //adds an artist
        addArtist: function(artist) {
            this.addMusic({
                artist: artist
            });
        },

        //returns a boolean if an artist exists
        hasArtist: function(artist) {
            return this.hasMusic({
                artist: artist
            });
        },

        //adds an album
        addAlbum: function(album, artist) {
            this.addMusic({
                album: album,
                artist: artist
            });
        },

        //returns a boolean if an album exists
        hasAlbum: function(album, artist) {
            return this.hasMusic({
                album: album,
                artist: artist
            });
        },

        //returns the album data
        getAlbum: function(album, artist) {
            return this.findMusic({
                album: album,
                artist: artist
            });
        },

        //adds a track to an album
        addTrack: function(track, album, artist) {
            var existingMusic,
                index,
                tracks,
                music = {
                album: album,
                artist: artist
            };

            existingMusic = this.getAlbum(album, artist);
            index = _.indexOf(musicLibrary, existingMusic);

            //get the tracks with default empty array
            tracks = _.get(existingMusic, 'tracks', []);

            //concatenate and sort the unique tracks
            tracks = _.sortedUniq(_.concat(tracks, track));

            music.tracks = tracks;

            musicLibrary.splice(index, 1, music);
        },

        //returns a boolean whether the track exists
        hasTrack: function(track, album, artist) {
            var music = this.getAlbum(album, artist);

            return (_.has(music, 'tracks') && _.includes(music.tracks, track));
        },

        //gets the list of albums by artist
        getAlbumsBy: function(artist) {
            var albums = [],
                results = _.each(musicLibrary, function(music) {
                if (music.artist === artist && music.album) {
                    albums.push(music.album);
                }
            });

            return albums;
        },

        //gets all the tracks in an album
        getTracks: function(album, artist) {
            var music = this.getAlbum(album, artist);

            if (music && music.tracks) {
                return music.tracks;
            } else {
                return [];
            }
        }
    };
})();
