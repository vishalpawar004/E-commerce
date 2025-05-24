
export default function imageValidator(e) {
    let files = e.target.files
    if (files.length === 0)
        return "Pic Field is Mandatory"
    if (files.length === 1) {
        let file = files[0]
        if (file.size > 1048576)
            return "Pic Size is too high. Please upload an image upto 1 MB"
        else if (!(file.type === "image/png" || file.type === "image/jpg " || file.type === "image/jpeg" || file.type === "image/gif")) {
            return "Invalid Pic Format. Please Upload and Image of type .png,.jpeg,jpg,gif"
        }
        else {
            return ""
        }
    } else {
        let errorMessage = []
        Array.from(files).forEach((x, index) => {
            if (x.size > 1048576)
                errorMessage.push(`Pic${index + 1} Size is too high. Please Upload an Image Upto 1 MB`)
            else if (!(x.type === 'image/png' || x.type === 'image/jpg' || x.type === 'image/jpeg' || x.type === 'image/gif'))
                errorMessage.push(`Invalid Pic${index + 1} Format. Please Upload and Image of type .png,jpg,jpeg,gif`)
        })
        return errorMessage.length === 0 ? "" : errorMessage
    }
}
