// import multer from "multer";

// const storage = multer.memoryStorage();

// let singleUpload;
// let fieldName;
// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     fieldName = file.fieldname;

//   },

// });
// console.log(fieldName)

// fieldName === "file"
//   ? (singleUpload = multer({ storage }).single("file"))
//   : (singleUpload = multer({ storage }).array("images", 10));

// export default singleUpload;

import multer from "multer";

const storage = multer.memoryStorage();

const singleUpload = multer({ storage }).single("file");

export default singleUpload;

export const multipleUpload = multer({ storage }).array('images',10);
