require('jsdom-global')()

// global.jestExpect = require('expect')

global.chai = require('chai');
global.should = chai.should();
global.expect = chai.expect;