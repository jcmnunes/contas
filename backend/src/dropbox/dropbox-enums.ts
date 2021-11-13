export enum LookupError {
  MalformedPath = 'malformed_path',
  NotFound = 'not_found',
  NotFile = 'not_file',
  NotFolder = 'not_folder',
  RestrictedContent = 'restricted_content',
  UnsupportedContentType = 'unsupported_content_type',
}

export enum ConflictError {
  File = 'file',
  Folder = 'folder',
  FileAncestor = 'file_ancestor',
}

export enum WriteError {
  MalformedPath = 'malformed_path',
  Conflict = 'conflict',
  NotFile = 'not_file',
  NotFolder = 'not_folder',
  RestrictedContent = 'restricted_content',
  UnsupportedContentType = 'unsupported_content_type',
}
