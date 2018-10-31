import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const createImage = (node) => {
  return html2canvas(node, { scale: 1, backgroundColor: '#fff' })
    .then(canvas => {
      const ctx = canvas.getContext('2d');

      ctx.webkitImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;

      return canvas.toDataURL('image/jpeg', 1);
    }).then(image => {
      node.remove();
      return image;
    });
}

export const createGridImage = () => {
  const editorGridClone = document.getElementById('editor-grid').cloneNode(true);

  editorGridClone.id = 'editor-grid-clone';
  editorGridClone.style.position = 'absolute';
  editorGridClone.style.marginLeft = '-2000px';

  document.body.appendChild(editorGridClone);

  return createImage(editorGridClone);
}

export const createLegendImage = () => {
  const editorLegendClone = document.getElementById('editor-legend').cloneNode(true);

  editorLegendClone.id = 'editor-legend-clone';
  editorLegendClone.style.position = 'absolute';
  editorLegendClone.style.marginLeft = '-4000px';

  document.body.appendChild(editorLegendClone);

  return createImage(editorLegendClone);
}

export const downloadPDF = (imagesCb) => {
  Promise.all(imagesCb.map(imageCb => imageCb())).then(results => {
    const pdf = new jsPDF('portrait', 'mm', 'A4');
    pdf.addImage(results[0], 'JPEG', 0, 0);

    if (results.length > 1){
      for(let i=1; i < results.length; i++){
        pdf.addPage();
        pdf.addImage(results[i], 'JPEG', 0, 0);
      }
    }

    pdf.save('download.pdf');
  });
}
