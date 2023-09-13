import multer from "multer";

const storage = multer.memoryStorage();

let singleUpload;
let fieldName;
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    fieldName = file.fieldname;
  },
});

fieldName === "file"
  ? (singleUpload = multer({ storage }).single("file"))
  : singleUpload = multer({ storage }).single("images");

export default singleUpload;
