import {
  FileText,
  FileImage,
  Type,
  Code,
  BrainCircuit,
  Layers,
  Info,
  CaseSensitive,
  CheckSquare,
  Terminal,
  Key,
  Locate,
  PlayCircle,
  Settings2,
  Shield,
  Zap,
  Package,
  Scissors,
  RotateCcw,
  FlipHorizontal,
  Palette,
  Redo,
  ArrowRightLeft,
  Search,
  BookText,
  Languages,
  Text,
  Lock,
  Unlock,
  FileSignature,
  FileKey,
  Database,
  Braces,
  Regex,
  TestTube,
  FileJson,
  Waypoints,
  Trash2,
  Scan,
  User,
  Image as ImageIcon,
  Aperture,
  Wand2,
  AudioLines,
  FileVideo,
  QrCode,
  Barcode,
  Clock,
  ListTodo,
  Calendar,
  Shuffle,
  Paintbrush,
  Link as LinkIcon,
  Workflow,
  Cloud,
  Mail,
  MoreHorizontal,
  Package2,
  GanttChartSquare,
  ClipboardList,
  Sparkles,
  Columns,
  Rows,
  BoxSelect,
  Crop,
  Maximize,
  Combine,
  Trash,
  ChevronsUpDown,
  FilePlus,
  Stamp,
  Paperclip,
  ImagePlus,
  ListOrdered,
  FileCog,
  ScanLine,
  Eye,
  Replace,
  FileLock,
  MessageSquare,
  Mic,
  Volume2,
  Pen,
  GitCompareArrows,
  Timer,
  Fingerprint,
  FileQuestion,
  Wrench,
  Bot,
  Captions,
  Minimize
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType, ForwardRefExoticComponent, RefAttributes } from "react";
import WordCounter from "@/components/tools/word-counter";
import PlaceholderTool from "@/components/tools/placeholder-tool";
import TextToPdfTool from "@/components/tools/text-to-pdf";
import CaseConverter from "@/components/tools/case-converter";
import JsonFormatter from "@/components/tools/json-formatter";
import Base64Tool from "@/components/tools/base64-tool";
import QrCodeGenerator from "@/components/tools/qr-code-generator";
import ImageToPdfTool from "@/components/tools/image-to-pdf";
import RemoveExtraSpacesTool from "@/components/tools/remove-extra-spaces";
import UrlEncoderDecoder from "@/components/tools/url-encoder-decoder";
import TimestampConverter from "@/components/tools/timestamp-converter";

type IconComponent = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

export type ToolCategory =
  | "pdf"
  | "image"
  | "text"
  | "dev"
  | "ai"
  | "media"
  | "util"
  | "security"
  | "automation";

export const toolCategoryNames: Record<ToolCategory, string> = {
  pdf: "PDF & Document Tools",
  image: "Image Tools",
  text: "Text Tools",
  dev: "Developer & Data Tools",
  ai: "AI Tools",
  media: "Media & Audio Tools",
  util: "Everyday Utilities",
  security: "Security, Privacy & Compliance",
  automation: "Batch, Automation & Workflow",
};

export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: IconComponent;
  component: ComponentType<any>;
}

export const tools: Tool[] = [
  // PDF & Document Tools
  { slug: "text-to-pdf", name: "Text to PDF", description: "Convert raw text into a downloadable PDF file.", category: "pdf", icon: FileText, component: TextToPdfTool },
  { slug: "convert-to-pdf", name: "Convert to PDF", description: "Convert various file formats to PDF.", category: "pdf", icon: FileText, component: PlaceholderTool },
  { slug: "pdf-to-word", name: "PDF to Word", description: "Convert PDF files to editable Word documents.", category: "pdf", icon: FileText, component: PlaceholderTool },
  { slug: "word-to-pdf", name: "Word to PDF", description: "Convert Word documents to PDF files.", category: "pdf", icon: FileText, component: PlaceholderTool },
  { slug: "email-to-pdf", name: "Email to PDF", description: "Save your emails as PDF files.", category: "pdf", icon: Mail, component: PlaceholderTool },
  { slug: "html-to-pdf", name: "HTML to PDF", description: "Convert web pages to PDF documents.", category: "pdf", icon: Code, component: PlaceholderTool },
  { slug: "image-to-pdf", name: "Image to PDF", description: "Convert JPG, PNG, and other images to PDF.", category: "pdf", icon: FileImage, component: ImageToPdfTool },
  { slug: "markdown-to-pdf", name: "Markdown to PDF", description: "Convert Markdown files to PDF.", category: "pdf", icon: BookText, component: PlaceholderTool },
  { slug: "pdf-to-csv", name: "PDF to CSV", description: "Extract data from PDFs into CSV files.", category: "pdf", icon: Rows, component: PlaceholderTool },
  { slug: "pdf-to-html", name: "PDF to HTML", description: "Convert PDFs to HTML web pages.", category: "pdf", icon: Code, component: PlaceholderTool },
  { slug: "pdf-to-image", name: "PDF to Image", description: "Convert PDF pages to JPG, PNG, or TIFF images.", category: "pdf", icon: FileImage, component: PlaceholderTool },
  { slug: "pdf-to-pdfa", name: "PDF to PDF/A", description: "Convert PDFs to the PDF/A archival format.", category: "pdf", icon: Package, component: PlaceholderTool },
  { slug: "pdf-to-ppt", name: "PDF to Presentation", description: "Convert PDFs to PowerPoint presentations.", category: "pdf", icon: FileText, component: PlaceholderTool },
  { slug: "pdf-to-text", name: "PDF to Text", description: "Extract text from PDF files.", category: "pdf", icon: Type, component: PlaceholderTool },
  { slug: "pdf-to-xml", name: "PDF to XML", description: "Convert PDF data structure to XML format.", category: "pdf", icon: Braces, component: PlaceholderTool },
  { slug: "pdf-merge", name: "PDF Merge", description: "Combine multiple PDF files into one.", category: "pdf", icon: Combine, component: PlaceholderTool },
  { slug: "pdf-split", name: "PDF Split", description: "Split a PDF by size, pages, or chapters.", category: "pdf", icon: Scissors, component: PlaceholderTool },
  { slug: "pdf-extract-pages", name: "Extract Pages", description: "Extract specific pages from a PDF.", category: "pdf", icon: BoxSelect, component: PlaceholderTool },
  { slug: "pdf-crop", name: "Crop PDF", description: "Crop the visible area of PDF pages.", category: "pdf", icon: Crop, component: PlaceholderTool },
  { slug: "pdf-resize", name: "Resize PDF", description: "Adjust the page size or scale of a PDF.", category: "pdf", icon: Maximize, component: PlaceholderTool },
  { slug: "pdf-single-large-page", name: "Single Large Page Export", description: "Export PDF pages as one long image.", category: "pdf", icon: FileText, component: PlaceholderTool },
  { slug: "pdf-rotate", name: "Rotate Pages", description: "Rotate pages in a PDF document.", category: "pdf", icon: RotateCcw, component: PlaceholderTool },
  { slug: "pdf-reorder", name: "Reorder Pages", description: "Organize and reorder pages in a PDF.", category: "pdf", icon: ChevronsUpDown, component: PlaceholderTool },
  { slug: "pdf-delete-pages", name: "Delete Pages", description: "Remove specific pages from a PDF.", category: "pdf", icon: Trash, component: PlaceholderTool },
  { slug: "pdf-remove-blank-pages", name: "Remove Blank Pages", description: "Automatically detect and remove blank pages.", category: "pdf", icon: Trash2, component: PlaceholderTool },
  { slug: "pdf-compress", name: "Compress PDF", description: "Reduce the file size of your PDF.", category: "pdf", icon: Minimize, component: PlaceholderTool },
  { slug: "pdf-ocr", name: "OCR PDF", description: "Recognize and extract text from scanned PDFs.", category: "pdf", icon: ScanLine, component: PlaceholderTool },
  { slug: "pdf-auto-redact", name: "Auto-Redact PDF", description: "Automatically redact sensitive information.", category: "pdf", icon: Eye, component: PlaceholderTool },
  { slug: "pdf-manual-redact", name: "Manual Redaction", description: "Manually redact parts of a PDF.", category: "pdf", icon: Pen, component: PlaceholderTool },
  { slug: "pdf-add-password", name: "Add Password", description: "Protect your PDF with a password.", category: "pdf", icon: Lock, component: PlaceholderTool },
  { slug: "pdf-unlock", name: "Unlock PDF", description: "Remove password protection from a PDF.", category: "pdf", icon: Unlock, component: PlaceholderTool },
  { slug: "pdf-validate-signature", name: "Validate Signature", description: "Check the validity of a digital signature.", category: "pdf", icon: FileSignature, component: PlaceholderTool },
  { slug: "pdf-add-watermark", name: "Add Watermark", description: "Add a text or image watermark to a PDF.", category: "pdf", icon: Stamp, component: PlaceholderTool },
  { slug: "pdf-add-attachments", name: "Add Attachments", description: "Embed files within your PDF.", category: "pdf", icon: Paperclip, component: PlaceholderTool },
  { slug: "pdf-add-image", name: "Add Image to PDF", description: "Insert images into your PDF pages.", category: "pdf", icon: ImagePlus, component: PlaceholderTool },
  { slug: "pdf-add-page-numbers", name: "Add Page Numbers", description: "Easily add page numbers to your PDF.", category: "pdf", icon: ListOrdered, component: PlaceholderTool },
  { slug: "pdf-rename", name: "Auto Rename PDF", description: "Rename PDFs based on content or metadata.", category: "pdf", icon: FileCog, component: PlaceholderTool },
  { slug: "pdf-edit-metadata", name: "Change Metadata", description: "Edit the metadata of your PDF file.", category: "pdf", icon: Wrench, component: PlaceholderTool },
  { slug: "pdf-split-scanned-photos", name: "Detect & Split Scanned Photos", description: "Automatically split multiple photos from a single scan.", category: "pdf", icon: Scan, component: PlaceholderTool },
  { slug: "pdf-flatten", name: "Flatten PDF", description: "Make annotations and form fields non-editable.", category: "pdf", icon: Layers, component: PlaceholderTool },
  { slug: "pdf-overlay", name: "Overlay PDFs", description: "Merge a PDF with a template or another PDF.", category: "pdf", icon: FilePlus, component: PlaceholderTool },
  { slug: "pdf-compare", name: "Compare PDFs", description: "Visually compare two PDF files for differences.", category: "pdf", icon: GitCompareArrows, component: PlaceholderTool },
  { slug: "pdf-info", name: "Get PDF Info", description: "Extract all metadata and information from a PDF.", category: "pdf", icon: Info, component: PlaceholderTool },
  { slug: "pdf-extract-images", name: "Extract Images from PDF", description: "Extract all images from a PDF file.", category: "pdf", icon: FileImage, component: PlaceholderTool },
  { slug: "pdf-remove-annotations", name: "Remove Annotations", description: "Delete all comments and annotations.", category: "pdf", icon: MessageSquare, component: PlaceholderTool },
  { slug: "pdf-invert-color", name: "Invert Color", description: "Replace and invert colors in a PDF.", category: "pdf", icon: Replace, component: PlaceholderTool },
  { slug: "pdf-edit-forms", name: "Edit PDF Forms", description: "Fill out, edit, or create PDF forms.", category: "pdf", icon: Pen, component: PlaceholderTool },
  { slug: "pdf-view-edit", name: "View & Edit PDF", description: "A full-featured PDF viewer and editor.", category: "pdf", icon: Eye, component: PlaceholderTool },
  { slug: "pdf-sanitize", name: "Sanitize PDF", description: "Remove all metadata and sensitive info.", category: "pdf", icon: Fingerprint, component: PlaceholderTool },
  { slug: "pdf-sign", name: "Sign PDF", description: "Add your digital signature to a PDF.", category: "pdf", icon: FileSignature, component: PlaceholderTool },
  { slug: "pdf-repair", name: "Repair PDF", description: "Attempt to repair a corrupted or damaged PDF.", category: "pdf", icon: Wrench, component: PlaceholderTool },
  { slug: "pdf-pipeline", name: "PDF Pipeline", description: "Batch process multiple PDF operations.", category: "pdf", icon: Workflow, component: PlaceholderTool },
  { slug: "pdf-scanner-effect", name: "Scanner Effect", description: "Simulate a scanned document look.", category: "pdf", icon: ScanLine, component: PlaceholderTool },
  { slug: "pdf-show-js", name: "Show Javascript", description: "Extract Javascript from a PDF.", category: "pdf", icon: Code, component: PlaceholderTool },
  { slug: "pdf-edit-toc", name: "Edit Table of Contents", description: "Create or edit the table of contents.", category: "pdf", icon: ListOrdered, component: PlaceholderTool },
  { slug: "pdf-auto-split", name: "Auto Split by Content", description: "Split PDF based on content changes.", category: "pdf", icon: Scissors, component: PlaceholderTool },
  { slug: "pdf-split-chapters", name: "Split by Chapters", description: "Split PDF into chapters.", category: "pdf", icon: BookText, component: PlaceholderTool },
  { slug: "pdf-split-sections", name: "Split by Sections", description: "Split PDF into sections.", category: "pdf", icon: Columns, component: PlaceholderTool },

  // Image Tools
  { slug: "image-resize", name: "Resize Image", description: "Change the dimensions of your images.", category: "image", icon: Maximize, component: PlaceholderTool },
  { slug: "image-crop", name: "Crop Image", description: "Crop images to a specific area.", category: "image", icon: Crop, component: PlaceholderTool },
  { slug: "image-rotate", name: "Rotate & Flip Image", description: "Rotate and flip your images.", category: "image", icon: RotateCcw, component: PlaceholderTool },
  { slug: "image-compress", name: "Compress Image", description: "Reduce image file size without losing quality.", category: "image", icon: Minimize, component: PlaceholderTool },
  { slug: "image-convert", name: "Convert Image", description: "Convert images between JPG, PNG, WEBP, etc.", category: "image", icon: ArrowRightLeft, component: PlaceholderTool },
  { slug: "image-bg-remover", name: "Background Remover", description: "AI-powered background removal.", category: "image", icon: Wand2, component: PlaceholderTool },
  { slug: "image-upscaler", name: "Image Upscaler", description: "Increase image resolution with AI.", category: "image", icon: Sparkles, component: PlaceholderTool },
  { slug: "image-denoise", name: "Image Denoise/Sharpen", description: "Deblur, denoise, or sharpen images.", category: "image", icon: Aperture, component: PlaceholderTool },
  { slug: "image-batch-convert", name: "Batch Image Converter", description: "Convert multiple images at once.", category: "image", icon: Package2, component: PlaceholderTool },
  { slug: "image-meme-generator", name: "Meme Generator", description: "Create memes with text and stickers.", category: "image", icon: ImageIcon, component: PlaceholderTool },
  { slug: "image-metadata-editor", name: "Image Metadata Editor", description: "View and edit EXIF data.", category: "image", icon: Wrench, component: PlaceholderTool },
  { slug: "image-color-replace", name: "Color Replace", description: "Replace a specific color in an image.", category: "image", icon: Palette, component: PlaceholderTool },
  { slug: "image-invert-color", name: "Invert Color", description: "Invert the colors of an image.", category: "image", icon: Replace, component: PlaceholderTool },
  { slug: "image-compare", name: "Image Comparison", description: "Compare two images to find differences.", category: "image", icon: GitCompareArrows, component: PlaceholderTool },
  { slug: "image-to-svg", name: "Image to SVG", description: "Vectorize images by tracing.", category: "image", icon: Redo, component: PlaceholderTool },
  
  // Text Tools
  { slug: "word-counter", name: "Word Counter", description: "Count words, characters, and lines in text.", category: "text", icon: Type, component: WordCounter },
  { slug: "case-converter", name: "Case Converter", description: "Convert text to various cases (upper, lower, etc.).", category: "text", icon: CaseSensitive, component: CaseConverter },
  { slug: "remove-extra-spaces", name: "Remove Extra Spaces", description: "Trim whitespace and remove line breaks.", category: "text", icon: Scissors, component: RemoveExtraSpacesTool },
  { slug: "text-to-speech", name: "Text to Speech", description: "Convert text into spoken audio.", category: "text", icon: Volume2, component: PlaceholderTool },
  { slug: "speech-to-text", name: "Speech to Text", description: "Transcribe audio into text.", category: "text", icon: Mic, component: PlaceholderTool },
  { slug: "plagiarism-checker", name: "Plagiarism Checker", description: "Check for duplicate content.", category: "text", icon: Search, component: PlaceholderTool },
  { slug: "grammar-checker", name: "Grammar & Spell Checker", description: "Correct grammar and spelling mistakes.", category: "text", icon: CheckSquare, component: PlaceholderTool },
  { slug: "paraphraser", name: "Paraphraser / Rewriter", description: "Rewrite text with different tones or lengths.", category: "text", icon: Pen, component: PlaceholderTool },
  { slug: "summarizer", name: "Summarizer", description: "Summarize long texts automatically.", category: "text", icon: Rows, component: PlaceholderTool },
  { slug: "translate", name: "Translate", description: "Translate text between multiple languages.", category: "text", icon: Languages, component: PlaceholderTool },
  { slug: "lorem-ipsum-generator", name: "Lorem Ipsum Generator", description: "Generate placeholder text.", category: "text", icon: Text, component: PlaceholderTool },
  { slug: "text-diff", name: "Text Diff / Compare", description: "Compare two pieces of text for differences.", category: "text", icon: GitCompareArrows, component: PlaceholderTool },
  { slug: "text-encryption", name: "Text Encryption", description: "Encrypt and decrypt text messages.", category: "text", icon: Lock, component: PlaceholderTool },
  
  // Developer & Data Tools
  { slug: "json-formatter", name: "JSON Formatter", description: "Format and validate JSON data.", category: "dev", icon: FileJson, component: JsonFormatter },
  { slug: "json-csv-converter", name: "JSON to CSV", description: "Convert between JSON and CSV formats.", category: "dev", icon: ArrowRightLeft, component: PlaceholderTool },
  { slug: "xml-formatter", name: "XML Formatter", description: "Format and validate XML data.", category: "dev", icon: Braces, component: PlaceholderTool },
  { slug: "regex-tester", name: "Regex Tester", description: "Test regular expressions.", category: "dev", icon: Regex, component: PlaceholderTool },
  { slug: "base64-encoder", name: "Base64 Encoder/Decoder", description: "Encode and decode Base64 data.", category: "dev", icon: Waypoints, component: Base64Tool },
  { slug: "url-encoder", name: "URL Encoder/Decoder", description: "Encode and decode URL components.", category: "dev", icon: LinkIcon, component: UrlEncoderDecoder },
  { slug: "uuid-generator", name: "UUID Generator", description: "Generate universally unique identifiers.", category: "dev", icon: Fingerprint, component: PlaceholderTool },
  { slug: "timestamp-converter", name: "Timestamp Converter", description: "Convert between timestamps and dates.", category: "dev", icon: Clock, component: TimestampConverter },
  { slug: "code-minifier", name: "Code Minifier", description: "Minify JS, CSS, and HTML code.", category: "dev", icon: Minimize, component: PlaceholderTool },
  { slug: "code-beautifier", name: "Code Beautifier", description: "Format and beautify code.", category: "dev", icon: Paintbrush, component: PlaceholderTool },
  { slug: "online-compiler", name: "Online Compiler/REPL", description: "Run code in various languages online.", category: "dev", icon: Terminal, component: PlaceholderTool },
  { slug: "api-tester", name: "API Tester", description: "Test APIs and generate code snippets.", category: "dev", icon: TestTube, component: PlaceholderTool },
  { slug: "diff-checker", name: "Diff Checker", description: "Compare text and code files.", category: "dev", icon: GitCompareArrows, component: PlaceholderTool },
  { slug: "sql-formatter", name: "SQL Formatter", description: "Format and beautify SQL queries.", category: "dev", icon: Database, component: PlaceholderTool },
  
  // AI Tools
  { slug: "ai-chatbot", name: "AI Chatbot Assistant", description: "Ask questions and get help from an AI.", category: "ai", icon: Bot, component: PlaceholderTool },
  { slug: "ai-resume-builder", name: "AI Resume Builder", description: "Build a professional resume with AI help.", category: "ai", icon: User, component: PlaceholderTool },
  { slug: "ai-image-generator", name: "AI Image Generator", description: "Create images from text descriptions.", category: "ai", icon: ImageIcon, component: PlaceholderTool },
  { slug: "ai-code-generator", name: "AI Code Generator", description: "Generate and explain code with AI.", category: "ai", icon: Code, component: PlaceholderTool },
  { slug: "ai-summarizer", name: "AI Summarizer", description: "Advanced summarization and paraphrasing.", category: "ai", icon: BrainCircuit, component: PlaceholderTool },
  { slug: "ai-ocr", name: "AI OCR", description: "Advanced OCR with semantic extraction.", category: "ai", icon: Scan, component: PlaceholderTool },
  { slug: "ai-doc-qa", name: "AI Document Q&A", description: "Upload a document and ask questions about it.", category: "ai", icon: FileQuestion, component: PlaceholderTool },

  // Media & Audio Tools
  { slug: "audio-trimmer", name: "Audio Trimmer", description: "Cut and trim audio files.", category: "media", icon: Scissors, component: PlaceholderTool },
  { slug: "audio-joiner", name: "Audio Joiner", description: "Merge multiple audio files into one.", category: "media", icon: Combine, component: PlaceholderTool },
  { slug: "audio-converter", name: "Audio Converter", description: "Convert between MP3, WAV, M4A, etc.", category: "media", icon: AudioLines, component: PlaceholderTool },
  { slug: "video-to-gif", name: "Video to GIF", description: "Convert video clips into animated GIFs.", category: "media", icon: FileVideo, component: PlaceholderTool },
  { slug: "video-trimmer", name: "Video Trimmer", description: "Trim or resize video files.", category: "media", icon: Scissors, component: PlaceholderTool },
  { slug: "subtitle-generator", name: "Subtitle Generator", description: "Generate and edit SRT subtitle files.", category: "media", icon: Captions, component: PlaceholderTool },

  // Everyday Utilities
  { slug: "qr-code-generator", name: "QR Code Generator", description: "Create and scan QR codes.", category: "util", icon: QrCode, component: QrCodeGenerator },
  { slug: "barcode-generator", name: "Barcode Generator", description: "Create various types of barcodes.", category: "util", icon: Barcode, component: PlaceholderTool },
  { slug: "password-generator", name: "Password Generator", description: "Generate strong, secure passwords.", category: "util", icon: Key, component: PlaceholderTool },
  { slug: "ip-address-finder", name: "IP Address Finder", description: "Find your IP and get geo-location data.", category: "util", icon: Locate, component: PlaceholderTool },
  { slug: "pomodoro-timer", name: "Pomodoro Timer", description: "A timer to boost your productivity.", category: "util", icon: Timer, component: PlaceholderTool },
  { slug: "todo-list", name: "To-Do List", description: "A simple online notepad and to-do list.", category: "util", icon: ListTodo, component: PlaceholderTool },
  { slug: "calendar", name: "Calendar", description: "Event reminders and countdowns.", category: "util", icon: Calendar, component: PlaceholderTool },
  { slug: "random-generator", name: "Random Generator", description: "Generate random names, colors, numbers.", category: "util", icon: Shuffle, component: PlaceholderTool },

  // Security, Privacy & Compliance Tools
  { slug: "encrypt-files", name: "Encrypt/Decrypt Files", description: "Encrypt your files with a password.", category: "security", icon: FileLock, component: PlaceholderTool },
  { slug: "sanitize-files", name: "Sanitize Files", description: "Remove metadata from your files.", category: "security", icon: Fingerprint, component: PlaceholderTool },
  { slug: "audit-log", name: "Audit Log", description: "Track access and actions.", category: "security", icon: ClipboardList, component: PlaceholderTool },
  
  // Batch, Automation & Workflow Tools
  { slug: "batch-processor", name: "Batch Processor", description: "Run bulk jobs on multiple files.", category: "automation", icon: Workflow, component: PlaceholderTool },
  { slug: "scheduled-jobs", name: "Scheduled Jobs", description: "Schedule tools to run automatically.", category: "automation", icon: Clock, component: PlaceholderTool },
  { slug: "webhook-integrations", name: "Webhook Integrations", description: "Connect with Zapier, Make, etc.", category: "automation", icon: Waypoints, component: PlaceholderTool },
  { slug: "api-access", name: "API Access", description: "Manage API keys for programmatic access.", category: "automation", icon: FileKey, component: PlaceholderTool },
];
