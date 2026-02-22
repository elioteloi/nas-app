package com.drive

import android.Manifest
import android.content.pm.PackageManager
import android.net.Uri
import android.provider.MediaStore
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.*
import java.io.File
import java.io.FileOutputStream

class MediaStoreModule(
  private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "MediaStoreModule"

  /**
   * Copy content:// URI to app cache and return file:// URI
   */
  private fun copyUriToCache(uri: Uri, fileName: String): String? {
    return try {
      val inputStream = reactContext.contentResolver.openInputStream(uri)
      val file = File(reactContext.cacheDir, fileName)
      val outputStream = FileOutputStream(file)

      inputStream?.use { input ->
        outputStream.use { output ->
          input.copyTo(output)
        }
      }

      "file://${file.absolutePath}"

    } catch (e: Exception) {
      null
    }
  }

  /**
   * Check permission
   */
  private fun hasPermission(): Boolean {
    val permission = if (android.os.Build.VERSION.SDK_INT >= 33) {
      Manifest.permission.READ_MEDIA_IMAGES
    } else {
      Manifest.permission.READ_EXTERNAL_STORAGE
    }

    return ContextCompat.checkSelfPermission(
      reactContext,
      permission
    ) == PackageManager.PERMISSION_GRANTED
  }

  /**
   * Get all image folders
   */
  @ReactMethod
  fun getImageFolders(promise: Promise) {

    if (!hasPermission()) {
      promise.reject("NO_PERMISSION", "Storage permission not granted")
      return
    }

    try {
      val resolver = reactContext.contentResolver

      val projection = arrayOf(
        MediaStore.Images.Media.BUCKET_ID,
        MediaStore.Images.Media.BUCKET_DISPLAY_NAME,
        MediaStore.Images.Media._ID,
        MediaStore.Images.Media.DATE_ADDED
      )

      val sortOrder = "${MediaStore.Images.Media.DATE_ADDED} DESC"

      val folderMap = mutableMapOf<Long, FolderData>()

      val cursor = resolver.query(
        MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
        projection,
        null,
        null,
        sortOrder
      )

      cursor?.use {

        val bucketIdIndex =
          it.getColumnIndexOrThrow(MediaStore.Images.Media.BUCKET_ID)

        val bucketNameIndex =
          it.getColumnIndexOrThrow(MediaStore.Images.Media.BUCKET_DISPLAY_NAME)

        val idIndex =
          it.getColumnIndexOrThrow(MediaStore.Images.Media._ID)

        while (it.moveToNext()) {

          val bucketId = it.getLong(bucketIdIndex)
          val bucketName = it.getString(bucketNameIndex) ?: "Unknown"
          val imageId = it.getLong(idIndex)

          val contentUri = Uri.withAppendedPath(
            MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
            imageId.toString()
          )

          val existing = folderMap[bucketId]

          if (existing == null) {
            folderMap[bucketId] =
              FolderData(bucketName, 1, contentUri.toString())
          } else {
            existing.count += 1
          }
        }
      }

      val result = Arguments.createArray()

      folderMap.forEach { (bucketId, data) ->
        val map = Arguments.createMap()
        map.putString("id", bucketId.toString())
        map.putString("name", data.name)
        map.putInt("count", data.count)
        map.putString("lastImage", data.lastImageUri)
        result.pushMap(map)
      }

      promise.resolve(result)

    } catch (e: Exception) {
      promise.reject("ERROR_GET_IMAGE_FOLDERS", e)
    }
  }

  /**
   * Get images by folder (returns file:// URIs ready for upload)
   */
  @ReactMethod
  fun getImagesByFolder(bucketId: String, promise: Promise) {

    if (!hasPermission()) {
      promise.reject("NO_PERMISSION", "Storage permission not granted")
      return
    }

    try {

      val resolver = reactContext.contentResolver

      val projection = arrayOf(
        MediaStore.Images.Media._ID,
        MediaStore.Images.Media.DISPLAY_NAME,
        MediaStore.Images.Media.MIME_TYPE,
        MediaStore.Images.Media.SIZE,
        MediaStore.Images.Media.WIDTH,
        MediaStore.Images.Media.HEIGHT,
        MediaStore.Images.Media.DATE_ADDED
      )

      val selection = "${MediaStore.Images.Media.BUCKET_ID} = ?"
      val selectionArgs = arrayOf(bucketId)
      val sortOrder = "${MediaStore.Images.Media.DATE_ADDED} DESC"

      val cursor = resolver.query(
        MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
        projection,
        selection,
        selectionArgs,
        sortOrder
      )

      val result = Arguments.createArray()

      cursor?.use {

        val idIndex =
          it.getColumnIndexOrThrow(MediaStore.Images.Media._ID)

        val nameIndex =
          it.getColumnIndexOrThrow(MediaStore.Images.Media.DISPLAY_NAME)

        val mimeIndex =
          it.getColumnIndexOrThrow(MediaStore.Images.Media.MIME_TYPE)

        val sizeIndex =
          it.getColumnIndexOrThrow(MediaStore.Images.Media.SIZE)

        val widthIndex =
          it.getColumnIndexOrThrow(MediaStore.Images.Media.WIDTH)

        val heightIndex =
          it.getColumnIndexOrThrow(MediaStore.Images.Media.HEIGHT)

        val dateIndex =
          it.getColumnIndexOrThrow(MediaStore.Images.Media.DATE_ADDED)

        while (it.moveToNext()) {

          val imageId = it.getLong(idIndex)
          val name = it.getString(nameIndex) ?: "image_$imageId.jpg"
          val mimeType = it.getString(mimeIndex) ?: "image/jpeg"
          val size = it.getLong(sizeIndex)
          val width = it.getInt(widthIndex)
          val height = it.getInt(heightIndex)
          val dateAdded = it.getLong(dateIndex)

          val contentUri = Uri.withAppendedPath(
            MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
            imageId.toString()
          )

          // 🔥 Convert to file://
          val fileUri =
            copyUriToCache(contentUri, name) ?: contentUri.toString()

          val imageMap = Arguments.createMap()
          imageMap.putString("id", imageId.toString())
          imageMap.putString("name", name)
          imageMap.putString("uri", fileUri)
          imageMap.putString("mimeType", mimeType)
          imageMap.putDouble("size", size.toDouble())
          imageMap.putInt("width", width)
          imageMap.putInt("height", height)
          imageMap.putDouble("dateAdded", dateAdded.toDouble())

          result.pushMap(imageMap)
        }
      }

      promise.resolve(result)

    } catch (e: Exception) {
      promise.reject("ERROR_GET_IMAGES_BY_FOLDER", e)
    }
  }

  private data class FolderData(
    val name: String,
    var count: Int,
    val lastImageUri: String
  )
}