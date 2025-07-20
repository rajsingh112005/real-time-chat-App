const UploadFile = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append("upload_preset", "chat-app-file") // Using default unsigned preset that should exist
  
  // Correct Cloudinary upload URL format
  const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`

  try {
    console.log('Uploading to Cloudinary:', {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      url: url,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });

    const response = await fetch(url, {
      method: 'post',
      body: formData
    })

    console.log('Cloudinary response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cloudinary error response:', errorText);
      throw new Error(`Cloudinary upload failed: ${response.status} - ${errorText}`);
    }

    const responseData = await response.json()
    console.log('Cloudinary success response:', responseData);
    
    return responseData
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

export default UploadFile
