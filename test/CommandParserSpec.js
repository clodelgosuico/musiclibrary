(function () {
    'use strict';
    var assert = require('assert');
    var commandParser = require('../src/CommandParser');
    var _ = require('lodash');

    describe('CommandParserSpec', function () {
        it('should parser command lines correctly', function () {
            var args = commandParser.parse('add album "bar by bar" by bob');
            assert(_.isEqual(args, ['add', 'album', 'bar by bar', 'by', 'bob']), true);

            args = commandParser.parse('add track "rock on" on foo by bob');
            assert(_.isEqual(args, ['add', 'track', 'rock on', 'on', 'foo', 'by', 'bob']), true);

            args = commandParser.parse('add artist bob');
            assert(_.isEqual(args, ['add', 'artist', 'bob']), true);
        });
    });

})();