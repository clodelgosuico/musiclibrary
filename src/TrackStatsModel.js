(function () {
    'use strict';

    var _ = require('lodash');

    var trackStats = [];

    module.exports = {

        //creates a hash for use in the stats data
        createTrackHash: function(track, album, artist) {
            return track + "|" + album + "|" + artist;
        },

        //gets the track play count
        getTrackPlayCount: function(track, album, artist) {
            var trackStat = this.getTrackStat(track, album, artist);

            return _.get(trackStat, 'playCount', 0);
        },

        //gets the track stat
        getTrackStat: function(track, album, artist) {
            var trackHash = this.createTrackHash(track, album, artist),
                trackStat = _.find(trackStats, {
                trackHash: trackHash
            });

            return trackStat;
        },

        //sets the track play count
        setTrackPlayCount: function(track, album, artist, playCount) {
            var trackStat = this.getTrackStat(track, album, artist);

            if (trackStat) {
                var index = _.indexOf(trackStats, trackStat);

                trackStat.playCount = playCount;

                trackStats.splice(index, 1, trackStat);
            } else {
                trackStats.push({
                    trackHash: this.createTrackHash(track, album, artist),
                    playCount: playCount
                });
            }
        },

        //gets the top N tracks
        getTopTracks: function(size) {
            //sort the count descending
            var sortedStats = _.orderBy(trackStats, [function(o) {
                return o.playCount;
            }], 'desc');

            //parse the sorted stats so the track name is user friendly
            _.forEach(sortedStats, function(o) {
                var parsedTrack = o.trackHash.split('|');
                parsedTrack = "\"" + parsedTrack[0] + "\" on \"" + parsedTrack[1] + "\" by " + parsedTrack[2];
                o.track = parsedTrack;
            });

            return sortedStats.slice(0, size);
        },

    };
})();
