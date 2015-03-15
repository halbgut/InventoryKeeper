Pictures = new FS.Collection('Pictures', {
  stores: [
    new FS.Store.GridFS('Thumbs', {transformWrite: function (fileObj, readStream, writeStream) {
      gm(readStream, fileObj.name()).resize('200', '200').stream().pipe(writeStream);
    }})
  , new FS.Store.GridFS('Pictures')
  ]
, filters: {
    allow: {
      contentTypes: ['image/*']
    }
  }
})