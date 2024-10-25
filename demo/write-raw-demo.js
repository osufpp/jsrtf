
const resultFile = __dirname + '/results/write-raw-demo.rtf';

// YM (DEBUG)
const modules = global.modules = require('ym');
// Preload modules required by jsRTF (in real environment need to be loaded before using jsRTF)...
if ( typeof modules === 'object' ) {
    require('inherit');
}

const jsRTF = require('../lib/index');

if ( typeof modules === 'object' ) {
    console.log('Run demo using YM...');
    modules.require([
        'jsrtf',
    ], testRTF);
}
else {
    console.log('Run demo using commonJS...');
    testRTF(jsRTF);
}

function testRTF (jsRTF) {

    // Create RTF object
    var myDoc = new jsRTF();

    myDoc.writeText("Here's some regular text.", { fontSize: 24, paragraph: true });

    myDoc.composeInlineText('{\\pard ', "line1");
    myDoc.composeInlineText('\\b bold text \\b0 ', "line1");
    myDoc.composeInlineText('\\i italic text \\i0 ', "line1");
    myDoc.composeInlineText('\\ul underlined text \\ul0 ', "line1");
    myDoc.composeInlineText('\\par}', "line1");

    myDoc.addInlineText("line1");

    myDoc.writeText("Here's some more regular text.", { fontSize: 24, paragraph: true });

    // Make content...
    var content = myDoc.createDocument();

    // Write file...
    writeResult(content);
}

function writeResult (content) {

    const
        // nodejs core...
        path  = require('path'),
        fs  = require('fs-extra')
    ;

    // writing file
    fs.ensureDirSync(path.dirname(resultFile));
    fs.writeFile(resultFile, content, function (error) {
        if ( !error ) {
            console.info('Created file ' + resultFile);
        }
        else {
            console.error(error);
        }
    });

}

