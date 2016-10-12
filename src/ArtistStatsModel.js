(function () {
    'use strict';

    var _ = require('lodash');

    var artistStats = [];

    module.exports = {
        //gets the artist play count
        getArtistPlayCount: function(artist) {
            var artistStat = this.getArtistStat(artist);
            return _.get(artistStat, 'playCount', 0);
        },

        //gets the artist stat
        getArtistStat: function(artist) {
            var artistStat = _.find(artistStats, {
                artist: artist
            });
            return artistStat;
        },

        //sets the artist play count
        setArtistPlayCount: function(artist, playCount) {
            var index,
                artistStat = this.getArtistStat(artist);

            if (artistStat) {
                index = _.indexOf(artistStats, artistStat);

                artistStat.playCount = playCount;

                artistStats.splice(index, 1, artistStat);
            } else {
                artistStats.push({
                    artist: artist,
                    playCount: playCount
                });
            }
        },

        //gets the top N artists
        getTopArtists: function(size) {
            var sortedStats = _.orderBy(artistStats, [function(o) {
                return o.playCount;
            }], 'desc');
            return sortedStats.slice(0, size);
        },

    };
})();
