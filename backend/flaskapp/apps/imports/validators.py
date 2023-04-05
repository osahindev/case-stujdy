from flask_sieve import FormRequest

class UploadFileRequest(FormRequest):
    def rules(self):
        return {
            "file": ["required","file"]
        }