declare module '@zouloux/files'
{
	export class Files
	{
		// ------------------------------------------------------------------------- STATICS

		/**
		 * Target existing files from a glob.
		 */
		static getFiles (pGlob):Files

		/**
		 * Target existing folders from a glob.
		 */
		static getFolders (pGlob):Files

		/**
		 * Target any file or folders.
		 */
		static any (pPath):Files

		/**
		 * Target a non existing file or folder.
		 */
		static new (pPath):Files

		/**
		 * Enable or disable console log.
		 * - If value is a boolean, will enable logs on true.
		 * - If value is a number, will enable log which have higher log leval than value.
		 * - If value is a function, will call at each log with log content and log level as arguments.
		 */
		static setVerbose (value:boolean|number|((pLogContent, pLogLevel) => void)):void
		static getVerbose ():boolean|number|((pLogContent, pLogLevel) => void)


		// ------------------------------------------------------------------------- PROPERTIES

		/**
		 * Glob pattern targeting files or folders.
		 */
		glob		:string;

		/**
		 * Existing files from glob.
		 * Can be empty if you create a new file or folder.
		 */
		files		:string[];

		/**
		 * Current file stats in cache
		 */
		protected _fileStats:any;


		// ------------------------------------------------------------------------- INIT

		/**
		 * Target files list or folder from a glog.
		 * Can target files and folder if not filtered.
		 * @param pGlob Glob pattern.
		 * @param pNew If true, will target nothing.
		 * @param pOnlyFiles If true, will only target existing files.
		 * @param pOnlyFolders If true, will only target existing folders.
		 */
		constructor (pGlob, pNew?:boolean, pOnlyFiles?:boolean, pOnlyFolders?:boolean)


		/**
		 * Filter glob to target only existing files.
		 */
		onlyExistingFiles ();

		/**
		 * Filter glob to target only existing folders.
		 */
		onlyExistingFolders ();


		// ------------------------------------------------------------------------- FILES

		/**
		 * Check if this glob is targeting existing files or folders.
		 */
		exists ():boolean;

		/**
		 * Browse through all targeted files or folders from glob.
		 * @param pHandler First argument will be the file or folder path
		 */
		all ( pHandler : (file:string, index?:number) => void ):string[];


		// ------------------------------------------------------------------------- DELETE AND REMOVE

		/**
		 * Delete all targeted files or folders.
		 * No warning.
		 * @return {number} Total removed files.
		 */
		delete ():number

		/**
		 * Delete all targeted files or folders.
		 * No warning.
		 * @return {number} Total removed files.
		 */
		remove ():number


		// ------------------------------------------------------------------------- FOLDERS AND DIRECTORIES

		/**
		 * Create parent folders if they do not exists.
		 * Will use glob if there is no targeted files.
		 */
		createFolders ():void

		/**
		 * Create parent folders if they do not exists.
		 * Will use glob if there is no targeted files.
		 */
		ensureFolders ():void


		// ------------------------------------------------------------------------- COPY AND MOVE

		/**
		 * Move all targeted files or folders inside a directory.
		 * Add a trailing slash to force directory creation.
		 * Files list will be updated with new moved file paths.
		 * @param pDestination Directory path where all files / folders will be moved into. No glob.
		 * @return {number} Total moved files.
		 */
		moveTo ( pDestination:string ):number

		/**
		 * Copy all targeted files or folders inside a directory.
		 * Add a trailing slash to force directory creation.
		 * Files list will stay the same after using this method.
		 * @param pDestination Directory path where all files / folders will be copied into. No glob.
		 * @return {number} Total copied files.
		 */
		copyTo ( pDestination:string ):number


		// ------------------------------------------------------------------------- STRING FILE CONTENT

		/**
		 * Read file content.
		 * Only work if glob is pointing to an existing file.
		 * Returns null if the file is not found.
		 * @param pEncoding default is null.
		 * @param pKeepBuffer Return a Buffer or convert as string. Default is true and returns a string.
		 */
		read ( pEncoding, pKeepBuffer ):Buffer|string;

		/**
		 * Write file content.
		 * Will use glob to create a unique file.
		 * @param pContent Content of the file to write, as a string
	 	 * @param pEncoding default is null
		 */
		write ( pContent, pEncoding?:string )

		/**
		 * Update a file with an handler.
		 * Will read file content and pass it as first argument of the handler.
		 * Will write file content from handler return.
		 * @param pHandler Will have file content as first argument. Return new file content to be written.
	 	 * @param pEncoding default is null
		 */
		alter ( pHandler, pEncoding?:string )

		/**
		 * Add content to an existing file.
		 * Will create file if it does not exists
		 * @param pContent Content to append
		 * @param pNewLine If true, will create a new line.
	 	 * @param pEncoding default is null
		 */
		append ( pContent, pNewLine?:boolean, pEncoding?:string )


		// ------------------------------------------------------------------------- JSON FILE CONTENT
		
		/**
		 * Read JSON file content.
		 * Will return null if file does not exists.
	 	 * @param pEncoding default is null
		 */
		readJSON ( pEncoding?:string ):string

		/**
		 * Write file content as JSON.
		 * @param pContent Javascript object to write.
		 * @param pSpaces Spaces size. Null to uglify.
	 	 * @param pEncoding default is null
		 */
		writeJSON ( pContent:any, pSpaces?:number|null, pEncoding?:string )

		/**
		 * Update a JSON file with an handler.
		 * @param pHandler Will have JSON content as first argument. Return new JSON content to be written.
		 * @param pSpaces Spaces size. Null to uglify.
	 	 * @param pEncoding default is null
		 */
		alterJSON ( pHandler, pSpaces?:number|null, pEncoding?:string )


		// ------------------------------------------------------------------------- FILE STATS

		/**
		 * Get files stats.
		 * Only works when targetting one file, otherwise will return null.
		 */
		getFileStats ():any

		/**
		 * Get last modified timestamp.
		 * Only works when targetting one file, otherwise will return null.
		 */
		getLastModified ():number|null

		/**
		 * Get file size as bytes.
		 * Only works when targetting one file, otherwise will return null.
		 */
		getSize ():number|null


		// ------------------------------------------------------------------------- HASH

		/**
		 * Generate hash from current files list.
		 * Will generate another hash if there is other files.
		 * Can generate also a different hash from file last modified or file size.
		 * File list modified is often enough to detect changes in file system.
		 * @param pLastModified Add file last modified date for each file into hash signature. Hash will change if any file last modified date changes.
		 * @param pSize Add file size for each file into hash signature. Hash will change if any file size changes.
		 * @return {string} Hex Sga256 Hash from file list and stats.
		 */
		generateFileListHash (pLastModified, pSize)
	}
}