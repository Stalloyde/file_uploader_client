function UploadNewFile() {
  return (
    <form method='POST'>
      <label htmlFor='upload-file'>Upload New File</label>
      <input type='file' id='upload-file'></input>
      <button>Upload</button>
      <button>Cancel</button>
    </form>
  );
}

export default UploadNewFile;
