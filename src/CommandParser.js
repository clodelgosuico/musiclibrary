(function () {
    module.exports = {
        //parses a command line string and takes into account any double quotes
        parse: function (str) {
            var args = [],
                readingPart = false,
                part = '';
            for (var i = 0; i < str.length; i++) {
                if (str.charAt(i) === ' ' && !readingPart) {
                    args.push(part);
                    part = '';
                } else {
                    if (str.charAt(i) === '\"') {
                        readingPart = !readingPart;
                    } else {
                        part += str.charAt(i);
                    }
                }
            }
            args.push(part);
            return args;
        }
    };
})();