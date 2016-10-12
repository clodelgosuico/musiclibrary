(function() {
    'use strict';
    var assert = require('assert');
    var musicLibraryController = require('../src/MusicLibraryController');
    var musicLibraryModel = require('../src/MusicLibraryModel');
    var artistStatsModel = require('../src/ArtistStatsModel');
    var trackStatsModel = require('../src/TrackStatsModel');
    var sinon = require('sinon');

    describe('MusicLibraryController', function() {
        describe('add', function() {
            it('should call addArtist when the "add artist" command is used', function() {
                var spy = sinon.spy(musicLibraryModel, 'addArtist');
                musicLibraryController.run('add artist foo');
                assert(spy.calledWith('foo'));
            });

            it('should call addAlbum when "add album" command is used', function() {
                var spy = sinon.spy(musicLibraryModel, 'addAlbum');
                musicLibraryController.run('add album schmoo by cindy');
                assert(spy.calledWith('schmoo', 'cindy'));
            });

            it('should call addTrack when "add track" command is used', function() {
                var spy = sinon.spy(musicLibraryModel, 'addTrack');
                musicLibraryController.run('add track "dancing bears" on schmoo by cindy');
                assert(spy.calledWith('dancing bears', 'schmoo', 'cindy'));
            });
        });

        describe('list', function() {
            it('should list albums', function() {
                var spy = sinon.spy(musicLibraryModel, 'getAlbumsBy');
                var results = musicLibraryController.run('list albums by cindy');
                assert(spy.calledWith('cindy'));
                //console.log(results);
            });
            it('should list tracks in an album', function() {
                var spy = sinon.spy(musicLibraryModel, 'getTracks');
                musicLibraryController.run('list tracks on schmoo by cindy');
                assert(spy.calledWith('schmoo', 'cindy'));
            });

        });

        describe('listen', function() {
            it('should listen to tracks in an album', function() {
                var musicLibrarySpy = sinon.spy(musicLibraryModel, 'hasTrack');
                var trackStatsSpy = sinon.spy(trackStatsModel, 'setTrackPlayCount');
                var artistStatsSpy = sinon.spy(artistStatsModel, 'setArtistPlayCount');

                musicLibraryController.run('listen to "dancing bears" on schmoo by cindy');

                assert(musicLibrarySpy.calledWith('dancing bears', 'schmoo', 'cindy'));
                assert(trackStatsSpy.calledWith('dancing bears', 'schmoo', 'cindy', 1));
                assert(artistStatsSpy.calledWith('cindy', 1));

                musicLibraryController.run('listen to "dancing bears" on schmoo by cindy');

                assert(trackStatsSpy.calledWith('dancing bears', 'schmoo', 'cindy', 2));
                assert(artistStatsSpy.calledWith('cindy', 2));
            });
        });

        describe('list top N', function() {
            it('should list top tracks', function() {
                var spy = sinon.spy(trackStatsModel, 'getTopTracks');
                var results = musicLibraryController.run('list top 2 tracks');
                assert(spy.calledWith('2'));
            });
            it('should list top artists', function() {
                var spy = sinon.spy(artistStatsModel, 'getTopArtists');
                var results = musicLibraryController.run('list top 2 artists');
                assert(spy.calledWith('2'));
            });
        });
    })
})();