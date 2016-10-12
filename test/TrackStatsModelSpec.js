(function () {
    'use strict';
    var assert = require('assert');
    var model;
    var _ = require('lodash');

    describe('TrackStatsModel', function () {
        beforeEach(function () {
            model = require('../src/TrackStatsModel');
        });

        describe('play count', function () {
            it('should get and set track play count', function () {
                var trackPlayCount = model.getTrackPlayCount('dancing man', 'foo', 'dean');
                assert.equal(trackPlayCount, 0);

                model.setTrackPlayCount('dancing man', 'jim', 'dean', 4);

                trackPlayCount = model.getTrackPlayCount('dancing man', 'jim', 'dean');
                assert.equal(trackPlayCount, 4);
            });
        });

        describe('list by play count', function () {
            it('should list top <N> tracks', function () {
                model.setTrackPlayCount('dancing man', 'jim', 'dean', 4);
                model.setTrackPlayCount('dancing child', 'foo', 'bob', 3);

                var topTracks = model.getTopTracks(2);
                assert.equal(topTracks.length, 2);
                assert.equal(_.isEqual(topTracks, [{
                    trackHash: 'dancing man|jim|dean',
                    playCount: 4,
                    track: '"dancing man" on "jim" by dean'
                },
                    {
                        trackHash: 'dancing child|foo|bob',
                        playCount: 3,
                        track: '"dancing child" on "foo" by bob'
                    }]), true);

                topTracks = model.getTopTracks(1);
                assert.equal(topTracks.length, 1);
                assert.equal(_.isEqual(topTracks, [{
                    trackHash: 'dancing man|jim|dean',
                    playCount: 4,
                    track: '"dancing man" on "jim" by dean'
                }]), true);

            });

        });


    });

})();