//multer setup in this file
import multer from "multer"

const upload = multer({
    storage:multer.memoryStorage(),
    limits:{
        size: 3*1024*1024
    }
})

export default upload