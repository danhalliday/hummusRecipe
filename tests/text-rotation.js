const fs = require('fs');
const path = require('path');
const HummusRecipe = require('../lib');
const htmlCodes = fs.readFileSync(path.join(__dirname, './materials/text.html'), 'utf8');

describe('Text Rotation', () => {
    it('Add text with rotation', (done) => {
        const src = path.join(__dirname, 'materials/test.pdf')
        const output = path.join(__dirname, `output/Add text - rotation1.pdf`);
        const recipe = new HummusRecipe(src, output);

        const pages = recipe.metadata.pages;
        const angles = [0, 0, 1, 45, 90, 180, 270, 360, -90, -180, -270, -360, 450];
        for (let i = 1; i <= pages; i++) {
            const angle = angles[i] || 0;
            recipe
                .editPage(i)
                .circle('center', 'center', 10, { stroke: '#0032FF' })
                // apparently \n wont work correcly
                .text(`${angle} ROTATION`, 'center', 'center', {
                    bold: true,
                    size: 80,
                    color: '#0000FF',
                    align: 'center center',
                    rotation: angle
                })
                .endPage()
        };
        recipe.endPDF(done);
    });
});
