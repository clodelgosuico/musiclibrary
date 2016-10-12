(function () {
    'use strict';
    var assert = require('assert');
    var model;
    var _ = require('lodash');

    describe('ArtistStatsModel', function () {
        beforeEach(function () {
            model = require('../src/ArtistStatsModel');
        });

        describe('play count', function () {
            it('should get set artist play count', function () {
                var artistPlayCount = model.getArtistPlayCount('dean');
                assert.equal(artistPlayCount, 0);

                model.setArtistPlayCount('dean', 3);

                artistPlayCount = model.getArtistPlayCount('dean');
                assert.equal(artistPlayCount, 3);

                model.setArtistPlayCount('bob', 2);

                artistPlayCount = model.getArtistPlayCount('bob');
                assert.equal(artistPlayCount, 2);
            });
        });

        describe('list by play count', function () {
            it('should list top <N> artists', function () {
                var topArtists = model.getTopArtists(2);
                assert.equal(_.isEqual(topArtists, [ { artist: 'dean', playCount: 3 },
                    { artist: 'bob', playCount: 2 } ]), true);
            });
        });


    });

})();