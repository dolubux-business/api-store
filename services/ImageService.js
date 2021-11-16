/** @format */
const multer = require("multer");
const path = require("path");
const fs = require("fs");

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./storage");
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.fieldname + "_" + Date.now() + path.extname(file.originalname)
		);
	},
});
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1000000, // 1000000 Bytes = 1 MB
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(png|jpg)$/)) {
			// upload only png and jpg format

			return cb(new Error("Please upload a Image"));
		}
		cb(undefined, true);
	},
});

const oneUploadFile = upload.single("im_one_file");
const multipleUploadFiles = upload.array("im_muplite_file", 3);

module.exports = {
	oneUploadFile,
	multipleUploadFiles,
};
