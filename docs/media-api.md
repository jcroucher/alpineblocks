# Media API Documentation

This document describes the server-side API endpoints required to support the remote media picker functionality.

## Configuration

To enable the media picker, configure it in your editor initialization:

```javascript
// Initialize editor with media picker
x-data="alpineEditor({
    tools: [
        { class: 'Paragraph' },
        { class: 'Image' },
        { class: 'VideoPlayer' }
    ],
    media: {
        apiUrl: 'https://your-api-server.com/api/media',
        allowUpload: true,
        fileTypes: ['all', 'image', 'video']
    }
})"
```

## API Endpoints

### 1. Browse Media Files

**Endpoint:** `POST /api/media/browse`

**Description:** Lists files and folders in the specified directory.

**Request Body:**
```json
{
    "path": "/photos/2024",
    "filter": "image"
}
```

**Parameters:**
- `path` (string): Directory path to browse (e.g., "/", "/photos", "/videos/2024")
- `filter` (string): Filter by file type - "all", "image", or "video"

**Response:**
```json
{
    "success": true,
    "items": [
        {
            "name": "subfolder",
            "path": "/photos/2024/subfolder",
            "type": "folder",
            "size": null,
            "modified": "2024-01-15T10:30:00Z"
        },
        {
            "name": "image1.jpg",
            "path": "/photos/2024/image1.jpg",
            "url": "https://your-cdn.com/photos/2024/image1.jpg",
            "thumbnail": "https://your-cdn.com/photos/2024/thumbs/image1.jpg",
            "type": "image",
            "size": "2.5 MB",
            "dimensions": "1920x1080",
            "modified": "2024-01-15T10:30:00Z"
        },
        {
            "name": "video1.mp4",
            "path": "/videos/2024/video1.mp4",
            "url": "https://your-cdn.com/videos/2024/video1.mp4",
            "thumbnail": "https://your-cdn.com/videos/2024/thumbs/video1.jpg",
            "type": "video",
            "size": "15.2 MB",
            "duration": "00:02:30",
            "dimensions": "1920x1080",
            "modified": "2024-01-15T10:30:00Z"
        }
    ]
}
```

**Error Response:**
```json
{
    "success": false,
    "error": "Directory not found",
    "message": "The specified path does not exist"
}
```

### 2. Upload Media Files

**Endpoint:** `POST /api/media/upload`

**Description:** Uploads one or more files to the specified directory.

**Request:** Multipart form data with:
- `files` (file[]): Array of files to upload
- `path` (string): Target directory path

**Response:**
```json
{
    "success": true,
    "uploaded": [
        {
            "name": "new-image.jpg",
            "path": "/photos/2024/new-image.jpg",
            "url": "https://your-cdn.com/photos/2024/new-image.jpg",
            "thumbnail": "https://your-cdn.com/photos/2024/thumbs/new-image.jpg",
            "type": "image",
            "size": "1.8 MB"
        }
    ]
}
```

**Error Response:**
```json
{
    "success": false,
    "error": "Upload failed",
    "message": "File type not allowed"
}
```

## Implementation Examples

### Node.js/Express Example

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const upload = multer({ dest: 'uploads/' });

// Browse media files
app.post('/api/media/browse', async (req, res) => {
    try {
        const { path: requestPath, filter } = req.body;
        const fullPath = path.join(process.env.MEDIA_ROOT, requestPath);
        
        const files = await fs.readdir(fullPath, { withFileTypes: true });
        const items = [];
        
        for (const file of files) {
            const filePath = path.join(requestPath, file.name);
            const stat = await fs.stat(path.join(fullPath, file.name));
            
            if (file.isDirectory()) {
                items.push({
                    name: file.name,
                    path: filePath,
                    type: 'folder',
                    size: null,
                    modified: stat.mtime.toISOString()
                });
            } else {
                const ext = path.extname(file.name).toLowerCase();
                const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
                const isVideo = ['.mp4', '.webm', '.ogg', '.mov'].includes(ext);
                
                if (filter === 'all' || 
                    (filter === 'image' && isImage) || 
                    (filter === 'video' && isVideo)) {
                    
                    items.push({
                        name: file.name,
                        path: filePath,
                        url: `${process.env.CDN_URL}${filePath}`,
                        thumbnail: `${process.env.CDN_URL}/thumbs${filePath}`,
                        type: isImage ? 'image' : isVideo ? 'video' : 'file',
                        size: formatFileSize(stat.size),
                        modified: stat.mtime.toISOString()
                    });
                }
            }
        }
        
        res.json({ success: true, items });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: 'Browse failed', 
            message: error.message 
        });
    }
});

// Upload media files
app.post('/api/media/upload', upload.array('files'), async (req, res) => {
    try {
        const { path: targetPath } = req.body;
        const uploaded = [];
        
        for (const file of req.files) {
            const fileName = file.originalname;
            const filePath = path.join(targetPath, fileName);
            const fullPath = path.join(process.env.MEDIA_ROOT, filePath);
            
            // Move file to target location
            await fs.rename(file.path, fullPath);
            
            // Generate thumbnail if image
            if (file.mimetype.startsWith('image/')) {
                await generateThumbnail(fullPath, filePath);
            }
            
            uploaded.push({
                name: fileName,
                path: filePath,
                url: `${process.env.CDN_URL}${filePath}`,
                thumbnail: `${process.env.CDN_URL}/thumbs${filePath}`,
                type: file.mimetype.startsWith('image/') ? 'image' : 'video',
                size: formatFileSize(file.size)
            });
        }
        
        res.json({ success: true, uploaded });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: 'Upload failed', 
            message: error.message 
        });
    }
});

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function generateThumbnail(sourcePath, targetPath) {
    // Implementation depends on your image processing library
    // Example using sharp: sharp(sourcePath).resize(200, 200).toFile(thumbnailPath)
}
```

### PHP Example

```php
<?php
// Browse media files
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/api/media/browse') {
    $input = json_decode(file_get_contents('php://input'), true);
    $path = $input['path'] ?? '/';
    $filter = $input['filter'] ?? 'all';
    
    $fullPath = $_ENV['MEDIA_ROOT'] . $path;
    
    if (!is_dir($fullPath)) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Directory not found']);
        exit;
    }
    
    $items = [];
    $files = scandir($fullPath);
    
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') continue;
        
        $filePath = $path . '/' . $file;
        $fullFilePath = $fullPath . '/' . $file;
        
        if (is_dir($fullFilePath)) {
            $items[] = [
                'name' => $file,
                'path' => $filePath,
                'type' => 'folder',
                'size' => null,
                'modified' => date('c', filemtime($fullFilePath))
            ];
        } else {
            $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            $isImage = in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp']);
            $isVideo = in_array($ext, ['mp4', 'webm', 'ogg', 'mov']);
            
            if ($filter === 'all' || 
                ($filter === 'image' && $isImage) || 
                ($filter === 'video' && $isVideo)) {
                
                $items[] = [
                    'name' => $file,
                    'path' => $filePath,
                    'url' => $_ENV['CDN_URL'] . $filePath,
                    'thumbnail' => $_ENV['CDN_URL'] . '/thumbs' . $filePath,
                    'type' => $isImage ? 'image' : ($isVideo ? 'video' : 'file'),
                    'size' => formatFileSize(filesize($fullFilePath)),
                    'modified' => date('c', filemtime($fullFilePath))
                ];
            }
        }
    }
    
    echo json_encode(['success' => true, 'items' => $items]);
}

function formatFileSize($bytes) {
    if ($bytes == 0) return '0 Bytes';
    $k = 1024;
    $sizes = ['Bytes', 'KB', 'MB', 'GB'];
    $i = floor(log($bytes) / log($k));
    return round($bytes / pow($k, $i), 2) . ' ' . $sizes[$i];
}
?>
```

## Security Considerations

1. **Path Traversal Protection**: Validate and sanitize all path parameters to prevent directory traversal attacks
2. **File Type Validation**: Only allow specific file types and validate both extension and MIME type
3. **File Size Limits**: Implement reasonable file size limits for uploads
4. **Authentication**: Require proper authentication for all media operations
5. **Rate Limiting**: Implement rate limiting to prevent abuse
6. **Virus Scanning**: Scan uploaded files for malware before storing
7. **Access Control**: Implement proper access controls based on user permissions

## Error Handling

The API should return appropriate HTTP status codes:
- 200: Success
- 400: Bad Request (invalid parameters)
- 401: Unauthorized
- 403: Forbidden (insufficient permissions)
- 404: Not Found (path doesn't exist)
- 413: Payload Too Large (file too big)
- 415: Unsupported Media Type (invalid file type)
- 500: Internal Server Error