(function () {
    'use strict';
    var assert = require('assert');
    var model;
    var _ = require('lodash');

    describe('MusicLibraryModel', function () {
        beforeEach(function () {
            model = require('../src/MusicLibraryModel');
        });

        describe('add', function () {
            it('should add artist', function () {
                model.addArtist('bob');
                assert.equal(model.hasArtist('bob'), true);
            });

            it('should add multiple artists', function () {
                model.addArtist('bob');
                model.addArtist('mary');

                assert.equal(model.hasArtist('bob'), true);
                assert.equal(model.hasArtist('mary'), true);
                assert.equal(model.hasArtist('bill'), false);
            });

            it('should add album and artist', function () {
                model.addAlbum('foo', 'bob');
                model.addAlbum('foo2', 'bob');

                assert.equal(model.hasArtist('bob'), true);

                assert.equal(model.hasAlbum('foo', 'bob'), true);
            });

            it('should add track on album by artist which did not exist before', function () {
                assert.equal(model.hasTrack('dancing man', 'foo', 'bob'), false);
                model.addTrack('dancing man', 'foo', 'bob');
                model.addTrack('dancing child', 'foo', 'bob');
                assert.equal(model.hasTrack('dancing man', 'foo', 'bob'), true);
                assert.equal(model.hasTrack('dancing woman', 'foo', 'bob'), false);
            });

            it('should add track on album by artist which did exist before', function () {
                model.addAlbum('jim', 'dean');
                assert.equal(model.hasTrack('dancing man', 'jim', 'dean'), false);
                model.addTrack('dancing man', 'jim', 'dean');
                assert.equal(model.hasTrack('dancing man', 'jim', 'dean'), true);
                assert.equal(model.hasTrack('dancing woman', 'jim', 'dean'), false);
            });
        });

        describe('list', function () {
            it('should list albums by artist', function () {
                var albums = model.getAlbumsBy('bob');
                assert.equal(_.isEqual(albums, ['foo', 'foo2']), true);
            });

            it('should list tracks in album by artist', function () {
                var tracks = model.getTracks('foo', 'bob');
                assert.equal(_.isEqual(tracks, ['dancing man', 'dancing child']), true);
            });
        });

        //describe('listen', function () {
        //    it('should increment track and artist play count when listening to a track', function () {
        //
        //        var trackPlayCount = model.getTrackPlayCount('dancing man', 'foo', 'dean');
        //        assert.equal(trackPlayCount, 0);
        //        var artistPlayCount = model.getArtistPlayCount('dean');
        //        assert.equal(artistPlayCount, 0);
        //
        //        model.listen('dancing man', 'jim', 'dean');
        //        trackPlayCount = model.getTrackPlayCount('dancing man', 'jim', 'dean');
        //        artistPlayCount = model.getArtistPlayCount('dean');
        //
        //        assert.equal(trackPlayCount, 1);
        //        assert.equal(artistPlayCount, 1);
        //
        //        trackPlayCount = model.getTrackPlayCount('dancing child', 'foo', 'bob');
        //        assert.equal(trackPlayCount, 0);
        //
        //        model.listen('dancing child', 'foo', 'bob');
        //        model.listen('dancing child', 'foo', 'bob');
        //        trackPlayCount = model.getTrackPlayCount('dancing child', 'foo', 'bob');
        //        artistPlayCount = model.getArtistPlayCount('bob');
        //
        //        assert.equal(trackPlayCount, 2);
        //        assert.equal(artistPlayCount, 2);
        //
        //        model.listen('dancing man', 'jim', 'dean');
        //        model.listen('dancing man', 'jim', 'dean');
        //        trackPlayCount = model.getTrackPlayCount('dancing man', 'jim', 'dean');
        //        artistPlayCount = model.getArtistPlayCount('dean');
        //
        //        assert.equal(trackPlayCount, 3);
        //        assert.equal(artistPlayCount, 3);
        //    });
        //
        //    it('should not increment play count when listening to a track that does not exist', function () {
        //        var playCount = model.getTrackPlayCount('dancing child', 'jim', 'dean');
        //        assert.equal(playCount, 0);
        //
        //        model.listen('dancing child', 'jim', 'dean');
        //        model.listen('dancing child', 'jim', 'dean');
        //        playCount = model.getTrackPlayCount('dancing child', 'jim', 'dean');
        //        assert.equal(playCount, 0);
        //    });
        //});
        //
        //describe('list by play count', function () {
        //    it('should list top <N> tracks', function () {
        //        var topTracks = model.getTopTracks(2);
        //        assert.equal(topTracks.length, 2);
        //        assert.equal(_.isEqual(topTracks, [{
        //            trackHash: 'dancing man|jim|dean',
        //            playCount: 3,
        //            track: '"dancing man" on "jim" by dean'
        //        },
        //            {
        //                trackHash: 'dancing child|foo|bob',
        //                playCount: 2,
        //                track: '"dancing child" on "foo" by bob'
        //            }]), true);
        //
        //        topTracks = model.getTopTracks(1);
        //        assert.equal(topTracks.length, 1);
        //        assert.equal(_.isEqual(topTracks, [{
        //            trackHash: 'dancing man|jim|dean',
        //            playCount: 3,
        //            track: '"dancing man" on "jim" by dean'
        //        }]), true);
        //
        //        topTracks = model.getTopTracks(3);
        //        assert.equal(topTracks.length, 3);
        //    });
        //
        //    it('should list top <N> artists', function () {
        //        var topArtists = model.getTopArtists(2);
        //        assert.equal(_.isEqual(topArtists, [ { artist: 'dean', playCount: 3 },
        //            { artist: 'bob', playCount: 2 } ]), true);
        //    });
        //});


    });

})();