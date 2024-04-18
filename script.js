var canvas;

document.getElementById('imageUpload').addEventListener('change', function(e) {
    if (!canvas) {
        canvas = new fabric.Canvas('canvas');
    } else {
        canvas.clear();
    }
    var reader = new FileReader();

    reader.onload = function(event) {
        var imgObj = new Image();
        imgObj.src = event.target.result;

        imgObj.onload = function() {
            var image = new fabric.Image(imgObj);
            image.set({
                left: 0,
                top: 0,
                angle: 0,
                selectable: false
            });
            image.scaleToWidth(canvas.width);
            canvas.add(image);
            canvas.renderAll();

            // Loading a cowboy hat image to be added on the canvas
            fabric.Image.fromURL('/cowboy_hat.png', function(hat) {
                hat.scaleToWidth(canvas.width * 0.5);
                hat.set({
                    left: canvas.width / 2 - hat.getScaledWidth() / 2,
                    top: canvas.height / 3 - hat.getScaledHeight() / 2,
                    selectable: true // Make the hat selectable and movable
                });
                canvas.add(hat);
                canvas.setActiveObject(hat); // Set the hat as the active object
                canvas.renderAll();
            });
        };
    };

    reader.readAsDataURL(e.target.files[0]);
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    var img = document.getElementById('outputImage');
    img.src = canvas.toDataURL('image/png');
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
});

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        canvas.wrapperEl.style.display = 'block'; // Show the canvas after closing the modal
    }
}

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    const canvasElem = document.getElementById('canvas');
    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = (window.innerHeight - document.querySelector('h1').offsetHeight - document.querySelector('#controls').offsetHeight) * 0.95;
    const size = Math.min(maxWidth, maxHeight);
    canvasElem.width = size;
    canvasElem.height = size;
    if (canvas) {
        canvas.setWidth(size);
        canvas.setHeight(size);
        canvas.renderAll();
    }
}

resizeCanvas();