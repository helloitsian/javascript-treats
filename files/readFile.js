const readFile = (file, readAs) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      resolve(e.target.result);
    };

    reader.error = (err) => {
      reject(err);
    }

    switch (readAs) {
      case "text":
        reader.readAsText(file);
        break;
      case "buffer":
        reader.readAsArrayBuffer(file);
        break;
      case "binary":
        reader.readAsBinaryString(file);
        break;
      case "dataUrl":
        reader.readAsDataURL(file);
        break;
    }
  });
