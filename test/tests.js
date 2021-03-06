'use strict';

var testCard = require('../index');
var assert = require('assert');

describe('vCard', function() {

    testCard = testCard();
    testCard.lastName = 'Doe';
    testCard.middleName = 'D';
    testCard.firstName = 'John';
    testCard.nameSuffix = 'JR';
    testCard.namePrefix = 'MR';
    testCard.nickname = 'Test User';
    testCard.gender = 'M';
    testCard.organization = 'ACME Corporation';
    testCard.photo.attachFromUrl('https://testurl', 'png');
    testCard.workPhone = '312-555-1212';
    testCard.homePhone = '312-555-1313';
    testCard.cellPhone = '312-555-1414';
    testCard.birthday = new Date();
    testCard.anniversary = new Date();
    testCard.title = 'Crash Test Dummy';
    testCard.role = 'Crash Testing';
    testCard.email = 'john.doe@testmail';
    testCard.url = 'http://johndoe';

    testCard.homeAddress.label = 'Home Address';
    testCard.homeAddress.street = '123 Main Street';
    testCard.homeAddress.city = 'Chicago';
    testCard.homeAddress.stateProvince = 'IL';
    testCard.homeAddress.postalCode = '12345';
    testCard.homeAddress.countryRegion = 'United States of America';

    testCard.workAddress.label = 'Work Address';
    testCard.workAddress.street = '123 Corporate Loop\nSuite 500';
    testCard.workAddress.city = 'Los Angeles';
    testCard.workAddress.stateProvince = 'CA';
    testCard.workAddress.postalCode = '54321';
    testCard.workAddress.countryRegion = 'California Republic';

    testCard.source = 'http://sourceurl';
    testCard.note = 'John Doe\'s \nnotes;,';
    var vCardString = testCard.getFormattedString();
    var lines = vCardString.split(/[\n\r]+/);

    describe('.getFormattedString', function() {

        it('should start with BEGIN:VCARD', function(done) {
            assert(lines.length > 0 && lines[0] === 'BEGIN:VCARD');
            done();
        });

        it('should be well-formed', function(done) {
            var line = '';
            var segments = '';

            for (var i=0; i<lines.length; i++) {
                line = lines[i];

                if (line.length > 0) {
                    segments = line.split(':');
                    assert(segments.length >= 2 || segments[0].indexOf(';') === 0);
                }
            }
            done();
        });

        it('should encode [\\n,\',;] properly (3.0+)', function(done) {
            var line = '';

            for (var i=0; i<lines.length; i++) {
                line = lines[i];

                if (line.indexOf('NOTE') === 0) {
                    assert(line.indexOf('\\n') !== -1 && line.indexOf('\\') !== -1 && line.indexOf('\\;') !== -1);
                    done();
                }
            }
        });

        it('should end with END:VCARD', function(done) {
            assert(lines.length > 2 && lines[lines.length-2] === 'END:VCARD');
            done();
        });
    });
});