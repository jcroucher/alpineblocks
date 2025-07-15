# AlpineBlocks Image Upload Server Examples

AlpineBlocks includes client-side image upload functionality that requires a server endpoint to handle file uploads. Below are examples for popular server frameworks.

## Configuration

Configure the upload endpoint in your HTML:

```javascript
window.ALPINEBLOCKS_CONFIG = {
    uploadEndpoint: '/api/upload-image' // Change this to your endpoint
};
```

## PHP Example

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    if (!isset($_FILES['image'])) {
        throw new Exception('No image file uploaded');
    }
    
    $uploadedFile = $_FILES['image'];
    $blockId = $_POST['blockId'] ?? '';
    
    // Validate file type
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!in_array($uploadedFile['type'], $allowedTypes)) {
        throw new Exception('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.');
    }
    
    // Validate file size (5MB max)
    $maxSize = 5 * 1024 * 1024; // 5MB
    if ($uploadedFile['size'] > $maxSize) {
        throw new Exception('File too large. Maximum size is 5MB.');
    }
    
    // Create upload directory if it doesn't exist
    $uploadDir = 'uploads/images/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    // Generate unique filename
    $extension = pathinfo($uploadedFile['name'], PATHINFO_EXTENSION);
    $filename = uniqid() . '_' . time() . '.' . $extension;
    $uploadPath = $uploadDir . $filename;
    
    // Move uploaded file
    if (!move_uploaded_file($uploadedFile['tmp_name'], $uploadPath)) {
        throw new Exception('Failed to save uploaded file');
    }
    
    // Return success response with URL
    $imageUrl = '/' . $uploadPath; // Adjust this based on your web root
    echo json_encode([
        'success' => true,
        'url' => $imageUrl,
        'filename' => $filename,
        'blockId' => $blockId
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
```

## Rails Example

```ruby
# config/routes.rb
Rails.application.routes.draw do
  post '/api/upload-image', to: 'images#upload'
end

# app/controllers/images_controller.rb
class ImagesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:upload]
  
  def upload
    begin
      unless params[:image].present?
        raise 'No image file uploaded'
      end
      
      uploaded_file = params[:image]
      block_id = params[:blockId]
      
      # Validate file type
      allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      unless allowed_types.include?(uploaded_file.content_type)
        raise 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'
      end
      
      # Validate file size (5MB max)
      max_size = 5.megabytes
      if uploaded_file.size > max_size
        raise 'File too large. Maximum size is 5MB.'
      end
      
      # Create upload directory
      upload_dir = Rails.root.join('public', 'uploads', 'images')
      FileUtils.mkdir_p(upload_dir) unless Dir.exist?(upload_dir)
      
      # Generate unique filename
      extension = File.extname(uploaded_file.original_filename)
      filename = "#{SecureRandom.uuid}_#{Time.now.to_i}#{extension}"
      file_path = upload_dir.join(filename)
      
      # Save file
      File.open(file_path, 'wb') do |file|
        file.write(uploaded_file.read)
      end
      
      # Return success response
      image_url = "/uploads/images/#{filename}"
      render json: {
        success: true,
        url: image_url,
        filename: filename,
        blockId: block_id
      }
      
    rescue => e
      render json: {
        success: false,
        message: e.message
      }, status: :bad_request
    end
  end
end
```

## Node.js/Express Example

First install required packages:
```bash
npm install express multer path
```

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/images/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'), false);
    }
  }
});

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Serve static files
app.use('/uploads', express.static('uploads'));

// Upload endpoint
app.post('/api/upload-image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file uploaded'
      });
    }
    
    const imageUrl = `/uploads/images/${req.file.filename}`;
    
    res.json({
      success: true,
      url: imageUrl,
      filename: req.file.filename,
      blockId: req.body.blockId
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Error handler for multer errors
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB.'
      });
    }
  }
  
  res.status(400).json({
    success: false,
    message: error.message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Security Considerations

1. **File Type Validation**: Always validate file types on the server-side
2. **File Size Limits**: Implement reasonable file size limits
3. **Sanitize Filenames**: Generate unique filenames to prevent conflicts
4. **Directory Traversal**: Ensure uploaded files stay in designated directories
5. **Virus Scanning**: Consider integrating virus scanning for production use
6. **Rate Limiting**: Implement rate limiting to prevent abuse
7. **Authentication**: Add authentication if required for your use case

## Response Format

All endpoints should return JSON in this format:

**Success:**
```json
{
  "success": true,
  "url": "/uploads/images/filename.jpg",
  "filename": "filename.jpg",
  "blockId": "block-12345"
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```