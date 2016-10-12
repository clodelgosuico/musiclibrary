(function () {
    'use strict';
    var musicLibraryModel = require('./MusicLibraryModel');
    var trackStatsModel = require('./TrackStatsModel');
    var artistStatsModel = require('./ArtistStatsModel');
    var commandParser = require('./CommandParser');
    var columnify = require('columnify');

    module.exports = {
        //parses a command line string into arguments
        run: function (command) {
            var args = commandParser.parse(command);

            if (args[0] === 'add') {
                //add command
                if (args[1] === 'artist') {
                    musicLibraryModel.addArtist(args[2]);
                } else if (args[1] === 'album') {
                    musicLibraryModel.addAlbum(args[2], args[4]);
                } else if (args[1] === 'track') {
                    musicLibraryModel.addTrack(args[2], args[4], args[6]);
                }
            } else if (args[0] === 'list') {
                //list command
                var results = [],
                    options = {};

                if (args[1] === 'albums') {
                    results = musicLibraryModel.getAlbumsBy(args[3]);
                    this.outputArray(results);
                } else if (args[1] === 'tracks') {
                    results = musicLibraryModel.getTracks(args[3], args[5]);
                    this.outputArray(results);
                } else if (args[1] === 'top') {
                    if (args[3] === 'tracks') {
                        //get top tracks
                        results = trackStatsModel.getTopTracks(args[2]);
                        options = {
                            columns: ['track', 'playCount']
                        };
                        this.columnify(results, options);
                    } else if (args[3] === 'artists') {
                        //get top artists
                        results = artistStatsModel.getTopArtists(args[2]);
                        options = {
                            columns: ['artist', 'playCount']
                        };
                        this.columnify(results, options);
                    }
                }
            } else if (args[0] === 'listen') {
                //listen command
                var track = args[2],
                    album = args[4],
                    artist = args[6];

                if (musicLibraryModel.hasTrack(track, album, artist)) {
                    var trackPlayCount = trackStatsModel.getTrackPlayCount(track, album, artist),
                        artistPlayCount = artistStatsModel.getArtistPlayCount(artist);

                    //bump up counts
                    trackPlayCount++;
                    artistPlayCount++;

                    //update track stats
                    trackStatsModel.setTrackPlayCount(track, album, artist, trackPlayCount);
                    artistStatsModel.setArtistPlayCount(artist, artistPlayCount);
                }
            }
        },
        //beutifies plain text into columns
        columnify: function(data, options) {
            var columns = columnify(data, options);

            console.log(columns);
        },
        //loops through the array and outputs the data.
        outputArray: function(data) {
            for (var i=0; i<data.length; i++) {
                console.log(data[i]);
            }
        }
    };
})();
